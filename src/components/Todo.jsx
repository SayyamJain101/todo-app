import { useEffect, useState } from "react";
import api from "../api";
import TodoItem from "./Todoitems";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch todos on mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const res = await api.get("/todos");
        setTodos(res.data);
      } catch (err) {
        console.error("Failed to fetch todos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;

    try {
      const res = await api.post("/todos", { title });
      setTodos((prev) => [res.data, ...prev]); // add new at top
      setNewTitle("");
    } catch (err) {
      console.error("Failed to add todo", err);
    }
  };

  const handleToggleTodo = async (id, currentCompleted) => {
    try {
      const res = await api.put(`/todos/${id}`, {
        completed: !currentCompleted,
      });

      setTodos((prev) =>
        prev.map((t) => (t._id === id ? res.data : t))
      );
    } catch (err) {
      console.error("Failed to toggle todo", err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Failed to delete todo", err);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Todo App (MERN)
      </h1>

      <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 font-semibold"
        >
          Add
        </button>
      </form>

      {loading ? (
        <p className="text-center text-slate-400">Loading...</p>
      ) : todos.length === 0 ? (
        <p className="text-center text-slate-400">No tasks yet.</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={() =>
                handleToggleTodo(todo._id, todo.completed)
              }
              onDelete={() => handleDeleteTodo(todo._id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Todo;
