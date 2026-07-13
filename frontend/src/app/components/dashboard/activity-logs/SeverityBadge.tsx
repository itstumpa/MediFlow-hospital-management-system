"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ActivitySeverity } from "./types";
import { SEVERITY_CONFIG } from "./types";

interface SeverityBadgeProps {
  severity: ActivitySeverity;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  pulse?: boolean;
  className?: string;
}

const SIZE_CLASSES = {
  sm: "px-2 py-0.5 text-xs gap-1",
  md: "px-2.5 py-1 text-xs gap-1.5",
  lg: "px-3 py-1.5 text-sm gap-2",
};

const ICON_SIZES = {
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
  lg: "h-4 w-4",
};

export function SeverityBadge({
  severity,
  size = "md",
  showLabel = true,
  pulse = false,
  className,
}: SeverityBadgeProps) {
  const config = SEVERITY_CONFIG[severity];
  const sizeClass = SIZE_CLASSES[size];
  const iconSize = ICON_SIZES[size];

  return (
    <motion.span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        config.color,
        sizeClass,
        className,
      )}
      animate={pulse ? { opacity: [1, 0.6, 1] } : undefined}
      transition={
        pulse
          ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
      initial={pulse ? { opacity: 0.6 } : undefined}
    >
      <motion.span
        className={cn("rounded-full", config.pulseColor, iconSize)}
        animate={
          pulse ? { scale: [1, 1.3, 1], opacity: [1, 0.4, 1] } : undefined
        }
        transition={
          pulse
            ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
      />
      {showLabel && <span>{config.label}</span>}
    </motion.span>
  );
}

/** Compact dot-only severity indicator */
export function SeverityDot({
  severity,
  size = "md",
  pulse = false,
  className,
}: Omit<SeverityBadgeProps, "showLabel">) {
  const config = SEVERITY_CONFIG[severity];
  const dotSizes = { sm: "h-1.5 w-1.5", md: "h-2 w-2", lg: "h-2.5 w-2.5" };

  return (
    <motion.span
      className={cn(
        "rounded-full",
        config.pulseColor,
        dotSizes[size],
        className,
      )}
      animate={pulse ? { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] } : undefined}
      transition={
        pulse
          ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
      initial={pulse ? { opacity: 0.5 } : undefined}
      title={config.label}
    />
  );
}

/** Status badge (success/failed/pending/blocked) */
export function StatusBadge({
  status,
  size = "md",
  showLabel = true,
  className,
}: {
  status: "success" | "failed" | "pending" | "blocked";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}) {
  const config = {
    success: {
      label: "Success",
      color:
        "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30",
    },
    failed: {
      label: "Failed",
      color: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30",
    },
    pending: {
      label: "Pending",
      color:
        "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30",
    },
    blocked: {
      label: "Blocked",
      color: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30",
    },
  }[status];

  const sizeClass = SIZE_CLASSES[size];

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        config.color,
        sizeClass,
        className,
      )}
    >
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}

/** Action type badge */
export function ActionBadge({
  action,
  size = "md",
  showLabel = true,
  className,
}: {
  action: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}) {
  // Import dynamically to avoid circular dependency
  const configMap: Record<string, { label: string; color: string }> = {
    login: { label: "Login", color: "text-emerald-600 bg-emerald-100" },
    logout: { label: "Logout", color: "text-slate-600 bg-slate-100" },
    create: { label: "Create", color: "text-dash-primary bg-dash-primary-light" },
    update: { label: "Update", color: "text-amber-600 bg-amber-100" },
    delete: { label: "Delete", color: "text-red-600 bg-red-100" },
    assign: { label: "Assign", color: "text-purple-600 bg-purple-100" },
    approve: { label: "Approve", color: "text-emerald-600 bg-emerald-100" },
    reject: { label: "Reject", color: "text-red-600 bg-red-100" },
    export: { label: "Export", color: "text-indigo-600 bg-indigo-100" },
    import: { label: "Import", color: "text-cyan-600 bg-cyan-100" },
    password_change: {
      label: "Password Change",
      color: "text-orange-600 bg-orange-100",
    },
    role_change: { label: "Role Change", color: "text-pink-600 bg-pink-100" },
  };
  const config = configMap[action as keyof typeof configMap] || {
    label: action,
    color: "text-slate-600 bg-slate-100",
  };

  const sizeClass = SIZE_CLASSES[size];

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        config.color,
        sizeClass,
        className,
      )}
    >
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}

/** Module badge */
export function ModuleBadge({
  module,
  size = "md",
  showLabel = true,
  className,
}: {
  module: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}) {
  const moduleConfigMap: Record<string, { label: string; color: string }> = {
    Authentication: { label: "Auth", color: "text-indigo-600 bg-indigo-100" },
    Users: { label: "Users", color: "text-dash-primary bg-dash-primary-light" },
    Doctors: { label: "Doctors", color: "text-emerald-600 bg-emerald-100" },
    Patients: { label: "Patients", color: "text-purple-600 bg-purple-100" },
    Appointments: { label: "Appts", color: "text-amber-600 bg-amber-100" },
    Departments: { label: "Depts", color: "text-cyan-600 bg-cyan-100" },
    Articles: { label: "Articles", color: "text-pink-600 bg-pink-100" },
    Messages: { label: "Messages", color: "text-orange-600 bg-orange-100" },
    Notifications: { label: "Notifs", color: "text-teal-600 bg-teal-100" },
    Settings: { label: "Settings", color: "text-slate-600 bg-slate-100" },
    System: { label: "System", color: "text-gray-600 bg-gray-100" },
    Security: { label: "Security", color: "text-red-600 bg-red-100" },
    Reports: { label: "Reports", color: "text-violet-600 bg-violet-100" },
    Billing: { label: "Billing", color: "text-lime-600 bg-lime-100" },
  };
  const config = moduleConfigMap[module as keyof typeof moduleConfigMap] || {
    label: module,
    color: "text-slate-600 bg-slate-100",
  };

  const sizeClass = SIZE_CLASSES[size];

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        config.color,
        sizeClass,
        className,
      )}
    >
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}

/** Role badge */
export function RoleBadge({
  role,
  size = "md",
  showLabel = true,
  variant = "default",
  className,
}: {
  role: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  variant?: "default" | "soft";
  className?: string;
}) {
  const roleConfigMap: Record<
    string,
    { label: string; color: string; softColor: string }
  > = {
    "Super Admin": {
      label: "Super Admin",
      color: "text-red-600 bg-red-100",
      softColor: "text-red-700 bg-red-100/50",
    },
    Admin: {
      label: "Admin",
      color: "text-purple-600 bg-purple-100",
      softColor: "text-purple-700 bg-purple-100/50",
    },
    Doctor: {
      label: "Doctor",
      color: "text-emerald-600 bg-emerald-100",
      softColor: "text-emerald-700 bg-emerald-100/50",
    },
    Nurse: {
      label: "Nurse",
      color: "text-dash-primary bg-dash-primary-light",
      softColor: "text-dash-primary bg-dash-primary-light/50",
    },
    Receptionist: {
      label: "Receptionist",
      color: "text-amber-600 bg-amber-100",
      softColor: "text-amber-700 bg-amber-100/50",
    },
    Patient: {
      label: "Patient",
      color: "text-cyan-600 bg-cyan-100",
      softColor: "text-cyan-700 bg-cyan-100/50",
    },
    System: {
      label: "System",
      color: "text-slate-600 bg-slate-100",
      softColor: "text-slate-700 bg-slate-100/50",
    },
  };
  const config = roleConfigMap[role as keyof typeof roleConfigMap] || {
    label: role,
    color: "text-slate-600 bg-slate-100",
    softColor: "text-slate-700 bg-slate-100/50",
  };

  const sizeClass = SIZE_CLASSES[size];
  const color = variant === "soft" ? config.softColor : config.color;

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        color,
        sizeClass,
        className,
      )}
    >
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}
