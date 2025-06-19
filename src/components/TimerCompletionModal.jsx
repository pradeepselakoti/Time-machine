import React from "react";
import Modal from "./Modal";

const TimerCompletionModal = ({ isOpen, onClose, timerName, duration }) => {
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    console.log("Timer completion modal closing"); // Debug log
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Timer Completed!"
      type="success"
    >
      <div className="text-center">
        {/* Celebration Icon */}
        <div className="text-6xl mb-4">🎉</div>
        
        {/* Congratulations Message */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Congratulations!
        </h3>
        
        {/* Timer Details */}
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Your timer <strong>"{timerName}"</strong> has completed successfully.
        </p>
        
        {/* Duration */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Duration:</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatDuration(duration)}
          </p>
        </div>
        
        {/* Optional: Add more actions here */}
        <div className="flex justify-center space-x-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
          >
            Great!
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TimerCompletionModal;