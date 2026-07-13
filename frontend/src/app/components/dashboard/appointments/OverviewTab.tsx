"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { AppointmentDetail } from "@/lib/data/appointment-detail";
import { priorityColors } from "@/lib/data/appointment-detail";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ClipboardList,
  FileText,
  Stethoscope,
} from "lucide-react";

const priorityLabels: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  emergency: "Emergency",
};

interface OverviewTabProps {
  appointment: AppointmentDetail;
}

export function OverviewTab({ appointment }: OverviewTabProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Reason for Visit */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-dash-primary-light text-dash-primary dark:bg-teal-500/20 dark:text-accent">
            <ClipboardList className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Reason for Visit
            </h3>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {appointment.reasonForVisit}
        </p>
      </motion.div>

      {/* Symptoms & Priority */}
      <div className="grid gap-5 sm:grid-cols-2">
        <motion.div
          variants={staggerItem}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
              <Stethoscope className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Symptoms
            </h3>
          </div>
          <ul className="space-y-2">
            {appointment.symptoms.map((symptom, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                {symptom}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={staggerItem}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400">
              <AlertCircle className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Priority
            </h3>
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
              priorityColors[appointment.priority],
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                appointment.priority === "low" && "bg-slate-500",
                appointment.priority === "medium" && "bg-amber-500",
                appointment.priority === "high" && "bg-orange-500",
                appointment.priority === "emergency" && "bg-red-500",
              )}
            />
            {priorityLabels[appointment.priority]}
          </span>
          <div className="mt-4">
            <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Consultation Type
            </h4>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {appointment.consultationType}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Notes */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
            <FileText className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Clinical Notes
          </h3>
        </div>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {appointment.notes}
        </p>
      </motion.div>
    </motion.div>
  );
}
