import { useReducer, useState } from "react";
import { Circle, PlusCircleIcon, Trash2, TrashIcon } from "lucide-react";

type action = "add-todo" | "remove-todo" | "complete-todo";
const ACTIONS: {
  ADD_TODO: action;
  REMOVE_TODO: action;
  COMPLETE_TODO: action;
} = {
  ADD_TODO: "add-todo",
  REMOVE_TODO: "remove-todo",
  COMPLETE_TODO: "complete-todo",
};

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

type Payload = { newTodo?: Todo; id?: number };

type CounterAction = { type: action; payload: Payload };

function reducer(todos: Todo[], action: CounterAction): Todo[] {
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
function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [newTodo, setNewTodo] = useState("");

  return (
    <>
      <div className="flex px-5 flex-col max-w-5xl mx-auto gap-4">
        <h1 className="text-5xl text-white text-center font-semibold">
          Welcome to <br /> <span className="text-blue-900">Ultimate</span> Todo
          App
        </h1>
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

        {todos && (
          <div className=" flex flex-col gap-6 md:gap-8">
            {todos.map((todo) => (
              <TodoCard key={todo.id} dispatch={dispatch} todo={todo} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;

function TodoCard({
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
      <div className=" flex  gap-2 items-center">
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
    </div>
  );
}
