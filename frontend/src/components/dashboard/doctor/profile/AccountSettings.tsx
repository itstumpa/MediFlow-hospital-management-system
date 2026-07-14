"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Globe, Laptop, Moon, Shield, Sun, Timer } from "lucide-react";
import { useState } from "react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { DoctorProfile } from "./doctor-profile-mock-data";

interface AccountSettingsProps {
  profile: DoctorProfile;
}

const fieldStyles =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-dash-primary dark:focus:ring-dash-primary-light";

const labelStyles =
  "mb-1 block text-[10px] font-medium text-slate-500 dark:text-slate-400";

const timezones = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Dubai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland",
];

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Arabic",
  "Portuguese",
];

export function AccountSettings({ profile }: AccountSettingsProps) {
  const [settings, setSettings] = useState(profile.accountSettings);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Theme */}
      <motion.div variants={staggerItem}>
        <div className="rounded-xl border border-slate-200/60 bg-white p-4 dark:border-slate-700/40 dark:bg-slate-900/60">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
              {settings.theme === "dark" ? (
                <Moon className="h-4 w-4 text-indigo-500" />
              ) : settings.theme === "light" ? (
                <Sun className="h-4 w-4 text-amber-500" />
              ) : (
                <Timer className="h-4 w-4 text-slate-500" />
              )}
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Appearance
            </span>
          </div>

          <div className="flex gap-2">
            {(
              [
                { value: "light", label: "Light", icon: Sun },
                { value: "dark", label: "Dark", icon: Moon },
                { value: "system", label: "System", icon: Timer },
              ] as const
            ).map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.value}
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      theme: opt.value,
                    }))
                  }
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-medium transition-all",
                    settings.theme === opt.value
                      ? "border-dash-primary-light bg-dash-primary-light text-dash-primary dark:border-dash-primary dark:bg-dash-primary-light dark:text-accent"
                      : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Language & Timezone */}
      <motion.div variants={staggerItem}>
        <div className="rounded-xl border border-slate-200/60 bg-white p-4 dark:border-slate-700/40 dark:bg-slate-900/60">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-dash-primary-light dark:bg-dash-primary-light">
              <Globe className="h-4 w-4 text-dash-primary" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Language & Region
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelStyles}>Language</label>
              <select
                value={settings.language}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    language: e.target.value,
                  }))
                }
                className={fieldStyles}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelStyles}>Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    timezone: e.target.value,
                  }))
                }
                className={fieldStyles}
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Security */}
      <motion.div variants={staggerItem}>
        <div className="rounded-xl border border-slate-200/60 bg-white p-4 dark:border-slate-700/40 dark:bg-slate-900/60">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-950/30">
              <Shield className="h-4 w-4 text-rose-500" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Security
            </span>
          </div>

          <div className="space-y-3">
            {/* Two-Factor Auth */}
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-3 dark:border-slate-700 dark:bg-slate-800/30">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Two-Factor Authentication
                  </p>
                  <p className="text-xs text-slate-400">
                    Add an extra layer of security
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    twoFactorAuth: !prev.twoFactorAuth,
                  }))
                }
                className={cn(
                  "relative h-5 w-9 rounded-full transition-colors",
                  settings.twoFactorAuth
                    ? "bg-dash-primary"
                    : "bg-slate-300 dark:bg-slate-600",
                )}
              >
                <span
                  className={cn(
                    "absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                    settings.twoFactorAuth && "translate-x-4",
                  )}
                />
              </button>
            </div>

            {/* Connected Devices */}
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-3 dark:border-slate-700 dark:bg-slate-800/30">
              <div className="flex items-center gap-3">
                <Laptop className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Connected Devices
                  </p>
                  <p className="text-xs text-slate-400">
                    {settings.connectedDevices} active sessions
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
              >
                Manage
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
