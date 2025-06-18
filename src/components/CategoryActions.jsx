function CategoryActions({ category, bulkAction }) {
  return (
    <div className="mb-2 space-x-2">
      <button onClick={() => bulkAction(category, "start")} className="px-2 py-1 bg-green-600 text-white rounded">Start All</button>
      <button onClick={() => bulkAction(category, "pause")} className="px-2 py-1 bg-yellow-500 text-white rounded">Pause All</button>
      <button onClick={() => bulkAction(category, "reset")} className="px-2 py-1 bg-gray-600 text-white rounded">Reset All</button>
    </div>
  );
}

export default CategoryActions;
