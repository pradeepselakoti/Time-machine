import React from "react";

const CategoryActions = ({ category, onBulkAction }) => {
  return (
    <div className="space-x-2">
      <button
        className="bg-green-500 px-2 py-1 text-white rounded"
        onClick={() => onBulkAction(category, "start")}
      >
        Start All
      </button>
      <button
        className="bg-yellow-500 px-2 py-1 text-white rounded"
        onClick={() => onBulkAction(category, "pause")}
      >
        Pause All
      </button>
      <button
        className="bg-blue-500 px-2 py-1 text-white rounded"
        onClick={() => onBulkAction(category, "reset")}
      >
        Reset All
      </button>
    </div>
  );
};

export default CategoryActions;
