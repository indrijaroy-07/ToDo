import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm.jsx";
import TodoList from "./components/TodoList.jsx";
import TodoFilter from "./components/TodoFilter.jsx";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("todos");

      if (!savedTodos) return [];

      const parsedTodos = JSON.parse(savedTodos);

      return Array.isArray(parsedTodos) ? parsedTodos : [];
    } catch (error) {
      console.error("Error loading tasks:", error);
      return [];
    }
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  }, [todos]);

  function addTodo(title, dueDate) {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    const newTodo = {
      id: Date.now(),
      title: trimmedTitle,
      dueDate: dueDate || "",
      completed: false,
    };

    setTodos((previousTodos) => [...previousTodos, newTodo]);
    setFilter("all");
  }

  function toggleTodo(id) {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((previousTodos) =>
      previousTodos.filter((todo) => todo.id !== id)
    );
  }

  function editTodo(id) {
    const todo = todos.find((item) => item.id === id);

    if (!todo) return;

    const newTitle = window.prompt(
      "Edit your task:",
      todo.title
    );

    if (newTitle === null || !newTitle.trim()) return;

    setTodos((previousTodos) =>
      previousTodos.map((item) =>
        item.id === id
          ? { ...item, title: newTitle.trim() }
          : item
      )
    );
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "pending") {
      return !todo.completed;
    }

    if (filter === "completed") {
      return todo.completed;
    }

    return true;
  });

  const pendingCount = todos.filter(
    (todo) => !todo.completed
  ).length;

  const completedCount = todos.filter(
    (todo) => todo.completed
  ).length;

  return (
    <div className="app-shell">
      <div className="todo-app">
        <header className="app-header">
          <div className="app-icon">✓</div>

          <p className="eyebrow">YOUR DAILY FLOW</p>
          <h1>TaskBloom</h1>

          <p className="subtitle">
            Turn your day into a clear plan and finish your priorities with focus.
          </p>

          <div className="quick-tags">
            <span>Focus</span>
            <span>Plan</span>
            <span>Finish</span>
          </div>
        </header>

        <div className="content-panel">
          <TodoForm onAdd={addTodo} />

          <TodoFilter
            filter={filter}
            setFilter={setFilter}
          />

          <div className="task-summary">
            <span>
              <strong>{todos.length}</strong>
              <small>Total</small>
            </span>
            <span>
              <strong>{pendingCount}</strong>
              <small>Pending</small>
            </span>
            <span>
              <strong>{completedCount}</strong>
              <small>Done</small>
            </span>
          </div>

          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App; 
