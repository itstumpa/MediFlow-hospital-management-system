"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";
import { doctorSlots } from "../_mock-data";

/* ─── Status dot map ────────────────────────── */

const statusDot: Record<string, string> = {
  available: "bg-emerald-500",
  busy: "bg-blue-500",
  "on-break": "bg-amber-500",
  "off-duty": "bg-slate-400",
};

const statusLabel: Record<string, string> = {
  available: "Available",
  busy: "Busy",
  "on-break": "On Break",
  "off-duty": "Off Duty",
};

/* ─── Doctor Row ────────────────────────────── */

function DoctorRow({ doctor }: { doctor: (typeof doctorSlots)[0] }) {
  return (
    <motion.div
      variants={staggerItem}
      className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white/50 px-3 py-2.5 transition-colors hover:bg-slate-50 dark:border-slate-700/50 dark:bg-slate-800/30 dark:hover:bg-slate-800/50"
    >
      {/* Avatar */}
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
        style={{
          backgroundColor:
            doctor.color === "teal"
              ? "var(--color-primary)"
              : doctor.color === "blue"
                ? "#3b82f6"
                : doctor.color === "rose"
                  ? "#e11d48"
                  : doctor.color === "amber"
                    ? "#d97706"
                    : doctor.color === "violet"
                      ? "#7c3aed"
                      : "#10b981",
        }}
      >
        {doctor.initials}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-900 dark:text-white">
          {doctor.doctorName}
        </p>
        <p className="text-xs text-slate-400">
          {doctor.department} · {doctor.patientsSeen} seen
        </p>
      </div>

      <div className="shrink-0 text-right">
        <div className="flex items-center gap-1 text-xs">
          <span
            className={`h-1.5 w-1.5 rounded-full ${statusDot[doctor.status]}`}
          />
          <span className="text-slate-500 dark:text-slate-400">
            {statusLabel[doctor.status]}
          </span>
        </div>
        {doctor.availableSlots > 0 && (
          <p className="text-[10px] text-slate-400">
            {doctor.availableSlots} slot{doctor.availableSlots > 1 ? "s" : ""}{" "}
            left
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────── */

export function DoctorAvailabilityCard() {
  const availableCount = doctorSlots.filter(
    (d) => d.status === "available",
  ).length;

  return (
    <div className="dash-card">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <Stethoscope className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Doctor Availability
          </h3>
        </div>
        {availableCount > 0 && (
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            {availableCount} free
          </span>
        )}
      </div>

      <div className="p-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          {doctorSlots.map((doctor) => (
            <DoctorRow key={doctor.doctorName} doctor={doctor} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
