"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { PatientContextValue } from "./types";

const PatientContext = createContext<PatientContextValue | null>(null);

const SIDEBAR_KEY = "patient-sidebar-collapsed";
const THEME_KEY = "patient-theme";

export function PatientProvider({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  /* Hydrate from localStorage on mount */
  useEffect(() => {
    setMounted(true);
    const savedSidebar = localStorage.getItem(SIDEBAR_KEY);
    if (savedSidebar !== null) {
      setSidebarCollapsed(savedSidebar === "true");
    }
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme !== null) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  /* Persist sidebar state */
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(SIDEBAR_KEY, String(sidebarCollapsed));
    }
  }, [sidebarCollapsed, mounted]);

  /* Persist theme and update <html> class */
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(THEME_KEY, isDarkMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", isDarkMode);
    }
  }, [isDarkMode, mounted]);

  const toggleSidebar = useCallback(
    () => setSidebarCollapsed((prev) => !prev),
    [],
  );

  const toggleMobileSidebar = useCallback(
    () => setMobileSidebarOpen((prev) => !prev),
    [],
  );

  const toggleDarkMode = useCallback(() => setIsDarkMode((prev) => !prev), []);

  return (
    <PatientContext.Provider
      value={{
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        mobileSidebarOpen,
        setMobileSidebarOpen,
        toggleMobileSidebar,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}

export function usePatientContext(): PatientContextValue {
  const ctx = useContext(PatientContext);
  if (!ctx) {
    throw new Error("usePatientContext must be used within a PatientProvider");
  }
  return ctx;
}
