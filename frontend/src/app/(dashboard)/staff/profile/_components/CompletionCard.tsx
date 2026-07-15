"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

interface CompletionCardProps {
  percent: number;
  items: { label: string; completed: boolean }[];
}

export function CompletionCard({ percent, items }: CompletionCardProps) {
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="dash-card"
    >
      <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
        Profile Completion
      </h3>

      {/* Circular Progress */}
      <div className="mb-4 flex justify-center">
        <div className="relative flex items-center justify-center">
          <svg width="96" height="96" className="-rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-700"
              strokeWidth="6"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="currentColor"
              className="text-emerald-500"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <span className="absolute text-lg font-bold text-slate-900 dark:text-white">
            {percent}%
          </span>
        </div>
      </div>

      {/* Checklist */}
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2 text-sm">
            {item.completed ? (
              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500" />
            ) : (
              <Circle className="h-4 w-4 flex-shrink-0 text-slate-300 dark:text-slate-600" />
            )}
            <span
              className={
                item.completed
                  ? "text-slate-700 dark:text-slate-300"
                  : "text-slate-400 dark:text-slate-500"
              }
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
