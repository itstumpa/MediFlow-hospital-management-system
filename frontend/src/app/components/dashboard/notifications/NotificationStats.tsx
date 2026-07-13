"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { NotificationStats } from "@/lib/data/notifications";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  BellRing,
  CalendarCheck,
  MessageSquare,
  Settings2,
  type LucideIcon,
} from "lucide-react";

interface NotificationStatsProps {
  stats: NotificationStats;
}

const statCards: {
  key: keyof NotificationStats;
  label: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  darkBg: string;
}[] = [
  {
    key: "total",
    label: "Total",
    icon: Bell,
    color: "text-dash-primary dark:text-accent",
    bg: "bg-dash-primary-light",
    darkBg: "dark:bg-teal-500/10",
  },
  {
    key: "unread",
    label: "Unread",
    icon: BellRing,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50",
    darkBg: "dark:bg-amber-500/10",
  },
  {
    key: "critical",
    label: "Critical",
    icon: AlertTriangle,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50",
    darkBg: "dark:bg-red-500/10",
  },
  {
    key: "appointments",
    label: "Appointments",
    icon: CalendarCheck,
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50",
    darkBg: "dark:bg-indigo-500/10",
  },
  {
    key: "system",
    label: "System",
    icon: Settings2,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50",
    darkBg: "dark:bg-violet-500/10",
  },
  {
    key: "messages",
    label: "Messages",
    icon: MessageSquare,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50",
    darkBg: "dark:bg-emerald-500/10",
  },
];

export function NotificationStats({ stats }: NotificationStatsProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-3 gap-3 sm:grid-cols-6"
    >
      {statCards.map((card) => {
        const Icon = card.icon;
        const value = stats[card.key];
        return (
          <motion.div
            key={card.key}
            variants={staggerItem}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className={cn(
              "rounded-xl border border-slate-200 p-3.5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700",
              card.bg,
              card.darkBg,
            )}
          >
            <div className="flex items-center justify-between">
              <Icon className={cn("h-4 w-4", card.color)} />
            </div>
            <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
              {value}
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
              {card.label}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
