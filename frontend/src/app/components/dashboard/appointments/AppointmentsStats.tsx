"use client";

import { motion, useInView } from "framer-motion";
import {
  Calendar,
  CalendarCheck,
  CalendarClock,
  CalendarSync,
  CheckCircle2,
  Clock,
  UserX,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Sparkline } from "../Sparkline";
import type { Appointment } from "./types";

interface AppointmentsStatsProps {
  appointments: Appointment[];
}

const statsConfig = [
  {
    key: "today",
    label: "Today's Appointments",
    icon: CalendarCheck,
    colorClass: "blue",
    sparklineColor: "#0e7c7b",
    getValue: (a: Appointment[]) =>
      a.filter((apt) => apt.date === new Date().toISOString().slice(0, 10))
        .length || 12,
    getTrend: () => 8.3,
    getSparkline: () => [8, 10, 12, 9, 14, 11, 12],
  },
  {
    key: "upcoming",
    label: "Upcoming",
    icon: CalendarClock,
    colorClass: "indigo",
    sparklineColor: "#4f46e5",
    getValue: (a: Appointment[]) =>
      a.filter((apt) => apt.date > new Date().toISOString().slice(0, 10))
        .length || 18,
    getTrend: () => 5.7,
    getSparkline: () => [12, 15, 14, 18, 16, 19, 18],
  },
  {
    key: "completed",
    label: "Completed",
    icon: CheckCircle2,
    colorClass: "emerald",
    sparklineColor: "#16a34a",
    getValue: (a: Appointment[]) =>
      a.filter((apt) => apt.status === "Completed").length,
    getTrend: () => 12.1,
    getSparkline: () => [28, 32, 35, 34, 38, 36, 40],
  },
  {
    key: "cancelled",
    label: "Cancelled",
    icon: XCircle,
    colorClass: "red",
    sparklineColor: "#dc2626",
    getValue: (a: Appointment[]) =>
      a.filter((apt) => apt.status === "Cancelled").length,
    getTrend: () => -3.2,
    getSparkline: () => [8, 6, 7, 5, 4, 5, 3],
  },
  {
    key: "pending",
    label: "Pending Approval",
    icon: Clock,
    colorClass: "amber",
    sparklineColor: "#d97706",
    getValue: (a: Appointment[]) =>
      a.filter((apt) => apt.status === "Pending").length,
    getTrend: () => 15.8,
    getSparkline: () => [5, 7, 6, 8, 7, 9, 8],
  },
  {
    key: "noShow",
    label: "No Shows",
    icon: UserX,
    colorClass: "rose",
    sparklineColor: "#e11d48",
    getValue: (a: Appointment[]) =>
      a.filter((apt) => apt.status === "No Show").length,
    getTrend: () => -8.5,
    getSparkline: () => [4, 3, 5, 2, 3, 2, 2],
  },
  {
    key: "rescheduled",
    label: "Rescheduled",
    icon: CalendarSync,
    colorClass: "violet",
    sparklineColor: "#7c3aed",
    getValue: (a: Appointment[]) =>
      a.filter((apt) => apt.status === "Rescheduled").length,
    getTrend: () => 6.4,
    getSparkline: () => [3, 4, 3, 5, 4, 6, 5],
  },
  {
    key: "monthly",
    label: "Monthly Appointments",
    icon: Calendar,
    colorClass: "cyan",
    sparklineColor: "#0891b2",
    getValue: () => 342,
    getTrend: () => 22.4,
    getSparkline: () => [286, 302, 315, 298, 328, 335, 342],
  },
];

const colorMap: Record<string, { bg: string; text: string; bar: string }> = {
  blue: {
    bg: "bg-dash-primary-light dark:bg-teal-900/30",
    text: "text-dash-primary dark:text-accent",
    bar: "bg-dash-primary",
  },
  indigo: {
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    text: "text-indigo-600 dark:text-indigo-400",
    bar: "bg-indigo-500",
  },
  emerald: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-600 dark:text-emerald-400",
    bar: "bg-emerald-500",
  },
  red: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-600 dark:text-red-400",
    bar: "bg-red-500",
  },
  amber: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-600 dark:text-amber-400",
    bar: "bg-amber-500",
  },
  rose: {
    bg: "bg-rose-100 dark:bg-rose-900/30",
    text: "text-rose-600 dark:text-rose-400",
    bar: "bg-rose-500",
  },
  violet: {
    bg: "bg-violet-100 dark:bg-violet-900/30",
    text: "text-violet-600 dark:text-violet-400",
    bar: "bg-violet-500",
  },
  cyan: {
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    text: "text-cyan-600 dark:text-cyan-400",
    bar: "bg-cyan-500",
  },
};

function StatCard({
  label,
  value,
  trend,
  sparkline,
  sparklineColor,
  icon: Icon,
  colorClass,
  index,
}: {
  label: string;
  value: number;
  trend: number;
  sparkline: number[];
  sparklineColor: string;
  icon: React.ElementType;
  colorClass: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [displayed, setDisplayed] = useState(0);
  const isPositive = trend >= 0;
  const colors = colorMap[colorClass] ?? colorMap.blue;

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1000;
    const steps = 40;
    const increment = value / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayed(value);
        clearInterval(timer);
      } else {
        setDisplayed(Math.floor(start));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="relative">
        <div className="flex items-start justify-between">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg}`}
          >
            <Icon className={`h-5 w-5 ${colors.text}`} />
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
              isPositive
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
            }`}
          >
            <svg
              className="h-3 w-3"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d={
                  isPositive
                    ? "M6 2.5v7M6 2.5L3 5.5M6 2.5L9 5.5"
                    : "M6 9.5v-7M6 9.5L3 6.5M6 9.5L9 6.5"
                }
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {Math.abs(trend)}%
          </span>
        </div>

        <div className="mt-3">
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {displayed}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <Sparkline
            data={sparkline}
            color={sparklineColor}
            width={60}
            height={24}
          />
        </div>

        <div className="mt-3 h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800">
          <motion.div
            initial={{ width: 0 }}
            animate={
              inView ? { width: `${Math.min((value / 400) * 100, 100)}%` } : {}
            }
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className={`h-full rounded-full ${colors.bar}`}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function AppointmentsStats({ appointments }: AppointmentsStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-8">
      {statsConfig.map((stat, i) => (
        <StatCard
          key={stat.key}
          label={stat.label}
          value={stat.getValue(appointments)}
          trend={stat.getTrend()}
          sparkline={stat.getSparkline()}
          sparklineColor={stat.sparklineColor}
          icon={stat.icon}
          colorClass={stat.colorClass}
          index={i}
        />
      ))}
    </div>
  );
}
