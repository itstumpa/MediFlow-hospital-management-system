"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarDays, Download, FileDown, HardDrive } from "lucide-react";
import type { AttachmentDetail, RecordDetailData } from "./types";
import { attachmentCategoryConfig } from "./types";

/* ─── Attachment item ─── */

function AttachmentItem({
  att,
  index,
}: {
  att: AttachmentDetail;
  index: number;
}) {
  const cfg = attachmentCategoryConfig[att.category];
  const Icon = cfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.25,
        delay: index * 0.04,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 transition-all hover:border-slate-200 hover:shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60 dark:hover:border-slate-600/50"
    >
      {/* Icon */}
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          "bg-slate-50 dark:bg-slate-700",
        )}
      >
        <Icon className={cn("h-5 w-5", cfg.color)} />
      </div>

      {/* Details */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
          {att.name}
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400">
          <span>
            {att.category === "prescription"
              ? "Prescription"
              : att.category === "report"
                ? "Report"
                : att.category === "image"
                  ? "Medical Image"
                  : att.category === "invoice"
                    ? "Invoice"
                    : att.category === "lab"
                      ? "Lab Result"
                      : "Document"}
          </span>
          <span className="flex items-center gap-1">
            <HardDrive className="h-3 w-3" />
            {att.size}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            {att.date}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500 truncate">
          {att.description}
        </p>
      </div>

      {/* Download */}
      <button
        type="button"
        onClick={() => {}}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 active:scale-95 dark:border-slate-600 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-200"
        aria-label={`Download ${att.name}`}
      >
        <Download className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Download</span>
      </button>
    </motion.div>
  );
}

/* ─── Empty state ─── */

function EmptyAttachments() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-700/50">
        <FileDown className="h-6 w-6 text-slate-300 dark:text-slate-500" />
      </div>
      <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-300">
        No attachments available
      </p>
      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
        There are no files attached to this record.
      </p>
    </div>
  );
}

/* ─── Props ─── */

interface AttachmentTabProps {
  data: RecordDetailData;
  className?: string;
}

export function AttachmentTab({ data, className }: AttachmentTabProps) {
  const { attachments } = data;

  if (attachments.length === 0) {
    return <EmptyAttachments />;
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="mb-1">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {attachments.length} file{attachments.length !== 1 ? "s" : ""}
        </p>
      </div>
      {attachments.map((att, i) => (
        <AttachmentItem key={att.id} att={att} index={i} />
      ))}
    </div>
  );
}
