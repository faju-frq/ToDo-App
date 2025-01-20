import React, { useState } from "react";
import "./todoform.css"

function TodoForm({ onTodoAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setError("Title cannot be empty");
      return;
    }
    try {
      await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      setTitle("");
      setDescription("");
      onTodoAdd();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form-container">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo title"
        className="todo-title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description (optional)"
        className="todo-description"
      />
      <button
        type="submit"
        className="todo-submit">
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
