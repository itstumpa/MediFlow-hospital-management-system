"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, X } from "lucide-react";
import {
  departmentOptions,
  experienceRanges,
  specializationOptions,
} from "./mock";
import type {
  Availability,
  ConsultationType,
  DoctorFilters,
  DoctorStatus,
  Gender,
} from "./types";

interface DoctorFiltersProps {
  filters: DoctorFilters;
  onFiltersChange: (filters: DoctorFilters) => void;
  open: boolean;
  onClose: () => void;
}

const statusOptions: DoctorStatus[] = [
  "Active",
  "Inactive",
  "On Leave",
  "Vacation",
  "Emergency Duty",
];
const genderOptions: Gender[] = ["Male", "Female"];
const availabilityOptions: Availability[] = [
  "Available",
  "Busy",
  "Out of Office",
];
const consultationOptions: ConsultationType[] = ["Online", "Offline", "Both"];

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
            <span className="ml-auto text-[10px] text-slate-400">
              {opt === "Available" ? "â€”" : ""}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function DoctorFilters({
  filters,
  onFiltersChange,
  open,
  onClose,
}: DoctorFiltersProps) {
  const handleReset = () => {
    onFiltersChange({
      ...filters,
      department: [],
      specialization: [],
      status: [],
      gender: [],
      availability: [],
      consultationType: [],
      experience: [0, 50],
      rating: [0, 5],
    });
  };

  const activeCount =
    filters.department.length +
    filters.specialization.length +
    filters.status.length +
    filters.gender.length +
    filters.availability.length +
    filters.consultationType.length;

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
              {/* Department */}
              <CheckboxGroup
                label="Department"
                options={departmentOptions}
                selected={filters.department}
                onChange={(val) =>
                  onFiltersChange({ ...filters, department: val })
                }
              />

              {/* Specialization */}
              <CheckboxGroup
                label="Specialization"
                options={specializationOptions}
                selected={filters.specialization}
                onChange={(val) =>
                  onFiltersChange({ ...filters, specialization: val })
                }
              />

              {/* Status */}
              <CheckboxGroup
                label="Status"
                options={statusOptions}
                selected={filters.status}
                onChange={(val) => onFiltersChange({ ...filters, status: val })}
              />

              {/* Gender */}
              <CheckboxGroup
                label="Gender"
                options={genderOptions}
                selected={filters.gender}
                onChange={(val) => onFiltersChange({ ...filters, gender: val })}
              />

              {/* Availability */}
              <CheckboxGroup
                label="Availability"
                options={availabilityOptions}
                selected={filters.availability}
                onChange={(val) =>
                  onFiltersChange({ ...filters, availability: val })
                }
              />

              {/* Consultation Type */}
              <CheckboxGroup
                label="Consultation"
                options={consultationOptions}
                selected={filters.consultationType}
                onChange={(val) =>
                  onFiltersChange({ ...filters, consultationType: val })
                }
              />

              {/* Experience Range */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Experience
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {experienceRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() =>
                        onFiltersChange({
                          ...filters,
                          experience:
                            filters.experience[0] === range.min &&
                            filters.experience[1] === range.max
                              ? [0, 50]
                              : [range.min, range.max],
                        })
                      }
                      className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                        filters.experience[0] === range.min &&
                        filters.experience[1] === range.max
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

            {/* Active filters summary */}
            {activeCount > 0 && (
              <div className="border-t border-slate-200 px-4 py-3 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activeCount} filter{activeCount !== 1 ? "s" : ""} active
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
