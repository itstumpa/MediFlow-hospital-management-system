"use client";

import { Button } from "@/app/components/dashboard/Button";
import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Clock, UserCheck } from "lucide-react";
import { waitingQueue, type Priority, type QueueStatus } from "../_mock-data";

/* ─── Priority Badge ────────────────────────── */

const priorityConfig: Record<Priority, { label: string; classes: string }> = {
  low: {
    label: "Low",
    classes:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  },
  normal: {
    label: "Normal",
    classes: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  },
  high: {
    label: "High",
    classes:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  },
  emergency: {
    label: "Emergency",
    classes: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  },
};

const statusConfig: Record<QueueStatus, { label: string; classes: string }> = {
  waiting: {
    label: "Waiting",
    classes:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  },
  "in-consultation": {
    label: "In Consultation",
    classes: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  },
  lab: {
    label: "Lab",
    classes:
      "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400",
  },
  ready: {
    label: "Ready",
    classes:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
};

/* ─── Empty State ───────────────────────────── */

function EmptyQueue() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
        <CheckCircle2 className="h-7 w-7 text-slate-400" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-white">
        Queue is empty
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        All patients have been attended to.
      </p>
    </div>
  );
}

/* ─── Waiting Queue ─────────────────────────── */

export function WaitingQueue() {
  if (waitingQueue.length === 0) return <EmptyQueue />;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Waiting Queue
        </h2>
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
          <Clock className="h-3 w-3" />
          {waitingQueue.filter((w) => w.status === "waiting").length} waiting
        </span>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {waitingQueue.map((item) => {
          const pConfig = priorityConfig[item.priority];
          const sConfig = statusConfig[item.status];

          return (
            <motion.div
              key={item.id}
              variants={staggerItem}
              className={cn(
                "dash-card flex flex-col gap-3 p-4 transition-all duration-200 sm:flex-row sm:items-center",
                item.priority === "emergency" &&
                  "border-red-200/80 bg-red-50/30 dark:border-red-800/40 dark:bg-red-950/10",
                item.priority === "high" &&
                  "border-amber-200/60 dark:border-amber-800/30",
              )}
            >
              {/* Token */}
              <div className="flex items-center gap-3 sm:w-[100px]">
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-sm",
                    item.priority === "emergency"
                      ? "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
                  )}
                >
                  {item.token}
                </span>
                <div className="sm:hidden">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                      pConfig.classes,
                    )}
                  >
                    {pConfig.label}
                  </span>
                </div>
              </div>

              {/* Patient info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {item.patientName}
                  </span>
                  {item.priority === "emergency" && (
                    <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {item.doctor} · Waiting {item.waitingTime}
                </p>
              </div>

              {/* Priority - desktop */}
              <div className="hidden sm:block">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                    pConfig.classes,
                  )}
                >
                  {pConfig.label}
                </span>
              </div>

              {/* Status */}
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                  sConfig.classes,
                )}
              >
                {sConfig.label}
              </span>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="primary" size="xs" icon={UserCheck}>
                  Check In
                </Button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
