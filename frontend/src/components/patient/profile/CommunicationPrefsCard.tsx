"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BellOff, Check, Mail, MessageSquare, Smartphone } from "lucide-react";
import type { PatientProfile } from "./types";

/* ─── Props ─── */

interface CommunicationPrefsCardProps {
  profile: PatientProfile;
}

/* ─── Toggle switch ─── */

function ToggleSwitch({
  icon: Icon,
  label,
  enabled,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  enabled: boolean;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      className={cn(
        "flex items-center gap-3 rounded-xl p-4 transition-all duration-200",
        enabled
          ? "bg-slate-50/80 dark:bg-slate-800/30"
          : "bg-slate-50/40 opacity-60 dark:bg-slate-800/20",
      )}
    >
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white",
          enabled ? "" : "bg-slate-300 dark:bg-slate-600",
        )}
        style={{ backgroundColor: enabled ? color : undefined }}
      >
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          {label}
        </p>
      </div>
      <div
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
          enabled
            ? "bg-[var(--color-primary)]"
            : "bg-slate-200 dark:bg-slate-600",
        )}
      >
        <motion.div
          animate={{ x: enabled ? 22 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm"
        />
      </div>
    </motion.div>
  );
}

/* ─── Component ─── */

export function CommunicationPrefsCard({
  profile,
}: CommunicationPrefsCardProps) {
  const { communicationPrefs: prefs } = profile;

  return (
    <motion.div variants={staggerItem} className="dash-card">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5 dark:border-slate-700/50">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-500 dark:bg-teal-950/40 dark:text-teal-400">
          <BellOff className="h-4.5 w-4.5" />
        </span>
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            Communication Preferences
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Manage how we contact you
          </p>
        </div>
      </div>

      <div className="grid gap-3 p-6 sm:grid-cols-2">
        <ToggleSwitch
          icon={Mail}
          label="Email Notifications"
          enabled={prefs.email}
          color="#3b82f6"
        />
        <ToggleSwitch
          icon={MessageSquare}
          label="SMS Alerts"
          enabled={prefs.sms}
          color="#8b5cf6"
        />
        <ToggleSwitch
          icon={Smartphone}
          label="Push Notifications"
          enabled={prefs.push}
          color="#10b981"
        />
        <ToggleSwitch
          icon={Check}
          label="Newsletter"
          enabled={prefs.newsletter}
          color="#f59e0b"
        />
      </div>
    </motion.div>
  );
}
