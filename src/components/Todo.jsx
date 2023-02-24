import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  fetchTodos,
  removeTodo,
  updateTodo,
} from "../redux/features/todosSlice";

const Todo = () => {
  const [text, setText] = React.useState("");
  const [checked, setChecked] = React.useState(false);

  const todosArr = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="todos">
      <div className="todos_row">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={() => {
            dispatch(addTodo(text));
            setText("");
          }}
        >
          add
        </button>
      </div>
      <div className="todos_list">
        {todosArr.map((todo, index) => {
          return (
            <div className={todo.doned ? "todo doned" : "todo"} key={index}>
              <div className="todo_check">
                <input
                  type="checkbox"
                  checked={todo.doned}
                  onChange={() => {
                    dispatch(updateTodo({ id: todo._id, doned: todo.doned }));
                    setChecked(!checked);
                  }}
                />
              </div>
              <div className="todo_text">{todo.text}</div>
              <div className="todo_delete">
                <button onClick={() => dispatch(removeTodo(todo._id))}>
                  x
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
