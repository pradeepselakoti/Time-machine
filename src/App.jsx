// src/App.jsx
import React, { useState } from 'react';
import { TimersProvider } from './hooks/TimersContext';
import { ThemeProvider } from './hooks/ThemeContext';
import AddTimerForm from './components/AddTimerForm';
import TimerList from './components/TimerList';
import History from './components/History';
import ThemeSwitcher from './components/ThemeSwitcher';

const App = () => {
  const [activeTab, setActiveTab] = useState('timers');

  const tabs = [
    { id: 'timers', label: 'Active Timers', icon: '⏱️' },
    { id: 'create', label: 'Create Timer', icon: '➕' },
    { id: 'history', label: 'History', icon: '📜' }
  ];

  return (
    <ThemeProvider>
      <TimersProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    ⏰ Timer Pro
                  </h1>
                </div>

                {/* Theme Switcher */}
                <ThemeSwitcher />
              </div>
            </div>
          </header>

          {/* Navigation Tabs */}
          <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === 'timers' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Active Timers
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Manage your running timers and track your progress
                  </p>
                </div>
                <TimerList />
              </div>
            )}

            {activeTab === 'create' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Create New Timer
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Set up a new timer with custom duration and category
                  </p>
                </div>
                <div className="max-w-2xl">
                  <AddTimerForm 
                    onSuccess={() => setActiveTab('timers')}
                  />
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Timer History
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    View your completed timers and track your productivity
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
                  <History />
                </div>
              </div>
            )}
          </main>

          {/* Footer */}
          <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                <p>Timer Pro - Stay focused and productive ⏰</p>
              </div>
            </div>
          </footer>
        </div>
      </TimersProvider>
    </ThemeProvider>
  );
};

export default App;