"use client";

import { motion } from "framer-motion";
import { Stethoscope, BadgeDollarSign, Hash, Briefcase, IdCard } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { departments, specializations, designations } from "./form-mock";
import type { DoctorFormValues } from "./form-schema";
import { staggerItem } from "@/lib/animations/stagger";

const inputGlow =
  "transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]";

const inputClass = (hasError: boolean) =>
  `w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 ${inputGlow} ${
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-500/20"
      : "border-slate-300 dark:border-slate-600"
  }`;

const selectClass = (hasError: boolean) =>
  `w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 transition-all focus:outline-none ${inputGlow} ${
    hasError
      ? "border-red-400"
      : "border-slate-300 dark:border-slate-600"
  } dark:bg-slate-800 dark:text-white`;

export function ProfessionalInfo() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<DoctorFormValues>();

  const selectedDept = watch("department");

  const deptSpecializations = selectedDept
    ? specializations[selectedDept] || []
    : [];

  return (
    <motion.div variants={staggerItem} className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
          <Stethoscope className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Professional Information
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Credentials and practice details
          </p>
        </div>
      </div>

      {/* Doctor ID */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Doctor ID
        </label>
        <div className="relative">
          <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            {...register("doctorId")}
            placeholder="Auto-generated"
            readOnly
            className={`${inputClass(false)} pl-10 bg-slate-50 dark:bg-slate-800/50 text-slate-400 cursor-not-allowed`}
          />
        </div>
      </div>

      {/* Department & Specialization */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Department <span className="text-red-500">*</span>
          </label>
          <select
            {...register("department")}
            className={selectClass(!!errors.department)}
            aria-invalid={!!errors.department}
          >
            <option value="">Select department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {errors.department && (
            <p className="text-xs text-red-500">{errors.department.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Specialization <span className="text-red-500">*</span>
          </label>
          <select
            {...register("specialization")}
            className={selectClass(!!errors.specialization)}
            aria-invalid={!!errors.specialization}
            disabled={!selectedDept}
          >
            <option value="">
              {selectedDept ? "Select specialization" : "Select department first"}
            </option>
            {deptSpecializations.map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
          {errors.specialization && (
            <p className="text-xs text-red-500">{errors.specialization.message}</p>
          )}
        </div>
      </div>

      {/* Designation & Experience */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Designation <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              {...register("designation")}
              className={`${selectClass(!!errors.designation)} pl-10`}
              aria-invalid={!!errors.designation}
            >
              <option value="">Select designation</option>
              {designations.map((des) => (
                <option key={des} value={des}>{des}</option>
              ))}
            </select>
          </div>
          {errors.designation && (
            <p className="text-xs text-red-500">{errors.designation.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Years of Experience <span className="text-red-500">*</span>
          </label>
          <input
            {...register("yearsOfExperience", { valueAsNumber: true })}
            type="number"
            min={0}
            max={70}
            placeholder="e.g. 14"
            className={inputClass(!!errors.yearsOfExperience)}
            aria-invalid={!!errors.yearsOfExperience}
          />
          {errors.yearsOfExperience && (
            <p className="text-xs text-red-500">{errors.yearsOfExperience.message}</p>
          )}
        </div>
      </div>

      {/* Consultation Fee & Employment Type */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Consultation Fee ($) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <BadgeDollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              {...register("consultationFee", { valueAsNumber: true })}
              type="number"
              min={0}
              placeholder="e.g. 250"
              className={`${inputClass(!!errors.consultationFee)} pl-10`}
              aria-invalid={!!errors.consultationFee}
            />
          </div>
          {errors.consultationFee && (
            <p className="text-xs text-red-500">{errors.consultationFee.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Employment Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register("employmentType")}
            className={selectClass(!!errors.employmentType)}
            aria-invalid={!!errors.employmentType}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Visiting">Visiting</option>
            <option value="Locum">Locum</option>
          </select>
          {errors.employmentType && (
            <p className="text-xs text-red-500">{errors.employmentType.message}</p>
          )}
        </div>
      </div>

      {/* License & Registration */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            License Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              {...register("licenseNumber")}
              placeholder="e.g. LIC-MD-2010-8742"
              className={`${inputClass(!!errors.licenseNumber)} pl-10`}
              aria-invalid={!!errors.licenseNumber}
            />
          </div>
          {errors.licenseNumber && (
            <p className="text-xs text-red-500">{errors.licenseNumber.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Medical Registration Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              {...register("medicalRegistrationNumber")}
              placeholder="e.g. MCI-2010-45219"
              className={`${inputClass(!!errors.medicalRegistrationNumber)} pl-10`}
              aria-invalid={!!errors.medicalRegistrationNumber}
            />
          </div>
          {errors.medicalRegistrationNumber && (
            <p className="text-xs text-red-500">{errors.medicalRegistrationNumber.message}</p>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Status <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-3">
          {(["Active", "Inactive", "On Leave", "Vacation", "Emergency Duty"] as const).map(
            (statusOption) => (
              <label
                key={statusOption}
                className="relative flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm transition-all hover:border-slate-300 dark:border-slate-600 dark:hover:border-slate-500 has-checked:border-blue-500 has-checked:bg-blue-50 has-checked:text-blue-700 dark:has-checked:border-blue-400 dark:has-checked:bg-blue-500/10 dark:has-checked:text-blue-300"
              >
                <input
                  type="radio"
                  value={statusOption}
                  {...register("status")}
                  className="sr-only"
                />
                <motion.div
                  className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-slate-300 transition-colors dark:border-slate-500"
                  initial={false}
                  animate={
                    watch("status") === statusOption
                      ? { borderColor: "#3b82f6", backgroundColor: "#3b82f6" }
                      : {}
                  }
                >
                  {watch("status") === statusOption && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-2 w-2 rounded-full bg-white"
                    />
                  )}
                </motion.div>
                {statusOption}
              </label>
            )
          )}
        </div>
        {errors.status && (
          <p className="text-xs text-red-500">{errors.status.message}</p>
        )}
      </div>
    </motion.div>
  );
}
