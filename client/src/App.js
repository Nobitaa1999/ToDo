import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks');
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (task.trim()) {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: task.trim() }),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setTask("");
    }
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const toggleCompleteTask = async (id, completed) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    });
    const updatedTask = await response.json();
    setTasks(tasks.map((task) => 
      task._id === id ? updatedTask : task
    ));
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div className="input-section">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className={task.completed ? "completed" : ""}>
            <span onClick={() => toggleCompleteTask(task._id, task.completed)}>
              {task.text}
            </span>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
