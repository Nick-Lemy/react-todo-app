import { useReducer, useState } from "react";

const ACTIONS = {
  ADD_TODO: "add-todo",
  REMOVE_TODO: "remove-todo",
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

    default:
      break;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [newTodo, setNewTodo] = useState("");

  return (
    <>
      <div>
        {todos && (
          <div>
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="bg-green-400 flex justify-between text-white"
              >
                <p>{todo.title}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch({
                      type: ACTIONS.REMOVE_TODO,
                      payload: { id: todo.id },
                    });
                  }}
                  className="bg-red-400 py2 px-3 text-center"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({
              type: ACTIONS.ADD_TODO,
              payload: { newTodo: { id: Date.now(), title: newTodo } },
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
            className="text-black border-2 border-black"
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    </>
  );
}

export default App;
