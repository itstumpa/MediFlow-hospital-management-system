"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { AppointmentDetail } from "@/lib/data/appointment-detail";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ClipboardList,
  Download,
  File,
  FileText,
  Lightbulb,
  Paperclip,
} from "lucide-react";

interface MedicalNotesTabProps {
  appointment: AppointmentDetail;
}

const fileTypeIcons: Record<string, string> = {
  PDF: "text-red-500",
  Image: "text-dash-primary",
  Doc: "text-indigo-500",
};

export function MedicalNotesTab({ appointment }: MedicalNotesTabProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Diagnosis */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-dash-primary-light text-dash-primary dark:bg-teal-500/20 dark:text-accent">
            <ClipboardList className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Diagnosis
          </h3>
        </div>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {appointment.diagnosis}
        </p>
      </motion.div>

      {/* Treatment */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            <FileText className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Treatment Plan
          </h3>
        </div>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {appointment.treatment}
        </p>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
            <Lightbulb className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Recommendations
          </h3>
        </div>
        <ul className="space-y-2">
          {appointment.recommendations.map((rec, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
            >
              <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[10px] font-bold text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
                {i + 1}
              </span>
              {rec}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Attachments */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400">
            <Paperclip className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Attachments ({appointment.attachments.length})
          </h3>
        </div>
        <div className="space-y-2">
          {appointment.attachments.map((att, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 2 }}
              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700/30 dark:hover:bg-slate-700/50"
            >
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg",
                  fileTypeIcons[att.type] || "text-slate-500",
                  "bg-white dark:bg-slate-800",
                )}
              >
                <File className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                  {att.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {att.size} Â· {att.type}
                </p>
              </div>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-600 dark:hover:text-slate-300"
                aria-label={`Download ${att.name}`}
              >
                <Download className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
