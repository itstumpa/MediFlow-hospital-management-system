"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { doctorsInfo, sortOptions, type FilterValues } from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface FilterBarProps {
  isOpen: boolean;
  filters: FilterValues;
  onChange: (filters: FilterValues) => void;
  onReset: () => void;
}

/* ─── Departments ───────────────────────────── */

const departments = Array.from(
  new Set(doctorsInfo.map((d) => d.department)),
).sort();

const availabilityOptions = [
  { value: "available", label: "Available" },
  { value: "busy", label: "Busy" },
  { value: "on-leave", label: "On Leave" },
  { value: "emergency-available", label: "Emergency Available" },
  { value: "offline", label: "Offline" },
];

/* ─── Helpers ───────────────────────────────── */

function hasActiveFilters(filters: FilterValues): boolean {
  return Object.entries(filters).some(
    ([key, value]) =>
      value !== "" &&
      key !== "sort" &&
      key !== "viewMode" &&
      value !== "available-first",
  );
}

/* ══════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════ */

export function FilterBar({
  isOpen,
  filters,
  onChange,
  onReset,
}: FilterBarProps) {
  const update = (key: keyof FilterValues, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const active = hasActiveFilters(filters);

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
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/50">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {/* Doctor */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Doctor
                </label>
                <select
                  value={filters.doctor}
                  onChange={(e) => update("doctor", e.target.value)}
                  className="h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-sm text-slate-700 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
                >
                  <option value="">All Doctors</option>
                  {doctorsInfo.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Department
                </label>
                <select
                  value={filters.department}
                  onChange={(e) => update("department", e.target.value)}
                  className="h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-sm text-slate-700 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Availability
                </label>
                <select
                  value={filters.availability}
                  onChange={(e) => update("availability", e.target.value)}
                  className="h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-sm text-slate-700 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
                >
                  <option value="">All Statuses</option>
                  {availabilityOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Date
                </label>
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => update("date", e.target.value)}
                  className="h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-sm text-slate-700 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
                />
              </div>

              {/* Location */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => update("location", e.target.value)}
                  className="h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-sm text-slate-700 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
                >
                  <option value="">All Locations</option>
                  <option value="main">Main Hospital</option>
                  <option value="east">East Wing</option>
                  <option value="west">West Wing</option>
                  <option value="outpatient">Outpatient Center</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Sort By
                </label>
                <select
                  value={filters.sort}
                  onChange={(e) => update("sort", e.target.value)}
                  className="h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-sm text-slate-700 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Actions */}
            {active && (
              <div className="mt-3 flex justify-end">
                <button
                  onClick={onReset}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
