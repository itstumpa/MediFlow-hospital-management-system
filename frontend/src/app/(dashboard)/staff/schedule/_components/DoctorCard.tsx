"use client";

import { staggerItem } from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MoreVertical,
  Stethoscope,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import {
  doctorStatusConfig,
  getInitials,
  type DoctorInfo,
} from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface DoctorCardProps {
  doctor: DoctorInfo;
  onViewSchedule: (doctor: DoctorInfo) => void;
  onAssignAppointment: (doctor: DoctorInfo) => void;
}

/* ─── Status badge ──────────────────────────── */

function StatusBadge({ status }: { status: DoctorInfo["status"] }) {
  const cfg = doctorStatusConfig[status] ?? doctorStatusConfig.offline;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.class}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

/* ══════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════ */

export function DoctorCard({
  doctor,
  onViewSchedule,
  onAssignAppointment,
}: DoctorCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const bookedPercent =
    doctor.totalSlots > 0
      ? Math.round((doctor.bookedSlots / doctor.totalSlots) * 100)
      : 0;

  return (
    <motion.div
      variants={staggerItem}
      className="dash-card dash-card-hover relative overflow-hidden"
    >
      {/* Top accent bar */}
      <div
        className={`absolute inset-x-0 top-0 h-1 ${
          doctor.status === "available"
            ? "bg-emerald-500"
            : doctor.status === "busy"
              ? "bg-amber-500"
              : doctor.status === "on-leave"
                ? "bg-red-500"
                : doctor.status === "emergency-available"
                  ? "bg-violet-500"
                  : "bg-slate-400"
        }`}
      />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
              {doctor.photoUrl ? (
                <img
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-sm font-bold text-[var(--color-primary)]">
                  {getInitials(doctor.name)}
                </div>
              )}
              {/* Status dot */}
              <span
                className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${
                  doctorStatusConfig[doctor.status]?.dot ?? "bg-slate-400"
                }`}
              />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                {doctor.name}
              </h3>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Stethoscope className="h-3 w-3" />
                <span>{doctor.department}</span>
              </div>
            </div>
          </div>

          {/* Menu button */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 z-20 mt-1 w-44 rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onViewSchedule(doctor);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    View Schedule
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onAssignAppointment(doctor);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    Assign Appointment
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Info grid */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/50">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="h-3 w-3" />
              Working Hours
            </div>
            <p className="mt-0.5 text-xs font-medium text-slate-700 dark:text-slate-300">
              {doctor.workingHours}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/50">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Calendar className="h-3 w-3" />
              Next Available
            </div>
            <p className="mt-0.5 text-xs font-medium text-slate-700 dark:text-slate-300">
              {doctor.nextAvailable ?? "N/A"}
            </p>
          </div>
        </div>

        {/* Status & Appointments */}
        <div className="mt-3 flex items-center justify-between">
          <StatusBadge status={doctor.status} />
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {doctor.todayAppointments} today
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">
              Slot utilization
            </span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {doctor.bookedSlots}/{doctor.totalSlots}
            </span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${bookedPercent}%` }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className={`h-full rounded-full ${
                bookedPercent > 80
                  ? "bg-red-500"
                  : bookedPercent > 50
                    ? "bg-amber-500"
                    : "bg-emerald-500"
              }`}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewSchedule(doctor)}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <Calendar className="h-3.5 w-3.5" />
            View Schedule
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAssignAppointment(doctor)}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-[var(--color-primary)]/90"
          >
            <UserPlus className="h-3.5 w-3.5" />
            Assign
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
