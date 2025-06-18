import React from "react";

const ProgressBar = ({ current, total, showPercentage = true, showTime = true, size = "medium" }) => {
  const percentage = total > 0 ? Math.max(0, Math.min(100, (current / total) * 100)) : 0;
  const remainingPercentage = 100 - percentage;
  
  // Format time display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0 
      ? `${minutes}m ${remainingSeconds}s` 
      : `${remainingSeconds}s`;
  };

  // Get color based on progress
  const getProgressColor = () => {
    if (percentage >= 75) return "bg-green-500";
    if (percentage >= 50) return "bg-yellow-500";
    if (percentage >= 25) return "bg-orange-500";
    return "bg-red-500";
  };

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "h-2";
      case "large":
        return "h-6";
      default:
        return "h-4";
    }
  };

  return (
    <div className="w-full space-y-2">
      {/* Progress Bar */}
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${getSizeClasses()}`}>
        <div
          className={`${getProgressColor()} ${getSizeClasses()} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* Progress Info */}
      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-2">
          {showTime && (
            <span className="font-mono">
              {formatTime(current)} / {formatTime(total)}
            </span>
          )}
        </div>
        
        {showPercentage && (
          <div className="flex items-center space-x-1">
            <span className="font-semibold">
              {percentage.toFixed(1)}%
            </span>
            <span className="text-xs">
              remaining
            </span>
          </div>
        )}
      </div>
      
      {/* Visual indicator for different stages */}
      <div className="flex items-center justify-center space-x-1 text-xs">
        {percentage >= 75 && <span className="text-green-500">🟢 Almost done!</span>}
        {percentage >= 50 && percentage < 75 && <span className="text-yellow-500">🟡 Halfway there</span>}
        {percentage >= 25 && percentage < 50 && <span className="text-orange-500">🟠 Keep going</span>}
        {percentage < 25 && percentage > 0 && <span className="text-red-500">🔴 Just started</span>}
        {percentage === 0 && <span className="text-gray-500">⚪ Ready to start</span>}
      </div>
    </div>
  );
};

export default ProgressBar;