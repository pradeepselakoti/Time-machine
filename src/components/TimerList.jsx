import TimerItem from "./TimerItem";
import CategoryActions from "./CategoryActions";

function TimerList({ timers, startTimer, pauseTimer, resetTimer, bulkAction }) {
  // Group timers by category
  const grouped = timers.reduce((acc, timer) => {
    acc[timer.category] = acc[timer.category] || [];
    acc[timer.category].push(timer);
    return acc;
  }, {});

  return (
    <div className="mt-6">
      {Object.keys(grouped).map((category) => (
        <div key={category} className="mb-4 p-4 border rounded bg-white">
          <h2 className="text-lg font-bold mb-2">{category}</h2>
          <CategoryActions category={category} bulkAction={bulkAction} />
          <div className="space-y-2">
            {grouped[category].map((timer) => (
              <TimerItem
                key={timer.id}
                timer={timer}
                startTimer={startTimer}
                pauseTimer={pauseTimer}
                resetTimer={resetTimer}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TimerList;
