"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Download,
  File,
  FileSpreadsheet,
  FileText,
  X,
} from "lucide-react";
import { useState } from "react";
import type { ExportFormat } from "./types";

interface ExportDialogProps {
  open: boolean;
  onClose: () => void;
  onExport: (format: ExportFormat) => void;
  totalCount: number;
}

const formatOptions: {
  format: ExportFormat;
  icon: React.ElementType;
  label: string;
  desc: string;
  color: string;
}[] = [
  {
    format: "csv",
    icon: FileText,
    label: "CSV",
    desc: "Comma-separated values",
    color:
      "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-400",
  },
  {
    format: "excel",
    icon: FileSpreadsheet,
    label: "Excel",
    desc: "Microsoft Excel (.xlsx)",
    color: "text-blue-600 bg-blue-100 dark:bg-blue-900/40 dark:text-blue-400",
  },
  {
    format: "pdf",
    icon: File,
    label: "PDF",
    desc: "Adobe PDF document",
    color: "text-rose-600 bg-rose-100 dark:bg-rose-900/40 dark:text-rose-400",
  },
];

export function ExportDialog({
  open,
  onClose,
  onExport,
  totalCount,
}: ExportDialogProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat | null>(
    null,
  );

  const handleExport = () => {
    if (selectedFormat) {
      onExport(selectedFormat);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-800"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/40">
              <Download className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
              Export Doctors
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Export {totalCount} doctor{totalCount !== 1 ? "s" : ""} to your
              preferred format.
            </p>

            <div className="mt-5 grid gap-3">
              {formatOptions.map((opt) => (
                <button
                  key={opt.format}
                  onClick={() => setSelectedFormat(opt.format)}
                  className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                    selectedFormat === opt.format
                      ? "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/30"
                      : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${opt.color}`}
                  >
                    <opt.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {opt.label}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {opt.desc}
                    </p>
                  </div>
                  {selectedFormat === opt.format && (
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                disabled={!selectedFormat}
                className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                Export
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
