"use client";

import type {
  Notification,
  NotificationCategory,
} from "@/lib/data/notifications";
import { priorityConfig } from "@/lib/data/notifications";
import { cn, timeAgo } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  Bell,
  CalendarCheck,
  Check,
  Clock,
  ExternalLink,
  FileText,
  MessageSquare,
  Stethoscope,
  Trash2,
  UserPlus,
  X,
  type LucideIcon,
} from "lucide-react";

const categoryIcons: Record<NotificationCategory, LucideIcon> = {
  appointments: CalendarCheck,
  doctors: Stethoscope,
  patients: UserPlus,
  articles: FileText,
  system: Bell,
  messages: MessageSquare,
};

const categoryBg: Record<NotificationCategory, string> = {
  appointments:
    "bg-dash-primary-light text-dash-primary dark:bg-teal-500/10 dark:text-accent",
  doctors:
    "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
  patients:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  articles:
    "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  system: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  messages: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
};

const categoryLabel: Record<NotificationCategory, string> = {
  appointments: "Appointment",
  doctors: "Doctor",
  patients: "Patient",
  articles: "Article",
  system: "System",
  messages: "Message",
};

interface NotificationDrawerProps {
  notification: Notification | null;
  open: boolean;
  onClose: () => void;
  onMarkRead: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationDrawer({
  notification,
  open,
  onClose,
  onMarkRead,
  onArchive,
  onDelete,
}: NotificationDrawerProps) {
  if (!notification) return null;

  const Icon = categoryIcons[notification.category];
  const priority = priorityConfig[notification.priority];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm dark:bg-black/40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={cn(
              "fixed inset-y-0 right-0 z-50 w-full border-l shadow-2xl",
              "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900",
              "sm:max-w-lg",
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Notification details"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg",
                      categoryBg[notification.category],
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {categoryLabel[notification.category]}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                  aria-label="Close details"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-6 p-5">
                  {/* Title & Priority */}
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        {notification.title}
                      </h2>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                          priority.color,
                        )}
                      >
                        {priority.label}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                      <Clock className="h-3.5 w-3.5" />
                      <span>
                        {new Date(notification.timestamp).toLocaleString(
                          "en-US",
                          {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          },
                        )}
                      </span>
                      <span aria-hidden="true">Â·</span>
                      <span>{notification.read ? "Read" : "Unread"}</span>
                    </div>
                  </div>

                  {/* Related user */}
                  {notification.relatedUser && (
                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
                      <img
                        src={notification.relatedUser.avatar}
                        alt={notification.relatedUser.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {notification.relatedUser.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {notification.relatedUser.role}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Full description */}
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Details
                    </h3>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {notification.detailContent?.fullDescription ??
                        notification.description}
                    </p>
                  </div>

                  {/* Related links */}
                  {notification.detailContent?.relatedLinks &&
                    notification.detailContent.relatedLinks.length > 0 && (
                      <div>
                        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Related Links
                        </h3>
                        <div className="space-y-1.5">
                          {notification.detailContent.relatedLinks.map(
                            (link, i) => (
                              <a
                                key={i}
                                href={link.href}
                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-dash-primary transition-colors hover:bg-dash-primary-light dark:text-accent dark:hover:bg-teal-950/30"
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                                {link.label}
                              </a>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                  {/* Activity */}
                  {notification.detailContent?.activity &&
                    notification.detailContent.activity.length > 0 && (
                      <div>
                        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Activity
                        </h3>
                        <div className="relative space-y-4">
                          <div className="absolute left-[7px] top-2 h-[calc(100%-16px)] w-0.5 bg-slate-200 dark:bg-slate-700" />
                          {notification.detailContent.activity.map(
                            (entry, i) => (
                              <div
                                key={i}
                                className="relative flex items-start gap-3 pl-6"
                              >
                                <div className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-dash-primary bg-white dark:border-teal-500 dark:bg-slate-900" />
                                <div>
                                  <p className="text-sm text-slate-700 dark:text-slate-300">
                                    {entry.action}
                                  </p>
                                  <p className="text-xs text-slate-400 dark:text-slate-500">
                                    {timeAgo(entry.timestamp)}
                                  </p>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 border-t border-slate-100 px-5 py-4 dark:border-slate-800">
                {!notification.read && (
                  <button
                    type="button"
                    onClick={() => {
                      onMarkRead(notification.id);
                      onClose();
                    }}
                    className="inline-flex items-center gap-2 rounded-lg bg-dash-primary px-4 py-2 text-sm font-medium text-white transition-all hover:bg-dash-primary-dark hover:shadow-md"
                  >
                    <Check className="h-4 w-4" />
                    Mark Read
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    onArchive(notification.id);
                    onClose();
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                >
                  <Archive className="h-4 w-4" />
                  Archive
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onDelete(notification.id);
                    onClose();
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-all hover:bg-red-100 hover:shadow-sm dark:border-red-800 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/30"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
