"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  LayoutGrid,
  List,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Timer,
  X,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  departmentOptions,
  priorityOptions,
  statusOptions,
  timeRangeOptions,
  todayAppointments,
  type FilterState,
  type ViewMode,
} from "./appointments-mock-data";

interface AppointmentsToolbarProps {
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onRefresh: () => void;
}

/* ─── Select Dropdown ──────────────────────────────────── */

function FilterSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
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

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition-all",
          "hover:border-slate-300 hover:shadow-sm",
          "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600",
          open &&
            "border-cyan-300 ring-1 ring-cyan-200 dark:border-cyan-700 dark:ring-cyan-800/40",
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            "h-3 w-3 text-slate-400 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -4, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.96 }}
          transition={{ duration: 0.12 }}
          className="absolute left-0 z-50 mt-1 w-44 origin-top-left overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={cn(
                "w-full px-3 py-2 text-left text-xs transition-colors",
                "hover:bg-slate-50 dark:hover:bg-slate-800",
                value === opt
                  ? "font-medium text-cyan-600 dark:text-cyan-400"
                  : "text-slate-600 dark:text-slate-400",
              )}
            >
              {opt}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

/* ─── Toolbar ──────────────────────────────────────────── */

export function AppointmentsToolbar({
  filters,
  setFilters,
  viewMode,
  setViewMode,
  onRefresh,
}: AppointmentsToolbarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const hasActiveFilters =
    filters.search ||
    filters.appointmentId ||
    filters.department !== "All Departments" ||
    filters.priority !== "All Priorities" ||
    filters.status !== "All Statuses" ||
    filters.timeRange !== "All Day";

  const resetFilters = () => {
    setFilters({
      search: "",
      appointmentId: "",
      department: "All Departments",
      priority: "All Priorities",
      status: "All Statuses",
      timeRange: "All Day",
    });
  };

  return (
    <div
      className={cn(
        "sticky top-0 z-30 rounded-xl border border-slate-200/60 bg-white/80 p-3 backdrop-blur-lg",
        "dark:border-slate-700/40 dark:bg-slate-900/80",
        "shadow-sm",
      )}
    >
      {/* Row 1: Search + View Toggle + Actions */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative min-w-0 flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            className={cn(
              "h-9 w-full rounded-lg border border-slate-200 bg-white pl-8 pr-3 text-xs text-slate-900 placeholder:text-slate-400",
              "focus:border-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-200",
              "dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-cyan-700 dark:focus:ring-cyan-800/40",
            )}
          />
          {filters.search && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all",
            showFilters || hasActiveFilters
              ? "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-800 dark:bg-cyan-950/30 dark:text-cyan-300"
              : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800",
          )}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
          {hasActiveFilters && (
            <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-cyan-500 px-1 text-[9px] font-bold text-white">
              {
                [
                  filters.search,
                  filters.appointmentId,
                  filters.department !== "All Departments",
                  filters.priority !== "All Priorities",
                  filters.status !== "All Statuses",
                  filters.timeRange !== "All Day",
                ].filter(Boolean).length
              }
            </span>
          )}
        </button>

        {/* View mode toggle */}
        <div className="flex items-center rounded-lg border border-slate-200 p-0.5 dark:border-slate-700">
          {[
            { mode: "table" as ViewMode, icon: List },
            { mode: "timeline" as ViewMode, icon: Timer },
            { mode: "cards" as ViewMode, icon: LayoutGrid },
          ].map(({ mode, icon: Icon }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={cn(
                "rounded-md px-2 py-1 text-xs font-medium transition-all",
                viewMode === mode
                  ? "bg-cyan-500 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300",
              )}
              title={mode.charAt(0).toUpperCase() + mode.slice(1)}
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>

        {/* Spacer on desktop */}
        <div className="hidden flex-1 sm:block" />

        {/* Action buttons */}
        <button
          onClick={onRefresh}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800">
          <Calendar className="h-3.5 w-3.5" />
          Calendar View
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-all hover:bg-cyan-600 hover:shadow-md">
          Export
        </button>
      </div>

      {/* Row 2: Expanded filters */}
      <motion.div
        initial={false}
        animate={{
          height: showFilters ? "auto" : 0,
          opacity: showFilters ? 1 : 0,
          marginTop: showFilters ? 12 : 0,
        }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="overflow-hidden"
      >
        <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
          <FilterSelect
            label="Appointment ID"
            options={[
              "All IDs",
              ...todayAppointments.map((a) => a.appointmentId),
            ]}
            value={filters.appointmentId || "All IDs"}
            onChange={(v) =>
              setFilters((prev) => ({
                ...prev,
                appointmentId: v === "All IDs" ? "" : v,
              }))
            }
          />
          <FilterSelect
            label="Department"
            options={departmentOptions}
            value={filters.department}
            onChange={(v) => setFilters((prev) => ({ ...prev, department: v }))}
          />
          <FilterSelect
            label="Priority"
            options={priorityOptions}
            value={filters.priority}
            onChange={(v) => setFilters((prev) => ({ ...prev, priority: v }))}
          />
          <FilterSelect
            label="Status"
            options={["All Statuses", ...statusOptions]}
            value={filters.status || "All Statuses"}
            onChange={(v) =>
              setFilters((prev) => ({
                ...prev,
                status: v === "All Statuses" ? "" : v,
              }))
            }
          />
          <FilterSelect
            label="Time Range"
            options={timeRangeOptions}
            value={filters.timeRange}
            onChange={(v) => setFilters((prev) => ({ ...prev, timeRange: v }))}
          />
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <X className="h-3 w-3" />
              Reset Filters
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
