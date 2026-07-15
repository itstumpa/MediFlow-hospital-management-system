"use client";

import { motion } from "framer-motion";
import { RotateCcw, Search, X } from "lucide-react";
import { useState } from "react";
import {
  departments,
  doctors,
  statusOptions,
  visitTypes,
  type AppointmentStatus,
  type VisitType,
} from "../_mock-data";

/* ─── Types ─────────────────────────────────── */

export interface Filters {
  query: string;
  doctor: string;
  department: string;
  date: string;
  status: AppointmentStatus | "all";
  type: VisitType | "all";
  sort: string;
}

export const defaultFilters: Filters = {
  query: "",
  doctor: "All Doctors",
  department: "All Departments",
  date: "",
  status: "all",
  type: "all",
  sort: "date-asc",
};

interface SearchFilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

/* ─── Select wrapper ────────────────────────── */

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
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

/* ─── Component ─────────────────────────────── */

export function SearchFilterBar({ filters, onChange }: SearchFilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters =
    filters.query ||
    filters.doctor !== "All Doctors" ||
    filters.department !== "All Departments" ||
    filters.date ||
    filters.status !== "all" ||
    filters.type !== "all";

  const update = (partial: Partial<Filters>) =>
    onChange({ ...filters, ...partial });

  const reset = () => onChange(defaultFilters);

  return (
    <div className="dash-card p-4">
      {/* Top row: search + toggle */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, doctor..."
            value={filters.query}
            onChange={(e) => update({ query: e.target.value })}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm text-slate-700 placeholder-slate-400 transition-colors hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500 dark:hover:border-slate-600"
          />
          {filters.query && (
            <button
              onClick={() => update({ query: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
            showFilters || hasActiveFilters
              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
              : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          }`}
        >
          Filters
          {hasActiveFilters && (
            <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-bold text-white">
              !
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={reset}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </motion.button>
        )}
      </div>

      {/* Expandable filter row */}
      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6"
        >
          <Select
            label="Department"
            value={filters.department}
            options={departments.map((d) => ({ value: d, label: d }))}
            onChange={(v) => update({ department: v })}
          />
          <Select
            label="Doctor"
            value={filters.doctor}
            options={doctors.map((d) => ({ value: d, label: d }))}
            onChange={(v) => update({ doctor: v })}
          />
          <div className="relative">
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Date
            </label>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => update({ date: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition-colors hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600"
            />
          </div>
          <Select
            label="Status"
            value={filters.status}
            options={statusOptions.map((s) => ({
              value: s.value,
              label: s.label,
            }))}
            onChange={(v) => update({ status: v as AppointmentStatus | "all" })}
          />
          <Select
            label="Type"
            value={filters.type}
            options={visitTypes.map((t) => ({
              value: t.value,
              label: t.label,
            }))}
            onChange={(v) => update({ type: v as VisitType | "all" })}
          />
          <Select
            label="Sort"
            value={filters.sort}
            options={[
              { value: "date-asc", label: "Date ↑" },
              { value: "date-desc", label: "Date ↓" },
              { value: "patient", label: "Patient A-Z" },
              { value: "doctor", label: "Doctor A-Z" },
              { value: "status", label: "Status" },
            ]}
            onChange={(v) => update({ sort: v })}
          />
        </motion.div>
      )}
    </div>
  );
}
