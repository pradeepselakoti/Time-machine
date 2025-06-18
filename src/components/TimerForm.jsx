import { useState } from "react";
import { useTimersContext } from "../hooks/TimersContext";

function TimerForm() {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(60);
  const [category, setCategory] = useState("");
  
  // Get addTimer from context
  const { addTimer } = useTimersContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add timer using context function
    addTimer(name, parseInt(duration), category);
    // Reset form
    setName("");
    setDuration(60);
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <div>
        <label className="block font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block font-medium">Duration (seconds)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block font-medium">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Timer
      </button>
    </form>
  );
}

export default TimerForm;