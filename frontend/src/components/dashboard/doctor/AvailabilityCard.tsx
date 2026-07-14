"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, ToggleLeft, XCircle } from "lucide-react";
import { useState } from "react";

type AvailabilityStatus = "online" | "offline" | "leave" | "emergency";

const statusConfig: Record<
  AvailabilityStatus,
  { label: string; icon: typeof ToggleLeft; color: string; bg: string }
> = {
  online: {
    label: "Online",
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  offline: {
    label: "Offline",
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-950/30",
  },
  leave: {
    label: "On Leave",
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  emergency: {
    label: "Emergency Only",
    icon: ToggleLeft,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/30",
  },
};

const workingHours = [
  { day: "Monday - Friday", hours: "9:00 AM — 5:00 PM" },
  { day: "Saturday", hours: "10:00 AM — 2:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

const statusOptions: AvailabilityStatus[] = [
  "online",
  "offline",
  "leave",
  "emergency",
];

export function AvailabilityCard() {
  const [status, setStatus] = useState<AvailabilityStatus>("online");
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/60 bg-white p-5",
        "dark:border-slate-700/40 dark:bg-slate-900/60",
      )}
    >
      <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">
        Availability
      </h2>

      {/* Current status */}
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl p-3 transition-colors",
          config.bg,
        )}
      >
        <StatusIcon className={cn("h-6 w-6", config.color)} />
        <div>
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {config.label}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Your current availability status
          </p>
        </div>
      </div>

      {/* Status toggle */}
      <div className="mt-3 space-y-1">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Set Status
        </p>
        <div className="flex flex-wrap gap-1.5">
          {statusOptions.map((opt) => {
            const optConfig = statusConfig[opt];
            const OptIcon = optConfig.icon;
            const isActive = status === opt;

            return (
              <button
                key={opt}
                onClick={() => setStatus(opt)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition-all",
                  isActive
                    ? "border-dash-primary-light bg-dash-primary-light text-dash-primary-dark shadow-sm dark:border-teal-800/40 dark:bg-teal-950/30 dark:text-accent"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800",
                )}
              >
                <OptIcon className="h-3.5 w-3.5" />
                {optConfig.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Working hours */}
      <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Working Hours
        </p>
        <div className="space-y-1.5">
          {workingHours.map((wh) => (
            <div
              key={wh.day}
              className="flex items-center justify-between text-xs"
            >
              <span className="text-slate-600 dark:text-slate-400">
                {wh.day}
              </span>
              <span
                className={cn(
                  "font-medium",
                  wh.hours === "Closed"
                    ? "text-red-500"
                    : "text-slate-900 dark:text-white",
                )}
              >
                {wh.hours}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
