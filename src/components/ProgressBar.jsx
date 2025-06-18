function ProgressBar({ percent }) {
  return (
    <div className="w-full bg-gray-200 rounded h-2">
      <div
        className="bg-blue-600 h-2 rounded"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
