import { useTimersContext } from "../hooks/TimersContext";

function History() {
  const { history } = useTimersContext();

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0 
      ? `${minutes}m ${remainingSeconds}s` 
      : `${remainingSeconds}s`;
  };

  return (
    <div className="space-y-2">
      {history.length === 0 && (
        <div className="p-4 text-center text-gray-500 bg-gray-50 rounded">
          <p>No completed timers yet.</p>
          <p className="text-sm">Start some timers and let them finish to see them here!</p>
        </div>
      )}
      {history.map((item, index) => (
        <div key={index} className="p-4 border rounded bg-white shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <strong className="text-lg">{item.name}</strong>
              <p className="text-sm text-gray-600">Category: {item.category}</p>
              <p className="text-sm text-gray-600">Duration: {formatDuration(item.duration)}</p>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>Completed:</p>
              <p>{new Date(item.completedAt).toLocaleDateString()}</p>
              <p>{new Date(item.completedAt).toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default History;