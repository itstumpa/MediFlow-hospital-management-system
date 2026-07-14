"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Download,
  Eye,
  FileImage,
  FileScan,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { PatientProfile } from "./patient-profile-mock-data";

interface ProfileDocumentsTabProps {
  patient: PatientProfile;
}

const docIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  PDF: FileText,
  Image: FileImage,
  Scan: FileScan,
  Invoice: FileSpreadsheet,
};

const docIconColors: Record<string, string> = {
  PDF: "text-rose-500 bg-rose-50 dark:bg-rose-950/30",
  Image: "text-blue-500 bg-blue-50 dark:bg-blue-950/30",
  Scan: "text-dash-primary bg-dash-primary-light dark:bg-teal-950/30",
  Invoice: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
};

const categoryColors: Record<string, string> = {
  Medical:
    "bg-dash-primary-light text-dash-primary dark:bg-teal-950/30 dark:text-accent",
  Insurance:
    "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400",
  Administrative:
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

export function ProfileDocumentsTab({ patient }: ProfileDocumentsTabProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3"
    >
      {patient.documents.map((doc) => {
        const Icon = docIconMap[doc.type] || FileText;
        const iconStyle = docIconColors[doc.type] || docIconColors.PDF;
        return (
          <motion.div
            key={doc.id}
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
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    iconStyle.split(" ").slice(1).join(" "),
                  )}
                >
                  <Icon className={cn("h-4 w-4", iconStyle.split(" ")[0])} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-slate-900 dark:text-white">
                    {doc.name}
                  </p>
                  <p className="text-[10px] text-slate-400">{doc.date}</p>
                </div>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-[9px] font-medium",
                  categoryColors[doc.category] || "bg-slate-100 text-slate-600",
                )}
              >
                {doc.category}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-2.5 dark:border-slate-800">
              <button className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-dash-primary-light py-1.5 text-[10px] font-medium text-dash-primary transition-colors hover:bg-dash-primary-light/80 dark:bg-teal-950/30 dark:text-accent dark:hover:bg-teal-950/50">
                <Eye className="h-3 w-3" />
                View
              </button>
              <button className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-slate-200 py-1.5 text-[10px] font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800">
                <Download className="h-3 w-3" />
                Download
              </button>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
