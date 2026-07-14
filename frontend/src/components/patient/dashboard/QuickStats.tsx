"use client";

import { cn } from "@/lib/utils";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import {
  Bell,
  CalendarCheck,
  CheckCircle,
  FileText,
  Heart,
  Pill,
} from "lucide-react";
import { useEffect } from "react";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ElementType;
  color: string;
}

const stats: Stat[] = [
  {
    label: "Upcoming Appointment",
    value: 1,
    icon: CalendarCheck,
    color:
      "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  {
    label: "Completed Appointments",
    value: 24,
    icon: CheckCircle,
    color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400",
  },
  {
    label: "Active Prescriptions",
    value: 3,
    icon: Pill,
    color:
      "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400",
  },
  {
    label: "Medical Records",
    value: 12,
    icon: FileText,
    color:
      "text-purple-600 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-400",
  },
  {
    label: "Unread Notifications",
    value: 2,
    icon: Bell,
    color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400",
  },
  {
    label: "Favorite Doctors",
    value: 4,
    icon: Heart,
    color: "text-pink-600 bg-pink-50 dark:bg-pink-950/40 dark:text-pink-400",
  },
];

function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));
  const display = useTransform(() => `${rounded.get()}${suffix}`);

  useEffect(() => {
    const controls = animate(count, to, {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1],
    });
    return controls.stop;
  }, [to, count]);

  return <motion.span className="tabular-nums">{display}</motion.span>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function QuickStats() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            variants={cardVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700/40 dark:bg-slate-800/60"
          >
            {/* Hover glow */}
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(14,124,123,0.06), transparent 40%)",
              }}
            />

            <div className="relative">
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110",
                  stat.color,
                )}
              >
                <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
              </span>
              <div className="mt-3">
                <p className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  <AnimatedCounter to={stat.value} />
                </p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 leading-tight">
                  {stat.label}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
