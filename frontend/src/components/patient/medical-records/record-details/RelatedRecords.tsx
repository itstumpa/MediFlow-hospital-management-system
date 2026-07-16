"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  User,
} from "lucide-react";
import Link from "next/link";
import { recordTypeLabels } from "../types";
import type { RecordDetailData, RelatedRecord } from "./types";

/* ─── Related record row ─── */

function RelatedRecordRow({ related }: { related: RelatedRecord }) {
  const relationshipConfig = {
    previous: {
      icon: ArrowLeft,
      label: "Previous Visit",
      color: "text-blue-500",
    },
    next: {
      icon: ArrowRight,
      label: "Next Visit",
      color: "text-[var(--color-primary)]",
    },
    similar: { icon: User, label: "Similar Case", color: "text-violet-500" },
  };

  const cfg = relationshipConfig[related.relationship];
  const RelIcon = cfg.icon;

  return (
    <Link
      href={`/medical-records/${related.id}`}
      className="group flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 transition-all hover:border-slate-200 hover:shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60 dark:hover:border-slate-600/50"
    >
      {/* Avatar */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-dash-primary to-dash-primary-dark text-sm font-bold text-white">
        {related.doctor.initials}
      </div>

      {/* Details */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-[var(--color-primary)] dark:group-hover:text-[var(--color-accent)] transition-colors">
            {related.diagnosis}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {related.doctor.name}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            {related.date}
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
            {recordTypeLabels[
              related.recordType as keyof typeof recordTypeLabels
            ] || related.recordType}
          </span>
        </div>
      </div>

      {/* Badge + Chevron */}
      <div className="flex shrink-0 items-center gap-2">
        <span
          className={cn(
            "hidden sm:inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold",
            cfg.color === "text-blue-500" &&
              "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
            cfg.color === "text-emerald-500" &&
              "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
            cfg.color === "text-violet-500" &&
              "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
          )}
        >
          <RelIcon className="mr-1 h-3 w-3" />
          {cfg.label}
        </span>
        <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 dark:text-slate-600" />
      </div>
    </Link>
  );
}

/* ─── Empty state ─── */

function EmptyRelated({ type }: { type: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        No {type} records found
      </p>
    </div>
  );
}

/* ─── Section ─── */

function RelatedSection({
  title,
  records,
  emptyType,
}: {
  title: string;
  records: RelatedRecord[];
  emptyType: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
        {title}
      </h3>
      {records.length === 0 ? (
        <EmptyRelated type={emptyType} />
      ) : (
        <div className="space-y-2">
          {records.map((r) => (
            <RelatedRecordRow key={`${r.relationship}-${r.id}`} related={r} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Props ─── */

interface RelatedRecordsProps {
  data: RecordDetailData;
  className?: string;
}

export function RelatedRecords({ data, className }: RelatedRecordsProps) {
  const { relatedRecords } = data;

  if (relatedRecords.length === 0) return null;

  const previous = relatedRecords.filter((r) => r.relationship === "previous");
  const next = relatedRecords.filter((r) => r.relationship === "next");
  const similar = relatedRecords.filter((r) => r.relationship === "similar");

  return (
    <motion.div
      variants={staggerItem}
      className={cn("dash-card p-5", className)}
    >
      <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
        Related Records
      </h2>
      <div className="space-y-6">
        {previous.length > 0 && (
          <RelatedSection
            title="Previous Visit"
            records={previous}
            emptyType="previous"
          />
        )}
        {next.length > 0 && (
          <RelatedSection
            title="Upcoming Visit"
            records={next}
            emptyType="upcoming"
          />
        )}
        {similar.length > 0 && (
          <RelatedSection
            title="Similar Cases"
            records={similar}
            emptyType="similar"
          />
        )}
      </div>
    </motion.div>
  );
}
