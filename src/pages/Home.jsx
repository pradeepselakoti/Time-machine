import React, { useState } from "react";
import TimerForm from "../components/TimerForm";
import TimerItem from "../components/TimerItem";
import { useTimers } from "../hooks/useTimers";
import CategoryActions from "../components/CategoryActions";

const Home = () => {
  const {
    timers,
    addTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    setTimers,
  } = useTimers();

  const categories = [...new Set(timers.map(t => t.category))];
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (category) => {
    setExpanded(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const filteredTimers = filter === "All"
    ? timers
    : timers.filter(t => t.category === filter);

  const groupedTimers = filteredTimers.reduce((acc, timer) => {
    if (!acc[timer.category]) acc[timer.category] = [];
    acc[timer.category].push(timer);
    return acc;
  }, {});

  const handleBulkAction = (category, action) => {
    const updateFn = {
      start: startTimer,
      pause: pauseTimer,
      reset: resetTimer,
    }[action];
    timers
      .filter(t => t.category === category)
      .forEach(t => updateFn(t.id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">⏱️ Timer Dashboard</h2>
      
      <TimerForm onAdd={addTimer} />

      <div className="my-4">
        <label className="mr-2">Filter by category:</label>
        <select
          className="p-2 border rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map(cat => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {Object.keys(groupedTimers).map(category => (
        <div key={category} className="mb-6 border p-4 rounded bg-gray-100 dark:bg-gray-800">
          <div className="flex justify-between items-center">
            <h3
              className="text-xl font-semibold cursor-pointer"
              onClick={() => toggleExpand(category)}
            >
              {expanded[category] ? "▼" : "▶"} {category} ({groupedTimers[category].length})
            </h3>
            <CategoryActions
              category={category}
              onBulkAction={handleBulkAction}
            />
          </div>
          {expanded[category] && (
            <div className="mt-3 space-y-3">
              {groupedTimers[category].map(timer => (
                <TimerItem
                  key={timer.id}
                  timer={timer}
                  onStart={startTimer}
                  onPause={pauseTimer}
                  onReset={resetTimer}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
