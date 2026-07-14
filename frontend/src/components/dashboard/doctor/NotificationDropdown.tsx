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
import type { DoctorNotificationItem } from "./types";

/* Mock notifications */
const mockNotifications: DoctorNotificationItem[] = [
  {
    id: "1",
    title: "New appointment booked",
    description:
      "John Smith booked a cardiology consultation for tomorrow at 10:00 AM",
    time: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
    type: "info",
  },
  {
    id: "2",
    title: "Lab results available",
    description: "Lab results for Emily Johnson are now ready for review",
    time: new Date(Date.now() - 1000 * 60 * 45),
    read: false,
    type: "success",
  },
  {
    id: "3",
    title: "Prescription refill request",
    description: "Michael Brown has requested a refill for Metformin 500mg",
    time: new Date(Date.now() - 1000 * 60 * 120),
    read: true,
    type: "warning",
  },
  {
    id: "4",
    title: "Schedule change",
    description:
      "Your afternoon clinic has been rescheduled to 3:00 PM due to room availability",
    time: new Date(Date.now() - 1000 * 60 * 180),
    read: true,
    type: "warning",
  },
  {
    id: "5",
    title: "Patient message",
    description:
      "Sarah Wilson sent you a message regarding her recent test results",
    time: new Date(Date.now() - 1000 * 60 * 300),
    read: true,
    type: "info",
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
              key="notif-dropdown"
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
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Notifications
                </p>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    {unreadCount} new
                  </span>
                )}
              </div>

              {/* List */}
              <div className="max-h-[360px] overflow-y-auto">
                {mockNotifications.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
                    <Bell className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      No notifications yet
                    </p>
                  </div>
                ) : (
                  mockNotifications.map((notif) => {
                    const Icon = typeIcons[notif.type];
                    return (
                      <div
                        key={notif.id}
                        className={cn(
                          "flex gap-3 px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40",
                          !notif.read && "bg-blue-50/30 dark:bg-blue-950/20",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                            typeStyles[notif.type],
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <div className="min-w-0 flex-1">
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
                          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-500 line-clamp-2">
                            {notif.description}
                          </p>
                          <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                            {timeAgo(notif.time)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-slate-100 px-4 py-2.5 dark:border-slate-800/60">
                <Link
                  href="/doctor/notifications"
                  onClick={handleClose}
                  className="flex items-center justify-center gap-1.5 text-sm font-medium text-cyan-600 transition-colors hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                >
                  <span>View all notifications</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
