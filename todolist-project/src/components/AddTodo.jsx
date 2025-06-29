import { useState } from 'react';
import axios from 'axios';
import './AddTodo.css';

function AddTodo() {
  const [form, setForm] = useState({ name: '', writer: '', content: '' });
  const POST_URL = import.meta.env.VITE_POST_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      records: [
        {
          fields: {
            name: form.name,
            writer: form.writer,
            content: form.content,
          }
        }
      ]
    };

    try {
      const res = await axios.post(`${POST_URL}/todos`, postData);
      console.log('투두 등록 성공!', res.data);
      alert("투두 등록 성공!");
      setForm({ name: '', writer: '', content: '' });
    } catch (err) {
      console.error('투두 등록 실패', err);
    }
  };

  return (
    <div className="addtodo-wrapper">
      <h2>과제 등록</h2>
      <form onSubmit={handleSubmit} className="addtodo-form">
        <label>제목: <input type="text" name="name" value={form.name} onChange={handleChange} required /></label><br />
        <label>작성자: <input type="text" name="writer" value={form.writer} onChange={handleChange} required /></label><br />
        <label>내용: <textarea name="content" value={form.content} onChange={handleChange} required /></label><br />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default AddTodo;
