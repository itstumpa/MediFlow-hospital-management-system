"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Syringe, Calendar, Shield } from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { PatientProfile } from "./patient-profile-mock-data";

interface ProfileVaccinationTabProps {
  patient: PatientProfile;
}

export function ProfileVaccinationTab({
  patient,
}: ProfileVaccinationTabProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {patient.vaccinations.map((vax, idx) => (
        <motion.div
          key={idx}
          variants={staggerItem}
          className={cn(
            "flex items-center gap-4 rounded-xl border border-slate-200/60 bg-white p-3.5",
            "dark:border-slate-700/40 dark:bg-slate-900/60",
          )}
        >
          {/* Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
            <Syringe className="h-5 w-5 text-emerald-500" />
          </div>

          {/* Details */}
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="text-xs font-semibold text-slate-900 dark:text-white">
              {vax.name}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Given: {vax.date}
              </span>
              {vax.nextDue !== "N/A" && (
                <>
                  <span className="text-slate-300 dark:text-slate-600">|</span>
                  <span className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Next Due:{" "}
                    <span
                      className={cn(
                        "font-medium",
                        vax.nextDue.includes("2026")
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-emerald-600 dark:text-emerald-400",
                      )}
                    >
                      {vax.nextDue}
                    </span>
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex h-6 w-6 shrink-0 items-center justify-center">
            <div
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                vax.nextDue === "N/A"
                  ? "bg-emerald-400"
                  : vax.nextDue.includes("2026")
                    ? "bg-amber-400 animate-pulse"
                    : "bg-emerald-400",
              )}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
