"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertTriangle, Apple, Pill as PillIcon, Wind } from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { PatientProfile } from "./patient-profile-mock-data";

interface ProfileAllergyTabProps {
  patient: PatientProfile;
}

const typeIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  Medicine: PillIcon,
  Food: Apple,
  Environmental: Wind,
};

const typeColors: Record<string, string> = {
  Medicine: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30",
  Food: "text-amber-500 bg-amber-50 dark:bg-amber-950/30",
  Environmental: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
};

const severityColors: Record<string, string> = {
  Mild: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  Moderate:
    "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
  Severe: "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400",
};

export function ProfileAllergyTab({ patient }: ProfileAllergyTabProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {patient.allergies.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-400">
          No allergies recorded for this patient.
        </p>
      ) : (
        patient.allergies.map((allergy, idx) => {
          const Icon = typeIcon[allergy.type] || AlertTriangle;
          const typeColor =
            typeColors[allergy.type] || typeColors.Environmental;
          return (
            <motion.div
              key={idx}
              variants={staggerItem}
              className={cn(
                "flex items-start gap-3 rounded-xl border border-slate-200/60 bg-white p-3.5",
                "dark:border-slate-700/40 dark:bg-slate-900/60",
              )}
            >
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg",
                  typeColor.split(" ").slice(1).join(" "),
                )}
              >
                <Icon className={cn("h-4 w-4", typeColor.split(" ")[0])} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-slate-900 dark:text-white">
                    {allergy.allergen}
                  </p>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[9px] font-semibold",
                      severityColors[allergy.severity],
                    )}
                  >
                    {allergy.severity}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    ({allergy.type})
                  </span>
                </div>
                <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                  {allergy.reaction}
                </p>
              </div>
            </motion.div>
          );
        })
      )}
    </motion.div>
  );
}
