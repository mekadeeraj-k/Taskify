import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Pencil, Trash2 } from "lucide-react"; // icons

const TodoPage = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");

  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "" && editId === null) return;

    if (editId !== null) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editId ? { ...task, text: editText } : task
        )
      );
      setEditId(null);
      setEditText("");
    } else {
      const newTaskObj = {
        id: Date.now(),
        text: newTask,
        completed: false,
      };
      setTasks((prev) => [...prev, newTaskObj]);

      setTimeout(() => {
        gsap.fromTo(
          `#task-${newTaskObj.id}`,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4 }
        );
      }, 50);
    }
    setNewTask("");
  };

  const deleteTask = (id) => {
    gsap.to(`#task-${id}`, {
      opacity: 0,
      x: 100,
      duration: 0.3,
      onComplete: () => setTasks((prev) => prev.filter((task) => task.id !== id)),
    });
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEdit = (task) => {
    setEditId(task.id);
    setEditText(task.text);
    inputRef.current.focus();
  };

  const clearAll = () => {
    setTasks([]);
  };

  const activeCount = tasks.filter((task) => !task.completed).length;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-200 flex flex-col items-center justify-start p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Todo List
        </h1>

        {/* Input */}
        <div className="flex mb-6">
          <input
            ref={inputRef}
            type="text"
            value={editId !== null ? editText : newTask}
            onChange={(e) =>
              editId !== null
                ? setEditText(e.target.value)
                : setNewTask(e.target.value)
            }
            placeholder="Enter a task..."
            className="flex-1 p-3 border border-gray-300 rounded-l-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" style={{color:"black"}}
          />
          <button
            onClick={addTask}
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-3 rounded-r-xl hover:from-indigo-600 hover:to-indigo-700 transition font-semibold"
          >
            {editId !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* Filters */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === "all"
                ? "bg-indigo-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === "active"
                ? "bg-indigo-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === "completed"
                ? "bg-indigo-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Clear All */}
        {tasks.length > 0 && (
          <button
            onClick={clearAll}
            className="mb-6 block mx-auto text-red-500 hover:underline font-medium"
          >
            Clear All Tasks
          </button>
        )}

        {/* Task List */}
        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              id={`task-${task.id}`}
              className={`flex justify-between items-center p-4 rounded-xl shadow-md bg-gray-50 hover:bg-gray-100 transition ${
                task.completed ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="w-5 h-5 accent-indigo-500"
                />
                <span className="font-medium text-base">{task.text}</span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => startEdit(task)}
                  className="text-yellow-500 hover:text-yellow-600"
                  title="Edit"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Active Task Count */}
        <div className="mt-6 text-center">
          <span className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">
            {activeCount} Active task(s) left
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;


