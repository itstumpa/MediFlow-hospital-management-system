"use client";

import type { LucideIcon } from "lucide-react";

/** Activity severity levels */
export type ActivitySeverity = "info" | "warning" | "critical" | "error";

/** Activity action types */
export type ActivityActionType =
  | "login"
  | "logout"
  | "create"
  | "update"
  | "delete"
  | "assign"
  | "approve"
  | "reject"
  | "export"
  | "import"
  | "password_change"
  | "role_change"
  | "read"
  | "revoke"
  | "backup"
  | "restore"
  | "config_change"
  | "security_alert"
  | "failed_login"
  | "permission_change"
  | "system_error"
  | "api_call";

/** Activity status */
export type ActivityStatus = "success" | "failed" | "pending" | "blocked";

/** View mode for the activity logs */
export type ActivityViewMode = "table" | "timeline";

/** Sort fields for activity logs */
export type ActivitySortField =
  | "timestamp"
  | "user"
  | "role"
  | "module"
  | "action"
  | "severity"
  | "status"
  | "ipAddress";

/** User role types */
export type UserRole =
  | "Super Admin"
  | "Admin"
  | "Doctor"
  | "Nurse"
  | "Receptionist"
  | "Patient"
  | "System";

/** Module categories */
export type ActivityModule =
  | "Authentication"
  | "Users"
  | "Doctors"
  | "Patients"
  | "Appointments"
  | "Departments"
  | "Articles"
  | "Messages"
  | "Notifications"
  | "Settings"
  | "System"
  | "Security"
  | "Reports"
  | "Billing";

/** Device info */
export interface DeviceInfo {
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  device: "desktop" | "mobile" | "tablet";
  deviceModel?: string;
}

/** Location info */
export interface LocationInfo {
  country: string;
  city: string;
  region: string;
  ip: string;
  isp?: string;
}

/** Before/After state for detail view */
export interface StateSnapshot {
  [key: string]: unknown;
}

/** Related entity reference */
export interface RelatedEntity {
  type: string;
  id: string;
  name: string;
  url?: string;
}

/** Main Activity Log entry */
export interface ActivityLog {
  id: string;
  timestamp: string; // ISO 8601
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: UserRole;
  };
  module: ActivityModule;
  action: ActivityActionType;
  description: string;
  severity: ActivitySeverity;
  status: ActivityStatus;
  ipAddress: string;
  location?: LocationInfo;
  device?: DeviceInfo;
  beforeState?: StateSnapshot;
  afterState?: StateSnapshot;
  relatedEntities?: RelatedEntity[];
  metadata?: Record<string, unknown>;
}

/** Filter state for activity logs */
export interface ActivityFilters {
  search: string;
  user: string[];
  role: UserRole[];
  module: ActivityModule[];
  action: ActivityActionType[];
  severity: ActivitySeverity[];
  status: ActivityStatus[];
  dateFrom: string;
  dateTo: string;
  ipAddress: string;
  sortBy: ActivitySortField;
  sortAsc: boolean;
}

/** Default filters */
export const DEFAULT_ACTIVITY_FILTERS: ActivityFilters = {
  search: "",
  user: [],
  role: [],
  module: [],
  action: [],
  severity: [],
  status: [],
  dateFrom: "",
  dateTo: "",
  ipAddress: "",
  sortBy: "timestamp",
  sortAsc: false,
};

/** Action type options for filters */
export const ACTION_TYPE_OPTIONS: readonly ActivityActionType[] = [
  "login",
  "logout",
  "create",
  "update",
  "delete",
  "assign",
  "approve",
  "reject",
  "export",
  "import",
  "password_change",
  "role_change",
] as const;

/** Module options for filters */
export const MODULE_OPTIONS: readonly ActivityModule[] = [
  "Authentication",
  "Users",
  "Doctors",
  "Patients",
  "Appointments",
  "Departments",
  "Articles",
  "Messages",
  "Notifications",
  "Settings",
  "System",
  "Security",
  "Reports",
  "Billing",
] as const;

/** Role options for filters */
export const ROLE_OPTIONS: readonly UserRole[] = [
  "Super Admin",
  "Admin",
  "Doctor",
  "Nurse",
  "Receptionist",
  "Patient",
  "System",
] as const;

/** Severity options for filters */
export const SEVERITY_OPTIONS: readonly ActivitySeverity[] = [
  "info",
  "warning",
  "critical",
  "error",
] as const;

/** Status options for filters */
export const STATUS_OPTIONS: readonly ActivityStatus[] = [
  "success",
  "failed",
  "pending",
  "blocked",
] as const;

/** Sort field options */
export const SORT_FIELD_OPTIONS: readonly {
  value: ActivitySortField;
  label: string;
}[] = [
  { value: "timestamp", label: "Timestamp" },
  { value: "user", label: "User" },
  { value: "role", label: "Role" },
  { value: "module", label: "Module" },
  { value: "action", label: "Action" },
  { value: "severity", label: "Severity" },
  { value: "status", label: "Status" },
  { value: "ipAddress", label: "IP Address" },
] as const;

/** Action type display config */
export const ACTION_TYPE_CONFIG: Record<
  ActivityActionType,
  { label: string; icon: LucideIcon; color: string }
> = {
  login: {
    label: "Login",
    icon: null as any,
    color: "text-emerald-600 bg-emerald-100",
  },
  logout: {
    label: "Logout",
    icon: null as any,
    color: "text-slate-600 bg-slate-100",
  },
  create: {
    label: "Create",
    icon: null as any,
    color: "text-blue-600 bg-blue-100",
  },
  update: {
    label: "Update",
    icon: null as any,
    color: "text-amber-600 bg-amber-100",
  },
  delete: {
    label: "Delete",
    icon: null as any,
    color: "text-red-600 bg-red-100",
  },
  assign: {
    label: "Assign",
    icon: null as any,
    color: "text-purple-600 bg-purple-100",
  },
  approve: {
    label: "Approve",
    icon: null as any,
    color: "text-emerald-600 bg-emerald-100",
  },
  reject: {
    label: "Reject",
    icon: null as any,
    color: "text-red-600 bg-red-100",
  },
  export: {
    label: "Export",
    icon: null as any,
    color: "text-indigo-600 bg-indigo-100",
  },
  import: {
    label: "Import",
    icon: null as any,
    color: "text-cyan-600 bg-cyan-100",
  },
  password_change: {
    label: "Password Change",
    icon: null as any,
    color: "text-orange-600 bg-orange-100",
  },
  role_change: {
    label: "Role Change",
    icon: null as any,
    color: "text-pink-600 bg-pink-100",
  },
  read: {
    label: "Read",
    icon: null as any,
    color: "text-blue-600 bg-blue-100",
  },
  revoke: {
    label: "Revoke",
    icon: null as any,
    color: "text-red-600 bg-red-100",
  },
  backup: {
    label: "Backup",
    icon: null as any,
    color: "text-teal-600 bg-teal-100",
  },
  restore: {
    label: "Restore",
    icon: null as any,
    color: "text-emerald-600 bg-emerald-100",
  },
  config_change: {
    label: "Config Change",
    icon: null as any,
    color: "text-amber-600 bg-amber-100",
  },
  security_alert: {
    label: "Security Alert",
    icon: null as any,
    color: "text-red-600 bg-red-100",
  },
  failed_login: {
    label: "Failed Login",
    icon: null as any,
    color: "text-orange-600 bg-orange-100",
  },
  permission_change: {
    label: "Permission Change",
    icon: null as any,
    color: "text-purple-600 bg-purple-100",
  },
  system_error: {
    label: "System Error",
    icon: null as any,
    color: "text-red-600 bg-red-100",
  },
  api_call: {
    label: "API Call",
    icon: null as any,
    color: "text-indigo-600 bg-indigo-100",
  },
};

/** Severity display config */
export const SEVERITY_CONFIG: Record<
  ActivitySeverity,
  { label: string; color: string; pulseColor: string; icon: LucideIcon }
> = {
  info: {
    label: "Info",
    color: "text-blue-600 bg-blue-100",
    pulseColor: "bg-blue-500",
    icon: null as any,
  },
  warning: {
    label: "Warning",
    color: "text-amber-600 bg-amber-100",
    pulseColor: "bg-amber-500",
    icon: null as any,
  },
  critical: {
    label: "Critical",
    color: "text-red-600 bg-red-100",
    pulseColor: "bg-red-500",
    icon: null as any,
  },
  error: {
    label: "Error",
    color: "text-rose-600 bg-rose-100",
    pulseColor: "bg-rose-500",
    icon: null as any,
  },
};

/** Status display config */
export const STATUS_CONFIG: Record<
  ActivityStatus,
  { label: string; color: string; icon: LucideIcon }
> = {
  success: {
    label: "Success",
    color: "text-emerald-600 bg-emerald-100",
    icon: null as any,
  },
  failed: {
    label: "Failed",
    color: "text-red-600 bg-red-100",
    icon: null as any,
  },
  pending: {
    label: "Pending",
    color: "text-amber-600 bg-amber-100",
    icon: null as any,
  },
  blocked: {
    label: "Blocked",
    color: "text-red-600 bg-red-100",
    icon: null as any,
  },
};

/** Module display config */
export const MODULE_CONFIG: Record<
  ActivityModule,
  { label: string; color: string; icon: LucideIcon }
> = {
  Authentication: {
    label: "Auth",
    color: "text-indigo-600 bg-indigo-100",
    icon: null as any,
  },
  Users: {
    label: "Users",
    color: "text-blue-600 bg-blue-100",
    icon: null as any,
  },
  Doctors: {
    label: "Doctors",
    color: "text-emerald-600 bg-emerald-100",
    icon: null as any,
  },
  Patients: {
    label: "Patients",
    color: "text-purple-600 bg-purple-100",
    icon: null as any,
  },
  Appointments: {
    label: "Appts",
    color: "text-amber-600 bg-amber-100",
    icon: null as any,
  },
  Departments: {
    label: "Depts",
    color: "text-cyan-600 bg-cyan-100",
    icon: null as any,
  },
  Articles: {
    label: "Articles",
    color: "text-pink-600 bg-pink-100",
    icon: null as any,
  },
  Messages: {
    label: "Messages",
    color: "text-orange-600 bg-orange-100",
    icon: null as any,
  },
  Notifications: {
    label: "Notifs",
    color: "text-teal-600 bg-teal-100",
    icon: null as any,
  },
  Settings: {
    label: "Settings",
    color: "text-slate-600 bg-slate-100",
    icon: null as any,
  },
  System: {
    label: "System",
    color: "text-gray-600 bg-gray-100",
    icon: null as any,
  },
  Security: {
    label: "Security",
    color: "text-red-600 bg-red-100",
    icon: null as any,
  },
  Reports: {
    label: "Reports",
    color: "text-violet-600 bg-violet-100",
    icon: null as any,
  },
  Billing: {
    label: "Billing",
    color: "text-lime-600 bg-lime-100",
    icon: null as any,
  },
};
