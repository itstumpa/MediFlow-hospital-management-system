"use client";

import { Button } from "@/app/components/dashboard/Button";
import { fadeUp } from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import {
  Building,
  Calendar as CalendarIcon,
  CalendarPlus,
  Clock,
  DollarSign,
  Shield,
  UserPlus,
} from "lucide-react";
import { useEffect, useState } from "react";

const staffMember = {
  name: "Sarah Mitchell",
  department: "Front Desk",
  role: "Senior Receptionist",
  shift: "Morning Shift (8:00 AM – 2:00 PM)",
};

export function DashboardHero() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hour = time.getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white via-white to-slate-50/80 p-6 dark:border-slate-700/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/60 sm:p-8"
    >
      {/* Decorative gradient blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-[0.08] dark:opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        {/* Greeting & info */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {greeting}, {staffMember.name.split(" ")[0]} 👋
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="h-3.5 w-3.5" />
              {formattedDate}
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
              <Clock className="h-3.5 w-3.5" />
              {formattedTime}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <Building className="h-3.5 w-3.5 text-[var(--color-primary)]" />
              {staffMember.department}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <Clock className="h-3.5 w-3.5 text-amber-500" />
              {staffMember.shift}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
              <Shield className="h-3.5 w-3.5" />
              {staffMember.role}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <Button variant="primary" size="sm" icon={UserPlus}>
            Register Patient
          </Button>
          <Button variant="secondary" size="sm" icon={CalendarPlus}>
            New Appointment
          </Button>
          <Button variant="outline" size="sm" icon={DollarSign}>
            Generate Invoice
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
