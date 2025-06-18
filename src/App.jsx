import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import HistoryPage from "./pages/HistoryPage";
import { TimersContext } from "./hooks/TimersContext";
import { useTimers } from "./hooks/useTimers";

function App() {
  const timersHook = useTimers(); // one instance for the whole app

  return (
    <TimersContext.Provider value={timersHook}>
      <Router>
        <nav className="flex gap-4 p-4 bg-gray-800 text-white">
          <Link to="/">Home</Link>
          <Link to="/history">History</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Router>
    </TimersContext.Provider>
  );
}

export default App;
