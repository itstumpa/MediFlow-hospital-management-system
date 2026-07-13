"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Grid3X3,
  List,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  bloodGroupOptions,
  departmentOptions,
  doctorOptions,
  genderOptions,
  statusOptions,
} from "./mock";
import type { PatientFilters, ViewMode } from "./types";

interface PatientsToolbarProps {
  filters: PatientFilters;
  onFiltersChange: (filters: PatientFilters) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  selectedCount: number;
  onToggleFilterPanel: () => void;
  filterPanelOpen: boolean;
}

function FilterChip({
  label,
  active,
  onClick,
  onRemove,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  onRemove: () => void;
}) {
  return (
    <motion.button
      layout
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
        active
          ? "border-dash-primary-light bg-dash-primary-light text-dash-primary dark:border-teal-800 dark:bg-teal-900/40 dark:text-accent"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700"
      }`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
      {active && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 rounded-full p-0.5 hover:bg-dash-primary-light dark:hover:bg-teal-800/50"
        >
          <X className="h-3 w-3" />
        </span>
      )}
    </motion.button>
  );
}

function DropdownFilter<T extends string>({
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
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (val: T) => {
    if (selected.includes(val)) {
      onChange(selected.filter((s) => s !== val));
    } else {
      onChange([...selected, val]);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
          selected.length > 0
            ? "border-dash-primary-light bg-dash-primary-light text-dash-primary dark:border-teal-800 dark:bg-teal-900/40 dark:text-accent"
            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600"
        }`}
      >
        {label}
        {selected.length > 0 && (
          <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-dash-primary px-1 text-[10px] font-bold text-white">
            {selected.length}
          </span>
        )}
        <ChevronDown
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 mt-1 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-800"
          >
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => toggle(opt)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 ${
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
            {selected.length > 0 && (
              <button
                onClick={() => onChange([])}
                className="mt-1 w-full rounded-lg px-3 py-2 text-center text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                Clear all
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PatientsToolbar({
  filters,
  onFiltersChange,
  viewMode,
  onViewModeChange,
  selectedCount,
  onToggleFilterPanel,
  filterPanelOpen,
}: PatientsToolbarProps) {
  const updateSearch = (search: string) =>
    onFiltersChange({ ...filters, search });

  const hasActiveFilters =
    filters.department.length > 0 ||
    filters.doctor.length > 0 ||
    filters.bloodGroup.length > 0 ||
    filters.gender.length > 0 ||
    filters.status.length > 0 ||
    filters.insurance.length > 0 ||
    filters.search.length > 0;

  const clearAllFilters = () =>
    onFiltersChange({
      ...filters,
      search: "",
      department: [],
      doctor: [],
      bloodGroup: [],
      gender: [],
      insurance: [],
      status: [],
      appointmentStatus: [],
      registrationDate: "",
      ageRange: [0, 120],
    });

  const activeFilterCount =
    filters.department.length +
    filters.doctor.length +
    filters.bloodGroup.length +
    filters.gender.length +
    filters.insurance.length +
    filters.status.length +
    filters.appointmentStatus.length;

  return (
    <div className="sticky top-0 z-30 -mx-6 -mt-6 bg-slate-50/80 px-6 pb-3 pt-6 backdrop-blur-xl dark:bg-slate-900/80">
      <div className="space-y-3">
        {/* Main toolbar row */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative min-w-[200px] flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => updateSearch(e.target.value)}
              placeholder="Search patients by name, email, phone, ID..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm placeholder-slate-400 transition-all focus:border-dash-primary focus:outline-none focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:placeholder-slate-500 dark:focus:border-teal-700 dark:focus:ring-dash-primary/30"
              aria-label="Search patients"
            />
            {filters.search && (
              <button
                onClick={() => updateSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Quick filter chips */}
          <div className="hidden sm:flex items-center gap-2 flex-wrap">
            <FilterChip
              label="Active"
              active={filters.status.includes("Active")}
              onClick={() =>
                onFiltersChange({
                  ...filters,
                  status: filters.status.includes("Active")
                    ? filters.status.filter((s) => s !== "Active")
                    : [...filters.status, "Active"],
                })
              }
              onRemove={() =>
                onFiltersChange({
                  ...filters,
                  status: filters.status.filter((s) => s !== "Active"),
                })
              }
            />
            <FilterChip
              label="Admitted"
              active={filters.status.includes("Admitted")}
              onClick={() =>
                onFiltersChange({
                  ...filters,
                  status: filters.status.includes("Admitted")
                    ? filters.status.filter((s) => s !== "Admitted")
                    : [...filters.status, "Admitted"],
                })
              }
              onRemove={() =>
                onFiltersChange({
                  ...filters,
                  status: filters.status.filter((s) => s !== "Admitted"),
                })
              }
            />
            <FilterChip
              label="Pending"
              active={filters.status.includes("Pending")}
              onClick={() =>
                onFiltersChange({
                  ...filters,
                  status: filters.status.includes("Pending")
                    ? filters.status.filter((s) => s !== "Pending")
                    : [...filters.status, "Pending"],
                })
              }
              onRemove={() =>
                onFiltersChange({
                  ...filters,
                  status: filters.status.filter((s) => s !== "Pending"),
                })
              }
            />
          </div>

          {/* Filter toggle button */}
          <button
            onClick={onToggleFilterPanel}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
              filterPanelOpen
                ? "border-dash-primary-light bg-dash-primary-light text-dash-primary dark:border-teal-800 dark:bg-teal-900/40 dark:text-accent"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-dash-primary px-1.5 text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* View toggle */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-white p-0.5 dark:border-slate-700 dark:bg-slate-800">
            <button
              onClick={() => onViewModeChange("table")}
              className={`rounded-lg p-2 transition-all ${
                viewMode === "table"
                  ? "bg-dash-primary-light text-dash-primary shadow-sm dark:bg-teal-900/40 dark:text-accent"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
              aria-label="Table view"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewModeChange("card")}
              className={`rounded-lg p-2 transition-all ${
                viewMode === "card"
                  ? "bg-dash-primary-light text-dash-primary shadow-sm dark:bg-teal-900/40 dark:text-accent"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
              aria-label="Card view"
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <X className="h-3.5 w-3.5" />
              Clear all
            </motion.button>
          )}
        </div>

        {/* Dropdown filters row */}
        <div className="flex flex-wrap items-center gap-2">
          <DropdownFilter
            label="Department"
            options={departmentOptions}
            selected={filters.department}
            onChange={(val) => onFiltersChange({ ...filters, department: val })}
          />
          <DropdownFilter
            label="Doctor"
            options={doctorOptions}
            selected={filters.doctor}
            onChange={(val) => onFiltersChange({ ...filters, doctor: val })}
          />
          <DropdownFilter
            label="Blood Group"
            options={bloodGroupOptions}
            selected={filters.bloodGroup}
            onChange={(val) => onFiltersChange({ ...filters, bloodGroup: val })}
          />
          <DropdownFilter
            label="Gender"
            options={genderOptions}
            selected={filters.gender}
            onChange={(val) => onFiltersChange({ ...filters, gender: val })}
          />
          <DropdownFilter
            label="Status"
            options={statusOptions}
            selected={filters.status}
            onChange={(val) => onFiltersChange({ ...filters, status: val })}
          />

          {/* Sort */}
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                sortBy: e.target.value as PatientFilters["sortBy"],
              })
            }
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-all hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600"
            aria-label="Sort by"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name">A-Z</option>
            <option value="recentVisit">Recent Visit</option>
          </select>
        </div>
      </div>
    </div>
  );
}
