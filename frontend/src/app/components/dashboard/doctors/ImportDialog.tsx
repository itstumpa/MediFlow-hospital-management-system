"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, File, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface ImportDialogProps {
  open: boolean;
  onClose: () => void;
  onImport: (file: File) => void;
}

export function ImportDialog({ open, onClose, onImport }: ImportDialogProps) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragOver(true);
    } else if (e.type === "dragleave") {
      setDragOver(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    setError(null);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const validTypes = [".csv", ".xlsx", ".xls", ".json"];
      const ext = "." + droppedFile.name.split(".").pop()?.toLowerCase();
      if (validTypes.includes(ext)) {
        setFile(droppedFile);
      } else {
        setError("Invalid file type. Please upload CSV, Excel, or JSON files.");
      }
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleImport = () => {
    if (!file) return;
    setImporting(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onImport(file);
          setTimeout(() => {
            setImporting(false);
            setFile(null);
            setProgress(0);
            onClose();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 300);
  };

  const reset = () => {
    setFile(null);
    setError(null);
    setProgress(0);
    setImporting(false);
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
            className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-800"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-900/40">
              <Upload className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
              Import Doctors
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Upload a CSV, Excel, or JSON file to bulk import doctors.
            </p>

            {/* Drop zone */}
            {!file && !importing && (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`mt-5 cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
                  dragOver
                    ? "border-dash-primary bg-dash-primary-light dark:border-teal-600 dark:bg-teal-900/20"
                    : "border-slate-300 hover:border-slate-400 dark:border-slate-600 dark:hover:border-slate-500"
                }`}
              >
                <Upload
                  className={`mx-auto h-10 w-10 ${dragOver ? "text-dash-primary" : "text-slate-400"}`}
                />
                <p
                  className={`mt-3 text-sm font-medium ${dragOver ? "text-dash-primary" : "text-slate-600 dark:text-slate-400"}`}
                >
                  {dragOver ? "Drop file here" : "Drag & drop file here"}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  or click to browse â€” CSV, Excel, or JSON (max 10MB)
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls,.json"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            )}

            {/* Selected file preview */}
            {file && !importing && (
              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-700/50">
                <div className="flex items-center gap-3">
                  <File className="h-8 w-8 text-dash-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={reset}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Progress bar */}
            {importing && (
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    Importing data...
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-dash-primary to-violet-500"
                  />
                </div>
                <p className="text-xs text-slate-400 text-center">
                  Processing and validating doctor records...
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => {
                  reset();
                  onClose();
                }}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={!file || importing}
                className="flex-1 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-violet-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {importing ? "Importing..." : "Import Data"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
