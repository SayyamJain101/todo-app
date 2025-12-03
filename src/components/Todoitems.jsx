function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="flex items-center justify-between bg-slate-700 rounded-lg px-3 py-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
        />
        <span
          className={
            todo.completed
              ? "line-through text-slate-400"
              : ""
          }
        >
          {todo.title}
        </span>
      </div>
      <button
        onClick={onDelete}
        className="text-red-400 hover:text-red-500 text-sm"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
