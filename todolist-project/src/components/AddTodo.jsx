import { useState } from "react";
import "./AddTodo.css";

export default function AddTodo() {
  const [todo, setTodo] = useState({
    name: "",
    writer: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: Date.now(), 
      name: todo.name,
      writer: todo.writer,
      content: todo.content,
      createdTime: new Date().toISOString(),
    };


    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];


    const updatedTodos = [...storedTodos, newTodo];


    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    alert("투두 등록 완료!");
    setTodo({ name: "", writer: "", content: "" });
  };

  return (
    <div className="add-wrapper">
      <h2>과제 등록</h2>
      <form onSubmit={handleSubmit}>
        <label>
          제목: <br />
          <input
            type="text"
            name="name"
            value={todo.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          작성자: <br />
          <input
            type="text"
            name="writer"
            value={todo.writer}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          내용: <br />
          <textarea
            name="content"
            value={todo.content}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
