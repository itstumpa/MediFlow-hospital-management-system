"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { Eye, Globe, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import type { PrivacySettings } from "../_mock-data";

interface PrivacyCardProps {
  data: PrivacySettings;
}

const visibilityOptions = [
  { value: "all", label: "Everyone" },
  { value: "staff", label: "Staff Only" },
  { value: "none", label: "No One" },
] as const;

interface SettingRowProps {
  icon: React.ElementType;
  label: string;
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
}

function SettingRow({
  icon: Icon,
  label,
  value,
  options,
  onChange,
}: SettingRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <div className="flex items-center gap-2.5">
        <Icon className="h-4 w-4 text-slate-400" />
        <span className="text-xs text-slate-700 dark:text-slate-300">
          {label}
        </span>
      </div>
      <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 dark:border-slate-700 dark:bg-slate-800">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-md px-2.5 py-1 text-[10px] font-medium transition-all ${
              value === opt.value
                ? "bg-white text-slate-800 shadow-sm dark:bg-slate-700 dark:text-white"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PrivacyCard({ data }: PrivacyCardProps) {
  const [settings, setSettings] = useState(data);

  const updateSetting = (
    key: keyof PrivacySettings,
    value: string | boolean,
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={staggerItem} className="dash-card">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400">
            <Eye className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Privacy Settings
          </span>
        </div>

        <div className="space-y-0.5">
          <SettingRow
            icon={User}
            label="Profile Visibility"
            value={settings.profileVisibility}
            options={visibilityOptions}
            onChange={(v) => updateSetting("profileVisibility", v)}
          />
          <SettingRow
            icon={Globe}
            label="Directory Listing"
            value={settings.directoryVisibility}
            options={visibilityOptions}
            onChange={(v) => updateSetting("directoryVisibility", v)}
          />
          <SettingRow
            icon={Mail}
            label="Email Address"
            value={settings.emailVisibility}
            options={visibilityOptions}
            onChange={(v) => updateSetting("emailVisibility", v)}
          />
          <SettingRow
            icon={Phone}
            label="Phone Number"
            value={settings.phoneVisibility}
            options={visibilityOptions}
            onChange={(v) => updateSetting("phoneVisibility", v)}
          />
        </div>

        <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 dark:border-slate-700 dark:bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <span className="text-xs text-slate-700 dark:text-slate-300">
              Anonymous analytics sharing
            </span>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={settings.analyticsSharing}
              onChange={() =>
                updateSetting("analyticsSharing", !settings.analyticsSharing)
              }
              className="peer sr-only"
            />
            <div className="h-5 w-9 rounded-full bg-slate-300 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-emerald-500 peer-checked:after:translate-x-full peer-focus:outline-none dark:bg-slate-600" />
          </label>
        </div>
      </motion.div>
    </motion.div>
  );
}
