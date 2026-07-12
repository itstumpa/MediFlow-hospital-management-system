"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Ambulance,
  Baby,
  Bone,
  Brain,
  Building2,
  Droplets,
  Eye,
  Heart,
  HeartPulse,
  Microscope,
  Pill,
  Scan,
  Stethoscope,
  Syringe,
  Wind,
} from "lucide-react";
import { useFormContext } from "react-hook-form";
import { departmentIconOptions } from "./form-mock";
import type { DepartmentFormValues } from "./form-schema";
import { ImageUpload } from "./ImageUpload";

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Brain,
  Baby,
  Bone,
  Droplets,
  Eye,
  Ambulance,
  HeartPulse,
  Wind,
  Stethoscope,
  Microscope,
  Syringe,
  Pill,
  Scan,
  Building2,
};

export function BasicInformation() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<DepartmentFormValues>();

  const selectedIcon = watch("icon");
  const imageValue = watch("image") ?? "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Basic Information
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          General details about the department
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Department Name */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Department Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            placeholder="e.g., Cardiology"
            className={cn(
              "w-full rounded-xl border px-4 py-2.5 text-sm transition-all",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400",
              "placeholder:text-slate-400",
              errors.name
                ? "border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-500/10"
                : "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
            )}
          />
          {errors.name && (
            <p className="text-xs text-red-500" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Department Code */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Department Code <span className="text-red-500">*</span>
          </label>
          <input
            {...register("code")}
            placeholder="e.g., CARD"
            className={cn(
              "w-full rounded-xl border px-4 py-2.5 text-sm transition-all",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400",
              "placeholder:text-slate-400",
              errors.code
                ? "border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-500/10"
                : "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
            )}
          />
          {errors.code && (
            <p className="text-xs text-red-500" role="alert">
              {errors.code.message}
            </p>
          )}
        </div>
      </div>

      {/* Department Icon */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Department Icon <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-8 gap-2 sm:grid-cols-12">
          {departmentIconOptions.map((option) => {
            const IconComp = iconMap[option.value] || Building2;
            const isSelected = selectedIcon === option.value;
            return (
              <motion.button
                key={option.value}
                type="button"
                onClick={() =>
                  setValue("icon", option.value, { shouldValidate: true })
                }
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl border-2 p-2.5 transition-all",
                  isSelected
                    ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-500/10"
                    : "border-slate-200 hover:border-slate-300 dark:border-slate-600 dark:hover:border-slate-500",
                )}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                title={option.label}
              >
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: option.color }}
                >
                  <IconComp className="h-4 w-4" />
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate w-full text-center">
                  {option.label}
                </span>
              </motion.button>
            );
          })}
        </div>
        {errors.icon && (
          <p className="text-xs text-red-500" role="alert">
            {errors.icon.message}
          </p>
        )}
      </div>

      {/* Department Image */}
      <ImageUpload
        value={imageValue}
        onChange={(val) => setValue("image", val)}
        error={errors.image?.message}
        label="Department Image"
      />

      {/* Short Description */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Short Description <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("shortDescription")}
          rows={2}
          placeholder="Brief overview of the department (max 200 characters)"
          className={cn(
            "w-full rounded-xl border px-4 py-2.5 text-sm transition-all resize-none",
            "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400",
            "placeholder:text-slate-400",
            errors.shortDescription
              ? "border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-500/10"
              : "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
          )}
        />
        {errors.shortDescription && (
          <p className="text-xs text-red-500" role="alert">
            {errors.shortDescription.message}
          </p>
        )}
      </div>

      {/* Full Description */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Full Description <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("fullDescription")}
          rows={5}
          placeholder="Detailed description of the department, its services, and specialties"
          className={cn(
            "w-full rounded-xl border px-4 py-2.5 text-sm transition-all resize-none",
            "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400",
            "placeholder:text-slate-400",
            errors.fullDescription
              ? "border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-500/10"
              : "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
          )}
        />
        {errors.fullDescription && (
          <p className="text-xs text-red-500" role="alert">
            {errors.fullDescription.message}
          </p>
        )}
      </div>
    </div>
  );
}
