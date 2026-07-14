"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Grid3X3, LayoutList, Search, X } from "lucide-react";
import type {
  PrescriptionFilters,
  PrescriptionStatus,
  PrescriptionTab,
  PrescriptionViewMode,
} from "./types";
import { allDepartments, mockDoctors, statusLabels } from "./types";

/* ─── Tabs ─── */

interface TabsProps {
  active: PrescriptionTab;
  onChange: (tab: PrescriptionTab) => void;
  counts: Record<PrescriptionTab, number>;
}

export function PrescriptionTabs({ active, onChange, counts }: TabsProps) {
  const tabs: { key: PrescriptionTab; label: string }[] = [
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
    { key: "expired", label: "Expired" },
    { key: "all", label: "All" },
  ];

  return (
    <div className="flex gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-700/60">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={cn(
            "relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium transition-all",
            active === tab.key
              ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300",
          )}
        >
          {tab.label}
          <span
            className={cn(
              "inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[9px] font-semibold",
              active === tab.key
                ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] dark:bg-[var(--color-accent)]/10 dark:text-[var(--color-accent)]"
                : "bg-slate-200/70 text-slate-500 dark:bg-slate-700 dark:text-slate-400",
            )}
          >
            {counts[tab.key]}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ─── View mode toggle ─── */

function ViewBtn({
  mode,
  active,
  onClick,
  icon: Icon,
}: {
  mode: PrescriptionViewMode;
  active: boolean;
  onClick: () => void;
  icon: LucideIcon;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg p-1.5 transition-all",
        active
          ? "bg-white text-[var(--color-primary)] shadow-sm dark:bg-slate-800 dark:text-[var(--color-accent)]"
          : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300",
      )}
      aria-label={`${mode} view`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

/* ─── Props ─── */

interface FiltersProps {
  filters: PrescriptionFilters;
  onChange: (filters: PrescriptionFilters) => void;
  onReset: () => void;
  viewMode: PrescriptionViewMode;
  onViewModeChange: (mode: PrescriptionViewMode) => void;
  tabCounts: Record<PrescriptionTab, number>;
  className?: string;
}

/* ─── Component ─── */

export function PrescriptionFilters({
  filters,
  onChange,
  onReset,
  viewMode,
  onViewModeChange,
  tabCounts,
  className,
}: FiltersProps) {
  const update = (patch: Partial<PrescriptionFilters>) =>
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
      className={cn("dash-card overflow-visible p-4 space-y-4", className)}
    >
      {/* Top row: Tabs + View toggle */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PrescriptionTabs
          active={filters.tab}
          onChange={(tab) => update({ tab })}
          counts={tabCounts}
        />

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-700/60">
            <ViewBtn
              mode="cards"
              active={viewMode === "cards"}
              onClick={() => onViewModeChange("cards")}
              icon={Grid3X3}
            />
            <ViewBtn
              mode="table"
              active={viewMode === "table"}
              onClick={() => onViewModeChange("table")}
              icon={LayoutList}
            />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
          placeholder="Search medicine, doctor, department..."
          className="w-full rounded-xl border border-slate-200 bg-transparent py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-600 dark:text-slate-200 dark:placeholder-slate-500 dark:focus:border-[var(--color-accent)] dark:focus:ring-[var(--color-accent)]/20"
          aria-label="Search prescriptions"
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
          {mockDoctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
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
          {allDepartments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) =>
            update({
              status: e.target.value as PrescriptionStatus | "",
            })
          }
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-[var(--color-accent)]"
          aria-label="Filter by status"
        >
          <option value="">All Statuses</option>
          {(Object.entries(statusLabels) as [PrescriptionStatus, string][]).map(
            ([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ),
          )}
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
            update({
              sort: e.target.value as PrescriptionFilters["sort"],
            })
          }
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-[var(--color-accent)]"
          aria-label="Sort prescriptions"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="medicine">Medicine Name</option>
          <option value="doctor">Doctor</option>
          <option value="status">Status</option>
        </select>

        {/* Reset */}
        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 transition-all hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            <X className="h-3 w-3" />
            Reset Filters
          </button>
        )}
      </div>
    </motion.div>
  );
}
