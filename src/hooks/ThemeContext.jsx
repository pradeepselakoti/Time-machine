import React, { createContext, useContext, useEffect, useState } from 'react';

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Default to light theme
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
    }
    return 'light';
  });

  const [userPreferenceSet, setUserPreferenceSet] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      if (!userPreferenceSet) {
        setTheme(e.matches ? 'light' : 'dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [userPreferenceSet]);

  const toggleTheme = () => {
    setUserPreferenceSet(true);
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const setThemeWithPreference = (newTheme) => {
    setUserPreferenceSet(true);
    setTheme(newTheme);
  };

  const value = {
    theme,
    toggleTheme,
    setTheme: setThemeWithPreference
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Timers Context (Mock)
const TimersContext = createContext();

export const useTimers = () => {
  const context = useContext(TimersContext);
  if (!context) {
    throw new Error('useTimers must be used within a TimersProvider');
  }
  return context;
};

export const TimersProvider = ({ children }) => {
  const [timers, setTimers] = useState([
    { id: 1, name: "Focus Session", duration: 1500, remaining: 1200, isRunning: true, category: "Work" },
    { id: 2, name: "Break Time", duration: 300, remaining: 300, isRunning: false, category: "Break" }
  ]);
  const [history, setHistory] = useState([
    { id: 1, name: "Morning Workout", duration: 1800, completedAt: new Date(), category: "Exercise" },
    { id: 2, name: "Reading", duration: 2400, completedAt: new Date(), category: "Learning" }
  ]);

  const value = {
    timers,
    setTimers,
    history,
    setHistory
  };

  return (
    <TimersContext.Provider value={value}>
      {children}
    </TimersContext.Provider>
  );
};
