"use client";

import { staggerItem } from "@/components/dashboard/staff/MotionVariants";
import { useToast } from "@/lib/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  BarChart,
  Bug,
  Loader2,
  Mail,
  Phone,
  Save,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { defaultPrivacySettings, visibilityOptions } from "../_mock-data";

const privacySchema = z.object({
  profileVisibility: z.enum(["all", "staff", "none"]),
  directoryVisibility: z.enum(["all", "staff", "none"]),
  emailVisibility: z.enum(["all", "staff", "none"]),
  phoneVisibility: z.enum(["all", "staff", "none"]),
  analyticsSharing: z.boolean(),
  crashReporting: z.boolean(),
  usageStatistics: z.boolean(),
});

type PrivacyFormData = z.infer<typeof privacySchema>;

const privacySections = [
  {
    key: "profileVisibility",
    label: "Profile Visibility",
    description: "Who can see your profile information",
    icon: User,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30",
  },
  {
    key: "directoryVisibility",
    label: "Directory Visibility",
    description: "Whether you appear in the staff directory",
    icon: User,
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30",
  },
  {
    key: "emailVisibility",
    label: "Email Visibility",
    description: "Who can see your email address",
    icon: Mail,
    color: "bg-green-100 text-green-600 dark:bg-green-900/30",
  },
  {
    key: "phoneVisibility",
    label: "Phone Visibility",
    description: "Who can see your phone number",
    icon: Phone,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30",
  },
];

const dataSections = [
  {
    key: "analyticsSharing",
    label: "Analytics Sharing",
    description: "Share anonymous usage data to help improve the product",
    icon: BarChart,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30",
  },
  {
    key: "crashReporting",
    label: "Crash Reporting",
    description: "Automatically send crash reports to help fix issues",
    icon: Bug,
    color: "bg-red-100 text-red-600 dark:bg-red-900/30",
  },
  {
    key: "usageStatistics",
    label: "Usage Statistics",
    description: "Allow collection of feature usage statistics",
    icon: BarChart,
    color: "bg-teal-100 text-teal-600 dark:bg-teal-900/30",
  },
];

export function PrivacyTab() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
  } = useForm<PrivacyFormData>({
    resolver: zodResolver(privacySchema),
    defaultValues: defaultPrivacySettings,
    mode: "onBlur",
  });

  const onSubmit = async (data: PrivacyFormData) => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Settings saved",
        description: "Privacy settings have been updated successfully.",
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
      {/* Profile & Directory Visibility */}
      <motion.div variants={staggerItem} className="dash-card">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30">
            <Shield className="h-5 w-5" aria-hidden="true" />
          </span>
          Profile & Directory Visibility
        </h3>
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          Control who can see your information in the staff directory and on
          your profile.
        </p>
        <div className="space-y-4">
          {privacySections.map((section) => (
            <div key={section.key}>
              <div className="mb-2 flex items-center gap-2">
                <section.icon
                  className={`h-5 w-5 ${section.color.replace("bg-", "").replace("text-", "")}`}
                />
                <div>
                  <label className="font-medium text-slate-900 dark:text-white">
                    {section.label}
                  </label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {section.description}
                  </p>
                </div>
              </div>
              <select
                {...register(section.key as keyof PrivacyFormData)}
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
              >
                {visibilityOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Data Sharing */}
      <motion.div variants={staggerItem} className="dash-card">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30">
            <BarChart className="h-5 w-5" aria-hidden="true" />
          </span>
          Data Sharing & Analytics
        </h3>
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          Help us improve the product by sharing anonymous usage data. All data
          is aggregated and cannot be traced back to you.
        </p>
        <div className="space-y-4">
          {dataSections.map((section) => (
            <div
              key={section.key}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/50"
            >
              <div className="flex items-center gap-3">
                <section.icon
                  className={`h-5 w-5 ${section.color.replace("bg-", "").replace("text-", "")}`}
                />
                <div>
                  <label className="font-medium text-slate-900 dark:text-white">
                    {section.label}
                  </label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {section.description}
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                {...register(section.key as keyof PrivacyFormData)}
                className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Data Rights */}
      <motion.div variants={staggerItem} className="dash-card">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-900/30">
            <Shield className="h-5 w-5" aria-hidden="true" />
          </span>
          Your Data Rights
        </h3>
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
          <p>
            Under data protection regulations, you have the following rights:
          </p>
          <ul className="ml-4 space-y-2 list-disc">
            <li>
              <strong>Access:</strong> Request a copy of your personal data
            </li>
            <li>
              <strong>Rectification:</strong> Correct inaccurate or incomplete
              data
            </li>
            <li>
              <strong>Erasure:</strong> Request deletion of your personal data
            </li>
            <li>
              <strong>Portability:</strong> Receive your data in a structured
              format
            </li>
            <li>
              <strong>Restriction:</strong> Limit how we process your data
            </li>
            <li>
              <strong>Objection:</strong> Object to processing for marketing or
              analytics
            </li>
          </ul>
          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
            <p className="font-medium text-slate-900 dark:text-white">
              Need to exercise your rights?
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Contact our Data Protection Officer at{" "}
              <a
                href="mailto:dpo@mediflow.com"
                className="text-primary hover:underline"
              >
                dpo@mediflow.com
              </a>
            </p>
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
