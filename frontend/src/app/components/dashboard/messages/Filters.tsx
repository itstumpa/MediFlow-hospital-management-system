"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useCallback, useState } from "react";
import type {
  MessageDepartment,
  MessagePriority,
  MessageStatus,
} from "./types";
import { DEPARTMENT_LABELS, PRIORITY_COLORS, STATUS_COLORS } from "./types";

interface FiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: MessageStatus[];
  onStatusFilterChange: (values: MessageStatus[]) => void;
  priorityFilter: MessagePriority[];
  onPriorityFilterChange: (values: MessagePriority[]) => void;
  departmentFilter: MessageDepartment[];
  onDepartmentFilterChange: (values: MessageDepartment[]) => void;
}

const statusOptions: { value: MessageStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "in-progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
  { value: "spam", label: "Spam" },
];

const priorityOptions: { value: MessagePriority; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

const departmentOptions: { value: MessageDepartment; label: string }[] =
  Object.entries(DEPARTMENT_LABELS).map(([value, label]) => ({
    value: value as MessageDepartment,
    label,
  }));

export function Filters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  departmentFilter,
  onDepartmentFilterChange,
}: FiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggleFilter = useCallback(
    <T,>(value: T, current: T[], setter: (values: T[]) => void) => {
      if (current.includes(value)) {
        setter(current.filter((v) => v !== value));
      } else {
        setter([...current, value]);
      }
    },
    [],
  );

  const hasAnyFilter =
    statusFilter.length > 0 ||
    priorityFilter.length > 0 ||
    departmentFilter.length > 0;

  const clearAll = useCallback(() => {
    onStatusFilterChange([]);
    onPriorityFilterChange([]);
    onDepartmentFilterChange([]);
  }, [onStatusFilterChange, onPriorityFilterChange, onDepartmentFilterChange]);

  return (
    <div className="space-y-3">
      {/* Search bar */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search messages by name, subject, or email..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-dash-primary focus:outline-none focus:ring-2 focus:ring-dash-primary-light dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-dash-primary dark:focus:ring-teal-900/30"
          aria-label="Search messages"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter toggles */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            showAdvanced || hasAnyFilter
              ? "bg-dash-primary-light text-dash-primary dark:bg-teal-900/30 dark:text-accent"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
          }`}
          aria-label="Toggle advanced filters"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
          {hasAnyFilter && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-dash-primary text-[10px] font-bold text-white dark:bg-dash-primary">
              {statusFilter.length +
                priorityFilter.length +
                departmentFilter.length}
            </span>
          )}
        </button>

        {/* Active filter pills */}
        {statusFilter.map((s) => (
          <button
            key={s}
            onClick={() => toggleFilter(s, statusFilter, onStatusFilterChange)}
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_COLORS[s].bg} ${STATUS_COLORS[s].text} transition-all hover:opacity-80`}
          >
            {s === "new"
              ? "New"
              : s === "in-progress"
                ? "In Progress"
                : s.charAt(0).toUpperCase() + s.slice(1)}
            <X className="h-3 w-3" />
          </button>
        ))}
        {priorityFilter.map((p) => (
          <button
            key={p}
            onClick={() =>
              toggleFilter(p, priorityFilter, onPriorityFilterChange)
            }
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${PRIORITY_COLORS[p].bg} ${PRIORITY_COLORS[p].text} transition-all hover:opacity-80`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
            <X className="h-3 w-3" />
          </button>
        ))}
        {departmentFilter.map((d) => (
          <button
            key={d}
            onClick={() =>
              toggleFilter(d, departmentFilter, onDepartmentFilterChange)
            }
            className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 transition-all hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            {DEPARTMENT_LABELS[d]}
            <X className="h-3 w-3" />
          </button>
        ))}
        {hasAnyFilter && (
          <button
            onClick={clearAll}
            className="text-xs font-medium text-slate-500 underline-offset-2 hover:underline dark:text-slate-400"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Advanced filter panel */}
      {showAdvanced && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 gap-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/50 sm:grid-cols-3"
        >
          {/* Status */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Status
            </p>
            <div className="flex flex-wrap gap-1.5">
              {statusOptions.map((opt) => {
                const active = statusFilter.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() =>
                      toggleFilter(
                        opt.value,
                        statusFilter,
                        onStatusFilterChange,
                      )
                    }
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                      active
                        ? `${STATUS_COLORS[opt.value].bg} ${STATUS_COLORS[opt.value].text} ring-1 ${STATUS_COLORS[opt.value].bg.replace("bg-", "ring-")}`
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Priority
            </p>
            <div className="flex flex-wrap gap-1.5">
              {priorityOptions.map((opt) => {
                const active = priorityFilter.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() =>
                      toggleFilter(
                        opt.value,
                        priorityFilter,
                        onPriorityFilterChange,
                      )
                    }
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                      active
                        ? `${PRIORITY_COLORS[opt.value].bg} ${PRIORITY_COLORS[opt.value].text} ring-1 ${PRIORITY_COLORS[opt.value].ring}`
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Department */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Department
            </p>
            <div className="flex flex-wrap gap-1.5">
              {departmentOptions.map((opt) => {
                const active = departmentFilter.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() =>
                      toggleFilter(
                        opt.value,
                        departmentFilter,
                        onDepartmentFilterChange,
                      )
                    }
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                      active
                        ? "bg-dash-primary-light text-dash-primary ring-1 ring-dash-primary dark:bg-teal-900/30 dark:text-accent dark:ring-dash-primary"
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
