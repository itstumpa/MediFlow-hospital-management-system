"use client";

import { fadeUp } from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Heart,
  Pill,
  Stethoscope,
  Syringe,
  User,
} from "lucide-react";
import type { RegistrationFormData } from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface MedicalInformationFormProps {
  data: RegistrationFormData;
  onChange: (field: keyof RegistrationFormData, value: string) => void;
  errors: Partial<Record<keyof RegistrationFormData, string>>;
}

/* ─── Fields ────────────────────────────────── */

const sections: {
  key: keyof RegistrationFormData;
  label: string;
  placeholder: string;
  icon: typeof Heart;
  hint: string;
  rows?: number;
}[] = [
  {
    key: "allergies",
    label: "Allergies",
    placeholder: "List known allergies, separated by commas...",
    icon: AlertCircle,
    hint: "e.g. Penicillin, Peanuts, Latex",
    rows: 2,
  },
  {
    key: "chronicDiseases",
    label: "Chronic Diseases",
    placeholder: "List chronic conditions, separated by commas...",
    icon: Heart,
    hint: "e.g. Hypertension, Type 2 Diabetes, Asthma",
    rows: 2,
  },
  {
    key: "currentMedications",
    label: "Current Medications",
    placeholder: "List current medications with dosages...",
    icon: Pill,
    hint: "e.g. Lisinopril 10mg daily, Metformin 500mg twice daily",
    rows: 3,
  },
];

const insuranceFields: {
  key: keyof RegistrationFormData;
  label: string;
  placeholder: string;
  icon: typeof Stethoscope;
}[] = [
  {
    key: "insuranceProvider",
    label: "Insurance Provider",
    placeholder: "e.g. Blue Cross, Aetna, Cigna",
    icon: Stethoscope,
  },
  {
    key: "insuranceNumber",
    label: "Insurance Number / Policy ID",
    placeholder: "e.g. BC-98765432",
    icon: Syringe,
  },
];

/* ─── Component ─────────────────────────────── */

export function MedicalInformationForm({
  data,
  onChange,
  errors,
}: MedicalInformationFormProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Medical History */}
      <div>
        <h3 className="mb-1 text-base font-semibold text-slate-900 dark:text-white">
          Medical History
        </h3>
        <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
          Record allergies, chronic conditions, and current medications.
        </p>

        <div className="space-y-4">
          {sections.map((section) => {
            const Icon = section.icon;
            const value = data[section.key] as string;
            const hasError = !!errors[section.key];

            return (
              <div key={section.key}>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                  <Icon className="h-3.5 w-3.5" />
                  {section.label}
                </label>
                <textarea
                  value={value}
                  onChange={(e) => onChange(section.key, e.target.value)}
                  placeholder={section.placeholder}
                  rows={section.rows ?? 2}
                  className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 dark:bg-slate-800 ${
                    hasError
                      ? "border-red-300 focus:border-red-400 focus:ring-red-200 dark:border-red-700"
                      : "border-slate-200 hover:border-slate-300 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:text-slate-300"
                  }`}
                />
                <p className="mt-1 text-[11px] text-slate-400">
                  {section.hint}
                </p>
                {hasError && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors[section.key]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Insurance */}
      <div className="border-t border-slate-100 pt-5 dark:border-slate-700">
        <h3 className="mb-1 text-base font-semibold text-slate-900 dark:text-white">
          Insurance Information
        </h3>
        <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
          Enter the patient&apos;s insurance details.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {insuranceFields.map((field) => {
            const Icon = field.icon;
            const value = data[field.key] as string;
            const hasError = !!errors[field.key];

            return (
              <div key={field.key}>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                  <Icon className="h-3.5 w-3.5" />
                  {field.label}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 dark:bg-slate-800 ${
                    hasError
                      ? "border-red-300 focus:border-red-400 focus:ring-red-200 dark:border-red-700"
                      : "border-slate-200 hover:border-slate-300 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:text-slate-300"
                  }`}
                />
                {hasError && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors[field.key]}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Primary Physician */}
        <div className="mt-4">
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
            <User className="h-3.5 w-3.5" />
            Primary Physician
          </label>
          <input
            type="text"
            value={data.primaryPhysician}
            onChange={(e) => onChange("primaryPhysician", e.target.value)}
            placeholder="e.g. Dr. Sarah Chen"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm transition-all hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          />
          {errors.primaryPhysician && (
            <p className="mt-1 text-xs text-red-500">
              {errors.primaryPhysician}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
