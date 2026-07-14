"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Calendar,
  CalendarPlus,
  FileText,
  FlaskConical,
  MessageSquareText,
  Phone,
  Shield,
  Stethoscope,
  UserPlus,
} from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { PatientProfile } from "./patient-profile-mock-data";

interface PatientProfileSidebarProps {
  patient: PatientProfile;
}

export function PatientProfileSidebar({ patient }: PatientProfileSidebarProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Quick Actions */}
      <motion.div
        variants={staggerItem}
        className={cn(
          "rounded-xl border border-slate-200/60 bg-white p-4",
          "dark:border-slate-700/40 dark:bg-slate-900/60",
        )}
      >
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Quick Actions
        </h3>
        <div className="space-y-1.5">
          <SidebarButton icon={Stethoscope} label="Start Consultation" color="text-cyan-500" />
          <SidebarButton icon={CalendarPlus} label="Book Follow-up" color="text-emerald-500" />
          <SidebarButton icon={MessageSquareText} label="Add Note" color="text-indigo-500" />
          <SidebarButton icon={FlaskConical} label="Request Lab Test" color="text-purple-500" />
        </div>
      </motion.div>

      {/* Risk Score */}
      <motion.div
        variants={staggerItem}
        className={cn(
          "rounded-xl border border-slate-200/60 bg-white p-4",
          "dark:border-slate-700/40 dark:bg-slate-900/60",
        )}
      >
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Patient Risk Score
        </h3>
        <div className="flex items-center gap-3">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
            {/* Circular progress ring */}
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 56 56">
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-slate-100 dark:text-slate-800"
              />
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 24}`}
                strokeDashoffset={`${2 * Math.PI * 24 * (1 - patient.riskScore.score / 100)}`}
                className={cn(
                  "transition-all duration-700",
                  patient.riskScore.overall === "Low"
                    ? "text-emerald-500"
                    : patient.riskScore.overall === "Moderate"
                      ? "text-amber-500"
                      : "text-rose-500",
                )}
                strokeLinecap="round"
              />
            </svg>
            <span
              className={cn(
                "text-sm font-bold",
                patient.riskScore.overall === "Low"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : patient.riskScore.overall === "Moderate"
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-rose-600 dark:text-rose-400",
              )}
            >
              {patient.riskScore.score}
            </span>
          </div>
          <div>
            <span
              className={cn(
                "inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold",
                patient.riskScore.overall === "Low"
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                  : patient.riskScore.overall === "Moderate"
                    ? "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
                    : "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400",
              )}
            >
              {patient.riskScore.overall} Risk
            </span>
            <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
              Based on {patient.riskScore.factors.length} factors
            </p>
          </div>
        </div>

        {patient.riskScore.factors.length > 0 && (
          <div className="mt-3 space-y-1">
            {patient.riskScore.factors.map((factor, idx) => (
              <div key={idx} className="flex items-start gap-1.5">
                <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-amber-400" />
                <span className="text-[10px] text-slate-600 dark:text-slate-400">
                  {factor}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Upcoming Appointment */}
      {patient.upcomingAppointment && (
        <motion.div
          variants={staggerItem}
          className={cn(
            "rounded-xl border border-cyan-200/60 bg-cyan-50/50 p-4",
            "dark:border-cyan-800/30 dark:bg-cyan-950/20",
          )}
        >
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            <Calendar className="h-3.5 w-3.5" />
            Upcoming Appointment
          </h3>
          <p className="text-xs font-medium text-cyan-800 dark:text-cyan-200">
            {patient.upcomingAppointment}
          </p>
          <button className="mt-2 inline-flex items-center gap-1 rounded-lg bg-cyan-500 px-3 py-1.5 text-[10px] font-medium text-white transition-colors hover:bg-cyan-600">
            <CalendarPlus className="h-3 w-3" />
            Reschedule
          </button>
        </motion.div>
      )}

      {/* Emergency Contact (short) */}
      <motion.div
        variants={staggerItem}
        className={cn(
          "rounded-xl border border-slate-200/60 bg-white p-4",
          "dark:border-slate-700/40 dark:bg-slate-900/60",
        )}
      >
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Emergency Contact
        </h3>
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-950/30">
            <Phone className="h-4 w-4 text-rose-400" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-900 dark:text-white">
              {patient.emergencyContact.name}
            </p>
            <p className="text-[10px] text-slate-400">
              {patient.emergencyContact.relation} — {patient.emergencyContact.phone}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SidebarButton({
  icon: Icon,
  label,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
}) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 transition-all",
        "hover:bg-slate-100 hover:text-slate-900",
        "dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white",
      )}
    >
      <Icon className={cn("h-4 w-4 shrink-0", color)} />
      {label}
    </button>
  );
}
