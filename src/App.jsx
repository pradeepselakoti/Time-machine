import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { TimersProvider } from "./hooks/TimersContext";
import Home from "./pages/Home";
import AddTimer from "./pages/AddTimer";
import HistoryPage from "./pages/HistoryPage";
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <TimersProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white transition-colors duration-200">
          {/* Navigation Header */}
          <nav className="sticky top-0 z-40 bg-blue-600 dark:bg-blue-800 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-6">
                  <h1 className="text-xl font-bold">⏱️ Timer Manager</h1>
                  <div className="space-x-4">
                    <Link 
                      to="/" 
                      className="hover:bg-blue-700 px-3 py-2 rounded transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/add" 
                      className="hover:bg-blue-700 px-3 py-2 rounded transition-colors"
                    >
                      Add Timer
                    </Link>
                    <Link 
                      to="/history" 
                      className="hover:bg-blue-700 px-3 py-2 rounded transition-colors"
                    >
                      History
                    </Link>
                  </div>
                </div>
                <ThemeSwitcher theme={theme} onToggle={toggleTheme} />
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddTimer />} />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TimersProvider>
  );
}

export default App;