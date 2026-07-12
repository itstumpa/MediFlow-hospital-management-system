"use client";

import { motion } from "framer-motion";
import { GraduationCap, Plus, Trash2 } from "lucide-react";
import { useFormContext, useFieldArray } from "react-hook-form";
import type { DoctorFormValues } from "./form-schema";
import { staggerItem } from "@/lib/animations/stagger";

const inputGlow =
  "transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]";

export function EducationForm() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<DoctorFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <motion.div variants={staggerItem} className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400">
            <GraduationCap className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Education
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Academic qualifications and degrees
            </p>
          </div>
        </div>
      </div>

      {/* Education Entries */}
      <div className="space-y-3">
        {fields.map((field, index) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, x: -20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: "auto" }}
            exit={{ opacity: 0, x: 20, height: 0 }}
            transition={{ duration: 0.2 }}
            className="relative rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/30"
          >
            {/* Remove button */}
            {fields.length > 1 && (
              <motion.button
                type="button"
                onClick={() => remove(index)}
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-500/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Remove education entry ${index + 1}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </motion.button>
            )}

            <div className="mb-3 text-xs font-medium text-slate-400 dark:text-slate-500">
              Education #{index + 1}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Degree <span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`education.${index}.degree`)}
                  placeholder="e.g. MD, MBBS"
                  className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 ${inputGlow} ${
                    errors.education?.[index]?.degree
                      ? "border-red-400 focus:border-red-400 focus:ring-red-500/20"
                      : "border-slate-300 dark:border-slate-600"
                  }`}
                  aria-invalid={!!errors.education?.[index]?.degree}
                />
                {errors.education?.[index]?.degree && (
                  <p className="text-xs text-red-500">
                    {errors.education[index]?.degree?.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Institution <span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`education.${index}.institution`)}
                  placeholder="University / College"
                  className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 ${inputGlow} ${
                    errors.education?.[index]?.institution
                      ? "border-red-400 focus:border-red-400 focus:ring-red-500/20"
                      : "border-slate-300 dark:border-slate-600"
                  }`}
                  aria-invalid={!!errors.education?.[index]?.institution}
                />
                {errors.education?.[index]?.institution && (
                  <p className="text-xs text-red-500">
                    {errors.education[index]?.institution?.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Year <span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`education.${index}.year`)}
                  placeholder="e.g. 2010"
                  className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 ${inputGlow} ${
                    errors.education?.[index]?.year
                      ? "border-red-400 focus:border-red-400 focus:ring-red-500/20"
                      : "border-slate-300 dark:border-slate-600"
                  }`}
                  aria-invalid={!!errors.education?.[index]?.year}
                />
                {errors.education?.[index]?.year && (
                  <p className="text-xs text-red-500">
                    {errors.education[index]?.year?.message}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add More Button */}
      <motion.button
        type="button"
        onClick={() => append({ degree: "", institution: "", year: "" })}
        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 px-4 py-3 text-sm font-medium text-slate-500 transition-all hover:border-blue-400 hover:text-blue-600 dark:border-slate-600 dark:text-slate-400 dark:hover:border-blue-500 dark:hover:text-blue-400"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Plus className="h-4 w-4" />
        Add Education
      </motion.button>

      {errors.education && !Array.isArray(errors.education) && (
        <p className="text-xs text-red-500">{errors.education.message}</p>
      )}
    </motion.div>
  );
}
