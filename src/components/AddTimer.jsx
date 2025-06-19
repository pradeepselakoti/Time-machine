import React from "react";
import { useNavigate } from "react-router-dom";
import AddTimerForm from "../components/AddTimerForm";

/**
 * AddTimer Page Component
 * 
 * Features:
 * - Dedicated page for creating new timers
 * - Uses AddTimerForm component
 * - Navigation back to dashboard after timer creation
 * - Responsive layout with proper spacing
 */
const AddTimer = () => {
  const navigate = useNavigate();

  /**
   * Handle successful timer creation
   * Navigate back to home dashboard
   */
  const handleTimerCreated = (newTimer) => {
    // Optional: You could show a success message here
    console.log("Timer created successfully:", newTimer);
    
    // Navigate back to dashboard after a short delay to show the success message
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  /**
   * Handle navigation back to dashboard
   */
  const handleBackToDashboard = () => {
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Add New Timer
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create a custom timer to help manage your time effectively
            </p>
          </div>
          
          {/* Back Button */}
          <button
            onClick={handleBackToDashboard}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>

      {/* Add Timer Form */}
      <AddTimerForm onSuccess={handleTimerCreated} />

      {/* Additional Information Section */}
      <div className="mt-8 space-y-6">
        {/* Timer Management Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4">
            🎯 Timer Management Best Practices
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-400">
            <div>
              <h3 className="font-medium mb-2">⏰ Time Planning:</h3>
              <ul className="space-y-1">
                <li>• Break large tasks into smaller chunks</li>
                <li>• Use the Pomodoro Technique (25-min work sessions)</li>
                <li>• Include buffer time for transitions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">📋 Organization:</h3>
              <ul className="space-y-1">
                <li>• Group similar activities by category</li>
                <li>• Use descriptive timer names</li>
                <li>• Set realistic time expectations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Common Timer Durations */}
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🕐 Common Timer Durations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {[
              { activity: "Quick Break", duration: "5 minutes", seconds: 300 },
              { activity: "Coffee Break", duration: "15 minutes", seconds: 900 },
              { activity: "Pomodoro Session", duration: "25 minutes", seconds: 1500 },
              { activity: "Lunch Break", duration: "30 minutes", seconds: 1800 },
              { activity: "Deep Work", duration: "45 minutes", seconds: 2700 },
              { activity: "Meeting", duration: "1 hour", seconds: 3600 },
              { activity: "Exercise", duration: "30-60 minutes", seconds: 2700 },
              { activity: "Study Session", duration: "2 hours", seconds: 7200 }
            ].map(({ activity, duration, seconds }) => (
              <div 
                key={activity}
                className="p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
              >
                <div className="font-medium text-gray-900 dark:text-white text-xs mb-1">
                  {activity}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-xs">
                  {duration}
                </div>
                <div className="text-gray-500 dark:text-gray-500 text-xs">
                  ({seconds}s)
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-4">
            🚀 What's Next?
          </h2>
          <div className="space-y-3">
            <p className="text-green-800 dark:text-green-400 text-sm">
              After creating your timer, you can:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700 dark:text-green-400">
              <div>
                <h3 className="font-medium mb-2">Timer Controls:</h3>
                <ul className="space-y-1">
                  <li>• Start, pause, and reset timers</li>
                  <li>• View progress with visual indicators</li>
                  <li>• Get halfway alerts and completion notifications</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Management Features:</h3>
                <ul className="space-y-1">
                  <li>• Group and bulk-manage by category</li>
                  <li>• View timer history and export data</li>
                  <li>• Switch between light and dark themes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTimer;