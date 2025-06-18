import { useState, useEffect } from "react";

export const useTimers = () => {
  const [timers, setTimers] = useState(() => {
    const stored = localStorage.getItem("timers");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timers));
  }, [timers]);

  const updateTimer = (id, updates) => {
    setTimers(timers =>
      timers.map(timer => (timer.id === id ? { ...timer, ...updates } : timer))
    );
  };

  const startTimer = id => {
    updateTimer(id, { status: "Running" });
  };

  const pauseTimer = id => {
    updateTimer(id, { status: "Paused" });
  };

  const resetTimer = id => {
    const timer = timers.find(t => t.id === id);
    updateTimer(id, { remaining: timer.duration, status: "Paused" });
  };

  const addTimer = timer => {
    setTimers([...timers, timer]);
  };

  return {
    timers,
    setTimers,
    startTimer,
    pauseTimer,
    resetTimer,
    addTimer,
  };
};
