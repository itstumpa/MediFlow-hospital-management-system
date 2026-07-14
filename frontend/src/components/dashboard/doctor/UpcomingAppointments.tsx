"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { upcomingAppointments } from "./mock-data";
import { staggerContainer, staggerItem } from "./MotionVariants";

const priorityStyles = {
  normal: {
    badge: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    indicator: "bg-slate-400",
  },
  urgent: {
    badge:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
    indicator: "bg-amber-500",
  },
  emergency: {
    badge: "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400",
    indicator: "bg-red-500",
  },
};

const initialsColors = [
  "from-dash-primary to-dash-primary-dark",
  "from-violet-500 to-purple-500",
  "from-emerald-500 to-teal-500",
  "from-rose-500 to-pink-500",
  "from-amber-500 to-orange-500",
];

export function UpcomingAppointments() {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/60 bg-white p-5",
        "dark:border-slate-700/40 dark:bg-slate-900/60",
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Upcoming Appointments
        </h2>
        <Link
          href="/doctor/appointments"
          className="inline-flex items-center gap-0.5 text-xs font-medium text-dash-primary transition-colors hover:text-dash-primary-dark dark:text-accent dark:hover:text-accent"
        >
          View all
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {upcomingAppointments.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
            No upcoming appointments.
          </p>
        ) : (
          upcomingAppointments.map((apt, idx) => {
            const pStyle = priorityStyles[apt.priority];
            const gradient = initialsColors[idx % initialsColors.length];

            return (
              <motion.div
                key={apt.id}
                variants={staggerItem}
                whileHover={{
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                className={cn(
                  "group relative flex items-start gap-3 rounded-xl border border-slate-100 p-3 transition-all duration-200",
                  "hover:border-slate-200 hover:shadow-md",
                  "dark:border-slate-800 dark:hover:border-slate-700",
                )}
              >
                {/* Priority indicator */}
                <span
                  className={cn(
                    "absolute right-3 top-3 h-1.5 w-1.5 rounded-full",
                    pStyle.indicator,
                  )}
                />

                {/* Avatar */}
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-semibold text-white shadow-sm",
                    gradient,
                  )}
                >
                  {apt.initials}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {apt.patientName}
                    </p>
                    <span className="text-xs text-slate-400">({apt.age})</span>
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400">
                    <span>{apt.department}</span>
                    <span>•</span>
                    <span>{apt.time}</span>
                    <span>•</span>
                    <span>{apt.visitType}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-medium",
                        pStyle.badge,
                      )}
                    >
                      {apt.priority === "emergency"
                        ? "Emergency"
                        : apt.priority === "urgent"
                          ? "Urgent"
                          : "Normal"}
                    </span>
                    <Link
                      href={`/doctor/appointments/${apt.id}`}
                      className="text-[11px] font-medium text-dash-primary transition-colors hover:text-dash-primary-dark dark:text-accent dark:hover:text-accent"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </motion.div>
    </div>
  );
}
