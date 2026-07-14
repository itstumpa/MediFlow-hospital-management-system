"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ClipboardList,
  FileText,
  MessageSquareText,
  Stethoscope,
} from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { AppointmentDetailData } from "./appointment-detail-mock-data";

interface OverviewTabProps {
  appointment: AppointmentDetailData;
}

export function OverviewTab({ appointment }: OverviewTabProps) {
  const {
    reasonForVisit,
    chiefComplaint,
    symptoms,
    previousDiagnosis,
    doctorNotes,
  } = appointment;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Reason for Visit */}
      <motion.div variants={staggerItem}>
        <SectionCard
          icon={ClipboardList}
          label="Reason for Visit"
          color="text-indigo-500"
          bg="bg-indigo-50 dark:bg-indigo-950/30"
        >
          <p className="text-sm text-slate-800 dark:text-slate-200">
            {reasonForVisit}
          </p>
        </SectionCard>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Chief Complaint */}
        <motion.div variants={staggerItem}>
          <SectionCard
            icon={MessageSquareText}
            label="Chief Complaint"
            color="text-amber-500"
            bg="bg-amber-50 dark:bg-amber-950/30"
          >
            <p className="text-sm text-slate-800 dark:text-slate-200">
              {chiefComplaint}
            </p>
          </SectionCard>
        </motion.div>

        {/* Symptoms */}
        <motion.div variants={staggerItem}>
          <SectionCard
            icon={AlertCircle}
            label="Symptoms"
            color="text-rose-500"
            bg="bg-rose-50 dark:bg-rose-950/30"
          >
            <div className="flex flex-wrap gap-1.5">
              {symptoms.map((symptom, idx) => (
                <span
                  key={idx}
                  className={cn(
                    "rounded-full border border-rose-100 bg-rose-50/50 px-2.5 py-0.5 text-[11px] font-medium text-rose-600",
                    "dark:border-rose-950/30 dark:bg-rose-950/20 dark:text-rose-400",
                  )}
                >
                  {symptom}
                </span>
              ))}
            </div>
          </SectionCard>
        </motion.div>
      </div>

      {/* Previous Diagnosis */}
      {previousDiagnosis && (
        <motion.div variants={staggerItem}>
          <SectionCard
            icon={Stethoscope}
            label="Previous Diagnosis"
            color="text-emerald-500"
            bg="bg-emerald-50 dark:bg-emerald-950/30"
          >
            <p className="text-sm text-slate-800 dark:text-slate-200">
              {previousDiagnosis}
            </p>
          </SectionCard>
        </motion.div>
      )}

      {/* Doctor's Notes */}
      {doctorNotes && (
        <motion.div variants={staggerItem}>
          <SectionCard
            icon={FileText}
            label="Doctor's Notes"
            color="text-dash-primary"
            bg="bg-dash-primary-light dark:bg-teal-950/30"
          >
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {doctorNotes}
            </p>
          </SectionCard>
        </motion.div>
      )}
    </motion.div>
  );
}

function SectionCard({
  icon: Icon,
  label,
  color,
  bg,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/60 bg-white p-4",
        "dark:border-slate-700/40 dark:bg-slate-900/60",
      )}
    >
      <div className="mb-2.5 flex items-center gap-2">
        <div
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-lg",
            bg,
          )}
        >
          <Icon className={cn("h-4 w-4", color)} />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}
