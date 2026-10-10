
import TodoItem from "./TodoItem.jsx";

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tasks found</h3>
        <p>Add a task or change your filter.</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TodoList;
