"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Building2, CalendarDays, ExternalLink, User } from "lucide-react";
import Link from "next/link";
import type { MedicalRecord } from "./types";
import {
  recordStatusConfig,
  recordTypeColors,
  recordTypeIcons,
  recordTypeLabels,
} from "./types";

/* ─── Props ─── */

interface MedicalTimelineProps {
  grouped: Record<string, MedicalRecord[]>;
  className?: string;
}

/* ─── Year section ─── */

function YearSection({
  year,
  records,
}: {
  year: string;
  records: MedicalRecord[];
}) {
  return (
    <div className="relative">
      {/* Year label */}
      <div className="sticky top-0 z-10 -mx-1 mb-4 bg-white/90 px-1 py-2 backdrop-blur-sm dark:bg-slate-800/90">
        <span className="inline-flex items-center rounded-full bg-[var(--color-primary)]/10 px-4 py-1.5 text-sm font-bold text-[var(--color-primary)] dark:bg-[var(--color-accent)]/10 dark:text-[var(--color-accent)]">
          {year}
          <span className="ml-2 text-xs font-normal opacity-70">
            ({records.length} record{records.length !== 1 ? "s" : ""})
          </span>
        </span>
      </div>

      <div className="space-y-0">
        {records.map((record, index) => (
          <TimelineEntry
            key={record.id}
            record={record}
            isLast={index === records.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Single timeline entry ─── */

function TimelineEntry({
  record,
  isLast,
}: {
  record: MedicalRecord;
  isLast: boolean;
}) {
  const TypeIcon = recordTypeIcons[record.recordType];
  const colors = recordTypeColors[record.recordType];
  const statusCfg = recordStatusConfig[record.status];

  return (
    <div className="relative flex gap-5 pb-6">
      {/* Timeline line + icon */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 200,
          }}
          className={cn(
            "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 shadow-sm",
            colors.bg,
            colors.darkBg,
            `border-current ${colors.text}`,
          )}
        >
          <TypeIcon className="h-4.5 w-4.5" />
        </motion.div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-slate-200 dark:bg-slate-700" />
        )}
      </div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "group flex-1 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-slate-200 hover:shadow-md dark:border-slate-700/40 dark:bg-slate-800/60 dark:hover:border-slate-600/60",
          isLast && "pb-4",
        )}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                  colors.bg,
                  colors.text,
                  colors.darkBg,
                  colors.darkText,
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", colors.dot)} />
                {recordTypeLabels[record.recordType]}
              </span>
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold",
                  statusCfg.className,
                )}
              >
                {statusCfg.label}
              </span>
            </div>

            <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[var(--color-primary)] dark:group-hover:text-[var(--color-accent)] transition-colors">
              {record.diagnosis}
            </h4>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                {record.date}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {record.doctor.name}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {record.department}
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
              {record.treatment}
            </p>

            {record.attachments.length > 0 && (
              <p className="mt-1.5 text-[11px] text-slate-400 dark:text-slate-500">
                {record.attachments.length} attachment
                {record.attachments.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          <Link
            href={`/medical-records/${record.id}`}
            className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-500 transition-all hover:border-slate-300 hover:text-slate-700 dark:border-slate-600 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-slate-200"
          >
            View Details
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Empty state for timeline ─── */

function TimelineEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-700/50">
        <CalendarDays className="h-6 w-6 text-slate-300 dark:text-slate-500" />
      </div>
      <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-300">
        No records match your filters
      </p>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
        Try adjusting your search or filter criteria.
      </p>
    </div>
  );
}

/* ─── Main component ─── */

export function MedicalTimeline({ grouped, className }: MedicalTimelineProps) {
  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  if (years.length === 0) {
    return (
      <motion.div
        variants={staggerItem}
        className={cn("dash-card p-6", className)}
      >
        <TimelineEmpty />
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerItem}
      className={cn("dash-card p-6", className)}
    >
      <div className="space-y-8">
        {years.map((year) => (
          <YearSection key={year} year={year} records={grouped[year]} />
        ))}
      </div>
    </motion.div>
  );
}
