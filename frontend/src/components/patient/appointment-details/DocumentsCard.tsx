"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Download,
  FileDown,
  FileText,
  FlaskConical,
  Pill,
  Receipt,
  type LucideIcon,
} from "lucide-react";
import type { Document } from "./types";

const docIcons: Record<string, LucideIcon> = {
  prescription: Pill,
  "medical-record": FileText,
  invoice: Receipt,
  "lab-request": FlaskConical,
};

const docColors: Record<string, { color: string; bg: string; darkBg: string }> =
  {
    prescription: {
      color: "text-violet-600",
      bg: "bg-violet-50",
      darkBg: "dark:bg-violet-950/40",
    },
    "medical-record": {
      color: "text-blue-600",
      bg: "bg-blue-50",
      darkBg: "dark:bg-blue-950/40",
    },
    invoice: {
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      darkBg: "dark:bg-emerald-950/40",
    },
    "lab-request": {
      color: "text-amber-600",
      bg: "bg-amber-50",
      darkBg: "dark:bg-amber-950/40",
    },
  };

interface DocumentsCardProps {
  documents: Document[];
  className?: string;
}

export function DocumentsCard({ documents, className }: DocumentsCardProps) {
  if (documents.length === 0) {
    return (
      <motion.div
        variants={staggerItem}
        className={cn(
          "rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60",
          className,
        )}
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Documents
        </h3>
        <EmptyDocuments />
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60",
        className,
      )}
    >
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Documents
      </h3>

      <div className="space-y-3">
        {documents.map((doc, i) => {
          const Icon = docIcons[doc.type] || FileText;
          const colors = docColors[doc.type] || docColors["medical-record"];

          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.05,
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              className="group flex items-center gap-4 rounded-xl border border-slate-100 p-3.5 transition-all hover:border-slate-200 hover:shadow-sm dark:border-slate-700/40 dark:hover:border-slate-600/60"
            >
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  colors.bg,
                  colors.darkBg,
                )}
              >
                <Icon className={cn("h-5 w-5", colors.color)} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {doc.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <span>{doc.description}</span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span>{doc.size}</span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span>{doc.date}</span>
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] dark:border-slate-600 dark:hover:border-[var(--color-accent)] dark:hover:text-[var(--color-accent)]"
              >
                <Download className="h-4 w-4" />
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function EmptyDocuments() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-700/50">
        <FileDown className="h-6 w-6 text-slate-300 dark:text-slate-500" />
      </div>
      <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-300">
        No documents available
      </p>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
        Documents will appear here once the appointment is completed.
      </p>
    </div>
  );
}
