import { useState } from "react";
import type { CounterAction } from "../utils/types";
import { ACTIONS } from "../utils/utils";

export default function AddTodoForm({
  dispatch,
}: {
  dispatch: React.ActionDispatch<[action: CounterAction]>;
}) {
  const [newTodo, setNewTodo] = useState("");
  return (
    <form
      className="flex w-full flex-col md:flex-row pt-10 pb-5 gap-4 items-center"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({
          type: ACTIONS.ADD_TODO,
          payload: {
            newTodo: { id: Date.now(), title: newTodo, completed: false },
          },
        });
        setNewTodo("");
      }}
    >
      <input
        onChange={(e) => {
          e.preventDefault();
          setNewTodo(e.target.value);
        }}
        value={newTodo}
        type="text"
        className="text-white w-4/5 border-1 py-1 px-5 rounded-lg border-white"
      />
      <button
        className="text-white md:w-1/5 hover:bg-blue-950 cursor-pointer text-[15px] font-semibold text-nowrap p-2 bg-blue-900 rounded-lg"
        type="submit"
      >
        Add Todo
      </button>
    </form>
  );
}
