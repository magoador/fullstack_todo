import React, { useEffect } from "react";

const Todo = () => {
  const [todos, setTodos] = React.useState([]);
  const [text, setText] = React.useState("");
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/")
      .then((data) => data.json())
      .then((todos) => {
        setTodos(todos);
      });
  }, [todos]);

  const handleAddTodo = (id) => {
    fetch("http://localhost:4000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        text: text,
        doned: false,
      }),
    });
    setText('')
  };

  const handleDeleteTodo = (id) => {
    fetch("http://localhost:4000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: todos[id]._id,
      }),
    });
  };

  const handleChange = (id) => {
    setChecked(!checked);
    fetch("http://localhost:4000/", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: todos[id]._id,
        doned: checked,
      }),
    });
  };

  return (
    <div className="todos">
      <div className="todos_row">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={() => handleAddTodo()}>add</button>
      </div>
      <div className="todos_list">
        {todos.map((todo, index) => {
          return (
            <div
              className={todos[index].doned ? "todo doned" : "todo"}
              key={index}
            >
              <div className="todo_check">
                <input
                  type="checkbox"
                  checked={todos[index].doned}
                  onChange={() => handleChange(index)}
                />
              </div>
              <div className="todo_text">{todo.text}</div>
              <div className="todo_delete">
                <button onClick={() => handleDeleteTodo(index)}>x</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
