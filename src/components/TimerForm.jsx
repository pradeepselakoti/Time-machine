import { useState } from "react";

function TimerForm({ onAdd }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(60);
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !category || duration <= 0) return;
    const newTimer = {
      id: Date.now(),
      name,
      duration,
      remaining: duration,
      category,
      status: "Paused",
      completed: false,
    };
    onAdd(newTimer);
    setName("");
    setDuration(60);
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded shadow">
      <div>
        <label className="block font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div>
        <label className="block font-medium">Duration (seconds)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div>
        <label className="block font-medium">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Timer
      </button>
    </form>
  );
}

export default TimerForm;
