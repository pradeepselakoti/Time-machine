import { createContext, useContext, useState, useEffect, useCallback } from "react";

// Create context
export const TimersContext = createContext();

// Hook to use context easily
export const useTimersContext = () => {
  const context = useContext(TimersContext);
  if (!context) {
    throw new Error("useTimersContext must be used within TimersProvider");
  }
  return context;
};

// Timer Provider Component
export const TimersProvider = ({ children }) => {
  // Load initial state from localStorage
  const [timers, setTimers] = useState(() => {
    const stored = localStorage.getItem("timers");
    return stored ? JSON.parse(stored) : [];
  });

  const [history, setHistory] = useState(() => {
    const storedHistory = localStorage.getItem("timerHistory");
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  // Save to localStorage whenever timers or history changes
  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timers));
  }, [timers]);

  useEffect(() => {
    localStorage.setItem("timerHistory", JSON.stringify(history));
  }, [history]);

  // Timer interval management
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers => 
        prevTimers.map(timer => {
          if (timer.status === "Running" && timer.remaining > 0) {
            const newRemaining = timer.remaining - 1;
            
            // Check if timer just completed
            if (newRemaining <= 0) {
              // Add to history
              const completedTimer = {
                ...timer,
                remaining: 0,
                status: "Completed",
                completedAt: new Date().toISOString()
              };
              
              // Add to history state
              setHistory(prev => [completedTimer, ...prev]);
              
              return completedTimer;
            }
            
            return { ...timer, remaining: newRemaining };
          }
          return timer;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Add new timer
  const addTimer = useCallback((timerData) => {
    const newTimer = {
      id: Date.now() + Math.random(), // Ensure unique ID
      name: timerData.name,
      duration: parseInt(timerData.duration),
      remaining: parseInt(timerData.duration),
      category: timerData.category,
      status: "Paused",
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTimers(prev => [...prev, newTimer]);
    return newTimer;
  }, []);

  // Update specific timer
  const updateTimer = useCallback((id, updates) => {
    setTimers(prev => 
      prev.map(timer => 
        timer.id === id ? { ...timer, ...updates } : timer
      )
    );
  }, []);

  // Start timer
  const startTimer = useCallback((id) => {
    updateTimer(id, { status: "Running" });
  }, [updateTimer]);

  // Pause timer
  const pauseTimer = useCallback((id) => {
    updateTimer(id, { status: "Paused" });
  }, [updateTimer]);

  // Reset timer
  const resetTimer = useCallback((id) => {
    setTimers(prev => 
      prev.map(timer => {
        if (timer.id === id) {
          return {
            ...timer,
            remaining: timer.duration,
            status: "Paused",
            completed: false
          };
        }
        return timer;
      })
    );
  }, []);

  // Delete timer
  const deleteTimer = useCallback((id) => {
    setTimers(prev => prev.filter(timer => timer.id !== id));
  }, []);

  // Bulk actions for category
  const bulkAction = useCallback((category, action) => {
    const categoryTimers = timers.filter(timer => timer.category === category);
    
    categoryTimers.forEach(timer => {
      switch (action) {
        case "start":
          if (timer.remaining > 0) startTimer(timer.id);
          break;
        case "pause":
          pauseTimer(timer.id);
          break;
        case "reset":
          resetTimer(timer.id);
          break;
        default:
          break;
      }
    });
  }, [timers, startTimer, pauseTimer, resetTimer]);

  // Get unique categories
  const getCategories = useCallback(() => {
    return [...new Set(timers.map(timer => timer.category))].filter(Boolean);
  }, [timers]);

  // Get timers by category
  const getTimersByCategory = useCallback((category) => {
    return timers.filter(timer => timer.category === category);
  }, [timers]);

  // Get timers by status
  const getTimersByStatus = useCallback((status) => {
    return timers.filter(timer => timer.status === status);
  }, [timers]);

  // Clear completed timers
  const clearCompletedTimers = useCallback(() => {
    setTimers(prev => prev.filter(timer => timer.status !== "Completed"));
  }, []);

  // Export history as JSON
  const exportHistory = useCallback(() => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `timer-history-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [history]);

  // Clear all history
  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const value = {
    // State
    timers,
    history,
    
    // Basic timer operations
    addTimer,
    updateTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    deleteTimer,
    
    // Bulk operations
    bulkAction,
    clearCompletedTimers,
    
    // Utility functions
    getCategories,
    getTimersByCategory,
    getTimersByStatus,
    
    // History operations
    exportHistory,
    clearHistory
  };

  return (
    <TimersContext.Provider value={value}>
      {children}
    </TimersContext.Provider>
  );
};