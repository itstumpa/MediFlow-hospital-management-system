"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Mail,
  Smartphone,
  Bell,
  Globe,
  Check,
  X,
  Settings,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import {
  NotificationSettings,
  MOCK_NOTIFICATIONS,
  NotificationType,
} from "./types";

interface NotificationsSettingsProps {
  initialData?: NotificationSettings;
  onChange?: (data: Partial<NotificationSettings>) => void;
}

export function NotificationsSettings({
  initialData = MOCK_NOTIFICATIONS,
  onChange,
}: NotificationsSettingsProps) {
  const [data, setData] = useState<NotificationSettings>(initialData);

  const handleChange = <K extends keyof NotificationSettings>(
    field: K,
    value: NotificationSettings[K],
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
    onChange?.({ [field]: value });
  };

  const toggleEmailAlert = (id: string) => {
    handleChange(
      "emailTypes",
      data.emailTypes.map((t) =>
        t.id === id ? { ...t, enabled: !t.enabled } : t,
      ),
    );
  };

  const toggleSMSAlert = (id: string) => {
    handleChange(
      "smsTypes",
      data.smsTypes.map((t) =>
        t.id === id ? { ...t, enabled: !t.enabled } : t,
      ),
    );
  };

  const togglePushNotification = (
    key: keyof NotificationSettings["pushNotifications"],
  ) => {
    // Not used in new structure
  };

  const toggleBrowserNotification = (
    key: keyof NotificationSettings["browserNotifications"],
  ) => {
    // Not used in new structure
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Email Alerts */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-dash-primary-light text-dash-primary dark:bg-teal-900/30 dark:text-accent">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Email Alerts
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Configure which events trigger email notifications
            </p>
          </div>
        </div>

        <div className="dash-card p-6 space-y-3">
          {data.emailTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/50"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {type.label}
                  </p>
                </div>
              </div>
              <ToggleSwitch
                checked={type.enabled}
                onChange={() => toggleEmailAlert(type.id)}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* SMS Alerts */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            <Smartphone className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              SMS Alerts
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Configure which events trigger SMS notifications
            </p>
          </div>
        </div>

        <div className="dash-card p-6 space-y-3">
          {data.smsTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/50"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                  <Smartphone className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {type.label}
                  </p>
                </div>
              </div>
              <ToggleSwitch
                checked={type.enabled}
                onChange={() => toggleSMSAlert(type.id)}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Push Notifications */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Push Notifications
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Configure push notification preferences
            </p>
          </div>
        </div>

        <div className="dash-card p-6 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/50"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                <Bell className="h-4 w-4" />
              </span>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Enable Push Notifications
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Allow push notifications to be sent to your device
                </p>
              </div>
            </div>
            <ToggleSwitch
              checked={data.pushNotifications}
              onChange={() =>
                handleChange("pushNotifications", !data.pushNotifications)
              }
            />
          </motion.div>
        </div>
      </section>

      {/* Browser Notifications */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Browser Notifications
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Configure browser notification behavior
            </p>
          </div>
        </div>

        <div className="dash-card p-6 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/50"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                <Globe className="h-4 w-4" />
              </span>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Enable Browser Notifications
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Show native browser notifications when app is open
                </p>
              </div>
            </div>
            <ToggleSwitch
              checked={data.browserNotifications}
              onChange={() =>
                handleChange("browserNotifications", !data.browserNotifications)
              }
            />
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

function ToggleSwitch({ checked, onChange, disabled }: ToggleSwitchProps) {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      role="switch"
      aria-checked={checked}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-dash-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900",
        checked ? "bg-dash-primary" : "bg-slate-300 dark:bg-slate-600",
        disabled && "opacity-50 cursor-not-allowed",
      )}
    >
      <motion.span
        animate={{ x: checked ? 22 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg"
      />
    </button>
  );
}
