"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Eye, Mail, MessageSquare, Shield, User, Users } from "lucide-react";
import { useState } from "react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { PrivacySettings } from "./security-mock-data";

interface PrivacyCardProps {
  initialSettings: PrivacySettings;
}

const visibilityOptions = [
  { value: "all", label: "Everyone" },
  { value: "patients", label: "Patients Only" },
  { value: "staff", label: "Staff Only" },
  { value: "none", label: "No One" },
] as const;

const contactOptions = [
  { value: "any", label: "Any Patient" },
  { value: "approved", label: "Approved Only" },
  { value: "none", label: "No Contact" },
] as const;

export function PrivacyCard({ initialSettings }: PrivacyCardProps) {
  const [settings, setSettings] = useState<PrivacySettings>(initialSettings);

  const toggleBool = (field: "analyticsSharing" | "marketingEmails") => {
    setSettings((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200/60 bg-white p-5 dark:border-slate-700/40 dark:bg-slate-900/60"
      >
        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
            <Shield className="h-4 w-4 text-emerald-500" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Privacy Settings
          </span>
        </div>

        <div className="space-y-4">
          {/* Profile Visibility */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <User className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Profile Visibility
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {visibilityOptions.slice(0, 3).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      profileVisibility:
                        opt.value as PrivacySettings["profileVisibility"],
                    }))
                  }
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-[10px] font-medium transition-all",
                    settings.profileVisibility === opt.value
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300"
                      : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Appointment Visibility */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Eye className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Appointment Visibility
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {visibilityOptions.slice(0, 2).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      appointmentVisibility:
                        opt.value as PrivacySettings["appointmentVisibility"],
                    }))
                  }
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-[10px] font-medium transition-all",
                    settings.appointmentVisibility === opt.value
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300"
                      : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Patient Contact Preference */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Patient Contact Preference
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {contactOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      patientContactPreference:
                        opt.value as PrivacySettings["patientContactPreference"],
                    }))
                  }
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-[10px] font-medium transition-all",
                    settings.patientContactPreference === opt.value
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300"
                      : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-2.5 pt-1">
            {/* Analytics Sharing */}
            <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 px-3.5 py-2.5 dark:border-slate-800 dark:bg-slate-800/30">
              <div className="flex items-center gap-2.5">
                <Users className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Analytics Sharing
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Help improve MediFlow with usage data
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleBool("analyticsSharing")}
                className={cn(
                  "relative h-5 w-9 rounded-full transition-colors",
                  settings.analyticsSharing
                    ? "bg-emerald-500"
                    : "bg-slate-300 dark:bg-slate-600",
                )}
              >
                <span
                  className={cn(
                    "absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                    settings.analyticsSharing && "translate-x-4",
                  )}
                />
              </button>
            </div>

            {/* Marketing Emails */}
            <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 px-3.5 py-2.5 dark:border-slate-800 dark:bg-slate-800/30">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Marketing Emails
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Receive updates and promotional content
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleBool("marketingEmails")}
                className={cn(
                  "relative h-5 w-9 rounded-full transition-colors",
                  settings.marketingEmails
                    ? "bg-emerald-500"
                    : "bg-slate-300 dark:bg-slate-600",
                )}
              >
                <span
                  className={cn(
                    "absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                    settings.marketingEmails && "translate-x-4",
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
