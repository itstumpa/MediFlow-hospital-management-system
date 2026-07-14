"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Heart, Star } from "lucide-react";
import type { DoctorStats } from "./types";

interface DoctorStatsProps {
  stats: DoctorStats;
}

const statCards = [
  {
    key: "total",
    label: "Total Doctors",
    icon: Heart,
    color: "bg-gradient-to-br from-rose-500 to-pink-500",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    border: "border-rose-200/50 dark:border-rose-800/50",
  },
  {
    key: "available",
    label: "Available Now",
    icon: CheckCircle2,
    color: "bg-gradient-to-br from-emerald-500 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200/50 dark:border-emerald-800/50",
  },
  {
    key: "topRated",
    label: "Top Rated",
    icon: Star,
    color: "bg-gradient-to-br from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200/50 dark:border-amber-800/50",
  },
  {
    key: "recentlyVisited",
    label: "Recently Visited",
    icon: Clock,
    color: "bg-gradient-to-br from-blue-500 to-indigo-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200/50 dark:border-blue-800/50",
  },
  {
    key: "specialties",
    label: "Specialties",
    icon: Heart,
    color: "bg-gradient-to-br from-violet-500 to-purple-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200/50 dark:border-violet-800/50",
  },
] as const;

export function DoctorStats({ stats }: DoctorStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
      role="region"
      aria-label="Doctor statistics"
    >
      {statCards.map((card) => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "relative rounded-2xl border p-5 transition-all hover:shadow-lg",
            card.bg,
            card.border,
          )}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {card.label}
              </p>
              <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                {stats[card.key as keyof DoctorStats]}
              </p>
            </div>
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg",
                card.color,
              )}
              aria-hidden="true"
            >
              <card.icon className="h-6 w-6" />
            </div>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute bottom-0 left-0 h-1 rounded-b-2xl"
            style={{ background: card.color.replace("bg-gradient-to-br ", "") }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
