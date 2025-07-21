import type { LucideProps } from "lucide-react";
import type { action, CounterAction } from "../utils/types";
import React from "react";

export default function CustomButtonIcon({
  Icon,
  dispatch,
  todoId,
  actionType,
  className,
}: {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  dispatch: ({ type, payload }: CounterAction) => void;
  todoId: number;
  actionType: action;
  className?: string;
}) {
  return (
    <Icon
      className={className || ""}
      onClick={(e) => {
        e.preventDefault();
        dispatch({
          type: actionType,
          payload: { id: todoId },
        });
      }}
    />
  );
}
