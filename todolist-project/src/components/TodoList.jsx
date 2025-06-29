import { useEffect, useState } from "react";
import "./TodoList.css";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos.reverse()); // 최신 등록 순으로 정렬
  }, []);

  return (
    <div className="todo-wrapper">
      <h2>투두 리스트</h2>
      {todos.length === 0 ? (
        <p>불러올 투두가 없습니다.</p>
      ) : (
        todos.map((todo) => (
          <div key={todo.id} className="todos">
            <p>
              <strong>제목:</strong> {todo.name}
            </p>
            <p>
              <strong>작성자:</strong> {todo.writer}
            </p>
            <p>
              <strong>내용:</strong> {todo.content}
            </p>
            <p>
              <strong>작성일:</strong>{" "}
              {new Date(todo.createdTime).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
