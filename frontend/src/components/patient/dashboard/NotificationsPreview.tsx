"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Bell, CalendarCheck, Info, Pill } from "lucide-react";
import Link from "next/link";

const notifications = [
  {
    id: "1",
    title: "Appointment confirmed",
    description: "Cardiology with Dr. Sarah Chen — Tomorrow, 10:00 AM",
    time: "15 min ago",
    read: false,
    type: "success" as const,
  },
  {
    id: "2",
    title: "Lab results ready",
    description: "Your blood test results are now available",
    time: "45 min ago",
    read: false,
    type: "info" as const,
  },
  {
    id: "3",
    title: "Prescription refill reminder",
    description: "Amoxicillin 500mg is due for a refill",
    time: "2 hours ago",
    read: true,
    type: "warning" as const,
  },
  {
    id: "4",
    title: "Appointment reminder",
    description: "Follow-up with Dr. Mitchell at 2:30 PM tomorrow",
    time: "3 hours ago",
    read: true,
    type: "info" as const,
  },
  {
    id: "5",
    title: "New health article available",
    description: "Tips for maintaining heart health during summer",
    time: "1 day ago",
    read: true,
    type: "info" as const,
  },
];

const typeConfig = {
  success: {
    bg: "bg-dash-primary-light dark:bg-teal-950/40",
    icon: CalendarCheck,
    color: "text-dash-primary dark:text-[var(--color-accent)]",
  },
  info: {
    bg: "bg-blue-50 dark:bg-blue-950/40",
    icon: Info,
    color: "text-blue-600 dark:text-blue-400",
  },
  warning: {
    bg: "bg-amber-50 dark:bg-amber-950/40",
    icon: Pill,
    color: "text-amber-600 dark:text-amber-400",
  },
};

const unreadCount = notifications.filter((n) => !n.read).length;

export function NotificationsPreview() {
  if (notifications.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Notifications
          </h2>
        </div>
        <div className="mt-8 flex flex-col items-center gap-2 text-center">
          <Bell className="h-8 w-8 text-slate-300 dark:text-slate-600" />
          <p className="text-sm text-slate-400 dark:text-slate-500">
            No notifications yet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Notifications
          </h2>
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-2 py-0.5 text-[10px] font-bold text-white dark:bg-[var(--color-accent)] dark:text-slate-900">
              {unreadCount}
            </span>
          )}
        </div>
        <Link
          href="/dashboard/patient/notifications"
          className="text-xs font-medium text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-dark)] dark:text-[var(--color-accent)]"
        >
          View all
        </Link>
      </div>

      <div className="mt-4 space-y-1">
        {notifications.slice(0, 5).map((notif, i) => {
          const config = typeConfig[notif.type];
          const Icon = config.icon;
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.04 * i,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              className={cn(
                "flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40",
                !notif.read && "bg-slate-50/60 dark:bg-slate-800/20",
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  config.bg,
                )}
              >
                <Icon className={cn("h-4 w-4", config.color)} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-2">
                  <p
                    className={cn(
                      "text-sm",
                      !notif.read
                        ? "font-semibold text-slate-900 dark:text-white"
                        : "text-slate-600 dark:text-slate-400",
                    )}
                  >
                    {notif.title}
                  </p>
                  {!notif.read && (
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-primary)] dark:bg-[var(--color-accent)]" />
                  )}
                </div>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-500">
                  {notif.description}
                </p>
                <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                  {notif.time}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
