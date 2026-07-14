"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Activity,
  FileText,
  MessageSquareText,
  Stethoscope,
} from "lucide-react";
import type { RecordDetailData } from "./types";
import { VitalsCard } from "./VitalsCard";

/* ─── Section card ─── */

function SectionCard({
  icon,
  title,
  children,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "rounded-xl border border-slate-100 bg-white p-5 dark:border-slate-700/40 dark:bg-slate-800/60",
        className,
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          {title}
        </h3>
      </div>
      {children}
    </motion.div>
  );
}

/* ─── Symptom badge ─── */

function SymptomBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600">
      {label}
    </span>
  );
}

/* ─── Props ─── */

interface OverviewTabProps {
  data: RecordDetailData;
  className?: string;
}

export function OverviewTab({ data, className }: OverviewTabProps) {
  const { record, chiefComplaint, symptoms, doctorNotes, patientNotes } = data;

  return (
    <div className={cn("space-y-5", className)}>
      {/* Chief Complaint */}
      <SectionCard
        icon={<Stethoscope className="h-4 w-4 text-blue-500" />}
        title="Chief Complaint"
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {chiefComplaint}
        </p>
      </SectionCard>

      {/* Symptoms */}
      <SectionCard
        icon={<Activity className="h-4 w-4 text-rose-500" />}
        title="Symptoms"
      >
        <div className="flex flex-wrap gap-1.5">
          {symptoms.map((symptom) => (
            <SymptomBadge key={symptom} label={symptom} />
          ))}
        </div>
      </SectionCard>

      {/* Doctor Notes */}
      <SectionCard
        icon={<FileText className="h-4 w-4 text-emerald-500" />}
        title="Doctor's Notes"
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {doctorNotes}
        </p>
      </SectionCard>

      {/* Patient Notes */}
      {patientNotes && (
        <SectionCard
          icon={<MessageSquareText className="h-4 w-4 text-violet-500" />}
          title="Patient's Notes"
        >
          <p className="text-sm leading-relaxed italic text-slate-600 dark:text-slate-400">
            &ldquo;{patientNotes}&rdquo;
          </p>
        </SectionCard>
      )}

      {/* Vitals */}
      <VitalsCard vitals={data.vitals} />
    </div>
  );
}
