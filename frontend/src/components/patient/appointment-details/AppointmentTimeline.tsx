"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Award,
  CalendarPlus,
  CalendarX2,
  CheckCircle2,
  ClipboardCheck,
  Stethoscope,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import type { TimelineStep } from "./types";

const iconMap: Record<string, LucideIcon> = {
  CalendarPlus,
  CheckCircle2,
  ClipboardCheck,
  Stethoscope,
  Award,
  XCircle,
  CalendarX2,
};

/* ─── Single timeline step ─── */
function TimelineStepCard({
  step,
  index,
  total,
}: {
  step: TimelineStep;
  index: number;
  total: number;
}) {
  const Icon = iconMap[step.icon] || CheckCircle2;
  const isLast = index === total - 1;

  return (
    <div className="relative flex gap-5">
      {/* Timeline line + icon column */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 200,
            delay: index * 0.15,
          }}
          className={cn(
            "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 transition-all",
            step.completed
              ? "border-emerald-400 bg-emerald-50 text-emerald-600 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-400"
              : step.active
                ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] dark:border-[var(--color-accent)] dark:text-[var(--color-accent)]"
                : "border-slate-200 bg-white text-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-500",
          )}
        >
          <Icon className="h-5 w-5" />
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: [0.25, 0.1, 0.25, 1] as const,
            }}
            className={cn(
              "w-0.5 min-h-[24px] flex-1",
              step.completed
                ? "bg-emerald-200 dark:bg-emerald-800"
                : "bg-slate-200 dark:bg-slate-700",
            )}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.35,
          delay: index * 0.15,
          ease: [0.25, 0.1, 0.25, 1] as const,
        }}
        className={cn("flex-1 pb-8", isLast && "pb-0")}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <div>
            <h4
              className={cn(
                "text-sm font-semibold",
                step.completed
                  ? "text-slate-900 dark:text-white"
                  : step.active
                    ? "text-[var(--color-primary)] dark:text-[var(--color-accent)]"
                    : "text-slate-400 dark:text-slate-500",
              )}
            >
              {step.label}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {step.description}
            </p>
          </div>
          {step.timestamp && (
            <span className="shrink-0 text-xs font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap">
              {step.timestamp}
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Pulse glow for active step ─── */
function ActiveGlow() {
  return (
    <motion.div
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute left-[19px] top-[19px] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary)] blur-md dark:bg-[var(--color-accent)]"
    />
  );
}

/* ─── Timeline component ─── */
interface AppointmentTimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export function AppointmentTimeline({
  steps,
  className,
}: AppointmentTimelineProps) {
  const hasActive = steps.some((s) => s.active);

  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Appointment Timeline
        </h3>
        {hasActive && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-[11px] font-semibold text-[var(--color-primary)] dark:bg-[var(--color-accent)]/10 dark:text-[var(--color-accent)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
            </span>
            In Progress
          </span>
        )}
      </div>

      <div className="relative">
        <ActiveGlow />
        {steps.map((step, i) => (
          <TimelineStepCard
            key={step.id}
            step={step}
            index={i}
            total={steps.length}
          />
        ))}
      </div>
    </motion.div>
  );
}
