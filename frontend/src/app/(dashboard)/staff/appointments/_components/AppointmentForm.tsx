"use client";

import { Button } from "@/app/components/dashboard/Button";
import { fadeInBackdrop } from "@/components/dashboard/staff/MotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, X } from "lucide-react";
import { useState } from "react";
import {
  departments,
  doctors,
  visitTypes,
  type VisitType,
} from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface AppointmentFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: FormData) => void;
}

export interface FormData {
  patientName: string;
  patientId: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  type: VisitType;
  reason: string;
  priority: string;
  notes: string;
}

/* ─── Input sub-components ──────────────────── */

function Input({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition-colors hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600"
      />
    </div>
  );
}

function Select({
  label,
  options,
  ...props
}: {
  label: string;
  options: { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
        {label}
      </label>
      <select
        {...props}
        className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition-colors hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextArea({
  label,
  ...props
}: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
        {label}
      </label>
      <textarea
        {...props}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition-colors hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600"
      />
    </div>
  );
}

/* ─── Main Component ────────────────────────── */

export function AppointmentForm({ open, onClose }: AppointmentFormProps) {
  const [formData, setFormData] = useState<FormData>({
    patientName: "",
    patientId: "",
    doctor: "Dr. Sarah Chen",
    department: "General Medicine",
    date: "",
    time: "09:00",
    type: "general-checkup",
    reason: "",
    priority: "normal",
    notes: "",
  });

  const update = (field: keyof FormData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, would call API
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            {...fadeInBackdrop}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-lg border-l border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <CalendarPlus className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    New Appointment
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Schedule a patient appointment
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 overflow-y-auto p-6"
              style={{ maxHeight: "calc(100vh - 80px)" }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Patient Name"
                  placeholder="Enter patient name"
                  value={formData.patientName}
                  onChange={(e) => update("patientName", e.target.value)}
                  required
                />
                <Input
                  label="Patient ID"
                  placeholder="Auto-generated"
                  value={formData.patientId}
                  onChange={(e) => update("patientId", e.target.value)}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Select
                  label="Doctor"
                  value={formData.doctor}
                  onChange={(e) => {
                    update("doctor", e.target.value);
                    // Auto-select department
                    const doctorDept: Record<string, string> = {
                      "Dr. Sarah Chen": "General Medicine",
                      "Dr. James Wilson": "Cardiology",
                      "Dr. Emily Martinez": "Pediatrics",
                      "Dr. Robert Kim": "Orthopedics",
                      "Dr. David Park": "Neurology",
                      "Dr. Lisa Anderson": "Dermatology",
                      "Dr. Michael Thompson": "Ophthalmology",
                    };
                    update(
                      "department",
                      doctorDept[e.target.value] ?? "General Medicine",
                    );
                  }}
                  options={doctors
                    .filter((d) => d !== "All Doctors")
                    .map((d) => ({ value: d, label: d }))}
                />
                <Select
                  label="Department"
                  value={formData.department}
                  onChange={(e) => update("department", e.target.value)}
                  options={departments
                    .filter((d) => d !== "All Departments")
                    .map((d) => ({ value: d, label: d }))}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => update("date", e.target.value)}
                  required
                />
                <Input
                  label="Time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => update("time", e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Select
                  label="Visit Type"
                  value={formData.type}
                  onChange={(e) => update("type", e.target.value)}
                  options={visitTypes
                    .filter((t) => t.value !== "all")
                    .map((t) => ({ value: t.value, label: t.label }))}
                />
                <Select
                  label="Priority"
                  value={formData.priority}
                  onChange={(e) => update("priority", e.target.value)}
                  options={[
                    { value: "low", label: "Low" },
                    { value: "normal", label: "Normal" },
                    { value: "high", label: "High" },
                    { value: "urgent", label: "Urgent" },
                  ]}
                />
              </div>

              <TextArea
                label="Reason for Visit"
                placeholder="Brief description..."
                value={formData.reason}
                onChange={(e) => update("reason", e.target.value)}
                rows={2}
              />

              <TextArea
                label="Additional Notes"
                placeholder="Any special instructions..."
                value={formData.notes}
                onChange={(e) => update("notes", e.target.value)}
                rows={2}
              />

              <div className="flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                <Button variant="primary" type="submit">
                  <CalendarPlus className="h-4 w-4" />
                  Create Appointment
                </Button>
                <Button variant="ghost" type="button" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
