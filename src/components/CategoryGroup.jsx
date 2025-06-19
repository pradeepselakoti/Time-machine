import React, { useState } from "react";
import { useTimersContext } from "../hooks/TimersContext";
import TimerItem from "./TimerItem";

const CategoryGroup = ({ category, timers }) => {
  const { bulkAction } = useTimersContext();
  const [isExpanded, setIsExpanded] = useState(true);

  // Get category statistics
  const runningCount = timers.filter(timer => timer.status === "Running").length;
  const pausedCount = timers.filter(timer => timer.status === "Paused").length;
  const completedCount = timers.filter(timer => timer.status === "Completed").length;
  const totalCount = timers.length;

  // Handle bulk actions
  const handleBulkAction = (action) => {
    bulkAction(category, action);
  };

  // Get category color based on activity
  const getCategoryColor = () => {
    if (runningCount > 0) return "border-green-500 bg-green-50 dark:bg-green-900/20";
    if (pausedCount > 0) return "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
    if (completedCount > 0) return "border-blue-500 bg-blue-50 dark:bg-blue-900/20";
    return "border-gray-300 bg-gray-50 dark:bg-gray-800";
  };

  return (
    <div className={`rounded-lg border-2 ${getCategoryColor()} mb-6 transition-all duration-200`}>
      {/* Category Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-600">
        <div className="flex justify-between items-center">
          {/* Category Title and Stats */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2 text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <span className="transform transition-transform duration-200">
                {isExpanded ? "▼" : "▶"}
              </span>
              <span>{category}</span>
            </button>
            
            {/* Stats Pills */}
            <div className="flex space-x-2">
              <span className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                Total: {totalCount}
              </span>
              {runningCount > 0 && (
                <span className="px-2 py-1 text-xs font-medium bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full">
                  Running: {runningCount}
                </span>
              )}
              {pausedCount > 0 && (
                <span className="px-2 py-1 text-xs font-medium bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded-full">
                  Paused: {pausedCount}
                </span>
              )}
              {completedCount > 0 && (
                <span className="px-2 py-1 text-xs font-medium bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full">
                  Completed: {completedCount}
                </span>
              )}
            </div>
          </div>

          {/* Bulk Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => handleBulkAction("start")}
              className="flex items-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
              title="Start all timers in this category"
            >
              <span>▶️</span>
              <span>Start All</span>
            </button>
            
            <button
              onClick={() => handleBulkAction("pause")}
              className="flex items-center space-x-1 px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors text-sm font-medium"
              title="Pause all timers in this category"
            >
              <span>⏸️</span>
              <span>Pause All</span>
            </button>
            
            <button
              onClick={() => handleBulkAction("reset")}
              className="flex items-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
              title="Reset all timers in this category"
            >
              <span>🔄</span>
              <span>Reset All</span>
            </button>
          </div>
        </div>

        {/* Progress Summary Bar */}
        {isExpanded && totalCount > 0 && (
          <div className="mt-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Category Progress:</span>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="flex h-full rounded-full overflow-hidden">
                  {runningCount > 0 && (
                    <div 
                      className="bg-green-500 h-full"
                      style={{ width: `${(runningCount / totalCount) * 100}%` }}
                    />
                  )}
                  {pausedCount > 0 && (
                    <div 
                      className="bg-yellow-500 h-full"
                      style={{ width: `${(pausedCount / totalCount) * 100}%` }}
                    />
                  )}
                  {completedCount > 0 && (
                    <div 
                      className="bg-blue-500 h-full"
                      style={{ width: `${(completedCount / totalCount) * 100}%` }}
                    />
                  )}
                </div>
              </div>
              <span className="text-xs">
                {Math.round(((runningCount + completedCount) / totalCount) * 100)}% active
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Timers List */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {timers.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-2">⏱️</div>
              <p>No timers in this category yet.</p>
            </div>
          ) : (
            timers.map(timer => (
              <TimerItem key={timer.id} timer={timer} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryGroup;