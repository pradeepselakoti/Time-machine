// Updated App.jsx - Change the background from blue to white
// In your App.jsx file, change this line:
// <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
// To:
// <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">

import React, { useEffect, useState } from "react";
import { useTimersContext } from "../hooks/TimersContext";
import ProgressBar from "./ProgressBar";

const TimerItem = ({ timer }) => {
  const { startTimer, pauseTimer, resetTimer, deleteTimer } = useTimersContext();
  const [halfwayAlertShown, setHalfwayAlertShown] = useState(false);

  // Check for halfway point
  useEffect(() => {
    // Halfway alert (only show once per timer cycle)
    if (
      !halfwayAlertShown &&
      timer.remaining <= timer.duration / 2 &&
      timer.remaining > 0 &&
      timer.status === "Running"
    ) {
      setHalfwayAlertShown(true);
      // Show browser notification if supported
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(`⏱️ Timer Alert`, {
          body: `"${timer.name}" is halfway complete!`,
          icon: "/favicon.ico"
        });
      } else {
        // Fallback to alert
        alert(`⏳ Halfway there! "${timer.name}" is 50% complete.`);
      }
    }

    // Reset halfway alert when timer is reset
    if (timer.remaining === timer.duration) {
      setHalfwayAlertShown(false);
    }
  }, [timer.remaining, timer.status, timer.duration, timer.name, halfwayAlertShown]);

  // Request notification permission on mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Format time display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Get status color
  const getStatusColor = () => {
    switch (timer.status) {
      case "Running":
        return "text-green-600 dark:text-green-400";
      case "Paused":
        return "text-yellow-600 dark:text-yellow-400";
      case "Completed":
        return "text-blue-600 dark:text-blue-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  // Get status icon
  const getStatusIcon = () => {
    switch (timer.status) {
      case "Running":
        return "▶️";
      case "Paused":
        return "⏸️";
      case "Completed":
        return "✅";
      default:
        return "⏱️";
    }
  };

  const handleStart = () => {
    if (timer.remaining > 0) {
      startTimer(timer.id);
    }
  };

  const handlePause = () => {
    pauseTimer(timer.id);
  };

  const handleReset = () => {
    resetTimer(timer.id);
    setHalfwayAlertShown(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${timer.name}"?`)) {
      deleteTimer(timer.id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 space-y-4 transition-all duration-200 hover:shadow-lg">
      {/* Timer Header */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {timer.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Category: {timer.category}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {getStatusIcon()} {timer.status}
          </span>
        </div>
      </div>

      {/* Timer Display */}
      <div className="text-center">
        <div className="text-3xl font-mono font-bold text-gray-900 dark:text-white">
          {formatTime(Math.max(0, timer.remaining))}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Duration: {formatTime(timer.duration)}
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar 
        current={timer.remaining}
        total={timer.duration}
        showPercentage={true}
        showTime={false}
      />

      {/* Control Buttons */}
      <div className="flex justify-center space-x-2">
        <button
          onClick={handleStart}
          disabled={timer.status === "Running" || timer.remaining <= 0}
          className="flex items-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm font-medium"
        >
          <span>▶️</span>
          <span>Start</span>
        </button>
        
        <button
          onClick={handlePause}
          disabled={timer.status !== "Running"}
          className="flex items-center space-x-1 px-3 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm font-medium"
        >
          <span>⏸️</span>
          <span>Pause</span>
        </button>
        
        <button
          onClick={handleReset}
          className="flex items-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          <span>🔄</span>
          <span>Reset</span>
        </button>
        
        <button
          onClick={handleDelete}
          className="flex items-center space-x-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          <span>🗑️</span>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default TimerItem;