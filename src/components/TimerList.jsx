// src/components/TimerList.jsx
import React from 'react';
import { useTimersContext } from '../hooks/TimersContext';
import TimerItem from './TimerItem';
import CategoryActions from './CategoryActions';

const TimerList = () => {
  const { timers } = useTimersContext();

  // Group timers by category
  const groupedTimers = timers.reduce((acc, timer) => {
    if (!acc[timer.category]) {
      acc[timer.category] = [];
    }
    acc[timer.category].push(timer);
    return acc;
  }, {});

  // If no timers, show empty state
  if (timers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⏱️</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No timers yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Create your first timer to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedTimers).map(([category, categoryTimers]) => (
        <div key={category} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          {/* Category Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <span className="mr-2">📁</span>
              {category}
              <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                ({categoryTimers.length})
              </span>
            </h2>
          </div>

          {/* Category Actions */}
          <CategoryActions category={category} />

          {/* Timer Items */}
          <div className="space-y-4">
            {categoryTimers.map((timer) => (
              <TimerItem key={timer.id} timer={timer} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimerList;