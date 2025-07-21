import { useReducer, useState } from "react";
import { PlusCircleIcon } from "lucide-react";

const ACTIONS = {
  ADD_TODO: "add-todo",
  REMOVE_TODO: "remove-todo",
  COMPLETE_TODO: "complete-todo",
};
function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, action.payload.newTodo];

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
      <div>
        {todos && (
          <div className=" flex flex-col gap-2">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="bg-green-400 items-center text-3xl flex justify-between text-white"
              >
                <p className={todo.completed ? "line-through" : ""}>
                  {todo.title}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch({
                        type: ACTIONS.REMOVE_TODO,
                        payload: { id: todo.id },
                      });
                      console.log(todos);
                    }}
                    className="bg-red-400 text-4xl py2 px-3 text-center"
                  >
                    x
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch({
                        type: ACTIONS.COMPLETE_TODO,
                        payload: { id: todo.id },
                      });
                      console.log(todos);
                    }}
                    className="bg-gray-400 text-4xl py2 px-3 text-center"
                  >
                    v
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <form
          className="flex items-center"
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
            className="text-black border-2 rounded-lg border-black"
          />
          <button type="submit">
            <PlusCircleIcon />
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
