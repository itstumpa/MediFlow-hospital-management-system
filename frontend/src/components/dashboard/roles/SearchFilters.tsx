"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Users,
  Shield,
  Copy,
  SlidersHorizontal,
  Key,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RoleFilters, RoleType, PermissionAction } from "@/lib/data/rbac";

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

  const handleSortChange = useCallback(
    (field: RoleFilters["sortBy"]) => {
      onChange({
        ...filters,
        sortBy: field,
        sortAsc: filters.sortBy === field ? !filters.sortAsc : true,
      });
    },
    [filters, onChange],
  );

  const handleUserCountChange = useCallback(
    (range: [number, number]) => {
      onChange({ ...filters, userCountRange: range });
    },
    [filters, onChange],
  );

  return (
    <div
      className={cn(
        "bg-card border rounded-xl overflow-hidden transition-all duration-300",
        className,
      )}
    >
      {/* Main Search Bar - Always Visible */}
      <div className="p-4 border-b bg-muted/30">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
            <input
              type="text"
              placeholder="Search roles by name or description..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border rounded-lg focus-visible:ring-2 focus-visible:ring-ring transition-colors"
              aria-label="Search roles"
            />
            {filters.search && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background hover:bg-accent",
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
                className="size-2 rounded-full bg-primary"
                aria-label="Active filters"
              />
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={onClear}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-muted-foreground rounded-lg border hover:bg-accent hover:text-foreground transition-colors"
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
        <div className="p-4 space-y-4 border-t bg-muted/20">
          {/* Row 1: Type Filter & Permission Filter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="role-type"
                className="block text-sm font-medium text-muted-foreground mb-1.5"
              >
                Role Type
              </label>
              <select
                id="role-type"
                value={filters.type}
                onChange={(e) =>
                  handleTypeChange(e.target.value as RoleType | "all")
                }
                className="w-full px-3 py-2 text-sm bg-background border rounded-lg focus-visible:ring-2 focus-visible:ring-ring"
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
                className="block text-sm font-medium text-muted-foreground mb-1.5"
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
                className="w-full px-3 py-2 text-sm bg-background border rounded-lg focus-visible:ring-2 focus-visible:ring-ring"
              >
                {permissions.map((perm) => (
                  <option key={perm.value} value={perm.value}>
                    {perm.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: User Count Range */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
              User Count Range:{" "}
              <span className="font-normal text-foreground">
                {" "}
                {filters.userCountRange[0]} - {filters.userCountRange[1]}
              </span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                min="0"
                max="1000"
                value={filters.userCountRange[0]}
                onChange={(e) =>
                  handleUserCountChange([
                    parseInt(e.target.value) || 0,
                    filters.userCountRange[1],
                  ])
                }
                className="px-3 py-2 text-sm bg-background border rounded-lg focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Min"
                aria-label="Minimum user count"
              />
              <input
                type="number"
                min="0"
                max="1000"
                value={filters.userCountRange[1]}
                onChange={(e) =>
                  handleUserCountChange([
                    filters.userCountRange[0],
                    parseInt(e.target.value) || 1000,
                  ])
                }
                className="px-3 py-2 text-sm bg-background border rounded-lg focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Max"
                aria-label="Maximum user count"
              />
            </div>
          </div>

          {/* Row 3: Sort Options */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
              Sort By
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { key: "name", label: "Name", icon: Shield },
                { key: "users", label: "Users", icon: Users },
                { key: "permissions", label: "Permissions", icon: Key },
                { key: "created", label: "Created", icon: Copy },
                { key: "updated", label: "Updated", icon: SlidersHorizontal },
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() =>
                    handleSortChange(option.key as RoleFilters["sortBy"])
                  }
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border transition-colors",
                    filters.sortBy === option.key
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-accent",
                  )}
                  aria-pressed={filters.sortBy === option.key}
                >
                  <option.icon className="size-3.5" />
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
            <div className="pt-2 border-t flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">
                Active filters:
              </span>
              {filters.search && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                  <Search className="size-3" />"{filters.search}"
                  <button
                    onClick={() => handleSearchChange("")}
                    className="ml-1 hover:text-primary/70"
                    aria-label="Remove search filter"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              )}
              {filters.type !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                  <Shield className="size-3" />
                  {roleTypes.find((t) => t.value === filters.type)?.label}
                  <button
                    onClick={() => handleTypeChange("all")}
                    className="ml-1 hover:text-blue-700"
                    aria-label="Remove type filter"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              )}
              {filters.permission !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full">
                  <Key className="size-3" />
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
              {(filters.userCountRange[0] > 0 ||
                filters.userCountRange[1] < 1000) && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full">
                  <Users className="size-3" />
                  {filters.userCountRange[0]}–{filters.userCountRange[1]} users
                  <button
                    onClick={() => handleUserCountChange([0, 1000])}
                    className="ml-1 hover:text-violet-700"
                    aria-label="Remove user count filter"
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
