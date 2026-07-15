"use client";

import {
  fadeInBackdrop,
  slideRight,
} from "@/components/dashboard/staff/MotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Plus,
  Stethoscope,
  Timer,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { doctorAvailability, queueEntries } from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface QueueSidebarProps {
  open: boolean;
  onClose: () => void;
  onAssignAppointment: () => void;
  onViewSchedule: () => void;
}

/* ─── Doctor status config ──────────────────── */

const docStatusConfig: Record<
  string,
  { label: string; dot: string; bg: string }
> = {
  available: {
    label: "Available",
    dot: "bg-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  busy: {
    label: "Busy",
    dot: "bg-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  break: {
    label: "On Break",
    dot: "bg-slate-400",
    bg: "bg-slate-50 dark:bg-slate-800/50",
  },
};

/* ══════════════════════════════════════════════
   QueueSidebar
   ══════════════════════════════════════════════ */

export function QueueSidebar({
  open,
  onClose,
  onAssignAppointment,
  onViewSchedule,
}: QueueSidebarProps) {
  // Stats
  const totalWaiting = queueEntries.filter(
    (e) => e.status === "waiting",
  ).length;
  const inConsultation = queueEntries.filter(
    (e) => e.status === "in-consultation",
  ).length;
  const completed = queueEntries.filter((e) => e.status === "completed").length;
  const availableDoctors = doctorAvailability.filter(
    (d) => d.status === "available",
  ).length;

  const waitingTimes = queueEntries
    .filter((e) => e.status === "waiting")
    .map((e) => e.waitingMinutes);
  const avgWait =
    waitingTimes.length > 0
      ? Math.round(
          waitingTimes.reduce((a, b) => a + b, 0) / waitingTimes.length,
        )
      : 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Mobile backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
            variants={fadeInBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            variants={slideRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 z-50 h-full w-80 border-l border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800 lg:sticky lg:top-0 lg:z-auto lg:h-auto lg:w-80 lg:border lg:rounded-xl lg:shadow-none"
          >
            <div className="flex h-full flex-col lg:h-auto">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-700">
                <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Queue Summary
                </h2>
                <button
                  onClick={onClose}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300 lg:hidden"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 space-y-5 overflow-y-auto p-4">
                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      label: "Waiting",
                      value: totalWaiting,
                      color: "text-slate-600 dark:text-slate-300",
                    },
                    {
                      label: "In Consultation",
                      value: inConsultation,
                      color: "text-blue-600 dark:text-blue-400",
                    },
                    {
                      label: "Completed",
                      value: completed,
                      color: "text-emerald-600 dark:text-emerald-400",
                    },
                    {
                      label: "Avg Wait",
                      value: `${avgWait}m`,
                      color: "text-amber-600 dark:text-amber-400",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border border-slate-100 bg-slate-50/50 p-3 text-center dark:border-slate-700 dark:bg-slate-800/50"
                    >
                      <p className={`text-lg font-bold ${stat.color}`}>
                        {stat.value}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Doctor Availability */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Stethoscope className="h-3.5 w-3.5 text-slate-400" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Doctor Availability
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {doctorAvailability.slice(0, 6).map((doc) => {
                      const cfg =
                        docStatusConfig[doc.status] ?? docStatusConfig.break;
                      return (
                        <div
                          key={doc.name}
                          className={`flex items-center justify-between rounded-md px-2.5 py-1.5 ${cfg.bg}`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${cfg.dot}`}
                            />
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                              {doc.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            {doc.status === "available" ? (
                              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                {doc.patients} waiting
                              </span>
                            ) : (
                              <span className="text-slate-400">
                                {cfg.label}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="mt-1.5 text-[10px] text-slate-400 dark:text-slate-500">
                    {availableDoctors} doctors available
                  </p>
                </div>

                {/* Estimated wait */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Timer className="h-3.5 w-3.5 text-slate-400" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Estimated Wait Time
                    </h3>
                  </div>
                  <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3 dark:border-slate-700 dark:bg-slate-800/50">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                        {avgWait}
                      </span>
                      <span className="text-sm text-slate-400">minutes</span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      Average for waiting patients
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Plus className="h-3.5 w-3.5 text-slate-400" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Quick Actions
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={onAssignAppointment}
                      className="flex w-full items-center gap-2.5 rounded-lg border border-slate-200 px-3 py-2.5 text-left text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      <UserPlus className="h-4 w-4 text-[var(--color-primary)]" />
                      Register Walk-in Patient
                    </button>
                    <button
                      onClick={onViewSchedule}
                      className="flex w-full items-center gap-2.5 rounded-lg border border-slate-200 px-3 py-2.5 text-left text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      <Calendar className="h-4 w-4 text-[var(--color-primary)]" />
                      View Doctor Schedule
                    </button>
                    <button
                      onClick={() => {}}
                      className="flex w-full items-center gap-2.5 rounded-lg border border-slate-200 px-3 py-2.5 text-left text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      <Users className="h-4 w-4 text-[var(--color-primary)]" />
                      View All Staff
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
