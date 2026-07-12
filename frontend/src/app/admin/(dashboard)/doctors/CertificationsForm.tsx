"use client";

import { staggerItem } from "@/lib/animations/stagger";
import { motion } from "framer-motion";
import { Award, Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { DoctorFormValues } from "./form-schema";

const inputGlow =
  "transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]";

export function CertificationsForm() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<DoctorFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  return (
    <motion.div variants={staggerItem} className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
            <Award className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Certifications
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Professional certifications and board memberships
            </p>
          </div>
        </div>
      </div>

      {/* Certification Entries */}
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
            {fields.length > 1 && (
              <motion.button
                type="button"
                onClick={() => remove(index)}
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-500/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Remove certification entry ${index + 1}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </motion.button>
            )}

            <div className="mb-3 text-xs font-medium text-slate-400 dark:text-slate-500">
              Certification #{index + 1}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Certificate <span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`certifications.${index}.certificate`)}
                  placeholder="Certificate name"
                  className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 ${inputGlow} ${
                    errors.certifications?.[index]?.certificate
                      ? "border-red-400 focus:border-red-400 focus:ring-red-500/20"
                      : "border-slate-300 dark:border-slate-600"
                  }`}
                  aria-invalid={!!errors.certifications?.[index]?.certificate}
                />
                {errors.certifications?.[index]?.certificate && (
                  <p className="text-xs text-red-500">
                    {errors.certifications[index]?.certificate?.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Organization <span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`certifications.${index}.organization`)}
                  placeholder="Issuing body"
                  className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 ${inputGlow} ${
                    errors.certifications?.[index]?.organization
                      ? "border-red-400 focus:border-red-400 focus:ring-red-500/20"
                      : "border-slate-300 dark:border-slate-600"
                  }`}
                  aria-invalid={!!errors.certifications?.[index]?.organization}
                />
                {errors.certifications?.[index]?.organization && (
                  <p className="text-xs text-red-500">
                    {errors.certifications[index]?.organization?.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Issued Year <span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`certifications.${index}.issuedYear`)}
                  placeholder="e.g. 2011"
                  className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 ${inputGlow} ${
                    errors.certifications?.[index]?.issuedYear
                      ? "border-red-400 focus:border-red-400 focus:ring-red-500/20"
                      : "border-slate-300 dark:border-slate-600"
                  }`}
                  aria-invalid={!!errors.certifications?.[index]?.issuedYear}
                />
                {errors.certifications?.[index]?.issuedYear && (
                  <p className="text-xs text-red-500">
                    {errors.certifications[index]?.issuedYear?.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Expiry Year
                </label>
                <input
                  {...register(`certifications.${index}.expiryYear`)}
                  placeholder="e.g. 2031"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add More Button */}
      <motion.button
        type="button"
        onClick={() =>
          append({
            certificate: "",
            organization: "",
            issuedYear: "",
            expiryYear: "",
          })
        }
        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 px-4 py-3 text-sm font-medium text-slate-500 transition-all hover:border-blue-400 hover:text-blue-600 dark:border-slate-600 dark:text-slate-400 dark:hover:border-blue-500 dark:hover:text-blue-400"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Plus className="h-4 w-4" />
        Add Certification
      </motion.button>
    </motion.div>
  );
}
