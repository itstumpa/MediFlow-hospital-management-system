"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  FileText,
  Hospital,
  Shield,
  User,
} from "lucide-react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { departments, doctors, timeSlots, type BookingFormData } from "./types";

export function AppointmentSummary() {
  const { watch } = useFormContext<BookingFormData>();
  const formData = watch();

  const doctor = useMemo(
    () => doctors.find((d) => d.id === formData.doctor),
    [formData.doctor],
  );
  const department = useMemo(
    () => departments.find((d) => d.id === formData.department),
    [formData.department],
  );
  const slot = useMemo(
    () => timeSlots.find((t) => t.id === formData.timeSlot),
    [formData.timeSlot],
  );

  const hasAnyData =
    formData.department ||
    formData.doctor ||
    formData.date ||
    formData.timeSlot;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }}
      className="sticky top-24 space-y-4"
    >
      {/* Clinic info card */}
      <div className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 dark:bg-teal-950/40">
            <Hospital className="h-5 w-5 text-[var(--color-primary)] dark:text-[var(--color-accent)]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              MediFlow Medical Center
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              123 Health Avenue, Suite 200
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
          <Shield className="h-3 w-3" />
          <span>Licensed & Accredited</span>
        </div>
      </div>

      {/* Live selection summary */}
      {hasAnyData && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60"
        >
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Appointment Summary
          </h4>

          <div className="space-y-3">
            {/* Department */}
            {department && (
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
                  <department.icon className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                    Department
                  </p>
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {department.name}
                  </p>
                </div>
              </div>
            )}

            {/* Doctor */}
            {doctor && (
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-[10px] font-bold text-white">
                  {doctor.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                    Doctor
                  </p>
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {doctor.name}
                  </p>
                </div>
              </div>
            )}

            {/* Date */}
            {formData.date && (
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
                  <CalendarDays className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                    Date
                  </p>
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {format(formData.date, "EEE, MMM d, yyyy")}
                  </p>
                </div>
              </div>
            )}

            {/* Time */}
            {slot && (
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
                  <Clock className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                    Time
                  </p>
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {slot.time}
                  </p>
                </div>
              </div>
            )}

            {/* Consultation type */}
            {formData.consultationType && (
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
                  <User className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                    Type
                  </p>
                  <p className="truncate text-sm font-semibold capitalize text-slate-900 dark:text-white">
                    {formData.consultationType.replace("-", " ")}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Fee estimate */}
          {doctor && (
            <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-700/40">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Estimated cost
                </span>
                <span className="font-bold text-[var(--color-primary)] dark:text-[var(--color-accent)]">
                  ${doctor.fee + 30}
                </span>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Empty state */}
      {!hasAnyData && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/50 p-6 text-center dark:border-slate-700 dark:bg-slate-800/30">
          <FileText className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600" />
          <p className="mt-2 text-sm font-medium text-slate-400 dark:text-slate-500">
            No selections yet
          </p>
          <p className="text-xs text-slate-300 dark:text-slate-600">
            Your appointment summary will appear here
          </p>
        </div>
      )}

      {/* Help text */}
      <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/40">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold">Need help?</span> Call us at{" "}
          <span className="font-medium text-[var(--color-primary)] dark:text-[var(--color-accent)]">
            (555) 123-4567
          </span>
        </p>
      </div>
    </motion.div>
  );
}
