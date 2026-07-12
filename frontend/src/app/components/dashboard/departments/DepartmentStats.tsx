"use client";

import { motion, useInView } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CalendarCheck,
  CheckCircle2,
  Smile,
  Stethoscope,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Department } from "./types";

interface DepartmentStatsProps {
  departments: Department[];
}

function AnimatedCounter({
  value,
  inView,
  duration = 1.2,
}: {
  value: number;
  inView: boolean;
  duration?: number;
}) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) {
      setDisplayed(0);
      return;
    }
    let start = 0;
    const steps = 60;
    const increment = value / steps;
    const timer = setInterval(
      () => {
        start += increment;
        if (start >= value) {
          setDisplayed(value);
          clearInterval(timer);
        } else {
          setDisplayed(Math.round(start));
        }
      },
      (duration * 1000) / steps,
    );
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return <>{displayed.toLocaleString()}</>;
}

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  color: { bg: string; text: string; glow: string };
  index?: number;
  sparkline: number[];
  trend: number;
}

function StatCard({
  label,
  value,
  suffix = "",
  icon: Icon,
  color,
  index = 0,
  sparkline,
  trend,
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const isPositive = trend >= 0;

  const maxVal = Math.max(...sparkline, 1);
  const pathData = sparkline
    .map(
      (v, i) =>
        `${i === 0 ? "M" : "L"}${(i / (sparkline.length - 1)) * 60},${24 - (v / maxVal) * 20}`,
    )
    .join(" ");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: (index ?? 0) * 0.06,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div
        className={`pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${color.glow}`}
      />
      <div className="relative">
        <div className="flex items-start justify-between">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${color.bg}`}
          >
            <Icon className={`h-5 w-5 ${color.text}`} />
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
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            <AnimatedCounter value={value} inView={inView} duration={1.2} />
            {suffix}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <svg
            width="60"
            height="24"
            viewBox="0 0 60 24"
            className="opacity-60"
            aria-hidden="true"
          >
            <path
              d={pathData}
              fill="none"
              stroke={isPositive ? "#16a34a" : "#dc2626"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export function DepartmentStats({ departments }: DepartmentStatsProps) {
  const totalDepartments = departments.length;
  const activeDepartments = departments.filter(
    (d) => d.status === "Active",
  ).length;
  const totalDoctors = departments.reduce((acc, d) => acc + d.doctors, 0);
  const totalPatients = departments.reduce((acc, d) => acc + d.patients, 0);
  const monthlyAppointments = departments.reduce(
    (acc, d) => acc + d.appointments,
    0,
  );
  const avgSatisfaction =
    totalDepartments > 0
      ? Math.round(
          (departments.reduce((acc, d) => acc + d.satisfaction, 0) /
            totalDepartments) *
            10,
        ) / 10
      : 0;

  const stats: StatCardProps[] = [
    {
      label: "Total Departments",
      value: totalDepartments,
      icon: Building2,
      color: {
        bg: "bg-blue-50 dark:bg-blue-950/30",
        text: "text-blue-600 dark:text-blue-400",
        glow: "shadow-blue-500/10",
      },
      sparkline: [2, 4, 3, 6, 5, 8, 10, 12, 14, 16, 16],
      trend: 12,
    },
    {
      label: "Active Departments",
      value: activeDepartments,
      icon: CheckCircle2,
      color: {
        bg: "bg-emerald-50 dark:bg-emerald-950/30",
        text: "text-emerald-600 dark:text-emerald-400",
        glow: "shadow-emerald-500/10",
      },
      sparkline: [4, 6, 5, 8, 7, 10, 9, 12, 11, 14, 14],
      trend: 8,
    },
    {
      label: "Total Doctors",
      value: totalDoctors,
      icon: Stethoscope,
      color: {
        bg: "bg-violet-50 dark:bg-violet-950/30",
        text: "text-violet-600 dark:text-violet-400",
        glow: "shadow-violet-500/10",
      },
      sparkline: [40, 50, 55, 60, 70, 85, 90, 100, 110, 120, 233],
      trend: 15,
    },
    {
      label: "Total Patients",
      value: totalPatients,
      icon: Users,
      color: {
        bg: "bg-amber-50 dark:bg-amber-950/30",
        text: "text-amber-600 dark:text-amber-400",
        glow: "shadow-amber-500/10",
      },
      sparkline: [
        5000, 8000, 12000, 15000, 18000, 22000, 25000, 28000, 32000, 35000,
        184670,
      ],
      trend: 22,
    },
    {
      label: "Monthly Appointments",
      value: monthlyAppointments,
      icon: CalendarCheck,
      color: {
        bg: "bg-rose-50 dark:bg-rose-950/30",
        text: "text-rose-600 dark:text-rose-400",
        glow: "shadow-rose-500/10",
      },
      sparkline: [
        1000, 2000, 2800, 3500, 4000, 4800, 5200, 5800, 6200, 6800, 44280,
      ],
      trend: 18,
    },
    {
      label: "Average Satisfaction",
      value: avgSatisfaction,
      suffix: "%",
      icon: Smile,
      color: {
        bg: "bg-cyan-50 dark:bg-cyan-950/30",
        text: "text-cyan-600 dark:text-cyan-400",
        glow: "shadow-cyan-500/10",
      },
      sparkline: [82, 84, 85, 87, 88, 89, 90, 91, 92, 92, 93],
      trend: 3,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} {...stat} index={i} />
      ))}
    </div>
  );
}
