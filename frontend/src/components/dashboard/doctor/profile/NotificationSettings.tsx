"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Bell,
  BellRing,
  FlaskConical,
  MessageSquare,
  Smartphone,
} from "lucide-react";
import { useState } from "react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import {
  type DoctorProfile,
  type NotificationChannel,
  type NotificationSettings as NotificationSettingsType,
} from "./doctor-profile-mock-data";

interface NotificationSettingsProps {
  profile: DoctorProfile;
}

const channelMeta: Record<
  keyof NotificationChannel,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }
> = {
  email: { label: "Email", icon: Bell, color: "text-blue-500" },
  sms: { label: "SMS", icon: Smartphone, color: "text-green-500" },
  push: { label: "Push", icon: BellRing, color: "text-purple-500" },
};

const sectionMeta: Record<
  keyof NotificationSettingsType,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }
> = {
  appointments: {
    label: "Appointments",
    icon: BellRing,
    color: "text-dash-primary",
  },
  messages: {
    label: "Messages",
    icon: MessageSquare,
    color: "text-indigo-500",
  },
  labReports: {
    label: "Lab Reports",
    icon: FlaskConical,
    color: "text-amber-500",
  },
  emergencyAlerts: {
    label: "Emergency Alerts",
    icon: Bell,
    color: "text-rose-500",
  },
};

export function NotificationSettings({ profile }: NotificationSettingsProps) {
  const [settings, setSettings] = useState<NotificationSettingsType>(
    profile.notificationSettings,
  );

  const toggleNotification = (
    section: keyof NotificationSettingsType,
    channel: keyof NotificationChannel,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [channel]: !prev[section][channel],
      },
    }));
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={staggerItem}>
        <div className="rounded-xl border border-slate-200/60 bg-white p-4 dark:border-slate-700/40 dark:bg-slate-900/60">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-950/30">
              <BellRing className="h-4 w-4 text-amber-500" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Notification Preferences
            </span>
          </div>

          {/* Header row */}
          <div className="mb-2 grid grid-cols-[1fr_repeat(3,auto)] gap-3 px-3">
            <div />
            {(["email", "sms", "push"] as const).map((ch) => {
              const meta = channelMeta[ch];
              return (
                <div
                  key={ch}
                  className="flex w-16 justify-center text-[10px] font-medium text-slate-400"
                >
                  {meta.label}
                </div>
              );
            })}
          </div>

          <div className="space-y-1">
            {(
              Object.keys(settings) as Array<keyof NotificationSettingsType>
            ).map((section) => {
              const meta = sectionMeta[section];
              const Icon = meta.icon;
              return (
                <motion.div
                  key={section}
                  variants={staggerItem}
                  className="grid grid-cols-[1fr_repeat(3,auto)] items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30"
                >
                  <div className="flex items-center gap-2">
                    <Icon className={cn("h-4 w-4", meta.color)} />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {meta.label}
                    </span>
                  </div>
                  {(["email", "sms", "push"] as const).map((ch) => (
                    <div key={ch} className="flex w-16 justify-center">
                      <button
                        onClick={() => toggleNotification(section, ch)}
                        className={cn(
                          "relative h-5 w-9 rounded-full transition-colors",
                          settings[section][ch]
                            ? "bg-dash-primary"
                            : "bg-slate-200 dark:bg-slate-700",
                        )}
                      >
                        <span
                          className={cn(
                            "absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                            settings[section][ch] && "translate-x-4",
                          )}
                        />
                      </button>
                    </div>
                  ))}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
