interface UserObj {
  token: String;
  firstName: String;
  lastName: String;
  gender: String;
  image: String;
  username: String;
  email: String;
  id: number;
}

interface TodoItem {
  id: number;
  todo: String;
  completed: Boolean;
  description: String | undefined;
  userId: number;
}

type TodoResponseObj = {
  todos: Array<TodoItem>;
  total: number;
  skip: number;
  limit: number;
};
