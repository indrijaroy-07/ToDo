function TodoItem({ todo, onToggle, onDelete, onEdit }) {
return (
<div
className={
todo.completed ? "todo-item completed" : "todo-item"
}
>
<input
type="checkbox"
checked={todo.completed}
onChange={() => onToggle(todo.id)}
/>

  <div className="todo-info">
    <h3>{todo.title}</h3>

    <p>
      Status: {todo.completed ? "Completed" : "Pending"}
    </p>

    {todo.dueDate && (
      <p>Due date: {todo.dueDate}</p>
    )}
  </div>

  <div className="todo-actions">
    <button
      type="button"
      onClick={() => onEdit(todo.id)}
    >
      Edit
    </button>

    <button
      type="button"
      className="delete-btn"
      onClick={() => onDelete(todo.id)}
    >
      Delete
    </button>
  </div>
</div>

);
}

export default TodoItem;