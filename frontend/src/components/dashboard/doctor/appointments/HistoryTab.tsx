"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertTriangle, Bandage, Clock, Pill, Stethoscope } from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { MedicalHistoryData } from "./appointment-detail-mock-data";

interface HistoryTabProps {
  history: MedicalHistoryData;
}

export function HistoryTab({ history }: HistoryTabProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Previous Visits */}
      <motion.div variants={staggerItem} className="space-y-2">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <Clock className="h-4 w-4 text-slate-400" />
          Previous Visits
        </h3>
        <div className="space-y-2">
          {history.previousVisits.map((visit, idx) => (
            <div
              key={idx}
              className={cn(
                "flex items-center justify-between rounded-lg border border-slate-100 bg-white p-3",
                "dark:border-slate-800 dark:bg-slate-900/40",
              )}
            >
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {visit.reason}
                </p>
                <p className="text-xs text-slate-400">{visit.doctor}</p>
              </div>
              <span className="shrink-0 text-xs text-slate-400">
                {visit.date}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Chronic Conditions */}
      <motion.div variants={staggerItem} className="space-y-2">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <Stethoscope className="h-4 w-4 text-slate-400" />
          Chronic Conditions
        </h3>
        {history.chronicConditions.length > 0 ? (
          <div className="space-y-2">
            {history.chronicConditions.map((cond, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-center justify-between rounded-lg border border-slate-100 bg-white p-3",
                  "dark:border-slate-800 dark:bg-slate-900/40",
                )}
              >
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {cond.condition}
                  </p>
                  <p className="text-xs text-slate-400">Since {cond.since}</p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-medium",
                    cond.status === "Managed"
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                      : "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
                  )}
                >
                  {cond.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 dark:text-slate-500">
            No chronic conditions recorded.
          </p>
        )}
      </motion.div>

      {/* Allergies */}
      <motion.div variants={staggerItem} className="space-y-2">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <AlertTriangle className="h-4 w-4 text-rose-400" />
          Allergies
        </h3>
        {history.allergies.length > 0 ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {history.allergies.map((allergy, idx) => (
              <div
                key={idx}
                className={cn(
                  "rounded-lg border border-rose-100 bg-rose-50/50 p-3",
                  "dark:border-rose-950/30 dark:bg-rose-950/20",
                )}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {allergy.allergen}
                  </p>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-medium",
                      allergy.severity === "Severe"
                        ? "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
                        : allergy.severity === "Moderate"
                          ? "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
                    )}
                  >
                    {allergy.severity}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {allergy.reaction}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 dark:text-slate-500">
            No known allergies.
          </p>
        )}
      </motion.div>

      {/* Current Medications */}
      <motion.div variants={staggerItem} className="space-y-2">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <Pill className="h-4 w-4 text-slate-400" />
          Current Medications
        </h3>
        {history.currentMedications.length > 0 ? (
          <div className="space-y-2">
            {history.currentMedications.map((med, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-center justify-between rounded-lg border border-slate-100 bg-white p-3",
                  "dark:border-slate-800 dark:bg-slate-900/40",
                )}
              >
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {med.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {med.dosage} — {med.frequency}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">
                    Started {med.started}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {med.prescribedBy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 dark:text-slate-500">
            No current medications.
          </p>
        )}
      </motion.div>

      {/* Surgeries */}
      <motion.div variants={staggerItem} className="space-y-2">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <Bandage className="h-4 w-4 text-slate-400" />
          Surgical History
        </h3>
        {history.surgeries.length > 0 ? (
          <div className="space-y-2">
            {history.surgeries.map((surgery, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-center justify-between rounded-lg border border-slate-100 bg-white p-3",
                  "dark:border-slate-800 dark:bg-slate-900/40",
                )}
              >
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {surgery.procedure}
                  </p>
                  <p className="text-xs text-slate-400">{surgery.hospital}</p>
                </div>
                <span className="text-xs text-slate-400">{surgery.date}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 dark:text-slate-500">
            No surgical history.
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
