"use client";

import { staggerItem } from "@/components/dashboard/staff/MotionVariants";
import { useToast } from "@/lib/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  dashboardOptions,
  dateFormatOptions,
  defaultGeneralSettings,
  languageOptions,
  timezoneOptions,
} from "../_mock-data";

const generalSchema = z.object({
  language: z.string().min(1, "Language is required"),
  timezone: z.string().min(1, "Timezone is required"),
  dateFormat: z.string().min(1, "Date format is required"),
  timeFormat: z.enum(["12h", "24h"]),
  defaultDashboard: z.string().min(1, "Default dashboard is required"),
  autoSave: z.boolean(),
  compactMode: z.boolean(),
});

type GeneralFormData = z.infer<typeof generalSchema>;

export function GeneralTab() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
    watch,
  } = useForm<GeneralFormData>({
    resolver: zodResolver(generalSchema),
    defaultValues: defaultGeneralSettings,
    mode: "onBlur",
  });

  const onSubmit = async (data: GeneralFormData) => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Settings saved",
        description: "General settings have been updated successfully.",
        variant: "success",
      });
      reset(data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Language & Region */}
      <motion.div variants={staggerItem} className="dash-card">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </span>
          Language & Region
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label
              htmlFor="language"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Language
            </label>
            <select
              id="language"
              {...register("language")}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
            >
              {languageOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="timezone"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Timezone
            </label>
            <select
              id="timezone"
              {...register("timezone")}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
            >
              {timezoneOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="dateFormat"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Date Format
            </label>
            <select
              id="dateFormat"
              {...register("dateFormat")}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
            >
              {dateFormatOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="timeFormat"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Time Format
            </label>
            <select
              id="timeFormat"
              {...register("timeFormat")}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
            >
              <option value="12h">12 Hour (1:30 PM)</option>
              <option value="24h">24 Hour (13:30)</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Default Dashboard */}
      <motion.div variants={staggerItem} className="dash-card">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </span>
          Default Dashboard
        </h3>
        <div>
          <label
            htmlFor="defaultDashboard"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Default Landing Page
          </label>
          <select
            id="defaultDashboard"
            {...register("defaultDashboard")}
            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
          >
            {dashboardOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            The page you'll see when you first log in or click the dashboard
            icon.
          </p>
        </div>
      </motion.div>

      {/* Behavior */}
      <motion.div variants={staggerItem} className="dash-card">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </span>
          Behavior
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
            <div>
              <label
                htmlFor="autoSave"
                className="font-medium text-slate-900 dark:text-white"
              >
                Auto-save changes
              </label>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                Automatically save form changes without confirmation
              </p>
            </div>
            <input
              id="autoSave"
              type="checkbox"
              {...register("autoSave")}
              className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
            <div>
              <label
                htmlFor="compactMode"
                className="font-medium text-slate-900 dark:text-white"
              >
                Compact mode
              </label>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                Reduce spacing for denser information display
              </p>
            </div>
            <input
              id="compactMode"
              type="checkbox"
              {...register("compactMode")}
              className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
            />
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div variants={staggerItem} className="flex justify-end">
        <button
          type="submit"
          disabled={!isDirty || !isValid || isSaving}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </button>
      </motion.div>
    </form>
  );
}
