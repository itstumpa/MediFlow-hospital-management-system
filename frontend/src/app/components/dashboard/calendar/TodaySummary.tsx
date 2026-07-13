"use client";

import type { DaySummary } from "@/lib/data/appointment-calendar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarCheck, Clock, HelpCircle, XCircle } from "lucide-react";

interface TodaySummaryProps {
  summary: DaySummary;
}

export function TodaySummary({ summary }: TodaySummaryProps) {
  const items = [
    {
      label: "Total",
      value: summary.totalAppointments,
      icon: CalendarCheck,
      color: "text-dash-primary",
      bg: "bg-dash-primary-light dark:bg-dash-primary/20",
    },
    {
      label: "Completed",
      value: summary.completed,
      icon: Clock,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/30",
    },
    {
      label: "Pending",
      value: summary.pending,
      icon: HelpCircle,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/30",
    },
    {
      label: "Cancelled",
      value: summary.cancelled,
      icon: XCircle,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-900/30",
    },
  ];

  return (
    <div className="dash-card p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
        Today&apos;s Summary
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={cn("flex items-center gap-2.5 rounded-xl p-3", item.bg)}
          >
            <div className={cn("rounded-lg", item.bg)}>
              <item.icon className={cn("h-4 w-4", item.color)} />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {item.value}
              </p>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {item.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
