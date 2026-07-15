"use client";

import { motion } from "framer-motion";
import { Calendar, Columns3, List, Timeline } from "lucide-react";

export type ViewMode = "calendar" | "table" | "timeline" | "cards";

interface ViewModeSwitcherProps {
  active: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const modes: { value: ViewMode; label: string; icon: typeof Calendar }[] = [
  { value: "calendar", label: "Calendar", icon: Calendar },
  { value: "table", label: "Table", icon: List },
  { value: "timeline", label: "Timeline", icon: Timeline },
  { value: "cards", label: "Cards", icon: Columns3 },
];

export function ViewModeSwitcher({ active, onChange }: ViewModeSwitcherProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = active === mode.value;
        return (
          <button
            key={mode.value}
            onClick={() => onChange(mode.value)}
            className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              isActive
                ? "text-white"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="viewModeBg"
                className="absolute inset-0 rounded-lg bg-[var(--color-primary)]"
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            )}
            <Icon className="relative h-3.5 w-3.5" />
            <span className="relative hidden sm:inline">{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
}
