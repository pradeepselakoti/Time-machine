import React from "react";

const HistoryPage = ({ history }) => {
  const exportAsJSON = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "timer-history.json";
    a.click();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📜 Timer History</h2>
      <button
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
        onClick={exportAsJSON}
      >
        Export History
      </button>
      {history.length === 0 ? (
        <p>No completed timers yet.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((t, i) => (
            <li key={i} className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
              <strong>{t.name}</strong> - Completed at {t.completedAt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryPage;
