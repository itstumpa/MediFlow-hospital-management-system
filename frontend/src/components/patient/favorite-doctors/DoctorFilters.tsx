"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Calendar,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  Filter,
  Grid3X3,
  LayoutList,
  Loader2,
  Search,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";
import type { DoctorFilters, DoctorTab, DoctorViewMode } from "./types";
import { doctorTabs, mockHospitals, sortOptions } from "./types";

interface DoctorFiltersProps {
  filters: DoctorFilters;
  onFiltersChange: (filters: Partial<DoctorFilters>) => void;
  onReset: () => void;
  activeTab: DoctorTab;
  onTabChange: (tab: DoctorTab) => void;
  tabCounts: Record<DoctorTab, number>;
  viewMode: DoctorViewMode;
  onViewModeChange: (mode: DoctorViewMode) => void;
  totalDoctors: number;
  filteredCount: number;
  isLoading?: boolean;
}

export function DoctorFilters({
  filters,
  onFiltersChange,
  onReset,
  activeTab,
  onTabChange,
  tabCounts,
  viewMode,
  onViewModeChange,
  totalDoctors,
  filteredCount,
  isLoading,
}: DoctorFiltersProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const hasActiveFilters =
    filters.search ||
    filters.specialty !== "all" ||
    filters.hospital !== "all" ||
    filters.availability !== "all" ||
    filters.rating !== "all" ||
    filters.sortBy !== "name" ||
    filters.sortOrder !== "desc";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Tabs */}
      <div
        className="flex flex-wrap gap-2 overflow-x-auto pb-2"
        role="tablist"
        aria-label="Doctor filters"
      >
        {doctorTabs.map((tab) => (
          <motion.button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex items-center gap-1.5 shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-[var(--color-primary)] text-white shadow-[var(--color-primary)]/30"
                : "bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
            )}
          >
            <tab.icon className="h-4 w-4" aria-hidden="true" />
            {tab.label}
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                activeTab === tab.id
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400",
              )}
            >
              {tabCounts[tab.id]}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search doctors, specialties, hospitals..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            className={cn(
              "w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white",
              filters.search && "pr-10",
            )}
            aria-label="Search doctors"
          />
          {filters.search && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onFiltersChange({ search: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </motion.button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap gap-2">
          {/* Specialty */}
          <DropdownFilter
            label="Specialty"
            icon={Star}
            value={filters.specialty}
            options={[
              { value: "all", label: "All Specialties" },
              { value: "Cardiology", label: "Cardiology" },
              { value: "Neurology", label: "Neurology" },
              { value: "Orthopedics", label: "Orthopedics" },
              { value: "General Medicine", label: "General Medicine" },
              { value: "Pediatrics", label: "Pediatrics" },
              { value: "Dermatology", label: "Dermatology" },
              { value: "Oncology", label: "Oncology" },
              { value: "Psychiatry", label: "Psychiatry" },
            ]}
            onChange={(value: string) => onFiltersChange({ specialty: value })}
            isOpen={openDropdown === "specialty"}
            onToggle={() => toggleDropdown("specialty")}
          />

          {/* Hospital */}
          <DropdownFilter
            label="Hospital"
            icon={Calendar}
            value={filters.hospital}
            options={[
              { value: "all", label: "All Hospitals" },
              ...mockHospitals.map((h) => ({ value: h.id, label: h.name })),
            ]}
            onChange={(value: string) => onFiltersChange({ hospital: value })}
            isOpen={openDropdown === "hospital"}
            onToggle={() => toggleDropdown("hospital")}
          />

          {/* Availability */}
          <DropdownFilter
            label="Availability"
            icon={CalendarCheck}
            value={filters.availability}
            options={[
              { value: "all", label: "All" },
              { value: "available-now", label: "Available Now" },
              { value: "available-today", label: "Available Today" },
              { value: "tomorrow", label: "Tomorrow" },
              { value: "unavailable", label: "Unavailable" },
            ]}
            onChange={(value: string) =>
              onFiltersChange({ availability: value })
            }
            isOpen={openDropdown === "availability"}
            onToggle={() => toggleDropdown("availability")}
          />

          {/* Rating */}
          <DropdownFilter
            label="Rating"
            icon={Star}
            value={filters.rating}
            options={[
              { value: "all", label: "All Ratings" },
              { value: "4.5", label: "4.5 & Up" },
              { value: "4.0", label: "4.0 & Up" },
              { value: "3.5", label: "3.5 & Up" },
              { value: "3.0", label: "3.0 & Up" },
            ]}
            onChange={(value: string) => onFiltersChange({ rating: value })}
            isOpen={openDropdown === "rating"}
            onToggle={() => toggleDropdown("rating")}
          />

          {/* Sort */}
          <DropdownFilter
            label="Sort"
            icon={Filter}
            value={`${filters.sortBy}-${filters.sortOrder}`}
            options={sortOptions
              .map((opt) => ({
                value: `${opt.value}-desc`,
                label: `${opt.label} ↓`,
              }))
              .concat(
                sortOptions.map((opt) => ({
                  value: `${opt.value}-asc`,
                  label: `${opt.label.replace("High-Low", "Low-High").replace("Most", "Least").replace("Recently", "Oldest")} ↑`,
                })),
              )}
            onChange={(value: string) => {
              const [sortBy, sortOrder] = value.split("-") as [
                DoctorFilters["sortBy"],
                DoctorFilters["sortOrder"],
              ];
              onFiltersChange({ sortBy, sortOrder });
            }}
            isOpen={openDropdown === "sort"}
            onToggle={() => toggleDropdown("sort")}
          />
        </div>

        {/* View Mode & Reset */}
        <div className="flex items-center gap-2">
          <div
            className="flex rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800"
            role="group"
            aria-label="View mode"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewModeChange("grid")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                viewMode === "grid"
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
              )}
              aria-pressed={viewMode === "grid"}
              aria-label="Grid view"
            >
              <Grid3X3 className="h-4 w-4" aria-hidden="true" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewModeChange("list")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                viewMode === "list"
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
              )}
              aria-pressed={viewMode === "list"}
              aria-label="List view"
            >
              <LayoutList className="h-4 w-4" aria-hidden="true" />
            </motion.button>
          </div>

          {hasActiveFilters && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onReset}
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Reset
            </motion.button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>
          Showing{" "}
          <span className="font-semibold text-slate-900 dark:text-white">
            {filteredCount}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-900 dark:text-white">
            {totalDoctors}
          </span>{" "}
          doctors
        </span>
        {isLoading && (
          <span className="flex items-center gap-1.5">
            <Loader2
              className="h-4 w-4 animate-spin text-[var(--color-primary)]"
              aria-hidden="true"
            />
            Loading...
          </span>
        )}
      </div>
    </motion.div>
  );
}

interface DropdownFilterProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const DropdownFilter = function DropdownFilter({
  label,
  icon: Icon,
  value,
  options,
  onChange,
  isOpen,
  onToggle,
}: DropdownFilterProps) {
  const selectedOption = options.find((opt) => opt.value === value);
  const isActive = value !== "all";

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onToggle}
        className={cn(
          "flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-all",
          isActive
            ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)] dark:border-[var(--color-primary)] dark:bg-[var(--color-primary)]/10"
            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label}
      >
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline">
          {selectedOption?.label || label}
        </span>
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
          aria-hidden="true"
        />
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
          className="absolute right-0 z-50 mt-1.5 min-w-[180px] rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-800"
          role="listbox"
          aria-label={label}
        >
          {options.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ backgroundColor: "var(--color-primary)/10" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onChange(option.value);
                onToggle();
              }}
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2 text-sm text-left transition-colors",
                value === option.value
                  ? "bg-[var(--color-primary)]/5 text-[var(--color-primary)] font-medium"
                  : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700",
              )}
              role="option"
              aria-selected={value === option.value}
            >
              {value === option.value && (
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              <span className="flex-1">{option.label}</span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

DropdownFilter.displayName = "DropdownFilter";
