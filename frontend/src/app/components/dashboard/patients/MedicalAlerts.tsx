"use client";

import { staggerContainer } from "@/app/components/dashboard/MotionVariants";
import type { PatientAlert } from "@/lib/data/patient-detail";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  HeartPulse,
  Pill,
  ShieldAlert,
  Skull,
} from "lucide-react";

interface MedicalAlertsProps {
  alerts: PatientAlert[];
}

const alertConfig = {
  allergy: {
    icon: Pill,
    label: "Allergy",
    border: "border-l-red-500",
    bg: "bg-red-50 dark:bg-red-950/30",
    dot: "bg-red-500",
    pulse: "bg-red-400",
  },
  chronic: {
    icon: HeartPulse,
    label: "Chronic",
    border: "border-l-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    dot: "bg-amber-500",
    pulse: "bg-amber-400",
  },
  emergency: {
    icon: Skull,
    label: "Emergency",
    border: "border-l-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    dot: "bg-purple-500",
    pulse: "bg-purple-400",
  },
};

function AlertCard({ alert, index }: { alert: PatientAlert; index: number }) {
  const config = alertConfig[alert.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      className={cn(
        "flex items-start gap-3.5 rounded-xl border-l-4 p-4 shadow-sm",
        config.bg,
        config.border,
      )}
      role="alert"
    >
      <div className="relative mt-0.5 shrink-0">
        <config.icon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
        {alert.severity === "high" && (
          <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
            <span
              className={cn(
                "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                config.pulse,
              )}
            />
            <span
              className={cn(
                "relative inline-flex h-2.5 w-2.5 rounded-full",
                config.dot,
              )}
            />
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
              alert.severity === "high"
                ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                : alert.severity === "medium"
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
            )}
          >
            <AlertTriangle className="h-3 w-3" />
            {alert.severity}
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {config.label}
          </span>
        </div>
        <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
          {alert.message}
        </p>
      </div>
    </motion.div>
  );
}

export function MedicalAlerts({ alerts }: MedicalAlertsProps) {
  if (alerts.length === 0) return null;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <div className="flex items-center gap-2 mb-4">
        <ShieldAlert className="h-5 w-5 text-red-500" />
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Medical Alerts
        </h3>
        <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {alerts.length}
        </span>
      </div>
      <div className="space-y-2.5">
        <AnimatePresence>
          {alerts.map((alert, i) => (
            <AlertCard key={`${alert.type}-${i}`} alert={alert} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
