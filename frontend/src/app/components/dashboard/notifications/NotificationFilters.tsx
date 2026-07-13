"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type {
  NotificationCategory,
  NotificationFilterMode,
  NotificationFiltersState,
  NotificationPriority,
} from "@/lib/data/notifications";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  BellOff,
  CalendarCheck,
  FileText,
  Mail,
  MessageSquare,
  Stethoscope,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

const modeOptions: {
  value: NotificationFilterMode;
  label: string;
  icon: LucideIcon;
}[] = [
  { value: "all", label: "All", icon: Bell },
  { value: "unread", label: "Unread", icon: BellOff },
  { value: "read", label: "Read", icon: Mail },
];

const categoryOptions: {
  value: NotificationCategory | "all";
  label: string;
  icon: LucideIcon;
}[] = [
  { value: "all", label: "All", icon: Bell },
  { value: "appointments", label: "Appointments", icon: CalendarCheck },
  { value: "doctors", label: "Doctors", icon: Stethoscope },
  { value: "patients", label: "Patients", icon: UserPlus },
  { value: "articles", label: "Articles", icon: FileText },
  { value: "system", label: "System", icon: AlertTriangle },
  { value: "messages", label: "Messages", icon: MessageSquare },
];

const priorityOptions: {
  value: NotificationPriority | "all";
  label: string;
}[] = [
  { value: "all", label: "All" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
];

interface NotificationFiltersProps {
  filters: NotificationFiltersState;
  onFiltersChange: (filters: NotificationFiltersState) => void;
}

export function NotificationFilters({
  filters,
  onFiltersChange,
}: NotificationFiltersProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {/* Mode + Category pills */}
      <motion.div
        variants={staggerItem}
        className="no-scrollbar flex items-center gap-2 overflow-x-auto"
        role="group"
        aria-label="Filter notifications"
      >
        {/* Mode pills */}
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
          {modeOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = filters.mode === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onFiltersChange({ ...filters, mode: opt.value })}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                  isActive
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300",
                )}
                aria-pressed={isActive}
              >
                <Icon className="h-3.5 w-3.5" />
                {opt.label}
              </button>
            );
          })}
        </div>

        <div
          className="h-6 w-px bg-slate-200 dark:bg-slate-700"
          aria-hidden="true"
        />

        {/* Category pills */}
        <div className="flex items-center gap-1.5">
          {categoryOptions.slice(0, 4).map((opt) => {
            const Icon = opt.icon;
            const isActive = filters.category === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  onFiltersChange({
                    ...filters,
                    category: opt.value as typeof filters.category,
                  })
                }
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  isActive
                    ? "bg-dash-primary-light text-dash-primary dark:bg-teal-500/10 dark:text-accent"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300",
                )}
                aria-pressed={isActive}
              >
                <Icon className="h-3.5 w-3.5" />
                {opt.label}
              </button>
            );
          })}
          {/* Show remaining categories in a collapsible way */}
          {categoryOptions.slice(4).map((opt) => {
            const Icon = opt.icon;
            const isActive = filters.category === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  onFiltersChange({
                    ...filters,
                    category: opt.value as typeof filters.category,
                  })
                }
                className={cn(
                  "hidden sm:inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  isActive
                    ? "bg-dash-primary-light text-dash-primary dark:bg-teal-500/10 dark:text-accent"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300",
                )}
                aria-pressed={isActive}
              >
                <Icon className="h-3.5 w-3.5" />
                {opt.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Priority pills */}
      <motion.div
        variants={staggerItem}
        className="flex items-center gap-1.5"
        role="group"
        aria-label="Filter by priority"
      >
        <span className="mr-1 text-xs font-medium text-slate-400 dark:text-slate-500">
          Priority:
        </span>
        {priorityOptions.map((opt) => {
          const isActive = filters.priority === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() =>
                onFiltersChange({
                  ...filters,
                  priority: opt.value as typeof filters.priority,
                })
              }
              className={cn(
                "rounded-md px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider transition-all",
                isActive
                  ? opt.value === "critical"
                    ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                    : opt.value === "high"
                      ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                      : opt.value === "medium"
                        ? "bg-dash-primary-light text-dash-primary dark:bg-teal-500/10 dark:text-accent"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                  : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-400",
              )}
              aria-pressed={isActive}
            >
              {opt.label}
            </button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
