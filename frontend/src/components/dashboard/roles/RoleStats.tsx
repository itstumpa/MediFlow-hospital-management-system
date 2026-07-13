"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/app/components/dashboard/MotionVariants";
import type { RoleStats } from "@/lib/data/rbac";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Copy, Key, Shield, Users } from "lucide-react";

interface RoleStatsProps {
  stats: RoleStats;
  className?: string;
}

const statCards = [
  {
    key: "totalRoles" as const,
    label: "Total Roles",
    icon: Shield,
    gradient: "from-teal-500 to-emerald-600",
    lightBg: "bg-teal-50 dark:bg-teal-900/20",
    iconColor: "text-teal-600 dark:text-teal-400",
  },
  {
    key: "usersAssigned" as const,
    label: "Users Assigned",
    icon: Users,
    gradient: "from-dash-primary to-indigo-600",
    lightBg: "bg-dash-primary-light dark:bg-teal-900/20",
    iconColor: "text-dash-primary dark:text-accent",
  },
  {
    key: "customRoles" as const,
    label: "Custom Roles",
    icon: Copy,
    gradient: "from-violet-500 to-purple-600",
    lightBg: "bg-violet-50 dark:bg-violet-900/20",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    key: "totalPermissions" as const,
    label: "Total Permissions",
    icon: Key,
    gradient: "from-amber-500 to-orange-600",
    lightBg: "bg-amber-50 dark:bg-amber-900/20",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
] as const;

export function RoleStats({ stats, className }: RoleStatsProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={cn("grid grid-cols-2 gap-4 sm:grid-cols-4", className)}
      role="region"
      aria-label="Role statistics"
    >
      {statCards.map((card) => (
        <motion.div
          key={card.key}
          variants={staggerItem}
          className={cn(
            "group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
          )}
        >
          {/* Gradient accent bar */}
          <div
            className={cn(
              "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
              card.gradient,
            )}
          />

          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {card.label}
              </p>
              <motion.p
                key={stats[card.key]}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums"
              >
                {stats[card.key].toLocaleString()}
              </motion.p>
            </div>
            <div
              className={cn(
                "flex size-12 items-center justify-center rounded-xl",
                card.lightBg,
                card.iconColor,
              )}
            >
              <card.icon className="size-6" aria-hidden="true" />
            </div>
          </div>

          {/* Hover shimmer effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.div>
      ))}
    </motion.div>
  );
}
