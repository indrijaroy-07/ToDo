import { useState } from "react";

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const taskTitle = title.trim();

    if (!taskTitle) {
      alert("Please enter a task!");
      return;
    }

    if (typeof onAdd !== "function") {
      alert("Task function is not connected. Check App.jsx.");
      return;
    }

    onAdd(taskTitle, dueDate);

    setTitle("");
    setDueDate("");
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your task..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TodoForm;
