"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, X } from "lucide-react";
import type { DepartmentFilters as DepartmentFiltersType } from "./types";
import {
  APPOINTMENT_VOLUME_RANGES,
  BUILDING_OPTIONS,
  DOCTOR_COUNT_RANGES,
  FLOOR_OPTIONS,
  PATIENT_COUNT_RANGES,
  STATUS_OPTIONS,
} from "./types";

interface DepartmentFiltersProps {
  filters: DepartmentFiltersType;
  onFiltersChange: (filters: DepartmentFiltersType) => void;
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
  options: readonly T[] | T[];
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
            className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 ${
              selected.includes(opt)
                ? "text-blue-700 dark:text-blue-300"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <div
              className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                selected.includes(opt)
                  ? "border-blue-600 bg-blue-600"
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

function RangeGroup({
  label,
  ranges,
  current,
  onChange,
}: {
  label: string;
  ranges: readonly { label: string; min: number; max: number }[];
  current: [number, number];
  onChange: (range: [number, number]) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <div className="grid grid-cols-2 gap-1">
        {ranges.map((r) => {
          const active = current[0] === r.min && current[1] === r.max;
          const defaultRange =
            r.min === ranges[0].min && r.max === ranges[ranges.length - 1].max;
          return (
            <button
              key={r.label}
              onClick={() =>
                onChange(
                  active
                    ? [ranges[0].min, ranges[ranges.length - 1].max]
                    : [r.min, r.max],
                )
              }
              className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                active
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
              }`}
            >
              {r.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function DepartmentFilters({
  filters,
  onFiltersChange,
  open,
  onClose,
}: DepartmentFiltersProps) {
  const handleReset = () => {
    onFiltersChange({
      ...filters,
      status: [],
      floor: [],
      building: [],
      doctorsRange: [0, 100],
      patientsRange: [0, 50000],
      appointmentVolume: [0, 10000],
    });
  };

  const activeCount =
    filters.status.length + filters.floor.length + filters.building.length;

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
          <div className="w-[280px]">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Filters
              </h3>
              <div className="flex items-center gap-1">
                {activeCount > 0 && (
                  <button
                    onClick={handleReset}
                    className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                    title="Reset filters"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              className="space-y-5 overflow-y-auto px-4 py-4"
              style={{ maxHeight: "calc(100vh - 300px)" }}
            >
              <CheckboxGroup
                label="Status"
                options={STATUS_OPTIONS}
                selected={filters.status}
                onChange={(val) => onFiltersChange({ ...filters, status: val })}
              />

              <CheckboxGroup
                label="Building"
                options={BUILDING_OPTIONS}
                selected={filters.building}
                onChange={(val) =>
                  onFiltersChange({ ...filters, building: val })
                }
              />

              <CheckboxGroup
                label="Floor"
                options={FLOOR_OPTIONS}
                selected={filters.floor}
                onChange={(val) => onFiltersChange({ ...filters, floor: val })}
              />

              <RangeGroup
                label="Doctors Count"
                ranges={DOCTOR_COUNT_RANGES}
                current={filters.doctorsRange}
                onChange={(range) =>
                  onFiltersChange({ ...filters, doctorsRange: range })
                }
              />

              <RangeGroup
                label="Patients Count"
                ranges={PATIENT_COUNT_RANGES}
                current={filters.patientsRange}
                onChange={(range) =>
                  onFiltersChange({ ...filters, patientsRange: range })
                }
              />

              <RangeGroup
                label="Appointment Volume"
                ranges={APPOINTMENT_VOLUME_RANGES}
                current={filters.appointmentVolume}
                onChange={(range) =>
                  onFiltersChange({ ...filters, appointmentVolume: range })
                }
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
