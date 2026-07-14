"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Calendar,
  FlaskConical,
  Mail,
  MessageSquare,
  Pill,
} from "lucide-react";
import SettingsCard from "./SettingsCard";
import { NotificationSettings as NotificationSettingsType } from "./types";

interface NotificationSettingsProps {
  settings: NotificationSettingsType;
  onUpdate: (field: string, value: boolean) => void;
}

export default function NotificationSettings({
  settings,
  onUpdate,
}: NotificationSettingsProps) {
  return (
    <div className="space-y-6">
      <SettingsCard title="Notification Channels" icon={Bell}>
        <div className="space-y-4">
          <ToggleItem
            label="Email Notifications"
            description="Receive notifications via email"
            icon={Mail}
            enabled={settings.emailNotifications}
            onChange={(v) => onUpdate("emailNotifications", v)}
          />
          <ToggleItem
            label="SMS Notifications"
            description="Receive notifications via text message"
            icon={MessageSquare}
            enabled={settings.smsNotifications}
            onChange={(v) => onUpdate("smsNotifications", v)}
          />
          <ToggleItem
            label="Push Notifications"
            description="Receive push notifications on your device"
            icon={Bell}
            enabled={settings.pushNotifications}
            onChange={(v) => onUpdate("pushNotifications", v)}
          />
        </div>
      </SettingsCard>

      <SettingsCard title="Notification Types" icon={Calendar}>
        <div className="space-y-4">
          <ToggleItem
            label="Appointment Reminders"
            description="Reminders for upcoming appointments"
            icon={Calendar}
            enabled={settings.appointmentReminders}
            onChange={(v) => onUpdate("appointmentReminders", v)}
          />
          <ToggleItem
            label="Prescription Reminders"
            description="Refill reminders and medication alerts"
            icon={Pill}
            enabled={settings.prescriptionReminders}
            onChange={(v) => onUpdate("prescriptionReminders", v)}
          />
          <ToggleItem
            label="Lab Report Alerts"
            description="Notifications when lab results are available"
            icon={FlaskConical}
            enabled={settings.labReportAlerts}
            onChange={(v) => onUpdate("labReportAlerts", v)}
          />
        </div>
      </SettingsCard>
    </div>
  );
}

function ToggleItem({
  label,
  description,
  icon: Icon,
  enabled,
  onChange,
}: {
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between py-2"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-[#f8fafa] dark:bg-[#1a2a2a] border border-[#e1e8e8] dark:border-[#2a3a3a] shrink-0">
          <Icon
            className="h-4 w-4 text-[#5c7373] dark:text-[#8a9a9a]"
            aria-hidden="true"
          />
        </div>
        <div>
          <p className="font-medium text-[#1a2e2e] dark:text-white">{label}</p>
          <p className="text-sm text-[#5c7373] dark:text-[#8a9a9a]">
            {description}
          </p>
        </div>
      </div>
      <ToggleSwitch enabled={enabled} onChange={onChange} />
    </motion.div>
  );
}

function ToggleSwitch({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="relative inline-flex items-center cursor-pointer ml-4 shrink-0">
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0e7c7b]" />
    </label>
  );
}
