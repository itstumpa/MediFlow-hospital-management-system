"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertTriangle, Luggage, Wifi, WifiOff, Zap } from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import {
  availabilityStatusOptions,
  type AvailabilityStatusType,
} from "./schedule-mock-data";

interface AvailabilityStatusProps {
  currentStatus: AvailabilityStatusType;
  onStatusChange?: (status: AvailabilityStatusType) => void;
}

const statusIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  available: Wifi,
  busy: Zap,
  "on-leave": Luggage,
  "emergency-only": AlertTriangle,
  offline: WifiOff,
};

export function AvailabilityStatus({
  currentStatus,
  onStatusChange,
}: AvailabilityStatusProps) {
  const current = availabilityStatusOptions.find(
    (o) => o.value === currentStatus,
  );
  const Icon = current ? statusIconMap[currentStatus] || Wifi : Wifi;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="rounded-xl border border-slate-200/60 bg-white dark:border-slate-700/40 dark:bg-slate-900/60"
    >
      <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Availability Status
        </h3>
      </div>
      <div className="p-3">
        {/* Current status badge */}
        <div className="mb-3 flex items-center gap-3 rounded-lg bg-slate-50 px-3.5 py-3 dark:bg-slate-800/50">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg",
              current?.dotColor === "bg-emerald-500" &&
                "bg-emerald-50 dark:bg-emerald-950/30",
              current?.dotColor === "bg-amber-500" &&
                "bg-amber-50 dark:bg-amber-950/30",
              current?.dotColor === "bg-blue-500" &&
                "bg-blue-50 dark:bg-blue-950/30",
              current?.dotColor === "bg-red-500" &&
                "bg-red-50 dark:bg-red-950/30",
              current?.dotColor === "bg-slate-400" &&
                "bg-slate-50 dark:bg-slate-800",
            )}
          >
            <Icon className={cn("h-4 w-4", current?.color)} />
          </div>
          <div>
            <p className={cn("text-sm font-semibold", current?.color)}>
              {current?.label || "Unknown"}
            </p>
            <p className="text-[10px] text-slate-400">Currently active</p>
          </div>
        </div>

        {/* Status options */}
        <div className="space-y-1">
          {availabilityStatusOptions.map((option) => {
            const OptionIcon = statusIconMap[option.value] || Wifi;
            return (
              <motion.button
                key={option.value}
                variants={staggerItem}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStatusChange?.(option.value)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors",
                  currentStatus === option.value
                    ? "bg-dash-primary-light dark:bg-dash-primary-light"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800/50",
                )}
              >
                <div className={cn("h-2 w-2 rounded-full", option.dotColor)} />
                <OptionIcon className="h-3.5 w-3.5 text-slate-400" />
                <span
                  className={cn(
                    "text-xs font-medium",
                    currentStatus === option.value
                      ? "text-slate-800 dark:text-slate-200"
                      : "text-slate-600 dark:text-slate-400",
                  )}
                >
                  {option.label}
                </span>
                {currentStatus === option.value && (
                  <span className="ml-auto text-[9px] font-medium text-dash-primary">
                    Active
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
