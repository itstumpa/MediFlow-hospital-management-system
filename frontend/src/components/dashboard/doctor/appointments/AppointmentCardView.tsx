"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { AppointmentRecord } from "./appointments-mock-data";
import { priorityStyleMap, statusStyleMap } from "./appointments-mock-data";

interface AppointmentCardProps {
  appointments: AppointmentRecord[];
}

const initialsColors = [
  "from-dash-primary to-dash-primary-dark",
  "from-violet-500 to-purple-500",
  "from-emerald-500 to-teal-500",
  "from-rose-500 to-pink-500",
  "from-amber-500 to-orange-500",
];

export function AppointmentCardView({ appointments }: AppointmentCardProps) {
  if (appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white/50 py-16 dark:border-slate-700 dark:bg-slate-900/30">
        <Calendar className="mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          No appointments match your filters
        </p>
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
    >
      {appointments.map((apt, idx) => {
        const sStyle = statusStyleMap[apt.status];
        const pStyle = priorityStyleMap[apt.priority];
        const gradient = initialsColors[idx % initialsColors.length];
        const isPast =
          apt.status === "Completed" ||
          apt.status === "Cancelled" ||
          apt.status === "No Show";

        return (
          <motion.div
            key={apt.id}
            variants={staggerItem}
            whileHover={{
              y: -4,
              transition: { duration: 0.2 },
            }}
            className={cn(
              "group relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-4 transition-all duration-200",
              "hover:shadow-lg hover:shadow-slate-900/5",
              "dark:border-slate-700/40 dark:bg-slate-900/60",
              isPast && "opacity-70",
            )}
          >
            {/* Priority indicator line */}
            <div
              className={cn(
                "absolute inset-x-0 top-0 h-1",
                apt.priority === "Emergency"
                  ? "bg-gradient-to-r from-red-500 to-rose-500"
                  : apt.priority === "Urgent"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500"
                    : "bg-gradient-to-r from-dash-primary to-dash-primary-dark",
              )}
            />

            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-semibold text-white shadow-sm",
                    gradient,
                  )}
                >
                  {apt.patientInitials}
                </div>
                <div>
                  <Link
                    href={`/doctor/patients/${apt.patientId}`}
                    className="text-sm font-semibold text-slate-900 transition-colors hover:text-dash-primary dark:text-white dark:hover:text-accent"
                  >
                    {apt.patientName}
                  </Link>
                  <p className="text-xs text-slate-400">
                    {apt.age} yrs • {apt.gender}
                  </p>
                </div>
              </div>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                  sStyle.bg,
                  sStyle.text,
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", sStyle.dot)} />
                {sStyle.label}
              </span>
            </div>

            {/* Details */}
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                <span>
                  {apt.time} — {apt.endTime} ({apt.duration} min)
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                <span>
                  {apt.type} • {apt.department}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                {apt.reason}
              </p>
            </div>

            {/* Priority */}
            <div className="mt-3">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                  pStyle.badge,
                )}
              >
                <span
                  className={cn("h-1.5 w-1.5 rounded-full", pStyle.indicator)}
                />
                {apt.priority}
              </span>
            </div>

            {/* Actions */}
            <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
              <Link
                href={`/doctor/appointments/${apt.id}`}
                className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-center text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                Open
              </Link>
              {(apt.status === "Waiting" || apt.status === "Checked In") && (
                <button className="flex-1 rounded-lg bg-dash-primary px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-dash-primary-dark">
                  Start
                </button>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
