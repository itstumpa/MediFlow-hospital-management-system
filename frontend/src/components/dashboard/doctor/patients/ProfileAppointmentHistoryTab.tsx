"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar, Eye, Stethoscope } from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { PatientProfile } from "./patient-profile-mock-data";

interface ProfileAppointmentHistoryTabProps {
  patient: PatientProfile;
}

export function ProfileAppointmentHistoryTab({
  patient,
}: ProfileAppointmentHistoryTabProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {patient.appointmentHistory.map((apt, idx) => (
        <motion.div
          key={apt.id}
          variants={staggerItem}
          className={cn(
            "flex items-start gap-3 rounded-xl border border-slate-200/60 bg-white p-3.5 transition-all hover:shadow-sm",
            "dark:border-slate-700/40 dark:bg-slate-900/60",
          )}
        >
          {/* Date column */}
          <div className="flex w-12 shrink-0 flex-col items-center">
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {new Date(apt.date).getDate()}
            </span>
            <span className="text-[9px] text-slate-400">
              {new Date(apt.date).toLocaleString("default", { month: "short" })}
            </span>
            <span className="text-[9px] text-slate-400">
              {new Date(apt.date).getFullYear()}
            </span>
          </div>

          {/* Vertical divider */}
          <div className="h-12 w-px bg-slate-200 dark:bg-slate-700" />

          {/* Details */}
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-medium text-slate-900 dark:text-white">
                  {apt.diagnosis}
                </p>
                <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Stethoscope className="h-3 w-3" />
                    {apt.doctor}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {apt.department}
                  </span>
                </div>
              </div>
              <StatusBadge status={apt.status} />
            </div>
          </div>

          {/* View button */}
          <button className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-medium text-dash-primary transition-colors hover:bg-dash-primary-light dark:text-accent dark:hover:bg-teal-950/30">
            <Eye className="h-3 w-3" />
            Details
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Completed:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
    Pending:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
    Cancelled:
      "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400",
    "No Show":
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  };
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
        colors[status] || "bg-slate-100 text-slate-600",
      )}
    >
      {status}
    </span>
  );
}
