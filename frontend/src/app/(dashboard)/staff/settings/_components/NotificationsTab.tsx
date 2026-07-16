"use client";

import { staggerItem } from "@/components/dashboard/staff/MotionVariants";
import { useToast } from "@/lib/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Bell,
  Loader2,
  Mail,
  MessageSquare,
  Save,
  Smartphone,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { defaultNotificationSettings } from "../_mock-data";

const notificationSchema = z.object({
  email: z.object({
    enabled: z.boolean(),
    appointments: z.boolean(),
    reminders: z.boolean(),
    billing: z.boolean(),
    system: z.boolean(),
    marketing: z.boolean(),
  }),
  sms: z.object({
    enabled: z.boolean(),
    appointments: z.boolean(),
    reminders: z.boolean(),
    urgent: z.boolean(),
  }),
  push: z.object({
    enabled: z.boolean(),
    appointments: z.boolean(),
    reminders: z.boolean(),
    chat: z.boolean(),
    system: z.boolean(),
  }),
  inApp: z.object({
    enabled: z.boolean(),
    sound: z.boolean(),
    desktop: z.boolean(),
  }),
});

type NotificationFormData = z.infer<typeof notificationSchema>;

const notificationSections: Array<{
  key: keyof NotificationFormData;
  label: string;
  icon: React.ElementType;
  color: string;
  fields: Array<{
    key: string;
    label: string;
    description: string;
  }>;
}> = [
  {
    key: "email",
    label: "Email Notifications",
    icon: Mail,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30",
    fields: [
      {
        key: "enabled",
        label: "Enable Email Notifications",
        description: "Receive notifications via email",
      },
      {
        key: "appointments",
        label: "Appointment Updates",
        description: "New, changed, or cancelled appointments",
      },
      {
        key: "reminders",
        label: "Appointment Reminders",
        description: "Reminders before scheduled appointments",
      },
      {
        key: "billing",
        label: "Billing & Payments",
        description: "Invoices, payments, and refund notifications",
      },
      {
        key: "system",
        label: "System Updates",
        description: "Maintenance, updates, and important announcements",
      },
      {
        key: "marketing",
        label: "Marketing & Tips",
        description: "Product updates, tips, and promotional content",
      },
    ],
  },
  {
    key: "sms",
    label: "SMS Notifications",
    icon: MessageSquare,
    color: "bg-green-100 text-green-600 dark:bg-green-900/30",
    fields: [
      {
        key: "enabled",
        label: "Enable SMS Notifications",
        description: "Receive notifications via text message",
      },
      {
        key: "appointments",
        label: "Appointment Updates",
        description: "New, changed, or cancelled appointments",
      },
      {
        key: "reminders",
        label: "Appointment Reminders",
        description: "Reminders before scheduled appointments",
      },
      {
        key: "urgent",
        label: "Urgent Alerts Only",
        description: "Only critical and time-sensitive notifications",
      },
    ],
  },
  {
    key: "push",
    label: "Push Notifications",
    icon: Bell,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30",
    fields: [
      {
        key: "enabled",
        label: "Enable Push Notifications",
        description: "Receive real-time push notifications",
      },
      {
        key: "appointments",
        label: "Appointment Updates",
        description: "New, changed, or cancelled appointments",
      },
      {
        key: "reminders",
        label: "Appointment Reminders",
        description: "Reminders before scheduled appointments",
      },
      {
        key: "chat",
        label: "Chat Messages",
        description: "New messages in conversations",
      },
      {
        key: "system",
        label: "System Alerts",
        description: "Important system notifications",
      },
    ],
  },
  {
    key: "inApp",
    label: "In-App Notifications",
    icon: Smartphone,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30",
    fields: [
      {
        key: "enabled",
        label: "Enable In-App Notifications",
        description: "Show notifications within the application",
      },
      {
        key: "sound",
        label: "Notification Sounds",
        description: "Play sound when new notification arrives",
      },
      {
        key: "desktop",
        label: "Desktop Notifications",
        description: "Show browser desktop notifications",
      },
    ],
  },
];

export function NotificationsTab() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
    watch,
  } = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: defaultNotificationSettings,
    mode: "onBlur",
  });

  const onSubmit = async (data: NotificationFormData) => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Settings saved",
        description: "Notification preferences have been updated successfully.",
        variant: "success",
      });
      reset(data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {notificationSections.map((section) => (
        <motion.div
          key={section.key}
          variants={staggerItem}
          className="dash-card"
        >
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
            <span
              className={`h-8 w-8 flex items-center justify-center rounded-lg ${section.color}`}
            >
              <section.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            {section.label}
          </h3>
          <div className="space-y-4">
            {section.fields.map((field) => (
              <div
                key={field.key}
                className={`flex items-center justify-between rounded-lg border p-4 transition-colors ${
                  field.key === "enabled"
                    ? "border-slate-200 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/50"
                    : "border-slate-200 dark:border-slate-700"
                }`}
              >
                <div>
                  <label
                    htmlFor={`${section.key}.${field.key}`}
                    className="font-medium text-slate-900 dark:text-white"
                  >
                    {field.label}
                  </label>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                    {field.description}
                  </p>
                </div>
                <input
                  id={`${section.key}.${field.key}`}
                  type="checkbox"
                  {...register(
                    `${section.key}.${field.key}` as keyof NotificationFormData,
                  )}
                  className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
                  disabled={
                    field.key !== "enabled" &&
                    !watch(
                      `${section.key}.enabled` as keyof NotificationFormData,
                    )
                  }
                />
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Save Button */}
      <motion.div variants={staggerItem} className="flex justify-end">
        <button
          type="submit"
          disabled={!isDirty || !isValid || isSaving}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </button>
      </motion.div>
    </form>
  );
}
