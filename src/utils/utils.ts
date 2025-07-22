import type { action, CounterAction, Todo } from "./types";

export const ACTIONS: {
  ADD_TODO: action;
  REMOVE_TODO: action;
  COMPLETE_TODO: action;
} = {
  ADD_TODO: "add-todo",
  REMOVE_TODO: "remove-todo",
  COMPLETE_TODO: "complete-todo",
};

export function reducer(todos: Todo[], action: CounterAction): Todo[] {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return addTodo(todos, action);

    case ACTIONS.REMOVE_TODO: {
      return completeTodo(todos, action);
    }

    case ACTIONS.COMPLETE_TODO: {
      return removeTodo(todos, action);
    }

    default:
      return todos;
  }
}

function addTodo(todos: Todo[], action: CounterAction) {
  if (todos && action.payload.newTodo)
    return [action.payload.newTodo, ...todos];
  return todos;
}

function completeTodo(todos: Todo[], action: CounterAction) {
  const indexOfElem = todos.findIndex((todo) => todo.id === action.payload.id);
  if (indexOfElem === -1) return todos;
  return [
    ...todos.slice(0, indexOfElem),
    ...todos.slice(indexOfElem + 1, todos.length),
  ];
}

function removeTodo(todos: Todo[], action: CounterAction) {
  const indexOfElem = todos.findIndex((todo) => todo.id === action.payload.id);
  if (indexOfElem === -1) return todos;
  const todo = todos[indexOfElem];
  return [
    ...todos.slice(0, indexOfElem),
    { id: todo.id, title: todo.title, completed: !todo.completed },
    ...todos.slice(indexOfElem + 1, todos.length),
  ];
}
