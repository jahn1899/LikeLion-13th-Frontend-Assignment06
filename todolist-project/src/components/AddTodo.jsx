import { useState } from "react";
import axios from "axios";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://dummyjson.com/posts/add", {
        title: todo.name,     
        body: todo.content,
        userId: 1,            
      });

      console.log("투두리스트 등록 성공!", response.data);
      alert("투두리스트 등록 완료!");
    } catch (error) {
      console.error("투두리스트 등록 실패", error);
      alert("투두리스트 등록 실패!");
    }
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