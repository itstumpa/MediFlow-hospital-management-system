"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LayoutGrid, RotateCcw, Search, Table2, X } from "lucide-react";
import { staggerItem } from "../MotionVariants";
import type { FilterState, ViewMode } from "./patients-mock-data";
import {
  bloodGroupOptions,
  genderOptions,
  sortOptions,
} from "./patients-mock-data";

interface PatientToolbarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onReset: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  resultsCount: number;
}

export function PatientToolbar({
  filters,
  onFilterChange,
  onReset,
  viewMode,
  onViewModeChange,
  resultsCount,
}: PatientToolbarProps) {
  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "sticky top-0 z-20 space-y-3 rounded-xl border border-slate-200/60 bg-white/95 p-4 backdrop-blur-md",
        "dark:border-slate-700/40 dark:bg-slate-900/80",
      )}
    >
      {/* Row 1: Search + View Toggle */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search patients by name, ID, condition..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className={cn(
              "w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-8 text-xs text-slate-900 placeholder:text-slate-400",
              "focus:border-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-200",
              "dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-cyan-700 dark:focus:ring-cyan-800/40",
            )}
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange("search", "")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Filter toggle */}
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {resultsCount} patient{resultsCount !== 1 ? "s" : ""}
          </span>

          {/* View mode toggle */}
          <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 dark:border-slate-700 dark:bg-slate-800">
            <button
              onClick={() => onViewModeChange("table")}
              className={cn(
                "rounded-md p-1.5 transition-all",
                viewMode === "table"
                  ? "bg-cyan-50 text-cyan-600 shadow-sm dark:bg-cyan-950/30 dark:text-cyan-400"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300",
              )}
              title="Table view"
            >
              <Table2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewModeChange("cards")}
              className={cn(
                "rounded-md p-1.5 transition-all",
                viewMode === "cards"
                  ? "bg-cyan-50 text-cyan-600 shadow-sm dark:bg-cyan-950/30 dark:text-cyan-400"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300",
              )}
              title="Card view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Filter chips */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Patient ID */}
        <FilterChip
          label="Patient ID"
          value={filters.patientId}
          onChange={(v) => onFilterChange("patientId", v)}
          placeholder="e.g. PAT-001"
        />

        {/* Age */}
        <FilterChip
          label="Age"
          value={filters.age}
          onChange={(v) => onFilterChange("age", v)}
          placeholder="e.g. 25-50"
        />

        {/* Gender */}
        <FilterSelect
          label="Gender"
          value={filters.gender}
          onChange={(v) => onFilterChange("gender", v)}
          options={genderOptions}
        />

        {/* Blood Group */}
        <FilterSelect
          label="Blood Group"
          value={filters.bloodGroup}
          onChange={(v) => onFilterChange("bloodGroup", v)}
          options={bloodGroupOptions}
        />

        {/* Condition */}
        <FilterChip
          label="Condition"
          value={filters.condition}
          onChange={(v) => onFilterChange("condition", v)}
          placeholder="e.g. Diabetes"
        />

        {/* Last Visit */}
        <FilterChip
          label="Last Visit"
          value={filters.lastVisit}
          onChange={(v) => onFilterChange("lastVisit", v)}
          placeholder="e.g. Jul 2026"
        />

        {/* Sort */}
        <select
          value={filters.sort}
          onChange={(e) => onFilterChange("sort", e.target.value)}
          className={cn(
            "rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-600",
            "focus:border-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-200",
            "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
          )}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Sort: {opt.label}
            </option>
          ))}
        </select>

        {/* Reset */}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-medium text-rose-500 transition-colors hover:bg-rose-50 dark:border-slate-700 dark:hover:bg-rose-950/20"
          >
            <RotateCcw className="h-3 w-3" />
            Reset Filters
          </button>
        )}
      </div>
    </motion.div>
  );
}

function FilterChip({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder || label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-28 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] text-slate-700 placeholder:text-slate-400",
          "focus:border-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-200",
          "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder:text-slate-500",
          value && "border-cyan-200 dark:border-cyan-800",
        )}
      />
      {/* Label tooltip */}
      <span className="pointer-events-none absolute -top-2 left-2 bg-white px-1 text-[9px] font-medium text-slate-400 dark:bg-slate-900">
        {label}
      </span>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-28 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-700",
          "focus:border-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-200",
          "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
          value && "border-cyan-200 dark:border-cyan-800",
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute -top-2 left-2 bg-white px-1 text-[9px] font-medium text-slate-400 dark:bg-slate-900">
        {label}
      </span>
    </div>
  );
}
