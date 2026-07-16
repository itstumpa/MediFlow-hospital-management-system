"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  CalendarClock,
  CheckCircle2,
  FlaskConical,
  HeartPulse,
  Lightbulb,
  ListChecks,
} from "lucide-react";
import type { RecordDetailData } from "./types";

/* ─── Section ─── */

function SectionBlock({
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

/* ─── Medication card ─── */

function MedicationCard({
  med,
}: {
  med: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  };
}) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3.5 transition-all hover:border-slate-200 hover:shadow-sm dark:border-slate-700/30 dark:bg-slate-700/20 dark:hover:border-slate-600/50">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {med.name}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {med.dosage} &middot; {med.frequency}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-dash-primary-light px-2 py-0.5 text-[10px] font-semibold text-dash-primary dark:bg-teal-950/40 dark:text-[var(--color-accent)]">
          {med.duration}
        </span>
      </div>
      <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
        {med.instructions}
      </p>
    </div>
  );
}

/* ─── Props ─── */

interface TreatmentTabProps {
  data: RecordDetailData;
  className?: string;
}

export function TreatmentTab({ data, className }: TreatmentTabProps) {
  const { treatment, record } = data;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Treatment Plan */}
      <SectionBlock
        icon={<ListChecks className="h-4 w-4 text-emerald-500" />}
        title="Treatment Plan"
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {treatment.plan}
        </p>
      </SectionBlock>

      {/* Procedures */}
      {treatment.procedures.length > 0 && (
        <SectionBlock
          icon={<FlaskConical className="h-4 w-4 text-violet-500" />}
          title="Procedures Performed"
        >
          <ul className="space-y-2">
            {treatment.procedures.map((proc, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
              >
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                <span>{proc}</span>
              </li>
            ))}
          </ul>
        </SectionBlock>
      )}

      {/* Medications */}
      {treatment.medications.length > 0 && (
        <SectionBlock
          icon={<HeartPulse className="h-4 w-4 text-rose-500" />}
          title="Medications"
        >
          <div className="space-y-2">
            {treatment.medications.map((med) => (
              <MedicationCard key={med.name} med={med} />
            ))}
          </div>
        </SectionBlock>
      )}

      {/* Lifestyle Advice */}
      {treatment.lifestyleAdvice.length > 0 && (
        <SectionBlock
          icon={<Lightbulb className="h-4 w-4 text-amber-500" />}
          title="Lifestyle Advice"
        >
          <ul className="space-y-2">
            {treatment.lifestyleAdvice.map((advice, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-50 text-[10px] font-bold text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                  {i + 1}
                </span>
                <span>{advice}</span>
              </li>
            ))}
          </ul>
        </SectionBlock>
      )}

      {/* Next Visit */}
      {treatment.nextVisit && (
        <SectionBlock
          icon={<CalendarClock className="h-4 w-4 text-indigo-500" />}
          title="Next Visit"
        >
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Your next appointment is scheduled for{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {treatment.nextVisit}
            </span>
            . Please arrive 15 minutes early and bring any relevant test
            results.
          </p>
        </SectionBlock>
      )}
    </div>
  );
}
