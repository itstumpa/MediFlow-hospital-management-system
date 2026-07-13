"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, X } from "lucide-react";
import {
  consultationTypeOptions,
  departmentOptions,
  doctorOptions,
  paymentStatusOptions,
  statusOptions,
} from "./mock";
import type { AppointmentFilters } from "./types";

interface AppointmentFiltersPanelProps {
  filters: AppointmentFilters;
  onFiltersChange: (filters: AppointmentFilters) => void;
  open: boolean;
  onClose: () => void;
}

function CheckboxGroup<T extends string>({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: readonly T[];
  selected: T[];
  onChange: (val: T[]) => void;
}) {
  const toggle = (val: T) => {
    if (selected.includes(val)) {
      onChange(selected.filter((s) => s !== val));
    } else {
      onChange([...selected, val]);
    }
  };

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <div className="space-y-1">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => toggle(opt)}
            className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 ${
              selected.includes(opt)
                ? "text-dash-primary dark:text-accent"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <div
              className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                selected.includes(opt)
                  ? "border-dash-primary bg-dash-primary"
                  : "border-slate-300 dark:border-slate-600"
              }`}
            >
              {selected.includes(opt) && (
                <svg
                  className="h-3 w-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AppointmentFilters({
  filters,
  onFiltersChange,
  open,
  onClose,
}: AppointmentFiltersPanelProps) {
  const handleReset = () => {
    onFiltersChange({
      ...filters,
      department: [],
      doctor: [],
      status: [],
      consultationType: [],
      paymentStatus: [],
      dateRange: ["", ""],
      timeRange: ["", ""],
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden border-r border-slate-200 dark:border-slate-700"
        >
          <div
            className="w-[280px] shrink-0 space-y-5 p-5"
            style={{ maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Filters
              </h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
                  title="Reset filters"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
                  title="Close filters"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <CheckboxGroup
              label="Department"
              options={departmentOptions}
              selected={filters.department}
              onChange={(val) =>
                onFiltersChange({ ...filters, department: val })
              }
            />

            <CheckboxGroup
              label="Doctor"
              options={doctorOptions}
              selected={filters.doctor}
              onChange={(val) => onFiltersChange({ ...filters, doctor: val })}
            />

            <CheckboxGroup
              label="Status"
              options={statusOptions}
              selected={filters.status}
              onChange={(val) => onFiltersChange({ ...filters, status: val })}
            />

            <CheckboxGroup
              label="Consultation Type"
              options={consultationTypeOptions}
              selected={filters.consultationType}
              onChange={(val) =>
                onFiltersChange({ ...filters, consultationType: val })
              }
            />

            <CheckboxGroup
              label="Payment Status"
              options={paymentStatusOptions}
              selected={filters.paymentStatus}
              onChange={(val) =>
                onFiltersChange({ ...filters, paymentStatus: val })
              }
            />

            {/* Date Range */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Date Range
              </p>
              <div className="space-y-2">
                <input
                  type="date"
                  value={filters.dateRange[0]}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      dateRange: [e.target.value, filters.dateRange[1]],
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 transition-colors focus:border-dash-primary focus:outline-none focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  aria-label="Start date"
                />
                <input
                  type="date"
                  value={filters.dateRange[1]}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      dateRange: [filters.dateRange[0], e.target.value],
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 transition-colors focus:border-dash-primary focus:outline-none focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  aria-label="End date"
                />
              </div>
            </div>

            {/* Time Range */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Time Range
              </p>
              <div className="space-y-2">
                <input
                  type="time"
                  value={filters.timeRange[0]}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      timeRange: [e.target.value, filters.timeRange[1]],
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 transition-colors focus:border-dash-primary focus:outline-none focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  aria-label="Start time"
                />
                <input
                  type="time"
                  value={filters.timeRange[1]}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      timeRange: [filters.timeRange[0], e.target.value],
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 transition-colors focus:border-dash-primary focus:outline-none focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  aria-label="End time"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
