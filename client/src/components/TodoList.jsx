import React from "react";
import SimpleDateTime from "react-simple-timestamp-to-date";
import moment from "moment-timezone";
import "./todolist.css";

function TodoList({ todos, onTodoUpdate, onTodoDelete }) {
  const toggleTodo = async (id, isCompleted) => {
    try {
      await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_completed: !isCompleted,
          taskstatus: !isCompleted ? "Completed" : "Pending",
          updated_at: new Date().toLocaleString(),
          updatestat: "Updated",
        }),
      });
      onTodoUpdate();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "DELETE",
      });
      onTodoDelete();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };



  return (
    <div className="container-list">
      {todos.length === 0 ? (
        <div>No Todos available</div>
      ) : (
        todos.map((todo) => (
          <div key={todo.id} className="list-item">
            <div className="list-item-content">
              <input
                type="checkbox"
                checked={todo.is_completed}
                onChange={() => toggleTodo(todo.id, todo.is_completed)}
                className="checkbox"
              />
              <div>
                <h3 className="list-title">{todo.title}</h3>
                {todo.description && (
                  <p className="list-title translucent">{todo.description}</p>
                )}
              </div>
            </div>

            <div className="list-item-actionList">
              <div>
                <p className="translucent">{todo.taskstatus}</p>
              </div>
              <div className="list-item-actions">
                <button onClick={() => deleteTodo(todo.id)} className="deleteButton">
                  Delete
                </button>
                <p className="translucent">
                  {todo.updatedstat === "Updated" ? "Updated :" : "Created :"}
                  <SimpleDateTime
                    dateSeparator="/"
                    timeSeparator=":"
                    format="YMD">
                    {todo.updated_at || todo.created_at}
                  </SimpleDateTime>
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TodoList;
