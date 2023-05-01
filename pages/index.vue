<script setup lang="ts">
// properties
const page = ref(1)
const limit = 10;
const newTodo = ref("");


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
  () => $fetch(`https://dummyjson.com/todos?limit=${limit}&skip=${skip.value}`),

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
    alert(`unable to navigate`);
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

async function addTodo(event: Event) {
  const response = await $fetch('https://dummyjson.com/todos/add', {
    headers: { 'Content-Type': 'application/json' },
    method: "POST", body: {
      todo: newTodo.value,
      completed: false,
      userId: 5,
    }
  });
  newTodo.value = "";

  refresh();
  alert(`New todo: ${newTodo.value} - added successfully`);
}

function removeTodo(params: any) {
  alert("removed");
}

</script>

<template>
  <div>
    <div class="mx-auto w-6/12">
      <header class="shadow-md border-2 border-gray-100 bg-white p-5 my-5">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold">Todo APP</h1>
          <h1 class="text-xl font-normal text-red-400">{{ `Page ${page} of ${totalPages}` }}</h1>
        </div>
      </header>
    </div>


    <!-- <form @submit.prevent="addTodo">
      <div class="gap-x-2 flex mx-auto w-6/12">
        <input class="border-2 p-2 w-9/12 rounded shadow border-gray-400 h-14" v-model="newTodo">
      </div>

    </form> -->
  </div>

  <div class="mt-10 w-6/12 mx-auto">
    <ul>
      <li v-for="todo in todoItems" :key="todo.id">
        <div class="flex justify-between my-4 bg-gray-200 rounded p-4">
          {{ todo.todo }}
          <div class="flex gap-x-2 items-center">
            <button @click="removeTodo(todo)">
              <img class="w-4 h-4 " src="~assets/img/check-mark.png" />
            </button>
            <button @click="removeTodo(todo)">
              <img class="w-4 h-4" src="~assets/img/delete.png" />
            </button>
          </div>

        </div>

      </li>
    </ul>
    <div class="flex  my-6 fixed bottom-[-2.5%] left-0 right-0">
      <div class=" bg-white mx-auto w-6/12 flex justify-between rounded-lg shadow p-4 items-center">
        <CircleButton btn-icon="left-arrow.png" class="bg-green-500 font-bold p-3" @button-tap="onPagination"
          name="Previous">
        </CircleButton>
        <CircleButton btn-icon="plus.png" name="Add Todo" class="bg-green-500 rounded p-3"></CircleButton>
        <CircleButton btn-icon="right-arrow.png" class="bg-green-500 font-bold p-3" @button-tap="onPagination"
          name="Next">
        </CircleButton>
      </div>
    </div>
  </div>
</template>
