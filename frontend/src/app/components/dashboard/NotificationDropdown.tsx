"use client";

import { cn, timeAgo } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  CheckCheck,
  ExternalLink,
  Info,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { scaleFade } from "./MotionVariants";
import type { NotificationItem } from "./types";

/* Mock notifications */
const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "New appointment booked",
    description:
      "Sarah Chen booked a cardiology appointment for tomorrow at 10:00 AM",
    time: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
    type: "info",
  },
  {
    id: "2",
    title: "Patient record updated",
    description: "Dr. Mitchell updated John Doe's medical history",
    time: new Date(Date.now() - 1000 * 60 * 45),
    read: false,
    type: "success",
  },
  {
    id: "3",
    title: "Appointment cancelled",
    description: "Michael Brown cancelled his follow-up visit",
    time: new Date(Date.now() - 1000 * 60 * 120),
    read: true,
    type: "warning",
  },
  {
    id: "4",
    title: "System alert",
    description: "Database backup completed successfully",
    time: new Date(Date.now() - 1000 * 60 * 180),
    read: true,
    type: "info",
  },
];

const typeIcons = {
  info: Info,
  success: CheckCheck,
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
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
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
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Notifications
                </h3>
                <button
                  className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  onClick={() => {} /* mark all as read */}
                >
                  Mark all read
                </button>
              </div>

              {/* List */}
              <div className="max-h-[360px] overflow-y-auto">
                {mockNotifications.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
                    <Bell className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      No notifications yet
                    </p>
                  </div>
                ) : (
                  mockNotifications.map((notif) => {
                    const TypeIcon = typeIcons[notif.type];
                    return (
                      <button
                        key={notif.id}
                        className={cn(
                          "flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40",
                          !notif.read && "bg-blue-50/40 dark:bg-blue-950/20",
                        )}
                        onClick={() => {} /* mark as read + navigate */}
                      >
                        <span
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                            typeStyles[notif.type],
                          )}
                        >
                          <TypeIcon className="h-4 w-4" />
                        </span>
                        <div className="flex-1 overflow-hidden">
                          <p
                            className={cn(
                              "truncate text-sm",
                              !notif.read
                                ? "font-semibold text-slate-900 dark:text-white"
                                : "text-slate-600 dark:text-slate-400",
                            )}
                          >
                            {notif.title}
                          </p>
                          <p className="mt-0.5 line-clamp-2 text-xs text-slate-500 dark:text-slate-500">
                            {notif.description}
                          </p>
                          <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                            {timeAgo(notif.time)}
                          </p>
                        </div>
                        {!notif.read && (
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <Link
                href="/notifications"
                onClick={handleClose}
                className="flex items-center justify-center gap-1.5 border-t border-slate-100 px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-800/60 dark:text-slate-400 dark:hover:bg-slate-800/40"
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
