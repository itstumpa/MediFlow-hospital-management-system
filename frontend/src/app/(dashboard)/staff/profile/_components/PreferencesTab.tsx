"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Globe, Languages } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  dateFormatOptions,
  languageOptions,
  timeFormatOptions,
  timezoneOptions,
} from "../_mock-data";
import type { ProfileFormValues } from "../form-schema";

export function PreferencesTab() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  const inputGlow =
    "transition-all duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)]";

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Section Header */}
      <motion.div variants={staggerItem}>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400">
            <Globe className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Preferences
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Language, timezone, and regional settings
            </p>
          </div>
        </div>
      </motion.div>

      {/* Language */}
      <motion.div variants={staggerItem} className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Language <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Languages className="h-4 w-4" />
          </div>
          <select
            {...register("language")}
            className={`w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-8 text-sm text-slate-900 transition-all focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white ${inputGlow} ${
              errors.language ? "border-red-400" : ""
            }`}
          >
            {languageOptions.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        {errors.language && (
          <p className="text-xs text-red-500">{errors.language.message}</p>
        )}
      </motion.div>

      {/* Timezone */}
      <motion.div variants={staggerItem} className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Timezone <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Globe className="h-4 w-4" />
          </div>
          <select
            {...register("timezone")}
            className={`w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-8 text-sm text-slate-900 transition-all focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white ${inputGlow} ${
              errors.timezone ? "border-red-400" : ""
            }`}
          >
            {timezoneOptions.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>
        {errors.timezone && (
          <p className="text-xs text-red-500">{errors.timezone.message}</p>
        )}
      </motion.div>

      {/* Format Row */}
      <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Date Format <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <CalendarDays className="h-4 w-4" />
            </div>
            <select
              {...register("dateFormat")}
              className={`w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-8 text-sm text-slate-900 transition-all focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white ${inputGlow} ${
                errors.dateFormat ? "border-red-400" : ""
              }`}
            >
              {dateFormatOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          {errors.dateFormat && (
            <p className="text-xs text-red-500">{errors.dateFormat.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Time Format <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Clock className="h-4 w-4" />
            </div>
            <select
              {...register("timeFormat")}
              className={`w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-8 text-sm text-slate-900 transition-all focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white ${inputGlow} ${
                errors.timeFormat ? "border-red-400" : ""
              }`}
            >
              {timeFormatOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          {errors.timeFormat && (
            <p className="text-xs text-red-500">{errors.timeFormat.message}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
