<script setup lang="ts">
import { CookieRef } from 'nuxt/app';

//middlewares
definePageMeta({
  middleware: 'notauthenticated'
})

// properties
const auth: CookieRef<UserObj | undefined> = usePersistentAuth();
const page = ref<number>(1)
const limit: number = 10;
const showAddTodoModal = ref<Boolean>(false);
const updatingTodoItem = ref<TodoItem | undefined>(undefined);

const todoItems = computed<Array<TodoItem> | undefined>(() => todos.value?.todos)

const totalPages = computed<number>(() => {
  if (todos.value && todos.value!.total > limit) {
    return Math.ceil(todos.value!.total / limit);
  } else {
    return 1;
  }
})

const skip = computed<number>(() => (page.value - 1) * limit);

const { data: todos, refresh, error } = await useAsyncData<TodoResponseObj>(
  "todos_key",
  () => useAppGet<TodoResponseObj>(`${API_PATHS.getTodos}?limit=${limit}&skip=${skip.value}`),
)


// methods
function onPagination(direction: String) {
  if (direction.toLocaleLowerCase() == PAGE_PREVIOUS.toLowerCase() && page.value > 1) {
    previous();
  } else if (direction.toLocaleLowerCase() == PAGE_NEXT.toLocaleLowerCase() && page.value < totalPages.value) {
    next();
  } else {
    console.log(direction.toLocaleLowerCase(), page.value, totalPages.value);
    alert(PAGE_END);
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

async function addTodo(newTodo: TodoItem) {
  if (!newTodo.todo || !newTodo.description) {
    alert('Please complete all input fields');
    return;
  }
  const response = await useAppPost<TodoItem | String>(API_PATHS.addTodo, {
    todo: newTodo.todo,
    description: newTodo.description,
    completed: false,
    userId: auth.value!.id,
  })
  // if an error message
  if (typeof response == "string") {
    alert(response);
  } else {
    showAddTodoModal.value = false;
    page.value = 1;
    alert(TODO_SAVED)

    //refresh();
    todoItems.value?.unshift({ id: 5, todo: newTodo.todo, description: newTodo.description, completed: false, userId: auth.value!.id, })
  }
}

async function updateTodo(todoItem: TodoItem) {
  if (!todoItem.todo) {
    alert('Please enter the todo name');
    return;
  }
  const response = await useAppPut<TodoItem | String>(`${API_PATHS.getTodos}/${todoItem.id}`, {
    todo: todoItem.todo,
    description: todoItem.description,
    userId: auth.value!.id,
  })
  // if an error message
  if (typeof response == "string") {
    alert(response);
  } else {


    updatingTodoItem.value = undefined;
    const itemIndex = todoItems.value!.findIndex((item, index) => item.id == todoItem.id)
    todoItems.value![itemIndex] = todoItem;

    if (todoItem.completed) {
      todoItems.value!.splice(itemIndex, 1)
      alert("Todo completed")
    } else {
      alert(TODO_SAVED)
    }
  }
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
        <span>{{ `${auth!.firstName} ${auth!.lastName}` }}</span>
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
    <NewTodoModal @todo-submitted="addTodo" @close-modal="() => showAddTodoModal = false" v-if="showAddTodoModal" />

    <UpdateTodoModal :todo-id-prop="updatingTodoItem.id" :todo-description-prop="updatingTodoItem.description"
      :todo-name-prop="updatingTodoItem.todo" v-if="updatingTodoItem" @todo-updated="updateTodo"
      @close-modal="() => updatingTodoItem = undefined" />

    <p v-if="error && error.message" class="flex flex-col my-2 items-center justify-center py-2 mb-3">
      <span>Could not load the todo list</span>
      <span class="my-3"> {{ error.message }} </span>
    </p>
    <div v-else>
      <ul class="mb-40">
        <li v-for="(  todo, index  ) in   todoItems  " :key="todo.id">
          <div class="flex justify-between my-4 bg-gray-200 rounded p-4">
            <div>
              <span class="font-bold">{{ todo.todo }}</span>
              <div>{{ todo.description }}</div>
            </div>
            <div class="flex gap-x-2 items-center">
              <button @click="() => updatingTodoItem = todo">
                <img class="w-4 h-4 " src="~assets/img/pencil.png" />
              </button>
              <button @click="() => updateTodo({ ...todo, completed: true })">
                <img class="w-4 h-4 " src="~assets/img/check-mark.png" />
              </button>
              <button @click="() => updateTodo({ ...todo, completed: true })">
                <img class="w-4 h-4" src="~assets/img/delete.png" />
              </button>
            </div>
          </div>

        </li>
      </ul>
      <div v-if="!showAddTodoModal && !updatingTodoItem" class="flex  my-6 fixed bottom-[-2.5%] left-0 right-0">
        <div class=" bg-white mx-auto w-6/12 flex justify-between rounded-lg shadow p-4 items-center">
          <CircleButton btn-icon="left-arrow.png" class="bg-green-500 font-bold p-3" @button-tap="onPagination"
            name="Previous">
          </CircleButton>
          <CircleButton @button-tap="() => showAddTodoModal = true" btn-icon="plus.png" name="Add Todo"
            class="bg-green-500 rounded p-3"></CircleButton>
          <CircleButton btn-icon="right-arrow.png" class="bg-green-500 font-bold p-3" @button-tap="onPagination"
            name="Next">
          </CircleButton>
        </div>
      </div>
    </div>
  </div>
</template>
