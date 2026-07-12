"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ChevronUpDown,
  ChevronUp,
  ChevronDown,
  Eye,
  Copy,
  Download,
  MoreHorizontal,
  User,
  Globe,
  Smartphone,
  Monitor,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  Activity,
  Database,
  Mail,
  Bell,
  Settings,
  Users,
  Stethoscope,
  Building2,
  FileText,
  MessageSquare,
  CreditCard,
  BarChart3,
  Server,
  Lock,
  Unlock,
  LogIn,
  LogOut,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  RefreshCw,
  Zap,
  Key,
  Upload,
  Calendar,
  Tablet,
} from "lucide-react";
import type {
  ActivityLog,
  ActivitySeverity,
  ActivityStatus,
  ActivityActionType,
  ActivityModule,
} from "./types";
import {
  SeverityBadge,
  StatusBadge,
  ActionBadge,
  ModuleBadge,
  RoleBadge,
} from "./SeverityBadge";
import { formatDistanceToNow, format } from "date-fns";

interface ActivityTableProps {
  logs: ActivityLog[];
  sortBy: string;
  sortAsc: boolean;
  onSort: (field: string) => void;
  selectedIds: Set<string>;
  onSelectionChange: (ids: Set<string>) => void;
  onRowClick: (log: ActivityLog) => void;
  onExport?: (logs: ActivityLog[]) => void;
  className?: string;
  isLoading?: boolean;
}

const COLUMN_DEFS = [
  { key: "timestamp", label: "Timestamp", width: "w-36", sortable: true },
  { key: "user", label: "User", width: "w-48", sortable: true },
  { key: "role", label: "Role", width: "w-28", sortable: true },
  { key: "module", label: "Module", width: "w-28", sortable: true },
  { key: "action", label: "Action", width: "w-32", sortable: true },
  {
    key: "description",
    label: "Description",
    width: "flex-1 min-w-[200px]",
    sortable: false,
  },
  { key: "ip", label: "IP Address", width: "w-32", sortable: true },
  { key: "browser", label: "Browser", width: "w-28", sortable: false },
  { key: "device", label: "Device", width: "w-24", sortable: false },
  { key: "status", label: "Status", width: "w-24", sortable: true },
  { key: "actions", label: "", width: "w-20", sortable: false },
] as const;

function getActionIcon(action: ActivityActionType) {
  const icons: Record<ActivityActionType, React.ReactNode> = {
    create: <UserPlus className="h-4 w-4 text-emerald-600" />,
    read: <Eye className="h-4 w-4 text-blue-600" />,
    update: <Edit className="h-4 w-4 text-amber-600" />,
    delete: <Trash2 className="h-4 w-4 text-red-600" />,
    login: <LogIn className="h-4 w-4 text-purple-600" />,
    logout: <LogOut className="h-4 w-4 text-slate-600" />,
    export: <Download className="h-4 w-4 text-indigo-600" />,
    import: <Upload className="h-4 w-4 text-teal-600" />,
    approve: <UserCheck className="h-4 w-4 text-emerald-600" />,
    reject: <UserX className="h-4 w-4 text-red-600" />,
    assign: <UserPlus className="h-4 w-4 text-blue-600" />,
    revoke: <UserMinus className="h-4 w-4 text-amber-600" />,
    backup: <Database className="h-4 w-4 text-slate-600" />,
    restore: <RefreshCw className="h-4 w-4 text-purple-600" />,
    config_change: <Settings className="h-4 w-4 text-orange-600" />,
    security_alert: <Shield className="h-4 w-4 text-red-600" />,
    failed_login: <Lock className="h-4 w-4 text-red-600" />,
    password_change: <Key className="h-4 w-4 text-amber-600" />,
    role_change: <Users className="h-4 w-4 text-purple-600" />,
    permission_change: <Shield className="h-4 w-4 text-indigo-600" />,
    system_error: <AlertCircle className="h-4 w-4 text-red-600" />,
    api_call: <Zap className="h-4 w-4 text-blue-600" />,
  };
  return icons[action] || <Activity className="h-4 w-4 text-slate-600" />;
}

function getModuleIcon(module: ActivityModule) {
  const icons: Record<ActivityModule, React.ReactNode> = {
    Authentication: <Lock className="h-4 w-4" />,
    Users: <Users className="h-4 w-4" />,
    Patients: <User className="h-4 w-4" />,
    Appointments: <Calendar className="h-4 w-4" />,
    Doctors: <Stethoscope className="h-4 w-4" />,
    Departments: <Building2 className="h-4 w-4" />,
    Articles: <FileText className="h-4 w-4" />,
    Messages: <MessageSquare className="h-4 w-4" />,
    Notifications: <Bell className="h-4 w-4" />,
    Settings: <Settings className="h-4 w-4" />,
    Security: <Shield className="h-4 w-4" />,
    System: <Server className="h-4 w-4" />,
    Billing: <CreditCard className="h-4 w-4" />,
    Reports: <BarChart3 className="h-4 w-4" />,
  };
  return icons[module] || <Database className="h-4 w-4" />;
}

function getBrowserIcon(browser: string) {
  const b = browser.toLowerCase();
  if (b.includes("chrome"))
    return <Monitor className="h-4 w-4 text-blue-600" />;
  if (b.includes("firefox"))
    return <Monitor className="h-4 w-4 text-orange-600" />;
  if (b.includes("safari"))
    return <Monitor className="h-4 w-4 text-emerald-600" />;
  if (b.includes("edge"))
    return <Monitor className="h-4 w-4 text-purple-600" />;
  return <Monitor className="h-4 w-4 text-slate-600" />;
}

function getDeviceIcon(device: string) {
  const d = device.toLowerCase();
  if (d.includes("mobile") || d.includes("iphone") || d.includes("android"))
    return <Smartphone className="h-4 w-4" />;
  if (d.includes("tablet") || d.includes("ipad"))
    return <Tablet className="h-4 w-4" />;
  return <Monitor className="h-4 w-4" />;
}

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ActivityTable({
  logs,
  sortBy,
  sortAsc,
  onSort,
  selectedIds,
  onSelectionChange,
  onRowClick,
  onExport,
  className,
  isLoading = false,
}: ActivityTableProps) {
  const [sortConfig, setSortConfig] = useState<{ key: string; asc: boolean }>({
    key: sortBy,
    asc: sortAsc,
  });

  const handleSort = useCallback(
    (key: string) => {
      const asc = sortConfig.key === key ? !sortConfig.asc : true;
      setSortConfig({ key, asc });
      onSort(key);
    },
    [sortConfig, onSort],
  );

  const handleSelectAll = useCallback(() => {
    if (selectedIds.size === logs.length) {
      onSelectionChange(new Set());
    } else {
      onSelectionChange(new Set(logs.map((l) => l.id)));
    }
  }, [logs, selectedIds, onSelectionChange]);

  const handleSelectOne = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const next = new Set(selectedIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      onSelectionChange(next);
    },
    [selectedIds, onSelectionChange],
  );

  if (isLoading) {
    return <ActivityTableSkeleton />;
  }

  if (logs.length === 0) {
    return (
      <div className="dash-card overflow-hidden">
        <div className="p-12 text-center">
          <Database className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">
            No activity logs found
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            Try adjusting your filters or search terms.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("dash-card overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full" role="grid">
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left"
                style={{ width: "40px" }}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.size === logs.length && logs.length > 0}
                  indeterminate={
                    selectedIds.size > 0 && selectedIds.size < logs.length
                  }
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  aria-label="Select all rows"
                />
              </th>
              {COLUMN_DEFS.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider",
                    col.width,
                    col.sortable &&
                      "cursor-pointer hover:text-slate-700 dark:hover:text-slate-200 select-none",
                  )}
                  style={{
                    minWidth:
                      col.width.replace("w-", "").replace("min-w-", "") + "px",
                  }}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  aria-sort={
                    sortConfig.key === col.key
                      ? sortConfig.asc
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && sortConfig.key === col.key && (
                      <motion.span
                        initial={{
                          opacity: 0,
                          rotate: sortConfig.asc ? -90 : 90,
                        }}
                        animate={{ opacity: 1, rotate: 0 }}
                        className="text-blue-600 dark:text-blue-400"
                      >
                        {sortConfig.asc ? (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" />
                        )}
                      </motion.span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            <AnimatePresence mode="popLayout">
              {logs.map((log, index) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  className={cn(
                    "hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer",
                    selectedIds.has(log.id) && "bg-blue-50 dark:bg-blue-900/20",
                    log.severity === "critical" &&
                      "border-l-4 border-l-red-500",
                  )}
                  onClick={() => onRowClick(log)}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(log.id)}
                      onChange={(e) => handleSelectOne(log.id, e as any)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      aria-label={`Select ${log.userName}`}
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <time
                        dateTime={log.timestamp}
                        className="text-sm font-mono text-slate-900 dark:text-white"
                      >
                        {format(new Date(log.timestamp), "MMM d, HH:mm:ss")}
                      </time>
                      <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:inline">
                        (
                        {formatDistanceToNow(new Date(log.timestamp), {
                          addSuffix: true,
                        })}
                        )
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {log.userName}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {log.userEmail}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <RoleBadge role={log.userRole} size="sm" variant="soft" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 dark:text-slate-500">
                        {getModuleIcon(log.module)}
                      </span>
                      <ModuleBadge
                        module={log.module}
                        size="sm"
                        variant="soft"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getActionIcon(log.action)}
                      <ActionBadge
                        action={log.action}
                        size="sm"
                        variant="soft"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p
                      className="text-sm text-slate-700 dark:text-slate-300 max-w-xs truncate"
                      title={log.description}
                    >
                      {log.description}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-sm font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {log.ipAddress}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                      {getBrowserIcon(log.browser)}
                      <span className="truncate max-w-[100px]">
                        {log.browser}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                      {getDeviceIcon(log.device)}
                      <span className="truncate max-w-[80px]">
                        {log.device}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={log.status} size="sm" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onRowClick(log);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(
                            JSON.stringify(log, null, 2),
                          );
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Copy JSON"
                      >
                        <Copy className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination would go here */}
      <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing {logs.length} of {logs.length} activities
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 disabled:opacity-40">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            1
          </button>
          <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 disabled:opacity-40">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ActivityTableSkeleton() {
  return (
    <div className="dash-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-4 py-3 text-left w-10"></th>
              {COLUMN_DEFS.map((col) => (
                <th
                  key={col.key}
                  className={cn("px-4 py-3 text-left", col.width)}
                >
                  <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {Array.from({ length: 8 }).map((_, i) => (
              <tr key={i}>
                <td className="px-4 py-3">
                  <div className="h-4 w-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
