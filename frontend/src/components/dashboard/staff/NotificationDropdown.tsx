"use client";

import { cn, timeAgo } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  CalendarCheck,
  ExternalLink,
  Info,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { scaleFade } from "./MotionVariants";
import type { StaffNotificationItem } from "./types";

/* Mock notifications */
const mockNotifications: StaffNotificationItem[] = [
  {
    id: "1",
    title: "New patient registered",
    description:
      "Patient David Kim has been registered successfully for a general checkup",
    time: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
    type: "success",
  },
  {
    id: "2",
    title: "Appointment reminder",
    description:
      "Walk-in patient waiting in Queue #3 - Lisa Anderson for Dr. Chen",
    time: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
    type: "warning",
  },
  {
    id: "3",
    title: "Payment received",
    description: "Invoice #INV-2024-0842 has been paid - $250.00",
    time: new Date(Date.now() - 1000 * 60 * 45),
    read: false,
    type: "info",
  },
  {
    id: "4",
    title: "Schedule update",
    description: "Dr. Martinez has updated their availability for next week",
    time: new Date(Date.now() - 1000 * 60 * 120),
    read: true,
    type: "info",
  },
  {
    id: "5",
    title: "Insurance verification",
    description: "Insurance verification pending for patient Robert Johnson",
    time: new Date(Date.now() - 1000 * 60 * 240),
    read: true,
    type: "warning",
  },
];

const typeIcons = {
  info: Info,
  success: CalendarCheck,
  warning: AlertTriangle,
  error: AlertTriangle,
};

const typeStyles = {
  info: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  success:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  warning:
    "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  error: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
};

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={handleToggle}
        className={cn(
          "relative flex h-9 w-9 items-center justify-center rounded-xl",
          "text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600",
          "dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
          isOpen &&
            "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
        )}
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Bell className="h-[18px] w-[18px]" strokeWidth={1.8} />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white animate-[pulse-badge_2s_ease-in-out_infinite]">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Click-outside backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={handleClose}
              aria-hidden="true"
            />

            <motion.div
              key="notification-dropdown"
              variants={scaleFade}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "absolute right-0 top-full z-50 mt-2 w-[380px] overflow-hidden rounded-2xl",
                "border border-slate-200/60 bg-white shadow-xl shadow-slate-900/5",
                "dark:border-slate-700/60 dark:bg-slate-900",
              )}
              role="menu"
              aria-label="Notifications"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800/60">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Notifications
                </h3>
                <button
                  className="text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
                  onClick={handleClose}
                >
                  Mark all read
                </button>
              </div>

              {/* List */}
              <div className="max-h-[320px] overflow-y-auto">
                {mockNotifications.map((notification) => {
                  const Icon = typeIcons[notification.type];
                  return (
                    <button
                      key={notification.id}
                      className={cn(
                        "flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40",
                        !notification.read &&
                          "bg-slate-50/50 dark:bg-slate-800/20",
                      )}
                      onClick={handleClose}
                    >
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
                          typeStyles[notification.type],
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="flex-1 overflow-hidden">
                        <p
                          className={cn(
                            "truncate text-sm",
                            notification.read
                              ? "text-slate-600 dark:text-slate-400"
                              : "font-medium text-slate-900 dark:text-white",
                          )}
                        >
                          {notification.title}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-xs text-slate-500 dark:text-slate-500">
                          {notification.description}
                        </p>
                        <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                          {timeAgo(notification.time)}
                        </p>
                      </div>
                      {!notification.read && (
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-primary)]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Footer */}
              <Link
                href="/staff/notifications"
                className={cn(
                  "flex items-center justify-center gap-1.5 border-t border-slate-100 px-4 py-3",
                  "text-xs font-medium text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-dark)]",
                  "dark:border-slate-800/60 dark:hover:text-[var(--color-accent)]",
                )}
                onClick={handleClose}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View all notifications
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
