"use client";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  BarChart3,
  Bell,
  Building2,
  Calendar,
  ChevronRight,
  Clock,
  Copy,
  CreditCard,
  Database,
  Download,
  Edit,
  Eye,
  FileText,
  Globe,
  Key,
  Lock,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  MessageSquare,
  Monitor,
  RefreshCw,
  Server,
  Settings,
  Shield,
  Smartphone,
  Stethoscope,
  Tablet,
  Trash2,
  Upload,
  User,
  UserCheck,
  UserMinus,
  UserPlus,
  Users,
  UserX,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActionBadge,
  ModuleBadge,
  SeverityBadge,
  StatusBadge,
} from "./SeverityBadge";
import type {
  ActivityActionType,
  ActivityLog,
  ActivityModule,
  ActivitySeverity,
} from "./types";

interface ActivityTimelineProps {
  logs: ActivityLog[];
  selectedIds: Set<string>;
  onSelectionChange: (ids: Set<string>) => void;
  onRowClick: (log: ActivityLog) => void;
  className?: string;
  isLoading?: boolean;
}

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
  // Use Monitor for all browsers since specific browser icons aren't available
  return <Monitor className="h-4 w-4" />;
}

function getDeviceIcon(device: string) {
  const d = device.toLowerCase();
  if (d.includes("mobile") || d.includes("iphone") || d.includes("android"))
    return <Smartphone className="h-4 w-4" />;
  if (d.includes("tablet") || d.includes("ipad"))
    return <Tablet className="h-4 w-4" />;
  return <Monitor className="h-4 w-4" />;
}

function getSeverityColor(severity: ActivitySeverity) {
  const colors: Record<ActivitySeverity, string> = {
    info: "text-blue-500",
    warning: "text-amber-500",
    error: "text-red-500",
    critical: "text-red-700",
  };
  return colors[severity];
}

function getSeverityBg(severity: ActivitySeverity) {
  const colors: Record<ActivitySeverity, string> = {
    info: "bg-blue-500/10 border-blue-500/20",
    warning: "bg-amber-500/10 border-amber-500/20",
    error: "bg-red-500/10 border-red-500/20",
    critical: "bg-red-700/10 border-red-700/20",
  };
  return colors[severity];
}

function groupLogsByDate(logs: ActivityLog[]) {
  const groups: Record<string, ActivityLog[]> = {};
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  logs.forEach((log) => {
    const logDate = new Date(log.timestamp);
    const logDay = new Date(
      logDate.getFullYear(),
      logDate.getMonth(),
      logDate.getDate(),
    );

    let groupKey: string;
    if (logDay.getTime() === today.getTime()) {
      groupKey = "Today";
    } else if (logDay.getTime() === yesterday.getTime()) {
      groupKey = "Yesterday";
    } else {
      groupKey = format(logDate, "EEEE, MMMM d, yyyy");
    }

    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(log);
  });

  const groupOrder = ["Today", "Yesterday"];
  const otherGroups = Object.keys(groups)
    .filter((k) => !groupOrder.includes(k))
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return [...groupOrder.filter((g) => groups[g]), ...otherGroups].map(
    (key) => ({
      label: key,
      logs: groups[key],
    }),
  );
}

export function ActivityTimeline({
  logs,
  selectedIds,
  onSelectionChange,
  onRowClick,
  className,
  isLoading = false,
}: ActivityTimelineProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(["Today", "Yesterday"]),
  );

  const groupedLogs = useMemo(() => groupLogsByDate(logs), [logs]);

  const handleToggleGroup = (label: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const handleSelectAll = (groupLogs: ActivityLog[]) => {
    const groupIds = new Set(groupLogs.map((l) => l.id));
    const allSelected = groupLogs.every((l) => selectedIds.has(l.id));
    if (allSelected) {
      onSelectionChange(
        new Set([...selectedIds].filter((id) => !groupIds.has(id))),
      );
    } else {
      onSelectionChange(new Set([...selectedIds, ...groupIds]));
    }
  };

  if (isLoading) {
    return <ActivityTimelineSkeleton />;
  }

  if (logs.length === 0) {
    return (
      <div className="dash-card overflow-hidden">
        <div className="p-12 text-center">
          <Activity className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
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
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <Activity className="h-4 w-4" />
          <span>{logs.length} activities</span>
          <span className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-2" />
          <span>
            {groupedLogs.length} day{groupedLogs.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
        <AnimatePresence mode="popLayout">
          {groupedLogs.map((group, groupIndex) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: groupIndex * 0.05 }}
            >
              <TimelineGroup
                group={group}
                expanded={expandedGroups.has(group.label)}
                onToggle={() => handleToggleGroup(group.label)}
                selectedIds={selectedIds}
                onSelectAll={(logs) => handleSelectAll(logs)}
                onRowClick={onRowClick}
                onSelectionChange={onSelectionChange}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TimelineGroup({
  group,
  expanded,
  onToggle,
  selectedIds,
  onSelectAll,
  onRowClick,
  onSelectionChange,
}: {
  group: { label: string; logs: ActivityLog[] };
  expanded: boolean;
  onToggle: () => void;
  selectedIds: Set<string>;
  onSelectAll: (logs: ActivityLog[]) => void;
  onRowClick: (log: ActivityLog) => void;
  onSelectionChange: (ids: Set<string>) => void;
}) {
  const groupSelectedCount = group.logs.filter((l) =>
    selectedIds.has(l.id),
  ).length;
  const allSelected =
    groupSelectedCount === group.logs.length && group.logs.length > 0;
  const someSelected = groupSelectedCount > 0 && !allSelected;

  return (
    <div className="border-l-2 border-slate-200 dark:border-slate-700 pl-4">
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onToggle}
        className="w-full flex items-center gap-3 py-3 -ml-4 pl-4 pr-4 rounded-r-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        aria-expanded={expanded}
      >
        <motion.div
          animate={{ rotate: expanded ? 0 : -90 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-slate-400"
        >
          <ChevronRight className="h-5 w-5" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              {group.label}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              {group.logs.length}
            </span>
            {groupSelectedCount > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                {groupSelectedCount} selected
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <input
              ref={(el) => {
                if (el) el.indeterminate = someSelected;
              }}
              type="checkbox"
              checked={allSelected}
              onChange={() => onSelectAll(group.logs)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              aria-label={`Select all ${group.label} activities`}
            />
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Select all
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-xs font-mono">
            {group.logs[0]?.timestamp
              ? format(new Date(group.logs[0].timestamp), "HH:mm")
              : ""}
          </span>
          <span className="text-xs">–</span>
          <span className="text-xs font-mono">
            {group.logs[group.logs.length - 1]?.timestamp
              ? format(
                  new Date(group.logs[group.logs.length - 1].timestamp),
                  "HH:mm",
                )
              : ""}
          </span>
        </div>
      </motion.button>

      <AnimatePresence mode="popLayout">
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 space-y-2"
          >
            {group.logs.map((log, index) => (
              <TimelineItem
                key={log.id}
                log={log}
                index={index}
                isLast={index === group.logs.length - 1}
                selected={selectedIds.has(log.id)}
                onClick={() => onRowClick(log)}
                onSelect={(id) => {
                  const next = new Set(selectedIds);
                  if (next.has(id)) next.delete(id);
                  else next.add(id);
                  onSelectionChange(next);
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TimelineItem({
  log,
  index,
  isLast,
  selected,
  onClick,
  onSelect,
}: {
  log: ActivityLog;
  index: number;
  isLast: boolean;
  selected: boolean;
  onClick: () => void;
  onSelect: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2, delay: index * 0.02 }}
      className="relative"
    >
      <div
        className="absolute left-[-34px] top-2 w-0.5 h-full bg-slate-200 dark:bg-slate-700"
        style={{ height: isLast ? "1.5rem" : "100%" }}
      />
      <div
        className="absolute left-[-38px] top-2 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900"
        style={{ backgroundColor: getSeverityColor(log.severity) }}
      />

      <div
        className={cn(
          "pl-6 pb-6 last:pb-0 rounded-xl transition-all",
          selected &&
            "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500",
          log.severity === "critical" &&
            "border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-900/10",
        )}
        onClick={onClick}
      >
        <div className="flex items-start gap-4 p-4">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onSelect(log.id)}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 flex-shrink-0"
            aria-label={`Select ${log.user.name}`}
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <div className="flex items-center gap-1.5">
                {getActionIcon(log.action)}
                <ActionBadge action={log.action} size="sm" />
              </div>
              <div className="flex items-center gap-1.5">
                {getModuleIcon(log.module)}
                <ModuleBadge module={log.module} size="sm" />
              </div>
              <SeverityBadge severity={log.severity} size="sm" />
              <StatusBadge status={log.status} size="sm" />
            </div>

            <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
              {log.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <span>{log.user.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                <span className="truncate max-w-[180px]">{log.user.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                  {log.ipAddress}
                </code>
              </div>
              <div className="flex items-center gap-1.5">
                {getBrowserIcon(log.device?.browser || "")}
                <span className="truncate max-w-[120px]">
                  {log.device?.browser || "Unknown"}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {getDeviceIcon(log.device?.device || "desktop")}
                <span className="truncate max-w-[80px]">
                  {log.device?.device || "Unknown"}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <time dateTime={log.timestamp}>
                  {format(new Date(log.timestamp), "MMM d, yyyy HH:mm:ss")}
                </time>
              </div>
            </div>

            {log.location && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <MapPin className="h-3.5 w-3.5" />
                <span>
                  {log.location.city}, {log.location.country}
                </span>
              </div>
            )}

            {log.relatedEntities && log.relatedEntities.length > 0 && (
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Database className="h-3.5 w-3.5" />
                <span>
                  Related:{" "}
                  {log.relatedEntities
                    .map((e) => `${e.type}:${e.id}`)
                    .join(", ")}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="View details"
            >
              <Eye className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(JSON.stringify(log, null, 2));
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Copy JSON"
            >
              <Copy className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ActivityTimelineSkeleton() {
  return (
    <div className="dash-card overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
      </div>
      <div className="p-4 space-y-4">
        {Array.from({ length: 3 }).map((_, groupIndex) => (
          <motion.div
            key={groupIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.1 }}
          >
            <div className="h-10 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-3" />
            <div className="border-l-2 border-slate-200 dark:border-slate-700 pl-4">
              {Array.from({ length: 3 }).map((_, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: itemIndex * 0.05 }}
                  className="relative pl-6 pb-6 last:pb-0"
                >
                  <div
                    className="absolute left-[-34px] top-2 w-0.5 h-full bg-slate-200 dark:bg-slate-700"
                    style={{ height: itemIndex === 2 ? "1.5rem" : "100%" }}
                  />
                  <div className="absolute left-[-38px] top-2 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 bg-blue-500 animate-pulse" />
                  <div className="p-4 space-y-3">
                    <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    <div className="flex gap-4">
                      <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                      <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                      <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
