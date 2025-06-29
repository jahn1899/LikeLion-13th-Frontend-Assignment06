import { useEffect, useState } from "react";
import axios from "axios";
import "./TodoList.css";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const getUrl = import.meta.env.VITE_GET_URL;
        const res = await axios.get(`${getUrl}/todos`);

        const records = res.data.records;
        if (Array.isArray(records)) {
          setTodos(records.reverse());
        } else {
          console.warn("예상한 records 배열이 없습니다:", res.data);
        }
      } catch (error) {
        console.error("투두 불러오기 실패", error);
      }
    };

    fetchTodos();
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
              <strong>제목:</strong> {todo.fields?.name || "-"}
            </p>
            <p>
              <strong>작성자:</strong> {todo.fields?.writer || "-"}
            </p>
            <p>
              <strong>내용:</strong> {todo.fields?.content || "-"}
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
