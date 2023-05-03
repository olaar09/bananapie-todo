interface UserObj {
  token: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  username: string;
  email: string;
  id: number;
}

interface TodoItem {
  id: number;
  todo: string;
  completed: Boolean;
  description: string | undefined;
  userId: number;
}

type TodoResponseObj = {
  todos: Array<TodoItem>;
  total: number;
  skip: number;
  limit: number;
};
