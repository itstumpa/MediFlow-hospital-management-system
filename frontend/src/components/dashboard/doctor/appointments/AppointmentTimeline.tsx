"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar, Clock, Play, User } from "lucide-react";
import Link from "next/link";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { AppointmentRecord } from "./appointments-mock-data";
import { priorityStyleMap, statusStyleMap } from "./appointments-mock-data";

interface AppointmentTimelineProps {
  appointments: AppointmentRecord[];
}

export function AppointmentTimeline({
  appointments,
}: AppointmentTimelineProps) {
  if (appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white/50 py-16 dark:border-slate-700 dark:bg-slate-900/30">
        <Clock className="mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          No appointments match your filters
        </p>
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  const initialsColors = [
    "from-cyan-500 to-blue-500",
    "from-violet-500 to-purple-500",
    "from-emerald-500 to-teal-500",
    "from-rose-500 to-pink-500",
    "from-amber-500 to-orange-500",
  ];

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/60 bg-white p-5",
        "dark:border-slate-700/40 dark:bg-slate-900/60",
      )}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {appointments.map((apt, idx) => {
          const sStyle = statusStyleMap[apt.status];
          const pStyle = priorityStyleMap[apt.priority];
          const gradient = initialsColors[idx % initialsColors.length];
          const isLast = idx === appointments.length - 1;

          return (
            <motion.div
              key={apt.id}
              variants={staggerItem}
              className="relative flex gap-4"
            >
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2",
                    apt.status === "Completed"
                      ? "border-emerald-400 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-900/30"
                      : apt.status === "Cancelled" || apt.status === "No Show"
                        ? "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20"
                        : apt.status === "In Consultation"
                          ? "border-indigo-400 bg-indigo-50 dark:border-indigo-600 dark:bg-indigo-900/30"
                          : "border-cyan-300 bg-cyan-50 dark:border-cyan-700 dark:bg-cyan-900/30",
                  )}
                >
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">
                    {apt.time.split(" ")[0]}
                  </span>
                </div>
                {!isLast && (
                  <div
                    className={cn(
                      "mt-1 h-full w-0.5",
                      apt.status === "Completed"
                        ? "bg-emerald-200 dark:bg-emerald-800"
                        : "bg-slate-200 dark:bg-slate-700",
                    )}
                  />
                )}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1 pb-6">
                <div className="flex flex-col gap-2 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm transition-all hover:border-slate-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-slate-700">
                  <div className="flex items-start justify-between gap-2">
                    {/* Patient info */}
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-sm font-semibold text-white shadow-sm",
                          gradient,
                        )}
                      >
                        {apt.patientInitials}
                      </div>
                      <div>
                        <Link
                          href={`/doctor/patients/${apt.patientId}`}
                          className="text-sm font-semibold text-slate-900 transition-colors hover:text-cyan-600 dark:text-white dark:hover:text-cyan-400"
                        >
                          {apt.patientName}
                        </Link>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400">
                          <span>
                            {apt.time} — {apt.endTime}
                          </span>
                          <span>•</span>
                          <span>{apt.duration} min</span>
                          <span>•</span>
                          <span>{apt.reason}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className="flex shrink-0 items-center gap-2">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium",
                          sStyle.bg,
                        )}
                      >
                        <span
                          className={cn("h-1.5 w-1.5 rounded-full", sStyle.dot)}
                        />
                        {sStyle.label}
                      </span>
                    </div>
                  </div>

                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                        pStyle.badge,
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          pStyle.indicator,
                        )}
                      />
                      {apt.priority}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {apt.department}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {apt.type}
                    </span>
                  </div>

                  {/* Quick actions */}
                  <div className="flex gap-2 border-t border-slate-100 pt-2 dark:border-slate-800">
                    <Link
                      href={`/doctor/appointments/${apt.id}`}
                      className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                    >
                      <Calendar className="h-3 w-3" />
                      Open
                    </Link>
                    {(apt.status === "Waiting" ||
                      apt.status === "Checked In") && (
                      <button className="inline-flex items-center gap-1 rounded-lg bg-cyan-500 px-2.5 py-1 text-[11px] font-medium text-white transition-colors hover:bg-cyan-600">
                        <Play className="h-3 w-3" />
                        Start
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
