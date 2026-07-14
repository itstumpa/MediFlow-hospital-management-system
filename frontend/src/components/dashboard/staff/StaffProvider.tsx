"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { StaffContextValue, StaffMember } from "./types";

const StaffContext = createContext<StaffContextValue | null>(null);

const SIDEBAR_KEY = "staff-sidebar-collapsed";
const THEME_KEY = "staff-theme";

/** Mock staff member — replace with real auth */
const mockStaffMember: StaffMember = {
  name: "Sarah Mitchell",
  initials: "SM",
  email: "sarah.mitchell@mediflow.com",
  department: "Front Desk",
  role: "Senior Receptionist",
};

export function StaffProvider({ children }: { children: ReactNode }) {
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

  /* Persist theme and update <html> class */
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(THEME_KEY, isDarkMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", isDarkMode);
    }
  }, [isDarkMode, mounted]);

  /* Keyboard shortcut: Cmd/Ctrl + K */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleSidebar = useCallback(
    () => setSidebarCollapsed((prev) => !prev),
    [],
  );

  const toggleMobileSidebar = useCallback(
    () => setMobileSidebarOpen((prev) => !prev),
    [],
  );

  const toggleCommandPalette = useCallback(
    () => setCommandPaletteOpen((prev) => !prev),
    [],
  );

  const toggleDarkMode = useCallback(() => setIsDarkMode((prev) => !prev), []);

  return (
    <StaffContext.Provider
      value={{
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        mobileSidebarOpen,
        setMobileSidebarOpen,
        toggleMobileSidebar,
        commandPaletteOpen,
        setCommandPaletteOpen,
        toggleCommandPalette,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </StaffContext.Provider>
  );
}

export function useStaffContext(): StaffContextValue {
  const ctx = useContext(StaffContext);
  if (!ctx) {
    throw new Error("useStaffContext must be used within a StaffProvider");
  }
  return ctx;
}

export { mockStaffMember };
