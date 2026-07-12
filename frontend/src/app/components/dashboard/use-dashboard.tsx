"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { DashboardContextValue } from "./types";

const DashboardContext = createContext<DashboardContextValue | null>(null);

const SIDEBAR_KEY = "dash-sidebar-collapsed";
const THEME_KEY = "dash-theme";

export function DashboardProvider({ children }: { children: ReactNode }) {
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

  const toggleDarkMode = useCallback(
    () => setIsDarkMode((prev) => !prev),
    [],
  );

  return (
    <DashboardContext.Provider
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
    </DashboardContext.Provider>
  );
}

export function useDashboard(): DashboardContextValue {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return ctx;
}
