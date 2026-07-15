"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { type QueueEntry, type QueueStatus } from "../_mock-data";
import { EmptyState } from "./EmptyState";
import { QueueCard } from "./QueueCard";

/* ─── Column config ────────────────────────── */

interface ColumnDef {
  status: QueueStatus;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const columns: ColumnDef[] = [
  {
    status: "waiting",
    label: "Waiting",
    color: "text-slate-600 dark:text-slate-300",
    bgColor: "bg-slate-50 dark:bg-slate-800/40",
    borderColor: "border-t-slate-400",
  },
  {
    status: "called",
    label: "Called",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50/50 dark:bg-amber-950/20",
    borderColor: "border-t-amber-400",
  },
  {
    status: "in-consultation",
    label: "In Consultation",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50/50 dark:bg-blue-950/20",
    borderColor: "border-t-blue-400",
  },
  {
    status: "completed",
    label: "Completed",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50/50 dark:bg-emerald-950/20",
    borderColor: "border-t-emerald-400",
  },
  {
    status: "no-show",
    label: "No Show",
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-50/50 dark:bg-rose-950/20",
    borderColor: "border-t-rose-400",
  },
];

/* ─── Props ─────────────────────────────────── */

interface QueueBoardProps {
  entries: QueueEntry[];
  onCallPatient: (entry: QueueEntry) => void;
  onMarkArrived: (entry: QueueEntry) => void;
  onComplete: (entry: QueueEntry) => void;
  onNoShow: (entry: QueueEntry) => void;
  onCancel: (entry: QueueEntry) => void;
  onMovePosition: (entry: QueueEntry) => void;
}

/* ─── Column Component ──────────────────────── */

function BoardColumn({
  column,
  entries,
  onCallPatient,
  onMarkArrived,
  onComplete,
  onNoShow,
  onCancel,
  onMovePosition,
}: {
  column: ColumnDef;
  entries: QueueEntry[];
} & QueueBoardProps) {
  return (
    <motion.div
      variants={staggerItem}
      className={`flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 ${column.bgColor} border-t-4 ${column.borderColor}`}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2">
          <h3 className={`text-sm font-semibold ${column.color}`}>
            {column.label}
          </h3>
          <span
            className={`flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${column.color} bg-white/80 dark:bg-slate-800/80`}
          >
            {entries.length}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 space-y-2 px-2 pb-3">
        <AnimatePresence mode="popLayout">
          {entries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8 text-center"
            >
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                No patients
              </p>
            </motion.div>
          ) : (
            entries.map((entry) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <QueueCard
                  entry={entry}
                  onCall={onCallPatient}
                  onMarkArrived={onMarkArrived}
                  onComplete={onComplete}
                  onNoShow={onNoShow}
                  onCancel={onCancel}
                  onMove={onMovePosition}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   QueueBoard
   ══════════════════════════════════════════════ */

export function QueueBoard({ entries, ...handlers }: QueueBoardProps) {
  // Check if all columns are empty (excluding cancelled)
  const hasAnyEntries = entries.some((e) => e.status !== "cancelled");

  if (!hasAnyEntries) {
    return <EmptyState />;
  }

  // Group entries by status
  const columnMap = useMemo(() => {
    const map: Record<string, QueueEntry[]> = {};
    for (const col of columns) {
      map[col.status] = entries.filter((e) => e.status === col.status);
    }
    // Also capture cancelled separately (don't show in board)
    return map;
  }, [entries]);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
    >
      {columns.map((column) => (
        <BoardColumn
          key={column.status}
          column={column}
          entries={columnMap[column.status] ?? []}
          {...handlers}
        />
      ))}
    </motion.div>
  );
}
