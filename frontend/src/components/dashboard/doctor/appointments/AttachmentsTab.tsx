"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Download, Eye, File, FileImage, FileText } from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { AttachmentEntry } from "./appointment-detail-mock-data";

interface AttachmentsTabProps {
  attachments: AttachmentEntry[];
}

const typeConfig: Record<
  string,
  { icon: typeof FileImage; color: string; bg: string }
> = {
  "Medical Image": {
    icon: FileImage,
    color: "text-cyan-500",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
  },
  Report: {
    icon: FileText,
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
  },
  Document: {
    icon: File,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
};

export function AttachmentsTab({ attachments }: AttachmentsTabProps) {
  if (attachments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <FileText className="mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          No attachments
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {attachments.map((att) => {
        const cfg = typeConfig[att.type] || typeConfig.Document;
        const Icon = cfg.icon;

        return (
          <motion.div
            key={att.id}
            variants={staggerItem}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className={cn(
              "group rounded-xl border border-slate-200/60 bg-white p-4 transition-all",
              "hover:shadow-md hover:shadow-slate-900/5",
              "dark:border-slate-700/40 dark:bg-slate-900/60",
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                  cfg.bg,
                )}
              >
                <Icon className={cn("h-5 w-5", cfg.color)} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                  {att.name}
                </p>
                <p className="text-xs text-slate-400">
                  {att.type} • {att.size}
                </p>
                <p className="text-[10px] text-slate-400">{att.date}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
              <button className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
                <Eye className="h-3 w-3" />
                View
              </button>
              <button className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
                <Download className="h-3 w-3" />
                Download
              </button>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
