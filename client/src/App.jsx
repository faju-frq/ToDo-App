import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <h1 className="heading">Todo App</h1>
      <TodoForm onTodoAdd={fetchTodos} />
      <TodoList 
        todos={todos} 
        onTodoUpdate={fetchTodos} 
        onTodoDelete={fetchTodos} 
      />
    </div>
  );
}

export default App;