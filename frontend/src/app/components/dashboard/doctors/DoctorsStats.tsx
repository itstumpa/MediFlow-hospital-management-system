"use client";

import { useRef, useState, useEffect, type ElementType } from "react";
import { motion, useInView } from "framer-motion";
import {
  Stethoscope,
  UserCheck,
  Clock,
  Star,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import type { Doctor } from "./types";

interface DoctorsStatsProps {
  doctors: Doctor[];
}

function AnimatedStat({ value, label, icon: Icon, color, suffix = "" }: {
  value: number;
  label: string;
  icon: ElementType;
  color: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(value / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplayed(value);
        clearInterval(timer);
      } else {
        setDisplayed(start);
      }
    }, duration / 60);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="dash-card relative overflow-hidden p-5"
    >
      <div className="absolute right-3 top-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color} bg-opacity-10`}>
          <Icon className={`h-5 w-5 ${color.replace('bg-', 'text-')}`} />
        </div>
      </div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        {displayed}{suffix}
      </p>
      <div className="mt-3 h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${Math.min((displayed / (value * 1.5)) * 100, 100)}%` } : {}}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </motion.div>
  );
}

const colorMap = [
  { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400", bar: "bg-blue-500" },
  { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400", bar: "bg-emerald-500" },
  { bg: "bg-violet-100 dark:bg-violet-900/30", text: "text-violet-600 dark:text-violet-400", bar: "bg-violet-500" },
  { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400", bar: "bg-amber-500" },
  { bg: "bg-rose-100 dark:bg-rose-900/30", text: "text-rose-600 dark:text-rose-400", bar: "bg-rose-500" },
  { bg: "bg-cyan-100 dark:bg-cyan-900/30", text: "text-cyan-600 dark:text-cyan-400", bar: "bg-cyan-500" },
];

export function DoctorsStats({ doctors }: DoctorsStatsProps) {
  const totalDoctors = doctors.length;
  const activeDoctors = doctors.filter((d) => d.status === "Active").length;
  const availableNow = doctors.filter((d) => d.availability === "Available").length;
  const avgRating = doctors.reduce((acc, d) => acc + d.rating, 0) / totalDoctors;
  const onLeave = doctors.filter((d) => d.status === "On Leave" || d.status === "Vacation").length;
  const totalPatients = doctors.reduce((acc, d) => acc + d.patients, 0);

  const stats = [
    { value: totalDoctors, label: "Total Doctors", icon: Stethoscope, ...colorMap[0] },
    { value: activeDoctors, label: "Active Doctors", icon: UserCheck, ...colorMap[1] },
    { value: availableNow, label: "Available Now", icon: Clock, ...colorMap[2] },
    { value: parseFloat(avgRating.toFixed(1)), label: "Avg Rating", icon: Star, ...colorMap[3] },
    { value: onLeave, label: "On Leave / Vacation", icon: AlertTriangle, ...colorMap[4] },
    { value: totalPatients, label: "Total Patients", icon: TrendingUp, ...colorMap[5] },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat, i) => (
        <AnimatedStat
          key={stat.label}
          value={stat.value}
          label={stat.label}
          icon={stat.icon}
          color={stat.bar}
          suffix={stat.label === "Avg Rating" ? "" : ""}
        />
      ))}
    </div>
  );
}
