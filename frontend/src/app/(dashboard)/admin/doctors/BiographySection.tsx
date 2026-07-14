"use client";

import { staggerItem } from "@/lib/animations/stagger";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { DoctorFormValues } from "./form-schema";

export function BiographySection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<DoctorFormValues>();

  return (
    <motion.div variants={staggerItem} className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400">
          <FileText className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Biography
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Professional summary and areas of expertise
          </p>
        </div>
      </div>

      <div className="space-y-1.5">
        <textarea
          {...register("biography")}
          rows={8}
          placeholder="Write a professional biography covering background, clinical focus, and key expertise areas..."
          className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary focus:shadow-[0_0_0_4px_rgba(14,124,123,0.1)] dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 ${
            errors.biography
              ? "border-red-400 focus:border-red-400 focus:ring-red-500/20"
              : "border-slate-300 dark:border-slate-600"
          }`}
          aria-invalid={!!errors.biography}
        />
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Suggested: educational background, years of experience, clinical focus
          areas, research interests, and patient care philosophy.
        </p>
      </div>

      {errors.biography && (
        <p className="text-xs text-red-500">{errors.biography.message}</p>
      )}
    </motion.div>
  );
}
