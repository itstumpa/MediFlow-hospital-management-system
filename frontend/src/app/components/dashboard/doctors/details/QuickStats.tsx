"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  DollarSign,
  MessageSquare,
  Star,
  ThumbsUp,
  Users,
} from "lucide-react";
import { AnimatedCounter } from "../../AnimatedCounter";
import type { AdminDoctorDetail } from "@/lib/data/admin-doctors";
import { cn } from "@/lib/utils";

interface QuickStatsProps {
  stats: AdminDoctorDetail["stats"];
}

interface StatItem {
  icon: typeof CalendarCheck;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  colorClass: string;
  decimals?: number;
}

const colorVariants: Record<
  string,
  { bg: string; text: string; ring: string }
> = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-600 dark:text-blue-400",
    ring: "ring-blue-500/20",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-600 dark:text-emerald-400",
    ring: "ring-emerald-500/20",
  },
  violet: {
    bg: "bg-violet-50 dark:bg-violet-950/30",
    text: "text-violet-600 dark:text-violet-400",
    ring: "ring-violet-500/20",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-600 dark:text-amber-400",
    ring: "ring-amber-500/20",
  },
  rose: {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    text: "text-rose-600 dark:text-rose-400",
    ring: "ring-rose-500/20",
  },
  cyan: {
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    text: "text-cyan-600 dark:text-cyan-400",
    ring: "ring-cyan-500/20",
  },
};

export function QuickStats({ stats }: QuickStatsProps) {
  const items: StatItem[] = [
    {
      icon: CalendarCheck,
      label: "Today's Appointments",
      value: stats.todayAppointments,
      colorClass: "blue",
    },
    {
      icon: Users,
      label: "Total Patients",
      value: stats.totalPatients,
      colorClass: "emerald",
    },
    {
      icon: DollarSign,
      label: "Monthly Revenue",
      value: stats.monthlyRevenue,
      prefix: "$",
      colorClass: "violet",
    },
    {
      icon: MessageSquare,
      label: "Reviews",
      value: stats.reviews,
      colorClass: "amber",
    },
    {
      icon: ThumbsUp,
      label: "Completed Appointments",
      value: stats.completedAppointments,
      colorClass: "cyan",
    },
    {
      icon: Star,
      label: "Average Rating",
      value: stats.averageRating,
      decimals: 1,
      colorClass: "rose",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {items.map((item, i) => {
        const colors = colorVariants[item.colorClass] ?? colorVariants.blue;
        const Icon = item.icon;

        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: i * 0.06,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900",
              "hover:shadow-lg",
            )}
          >
            <div className="relative">
              <div className="flex items-start justify-between">
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl",
                    colors.bg,
                  )}
                >
                  <Icon className={cn("h-5 w-5", colors.text)} />
                </span>
              </div>

              <div className="mt-4">
                <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {item.prefix && (
                    <span className="text-lg">{item.prefix}</span>
                  )}
                  <AnimatedCounter
                    to={item.value}
                    decimals={item.decimals ?? 0}
                    duration={1.4}
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
