"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Search,
  Filter,
  X,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Table,
  List,
  AlertTriangle,
  Shield,
  Activity,
  Database,
} from "lucide-react";
import {
  ActivityLog,
  ActivityFilters,
  DEFAULT_ACTIVITY_FILTERS,
  ActivitySortField,
  ActivityModule,
  ActivityActionType,
  ActivitySeverity,
  ActivityStatus,
  UserRole,
} from "@/app/components/dashboard/activity-logs/types";
import {
  ActivityStats,
  ActivityToolbar,
  ActivityTable,
  ActivityTimeline,
  ActivityDrawer,
  ActivityFilters as ActivityFiltersComponent,
  LoadingSkeleton,
  StatsSkeleton,
  FiltersSkeleton,
  EmptyState,
} from "@/app/components/dashboard/activity-logs";
import { mockActivityLogs } from "@/app/components/dashboard/activity-logs/mock";
import { format } from "date-fns";

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<ActivityFilters>(
    DEFAULT_ACTIVITY_FILTERS,
  );
  const [viewMode, setViewMode] = useState<"table" | "timeline">("table");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [drawerLog, setDrawerLog] = useState<ActivityLog | null>(null);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    field: ActivitySortField;
    asc: boolean;
  }>({
    field: "timestamp",
    asc: false,
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLogs(mockActivityLogs);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort logs
  const filteredLogs = useMemo(() => {
    let result = [...logs];

    // Search
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (log) =>
          log.userName.toLowerCase().includes(search) ||
          log.userEmail.toLowerCase().includes(search) ||
          log.description.toLowerCase().includes(search) ||
          log.ipAddress.includes(search) ||
          log.module.toLowerCase().includes(search) ||
          log.action.toLowerCase().includes(search) ||
          log.id.toLowerCase().includes(search),
      );
    }

    // Multi-select filters
    if (filters.user.length > 0) {
      result = result.filter((log) => filters.user.includes(log.userName));
    }
    if (filters.role.length > 0) {
      result = result.filter((log) => filters.role.includes(log.userRole));
    }
    if (filters.module.length > 0) {
      result = result.filter((log) => filters.module.includes(log.module));
    }
    if (filters.action.length > 0) {
      result = result.filter((log) => filters.action.includes(log.action));
    }
    if (filters.severity.length > 0) {
      result = result.filter((log) => filters.severity.includes(log.severity));
    }
    if (filters.status.length > 0) {
      result = result.filter((log) => filters.status.includes(log.status));
    }

    // Date range
    if (filters.dateFrom) {
      const from = new Date(filters.dateFrom);
      from.setHours(0, 0, 0, 0);
      result = result.filter((log) => new Date(log.timestamp) >= from);
    }
    if (filters.dateTo) {
      const to = new Date(filters.dateTo);
      to.setHours(23, 59, 59, 999);
      result = result.filter((log) => new Date(log.timestamp) <= to);
    }

    // IP address
    if (filters.ipAddress) {
      result = result.filter((log) =>
        log.ipAddress.includes(filters.ipAddress),
      );
    }

    // Sort
    result.sort((a, b) => {
      let aVal: any = a[sortConfig.field];
      let bVal: any = b[sortConfig.field];

      if (sortConfig.field === "timestamp") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortConfig.asc ? -1 : 1;
      if (aVal > bVal) return sortConfig.asc ? 1 : -1;
      return 0;
    });

    return result;
  }, [logs, filters, sortConfig]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;
  const totalPages = Math.ceil(filteredLogs.length / pageSize);
  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLogs.slice(start, start + pageSize);
  }, [filteredLogs, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleFiltersChange = useCallback((newFilters: ActivityFilters) => {
    setFilters(newFilters);
  }, []);

  const handleSort = useCallback((field: ActivitySortField) => {
    setSortConfig((prev) => ({
      field,
      asc: prev.field === field ? !prev.asc : true,
    }));
  }, []);

  const handleRowClick = useCallback((log: ActivityLog) => {
    setDrawerLog(log);
  }, []);

  const handleSelectionChange = useCallback((ids: Set<string>) => {
    setSelectedIds(ids);
  }, []);

  const handleExport = useCallback(() => {
    const data =
      selectedIds.size > 0
        ? paginatedLogs.filter((l) => selectedIds.has(l.id))
        : paginatedLogs;

    const csv = [
      [
        "Timestamp",
        "User",
        "Email",
        "Role",
        "Module",
        "Action",
        "Description",
        "IP",
        "Browser",
        "Device",
        "Status",
        "Severity",
      ].join(","),
      ...data.map((log) =>
        [
          format(new Date(log.timestamp), "yyyy-MM-dd HH:mm:ss"),
          log.userName,
          log.userEmail,
          log.userRole,
          log.module,
          log.action,
          `"${log.description.replace(/"/g, '""')}"`,
          log.ipAddress,
          log.browser,
          log.device,
          log.status,
          log.severity,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `activity-logs-${format(new Date(), "yyyy-MM-dd-HHmmss")}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }, [paginatedLogs, selectedIds]);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setLogs(mockActivityLogs);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_ACTIVITY_FILTERS);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setDrawerLog(null);
  }, []);

  const handleDrawerExport = useCallback((log: ActivityLog) => {
    const json = JSON.stringify(log, null, 2);
    const blob = new Blob([json], { type: "application/json;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `activity-log-${log.id}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  }, []);

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
    <div className="dash-container">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Activity className="h-7 w-7 text-blue-600" />
              Activity Logs
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Audit trail of all system activities, security events, and user
              actions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRefresh}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700 disabled:opacity-50"
            >
              <RefreshCw
                className={cn("h-4 w-4", isLoading && "animate-spin")}
              />
              Refresh
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </motion.button>
          </div>
        </div>

        {/* Stats Cards */}
        <ActivityStats logs={logs} />
      </motion.div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Filter Sidebar */}
        <AnimatePresence mode="wait">
          {filterPanelOpen && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="lg:hidden fixed inset-y-0 left-0 z-40 w-80 bg-white dark:bg-slate-900 shadow-xl overflow-y-auto"
            >
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Filters
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setFilterPanelOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
              <ActivityFiltersComponent
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClose={() => setFilterPanelOpen(false)}
                onExport={handleExport}
                onReset={handleResetFilters}
              />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Overlay for mobile filter panel */}
        {filterPanelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-30 bg-black/50"
            onClick={() => setFilterPanelOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 lg:pl-0">
          {/* Toolbar */}
          <ActivityToolbar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            selectedCount={selectedIds.size}
            onToggleFilterPanel={() => setFilterPanelOpen(true)}
            filterPanelOpen={filterPanelOpen}
            onExport={handleExport}
            onRefresh={handleRefresh}
          />

          {/* Table / Timeline View */}
          <AnimatePresence mode="wait">
            {viewMode === "table" ? (
              <motion.div
                key="table"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <ActivityTable
                  logs={paginatedLogs}
                  sortBy={sortConfig.field}
                  sortAsc={sortConfig.asc}
                  onSort={handleSort}
                  selectedIds={selectedIds}
                  onSelectionChange={handleSelectionChange}
                  onRowClick={handleRowClick}
                  onExport={handleExport}
                  isLoading={isLoading}
                />
              </motion.div>
            ) : (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <ActivityTimeline
                  logs={filteredLogs}
                  selectedIds={selectedIds}
                  onSelectionChange={handleSelectionChange}
                  onRowClick={handleRowClick}
                  isLoading={isLoading}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination (Table view only) */}
          {viewMode === "table" && totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center justify-center gap-2"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed dark:border-slate-700 dark:hover:bg-slate-800"
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <motion.button
                      key={pageNum}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentPage(pageNum)}
                      className={cn(
                        "w-10 h-10 rounded-xl font-medium text-sm transition-colors",
                        currentPage === pageNum
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800",
                      )}
                    >
                      {pageNum}
                    </motion.button>
                  );
                })}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed dark:border-slate-700 dark:hover:bg-slate-800"
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </motion.div>
          )}

          {/* Results Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-sm text-slate-500 dark:text-slate-400 text-center"
          >
            Showing {paginatedLogs.length} of {filteredLogs.length} activities
            {hasActiveFilters && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                Filtered
              </span>
            )}
          </motion.div>
        </div>
      </div>

      {/* Detail Drawer */}
      <ActivityDrawer
        log={drawerLog}
        open={!!drawerLog}
        onClose={handleDrawerClose}
        onExport={handleDrawerExport}
      />
    </div>
  );
}
