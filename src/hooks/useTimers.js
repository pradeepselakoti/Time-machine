import { useState, useEffect } from "react";

// Custom hook to manage timers and history
export function useTimers() {
  // All timers grouped in one array
  const [timers, setTimers] = useState(() => {
    // Load from localStorage on first run
    const saved = localStorage.getItem("timers");
    return saved ? JSON.parse(saved) : [];
  });

  // Completed timers history
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever timers change
  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timers));
  }, [timers]);

  // Save history too
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  // Add a new timer
  const addTimer = (name, duration, category) => {
    const newTimer = {
      id: Date.now(),
      name,
      duration,
      remaining: duration,
      category,
      status: "paused",
    };
    setTimers((prev) => [...prev, newTimer]);
  };

  // Start a timer
  const startTimer = (id) => {
    setTimers((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "running" } : t
      )
    );
  };

  // Pause a timer
  const pauseTimer = (id) => {
    setTimers((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "paused" } : t
      )
    );
  };

  // Reset a timer
  const resetTimer = (id) => {
    setTimers((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, remaining: t.duration, status: "paused" } : t
      )
    );
  };

  // Remove a completed timer from the list
  const removeTimer = (id) => {
    setTimers((prev) => prev.filter((t) => t.id !== id));
  };

  // Bulk start/pause/reset for a category
  const bulkAction = (category, action) => {
    setTimers((prev) =>
      prev.map((t) => {
        if (t.category === category) {
          if (action === "start") return { ...t, status: "running" };
          if (action === "pause") return { ...t, status: "paused" };
          if (action === "reset") return { ...t, remaining: t.duration, status: "paused" };
        }
        return t;
      })
    );
  };

  // Tick: decrease running timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const updatedTimers = [];
        const newHistoryItems = [];

        prev.forEach((t) => {
          if (t.status === "running" && t.remaining > 0) {
            const updated = { ...t, remaining: t.remaining - 1 };
            
            // If timer just completed
            if (updated.remaining === 0) {
              updated.status = "completed";
              // Add to history instead of keeping in timers
              newHistoryItems.push({
                name: updated.name,
                category: updated.category,
                duration: updated.duration,
                completedAt: new Date().toISOString()
              });
              // Don't add completed timer back to the list
            } else {
              updatedTimers.push(updated);
            }
          } else {
            // Keep non-running or already completed timers
            if (t.status !== "completed") {
              updatedTimers.push(t);
            }
          }
        });

        // Add new history items if any
        if (newHistoryItems.length > 0) {
          setHistory((h) => [...h, ...newHistoryItems]);
        }

        return updatedTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    timers,
    history,
    addTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    removeTimer,
    bulkAction,
  };
}