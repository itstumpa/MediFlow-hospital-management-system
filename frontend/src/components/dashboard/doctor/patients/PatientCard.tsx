"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarPlus, Eye } from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { PatientRecord, ViewMode } from "./patients-mock-data";
import { statusConfig } from "./patients-mock-data";

interface PatientCardProps {
  patients: PatientRecord[];
  onSelectPatient: (patient: PatientRecord) => void;
  viewMode: ViewMode;
}

export function PatientCard({
  patients,
  onSelectPatient,
  viewMode,
}: PatientCardProps) {
  if (viewMode !== "cards") return null;
  if (patients.length === 0) return null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {patients.map((patient) => {
        const sConf = statusConfig[patient.appointmentStatus];
        return (
          <motion.div
            key={patient.id}
            variants={staggerItem}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className={cn(
              "group rounded-xl border border-slate-200/60 bg-white p-4 transition-all",
              "hover:shadow-lg hover:shadow-slate-900/5",
              "dark:border-slate-700/40 dark:bg-slate-900/60",
            )}
          >
            {/* Top row: Avatar + Status */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white shadow-sm",
                    patient.avatarGradient,
                  )}
                >
                  {patient.initials}
                </div>
                <div>
                  <button
                    onClick={() => onSelectPatient(patient)}
                    className="text-sm font-semibold text-slate-900 transition-colors hover:text-dash-primary dark:text-white dark:hover:text-accent"
                  >
                    {patient.name}
                  </button>
                  <p className="text-[10px] text-slate-400">
                    {patient.patientId}
                  </p>
                </div>
              </div>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                  sConf.bg,
                  sConf.text,
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 animate-pulse rounded-full",
                    sConf.dot,
                  )}
                />
                {patient.appointmentStatus}
              </span>
            </div>

            {/* Details */}
            <div className="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/40">
              <div className="text-center">
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {patient.age}
                </p>
                <p className="text-[9px] text-slate-400">Age</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-slate-900 dark:text-white">
                  {patient.gender}
                </p>
                <p className="text-[9px] text-slate-400">Gender</p>
              </div>
              <div className="text-center">
                <span className="inline-block rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                  {patient.bloodGroup}
                </span>
                <p className="mt-0.5 text-[9px] text-slate-400">Blood</p>
              </div>
            </div>

            {/* Condition */}
            <div className="mt-2.5">
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {patient.condition}
              </p>
              <p className="mt-1 text-[10px] leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
                {patient.doctorNotes}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
              <button
                onClick={() => onSelectPatient(patient)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-dash-primary-light py-1.5 text-[11px] font-medium text-dash-primary transition-colors hover:bg-dash-primary-light/80 dark:bg-teal-950/30 dark:text-accent dark:hover:bg-teal-950/50"
              >
                <Eye className="h-3.5 w-3.5" />
                View Profile
              </button>
              <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-1.5 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800">
                <CalendarPlus className="h-3.5 w-3.5" />
                Follow-up
              </button>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
