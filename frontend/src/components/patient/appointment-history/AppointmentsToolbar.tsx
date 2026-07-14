"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { AppointmentStatus, FilterState, ViewMode } from "./types";
import { allDepartments } from "./types";

type StatusOption = { value: AppointmentStatus | ""; label: string };

const statusOptions: StatusOption[] = [
  { value: "", label: "All Statuses" },
  { value: "upcoming", label: "Upcoming" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "rescheduled", label: "Rescheduled" },
  { value: "no-show", label: "No Show" },
];

const sortOptions = [
  { value: "date-desc", label: "Newest First" },
  { value: "date-asc", label: "Oldest First" },
  { value: "doctor", label: "Doctor A-Z" },
  { value: "status", label: "Status" },
] as const;

const consultTypeOptions = [
  { value: "In-Person", label: "In-Person" },
  { value: "Video", label: "Video" },
  { value: "Phone", label: "Phone" },
];

interface AppointmentsToolbarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onReset: () => void;
  className?: string;
}

function Select({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly { value: string; label: string }[];
  label: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-9 text-sm text-slate-700 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-[var(--color-accent)] dark:focus:ring-[var(--color-accent)]/20"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

export function AppointmentsToolbar({
  filters,
  onFilterChange,
  viewMode,
  onViewModeChange,
  onReset,
  className,
}: AppointmentsToolbarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  /* Sticky detection */
  useEffect(() => {
    const el = toolbarRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(entry.intersectionRatio < 1);
      },
      { threshold: [1] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters =
    filters.search ||
    filters.status.length > 0 ||
    filters.department.length > 0 ||
    filters.consultationType.length > 0;

  return (
    <motion.div
      variants={staggerItem}
      ref={toolbarRef}
      className={cn(
        "sticky top-0 z-20 -mx-6 px-6 py-4 transition-all duration-300",
        isSticky &&
          "bg-white/90 shadow-sm backdrop-blur-xl dark:bg-slate-900/90 dark:shadow-slate-800/50",
        className,
      )}
    >
      {/* Primary row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search doctor, department, or ID..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => updateFilter("search", "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Filter toggle */}
          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className={cn(
              "flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all",
              showFilters || hasActiveFilters
                ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] dark:border-[var(--color-accent)] dark:text-[var(--color-accent)]"
                : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800",
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-bold text-white dark:bg-[var(--color-accent)] dark:text-slate-900">
                {
                  [
                    filters.status.length,
                    filters.department.length,
                    filters.consultationType.length,
                    filters.search ? 1 : 0,
                  ].filter(Boolean).length
                }
              </span>
            )}
          </button>

          {/* Sort */}
          <Select
            value={filters.sort}
            onChange={(v) => updateFilter("sort", v)}
            options={sortOptions}
            label="Sort"
          />

          {/* View toggle */}
          <div className="flex rounded-xl border border-slate-200 bg-white p-0.5 dark:border-slate-700 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => onViewModeChange("table")}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-all",
                viewMode === "table"
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
              )}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("cards")}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-all",
                viewMode === "cards"
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
              )}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3.75h3v3h-3v-3zm7.5 0h3v3h-3v-3zm-7.5 7.5h3v3h-3v-3zm7.5 0h3v3h-3v-3zm-7.5 7.5h3v3h-3v-3zm7.5 0h3v3h-3v-3z"
                />
              </svg>
            </button>
          </div>

          {/* Reset */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400"
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Expandable filters panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex flex-wrap items-end gap-4">
              {/* Status multi-select */}
              <div className="flex-1 min-w-[160px]">
                <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Status
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {statusOptions
                    .filter((s) => s.value !== "")
                    .map((opt) => {
                      const selected = filters.status.includes(
                        opt.value as AppointmentStatus,
                      );
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            const next = selected
                              ? filters.status.filter((s) => s !== opt.value)
                              : [
                                  ...filters.status,
                                  opt.value as AppointmentStatus,
                                ];
                            updateFilter("status", next);
                          }}
                          className={cn(
                            "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                            selected
                              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] dark:border-[var(--color-accent)] dark:text-[var(--color-accent)]"
                              : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800",
                          )}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Department */}
              <div className="w-full sm:w-[180px]">
                <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Department
                </label>
                <Select
                  value={
                    filters.department.length === 1 ? filters.department[0] : ""
                  }
                  onChange={(v) => updateFilter("department", v ? [v] : [])}
                  options={[
                    { value: "", label: "All Departments" },
                    ...allDepartments.map((d) => ({ value: d, label: d })),
                  ]}
                  label="Department"
                />
              </div>

              {/* Consultation type */}
              <div className="w-full sm:w-[160px]">
                <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Type
                </label>
                <Select
                  value={
                    filters.consultationType.length === 1
                      ? filters.consultationType[0]
                      : ""
                  }
                  onChange={(v) =>
                    updateFilter("consultationType", v ? [v] : [])
                  }
                  options={[
                    { value: "", label: "All Types" },
                    ...consultTypeOptions,
                  ]}
                  label="Type"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
