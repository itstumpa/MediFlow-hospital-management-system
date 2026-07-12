"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/app/components/dashboard/MotionVariants";
import { EmptyState } from "@/app/components/ui/EmptyState";
import type { MedicalRecord } from "@/lib/data/patient-detail";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Calendar,
  FileImage,
  FileSpreadsheet,
  FileText,
  Paperclip,
  Stethoscope,
} from "lucide-react";

interface MedicalRecordsTabProps {
  records: MedicalRecord[];
}

const fileIcons: Record<string, React.ElementType> = {
  PDF: FileText,
  Image: FileImage,
  Spreadsheet: FileSpreadsheet,
};

function RecordTimeline({ records }: MedicalRecordsTabProps) {
  if (records.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No Medical Records"
        description="This patient has no medical records yet."
      />
    );
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-dash-border dark:bg-slate-700" />

      <div className="space-y-6">
        {records.map((record, i) => (
          <motion.div
            key={record.id}
            variants={staggerItem}
            initial="hidden"
            animate="visible"
            className="relative pl-12"
          >
            {/* Timeline dot */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1 + i * 0.05,
              }}
              className="absolute left-0 top-1.5 flex h-10 w-10 items-center justify-center rounded-xl bg-dash-primary/10 ring-4 ring-white dark:ring-slate-900"
            >
              <Stethoscope className="h-5 w-5 text-dash-primary" />
            </motion.div>

            {/* Card */}
            <div className="dash-card overflow-hidden transition-shadow hover:shadow-md">
              <div className="border-b border-dash-border px-5 py-3.5 dark:border-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {record.diagnosis}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(record.date)}
                  </div>
                </div>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {record.doctor} &middot; {record.department}
                </p>
              </div>

              <div className="space-y-3 px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Treatment
                  </p>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                    {record.treatment}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Notes
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {record.notes}
                  </p>
                </div>

                {record.attachments.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      <Paperclip className="mr-1 inline h-3 w-3" />
                      Attachments ({record.attachments.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {record.attachments.map((att, j) => {
                        const Icon = fileIcons[att.type] || FileText;
                        return (
                          <button
                            key={j}
                            className="inline-flex items-center gap-2 rounded-lg border border-dash-border bg-slate-50 px-3 py-2 text-xs transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-700"
                          >
                            <Icon className="h-4 w-4 text-slate-400" />
                            <span className="font-medium text-slate-700 dark:text-slate-300">
                              {att.name}
                            </span>
                            <span className="text-slate-400">({att.size})</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function MedicalRecordsTab({ records }: MedicalRecordsTabProps) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <RecordTimeline records={records} />
    </motion.div>
  );
}
