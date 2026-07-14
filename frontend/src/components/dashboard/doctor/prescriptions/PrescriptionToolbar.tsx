"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Plus,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Table2,
  X,
} from "lucide-react";
import { useState } from "react";
import { staggerItem } from "../MotionVariants";
import type { FilterState, ViewMode } from "./prescriptions-mock-data";

interface PrescriptionToolbarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onReset: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  resultsCount: number;
  onNewPrescription: () => void;
}

export function PrescriptionToolbar({
  filters,
  onFilterChange,
  onReset,
  viewMode,
  onViewModeChange,
  resultsCount,
  onNewPrescription,
}: PrescriptionToolbarProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <motion.div variants={staggerItem} className="space-y-3">
      {/* Top bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            placeholder="Search prescriptions by ID, patient, medicine..."
            className={cn(
              "w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400",
              "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
              "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-teal-600 dark:focus:ring-teal-900/30",
            )}
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange("search", "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* New Prescription */}
          <button
            onClick={onNewPrescription}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg bg-dash-primary px-3.5 py-2 text-xs font-medium text-white transition-all",
              "hover:bg-dash-primary-dark",
            )}
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Prescription</span>
          </button>

          {/* View Toggle */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 dark:border-slate-700 dark:bg-slate-800">
            <button
              onClick={() => onViewModeChange("table")}
              className={cn(
                "rounded-md p-1.5 transition-colors",
                viewMode === "table"
                  ? "bg-dash-primary-light text-dash-primary dark:bg-teal-950/30 dark:text-accent"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300",
              )}
            >
              <Table2 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onViewModeChange("cards")}
              className={cn(
                "rounded-md p-1.5 transition-colors",
                viewMode === "cards"
                  ? "bg-dash-primary-light text-dash-primary dark:bg-teal-950/30 dark:text-accent"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300",
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Filters toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "rounded-lg border p-2 transition-colors",
              showFilters
                ? "border-dash-primary-light bg-dash-primary-light text-dash-primary dark:border-teal-800 dark:bg-teal-950/30 dark:text-accent"
                : "border-slate-200 bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:hover:text-slate-300",
            )}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </button>

          {/* Reset */}
          <button
            onClick={onReset}
            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:hover:text-slate-300"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Expandable Filters */}
      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "grid grid-cols-2 gap-3 rounded-xl border border-slate-200/60 bg-white p-4 md:grid-cols-4 lg:grid-cols-7",
            "dark:border-slate-700/40 dark:bg-slate-900/60",
          )}
        >
          {/* Patient */}
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Patient
            </label>
            <input
              type="text"
              value={filters.patient}
              onChange={(e) => onFilterChange("patient", e.target.value)}
              placeholder="Patient name..."
              className={cn(
                "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 outline-none transition-all placeholder:text-slate-400",
                "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
              )}
            />
          </div>

          {/* Medicine */}
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Medicine
            </label>
            <input
              type="text"
              value={filters.medicine}
              onChange={(e) => onFilterChange("medicine", e.target.value)}
              placeholder="Medicine name..."
              className={cn(
                "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 outline-none transition-all placeholder:text-slate-400",
                "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
              )}
            />
          </div>

          {/* Doctor */}
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Doctor
            </label>
            <input
              type="text"
              value={filters.doctor}
              onChange={(e) => onFilterChange("doctor", e.target.value)}
              placeholder="Doctor name..."
              className={cn(
                "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 outline-none transition-all placeholder:text-slate-400",
                "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
              )}
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange("status", e.target.value)}
              className={cn(
                "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-600 outline-none transition-all",
                "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
              )}
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Discontinued">Discontinued</option>
              <option value="Expired">Expired</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Date
            </label>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => onFilterChange("date", e.target.value)}
              className={cn(
                "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-600 outline-none transition-all",
                "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
              )}
            />
          </div>

          {/* Prescription ID */}
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Prescription ID
            </label>
            <input
              type="text"
              value={filters.prescriptionId}
              onChange={(e) => onFilterChange("prescriptionId", e.target.value)}
              placeholder="e.g. RX-2024-..."
              className={cn(
                "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 outline-none transition-all placeholder:text-slate-400",
                "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
              )}
            />
          </div>

          {/* Sort */}
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Sort
            </label>
            <select
              value={filters.sort}
              onChange={(e) => onFilterChange("sort", e.target.value)}
              className={cn(
                "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-600 outline-none transition-all",
                "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
              )}
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="patient-asc">Patient A-Z</option>
              <option value="patient-desc">Patient Z-A</option>
              <option value="status">By Status</option>
            </select>
          </div>
        </motion.div>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>
          {resultsCount} prescription{resultsCount !== 1 ? "s" : ""} found
        </span>
      </div>
    </motion.div>
  );
}
