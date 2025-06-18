import React from "react";

const ThemeSwitcher = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-center w-10 h-10 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-full transition-colors duration-200"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <span className="text-lg">
        {theme === "light" ? "🌙" : "☀️"}
      </span>
    </button>
  );
};

export default ThemeSwitcher;