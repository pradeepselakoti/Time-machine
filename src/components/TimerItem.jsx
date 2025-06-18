import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

const TimerItem = ({ timer, onStart, onPause, onReset }) => {
  const [showModal, setShowModal] = useState(false);
  const [halfwayShown, setHalfwayShown] = useState(false);

  useEffect(() => {
    if (timer.remaining <= 0 && !timer.completed) {
      setShowModal(true);
    }

    if (
      !halfwayShown &&
      timer.remaining <= timer.duration / 2 &&
      timer.remaining > 0
    ) {
      alert(`⏳ You're halfway through "${timer.name}"!`);
      setHalfwayShown(true);
    }
  }, [timer.remaining]);

  return (
    <div className="p-3 rounded shadow bg-white dark:bg-gray-800 mb-3">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-bold">{timer.name}</h4>
          <p>{Math.max(timer.remaining, 0)}s</p>
          <p>Status: {timer.status}</p>
        </div>
        <div className="space-x-2">
          <button onClick={() => onStart(timer.id)}>▶️</button>
          <button onClick={() => onPause(timer.id)}>⏸️</button>
          <button onClick={() => onReset(timer.id)}>🔄</button>
        </div>
      </div>
      <ProgressBar progress={Math.max(0, (timer.remaining / timer.duration) * 100)} />

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-2">🎉 Timer Completed!</h2>
            <p>{timer.name} has finished.</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerItem;
