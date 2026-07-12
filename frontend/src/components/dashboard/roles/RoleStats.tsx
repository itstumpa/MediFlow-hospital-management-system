"use client";

import { motion } from "framer-motion";
import { Users, Shield, Copy, Key, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { RoleStats } from "@/lib/data/rbac";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";

interface RoleStatsProps {
  stats: RoleStats;
  className?: string;
}

const statCards = [
  {
    key: "totalRoles",
    label: "Total Roles",
    icon: Shield,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    key: "usersAssigned",
    label: "Users Assigned",
    icon: Users,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  {
    key: "customRoles",
    label: "Custom Roles",
    icon: Copy,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-900/20",
    border: "border-violet-200 dark:border-violet-800",
  },
  {
    key: "totalPermissions",
    label: "Total Permissions",
    icon: Key,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-800",
  },
] as const;

export function RoleStats({ stats, className }: RoleStatsProps) {
  return (
    <div
      className={cn("grid grid-cols-2 gap-4 sm:grid-cols-4", className)}
      role="region"
      aria-label="Role statistics"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {statCards.map((card, index) => (
          <motion.div
            key={card.key}
            variants={staggerItem}
            className={cn(
              "relative rounded-xl border p-5 transition-all duration-300 hover:shadow-lg",
              card.bg,
              card.border,
              "whileHover:shadow-xl whileHover:-translate-y-1",
            )}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {card.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-foreground">
                  {stats[card.key as keyof RoleStats].toLocaleString()}
                </p>
              </div>
              <div
                className={cn(
                  "size-12 rounded-xl flex items-center justify-center",
                  card.bg,
                  card.color,
                )}
              >
                <card.icon className="size-6" aria-hidden="true" />
              </div>
            </div>
            {/* Decorative accent bar */}
            <div
              className={cn(
                "absolute bottom-0 left-0 right-0 h-1 rounded-b-xl opacity-50",
                card.color.replace("text-", "bg-"),
              )}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
