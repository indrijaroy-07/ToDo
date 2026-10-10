function TodoFilter({ filter, setFilter }) {
return (
<div className="todo-filter">
<button
type="button"
className={filter === "all" ? "active" : ""}
onClick={() => setFilter("all")}
>
All
</button>

  <button
    type="button"
    className={filter === "pending" ? "active" : ""}
    onClick={() => setFilter("pending")}
  >
    Pending
  </button>

  <button
    type="button"
    className={filter === "completed" ? "active" : ""}
    onClick={() => setFilter("completed")}
  >
    Completed
  </button>
</div>

);
}

export default TodoFilter;