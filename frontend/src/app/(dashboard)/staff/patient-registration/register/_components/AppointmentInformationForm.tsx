"use client";

import { fadeUp } from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { AlertCircle, Clock, Heart, Stethoscope, User } from "lucide-react";
import {
  departments,
  doctorNames,
  timeSlots,
  visitTypes,
  type RegistrationFormData,
} from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface AppointmentInformationFormProps {
  data: RegistrationFormData;
  onChange: (field: keyof RegistrationFormData, value: string) => void;
  errors: Partial<Record<keyof RegistrationFormData, string>>;
}

/* ─── Priority buttons ──────────────────────── */

const priorities: { value: string; label: string; color: string }[] = [
  {
    value: "low",
    label: "Low",
    color: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  },
  {
    value: "normal",
    label: "Normal",
    color: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  },
  {
    value: "high",
    label: "High",
    color:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  },
  {
    value: "urgent",
    label: "Urgent",
    color: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
  },
];

/* ─── Component ─────────────────────────────── */

export function AppointmentInformationForm({
  data,
  onChange,
  errors,
}: AppointmentInformationFormProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Appointment Information
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Assign the patient to a doctor, department, and set visit details.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Doctor */}
        <div>
          <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
            <span className="text-red-500">*</span>
            <User className="h-3.5 w-3.5" />
            Doctor
          </label>
          <select
            value={data.doctor}
            onChange={(e) => onChange("doctor", e.target.value)}
            className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 dark:bg-slate-800 ${
              errors.doctor
                ? "border-red-300 focus:border-red-400 focus:ring-red-200"
                : "border-slate-200 hover:border-slate-300 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:text-slate-300"
            }`}
          >
            <option value="">Select Doctor</option>
            {doctorNames.map((doc) => (
              <option key={doc} value={doc}>
                {doc}
              </option>
            ))}
          </select>
          {errors.doctor && (
            <p className="mt-1 text-xs text-red-500">{errors.doctor}</p>
          )}
        </div>

        {/* Department */}
        <div>
          <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
            <span className="text-red-500">*</span>
            <Stethoscope className="h-3.5 w-3.5" />
            Department
          </label>
          <select
            value={data.department}
            onChange={(e) => onChange("department", e.target.value)}
            className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 dark:bg-slate-800 ${
              errors.department
                ? "border-red-300 focus:border-red-400 focus:ring-red-200"
                : "border-slate-200 hover:border-slate-300 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:text-slate-300"
            }`}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="mt-1 text-xs text-red-500">{errors.department}</p>
          )}
        </div>

        {/* Visit Type */}
        <div>
          <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
            <span className="text-red-500">*</span>
            <Heart className="h-3.5 w-3.5" />
            Appointment Type
          </label>
          <select
            value={data.visitType}
            onChange={(e) => onChange("visitType", e.target.value)}
            className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 dark:bg-slate-800 ${
              errors.visitType
                ? "border-red-300 focus:border-red-400 focus:ring-red-200"
                : "border-slate-200 hover:border-slate-300 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:text-slate-300"
            }`}
          >
            <option value="">Select Type</option>
            {visitTypes.map((vt) => (
              <option key={vt.value} value={vt.value}>
                {vt.label}
              </option>
            ))}
          </select>
          {errors.visitType && (
            <p className="mt-1 text-xs text-red-500">{errors.visitType}</p>
          )}
        </div>

        {/* Preferred Time */}
        <div>
          <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
            <Clock className="h-3.5 w-3.5" />
            Preferred Time
          </label>
          <select
            value={data.preferredTime}
            onChange={(e) => onChange("preferredTime", e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm transition-all hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <option value="">Select Time</option>
            {timeSlots.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Visit Reason */}
      <div>
        <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
          <span className="text-red-500">*</span>
          <AlertCircle className="h-3.5 w-3.5" />
          Visit Reason
        </label>
        <textarea
          value={data.visitReason}
          onChange={(e) => onChange("visitReason", e.target.value)}
          placeholder="Briefly describe the reason for the visit..."
          rows={2}
          className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 dark:bg-slate-800 ${
            errors.visitReason
              ? "border-red-300 focus:border-red-400 focus:ring-red-200"
              : "border-slate-200 hover:border-slate-300 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:text-slate-300"
          }`}
        />
        {errors.visitReason && (
          <p className="mt-1 text-xs text-red-500">{errors.visitReason}</p>
        )}
      </div>

      {/* Priority */}
      <div>
        <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
          Priority Level
        </label>
        <div className="flex flex-wrap gap-2">
          {priorities.map((p) => {
            const isActive = data.priority === p.value;
            return (
              <button
                key={p.value}
                type="button"
                onClick={() => onChange("priority", p.value)}
                className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? `${p.color} ring-2 ring-offset-1 ring-[var(--color-primary)] dark:ring-offset-slate-900`
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
