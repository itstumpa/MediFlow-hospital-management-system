"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboard } from "./use-dashboard";

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useDashboard();

  return (
    <button
      onClick={toggleDarkMode}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-xl",
        "text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600",
        "dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
      )}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        key={isDarkMode ? "moon" : "sun"}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {isDarkMode ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </motion.div>
    </button>
  );
}
