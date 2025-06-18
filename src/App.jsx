import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import HistoryPage from "./pages/HistoryPage";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () =>
    setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
        <nav className="p-4 flex justify-between items-center bg-blue-500 text-white">
          <div className="space-x-4">
            <Link to="/">Home</Link>
            <Link to="/history">History</Link>
          </div>
          <button onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
