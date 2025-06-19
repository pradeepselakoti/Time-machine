// src/components/CategoryActions.jsx
import React from 'react';
import { useTimersContext } from '../hooks/TimersContext';

const CategoryActions = ({ category }) => {
  const { bulkAction, getTimersByCategory } = useTimersContext();
  
  const categoryTimers = getTimersByCategory(category);
  const hasTimers = categoryTimers.length > 0;
  const hasRunningTimers = categoryTimers.some(timer => timer.status === 'Running');
  const hasPausedTimers = categoryTimers.some(timer => timer.status === 'Paused' && timer.remaining > 0);

  const handleBulkStart = () => {
    bulkAction(category, 'start');
  };

  const handleBulkPause = () => {
    bulkAction(category, 'pause');
  };

  const handleBulkReset = () => {
    if (window.confirm(`Reset all timers in "${category}" category?`)) {
      bulkAction(category, 'reset');
    }
  };

  if (!hasTimers) return null;

  return (
    <div className="flex items-center justify-end space-x-2 pb-3 border-b border-gray-200 dark:border-gray-600 mb-4">
      <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
        Category Actions:
      </span>
      
      <button
        onClick={handleBulkStart}
        disabled={!hasPausedTimers}
        className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded text-sm font-medium transition-colors"
        title="Start all paused timers in this category"
      >
        <span>▶️</span>
        <span>Start All</span>
      </button>
      
      <button
        onClick={handleBulkPause}
        disabled={!hasRunningTimers}
        className="flex items-center space-x-1 px-3 py-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded text-sm font-medium transition-colors"
        title="Pause all running timers in this category"
      >
        <span>⏸️</span>
        <span>Pause All</span>
      </button>
      
      <button
        onClick={handleBulkReset}
        className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
        title="Reset all timers in this category"
      >
        <span>🔄</span>
        <span>Reset All</span>
      </button>
    </div>
  );
};

export default CategoryActions;