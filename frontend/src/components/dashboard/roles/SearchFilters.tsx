"use client";

import type { PermissionAction, RoleFilters, RoleType } from "@/lib/data/rbac";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Filter, Search, X } from "lucide-react";
import { useCallback, useState } from "react";

interface SearchFiltersProps {
  filters: RoleFilters;
  onChange: (filters: RoleFilters) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
  roleTypes: { value: RoleType | "all"; label: string }[];
  permissions: { value: PermissionAction | "all"; label: string }[];
  className?: string;
}

export function SearchFilters({
  filters,
  onChange,
  onClear,
  hasActiveFilters,
  roleTypes,
  permissions,
  className,
}: SearchFiltersProps) {
  const [expanded, setExpanded] = useState(false);

  const handleSearchChange = useCallback(
    (value: string) => {
      onChange({ ...filters, search: value });
    },
    [filters, onChange],
  );

  const handleTypeChange = useCallback(
    (value: RoleType | "all") => {
      onChange({ ...filters, type: value });
    },
    [filters, onChange],
  );

  const handlePermissionChange = useCallback(
    (value: PermissionAction | "all") => {
      onChange({ ...filters, permission: value });
    },
    [filters, onChange],
  );

  return (
    <div
      className={cn(
        "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden transition-all duration-300",
        className,
      )}
    >
      {/* Main Search Bar - Always Visible */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 size-4" />
            <input
              type="text"
              placeholder="Search roles by name or description..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dash-primary/50 transition-colors text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              aria-label="Search roles"
            />
            {filters.search && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors",
              expanded
                ? "bg-dash-primary text-white border-dash-primary"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700",
            )}
            aria-expanded={expanded}
            aria-controls="advanced-filters"
          >
            <Filter className="size-4" />
            <span>Filters</span>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="size-4" />
            </motion.span>
            {hasActiveFilters && (
              <span
                className="size-2 rounded-full bg-dash-primary"
                aria-label="Active filters"
              />
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={onClear}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-500 dark:text-slate-400 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              aria-label="Clear all filters"
            >
              <X className="size-4" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters - Collapsible */}
      <motion.div
        id="advanced-filters"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="p-4 space-y-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-800/30">
          {/* Row 1: Type Filter & Permission Filter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="role-type"
                className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5"
              >
                Role Type
              </label>
              <select
                id="role-type"
                value={filters.type}
                onChange={(e) =>
                  handleTypeChange(e.target.value as RoleType | "all")
                }
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dash-primary/50 text-slate-900 dark:text-white"
              >
                {roleTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="permission-filter"
                className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5"
              >
                Has Permission
              </label>
              <select
                id="permission-filter"
                value={filters.permission}
                onChange={(e) =>
                  handlePermissionChange(
                    e.target.value as PermissionAction | "all",
                  )
                }
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dash-primary/50 text-slate-900 dark:text-white"
              >
                {permissions.map((perm) => (
                  <option key={perm.value} value={perm.value}>
                    {perm.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Sort Options */}
          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">
              Sort By
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { key: "name" as const, label: "Name" },
                { key: "users" as const, label: "Users" },
                { key: "permissions" as const, label: "Permissions" },
                { key: "created" as const, label: "Created" },
                { key: "updated" as const, label: "Updated" },
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() =>
                    onChange({
                      ...filters,
                      sortBy: option.key,
                      sortAsc:
                        filters.sortBy === option.key ? !filters.sortAsc : true,
                    })
                  }
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border transition-colors",
                    filters.sortBy === option.key
                      ? "bg-dash-primary text-white border-dash-primary"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700",
                  )}
                  aria-pressed={filters.sortBy === option.key}
                >
                  <span>{option.label}</span>
                  <motion.span
                    animate={{
                      rotate:
                        filters.sortBy === option.key
                          ? filters.sortAsc
                            ? 0
                            : 180
                          : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronUp className="size-3.5" />
                  </motion.span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Active filters:
              </span>
              {filters.search && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-dash-primary/10 text-dash-primary rounded-full">
                  <Search className="size-3" />"{filters.search}"
                  <button
                    onClick={() => handleSearchChange("")}
                    className="ml-1 hover:text-dash-primary/70"
                    aria-label="Remove search filter"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              )}
              {filters.type !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-dash-primary-light dark:bg-teal-900/30 text-dash-primary dark:text-accent rounded-full">
                  {roleTypes.find((t) => t.value === filters.type)?.label}
                  <button
                    onClick={() => handleTypeChange("all")}
                    className="ml-1 hover:text-dash-primary"
                    aria-label="Remove type filter"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              )}
              {filters.permission !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full">
                  {
                    permissions.find((p) => p.value === filters.permission)
                      ?.label
                  }
                  <button
                    onClick={() => handlePermissionChange("all")}
                    className="ml-1 hover:text-emerald-700"
                    aria-label="Remove permission filter"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
