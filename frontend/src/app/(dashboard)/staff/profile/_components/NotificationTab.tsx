"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import {
  Bell,
  Calendar,
  DollarSign,
  Mail,
  MessageSquare,
  Phone,
  Smartphone,
  Users,
} from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "../form-schema";

export function NotificationTab() {
  const { register, watch } = useFormContext<ProfileFormValues>();

  const toggleRow = (
    label: string,
    description: string,
    name: keyof ProfileFormValues,
    icon: React.ReactNode,
  ) => {
    const checked = watch(name) as boolean;

    return (
      <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 transition-all hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-slate-400">{icon}</div>
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {label}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {description}
            </p>
          </div>
        </div>
        <label className="relative inline-flex cursor-pointer items-center">
          <input type="checkbox" {...register(name)} className="peer sr-only" />
          <div className="h-5 w-9 rounded-full bg-slate-300 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-emerald-500 peer-checked:after:translate-x-full peer-focus:outline-none dark:bg-slate-600" />
        </label>
      </div>
    );
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Section Header */}
      <motion.div variants={staggerItem}>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
            <Bell className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Notification Settings
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Choose what updates you want to receive
            </p>
          </div>
        </div>
      </motion.div>

      {/* Event Types */}
      <motion.div variants={staggerItem} className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Events
        </h3>
        {toggleRow(
          "Appointments",
          "Notify me about upcoming appointments and changes",
          "appointments",
          <Calendar className="h-4 w-4" />,
        )}
        {toggleRow(
          "Queue Updates",
          "Updates about patient queue status and wait times",
          "queueUpdates",
          <Users className="h-4 w-4" />,
        )}
        {toggleRow(
          "Billing Alerts",
          "Alerts for billing and invoice updates",
          "billingAlerts",
          <DollarSign className="h-4 w-4" />,
        )}
        {toggleRow(
          "Announcements",
          "Hospital announcements and policy updates",
          "announcements",
          <MessageSquare className="h-4 w-4" />,
        )}
      </motion.div>

      {/* Delivery Channels */}
      <motion.div variants={staggerItem} className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Delivery Channels
        </h3>
        {toggleRow(
          "Email Notifications",
          "Receive notifications via email",
          "notifyEmail",
          <Mail className="h-4 w-4" />,
        )}
        {toggleRow(
          "SMS Notifications",
          "Receive notifications via text message",
          "notifySms",
          <Phone className="h-4 w-4" />,
        )}
        {toggleRow(
          "Push Notifications",
          "Receive push notifications on your devices",
          "notifyPush",
          <Smartphone className="h-4 w-4" />,
        )}
      </motion.div>
    </motion.div>
  );
}
