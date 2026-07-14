"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  FlaskConical,
  Pill,
  Stethoscope,
  Syringe,
  UserCheck,
} from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { PatientProfile } from "./patient-profile-mock-data";

interface ProfileTimelineTabProps {
  patient: PatientProfile;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  appointment: UserCheck,
  prescription: Pill,
  surgery: Syringe,
  lab: FlaskConical,
  vaccination: Stethoscope,
  registration: CheckCircle2,
};

const iconColors: Record<string, string> = {
  appointment: "text-emerald-500 border-emerald-300 dark:border-emerald-700",
  prescription: "text-amber-500 border-amber-300 dark:border-amber-700",
  surgery: "text-rose-500 border-rose-300 dark:border-rose-700",
  lab: "text-purple-500 border-purple-300 dark:border-purple-700",
  vaccination:
    "text-dash-primary border-dash-primary-light dark:border-teal-700",
  registration: "text-blue-500 border-blue-300 dark:border-blue-700",
};

const bgColors: Record<string, string> = {
  appointment: "bg-emerald-50 dark:bg-emerald-950/30",
  prescription: "bg-amber-50 dark:bg-amber-950/30",
  surgery: "bg-rose-50 dark:bg-rose-950/30",
  lab: "bg-purple-50 dark:bg-purple-950/30",
  vaccination: "bg-dash-primary-light dark:bg-teal-950/30",
  registration: "bg-blue-50 dark:bg-blue-950/30",
};

export function ProfileTimelineTab({ patient }: ProfileTimelineTabProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      {patient.timeline.map((entry, idx) => {
        const Icon = iconMap[entry.type] || CheckCircle2;
        const iconColor = iconColors[entry.type] || iconColors.appointment;
        const bgColor = bgColors[entry.type] || bgColors.appointment;
        const isLast = idx === patient.timeline.length - 1;

        return (
          <motion.div
            key={entry.id}
            variants={staggerItem}
            className="relative flex gap-4 pb-6 last:pb-0"
          >
            {/* Timeline line + icon */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 200,
                  delay: idx * 0.06,
                }}
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2",
                  iconColor,
                  bgColor,
                )}
              >
                <Icon className="h-4 w-4" />
              </motion.div>
              {!isLast && (
                <div className="mt-1 h-full w-px bg-slate-200 dark:bg-slate-700" />
              )}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1 pb-4">
              <p className="text-xs font-semibold text-slate-900 dark:text-white">
                {entry.event}
              </p>
              <p className="mt-0.5 text-[10px] text-slate-400">{entry.date}</p>
            </div>

            {/* Type badge */}
            <span className="shrink-0 self-start rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium capitalize text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {entry.type}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
