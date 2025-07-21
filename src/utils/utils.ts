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
      if (todos && action.payload.newTodo)
        return [action.payload.newTodo, ...todos];
      return todos;

    case ACTIONS.REMOVE_TODO: {
      const indexOfElem = todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (indexOfElem === -1) return todos;
      return [
        ...todos.slice(0, indexOfElem),
        ...todos.slice(indexOfElem + 1, todos.length),
      ];
    }

    case ACTIONS.COMPLETE_TODO: {
      const indexOfElem = todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (indexOfElem === -1) return todos;
      const todo = todos[indexOfElem];
      return [
        ...todos.slice(0, indexOfElem),
        { id: todo.id, title: todo.title, completed: !todo.completed },
        ...todos.slice(indexOfElem + 1, todos.length),
      ];
    }

    default:
      return todos;
  }
}
