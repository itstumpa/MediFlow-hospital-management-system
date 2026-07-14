"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Printer,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { staggerContainer, staggerItem } from "../MotionVariants";

interface AppointmentDetailHeaderProps {
  appointmentId: string;
  patientName: string;
  date: string;
  time: string;
  status: "Waiting" | "Checked In" | "In Progress" | "Completed";
}

const statusColors: Record<string, string> = {
  Waiting:
    "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30",
  "Checked In":
    "text-cyan-600 bg-cyan-50 dark:text-cyan-400 dark:bg-cyan-950/30",
  "In Progress":
    "text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/30",
  Completed:
    "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30",
};

export function AppointmentDetailHeader({
  appointmentId,
  patientName,
  date,
  time,
  status,
}: AppointmentDetailHeaderProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={cn(
        "rounded-xl border border-slate-200/60 bg-white px-5 py-4",
        "dark:border-slate-700/40 dark:bg-slate-900/60",
      )}
    >
      {/* Breadcrumb */}
      <motion.div variants={staggerItem} className="mb-3">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link
            href="/doctor/appointments"
            className="flex items-center gap-1 text-slate-500 transition-colors hover:text-cyan-500 dark:text-slate-400 dark:hover:text-cyan-400"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Appointments
          </Link>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <span className="text-slate-700 dark:text-slate-300">
            Appointment Details
          </span>
        </nav>
      </motion.div>

      {/* Main row */}
      <motion.div
        variants={staggerItem}
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        {/* Left: ID, patient, date */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span
            className={cn(
              "rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-mono font-bold text-slate-500",
              "dark:bg-slate-800 dark:text-slate-400",
            )}
          >
            {appointmentId}
          </span>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">
            {patientName}
          </h1>
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {time}
            </span>
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium",
              statusColors[status],
            )}
          >
            {status === "Completed" ? (
              <CheckCircle2 className="h-3 w-3" />
            ) : (
              <Clock className="h-3 w-3" />
            )}
            {status}
          </span>
        </div>

        {/* Right: Action buttons */}
        <div className="flex items-center gap-2">
          {status !== "Completed" && (
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-2 text-xs font-medium text-white transition-all hover:bg-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              Complete Consultation
            </button>
          )}
          {status !== "Completed" && (
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700">
              <XCircle className="h-4 w-4" />
              Cancel
            </button>
          )}
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700">
            <Printer className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
