"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Cloud,
  DollarSign,
  ListChecks,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";
import { shiftSummary, upcomingTasks, type DashboardTask } from "../_mock-data";

/* ══════════════════════════════════════════════
   Mini Calendar
   ══════════════════════════════════════════════ */

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function MiniCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthName = today.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayDate = today.getDate();

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  // Highlighted event dates
  const eventDates = [3, 7, 12, 14, 18, 22, 25, todayDate];

  return (
    <div className="dash-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          <Calendar className="mr-1.5 inline h-3.5 w-3.5 text-[var(--color-primary)]" />
          {monthName}
        </h3>
        <span className="text-xs text-slate-400">Today</span>
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center text-xs">
        {DAYS.map((d) => (
          <div
            key={d}
            className="py-1 text-[10px] font-medium text-slate-400 dark:text-slate-500"
          >
            {d}
          </div>
        ))}
        {days.map((d, i) =>
          d ? (
            <div
              key={i}
              className={cn(
                "relative flex items-center justify-center rounded-lg py-1 text-xs transition-colors",
                d === todayDate
                  ? "bg-[var(--color-primary)] font-semibold text-white"
                  : eventDates.includes(d)
                    ? "font-medium text-[var(--color-primary)] dark:text-[var(--color-accent)]"
                    : "text-slate-600 dark:text-slate-400",
              )}
            >
              {d}
              {d !== todayDate && eventDates.includes(d) && (
                <span className="absolute bottom-0.5 left-1/2 h-0.5 w-0.5 -translate-x-1/2 rounded-full bg-[var(--color-primary)] dark:bg-[var(--color-accent)]" />
              )}
            </div>
          ) : (
            <div key={i} />
          ),
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Upcoming Tasks
   ══════════════════════════════════════════════ */

function TaskItem({ task }: { task: DashboardTask }) {
  const [completed, setCompleted] = useState(task.completed);

  const priorityDot = cn(
    "h-1.5 w-1.5 rounded-full shrink-0",
    task.priority === "high"
      ? "bg-red-500"
      : task.priority === "normal"
        ? "bg-amber-500"
        : "bg-slate-400",
  );

  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        onClick={() => setCompleted(!completed)}
        className="mt-0.5 shrink-0 text-slate-300 transition-colors hover:text-[var(--color-primary)] dark:text-slate-600 dark:hover:text-[var(--color-accent)]"
      >
        {completed ? (
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
        ) : (
          <Circle className="h-4 w-4" />
        )}
      </button>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-sm transition-colors",
            completed
              ? "text-slate-400 line-through dark:text-slate-500"
              : "text-slate-700 dark:text-slate-300",
          )}
        >
          {task.title}
        </p>
        <p className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="h-3 w-3" />
          {task.time}
        </p>
      </div>
      {!completed && <span className={priorityDot} />}
    </div>
  );
}

function UpcomingTasks() {
  return (
    <div className="dash-card p-4">
      <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-white">
        <ListChecks className="h-4 w-4 text-[var(--color-primary)]" />
        Upcoming Tasks
      </h3>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {upcomingTasks.map((task) => (
          <motion.div key={task.id} variants={staggerItem}>
            <TaskItem task={task} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Shift Summary
   ══════════════════════════════════════════════ */

function ShiftSummaryCard() {
  const shift = shiftSummary;

  const items = [
    {
      label: "Patients Attended",
      value: shift.patientsAttended.toString(),
      icon: Users,
    },
    {
      label: "Appointments Completed",
      value: shift.appointmentsCompleted.toString(),
      icon: CheckCircle2,
    },
    { label: "Check-ins", value: shift.checkIns.toString(), icon: UserCheck },
    {
      label: "New Registrations",
      value: shift.newRegistrations.toString(),
      icon: UserPlus,
    },
    {
      label: "Revenue Collected",
      value: shift.revenueCollected,
      icon: DollarSign,
    },
  ];

  return (
    <div className="dash-card p-4">
      <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-white">
        <Clock className="h-4 w-4 text-amber-500" />
        Shift Summary
      </h3>
      <div className="mb-3 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:bg-slate-800/40 dark:text-slate-400">
        {shift.shift} · {shift.time}
      </div>
      <div className="space-y-2.5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <item.icon className="h-3.5 w-3.5 text-slate-400" />
              {item.label}
            </span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Weather Widget (UI only)
   ══════════════════════════════════════════════ */

function WeatherWidget() {
  return (
    <div className="dash-card overflow-hidden bg-gradient-to-br from-sky-500 to-sky-600 p-4 text-white dark:from-sky-600 dark:to-sky-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-white/80">New York City</p>
          <p className="mt-1 text-3xl font-bold">72°F</p>
          <p className="mt-0.5 text-xs text-white/70">Partly Cloudy</p>
        </div>
        <Cloud className="h-12 w-12 text-white/80" strokeWidth={1.2} />
      </div>
      <div className="mt-3 flex gap-3 border-t border-white/20 pt-3 text-xs text-white/70">
        <span>Humidity: 58%</span>
        <span>Wind: 8 mph</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Dashboard Sidebar (exported)
   ══════════════════════════════════════════════ */

export function DashboardSidebar() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={staggerItem}>
        <WeatherWidget />
      </motion.div>
      <motion.div variants={staggerItem}>
        <MiniCalendar />
      </motion.div>
      <motion.div variants={staggerItem}>
        <UpcomingTasks />
      </motion.div>
      <motion.div variants={staggerItem}>
        <ShiftSummaryCard />
      </motion.div>
    </motion.div>
  );
}
