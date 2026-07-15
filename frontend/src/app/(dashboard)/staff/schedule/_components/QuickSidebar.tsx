"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle2,
  Stethoscope,
  UserPlus,
  X,
} from "lucide-react";
import {
  doctorStatusConfig,
  doctorsInfo,
  formatTime,
  getInitials,
  scheduleData,
  type DoctorInfo,
} from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface QuickSidebarProps {
  open: boolean;
  onClose: () => void;
  onAssignAppointment: (doctor?: DoctorInfo) => void;
  onViewSchedule: (doctor: DoctorInfo) => void;
}

/* ─── Today's events ────────────────────────── */

const todayEvents = scheduleData
  .flatMap((entry) =>
    entry.events.map((ev) => ({
      ...ev,
      doctorPhoto:
        doctorsInfo.find((d) => d.id === ev.doctorId)?.photoUrl ?? "",
    })),
  )
  .sort((a, b) => a.startTime.localeCompare(b.startTime))
  .slice(0, 8);

const nextAvailableSlot =
  doctorsInfo
    .filter(
      (d) => d.status === "available" || d.status === "emergency-available",
    )
    .sort(
      (a, b) =>
        (a.nextAvailable === "Now" ? 0 : 1) -
        (b.nextAvailable === "Now" ? 0 : 1),
    )[0] ?? null;

/* ══════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════ */

export function QuickSidebar({
  open,
  onClose,
  onAssignAppointment,
  onViewSchedule,
}: QuickSidebarProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Mobile backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-sm border-l border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900 lg:sticky lg:top-0 lg:z-0 lg:shadow-none"
          >
            <div className="flex h-full flex-col overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-700">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Quick Overview
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 space-y-5 p-4">
                {/* Next Available Slot */}
                {nextAvailableSlot && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/30">
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Next Available
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                        {nextAvailableSlot.photoUrl ? (
                          <img
                            src={nextAvailableSlot.photoUrl}
                            alt={nextAvailableSlot.name}
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center rounded-full bg-emerald-200 text-xs font-bold text-emerald-700">
                            {getInitials(nextAvailableSlot.name)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {nextAvailableSlot.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {nextAvailableSlot.department}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        {nextAvailableSlot.nextAvailable}
                      </span>
                    </div>
                  </div>
                )}

                {/* Doctor Status Summary */}
                <div>
                  <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <Stethoscope className="h-3.5 w-3.5" />
                    Doctor Status
                  </h3>
                  <div className="mt-3 space-y-1.5">
                    {doctorsInfo.slice(0, 6).map((doc) => {
                      const cfg =
                        doctorStatusConfig[doc.status] ??
                        doctorStatusConfig.offline;
                      return (
                        <button
                          key={doc.id}
                          onClick={() => onViewSchedule(doc)}
                          className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <span
                            className={`h-2 w-2 flex-shrink-0 rounded-full ${cfg.dot}`}
                          />
                          <span className="min-w-0 flex-1 truncate text-xs font-medium text-slate-700 dark:text-slate-300">
                            {doc.name}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${cfg.class}`}
                          >
                            {cfg.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Today's Schedule */}
                <div>
                  <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <Calendar className="h-3.5 w-3.5" />
                    Today&apos;s Schedule
                  </h3>
                  <div className="mt-3 space-y-2">
                    {todayEvents.length > 0 ? (
                      todayEvents.map((event) => (
                        <div
                          key={event.id}
                          className="flex items-start gap-2.5 rounded-lg border border-slate-100 p-2.5 dark:border-slate-700"
                        >
                          <div
                            className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full"
                            style={{ backgroundColor: event.color }}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                              {event.patientName ?? "Blocked"}
                            </p>
                            <p className="truncate text-[11px] text-slate-400">
                              {event.reason || event.doctorName}
                            </p>
                          </div>
                          <span className="flex-shrink-0 text-[11px] text-slate-400">
                            {formatTime(event.startTime)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400">
                        No appointments scheduled today.
                      </p>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <Bell className="h-3.5 w-3.5" />
                    Quick Actions
                  </h3>
                  <div className="mt-3 space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onAssignAppointment()}
                      className="flex w-full items-center gap-2.5 rounded-lg border border-slate-200 px-3 py-2.5 text-left text-xs font-medium text-slate-700 transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] dark:border-slate-700 dark:text-slate-300 dark:hover:border-[var(--color-primary)]"
                    >
                      <UserPlus className="h-4 w-4" />
                      Assign New Appointment
                      <ArrowRight className="ml-auto h-3.5 w-3.5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onViewSchedule(doctorsInfo[0])}
                      className="flex w-full items-center gap-2.5 rounded-lg border border-slate-200 px-3 py-2.5 text-left text-xs font-medium text-slate-700 transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] dark:border-slate-700 dark:text-slate-300 dark:hover:border-[var(--color-primary)]"
                    >
                      <Calendar className="h-4 w-4" />
                      View Full Schedule
                      <ArrowRight className="ml-auto h-3.5 w-3.5" />
                    </motion.button>
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
