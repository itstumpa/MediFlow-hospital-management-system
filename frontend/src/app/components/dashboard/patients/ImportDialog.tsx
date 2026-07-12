"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  FileSpreadsheet,
  FileText,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

interface ImportDialogProps {
  open: boolean;
  onClose: () => void;
}

type ImportStep = "select" | "uploading" | "validating" | "complete";

export function ImportDialog({ open, onClose }: ImportDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<ImportStep>("select");
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [validationResults, setValidationResults] = useState<{
    total: number;
    valid: number;
    errors: number;
  } | null>(null);

  const handleFileSelect = (file: File) => {
    setFileName(file.name);
    setStep("uploading");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setStep("validating");
      setTimeout(() => {
        setValidationResults({
          total: 47,
          valid: 45,
          errors: 2,
        });
        setStep("complete");
      }, 1500);
    }, 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleReset = () => {
    setStep("select");
    setProgress(0);
    setFileName("");
    setValidationResults(null);
  };

  const handleClose = () => {
    handleReset();
    onClose();
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
            onClick={handleClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-800"
            role="dialog"
            aria-modal="true"
            aria-labelledby="import-dialog-title"
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>

            <h2
              id="import-dialog-title"
              className="text-lg font-semibold text-slate-900 dark:text-white"
            >
              Import Patients
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Upload a CSV or Excel file to bulk import patient records.
            </p>

            {step === "select" && (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`mt-5 cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-all ${
                  dragOver
                    ? "border-blue-400 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20"
                    : "border-slate-300 hover:border-slate-400 dark:border-slate-600 dark:hover:border-slate-500"
                }`}
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                  <Upload className="h-8 w-8 text-slate-400" />
                </div>
                <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                  {dragOver ? "Drop file here" : "Drag & drop file here"}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  or click to browse
                </p>
                <div className="mt-4 flex items-center justify-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5" /> CSV
                  </span>
                  <span className="flex items-center gap-1">
                    <FileSpreadsheet className="h-3.5 w-3.5" /> Excel
                  </span>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />
              </div>
            )}

            {(step === "uploading" || step === "validating") && (
              <div className="mt-5 space-y-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-blue-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate dark:text-white">
                        {fileName}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {step === "uploading"
                          ? "Uploading..."
                          : "Validating..."}
                      </p>
                    </div>
                    {step === "validating" && (
                      <svg
                        className="h-5 w-5 animate-spin text-blue-500"
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
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>
                      {step === "uploading" ? "Uploading" : "Validating"}
                    </span>
                    <span>{progress}%</span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                      className={`h-full rounded-full ${
                        step === "uploading" ? "bg-blue-500" : "bg-amber-500"
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === "complete" && validationResults && (
              <div className="mt-5 space-y-4">
                <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-900/30">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                      <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                        Import Complete
                      </p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400">
                        File processed successfully
                      </p>
                    </div>
                  </div>
                </div>

                {/* Validation summary */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-700 dark:bg-slate-900/50">
                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                      {validationResults.total}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Total
                    </p>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center dark:border-emerald-800 dark:bg-emerald-900/20">
                    <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                      {validationResults.valid}
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      Valid
                    </p>
                  </div>
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-center dark:border-red-800 dark:bg-red-900/20">
                    <p className="text-xl font-bold text-red-600 dark:text-red-400">
                      {validationResults.errors}
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400">
                      Errors
                    </p>
                  </div>
                </div>

                {validationResults.errors > 0 && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 mt-0.5 text-red-500 shrink-0" />
                      <div className="text-xs text-red-700 dark:text-red-400">
                        <p className="font-medium">2 records have errors:</p>
                        <ul className="mt-1 list-inside list-disc space-y-0.5">
                          <li>Row 23: Invalid email format</li>
                          <li>Row 36: Missing required field (age)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={handleReset}
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
                  >
                    Import Another
                  </button>
                  <button
                    onClick={handleClose}
                    className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
