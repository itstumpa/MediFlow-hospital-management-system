"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar, Download, FileText, History, User } from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";

export function ExportCard() {
  const exportActions = [
    {
      icon: User,
      label: "Export Profile",
      description: "Download your complete profile information",
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      icon: Calendar,
      label: "Export Schedule",
      description: "Download your appointment schedule",
      color: "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-950/30",
    },
    {
      icon: History,
      label: "Download Activity Logs",
      description: "Export your account activity history",
      color: "text-violet-500",
      bg: "bg-violet-50 dark:bg-violet-950/30",
    },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200/60 bg-white p-5 dark:border-slate-700/40 dark:bg-slate-900/60"
      >
        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/30">
            <Download className="h-4 w-4 text-blue-500" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Data Management
          </span>
        </div>

        <div className="space-y-2">
          {exportActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                className="flex w-full items-center gap-3 rounded-lg border border-slate-100 bg-white px-3.5 py-3 text-left transition-all hover:border-slate-200 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700"
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    action.bg,
                  )}
                >
                  <Icon className={cn("h-4 w-4", action.color)} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {action.label}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {action.description}
                  </p>
                </div>
                <Download className="h-4 w-4 text-slate-300 dark:text-slate-600" />
              </button>
            );
          })}
        </div>

        {/* Storage note */}
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-800/30">
          <FileText className="h-3.5 w-3.5 text-slate-400" />
          <p className="text-[10px] text-slate-400">
            Your data will be exported as a ZIP file containing JSON and CSV
            formats.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
