import { createContext, useContext } from "react";

// Create context
export const TimersContext = createContext();

// Hook to use context easily
export const useTimersContext = () => useContext(TimersContext);
