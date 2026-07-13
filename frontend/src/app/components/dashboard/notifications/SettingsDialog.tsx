"use client";

import type { NotificationSettings } from "@/lib/data/notifications";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  settings: NotificationSettings;
  onSettingsChange: (settings: NotificationSettings) => void;
  onSave: () => void;
}

const settingItems: {
  key: keyof NotificationSettings;
  label: string;
  description: string;
}[] = [
  {
    key: "appointmentAlerts",
    label: "Appointment Alerts",
    description: "New bookings, cancellations, and reminders",
  },
  {
    key: "newPatientAlerts",
    label: "New Patient Alerts",
    description: "When new patients register or complete intake",
  },
  {
    key: "doctorUpdates",
    label: "Doctor Updates",
    description: "Profile changes, onboarding, and milestones",
  },
  {
    key: "cmsNotifications",
    label: "CMS Notifications",
    description: "Article reviews, publishing, and content updates",
  },
  {
    key: "emailNotifications",
    label: "Email Notifications",
    description: "Receive notification digests via email",
  },
  {
    key: "pushNotifications",
    label: "Push Notifications",
    description: "Browser push notifications for critical alerts",
  },
];

export function SettingsDialog({
  open,
  onClose,
  settings,
  onSettingsChange,
  onSave,
}: SettingsDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2",
              "rounded-2xl border border-slate-200 bg-white p-0 shadow-xl shadow-slate-900/10",
              "dark:border-slate-700 dark:bg-slate-900",
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Notification settings"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Notification Settings
                </h2>
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                  Manage your notification preferences
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                aria-label="Close settings"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Settings list */}
            <div className="space-y-1 px-6 py-4">
              {settingItems.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between rounded-lg px-3 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <div className="min-w-0 flex-1 pr-4">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {item.label}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings[item.key]}
                    aria-label={item.label}
                    onClick={() =>
                      onSettingsChange({
                        ...settings,
                        [item.key]: !settings[item.key],
                      })
                    }
                    className={cn(
                      "relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dash-primary focus-visible:ring-offset-2",
                      settings[item.key]
                        ? "bg-dash-primary"
                        : "bg-slate-200 dark:bg-slate-700",
                    )}
                  >
                    <span
                      className={cn(
                        "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200",
                        settings[item.key] ? "translate-x-4" : "translate-x-0",
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onSave();
                  onClose();
                }}
                className="rounded-lg bg-dash-primary px-4 py-2 text-sm font-medium text-white transition-all hover:bg-dash-primary-dark hover:shadow-md"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
