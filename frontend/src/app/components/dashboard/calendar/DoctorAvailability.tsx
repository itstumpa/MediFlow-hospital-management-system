"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { DoctorAvailability as DoctorAvailabilityType } from "@/lib/data/appointment-calendar";
import { Stethoscope, Clock } from "lucide-react";

interface DoctorAvailabilityProps {
  doctors: DoctorAvailabilityType[];
}

export function DoctorAvailability({ doctors }: DoctorAvailabilityProps) {
  const available = doctors.filter((d) => d.isAvailable);
  const unavailable = doctors.filter((d) => !d.isAvailable);

  return (
    <div className="dash-card p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
        Doctor Availability
      </h3>
      <div className="space-y-1.5">
        {available.map((doc, idx) => (
          <motion.div
            key={doc.doctorId}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.03 }}
            className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
          >
            {/* Avatar */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              {doc.doctorInitials}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                  {doc.doctorName}
                </p>
                <span className="flex h-2 w-2 shrink-0 rounded-full bg-emerald-500">
                  <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
                </span>
              </div>
              <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                {doc.department}
                {doc.nextSlot && ` · Next: ${doc.nextSlot}`}
              </p>
            </div>
          </motion.div>
        ))}

        {unavailable.length > 0 && (
          <>
            <div className="my-2 border-t border-dash-border pt-2 dark:border-slate-700">
              <p className="mb-1.5 px-2.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                Unavailable
              </p>
            </div>
            {unavailable.map((doc, idx) => (
              <motion.div
                key={doc.doctorId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.02 }}
                className="flex items-center gap-3 rounded-xl p-2.5 opacity-60"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                  {doc.doctorInitials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-600 dark:text-slate-400">
                    {doc.doctorName}
                  </p>
                  <p className="truncate text-[11px] text-slate-400 dark:text-slate-500">
                    {doc.department} · Unavailable
                  </p>
                </div>
              </motion.div>
            ))}
          </>
        )}

        {doctors.length === 0 && (
          <div className="flex flex-col items-center justify-center py-6 text-slate-400 dark:text-slate-500">
            <Stethoscope className="mb-2 h-8 w-8 opacity-40" />
            <p className="text-xs font-medium">No availability data</p>
          </div>
        )}
      </div>
    </div>
  );
}
