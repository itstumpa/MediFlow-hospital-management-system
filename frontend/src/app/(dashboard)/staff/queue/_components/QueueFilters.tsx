"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import {
  appointmentTypeOptions,
  doctors,
  priorityOptions,
  sortOptions,
  statusOptions,
  type QueueFilterValues,
} from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface QueueFiltersProps {
  isOpen: boolean;
  filters: QueueFilterValues;
  onChange: (filters: QueueFilterValues) => void;
  onReset: () => void;
}

/* ─── Departments ───────────────────────────── */

const departments = Array.from(
  new Set(doctors.map((d) => d.department)),
).sort();

/* ══════════════════════════════════════════════
   QueueFilters
   ══════════════════════════════════════════════ */

export function QueueFilters({
  isOpen,
  filters,
  onChange,
  onReset,
}: QueueFiltersProps) {
  const set = (key: keyof QueueFilterValues, value: string) =>
    onChange({ ...filters, [key]: value });

  const hasActive = Object.entries(filters).some(
    ([key, value]) => value !== "" && key !== "sort" && value !== "queue-asc",
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden"
        >
          <div className="grid grid-cols-2 gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/50 sm:grid-cols-3 lg:grid-cols-6">
            {/* Doctor */}
            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Doctor
              </label>
              <select
                value={filters.doctor}
                onChange={(e) => set("doctor", e.target.value)}
                className="h-9 w-full rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <option value="">All Doctors</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.name}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Department
              </label>
              <select
                value={filters.department}
                onChange={(e) => set("department", e.target.value)}
                className="h-9 w-full rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => set("status", e.target.value)}
                className="h-9 w-full rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <option value="">All Statuses</option>
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Priority
              </label>
              <select
                value={filters.priority}
                onChange={(e) => set("priority", e.target.value)}
                className="h-9 w-full rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <option value="">All Priorities</option>
                {priorityOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Appointment Type */}
            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Appointment Type
              </label>
              <select
                value={filters.appointmentType}
                onChange={(e) => set("appointmentType", e.target.value)}
                className="h-9 w-full rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <option value="">All Types</option>
                {appointmentTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Sort By
              </label>
              <div className="flex gap-2">
                <select
                  value={filters.sort}
                  onChange={(e) => set("sort", e.target.value)}
                  className="h-9 flex-1 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {hasActive && (
                  <button
                    onClick={onReset}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600 dark:border-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
