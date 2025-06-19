import React from "react";
import { useTimersContext } from "../hooks/TimersContext";

const CategoryFilter = ({ selectedCategory, onCategoryChange, showStats = true }) => {
  const { getCategories, getTimersByCategory, getTimersByStatus } = useTimersContext();
  
  const categories = getCategories();
  const allTimers = getTimersByCategory(""); // Get all timers
  
  // Get statistics for each category
  const getCategoryStats = (category) => {
    const categoryTimers = category === "All" 
      ? allTimers 
      : getTimersByCategory(category);
      
    return {
      total: categoryTimers.length,
      running: categoryTimers.filter(t => t.status === "Running").length,
      paused: categoryTimers.filter(t => t.status === "Paused").length,
      completed: categoryTimers.filter(t => t.status === "Completed").length
    };
  };

  // All categories including "All"
  const allCategories = ["All", ...categories];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          🏷️ Category Filter
        </h3>
        {selectedCategory !== "All" && (
          <button
            onClick={() => onCategoryChange("All")}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {allCategories.map(category => {
          const stats = getCategoryStats(category);
          const isSelected = selectedCategory === category;
          const hasTimers = stats.total > 0;
          
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              disabled={!hasTimers && category !== "All"}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200
                ${isSelected 
                  ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-300 dark:ring-blue-500" 
                  : hasTimers || category === "All"
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    : "bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                }
              `}
            >
              {/* Category Name */}
              <span className="text-sm">
                {category === "All" ? "📋 All Categories" : category}
              </span>
              
              {/* Timer Count Badge */}
              {(hasTimers || category === "All") && (
                <span className={`
                  text-xs px-2 py-1 rounded-full font-bold
                  ${isSelected 
                    ? "bg-blue-700 text-blue-100" 
                    : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                  }
                `}>
                  {stats.total}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Status Legend */}
      {showStats && (
        <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
            <span>Status Legend:</span>
            <span>Selected: <strong>{selectedCategory}</strong></span>
          </div>
          
          <div className="flex flex-wrap gap-2 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Running</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Paused</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span>Empty</span>
            </div>
          </div>
        </div>
      )}

      {/* Selected Category Stats */}
      {showStats && selectedCategory && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            {selectedCategory === "All" ? "All Categories" : `"${selectedCategory}"`} Statistics
          </h4>
          
          <div className="grid grid-cols-4 gap-2">
            {(() => {
              const stats = getCategoryStats(selectedCategory);
              return (
                <>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {stats.total}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {stats.running}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400">Running</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                      {stats.paused}
                    </div>
                    <div className="text-xs text-yellow-600 dark:text-yellow-400">Paused</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {stats.completed}
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">Done</div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          <div className="text-2xl mb-2">📂</div>
          <p className="text-sm">No categories yet. Create your first timer!</p>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;