"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Users,
  UserPlus,
  CalendarCheck,
  Activity,
  DoorOpen,
  Clock,
} from "lucide-react";
import type { Patient } from "./types";
import { Sparkline } from "../Sparkline";

interface PatientsStatsProps {
  patients: Patient[];
}

const statsConfig = [
  {
    key: "total",
    label: "Total Patients",
    icon: Users,
    colorClass: "blue",
    sparklineColor: "#2563eb",
    getValue: (p: Patient[]) => p.length,
    getTrend: () => 12.5,
    getSparkline: () => [820, 835, 842, 856, 868, 872, 885],
  },
  {
    key: "newThisMonth",
    label: "New This Month",
    icon: UserPlus,
    colorClass: "emerald",
    sparklineColor: "#16a34a",
    getValue: (p: Patient[]) => p.filter((pat) => {
      const d = new Date(pat.registrationDate);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length || 8,
    getTrend: () => 18.2,
    getSparkline: () => [3, 5, 4, 7, 6, 8, 8],
  },
  {
    key: "todayVisits",
    label: "Today's Visits",
    icon: CalendarCheck,
    colorClass: "violet",
    sparklineColor: "#7c3aed",
    getValue: () => 14,
    getTrend: () => -5.3,
    getSparkline: () => [12, 15, 11, 18, 14, 16, 14],
  },
  {
    key: "active",
    label: "Active Patients",
    icon: Activity,
    colorClass: "amber",
    sparklineColor: "#d97706",
    getValue: (p: Patient[]) => p.filter((pat) => pat.status === "Active").length,
    getTrend: () => 8.7,
    getSparkline: () => [320, 335, 342, 348, 356, 362, 368],
  },
  {
    key: "discharged",
    label: "Discharged",
    icon: DoorOpen,
    colorClass: "cyan",
    sparklineColor: "#0891b2",
    getValue: (p: Patient[]) => p.filter((pat) => pat.status === "Discharged").length,
    getTrend: () => 4.1,
    getSparkline: () => [42, 44, 43, 45, 46, 45, 47],
  },
  {
    key: "pending",
    label: "Pending Registration",
    icon: Clock,
    colorClass: "rose",
    sparklineColor: "#e11d48",
    getValue: (p: Patient[]) => p.filter((pat) => pat.status === "Pending").length,
    getTrend: () => 22.3,
    getSparkline: () => [2, 3, 2, 4, 3, 5, 4],
  },
];

const colorMap: Record<string, { bg: string; text: string; bar: string }> = {
  blue: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400", bar: "bg-blue-500" },
  emerald: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400", bar: "bg-emerald-500" },
  violet: { bg: "bg-violet-100 dark:bg-violet-900/30", text: "text-violet-600 dark:text-violet-400", bar: "bg-violet-500" },
  amber: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400", bar: "bg-amber-500" },
  cyan: { bg: "bg-cyan-100 dark:bg-cyan-900/30", text: "text-cyan-600 dark:text-cyan-400", bar: "bg-cyan-500" },
  rose: { bg: "bg-rose-100 dark:bg-rose-900/30", text: "text-rose-600 dark:text-rose-400", bar: "bg-rose-500" },
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
  const [displayed, setDisplayed] = React.useState(0);
  const isPositive = trend >= 0;
  const colors = colorMap[colorClass] ?? colorMap.blue;

  React.useEffect(() => {
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
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="relative">
        <div className="flex items-start justify-between">
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg}`}>
            <Icon className={`h-5 w-5 ${colors.text}`} />
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
              isPositive
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
            }`}
          >
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d={isPositive ? "M6 2.5v7M6 2.5L3 5.5M6 2.5L9 5.5" : "M6 9.5v-7M6 9.5L3 6.5M6 9.5L9 6.5"}
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
          <Sparkline data={sparkline} color={sparklineColor} width={60} height={24} />
        </div>

        <div className="mt-3 h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${Math.min((value / 1000) * 100, 100)}%` } : {}}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className={`h-full rounded-full ${colors.bar}`}
          />
        </div>
      </div>
    </motion.div>
  );
}

import React from "react";

export function PatientsStats({ patients }: PatientsStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      {statsConfig.map((stat, i) => (
        <StatCard
          key={stat.key}
          label={stat.label}
          value={stat.getValue(patients)}
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
