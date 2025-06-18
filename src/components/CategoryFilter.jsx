import React from "react";
import { useTimersContext } from "../hooks/TimersContext";

const CategoryFilter = ({ selectedCategory, onCategoryChange, showAll = true }) => {
  const { getCategories, timers } = useTimersContext();
  const categories = getCategories();

  // Get timer count for each category
  const getCategoryCount = (category) => {
    return timers.filter(timer => timer.category === category).length;
  };

  const getTotalCount = () => {
    return timers.length;
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Filter by Category:
      </label>
      
      <div className="flex flex-wrap gap-2">
        {/* All Categories Button */}
        {showAll && (
          <button
            onClick={() => onCategoryChange("All")}
            className={`
              px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${selectedCategory === "All" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }
            `}
          >
            All ({getTotalCount()})
          </button>
        )}
        
        {/* Category Buttons */}
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${selectedCategory === category 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }
            `}
          >
            {category} ({getCategoryCount(category)})
          </button>
        ))}
        
        {/* No Categories Message */}
        {categories.length === 0 && !showAll && (
          <p className="text-gray-500 dark:text-gray-400 text-sm italic">
            No categories available
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;