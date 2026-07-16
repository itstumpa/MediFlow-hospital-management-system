"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarDays, ExternalLink, Paperclip } from "lucide-react";
import Link from "next/link";
import type { MedicalRecord } from "./types";
import {
  recordStatusConfig,
  recordTypeColors,
  recordTypeIcons,
  recordTypeLabels,
} from "./types";

interface MedicalCardProps {
  records: MedicalRecord[];
  className?: string;
}

export function MedicalCard({ records, className }: MedicalCardProps) {
  if (records.length === 0) {
    return (
      <motion.div
        variants={staggerItem}
        className={cn("dash-card p-12 text-center", className)}
      >
        <div className="flex flex-col items-center justify-center">
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
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerItem}
      className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}
    >
      {records.map((record, i) => {
        const TypeIcon = recordTypeIcons[record.recordType];
        const colors = recordTypeColors[record.recordType];
        const statusCfg = recordStatusConfig[record.status];

        return (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: i * 0.03,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            whileTap={{ y: 0, transition: { duration: 0.1 } }}
            className="dash-card group flex flex-col p-5 transition-shadow hover:shadow-md"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl",
                    colors.bg,
                    colors.darkBg,
                  )}
                >
                  <TypeIcon
                    className={cn("h-5 w-5", colors.text, colors.darkText)}
                  />
                </div>
                <div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      colors.bg,
                      colors.text,
                      colors.darkBg,
                      colors.darkText,
                    )}
                  >
                    <span
                      className={cn("h-1.5 w-1.5 rounded-full", colors.dot)}
                    />
                    {recordTypeLabels[record.recordType]}
                  </span>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {record.date}
                  </p>
                </div>
              </div>

              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold shrink-0",
                  statusCfg.className,
                )}
              >
                {statusCfg.label}
              </span>
            </div>

            {/* Diagnosis */}
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[var(--color-primary)] dark:group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
              {record.diagnosis}
            </h4>

            {/* Doctor */}
            <div className="flex items-center gap-2 mb-1.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-dash-primary to-dash-primary-dark text-[8px] font-bold text-white">
                {record.doctor.initials}
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">
                {record.doctor.name}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                {record.department}
              </span>
            </div>

            {/* Treatment */}
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed flex-1">
              {record.treatment}
            </p>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700/40">
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Paperclip className="h-3 w-3" />
                {record.attachments.length} file
                {record.attachments.length !== 1 ? "s" : ""}
              </span>
              <Link
                href={`/medical-records/${record.id}`}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[10px] font-medium text-slate-500 transition-all hover:border-slate-300 hover:text-slate-700 dark:border-slate-600 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-slate-200"
              >
                View Details
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
