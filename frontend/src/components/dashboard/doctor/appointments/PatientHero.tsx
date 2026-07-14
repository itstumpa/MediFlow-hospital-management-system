"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertTriangle, Phone, Shield, VenusAndMars } from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { AppointmentPatientData } from "./appointment-detail-mock-data";

interface PatientHeroProps {
  patient: AppointmentPatientData;
}

export function PatientHero({ patient }: PatientHeroProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={cn(
        "relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-5",
        "dark:border-slate-700/40 dark:bg-slate-900/60",
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        {/* Avatar */}
        <motion.div
          variants={staggerItem}
          className={cn(
            "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-xl font-bold text-white shadow-md",
            patient.avatarGradient,
          )}
        >
          {patient.initials}
        </motion.div>

        {/* Info */}
        <div className="min-w-0 flex-1 space-y-3">
          {/* Name + ID row */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap items-center gap-x-3 gap-y-1"
          >
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {patient.name}
            </h2>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {patient.patientId}
            </span>
          </motion.div>

          {/* Detail grid */}
          <motion.div
            variants={staggerItem}
            className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 lg:grid-cols-4"
          >
            <DetailItem
              icon={VenusAndMars}
              label="Age / Gender"
              value={`${patient.age} / ${patient.gender}`}
            />
            <DetailItem
              icon={Shield}
              label="Blood Group"
              value={patient.bloodGroup}
            />
            <DetailItem icon={Phone} label="Phone" value={patient.phone} />
            <DetailItem
              icon={Shield}
              label="Insurance"
              value={patient.insurance}
            />
          </motion.div>
        </div>
      </div>

      {/* Allergy Badge */}
      <motion.div
        variants={staggerItem}
        className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800"
      >
        <div className="inline-flex items-center gap-1.5 rounded-lg bg-rose-50 px-2.5 py-1 dark:bg-rose-950/30">
          <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
          <span className="text-[11px] font-medium text-rose-600 dark:text-rose-400">
            Allergies: Penicillin, Sulfa Drugs
          </span>
        </div>
        <span className="text-[11px] text-slate-400 dark:text-slate-500">
          Last updated: Mar 2026
        </span>
      </motion.div>
    </motion.div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
      <div className="min-w-0">
        <p className="text-[10px] text-slate-400 dark:text-slate-500">
          {label}
        </p>
        <p className="truncate text-xs font-medium text-slate-700 dark:text-slate-300">
          {value}
        </p>
      </div>
    </div>
  );
}
