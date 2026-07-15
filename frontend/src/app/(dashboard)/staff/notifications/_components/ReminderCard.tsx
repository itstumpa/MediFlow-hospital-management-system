"use client";

import {
  hoverLift,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { CheckCircle, Circle } from "lucide-react";
import {
  priorityConfig,
  type Reminder,
  reminderTypeConfig,
} from "../_mock-data";

/* ─── Due date formatting ───────────────────── */

function formatDue(date: Date): { text: string; isOverdue: boolean } {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMs < 0) {
    const past = Math.abs(diffDays);
    if (past === 0) return { text: "Overdue", isOverdue: true };
    if (past === 1) return { text: "1 day overdue", isOverdue: true };
    return { text: `${past} days overdue`, isOverdue: true };
  }
  if (diffDays === 0) {
    if (diffHrs === 0) return { text: "Due now", isOverdue: false };
    return { text: `Due in ${diffHrs}h`, isOverdue: false };
  }
  if (diffDays === 1) return { text: "Due tomorrow", isOverdue: false };
  return { text: `Due in ${diffDays}d`, isOverdue: false };
}

/* ══════════════════════════════════════════════
   ReminderCard
   ══════════════════════════════════════════════ */

interface ReminderCardProps {
  reminder: Reminder;
  onToggleComplete?: (id: string) => void;
}

export function ReminderCard({
  reminder,
  onToggleComplete,
}: ReminderCardProps) {
  const typeConfig = reminderTypeConfig[reminder.type];
  const TypeIcon = typeConfig.icon;
  const priority = priorityConfig[reminder.priority];
  const dueInfo = formatDue(reminder.dueDate);

  return (
    <motion.div
      variants={staggerItem}
      {...hoverLift}
      className={`rounded-xl border p-4 sm:p-5 ${
        reminder.completed
          ? "border-slate-200 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/50"
          : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Completion toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggleComplete?.(reminder.id)}
          className={`mt-0.5 shrink-0 ${
            reminder.completed
              ? "text-emerald-500"
              : "text-slate-300 dark:text-slate-600"
          }`}
          aria-label={reminder.completed ? "Mark incomplete" : "Mark complete"}
        >
          {reminder.completed ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </motion.button>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <TypeIcon className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {typeConfig.label}
            </span>
          </div>
          <h3
            className={`mt-1 text-sm font-medium ${
              reminder.completed
                ? "text-slate-400 line-through dark:text-slate-500"
                : "text-slate-900 dark:text-white"
            }`}
          >
            {reminder.title}
          </h3>
          <p
            className={`mt-0.5 text-xs leading-relaxed ${
              reminder.completed
                ? "text-slate-400 dark:text-slate-500"
                : "text-slate-600 dark:text-slate-300"
            }`}
          >
            {reminder.description}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {!reminder.completed && (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${priority.class}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${priority.dot}`} />
                {priority.label}
              </span>
            )}
            <span
              className={`text-[10px] ${
                dueInfo.isOverdue && !reminder.completed
                  ? "font-medium text-red-500"
                  : "text-slate-400 dark:text-slate-500"
              }`}
            >
              {dueInfo.text}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
