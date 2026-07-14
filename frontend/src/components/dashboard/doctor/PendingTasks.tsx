"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  ClipboardList,
  FileText,
  PhoneCall,
  Pill,
} from "lucide-react";
import type { PendingTask } from "./mock-data";
import { pendingTasks } from "./mock-data";
import { staggerContainer, staggerItem } from "./MotionVariants";

const categoryConfig: Record<
  PendingTask["category"],
  { icon: typeof FileText; color: string }
> = {
  lab: { icon: ClipboardList, color: "text-violet-500" },
  prescription: { icon: Pill, color: "text-rose-500" },
  notes: { icon: FileText, color: "text-blue-500" },
  call: { icon: PhoneCall, color: "text-emerald-500" },
};

export function PendingTasks() {
  const completed = pendingTasks.filter((t) => t.completed).length;
  const total = pendingTasks.length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/60 bg-white p-5",
        "dark:border-slate-700/40 dark:bg-slate-900/60",
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Pending Tasks
        </h2>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {completed}/{total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full bg-gradient-to-r from-dash-primary to-dash-primary-dark",
          )}
        />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-1"
      >
        {pendingTasks.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
            No pending tasks.
          </p>
        ) : (
          pendingTasks.map((task) => {
            const config = categoryConfig[task.category];
            const Icon = config.icon;

            return (
              <motion.div
                key={task.id}
                variants={staggerItem}
                className={cn(
                  "flex items-start gap-3 rounded-lg p-2 transition-colors",
                  "hover:bg-slate-50 dark:hover:bg-slate-800/40",
                  task.completed && "opacity-60",
                )}
              >
                {task.completed ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                ) : (
                  <Circle className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 dark:text-slate-600" />
                )}
                <div className="flex flex-1 items-center justify-between gap-2">
                  <span
                    className={cn(
                      "text-sm",
                      task.completed
                        ? "text-slate-400 line-through dark:text-slate-500"
                        : "text-slate-700 dark:text-slate-300",
                    )}
                  >
                    {task.label}
                  </span>
                  <Icon className={cn("h-3.5 w-3.5 shrink-0", config.color)} />
                </div>
              </motion.div>
            );
          })
        )}
      </motion.div>
    </div>
  );
}
