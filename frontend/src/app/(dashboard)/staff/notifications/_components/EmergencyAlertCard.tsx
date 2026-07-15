"use client";

import {
  hoverLift,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import {
  type EmergencyAlert,
  emergencyTypeConfig,
  severityConfig,
} from "../_mock-data";

/* ─── Emergency icon pulse ──────────────────── */

const emergencyPulse = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.15, 1],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
  },
};

/* ─── Background flash for unacknowledged ───── */

const bgFlash = {
  initial: { backgroundColor: "rgba(239, 68, 68, 0)" },
  animate: {
    backgroundColor: [
      "rgba(239, 68, 68, 0)",
      "rgba(239, 68, 68, 0.05)",
      "rgba(239, 68, 68, 0)",
    ],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
  },
};

/* ─── Time formatting ───────────────────────── */

function formatTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/* ══════════════════════════════════════════════
   EmergencyAlertCard
   ══════════════════════════════════════════════ */

interface EmergencyAlertCardProps {
  alert: EmergencyAlert;
  onAcknowledge?: (id: string) => void;
}

export function EmergencyAlertCard({
  alert,
  onAcknowledge,
}: EmergencyAlertCardProps) {
  const typeConfig = emergencyTypeConfig[alert.type];
  const TypeIcon = typeConfig.icon;
  const severity = severityConfig[alert.severity];
  const isCritical = alert.severity === "critical";

  return (
    <motion.div
      variants={staggerItem}
      {...hoverLift}
      className={`relative overflow-hidden rounded-xl border p-4 sm:p-5 ${
        !alert.acknowledged && isCritical
          ? "border-red-300 dark:border-red-800"
          : !alert.acknowledged
            ? "border-amber-200 dark:border-amber-800"
            : "border-slate-200 dark:border-slate-700"
      } ${!alert.acknowledged ? "bg-white dark:bg-slate-800" : "bg-slate-50/50 dark:bg-slate-800/50"}`}
    >
      {/* Background pulse for unacknowledged critical */}
      {!alert.acknowledged && isCritical && (
        <motion.div
          variants={bgFlash}
          initial="initial"
          animate="animate"
          className="absolute inset-0 rounded-xl"
        />
      )}

      <div className="relative">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Icon */}
          <motion.div
            variants={!alert.acknowledged ? emergencyPulse : undefined}
            initial="initial"
            animate={!alert.acknowledged ? "animate" : undefined}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              isCritical
                ? "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
                : "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
            }`}
          >
            <TypeIcon className="h-5 w-5" />
          </motion.div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                    {alert.title}
                  </h3>
                  {!alert.acknowledged && (
                    <span className="animate-pulse rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-red-700 dark:bg-red-900/50 dark:text-red-400">
                      New
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {alert.message}
                </p>
              </div>
            </div>

            {/* Meta */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {/* Severity badge */}
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${severity.class}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${severity.dot}`} />
                {severity.label}
              </span>
              {/* Location */}
              {alert.location && (
                <span className="text-[10px] text-slate-400 dark:text-slate-500">
                  {alert.location}
                </span>
              )}
              {/* Timestamp */}
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                {formatTime(alert.timestamp)}
              </span>

              {/* Acknowledge button */}
              {!alert.acknowledged && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onAcknowledge?.(alert.id)}
                  className="ml-auto rounded-lg bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/20"
                >
                  Acknowledge
                </motion.button>
              )}
              {alert.acknowledged && (
                <span className="ml-auto text-[10px] text-slate-400 dark:text-slate-500">
                  Acknowledged
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
