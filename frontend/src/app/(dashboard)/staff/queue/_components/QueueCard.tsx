"use client";

import { staggerItem } from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { Clock, MoreVertical, Timer, User } from "lucide-react";
import { useState } from "react";
import {
  appointmentTypeConfig,
  formatTime,
  getInitials,
  getInitialsColor,
  priorityConfig,
  statusConfig,
  type QueueEntry,
} from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface QueueCardProps {
  entry: QueueEntry;
  onCall?: (entry: QueueEntry) => void;
  onMarkArrived?: (entry: QueueEntry) => void;
  onComplete?: (entry: QueueEntry) => void;
  onNoShow?: (entry: QueueEntry) => void;
  onCancel?: (entry: QueueEntry) => void;
  onMove?: (entry: QueueEntry) => void;
}

/* ─── Action Menu ───────────────────────────── */

function ActionMenu({
  entry,
  onCall,
  onMarkArrived,
  onComplete,
  onNoShow,
  onCancel,
}: QueueCardProps) {
  const [open, setOpen] = useState(false);

  const actions: {
    label: string;
    show: boolean;
    action: () => void;
    color: string;
  }[] = [
    {
      label: "Call Patient",
      show: entry.status === "waiting",
      action: () => onCall?.(entry),
      color: "text-amber-600 dark:text-amber-400",
    },
    {
      label: "Mark Arrived",
      show: entry.status === "waiting" && entry.appointmentTime !== "—",
      action: () => onMarkArrived?.(entry),
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Complete",
      show: entry.status === "in-consultation" || entry.status === "called",
      action: () => onComplete?.(entry),
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "No Show",
      show: entry.status === "called" || entry.status === "waiting",
      action: () => onNoShow?.(entry),
      color: "text-rose-600 dark:text-rose-400",
    },
    {
      label: "Cancel",
      show:
        entry.status === "waiting" ||
        entry.status === "called" ||
        entry.status === "in-consultation",
      action: () => onCancel?.(entry),
      color: "text-slate-500 dark:text-slate-400",
    },
  ];

  const visibleActions = actions.filter((a) => a.show);
  if (visibleActions.length === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
      >
        <MoreVertical className="h-3.5 w-3.5" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-20 w-44 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
            {visibleActions.map((action) => (
              <button
                key={action.label}
                onClick={() => {
                  action.action();
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium transition-colors hover:bg-slate-50 dark:hover:bg-slate-700 ${action.color}`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Priority Badge ────────────────────────── */

function PriorityBadge({ priority }: { priority: QueueEntry["priority"] }) {
  const cfg = priorityConfig[priority];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${cfg.class}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

/* ─── Status Badge ──────────────────────────── */

function StatusBadge({ status }: { status: QueueEntry["status"] }) {
  const cfg = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${cfg.class}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

/* ══════════════════════════════════════════════
   QueueCard
   ══════════════════════════════════════════════ */

export function QueueCard(props: QueueCardProps) {
  const { entry } = props;
  const typeCfg = appointmentTypeConfig[entry.appointmentType];
  const initialsColor = getInitialsColor(entry.patientName);

  return (
    <motion.div
      variants={staggerItem}
      layout
      className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
    >
      {/* Top row: queue number + priority + menu */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            #{entry.queueNumber}
          </span>
          <PriorityBadge priority={entry.priority} />
        </div>
        <ActionMenu {...props} />
      </div>

      {/* Patient info */}
      <div className="mt-2 flex items-center gap-2.5">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${initialsColor}`}
        >
          {getInitials(entry.patientName)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
            {entry.patientName}
          </p>
          <p className="truncate text-[11px] text-slate-400 dark:text-slate-500">
            {entry.patientId}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="mt-2.5 space-y-1.5">
        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <User className="h-3 w-3 shrink-0" />
          <span className="truncate">{entry.doctorName}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <Clock className="h-3 w-3 shrink-0" />
          <span>
            {entry.appointmentTime !== "—"
              ? formatTime(entry.appointmentTime)
              : "Walk-in"}{" "}
            · Checked in {formatTime(entry.checkInTime)}
          </span>
        </div>
        {entry.waitingMinutes > 0 && (
          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
            <Timer className="h-3 w-3 shrink-0" />
            <span>
              Waiting{" "}
              <span
                className={`font-medium ${
                  entry.waitingMinutes > 30
                    ? "text-red-500"
                    : entry.waitingMinutes > 15
                      ? "text-amber-500"
                      : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {entry.waitingMinutes} min
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-2 dark:border-slate-700">
        <span
          className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${typeCfg.class}`}
        >
          {typeCfg.label}
        </span>
        <StatusBadge status={entry.status} />
      </div>

      {/* Left priority stripe */}
      <div
        className="absolute left-0 top-0 h-full w-0.5"
        style={{ backgroundColor: entry.color }}
      />
    </motion.div>
  );
}
