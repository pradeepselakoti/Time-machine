import TimerForm from "../components/TimerForm";
import TimerList from "../components/TimerList";
import { useTimersContext } from "../hooks/TimersContext";

function Home() {
  const {
    timers,
    startTimer,
    pauseTimer,
    resetTimer,
    bulkAction,
  } = useTimersContext();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Timer App</h1>
      {/* TimerForm now gets addTimer from context directly */}
      <TimerForm />
      <TimerList
        timers={timers}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        resetTimer={resetTimer}
        bulkAction={bulkAction}
      />
    </div>
  );
}

export default Home;