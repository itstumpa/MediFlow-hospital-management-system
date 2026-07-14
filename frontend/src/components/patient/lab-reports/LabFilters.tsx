"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import type {
  LabFilters as LabFiltersType,
  ReportStatus,
  ViewMode,
} from "./types";
import { labDepartments, uniqueDoctors } from "./types";

/* ─── Props ─── */

interface LabFiltersProps {
  filters: LabFiltersType;
  onChange: (filters: LabFiltersType) => void;
  onReset: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  className?: string;
}

/* ─── View mode button ─── */

function ViewBtn({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
        active
          ? "bg-[var(--color-primary)] text-white shadow-sm dark:bg-[var(--color-accent)] dark:text-slate-900"
          : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700",
      )}
    >
      {label}
    </button>
  );
}

/* ─── Status options for filter ─── */

const statusOptions: { value: ReportStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "completed", label: "Completed" },
  { value: "abnormal", label: "Abnormal" },
];

/* ─── Component ─── */

export function LabFilters({
  filters,
  onChange,
  onReset,
  viewMode,
  onViewModeChange,
  className,
}: LabFiltersProps) {
  const update = (patch: Partial<LabFiltersType>) =>
    onChange({ ...filters, ...patch });

  const hasFilters =
    filters.search ||
    filters.doctor ||
    filters.department ||
    filters.status ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <motion.div
      variants={staggerItem}
      className={cn("dash-card overflow-visible p-4", className)}
    >
      <div className="flex flex-col gap-4">
        {/* Top row: Search + View toggle */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => update({ search: e.target.value })}
              placeholder="Search test, lab ID, doctor..."
              className="w-full rounded-xl border border-slate-200 bg-transparent py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-600 dark:text-slate-200 dark:placeholder-slate-500 dark:focus:border-[var(--color-accent)] dark:focus:ring-[var(--color-accent)]/20"
              aria-label="Search lab reports"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => update({ search: "" })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-700/60">
            <ViewBtn
              label="Cards"
              active={viewMode === "cards"}
              onClick={() => onViewModeChange("cards")}
            />
            <ViewBtn
              label="Table"
              active={viewMode === "table"}
              onClick={() => onViewModeChange("table")}
            />
            <ViewBtn
              label="Timeline"
              active={viewMode === "timeline"}
              onClick={() => onViewModeChange("timeline")}
            />
          </div>
        </div>

        {/* Filter chips row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Doctor */}
          <select
            value={filters.doctor}
            onChange={(e) => update({ doctor: e.target.value })}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-[var(--color-accent)]"
            aria-label="Filter by doctor"
          >
            <option value="">All Doctors</option>
            {uniqueDoctors.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Department */}
          <select
            value={filters.department}
            onChange={(e) => update({ department: e.target.value })}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-[var(--color-accent)]"
            aria-label="Filter by department"
          >
            <option value="">All Departments</option>
            {labDepartments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={filters.status}
            onChange={(e) =>
              update({ status: e.target.value as ReportStatus | "" })
            }
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-[var(--color-accent)]"
            aria-label="Filter by status"
          >
            <option value="">All Status</option>
            {statusOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          {/* Date from */}
          <div className="flex items-center gap-1">
            <label className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
              From
            </label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => update({ dateFrom: e.target.value })}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-all focus:border-[var(--color-primary)] focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-[var(--color-accent)]"
              aria-label="Filter from date"
            />
          </div>

          <div className="flex items-center gap-1">
            <label className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
              To
            </label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => update({ dateTo: e.target.value })}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-all focus:border-[var(--color-primary)] focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-[var(--color-accent)]"
              aria-label="Filter to date"
            />
          </div>

          {/* Sort */}
          <select
            value={filters.sort}
            onChange={(e) =>
              update({ sort: e.target.value as LabFiltersType["sort"] })
            }
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-[var(--color-accent)]"
            aria-label="Sort reports"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="status">Status</option>
            <option value="department">Department</option>
          </select>

          {/* Reset */}
          {hasFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 transition-all hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              <X className="h-3 w-3" />
              Reset
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
