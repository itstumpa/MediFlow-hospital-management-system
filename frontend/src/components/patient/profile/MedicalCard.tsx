"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Bone,
  HeartPulse,
  Pill,
  Ruler,
  Weight,
} from "lucide-react";
import type { PatientProfile } from "./types";

/* ─── Props ─── */

interface MedicalCardProps {
  profile: PatientProfile;
}

/* ─── Tag chip ─── */

function TagChip({
  label,
  variant = "default",
}: {
  label: string;
  variant?: "default" | "warning" | "info";
}) {
  const styles = {
    default:
      "bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300",
    warning:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    info: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  };

  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-200">
      {variant === "warning" && <AlertTriangle className="h-3 w-3" />}
      {label}
    </span>
  );
}

/* ─── Stat block ─── */

function StatBlock({
  icon: Icon,
  label,
  value,
  unit,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  unit?: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="flex items-center gap-3 rounded-xl bg-slate-50/80 p-4 transition-colors duration-200 hover:bg-slate-100/60 dark:bg-slate-800/30 dark:hover:bg-slate-700/40"
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white"
        style={{ backgroundColor: color }}
      >
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white">
          {value}
          {unit && (
            <span className="ml-0.5 text-xs font-normal text-slate-400">
              {unit}
            </span>
          )}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Component ─── */

export function MedicalCard({ profile }: MedicalCardProps) {
  return (
    <motion.div variants={staggerItem} className="dash-card">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5 dark:border-slate-700/50">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-500 dark:bg-rose-950/40 dark:text-rose-400">
          <HeartPulse className="h-4.5 w-4.5" />
        </span>
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            Medical Information
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Health metrics and clinical details
          </p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-3 p-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatBlock
          icon={HeartPulse}
          label="Blood Group"
          value={profile.bloodGroup}
          color="#ef4444"
        />
        <StatBlock
          icon={Ruler}
          label="Height"
          value={profile.height}
          color="#8b5cf6"
        />
        <StatBlock
          icon={Weight}
          label="Weight"
          value={profile.weight}
          color="#06b6d4"
        />
        <StatBlock
          icon={Activity}
          label="BMI"
          value={profile.bmi}
          unit="kg/m²"
          color="#10b981"
        />
      </div>

      {/* Allergies */}
      {profile.allergies.length > 0 && (
        <div className="border-t border-slate-100 px-6 py-4 dark:border-slate-700/50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Allergies
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {profile.allergies.map((a) => (
                  <TagChip key={a} label={a} variant="warning" />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chronic Diseases */}
      {profile.chronicDiseases.length > 0 && (
        <div className="border-t border-slate-100 px-6 py-4 dark:border-slate-700/50">
          <div className="flex items-start gap-3">
            <Bone className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Chronic Conditions
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {profile.chronicDiseases.map((d) => (
                  <TagChip key={d} label={d} variant="info" />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Current Medications */}
      {profile.currentMedications.length > 0 && (
        <div className="border-t border-slate-100 px-6 py-4 dark:border-slate-700/50">
          <div className="flex items-start gap-3">
            <Pill className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Current Medications
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {profile.currentMedications.map((m) => (
                  <TagChip key={m} label={m} variant="default" />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
