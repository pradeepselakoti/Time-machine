// src/hooks/TimersContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Timer statuses
const TIMER_STATUS = {
  PAUSED: 'Paused',
  RUNNING: 'Running',
  COMPLETED: 'Completed'
};

// Action types
const TIMER_ACTIONS = {
  ADD_TIMER: 'ADD_TIMER',
  START_TIMER: 'START_TIMER',
  PAUSE_TIMER: 'PAUSE_TIMER',
  RESET_TIMER: 'RESET_TIMER',
  DELETE_TIMER: 'DELETE_TIMER',
  TICK_TIMER: 'TICK_TIMER',
  COMPLETE_TIMER: 'COMPLETE_TIMER',
  BULK_ACTION: 'BULK_ACTION'
};

// Initial state
const initialState = {
  timers: [],
  history: [],
  activeIntervals: {}
};

// Timer reducer
const timersReducer = (state, action) => {
  switch (action.type) {
    case TIMER_ACTIONS.ADD_TIMER:
      const newTimer = {
        id: Date.now() + Math.random(),
        name: action.payload.name,
        duration: action.payload.duration,
        remaining: action.payload.duration,
        category: action.payload.category,
        status: TIMER_STATUS.PAUSED,
        createdAt: new Date().toISOString()
      };
      return {
        ...state,
        timers: [...state.timers, newTimer]
      };

    case TIMER_ACTIONS.START_TIMER:
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload.id && timer.remaining > 0
            ? { ...timer, status: TIMER_STATUS.RUNNING }
            : timer
        )
      };

    case TIMER_ACTIONS.PAUSE_TIMER:
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload.id
            ? { ...timer, status: TIMER_STATUS.PAUSED }
            : timer
        )
      };

    case TIMER_ACTIONS.RESET_TIMER:
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload.id
            ? {
                ...timer,
                remaining: timer.duration,
                status: TIMER_STATUS.PAUSED
              }
            : timer
        )
      };

    case TIMER_ACTIONS.DELETE_TIMER:
      return {
        ...state,
        timers: state.timers.filter(timer => timer.id !== action.payload.id)
      };

    case TIMER_ACTIONS.TICK_TIMER:
      return {
        ...state,
        timers: state.timers.map(timer => {
          if (timer.id === action.payload.id && timer.status === TIMER_STATUS.RUNNING) {
            const newRemaining = Math.max(0, timer.remaining - 1);
            return {
              ...timer,
              remaining: newRemaining,
              status: newRemaining === 0 ? TIMER_STATUS.COMPLETED : timer.status
            };
          }
          return timer;
        })
      };

    case TIMER_ACTIONS.COMPLETE_TIMER:
      const completedTimer = state.timers.find(t => t.id === action.payload.id);
      if (!completedTimer) return state;

      const historyEntry = {
        ...completedTimer,
        completedAt: new Date().toISOString()
      };

      return {
        ...state,
        history: [historyEntry, ...state.history]
      };

    case TIMER_ACTIONS.BULK_ACTION:
      const { category, actionType } = action.payload;
      return {
        ...state,
        timers: state.timers.map(timer => {
          if (timer.category === category) {
            switch (actionType) {
              case 'start':
                return timer.remaining > 0 ? { ...timer, status: TIMER_STATUS.RUNNING } : timer;
              case 'pause':
                return { ...timer, status: TIMER_STATUS.PAUSED };
              case 'reset':
                return { ...timer, remaining: timer.duration, status: TIMER_STATUS.PAUSED };
              default:
                return timer;
            }
          }
          return timer;
        })
      };

    default:
      return state;
  }
};

// Create context
const TimersContext = createContext();

// Provider component
export const TimersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timersReducer, initialState);

  // Timer intervals management
  useEffect(() => {
    const intervals = {};

    // Create intervals for running timers
    state.timers.forEach(timer => {
      if (timer.status === TIMER_STATUS.RUNNING && timer.remaining > 0) {
        intervals[timer.id] = setInterval(() => {
          dispatch({
            type: TIMER_ACTIONS.TICK_TIMER,
            payload: { id: timer.id }
          });
        }, 1000);
      }
    });

    // Check for completed timers and add to history
    state.timers.forEach(timer => {
      if (timer.status === TIMER_STATUS.COMPLETED && timer.remaining === 0) {
        // Add to history if not already there
        const alreadyInHistory = state.history.some(h => 
          h.id === timer.id && h.completedAt
        );
        if (!alreadyInHistory) {
          dispatch({
            type: TIMER_ACTIONS.COMPLETE_TIMER,
            payload: { id: timer.id }
          });
        }
      }
    });

    // Cleanup function
    return () => {
      Object.values(intervals).forEach(interval => {
        clearInterval(interval);
      });
    };
  }, [state.timers]);

  // Context methods
  const addTimer = (timerData) => {
    dispatch({
      type: TIMER_ACTIONS.ADD_TIMER,
      payload: timerData
    });
    return timerData;
  };

  const startTimer = (id) => {
    dispatch({
      type: TIMER_ACTIONS.START_TIMER,
      payload: { id }
    });
  };

  const pauseTimer = (id) => {
    dispatch({
      type: TIMER_ACTIONS.PAUSE_TIMER,
      payload: { id }
    });
  };

  const resetTimer = (id) => {
    dispatch({
      type: TIMER_ACTIONS.RESET_TIMER,
      payload: { id }
    });
  };

  const deleteTimer = (id) => {
    dispatch({
      type: TIMER_ACTIONS.DELETE_TIMER,
      payload: { id }
    });
  };

  const bulkAction = (category, actionType) => {
    dispatch({
      type: TIMER_ACTIONS.BULK_ACTION,
      payload: { category, actionType }
    });
  };

  const getCategories = () => {
    const categories = state.timers.map(timer => timer.category);
    return [...new Set(categories)];
  };

  const getTimersByCategory = (category) => {
    return state.timers.filter(timer => timer.category === category);
  };

  const contextValue = {
    timers: state.timers,
    history: state.history,
    addTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    deleteTimer,
    bulkAction,
    getCategories,
    getTimersByCategory
  };

  return (
    <TimersContext.Provider value={contextValue}>
      {children}
    </TimersContext.Provider>
  );
};

// Custom hook to use the context
export const useTimersContext = () => {
  const context = useContext(TimersContext);
  if (!context) {
    throw new Error('useTimersContext must be used within a TimersProvider');
  }
  return context;
};

export default TimersContext;