type action = "add-todo" | "remove-todo" | "complete-todo";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

type Payload = { newTodo?: Todo; id?: number };

type CounterAction = { type: action; payload: Payload };

export type { action, Payload, CounterAction, Todo };
