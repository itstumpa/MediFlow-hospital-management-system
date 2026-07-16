"use client";

import { staggerItem } from "@/components/dashboard/staff/MotionVariants";
import { useToast } from "@/lib/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Bug,
  Cpu,
  Database,
  FileText,
  Globe,
  Loader2,
  Save,
  Shield,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { defaultAdvancedSettings, logLevelOptions } from "../_mock-data";

const advancedSchema = z.object({
  apiAccess: z.boolean(),
  webhooksEnabled: z.boolean(),
  debugMode: z.boolean(),
  cacheEnabled: z.boolean(),
  logLevel: z.enum(["error", "warn", "info", "debug"]),
  sessionTimeout: z.number().min(5).max(1440),
  maxFileUploadSize: z.number().min(1).max(100),
  allowedFileTypes: z.array(z.string()),
});

type AdvancedFormData = z.infer<typeof advancedSchema>;

const advancedSections = [
  {
    key: "apiAccess",
    label: "API Access",
    description:
      "Enable API access for third-party integrations and custom applications",
    icon: Globe,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30",
    warning:
      "Enabling API access requires proper authentication configuration. Review security settings before enabling.",
  },
  {
    key: "webhooksEnabled",
    label: "Webhooks",
    description: "Receive real-time event notifications via HTTP callbacks",
    icon: Zap,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30",
    warning:
      "Webhooks will send data to configured endpoints. Ensure endpoints are secure and can handle the payload.",
  },
  {
    key: "debugMode",
    label: "Debug Mode",
    description: "Enable verbose logging and debug information in the console",
    icon: Bug,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30",
    warning:
      "Debug mode may expose sensitive information in logs. Only enable in development environments.",
  },
  {
    key: "cacheEnabled",
    label: "Caching",
    description: "Enable client-side caching for improved performance",
    icon: Database,
    color: "bg-green-100 text-green-600 dark:bg-green-900/30",
    warning:
      "Caching may show stale data. Clear cache if you experience issues.",
  },
];

export function AdvancedTab() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
    watch,
  } = useForm<AdvancedFormData>({
    resolver: zodResolver(advancedSchema),
    defaultValues: defaultAdvancedSettings,
    mode: "onBlur",
  });

  const onSubmit = async (data: AdvancedFormData) => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Settings saved",
        description: "Advanced settings have been updated successfully.",
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
      {/* Developer Options */}
      <motion.div variants={staggerItem} className="dash-card">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30">
            <Cpu className="h-5 w-5" aria-hidden="true" />
          </span>
          Developer Options
        </h3>
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          Advanced settings for developers and system administrators. Changes
          here may affect system stability.
        </p>
        <div className="space-y-4">
          {advancedSections.map((section) => (
            <div
              key={section.key}
              className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/50"
            >
              <div className="flex items-start gap-3">
                <section.icon
                  className={`h-5 w-5 shrink-0 mt-0.5 ${section.color.replace("bg-", "").replace("text-", "")}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium text-slate-900 dark:text-white">
                        {section.label}
                      </label>
                      <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                        {section.description}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      {...register(section.key as keyof AdvancedFormData)}
                      className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
                    />
                  </div>
                  {watch(section.key as keyof AdvancedFormData) && (
                    <div className="mt-3 rounded-lg bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
                      <p className="flex items-center gap-1.5">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        <span>{section.warning}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Logging & Monitoring */}
      <motion.div variants={staggerItem} className="dash-card">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </span>
          Logging & Monitoring
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="logLevel"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Log Level
            </label>
            <select
              id="logLevel"
              {...register("logLevel")}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
            >
              {logLevelOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              Controls the verbosity of application logs. Higher levels include
              all lower levels.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Session & Security */}
      <motion.div variants={staggerItem} className="dash-card">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-900/30">
            <Shield className="h-5 w-5" aria-hidden="true" />
          </span>
          Session & Security
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="sessionTimeout"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Session Timeout (minutes)
            </label>
            <input
              id="sessionTimeout"
              type="number"
              min="5"
              max="1440"
              step="5"
              {...register("sessionTimeout", { valueAsNumber: true })}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
            />
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              Time of inactivity before automatic logout (5-1440 minutes)
            </p>
          </div>
        </div>
      </motion.div>

      {/* File Upload Settings */}
      <motion.div variants={staggerItem} className="dash-card">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-teal-100 text-teal-600 dark:bg-teal-900/30">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </span>
          File Upload Settings
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="maxFileUploadSize"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Max File Size (MB)
            </label>
            <input
              id="maxFileUploadSize"
              type="number"
              min="1"
              max="100"
              step="1"
              {...register("maxFileUploadSize", { valueAsNumber: true })}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
            />
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              Maximum allowed file size for uploads (1-100 MB)
            </p>
          </div>
          <div>
            <label
              htmlFor="allowedFileTypes"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Allowed File Types
            </label>
            <input
              id="allowedFileTypes"
              type="text"
              {...register("allowedFileTypes")}
              placeholder="pdf, jpg, png, doc, docx"
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
            />
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              Comma-separated list of allowed file extensions
            </p>
          </div>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        variants={staggerItem}
        className="dash-card border-rose-200/50 bg-rose-50/50 dark:border-rose-800/30 dark:bg-rose-900/10"
      >
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-rose-900 dark:text-rose-100">
          <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-900/30">
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          </span>
          Danger Zone
        </h3>
        <p className="mb-4 text-sm text-rose-700 dark:text-rose-300">
          These actions are irreversible. Please proceed with caution.
        </p>
        <div className="space-y-3">
          <button
            type="button"
            className="w-full rounded-lg border border-rose-200 bg-white px-4 py-3 text-left text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-500/20 dark:border-rose-800 dark:bg-slate-800 dark:text-rose-400 dark:hover:bg-rose-900/20"
          >
            <div className="flex items-center justify-between">
              <span>Clear All Cache</span>
              <span className="text-xs text-slate-400">
                Frees up storage space
              </span>
            </div>
          </button>
          <button
            type="button"
            className="w-full rounded-lg border border-rose-200 bg-white px-4 py-3 text-left text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-500/20 dark:border-rose-800 dark:bg-slate-800 dark:text-rose-400 dark:hover:bg-rose-900/20"
          >
            <div className="flex items-center justify-between">
              <span>Reset All Settings</span>
              <span className="text-xs text-slate-400">Restores defaults</span>
            </div>
          </button>
          <button
            type="button"
            className="w-full rounded-lg border border-rose-300 bg-rose-50 px-4 py-3 text-left text-sm font-medium text-rose-700 transition-colors hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-500/20 dark:border-rose-700 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-900/50"
          >
            <div className="flex items-center justify-between">
              <span>Delete Account</span>
              <span className="text-xs text-slate-400">Permanent action</span>
            </div>
          </button>
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
