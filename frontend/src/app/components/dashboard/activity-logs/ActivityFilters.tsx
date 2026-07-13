"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowUpDown,
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  Filter,
  List,
  RefreshCw,
  Search,
  Shield,
  Table,
  User,
  Wifi,
  X,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import {
  ActionBadge,
  ModuleBadge,
  RoleBadge,
  SeverityBadge,
  StatusBadge,
} from "./SeverityBadge";
import type {
  ActivityActionType,
  ActivityFilters,
  ActivityModule,
  ActivitySeverity,
  ActivitySortField,
  ActivityStatus,
} from "./types";
import {
  ACTION_TYPE_OPTIONS,
  DEFAULT_ACTIVITY_FILTERS,
  MODULE_OPTIONS,
  ROLE_OPTIONS,
  SEVERITY_OPTIONS,
  SORT_FIELD_OPTIONS,
  STATUS_OPTIONS,
} from "./types";

interface ActivityFiltersProps {
  filters: ActivityFilters;
  onFiltersChange: (filters: ActivityFilters) => void;
  open?: boolean;
  onClose?: () => void;
  onExport?: () => void;
  onReset?: () => void;
  className?: string;
}

const MULTI_SELECT_OPTIONS = [
  {
    key: "user",
    label: "User",
    options: [] as { value: string; label: string }[],
  },
  {
    key: "role",
    label: "Role",
    options: ROLE_OPTIONS.map((r) => ({ value: r, label: r })),
  },
  {
    key: "module",
    label: "Module",
    options: MODULE_OPTIONS.map((m) => ({ value: m, label: m })),
  },
  {
    key: "action",
    label: "Action",
    options: ACTION_TYPE_OPTIONS.map((a) => ({
      value: a,
      label: a.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    })),
  },
  {
    key: "severity",
    label: "Severity",
    options: SEVERITY_OPTIONS.map((s) => ({
      value: s,
      label: s.charAt(0).toUpperCase() + s.slice(1),
    })),
  },
  {
    key: "status",
    label: "Status",
    options: STATUS_OPTIONS.map((s) => ({
      value: s,
      label: s.charAt(0).toUpperCase() + s.slice(1),
    })),
  },
] as const;

export function ActivityFilters({
  filters,
  onFiltersChange,
  open = true,
  onClose,
  onExport,
  onReset,
  className,
}: ActivityFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["search", "core", "advanced"]),
  );
  const [searchInput, setSearchInput] = useState(filters.search);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.search ||
      filters.user.length > 0 ||
      filters.role.length > 0 ||
      filters.module.length > 0 ||
      filters.action.length > 0 ||
      filters.severity.length > 0 ||
      filters.status.length > 0 ||
      filters.dateFrom ||
      filters.dateTo ||
      filters.ipAddress
    );
  }, [filters]);

  const toggleSection = useCallback((section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  }, []);

  const toggleMultiSelect = useCallback(
    (key: keyof ActivityFilters, value: string) => {
      const arr = filters[key] as string[];
      onFiltersChange({
        ...filters,
        [key]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      } as ActivityFilters);
    },
    [filters, onFiltersChange],
  );

  const clearMultiSelect = useCallback(
    (key: keyof ActivityFilters) => {
      onFiltersChange({ ...filters, [key]: [] } as ActivityFilters);
    },
    [filters, onFiltersChange],
  );

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onFiltersChange({ ...filters, search: searchInput });
    },
    [filters, onFiltersChange, searchInput],
  );

  const handleDateChange = useCallback(
    (field: "dateFrom" | "dateTo", value: string) => {
      onFiltersChange({ ...filters, [field]: value });
    },
    [filters, onFiltersChange],
  );

  const handleIpChange = useCallback(
    (value: string) => {
      onFiltersChange({ ...filters, ipAddress: value });
    },
    [filters, onFiltersChange],
  );

  const handleSortChange = useCallback(
    (field: ActivitySortField) => {
      onFiltersChange({
        ...filters,
        sortBy: field,
        sortAsc: filters.sortBy === field ? !filters.sortAsc : true,
      });
    },
    [filters, onFiltersChange],
  );

  const handleReset = useCallback(() => {
    onFiltersChange(DEFAULT_ACTIVITY_FILTERS);
    setSearchInput("");
    if (onReset) onReset();
  }, [onFiltersChange, onReset]);

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={cn(
        "dash-card hidden lg:block w-80 flex-shrink-0 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto",
        className,
      )}
    >
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Filters
          </h3>
          {hasActiveFilters && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              className="text-xs text-dash-primary hover:text-dash-primary dark:text-accent font-medium flex items-center gap-1"
            >
              <X className="h-3.5 w-3.5" />
              Clear all
            </motion.button>
          )}
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search activities..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
          />
        </form>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        <AnimatePresence mode="wait">
          {expandedSections.has("core") && (
            <motion.div
              key="core"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <FilterSection
                title="Module"
                icon={Activity}
                items={MODULE_OPTIONS.map((m) => ({ value: m, label: m }))}
                selected={filters.module}
                onToggle={(v) => toggleMultiSelect("module", v)}
                renderBadge={(m) => (
                  <ModuleBadge module={m as ActivityModule} size="sm" />
                )}
              />
              <FilterSection
                title="Action"
                icon={Activity}
                items={ACTION_TYPE_OPTIONS.map((a) => ({ value: a, label: a }))}
                selected={filters.action}
                onToggle={(v) => toggleMultiSelect("action", v)}
                renderBadge={(a) => (
                  <ActionBadge action={a as ActivityActionType} size="sm" />
                )}
              />
              <FilterSection
                title="Severity"
                icon={AlertTriangle}
                items={SEVERITY_OPTIONS.map((s) => ({ value: s, label: s }))}
                selected={filters.severity}
                onToggle={(v) => toggleMultiSelect("severity", v)}
                renderBadge={(s) => (
                  <SeverityBadge severity={s as ActivitySeverity} size="sm" />
                )}
              />
              <FilterSection
                title="Status"
                icon={Shield}
                items={STATUS_OPTIONS.map((s) => ({ value: s, label: s }))}
                selected={filters.status}
                onToggle={(v) => toggleMultiSelect("status", v)}
                renderBadge={(s) => (
                  <StatusBadge status={s as ActivityStatus} size="sm" />
                )}
              />
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {expandedSections.has("advanced") && (
              <motion.div
                key="advanced"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <FilterSection
                  title="Role"
                  icon={Shield}
                  items={ROLE_OPTIONS.map((r) => ({ value: r, label: r }))}
                  selected={filters.role}
                  onToggle={(v) => toggleMultiSelect("role", v)}
                  renderBadge={(r) => (
                    <RoleBadge role={r} size="sm" variant="soft" />
                  )}
                />
                <FilterSection
                  title="User"
                  icon={User}
                  items={[]}
                  selected={filters.user}
                  onToggle={(v) => toggleMultiSelect("user", v)}
                  renderBadge={(u) => (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">
                      {u}
                    </span>
                  )}
                  customRender={(item) => (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.user.includes(item.value)}
                        onChange={() => toggleMultiSelect("user", item.value)}
                        className="h-4 w-4 rounded border-slate-300 accent-dash-primary focus:ring-dash-primary"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {item.label}
                      </span>
                    </label>
                  )}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            key="date"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700"
          >
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              Date Range
            </h4>
            <div className="grid gap-2 sm:grid-cols-2">
              <div>
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                  From
                </label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleDateChange("dateFrom", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                  To
                </label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleDateChange("dateTo", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            key="ip"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700"
          >
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Wifi className="h-3.5 w-3.5" />
              IP Address
            </h4>
            <input
              type="text"
              value={filters.ipAddress}
              onChange={(e) => handleIpChange(e.target.value)}
              placeholder="e.g., 192.168.1.1"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer actions */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
        {onExport && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onExport}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleReset}
          disabled={!hasActiveFilters}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-dash-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-dash-primary-dark hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <RefreshCw className="h-4 w-4" />
          Reset Filters
        </motion.button>
      </div>
    </motion.aside>
  );
}

function FilterSection({
  title,
  icon: Icon,
  items,
  selected,
  onToggle,
  renderBadge,
  customRender,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: readonly { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
  renderBadge: (value: string) => React.ReactNode;
  customRender?: (item: { value: string; label: string }) => React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(items.length > 5);

  const displayItems = expanded ? items : items.slice(0, 5);
  const hasMore = items.length > 5;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Icon className="h-3.5 w-3.5" />
          {title}
          {selected.length > 0 && (
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-dash-primary-light text-dash-primary dark:bg-teal-900/30 dark:text-accent">
              {selected.length}
            </span>
          )}
        </h4>
        {hasMore && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setExpanded(!expanded)}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            aria-label={expanded ? "Show less" : "Show more"}
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </motion.button>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {displayItems.map((item) => (
          <motion.span
            key={item.value}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
            className="cursor-pointer"
            onClick={() => onToggle(item.value)}
          >
            {customRender ? customRender(item) : renderBadge(item.value)}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/** Toolbar component for the main content area */
export function ActivityToolbar({
  filters,
  onFiltersChange,
  viewMode,
  onViewModeChange,
  selectedCount,
  onToggleFilterPanel,
  filterPanelOpen,
  onExport,
  onRefresh,
  className,
}: {
  filters: ActivityFilters;
  onFiltersChange: (filters: ActivityFilters) => void;
  viewMode: "table" | "timeline";
  onViewModeChange: (mode: "table" | "timeline") => void;
  selectedCount: number;
  onToggleFilterPanel: () => void;
  filterPanelOpen: boolean;
  onExport?: () => void;
  onRefresh?: () => void;
  className?: string;
}) {
  const hasActiveFilters = useMemo(() => {
    return (
      filters.search ||
      filters.user.length > 0 ||
      filters.role.length > 0 ||
      filters.module.length > 0 ||
      filters.action.length > 0 ||
      filters.severity.length > 0 ||
      filters.status.length > 0 ||
      filters.dateFrom ||
      filters.dateTo ||
      filters.ipAddress
    );
  }, [filters]);

  return (
    <div
      className={cn(
        "dash-card p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between",
        className,
      )}
    >
      {/* View mode & sort */}
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
          {["table", "timeline"].map((mode) => (
            <motion.button
              key={mode}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onViewModeChange(mode as "table" | "timeline")}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-all",
                viewMode === mode
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
              )}
              aria-pressed={viewMode === mode}
            >
              {mode === "table" ? (
                <>
                  <Table className="h-4 w-4" />
                  <span className="hidden sm:inline">Table</span>
                </>
              ) : (
                <>
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">Timeline</span>
                </>
              )}
            </motion.button>
          ))}
        </div>

        <div className="relative">
          <select
            value={`${filters.sortBy},${filters.sortAsc ? "asc" : "desc"}`}
            onChange={(e) => {
              const [field, dir] = e.target.value.split(",");
              onFiltersChange({
                ...filters,
                sortBy: field as ActivitySortField,
                sortAsc: dir === "asc",
              });
            }}
            className="appearance-none pl-10 pr-8 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 cursor-pointer"
          >
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            {SORT_FIELD_OPTIONS.map((opt) => (
              <option key={opt.value} value={`${opt.value},asc`}>
                {opt.label} â†‘
              </option>
            ))}
            {SORT_FIELD_OPTIONS.map((opt) => (
              <option key={`${opt.value}-desc`} value={`${opt.value},desc`}>
                {opt.label} â†“
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        {selectedCount > 0 && (
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {selectedCount} selected
          </span>
        )}

        {hasActiveFilters && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onFiltersChange(DEFAULT_ACTIVITY_FILTERS)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700 transition-all hover:border-amber-300 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
          >
            <Filter className="h-3.5 w-3.5" />
            Clear filters
          </motion.button>
        )}

        {onRefresh && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRefresh}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </motion.button>
        )}

        {onExport && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onExport}
            className="inline-flex items-center gap-1.5 rounded-xl bg-dash-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-dash-primary-dark hover:shadow-md"
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onToggleFilterPanel}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all lg:hidden",
            filterPanelOpen
              ? "bg-dash-primary text-white shadow-sm"
              : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700",
          )}
        >
          <Filter className="h-3.5 w-3.5" />
          Filters
        </motion.button>
      </div>
    </div>
  );
}
