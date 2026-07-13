"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, X } from "lucide-react";
import {
  ageRanges,
  bloodGroupOptions,
  departmentOptions,
  doctorOptions,
  genderOptions,
  insuranceOptions,
  statusOptions,
} from "./mock";
import type { PatientFilters } from "./types";

interface PatientFiltersProps {
  filters: PatientFilters;
  onFiltersChange: (filters: PatientFilters) => void;
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
            className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 ${
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

export function PatientFilters({
  filters,
  onFiltersChange,
  open,
  onClose,
}: PatientFiltersProps) {
  const handleReset = () => {
    onFiltersChange({
      ...filters,
      department: [],
      doctor: [],
      bloodGroup: [],
      gender: [],
      insurance: [],
      status: [],
      appointmentStatus: [],
      ageRange: [0, 120],
    });
  };

  const activeCount =
    filters.department.length +
    filters.doctor.length +
    filters.bloodGroup.length +
    filters.gender.length +
    filters.insurance.length +
    filters.status.length;

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
                label="Blood Group"
                options={bloodGroupOptions}
                selected={filters.bloodGroup}
                onChange={(val) =>
                  onFiltersChange({ ...filters, bloodGroup: val })
                }
              />

              <CheckboxGroup
                label="Gender"
                options={genderOptions}
                selected={filters.gender}
                onChange={(val) => onFiltersChange({ ...filters, gender: val })}
              />

              <CheckboxGroup
                label="Insurance"
                options={insuranceOptions}
                selected={filters.insurance}
                onChange={(val) =>
                  onFiltersChange({ ...filters, insurance: val })
                }
              />

              <CheckboxGroup
                label="Status"
                options={statusOptions}
                selected={filters.status}
                onChange={(val) => onFiltersChange({ ...filters, status: val })}
              />

              {/* Age Range */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Age
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {ageRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() =>
                        onFiltersChange({
                          ...filters,
                          ageRange:
                            filters.ageRange[0] === range.min &&
                            filters.ageRange[1] === range.max
                              ? [0, 120]
                              : [range.min, range.max],
                        })
                      }
                      className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                        filters.ageRange[0] === range.min &&
                        filters.ageRange[1] === range.max
                          ? "bg-dash-primary-light text-dash-primary dark:bg-teal-900/40 dark:text-accent"
                          : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
