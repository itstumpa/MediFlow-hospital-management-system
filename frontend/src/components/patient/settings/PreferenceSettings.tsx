"use client";

import { motion } from "framer-motion";
import { Clock, Globe } from "lucide-react";
import SettingsCard from "./SettingsCard";
import { PreferenceSettings as PreferenceSettingsType } from "./types";

interface PreferenceSettingsProps {
  settings: PreferenceSettingsType;
  onUpdate: (field: string, value: string) => void;
}

const fieldClasses =
  "w-full px-4 py-2.5 rounded-xl border border-[#e1e8e8] dark:border-[#2a3a3a] bg-white/80 dark:bg-[#1a2a2a]/80 backdrop-blur-xl text-[#1a2e2e] dark:text-white placeholder-[#8a9a9a] focus:border-[#0e7c7b] focus:outline-none focus:ring-2 focus:ring-[#0e7c7b]/20 transition-colors appearance-none";

export default function PreferenceSettings({
  settings,
  onUpdate,
}: PreferenceSettingsProps) {
  return (
    <div className="space-y-6">
      <SettingsCard title="Language" icon={Globe}>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Language">
            <select
              value={settings.language}
              onChange={(e) => onUpdate("language", e.target.value)}
              className={fieldClasses}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Chinese">Chinese</option>
              <option value="Japanese">Japanese</option>
            </select>
          </Field>
          <Field label="Timezone">
            <select
              value={settings.timezone}
              onChange={(e) => onUpdate("timezone", e.target.value)}
              className={fieldClasses}
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="America/Anchorage">Alaska Time</option>
              <option value="Pacific/Honolulu">Hawaii Time</option>
            </select>
          </Field>
        </div>
      </SettingsCard>

      <SettingsCard title="Date & Time" icon={Clock}>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Date Format">
            <select
              value={settings.dateFormat}
              onChange={(e) => onUpdate("dateFormat", e.target.value)}
              className={fieldClasses}
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </Field>
          <Field label="Time Format">
            <select
              value={settings.timeFormat}
              onChange={(e) => onUpdate("timeFormat", e.target.value)}
              className={fieldClasses}
            >
              <option value="12h">12-hour (AM/PM)</option>
              <option value="24h">24-hour</option>
            </select>
          </Field>
        </div>
      </SettingsCard>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-1.5"
    >
      <label className="block text-sm font-medium text-[#1a2e2e] dark:text-white">
        {label}
      </label>
      {children}
    </motion.div>
  );
}
