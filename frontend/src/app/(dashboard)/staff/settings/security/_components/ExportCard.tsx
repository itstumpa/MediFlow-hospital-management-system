"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { Download, FileJson, FileSpreadsheet, FileText } from "lucide-react";

export function ExportCard() {
  const exports = [
    {
      icon: FileText,
      label: "Export Login History",
      description: "All login sessions as a CSV file",
      format: "CSV",
      color: "text-blue-500 bg-blue-100 dark:bg-blue-900/40 dark:text-blue-400",
    },
    {
      icon: FileJson,
      label: "Export Account Data",
      description: "Complete account data in JSON format",
      format: "JSON",
      color:
        "text-amber-500 bg-amber-100 dark:bg-amber-900/40 dark:text-amber-400",
    },
    {
      icon: FileSpreadsheet,
      label: "Export Activity Report",
      description: "Security activity summary as a spreadsheet",
      format: "XLSX",
      color:
        "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-400",
    },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={staggerItem} className="dash-card">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-400">
            <Download className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Export Data
          </span>
        </div>
        <div className="space-y-2">
          {exports.map((exp) => {
            const Icon = exp.icon;
            return (
              <button
                key={exp.label}
                type="button"
                className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 text-left transition-all hover:border-slate-300 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${exp.color}`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    {exp.label}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {exp.description}
                  </p>
                </div>
                <span className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                  {exp.format}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
