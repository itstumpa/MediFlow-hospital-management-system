"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Paperclip,
  Phone,
  Upload,
  User,
  Video,
  X,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { BookingFormData } from "./types";

const consultationTypes = [
  {
    value: "in-person" as const,
    label: "In-Person",
    description: "Visit us at the clinic",
    icon: User,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
  },
  {
    value: "video" as const,
    label: "Video Call",
    description: "Consult from home",
    icon: Video,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  {
    value: "phone" as const,
    label: "Phone Call",
    description: "Speak over the phone",
    icon: Phone,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    borderColor: "border-purple-200 dark:border-purple-800",
  },
];

interface SelectedFile {
  name: string;
  size: number;
  type: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export function PatientInformation() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<BookingFormData>();
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const consultationType = watch("consultationType");

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      const newFiles = selectedFiles.map((f) => ({
        name: f.name,
        size: f.size,
        type: f.type,
      }));
      setFiles((prev) => [...prev, ...newFiles].slice(0, 5));
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [],
  );

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Your Information
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Help us prepare for your visit
        </p>
      </div>

      {/* Consultation Type */}
      <motion.div variants={staggerItem} className="space-y-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Consultation Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {consultationTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = consultationType === type.value;
            return (
              <button
                key={type.value}
                type="button"
                onClick={() =>
                  setValue("consultationType", type.value, {
                    shouldValidate: true,
                  })
                }
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-4 text-left transition-all",
                  isSelected
                    ? `${type.borderColor} ${type.bgColor} ring-2 ring-offset-1 ${type.color.replace("text-", "ring-").replace("600", "200")} dark:ring-offset-slate-900`
                    : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600",
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    isSelected
                      ? type.bgColor
                      : "bg-slate-100 dark:bg-slate-700",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      isSelected
                        ? type.color
                        : "text-slate-400 dark:text-slate-500",
                    )}
                  />
                </div>
                <div>
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      isSelected
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-700 dark:text-slate-300",
                    )}
                  >
                    {type.label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {type.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        {errors.consultationType && (
          <p className="text-xs text-red-500">
            {errors.consultationType.message}
          </p>
        )}
      </motion.div>

      {/* Reason for Visit */}
      <motion.div variants={staggerItem} className="space-y-1.5">
        <label
          htmlFor="reasonForVisit"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Reason for Visit <span className="text-red-400">*</span>
        </label>
        <textarea
          id="reasonForVisit"
          rows={3}
          placeholder="Please describe your symptoms or reason for the appointment..."
          className={cn(
            "w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500",
            errors.reasonForVisit
              ? "border-red-300 focus:border-red-400 focus:ring-red-200 dark:border-red-800"
              : "border-slate-200 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 dark:border-slate-700",
          )}
          {...register("reasonForVisit")}
        />
        {errors.reasonForVisit && (
          <p className="flex items-center gap-1 text-xs text-red-500">
            <AlertCircle className="h-3 w-3" />
            {errors.reasonForVisit.message}
          </p>
        )}
      </motion.div>

      {/* Symptoms (optional) */}
      <motion.div variants={staggerItem} className="space-y-1.5">
        <label
          htmlFor="symptoms"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Current Symptoms{" "}
          <span className="text-xs font-normal text-slate-400">(optional)</span>
        </label>
        <textarea
          id="symptoms"
          rows={2}
          placeholder="Any specific symptoms you're experiencing..."
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
          {...register("symptoms")}
        />
      </motion.div>

      {/* File upload */}
      <motion.div variants={staggerItem} className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Attachments{" "}
          <span className="text-xs font-normal text-slate-400">(optional)</span>
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 transition-colors",
            files.length > 0
              ? "border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 dark:border-[var(--color-accent)]/30"
              : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600",
          )}
        >
          <Upload
            className={cn(
              "h-8 w-8",
              files.length > 0
                ? "text-[var(--color-primary)] dark:text-[var(--color-accent)]"
                : "text-slate-300 dark:text-slate-600",
            )}
          />
          <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">
            {files.length > 0
              ? "Add more files"
              : "Upload medical records or reports"}
          </p>
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
            PDF, JPG, PNG · Max 5 files
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="space-y-1.5">
            {files.map((file, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-slate-100 bg-white px-3 py-2 dark:border-slate-700/40 dark:bg-slate-800/60"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Paperclip className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <span className="truncate text-sm text-slate-700 dark:text-slate-300">
                    {file.name}
                  </span>
                  <span className="shrink-0 text-xs text-slate-400">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="ml-2 shrink-0 text-slate-400 hover:text-red-500"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Additional Notes */}
      <motion.div variants={staggerItem} className="space-y-1.5">
        <label
          htmlFor="notes"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Additional Notes{" "}
          <span className="text-xs font-normal text-slate-400">(optional)</span>
        </label>
        <textarea
          id="notes"
          rows={2}
          placeholder="Anything else we should know..."
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
          {...register("notes")}
        />
      </motion.div>
    </motion.div>
  );
}
