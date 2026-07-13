"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { AppointmentDetail } from "@/lib/data/appointment-detail";
import { motion } from "framer-motion";
import { Calendar, Clock, FileText, Pill } from "lucide-react";

interface PrescriptionTabProps {
  appointment: AppointmentDetail;
}

export function PrescriptionTab({ appointment }: PrescriptionTabProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {appointment.prescriptions.map((rx, i) => (
        <motion.div
          key={i}
          variants={staggerItem}
          whileHover={{ y: -1 }}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                <Pill className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {rx.medicine}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {rx.dosage}
                </p>
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-dash-primary-light px-2.5 py-0.5 text-xs font-medium text-dash-primary dark:bg-teal-500/10 dark:text-accent">
              #{i + 1}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="flex items-start gap-2.5 rounded-lg bg-slate-50 p-3 dark:bg-slate-700/50">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Frequency
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {rx.frequency}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-lg bg-slate-50 p-3 dark:bg-slate-700/50">
              <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Duration
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {rx.duration}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-lg bg-slate-50 p-3 dark:bg-slate-700/50">
              <FileText className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Notes
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {rx.notes}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
