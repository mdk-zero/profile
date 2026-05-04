"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface AppContextType {
  startupComplete: boolean;
  setStartupComplete: (complete: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [startupComplete, setStartupComplete] = useState(false);

  return (
    <AppContext.Provider value={{ startupComplete, setStartupComplete }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}