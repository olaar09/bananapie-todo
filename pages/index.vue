<script setup lang="ts">
const auth = usePersistentAuth();

//middlewares
definePageMeta({
  middleware: 'notauthenticated'
})

// properties
const page = ref(1)
const limit = 10;
const showModal = ref(false);
const modal = ref(null)

const todoItems = computed({
  get() {
    return todos.value.todos
  },
  set(val) { },
});

const totalPages = computed({
  get() {
    if (todos.value.total > limit) {
      return Math.ceil(todos.value.total / limit);
    } else {
      return 1;
    }
  },
  set(val) { },
})

const skip = computed({
  get() {
    return (page.value - 1) * limit;
  },
  set(val) { },
})

const { data: todos, pending, refresh, error } = await useAsyncData(
  "todos_key",
  () => $fetch(`https://dummyjson.com/todos?limit=${limit}&skip=${skip.value}`, { method: "GET", headers: { 'Authorization': `Bearer ${auth.value.token}` } }),
)

console.log(todoItems.value, totalPages.value, error.value, "kfmdeskmfekd");




// methods
function onPagination(direction: String) {
  if (direction.toLocaleLowerCase() == "previous" && page.value > 1) {
    previous();
  } else if (direction.toLocaleLowerCase() == "next" && page.value < totalPages.value) {
    next();
  } else {
    console.log(direction.toLocaleLowerCase(), page.value, totalPages.value);
    alert(`End of pagination`);
  }
}

function previous() {
  page.value--
  refresh()
}

function next() {
  page.value++
  refresh()
}

async function addTodo(newTodo: any) {
  console.log(`${newTodo.name} ${newTodo.description}`)
  const response = await $fetch('https://dummyjson.com/todos/add', {
    headers: { 'Content-Type': 'application/json' },
    method: "POST", body: {
      todo: newTodo.name,
      description: newTodo.description,
      completed: false,
      userId: 5,
    }
  });
  showModal.value = false;

  page.value = 1;
  modal.value.todoName = '';
  modal.value.todoDescription = '';
  alert("New todo saved")
  //refresh();
  todoItems.value.unshift({ id: 5, todo: newTodo.name, description: newTodo.description, completed: false, userId: 31, })
}

function removeTodo(index: number) {
  todoItems.value.splice(index, 1)
  alert("Todo removed")
}

function removeCompleted(index: number) {
  todoItems.value.splice(index, 1)
  alert("Todo completed")
}

async function logout() {
  auth.value = undefined;
  await navigateTo('/login')
}

</script>

<template>
  <div>
    <div class="mx-auto w-6/12">
      <div class="my-5 justify-between flex">
        <span>{{ `${auth.firstName} ${auth.lastName}` }}</span>
        <a @click.prevent="logout" class="underline cursor-pointer">Logout</a>
      </div>
      <header class="shadow-md border-2 border-gray-100 bg-white p-5 mb-5">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold">Todo APP</h1>
          <h1 class="text-xl font-normal text-red-400">{{ `Page ${page} of ${totalPages}` }}</h1>
        </div>
      </header>
    </div>
  </div>

  <div class="mt-10 w-6/12 mx-auto">
    <NewTodoModal ref="modal" @todo-submitted="addTodo" @close-modal="() => showModal = false" v-show="showModal" />

    <ul class="mb-40">
      <li v-for="(  todo, index  ) in   todoItems  " :key="todo.id">
        <div class="flex justify-between my-4 bg-gray-200 rounded p-4">
          <div>
            <span class="font-bold">{{ todo.todo }}</span>
            <div>{{ todo.description }}</div>
          </div>
          <div class="flex gap-x-2 items-center">
            <button @click="() => removeCompleted(index)">
              <img class="w-4 h-4 " src="~assets/img/check-mark.png" />
            </button>
            <button @click="() => removeTodo(index)">
              <img class="w-4 h-4" src="~assets/img/delete.png" />
            </button>
          </div>
        </div>

      </li>
    </ul>
    <div v-if="!showModal" class="flex  my-6 fixed bottom-[-2.5%] left-0 right-0">
      <div class=" bg-white mx-auto w-6/12 flex justify-between rounded-lg shadow p-4 items-center">
        <CircleButton btn-icon="left-arrow.png" class="bg-green-500 font-bold p-3" @button-tap="onPagination"
          name="Previous">
        </CircleButton>
        <CircleButton @button-tap="() => showModal = true" btn-icon="plus.png" name="Add Todo"
          class="bg-green-500 rounded p-3"></CircleButton>
        <CircleButton btn-icon="right-arrow.png" class="bg-green-500 font-bold p-3" @button-tap="onPagination"
          name="Next">
        </CircleButton>
      </div>
    </div>
  </div>
</template>
