"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Activity,
  HeartPulse,
  Hospital,
  Stethoscope,
  Syringe,
  Users,
  AlertTriangle,
  Calendar,
} from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { PatientProfile } from "./patient-profile-mock-data";

interface ProfileMedicalHistoryTabProps {
  patient: PatientProfile;
}

export function ProfileMedicalHistoryTab({
  patient,
}: ProfileMedicalHistoryTabProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Diagnoses */}
      <motion.div variants={staggerItem}>
        <SectionCard
          icon={Stethoscope}
          label="Diagnoses"
          color="text-indigo-500"
          bg="bg-indigo-50 dark:bg-indigo-950/30"
        >
          <div className="space-y-2">
            {patient.diagnoses.map((d, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-lg border border-slate-100 p-2.5 dark:border-slate-800"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/30">
                  <Stethoscope className="h-3.5 w-3.5 text-indigo-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium text-slate-900 dark:text-white">
                      {d.condition}
                    </p>
                    <span className="shrink-0 text-[10px] text-slate-400">
                      {d.date}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                    {d.notes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Surgeries */}
        <motion.div variants={staggerItem}>
          <SectionCard
            icon={Syringe}
            label="Surgeries"
            color="text-rose-500"
            bg="bg-rose-50 dark:bg-rose-950/30"
          >
            {patient.surgeries.length === 0 ? (
              <EmptySlot message="No surgeries recorded" />
            ) : (
              <div className="space-y-2">
                {patient.surgeries.map((s, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-rose-100 bg-rose-50/30 p-2.5 dark:border-rose-950/30 dark:bg-rose-950/10"
                  >
                    <p className="text-xs font-medium text-slate-900 dark:text-white">
                      {s.procedure}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {s.date} — {s.hospital}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </motion.div>

        {/* Hospitalizations */}
        <motion.div variants={staggerItem}>
          <SectionCard
            icon={Hospital}
            label="Hospitalizations"
            color="text-amber-500"
            bg="bg-amber-50 dark:bg-amber-950/30"
          >
            {patient.hospitalizations.length === 0 ? (
              <EmptySlot message="No hospitalizations recorded" />
            ) : (
              <div className="space-y-2">
                {patient.hospitalizations.map((h, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-amber-100 bg-amber-50/30 p-2.5 dark:border-amber-950/30 dark:bg-amber-950/10"
                  >
                    <p className="text-xs font-medium text-slate-900 dark:text-white">
                      {h.reason}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {h.date} — {h.hospital} ({h.duration})
                    </p>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </motion.div>
      </div>

      {/* Previous Treatments */}
      <motion.div variants={staggerItem}>
        <SectionCard
          icon={Activity}
          label="Previous Treatments"
          color="text-emerald-500"
          bg="bg-emerald-50 dark:bg-emerald-950/30"
        >
          {patient.previousTreatments.length === 0 ? (
            <EmptySlot message="No previous treatments recorded" />
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {patient.previousTreatments.map((t, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 rounded-lg border border-emerald-100 bg-emerald-50/30 p-2.5 dark:border-emerald-950/30 dark:bg-emerald-950/10"
                >
                  <Activity className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  <div>
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                      {t.treatment}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {t.date} — {t.provider}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Family History */}
        <motion.div variants={staggerItem}>
          <SectionCard
            icon={Users}
            label="Family History"
            color="text-cyan-500"
            bg="bg-cyan-50 dark:bg-cyan-950/30"
          >
            <div className="space-y-1.5">
              {patient.familyHistory.map((f, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 rounded-lg border border-cyan-100 bg-cyan-50/30 p-2 dark:border-cyan-950/30 dark:bg-cyan-950/10"
                >
                  <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
                  <div>
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                      {f.relation}
                    </p>
                    <p className="text-[10px] text-slate-400">{f.condition}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </motion.div>

        {/* Mental Health */}
        <motion.div variants={staggerItem}>
          <SectionCard
            icon={HeartPulse}
            label="Mental Health"
            color="text-purple-500"
            bg="bg-purple-50 dark:bg-purple-950/30"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300">
              {patient.mentalHealthNotes}
            </p>
          </SectionCard>
        </motion.div>
      </div>
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
        <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg", bg)}>
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

function EmptySlot({ message }: { message: string }) {
  return (
    <p className="py-1 text-xs italic text-slate-400 dark:text-slate-500">
      {message}
    </p>
  );
}
