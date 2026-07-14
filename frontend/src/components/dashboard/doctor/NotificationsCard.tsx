"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  ChevronRight,
  Info,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { dashboardNotifications } from "./mock-data";
import { staggerContainer, staggerItem } from "./MotionVariants";

const typeConfig = {
  info: {
    icon: Info,
    bg: "bg-blue-50 dark:bg-blue-950/30",
    color: "text-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50 dark:bg-amber-950/30",
    color: "text-amber-500",
  },
  emergency: {
    icon: ShieldAlert,
    bg: "bg-red-50 dark:bg-red-950/30",
    color: "text-red-500",
  },
  success: {
    icon: CheckCircle,
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    color: "text-emerald-500",
  },
};

export function NotificationsCard() {
  const unreadCount = dashboardNotifications.filter((n) => !n.read).length;

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/60 bg-white p-5",
        "dark:border-slate-700/40 dark:bg-slate-900/60",
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Notifications
          </h2>
          {unreadCount > 0 && (
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-dash-primary px-1.5 text-[10px] font-bold leading-none text-white">
              {unreadCount}
            </span>
          )}
        </div>
        <Link
          href="/doctor/notifications"
          className="inline-flex items-center gap-0.5 text-xs font-medium text-dash-primary transition-colors hover:text-dash-primary-dark dark:text-accent dark:hover:text-accent"
        >
          View all
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        {dashboardNotifications.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-6 text-center">
            <Bell className="h-8 w-8 text-slate-300 dark:text-slate-600" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No notifications
            </p>
          </div>
        ) : (
          dashboardNotifications.map((notif) => {
            const config = typeConfig[notif.type];
            const Icon = config.icon;

            return (
              <motion.div
                key={notif.id}
                variants={staggerItem}
                className={cn(
                  "flex items-start gap-3 rounded-xl p-3 transition-all",
                  "hover:bg-slate-50 dark:hover:bg-slate-800/40",
                  !notif.read && "bg-slate-50/60 dark:bg-slate-800/20",
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    config.bg,
                  )}
                >
                  <Icon className={cn("h-4 w-4", config.color)} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p
                      className={cn(
                        "text-sm",
                        notif.read
                          ? "text-slate-600 dark:text-slate-400"
                          : "font-medium text-slate-900 dark:text-white",
                      )}
                    >
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-dash-primary" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {notif.description}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">
                    {notif.time}
                  </p>
                </div>
              </motion.div>
            );
          })
        )}
      </motion.div>
    </div>
  );
}
