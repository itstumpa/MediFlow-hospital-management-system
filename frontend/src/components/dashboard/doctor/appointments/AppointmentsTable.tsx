"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar, Clock, MoreHorizontal, Play, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { staggerTable, tableRowFade } from "../MotionVariants";
import type { AppointmentRecord } from "./appointments-mock-data";
import { priorityStyleMap, statusStyleMap } from "./appointments-mock-data";

interface AppointmentsTableProps {
  appointments: AppointmentRecord[];
}

/* ─── Row Action Dropdown ───────────────────────────────── */

function RowActions({ apt }: { apt: AppointmentRecord }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -4, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.96 }}
          transition={{ duration: 0.12 }}
          className="absolute right-0 z-50 mt-1 w-44 origin-top-right overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          <Link
            href={`/doctor/appointments/${apt.id}`}
            className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Calendar className="h-3.5 w-3.5" />
            Open Appointment
          </Link>
          {(apt.status === "Waiting" || apt.status === "Checked In") && (
            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">
              <Play className="h-3.5 w-3.5" />
              Start Consultation
            </button>
          )}
          {apt.status !== "Cancelled" && apt.status !== "Completed" && (
            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-amber-600 transition-colors hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/30">
              <Clock className="h-3.5 w-3.5" />
              Reschedule
            </button>
          )}
          {apt.status !== "Cancelled" && apt.status !== "Completed" && (
            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30">
              <XCircle className="h-3.5 w-3.5" />
              Cancel
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}

/* ─── Table ─────────────────────────────────────────────── */

export function AppointmentsTable({ appointments }: AppointmentsTableProps) {
  const initialsColors = [
    "from-cyan-500 to-blue-500",
    "from-violet-500 to-purple-500",
    "from-emerald-500 to-teal-500",
    "from-rose-500 to-pink-500",
    "from-amber-500 to-orange-500",
  ];

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
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-slate-200/60 bg-white",
        "dark:border-slate-700/40 dark:bg-slate-900/60",
      )}
    >
      <div className="overflow-x-auto">
        <motion.table
          variants={staggerTable}
          initial="hidden"
          animate="visible"
          className="w-full min-w-[900px]"
        >
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-left text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/30 dark:text-slate-500">
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Age / Gender</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Reason</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt, idx) => {
              const sStyle = statusStyleMap[apt.status];
              const pStyle = priorityStyleMap[apt.priority];
              const gradient = initialsColors[idx % initialsColors.length];
              const isPast =
                apt.status === "Completed" ||
                apt.status === "Cancelled" ||
                apt.status === "No Show";

              return (
                <motion.tr
                  key={apt.id}
                  variants={tableRowFade}
                  className={cn(
                    "group border-b border-slate-50 transition-colors last:border-0",
                    "hover:bg-slate-50 dark:border-slate-800/50 dark:hover:bg-slate-800/30",
                    isPast && "opacity-70",
                  )}
                >
                  {/* Time */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {apt.time}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {apt.duration} min
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Patient */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-semibold text-white shadow-sm",
                          gradient,
                        )}
                      >
                        {apt.patientInitials}
                      </div>
                      <div>
                        <Link
                          href={`/doctor/patients/${apt.patientId}`}
                          className="text-sm font-medium text-slate-900 transition-colors hover:text-cyan-600 dark:text-white dark:hover:text-cyan-400"
                        >
                          {apt.patientName}
                        </Link>
                        <p className="text-[10px] text-slate-400">
                          {apt.patientId}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Age / Gender */}
                  <td className="px-4 py-3.5 text-sm text-slate-600 dark:text-slate-400">
                    {apt.age} / {apt.gender}
                  </td>

                  {/* Type */}
                  <td className="px-4 py-3.5">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {apt.type}
                    </span>
                  </td>

                  {/* Reason */}
                  <td className="max-w-[200px] truncate px-4 py-3.5 text-sm text-slate-600 dark:text-slate-400">
                    {apt.reason}
                  </td>

                  {/* Priority */}
                  <td className="px-4 py-3.5">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
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
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
                        sStyle.bg,
                      )}
                    >
                      <span
                        className={cn("h-1.5 w-1.5 rounded-full", sStyle.dot)}
                      />
                      {sStyle.label}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5 text-right">
                    <RowActions apt={apt} />
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
}
