"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Download, Eye, FlaskConical } from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { PatientProfile } from "./patient-profile-mock-data";

interface ProfileLabReportsTabProps {
  patient: PatientProfile;
}

export function ProfileLabReportsTab({
  patient,
}: ProfileLabReportsTabProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
    >
      {patient.labReports.map((lab) => (
        <motion.div
          key={lab.id}
          variants={staggerItem}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className={cn(
            "rounded-xl border border-slate-200/60 bg-white p-3.5 transition-all",
            "hover:shadow-md hover:shadow-slate-900/5",
            "dark:border-slate-700/40 dark:bg-slate-900/60",
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-950/30">
                <FlaskConical className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-900 dark:text-white">
                  {lab.testName}
                </p>
                <p className="text-[10px] text-slate-400">{lab.date}</p>
              </div>
            </div>
            <LabStatusBadge status={lab.status} />
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-2.5 dark:border-slate-800">
            <button className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-cyan-50 py-1.5 text-[10px] font-medium text-cyan-600 transition-colors hover:bg-cyan-100 dark:bg-cyan-950/30 dark:text-cyan-400 dark:hover:bg-cyan-950/50">
              <Eye className="h-3 w-3" />
              View Result
            </button>
            <button className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-slate-200 py-1.5 text-[10px] font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800">
              <Download className="h-3 w-3" />
              Download
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function LabStatusBadge({
  status,
}: {
  status: "Completed" | "Pending" | "Reviewed";
}) {
  const colors: Record<string, string> = {
    Completed:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
    Pending:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
    Reviewed:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
  };
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
        colors[status],
      )}
    >
      {status}
    </span>
  );
}
