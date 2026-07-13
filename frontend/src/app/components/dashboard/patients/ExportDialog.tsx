"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
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
  selectedCount?: number;
}

const formats: {
  key: ExportFormat;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    key: "csv",
    label: "CSV",
    description: "Comma-separated values file",
    icon: FileText,
  },
  {
    key: "excel",
    label: "Excel",
    description: "Microsoft Excel spreadsheet",
    icon: FileSpreadsheet,
  },
  {
    key: "pdf",
    label: "PDF",
    description: "Portable Document Format",
    icon: File,
  },
];

export function ExportDialog({
  open,
  onClose,
  selectedCount = 0,
}: ExportDialogProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("csv");
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExported(true);
      setTimeout(() => {
        setExported(false);
        onClose();
      }, 1500);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-800"
            role="dialog"
            aria-modal="true"
            aria-labelledby="export-dialog-title"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>

            <h2
              id="export-dialog-title"
              className="text-lg font-semibold text-slate-900 dark:text-white"
            >
              Export Patients
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {selectedCount > 0
                ? `Export ${selectedCount} selected patient records`
                : "Export all patient records"}
            </p>

            {/* Format selection */}
            <div className="mt-5 space-y-2">
              {formats.map((fmt) => (
                <button
                  key={fmt.key}
                  onClick={() => setSelectedFormat(fmt.key)}
                  className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                    selectedFormat === fmt.key
                      ? "border-dash-primary-light bg-dash-primary-light dark:border-teal-800 dark:bg-teal-900/30"
                      : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      selectedFormat === fmt.key
                        ? "bg-dash-primary-light text-dash-primary dark:bg-teal-900/50 dark:text-accent"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                    }`}
                  >
                    <fmt.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {fmt.label}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {fmt.description}
                    </p>
                  </div>
                  {selectedFormat === fmt.key && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-dash-primary">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Action button */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                disabled={exporting || exported}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-dash-primary px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-dash-primary-dark disabled:opacity-50"
              >
                {exporting ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Exporting...
                  </>
                ) : exported ? (
                  <>
                    <Check className="h-4 w-4" />
                    Exported
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Export
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
