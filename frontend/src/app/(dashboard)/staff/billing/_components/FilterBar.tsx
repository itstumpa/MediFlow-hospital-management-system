"use client";

import { motion } from "framer-motion";
import { RotateCcw, Search } from "lucide-react";
import {
  filterDoctorOptions,
  filterInsuranceOptions,
  filterMethodOptions,
  filterStatusOptions,
  sortOptions,
} from "../_mock-data";

/* ─── Exported types ────────────────────────── */

export interface FilterValues {
  invoiceId: string;
  patient: string;
  doctor: string;
  method: string;
  status: string;
  insurance: string;
  dateFrom: string;
  dateTo: string;
  sort: string;
}

export const defaultFilterValues: FilterValues = {
  invoiceId: "",
  patient: "",
  doctor: "",
  method: "",
  status: "",
  insurance: "",
  dateFrom: "",
  dateTo: "",
  sort: "newest",
};

/* ─── Props ─────────────────────────────────── */

interface FilterBarProps {
  isOpen: boolean;
  filters: FilterValues;
  onChange: (filters: FilterValues) => void;
  onReset: () => void;
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
  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== "" && v !== "newest",
  );

  const update = (key: keyof FilterValues, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <motion.div
      initial={false}
      animate={{
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/50">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Invoice ID */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
              Invoice ID
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="INV-2026-..."
                value={filters.invoiceId}
                onChange={(e) => update("invoiceId", e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-8 pr-2.5 text-xs text-slate-700 placeholder-slate-400 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
              />
            </div>
          </div>

          {/* Patient */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
              Patient
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search patient..."
                value={filters.patient}
                onChange={(e) => update("patient", e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-8 pr-2.5 text-xs text-slate-700 placeholder-slate-400 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
              />
            </div>
          </div>

          {/* Doctor */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
              Doctor
            </label>
            <select
              value={filters.doctor}
              onChange={(e) => update("doctor", e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 px-2.5 text-xs text-slate-700 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              <option value="">All Doctors</option>
              {filterDoctorOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Method */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
              Payment Method
            </label>
            <select
              value={filters.method}
              onChange={(e) => update("method", e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 px-2.5 text-xs text-slate-700 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              <option value="">All Methods</option>
              {filterMethodOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => update("status", e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 px-2.5 text-xs text-slate-700 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              <option value="">All Statuses</option>
              {filterStatusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Insurance */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
              Insurance
            </label>
            <select
              value={filters.insurance}
              onChange={(e) => update("insurance", e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 px-2.5 text-xs text-slate-700 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              <option value="">All</option>
              {filterInsuranceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date From */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
              Date From
            </label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => update("dateFrom", e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 px-2.5 text-xs text-slate-700 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            />
          </div>

          {/* Date To */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
              Date To
            </label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => update("dateTo", e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 px-2.5 text-xs text-slate-700 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            />
          </div>
        </div>

        {/* Sort & Reset */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Sort by:
            </label>
            <select
              value={filters.sort}
              onChange={(e) => update("sort", e.target.value)}
              className="rounded-lg border border-slate-200 bg-white py-1.5 px-2.5 text-xs text-slate-700 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
