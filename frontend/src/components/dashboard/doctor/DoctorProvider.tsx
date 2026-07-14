"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { DoctorContextValue } from "./types";

const DoctorContext = createContext<DoctorContextValue | null>(null);

const SIDEBAR_KEY = "doctor-sidebar-collapsed";
const THEME_KEY = "doctor-theme";

export function DoctorProvider({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
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

  /* Persist theme */
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(THEME_KEY, isDarkMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", isDarkMode);
    }
  }, [isDarkMode, mounted]);

  /* Global keyboard shortcut for command palette */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleSidebar = useCallback(
    () => setSidebarCollapsed((prev) => !prev),
    [],
  );

  const toggleMobileSidebar = useCallback(
    () => setMobileSidebarOpen((prev) => !prev),
    [],
  );

  const toggleDarkMode = useCallback(() => setIsDarkMode((prev) => !prev), []);

  const toggleCommandPalette = useCallback(
    () => setCommandPaletteOpen((prev) => !prev),
    [],
  );

  return (
    <DoctorContext.Provider
      value={{
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        mobileSidebarOpen,
        setMobileSidebarOpen,
        toggleMobileSidebar,
        isDarkMode,
        toggleDarkMode,
        commandPaletteOpen,
        setCommandPaletteOpen,
        toggleCommandPalette,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
}

export function useDoctorContext(): DoctorContextValue {
  const ctx = useContext(DoctorContext);
  if (!ctx) {
    throw new Error("useDoctorContext must be used within a DoctorProvider");
  }
  return ctx;
}
