import React from "react";
import { useTimersContext } from "../hooks/TimersContext";

const BulkActions = ({ selectedCategory = "All" }) => {
  const { 
    timers, 
    getCategories, 
    getTimersByCategory,
    getTimersByStatus,
    startTimer,
    pauseTimer,
    resetTimer,
    clearCompletedTimers
  } = useTimersContext();

  // Get timers to operate on based on selected category
  const getTargetTimers = () => {
    if (selectedCategory === "All") {
      return timers;
    }
    return getTimersByCategory(selectedCategory);
  };

  const targetTimers = getTargetTimers();
  const categories = getCategories();

  // Get statistics
  const runningTimers = targetTimers.filter(timer => timer.status === "Running");
  const pausedTimers = targetTimers.filter(timer => timer.status === "Paused");
  const completedTimers = targetTimers.filter(timer => timer.status === "Completed");
  const allCompletedTimers = getTimersByStatus("Completed");

  // Bulk action handlers
  const handleBulkStart = () => {
    const eligibleTimers = targetTimers.filter(timer => 
      timer.status === "Paused" && timer.remaining > 0
    );
    
    if (eligibleTimers.length === 0) {
      alert("No paused timers with remaining time to start.");
      return;
    }

    const confirmMessage = selectedCategory === "All" 
      ? `Start ${eligibleTimers.length} eligible timer(s)?`
      : `Start ${eligibleTimers.length} eligible timer(s) in "${selectedCategory}"?`;

    if (window.confirm(confirmMessage)) {
      eligibleTimers.forEach(timer => startTimer(timer.id));
    }
  };

  const handleBulkPause = () => {
    if (runningTimers.length === 0) {
      alert("No running timers to pause.");
      return;
    }

    const confirmMessage = selectedCategory === "All"
      ? `Pause ${runningTimers.length} running timer(s)?`
      : `Pause ${runningTimers.length} running timer(s) in "${selectedCategory}"?`;

    if (window.confirm(confirmMessage)) {
      runningTimers.forEach(timer => pauseTimer(timer.id));
    }
  };

  const handleBulkReset = () => {
    const eligibleTimers = targetTimers.filter(timer => 
      timer.status !== "Completed" || timer.remaining !== timer.duration
    );

    if (eligibleTimers.length === 0) {
      alert("No timers to reset.");
      return;
    }

    const confirmMessage = selectedCategory === "All"
      ? `Reset ${eligibleTimers.length} timer(s)? This will stop running timers and restore original durations.`
      : `Reset ${eligibleTimers.length} timer(s) in "${selectedCategory}"? This will stop running timers and restore original durations.`;

    if (window.confirm(confirmMessage)) {
      eligibleTimers.forEach(timer => resetTimer(timer.id));
    }
  };

  const handleClearCompleted = () => {
    if (allCompletedTimers.length === 0) {
      alert("No completed timers to clear.");
      return;
    }

    const confirmMessage = `Clear ${allCompletedTimers.length} completed timer(s)? This action cannot be undone.`;

    if (window.confirm(confirmMessage)) {
      clearCompletedTimers();
    }
  };

  if (targetTimers.length === 0) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No timers available for bulk actions.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          🔧 Bulk Actions
        </h3>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Scope: <span className="font-medium">{selectedCategory}</span>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {targetTimers.length}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {runningTimers.length}
          </div>
          <div className="text-xs text-green-600 dark:text-green-400">Running</div>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {pausedTimers.length}
          </div>
          <div className="text-xs text-yellow-600 dark:text-yellow-400">Paused</div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {completedTimers.length}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">Completed</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Primary Actions */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleBulkStart}
            disabled={pausedTimers.filter(t => t.remaining > 0).length === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
          >
            <span>▶️</span>
            <span>Start All Eligible</span>
            <span className="text-xs bg-green-700 px-2 py-1 rounded-full">
              {pausedTimers.filter(t => t.remaining > 0).length}
            </span>
          </button>

          <button
            onClick={handleBulkPause}
            disabled={runningTimers.length === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
          >
            <span>⏸️</span>
            <span>Pause All Running</span>
            <span className="text-xs bg-yellow-700 px-2 py-1 rounded-full">
              {runningTimers.length}
            </span>
          </button>

          <button
            onClick={handleBulkReset}
            disabled={targetTimers.length === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
          >
            <span>🔄</span>
            <span>Reset All</span>
            <span className="text-xs bg-blue-700 px-2 py-1 rounded-full">
              {targetTimers.length}
            </span>
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-600">
          <button
            onClick={handleClearCompleted}
            disabled={allCompletedTimers.length === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
          >
            <span>🗑️</span>
            <span>Clear Completed</span>
            <span className="text-xs bg-red-700 px-2 py-1 rounded-full">
              {allCompletedTimers.length}
            </span>
          </button>
        </div>
      </div>

      {/* Help Text */}
      <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded p-2">
        <p><strong>Tip:</strong> Use bulk actions to control multiple timers at once. Only eligible timers will be affected by each action.</p>
      </div>
    </div>
  );
};

export default BulkActions;