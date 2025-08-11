import { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../services/taskService";

export default function ToDoPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await fetchTasks();
      setTasks(data);
    } catch (e) {
      setErr("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const { data } = await createTask({ title, completed: false });
      setTasks((prev) => [data, ...prev]);
      setTitle("");
    } catch {
      setErr("Failed to create task");
    }
  };

  const onToggle = async (t) => {
    try {
      const { data } = await updateTask(t._id, { completed: !t.completed });
      setTasks((prev) => prev.map((x) => (x._id === t._id ? data : x)));
    } catch {
      setErr("Failed to update task");
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((x) => x._id !== id));
    } catch {
      setErr("Failed to delete task");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">To-Do</h1>

      <form onSubmit={onAdd} className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="New task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="px-4 py-2 rounded bg-black text-white">Add</button>
      </form>

      {err && <div className="text-red-600 text-sm">{err}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : tasks.length === 0 ? (
        <div className="text-gray-500">No tasks yet.</div>
      ) : (
        <ul className="space-y-2">
          {tasks.map((t) => (
            <li key={t._id} className="flex items-center justify-between border rounded px-3 py-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={!!t.completed} onChange={() => onToggle(t)} />
                <span className={t.completed ? "line-through text-gray-500" : ""}>{t.title}</span>
              </label>
              <button
                onClick={() => onDelete(t._id)}
                className="text-sm text-white bg-red-600 px-2 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
