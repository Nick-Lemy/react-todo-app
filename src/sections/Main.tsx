import { useReducer } from "react";
import AddTodoForm from "../components/AddTodoForm";
import TodoCard from "../components/TodoCard";
import { reducer } from "../utils/utils";

export default function Main() {
  const [todos, dispatch] = useReducer(reducer, []);
  return (
    <main>
      <AddTodoForm dispatch={dispatch} />
      <div className=" flex flex-col py-5 gap-6 md:gap-8">
        {todos.map((todo) => (
          <TodoCard key={todo.id} dispatch={dispatch} todo={todo} />
        ))}
      </div>
    </main>
  );
}
