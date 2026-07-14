"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface SearchBarProps {
  onOpen?: () => void;
}

export function SearchBar({ onOpen }: SearchBarProps) {
  return (
    <button
      onClick={onOpen}
      className={cn(
        "group flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white/60 px-3.5 py-2",
        "text-sm text-slate-400 transition-all duration-200",
        "hover:border-slate-300 hover:bg-white hover:text-slate-500 hover:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
        "dark:border-slate-700/60 dark:bg-slate-800/40 dark:text-slate-500",
        "dark:hover:border-slate-600 dark:hover:bg-slate-800/80 dark:hover:text-slate-400",
        "w-full max-w-[320px] lg:max-w-[400px]",
      )}
      aria-label="Open search"
    >
      <Search className="h-4 w-4 shrink-0" />
      <span className="flex-1 text-left">Search appointments, doctors...</span>
      <kbd
        className={cn(
          "hidden shrink-0 items-center gap-0.5 rounded-lg border border-slate-200 bg-slate-50 px-1.5 py-0.5",
          "text-[11px] font-medium text-slate-400",
          "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500",
          "sm:flex",
        )}
      >
        <span className="text-[10px]">⌘</span>K
      </kbd>
    </button>
  );
}
