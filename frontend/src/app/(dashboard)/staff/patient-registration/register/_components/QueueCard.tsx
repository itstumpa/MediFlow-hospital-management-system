"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { Clock, Dot, Star, Users } from "lucide-react";
import { patientTypeConfig, priorityConfig, queueEntries } from "../_mock-data";

/* ─── Status color map ──────────────────────── */

const queueStatusColor: Record<string, string> = {
  waiting: "text-amber-500",
  "in-consultation": "text-blue-500",
  completed: "text-emerald-500",
  cancelled: "text-red-400",
};

/* ─── Row ───────────────────────────────────── */

function QueueRow({ entry }: { entry: (typeof queueEntries)[0] }) {
  const typeCfg = patientTypeConfig[entry.patientType];
  const TypeIcon = typeCfg.icon;
  const prioCfg = priorityConfig[entry.priority];

  return (
    <motion.div
      variants={staggerItem}
      className="flex items-center gap-2.5 rounded-lg border border-slate-100 bg-white/50 px-3 py-2.5 transition-colors hover:bg-slate-50 dark:border-slate-700/50 dark:bg-slate-800/30 dark:hover:bg-slate-800/50"
    >
      {/* Queue number */}
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
        {entry.queueNumber.replace("Q-", "").replace("ER-", "")}
      </span>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {entry.patientName}
          </p>
          {entry.isVIP && (
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span className="text-slate-400">{entry.doctorName}</span>
          <span className="text-slate-300">·</span>
          <TypeIcon className={`h-3 w-3 ${typeCfg.class.split(" ")[1]}`} />
          <span>
            {entry.priority === "urgent" || entry.priority === "high" ? (
              <span className={`${prioCfg.class}`}>{prioCfg.label}</span>
            ) : null}
          </span>
        </div>
      </div>

      {/* Status + Wait */}
      <div className="shrink-0 text-right">
        <div className="flex items-center gap-1 text-xs">
          <Dot className={`h-4 w-4 ${queueStatusColor[entry.status]}`} />
          <span className="capitalize text-slate-500 dark:text-slate-400">
            {entry.status === "in-consultation" ? "In consult" : entry.status}
          </span>
        </div>
        <p className="text-[10px] text-slate-400">{entry.estimatedWait}</p>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────── */

export function QueueCard() {
  const waiting = queueEntries.filter((e) => e.status === "waiting").length;
  const inConsult = queueEntries.filter(
    (e) => e.status === "in-consultation",
  ).length;

  return (
    <div className="dash-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            <Users className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Today&apos;s Queue
          </h3>
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-100 px-1.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
            {queueEntries.length}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <span>{waiting} waiting</span>
          <span>·</span>
          <span>{inConsult} active</span>
        </div>
      </div>

      {/* List */}
      <div className="p-4">
        {queueEntries.length === 0 ? (
          <div className="py-8 text-center">
            <Clock className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600" />
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Queue is empty
            </p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-2"
          >
            {queueEntries.map((entry) => (
              <QueueRow key={entry.queueNumber} entry={entry} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
