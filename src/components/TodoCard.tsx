import { Circle, TrashIcon } from "lucide-react";
import type { CounterAction, Todo } from "../utils/types";
import { ACTIONS } from "../utils/utils";

export default function TodoCard({
  todo,
  dispatch,
}: {
  todo: Todo;
  dispatch: ({ type, payload }: CounterAction) => void;
}) {
  return (
    <div
      key={todo.id}
      className=" items-center justify-between text-xl flex w-full text-white"
    >
      <div className="flex gap-10 justify-center items-center">
        <Circle
          className={`${
            todo.completed ? "**:fill-green-500 rounded-full" : " "
          }`}
          onClick={(e) => {
            e.preventDefault();
            dispatch({
              type: ACTIONS.COMPLETE_TODO,
              payload: { id: todo.id },
            });
          }}
        />
        <p className={todo.completed ? "line-through" : ""}>{todo.title}</p>
      </div>
      <TrashIcon
        className="text-red-400"
        onClick={(e) => {
          e.preventDefault();
          dispatch({
            type: ACTIONS.REMOVE_TODO,
            payload: { id: todo.id },
          });
        }}
      />
    </div>
  );
}
