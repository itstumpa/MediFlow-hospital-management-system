"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  CalendarCheck,
  CalendarRange,
  CalendarX2,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef } from "react";
import type { AppointmentStats as Stats } from "./types";

/* ─── Animated counter ─── */
function AnimatedCounter({
  target,
  suffix = "",
  className,
}: {
  target: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const spring = useSpring(count, { damping: 30, stiffness: 120 });

  useEffect(() => {
    if (inView) {
      spring.set(target);
    }
  }, [inView, target, spring]);

  return (
    <div ref={ref}>
      <motion.span className={cn("text-2xl font-bold tabular-nums", className)}>
        {rounded}
      </motion.span>
      <span className={cn("text-2xl font-bold", className)}>{suffix}</span>
    </div>
  );
}

/* ─── Stat card ─── */
interface StatCardProps {
  icon: LucideIcon;
  label: string;
  target: number;
  colorClass: string;
  bgClass: string;
  iconBgClass: string;
}

function StatCard({
  icon: Icon,
  label,
  target,
  colorClass,
  bgClass,
  iconBgClass,
}: StatCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "rounded-2xl border border-slate-200/60 p-5 shadow-sm transition-all duration-300 hover:shadow-md",
        bgClass,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <AnimatedCounter target={target} className={cn("mt-2", colorClass)} />
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl",
            iconBgClass,
          )}
        >
          <Icon className={cn("h-5 w-5", colorClass)} />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main component ─── */
interface AppointmentStatsProps {
  stats: Stats;
  className?: string;
}

export function AppointmentStats({ stats, className }: AppointmentStatsProps) {
  const cards: StatCardProps[] = [
    {
      icon: CalendarCheck,
      label: "Upcoming",
      target: stats.upcoming,
      colorClass: "text-blue-600 dark:text-blue-400",
      bgClass: "bg-white dark:bg-slate-800/60 dark:border-slate-700/40",
      iconBgClass: "bg-blue-50 dark:bg-blue-950/40",
    },
    {
      icon: CalendarCheck,
      label: "Completed",
      target: stats.completed,
      colorClass: "text-emerald-600 dark:text-emerald-400",
      bgClass: "bg-white dark:bg-slate-800/60 dark:border-slate-700/40",
      iconBgClass: "bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
      icon: CalendarX2,
      label: "Cancelled",
      target: stats.cancelled,
      colorClass: "text-red-600 dark:text-red-400",
      bgClass: "bg-white dark:bg-slate-800/60 dark:border-slate-700/40",
      iconBgClass: "bg-red-50 dark:bg-red-950/40",
    },
    {
      icon: CalendarX2,
      label: "Missed",
      target: stats.missed,
      colorClass: "text-rose-600 dark:text-rose-400",
      bgClass: "bg-white dark:bg-slate-800/60 dark:border-slate-700/40",
      iconBgClass: "bg-rose-50 dark:bg-rose-950/40",
    },
    {
      icon: CalendarRange,
      label: "This Month",
      target: stats.thisMonth,
      colorClass: "text-purple-600 dark:text-purple-400",
      bgClass: "bg-white dark:bg-slate-800/60 dark:border-slate-700/40",
      iconBgClass: "bg-purple-50 dark:bg-purple-950/40",
    },
    {
      icon: Heart,
      label: "Favorite Dr. Visits",
      target: stats.favoriteDoctorVisits,
      colorClass: "text-pink-600 dark:text-pink-400",
      bgClass: "bg-white dark:bg-slate-800/60 dark:border-slate-700/40",
      iconBgClass: "bg-pink-50 dark:bg-pink-950/40",
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4",
        className,
      )}
    >
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </motion.div>
  );
}
