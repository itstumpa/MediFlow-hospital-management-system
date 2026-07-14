"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { doctorAvailability, type DoctorStatus } from "../_mock-data";

/* ─── Status Config ─────────────────────────── */

const statusConfig: Record<
  DoctorStatus,
  { label: string; dot: string; bg: string }
> = {
  available: {
    label: "Available",
    dot: "bg-emerald-500",
    bg: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  busy: {
    label: "Busy",
    dot: "bg-rose-500",
    bg: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
  },
  "on-break": {
    label: "On Break",
    dot: "bg-amber-500",
    bg: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  },
  away: {
    label: "Away",
    dot: "bg-slate-400",
    bg: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  },
  "off-duty": {
    label: "Off Duty",
    dot: "bg-slate-300",
    bg: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-500",
  },
};

const barColorMap: Record<string, string> = {
  emerald: "bg-emerald-500",
  rose: "bg-rose-500",
  amber: "bg-amber-500",
  blue: "bg-blue-500",
};

/* ─── Doctor Card ───────────────────────────── */

function DoctorCard({
  doctor,
}: {
  doctor: (typeof doctorAvailability)[number];
}) {
  const config = statusConfig[doctor.status];

  return (
    <motion.div
      variants={staggerItem}
      className="dash-card dash-card-hover flex items-start gap-4 p-4"
    >
      {/* Avatar */}
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white",
          doctor.color === "emerald" && "bg-emerald-500",
          doctor.color === "rose" && "bg-rose-500",
          doctor.color === "amber" && "bg-amber-500",
          doctor.color === "blue" && "bg-blue-500",
        )}
      >
        {doctor.initials}
      </span>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
            {doctor.name}
          </h4>
          <span className={cn("flex h-2 w-2 rounded-full", config.dot)} />
        </div>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          {doctor.department}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-0.5 font-medium",
              config.bg,
            )}
          >
            {config.label}
          </span>
          <span className="text-slate-500 dark:text-slate-400">
            Next: {doctor.nextSlot}
          </span>
        </div>

        {/* Queue bar */}
        {doctor.patientsInQueue > 0 && (
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  barColorMap[doctor.color] || "bg-slate-500",
                )}
                style={{
                  width: `${Math.min((doctor.patientsInQueue / 5) * 100, 100)}%`,
                }}
              />
            </div>
            <span className="text-[10px] text-slate-400">
              {doctor.patientsInQueue} in queue
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Doctor Availability Grid ──────────────── */

export function DoctorAvailability() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
        Doctor Availability
      </h2>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-3 sm:grid-cols-2"
      >
        {doctorAvailability.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </motion.div>
    </section>
  );
}
