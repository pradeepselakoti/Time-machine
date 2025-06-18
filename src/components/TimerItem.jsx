import ProgressBar from "./ProgressBar";

function TimerItem({ timer, startTimer, pauseTimer, resetTimer }) {
  return (
    <div className="p-2 border rounded flex flex-col gap-2">
      <div className="flex justify-between">
        <div>
          <strong>{timer.name}</strong> — {timer.remaining}s — {timer.status}
        </div>
        <div className="space-x-2">
          <button onClick={() => startTimer(timer.id)} className="px-2 py-1 bg-green-600 text-white rounded">Start</button>
          <button onClick={() => pauseTimer(timer.id)} className="px-2 py-1 bg-yellow-500 text-white rounded">Pause</button>
          <button onClick={() => resetTimer(timer.id)} className="px-2 py-1 bg-gray-600 text-white rounded">Reset</button>
        </div>
      </div>
      <ProgressBar percent={100 * (1 - timer.remaining / timer.duration)} />
    </div>
  );
}

export default TimerItem;
