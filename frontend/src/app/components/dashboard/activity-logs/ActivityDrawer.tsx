"use client";

import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  BarChart3,
  Bell,
  Building2,
  Calendar,
  CheckCircle,
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
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  ActionBadge,
  ModuleBadge,
  RoleBadge,
  SeverityBadge,
  StatusBadge,
} from "./SeverityBadge";
import type {
  ActivityActionType,
  ActivityLog,
  ActivityModule,
  ActivitySeverity,
  ActivityStatus,
} from "./types";

interface ActivityDrawerProps {
  log: ActivityLog | null;
  open: boolean;
  onClose: () => void;
  onExport?: (log: ActivityLog) => void;
  className?: string;
}

function getActionIcon(action: ActivityActionType) {
  const icons: Record<ActivityActionType, React.ReactNode> = {
    create: <UserPlus className="h-5 w-5 text-emerald-600" />,
    read: <Eye className="h-5 w-5 text-dash-primary" />,
    update: <Edit className="h-5 w-5 text-amber-600" />,
    delete: <Trash2 className="h-5 w-5 text-red-600" />,
    login: <LogIn className="h-5 w-5 text-purple-600" />,
    logout: <LogOut className="h-5 w-5 text-slate-600" />,
    export: <Download className="h-5 w-5 text-indigo-600" />,
    import: <Upload className="h-5 w-5 text-teal-600" />,
    approve: <UserCheck className="h-5 w-5 text-emerald-600" />,
    reject: <UserX className="h-5 w-5 text-red-600" />,
    assign: <UserPlus className="h-5 w-5 text-dash-primary" />,
    revoke: <UserMinus className="h-5 w-5 text-amber-600" />,
    backup: <Database className="h-5 w-5 text-slate-600" />,
    restore: <RefreshCw className="h-5 w-5 text-purple-600" />,
    config_change: <Settings className="h-5 w-5 text-orange-600" />,
    security_alert: <Shield className="h-5 w-5 text-red-600" />,
    failed_login: <Lock className="h-5 w-5 text-red-600" />,
    password_change: <Key className="h-5 w-5 text-amber-600" />,
    role_change: <Users className="h-5 w-5 text-purple-600" />,
    permission_change: <Shield className="h-5 w-5 text-indigo-600" />,
    system_error: <AlertCircle className="h-5 w-5 text-red-600" />,
    api_call: <Zap className="h-5 w-5 text-dash-primary" />,
  };
  return icons[action] || <Activity className="h-5 w-5 text-slate-600" />;
}

function getModuleIcon(module: ActivityModule) {
  const icons: Record<ActivityModule, React.ReactNode> = {
    Authentication: <Lock className="h-5 w-5" />,
    Users: <Users className="h-5 w-5" />,
    Patients: <User className="h-5 w-5" />,
    Appointments: <Calendar className="h-5 w-5" />,
    Doctors: <Stethoscope className="h-5 w-5" />,
    Departments: <Building2 className="h-5 w-5" />,
    Articles: <FileText className="h-5 w-5" />,
    Messages: <MessageSquare className="h-5 w-5" />,
    Notifications: <Bell className="h-5 w-5" />,
    Settings: <Settings className="h-5 w-5" />,
    Security: <Shield className="h-5 w-5" />,
    System: <Server className="h-5 w-5" />,
    Billing: <CreditCard className="h-5 w-5" />,
    Reports: <BarChart3 className="h-5 w-5" />,
  };
  return icons[module] || <Database className="h-5 w-5" />;
}

function getBrowserIcon(browser: string) {
  const b = browser.toLowerCase();
  if (b.includes("chrome"))
    return <Monitor className="h-4 w-4 text-dash-primary" />;
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

function getSeverityColor(severity: ActivitySeverity) {
  const colors: Record<ActivitySeverity, string> = {
    info: "bg-dash-primary",
    warning: "bg-amber-500",
    error: "bg-red-500",
    critical: "bg-red-700",
  };
  return colors[severity];
}

function getSeverityLabel(severity: ActivitySeverity) {
  const labels: Record<ActivitySeverity, string> = {
    info: "Informational",
    warning: "Warning",
    error: "Error",
    critical: "Critical",
  };
  return labels[severity];
}

function getStatusLabel(status: ActivityStatus) {
  const labels: Record<ActivityStatus, string> = {
    success: "Success",
    failed: "Failed",
    pending: "Pending",
    blocked: "Blocked",
  };
  return labels[status];
}

function JsonViewer({
  data,
  title,
  collapsed = true,
}: {
  data: unknown;
  title: string;
  collapsed?: boolean;
}) {
  const [expanded, setExpanded] = useState(!collapsed);

  const jsonString = useMemo(() => JSON.stringify(data, null, 2), [data]);

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      <motion.button
        whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-left"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: expanded ? 0 : -90 }}
            transition={{ duration: 0.2 }}
            className="text-slate-500"
          >
            <ChevronRight className="h-4 w-4" />
          </motion.div>
          <span className="font-medium text-slate-900 dark:text-white">
            {title}
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 font-mono">
            {jsonString.length} chars
          </span>
        </div>
        <kbd className="px-2 py-1 text-xs bg-slate-200 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-400">
          {expanded ? "Collapse" : "Expand"}
        </kbd>
      </motion.button>

      <AnimatePresence mode="wait">
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 max-h-96 overflow-auto bg-white dark:bg-slate-900"
          >
            <pre className="text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-words">
              {jsonString}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DetailRow({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 py-3 border-b border-slate-100 dark:border-slate-800 last:border-0",
        className,
      )}
    >
      <dt className="flex-shrink-0 w-32 text-sm font-medium text-slate-500 dark:text-slate-400">
        {label}
      </dt>
      <dd className="flex-1 text-sm text-slate-900 dark:text-white">
        {children}
      </dd>
    </div>
  );
}

function DetailSection({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {title}
      </h4>
      <div className="bg-slate-50/50 dark:bg-slate-800/50 rounded-xl p-4 space-y-3">
        {children}
      </div>
    </div>
  );
}

export function ActivityDrawer({
  log,
  open,
  onClose,
  onExport,
  className,
}: ActivityDrawerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (log) {
      navigator.clipboard.writeText(JSON.stringify(log, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!log || !open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className={cn(
            "relative z-50 w-full max-w-4xl h-full bg-white dark:bg-slate-900 flex flex-col shadow-2xl",
            className,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div
                className={cn(
                  "flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center",
                  `bg-${getSeverityColor(log.severity).replace("bg-", "")}/10`,
                )}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getSeverityColor(log.severity) }}
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3
                    id="drawer-title"
                    className="text-lg font-semibold text-slate-900 dark:text-white truncate"
                  >
                    {log.description}
                  </h3>
                  <ActionBadge action={log.action} size="md" />
                  <ModuleBadge module={log.module} size="md" />
                  <SeverityBadge severity={log.severity} size="md" />
                  <StatusBadge status={log.status} size="md" />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {log.user.name} â€¢ {log.user.email} â€¢ {log.module} /{" "}
                  {log.action.replace("_", " ")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCopy}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Copy JSON"
              >
                {copied ? (
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </motion.button>
              {onExport && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onExport(log)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Export"
                >
                  <Download className="h-5 w-5" />
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Summary */}
            <DetailSection title="Summary">
              <div className="grid gap-4 sm:grid-cols-2">
                <DetailRow label="Action">
                  <div className="flex items-center gap-2">
                    {getActionIcon(log.action)}
                    <span className="capitalize">
                      {log.action.replace("_", " ")}
                    </span>
                  </div>
                </DetailRow>
                <DetailRow label="Module">
                  <div className="flex items-center gap-2">
                    {getModuleIcon(log.module)}
                    <span>{log.module}</span>
                  </div>
                </DetailRow>
                <DetailRow label="Severity">
                  <SeverityBadge severity={log.severity} size="md" showLabel />
                </DetailRow>
                <DetailRow label="Status">
                  <StatusBadge status={log.status} size="md" showLabel />
                </DetailRow>
                <DetailRow label="Timestamp">
                  <time dateTime={log.timestamp} className="font-mono">
                    {format(new Date(log.timestamp), "PPpp")}
                  </time>
                </DetailRow>
                <DetailRow label="Relative Time">
                  <span className="text-slate-500 dark:text-slate-400">
                    {formatDistanceToNow(new Date(log.timestamp), {
                      addSuffix: true,
                    })}
                  </span>
                </DetailRow>
                <DetailRow label="Log ID" className="sm:col-span-2">
                  <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded break-all">
                    {log.id}
                  </code>
                </DetailRow>
              </div>
            </DetailSection>

            {/* User Info */}
            <DetailSection title="User Information">
              <div className="grid gap-4 sm:grid-cols-2">
                <DetailRow label="Name">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-400" />
                    <span>{log.user.name}</span>
                  </div>
                </DetailRow>
                <DetailRow label="Email">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <a
                      href={`mailto:${log.user.email}`}
                      className="text-dash-primary hover:underline"
                    >
                      {log.user.email}
                    </a>
                  </div>
                </DetailRow>
                <DetailRow label="Role">
                  <RoleBadge role={log.user.role} size="md" />
                </DetailRow>
                <DetailRow label="User ID">
                  <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                    {log.user.id}
                  </code>
                </DetailRow>
              </div>
            </DetailSection>

            {/* Network & Location */}
            <DetailSection title="Network & Location">
              <div className="grid gap-4 sm:grid-cols-2">
                <DetailRow label="IP Address">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-slate-400" />
                    <code className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      {log.ipAddress}
                    </code>
                  </div>
                </DetailRow>
                <DetailRow label="Location">
                  {log.location ? (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span>
                        {log.location.city}, {log.location.region},{" "}
                        {log.location.country}
                      </span>
                    </div>
                  ) : (
                    <span className="text-slate-400">Unknown</span>
                  )}
                </DetailRow>
                <DetailRow label="Browser">
                  <div className="flex items-center gap-2">
                    {getBrowserIcon(log.device?.browser || "")}
                    <span>{log.device?.browser || "Unknown"}</span>
                  </div>
                </DetailRow>
                <DetailRow label="Device">
                  <div className="flex items-center gap-2">
                    {getDeviceIcon(log.device?.device || "desktop")}
                    <span>{log.device?.device || "Unknown"}</span>
                  </div>
                </DetailRow>
                <DetailRow label="OS" className="sm:col-span-2">
                  <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                    {log.device?.os || "Unknown"}
                  </code>
                </DetailRow>
              </div>
            </DetailSection>

            {/* Related Entities */}
            {log.relatedEntities && log.relatedEntities.length > 0 && (
              <DetailSection title="Related Entities">
                <div className="flex flex-wrap gap-2">
                  {log.relatedEntities.map((entity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-mono text-slate-700 dark:text-slate-300"
                    >
                      <Database className="h-3.5 w-3.5" />
                      {entity.type}:{entity.id}
                    </span>
                  ))}
                </div>
              </DetailSection>
            )}

            {/* Metadata */}
            {log.metadata && Object.keys(log.metadata).length > 0 && (
              <DetailSection title="Metadata">
                <JsonViewer data={log.metadata} title="Metadata" collapsed />
              </DetailSection>
            )}

            {/* Before/After State */}
            {(log.beforeState || log.afterState) && (
              <DetailSection title="State Changes">
                <div className="grid gap-4 sm:grid-cols-2">
                  {log.beforeState && (
                    <JsonViewer
                      data={log.beforeState}
                      title="Before State"
                      collapsed
                    />
                  )}
                  {log.afterState && (
                    <JsonViewer
                      data={log.afterState}
                      title="After State"
                      collapsed
                    />
                  )}
                </div>
              </DetailSection>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-3">
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Logged{" "}
              {formatDistanceToNow(new Date(log.timestamp), {
                addSuffix: true,
              })}
            </span>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-dash-primary text-white font-medium text-sm hover:bg-dash-primary-dark transition-colors"
            >
              Close
            </motion.button>
          </div>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
}
