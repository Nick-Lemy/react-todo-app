import { Circle, TrashIcon } from "lucide-react";
import type { CounterAction, Todo } from "../utils/types";
import { ACTIONS } from "../utils/utils";
import CustomButtonIcon from "./CustomButtonIcon";

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
      className=" items-center px-6 md:px-0 justify-between text-lg md:text-xl flex w-full text-white"
    >
      <div className="flex gap-4 md:gap-8 justify-center items-center">
        <CustomButtonIcon
          className={`${
            todo.completed ? "**:fill-green-500 rounded-full" : " "
          }`}
          Icon={Circle}
          actionType={ACTIONS.COMPLETE_TODO}
          dispatch={dispatch}
          todoId={todo.id}
        />
        <p className={todo.completed ? "line-through" : ""}>{todo.title}</p>
      </div>
      <CustomButtonIcon
        className="text-red-400"
        Icon={TrashIcon}
        dispatch={dispatch}
        todoId={todo.id}
        actionType={ACTIONS.REMOVE_TODO}
      />
    </div>
  );
}
