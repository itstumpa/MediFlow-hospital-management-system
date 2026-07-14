"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  ClipboardList,
  FileText,
  HeartPulse,
  Pill,
} from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { PatientProfile } from "./patient-profile-mock-data";

interface ProfileOverviewTabProps {
  patient: PatientProfile;
}

export function ProfileOverviewTab({ patient }: ProfileOverviewTabProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Chief Complaint */}
      <motion.div variants={staggerItem}>
        <SectionCard
          icon={ClipboardList}
          label="Chief Complaint"
          color="text-amber-500"
          bg="bg-amber-50 dark:bg-amber-950/30"
        >
          <p className="text-sm text-slate-800 dark:text-slate-200">
            {patient.chiefComplaint}
          </p>
        </SectionCard>
      </motion.div>

      {/* Current Symptoms */}
      <motion.div variants={staggerItem}>
        <SectionCard
          icon={AlertCircle}
          label="Current Symptoms"
          color="text-rose-500"
          bg="bg-rose-50 dark:bg-rose-950/30"
        >
          <div className="flex flex-wrap gap-1.5">
            {patient.currentSymptoms.map((symptom, idx) => (
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

      {/* Doctor Notes */}
      <motion.div variants={staggerItem}>
        <SectionCard
          icon={FileText}
          label="Doctor Notes"
          color="text-dash-primary"
          bg="bg-dash-primary-light dark:bg-teal-950/30"
        >
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {patient.doctorNotes}
          </p>
        </SectionCard>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Current Medications */}
        <motion.div variants={staggerItem}>
          <SectionCard
            icon={Pill}
            label="Current Medications"
            color="text-indigo-500"
            bg="bg-indigo-50 dark:bg-indigo-950/30"
          >
            <div className="space-y-2">
              {patient.currentMedications.map((med, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 rounded-lg border border-slate-100 p-2 dark:border-slate-800"
                >
                  <Pill className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-400" />
                  <div>
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                      {med.name}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {med.dosage} — {med.frequency}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </motion.div>

        {/* Chronic Diseases */}
        <motion.div variants={staggerItem}>
          <SectionCard
            icon={HeartPulse}
            label="Chronic Diseases"
            color="text-rose-500"
            bg="bg-rose-50 dark:bg-rose-950/30"
          >
            <div className="space-y-1.5">
              {patient.chronicDiseases.map((disease, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-lg border border-rose-100 bg-rose-50/30 p-2 dark:border-rose-950/30 dark:bg-rose-950/10"
                >
                  <HeartPulse className="h-3.5 w-3.5 shrink-0 text-rose-400" />
                  <span className="text-xs text-slate-700 dark:text-slate-300">
                    {disease}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </motion.div>
      </div>

      {/* Lifestyle Notes */}
      <motion.div variants={staggerItem}>
        <SectionCard
          icon={Activity}
          label="Lifestyle Notes"
          color="text-emerald-500"
          bg="bg-emerald-50 dark:bg-emerald-950/30"
        >
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {patient.lifestyleNotes}
          </p>
        </SectionCard>
      </motion.div>
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
