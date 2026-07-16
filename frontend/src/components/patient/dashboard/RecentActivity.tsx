"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarCheck, FileText, FlaskConical, Pill } from "lucide-react";

const activities = [
  {
    label: "Appointment booked",
    description: "Cardiology checkup with Dr. Sarah Chen",
    time: "2 hours ago",
    icon: CalendarCheck,
    color:
      "text-dash-primary bg-dash-primary-light dark:bg-teal-950/40 dark:text-[var(--color-accent)]",
  },
  {
    label: "Prescription added",
    description: "Amoxicillin 500mg — 3 times daily",
    time: "5 hours ago",
    icon: Pill,
    color:
      "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400",
  },
  {
    label: "Lab report uploaded",
    description: "Complete Blood Count (CBC) results ready",
    time: "1 day ago",
    icon: FlaskConical,
    color:
      "text-purple-600 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-400",
  },
  {
    label: "Medical record updated",
    description: "Annual Physical Examination added",
    time: "3 days ago",
    icon: FileText,
    color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function RecentActivity() {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60">
      <h2 className="text-base font-semibold text-slate-900 dark:text-white">
        Recent Activity
      </h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Your latest healthcare updates
      </p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-4 space-y-0"
      >
        {activities.map((act, i) => {
          const Icon = act.icon;
          const isLast = i === activities.length - 1;
          return (
            <motion.div
              key={act.label}
              variants={itemVariants}
              className="relative flex gap-4 pb-6"
            >
              {/* Timeline line */}
              {!isLast && (
                <div className="absolute left-[17px] top-9 h-full w-px bg-slate-200 dark:bg-slate-700" />
              )}

              {/* Icon */}
              <span
                className={cn(
                  "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                  act.color,
                )}
              >
                <Icon className="h-4.5 w-4.5" />
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {act.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {act.description}
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                  {act.time}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
