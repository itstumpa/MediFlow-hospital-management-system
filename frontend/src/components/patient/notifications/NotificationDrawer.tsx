"use client";

import { cn, timeAgo } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Check,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Trash2,
  User,
  X,
} from "lucide-react";
import type { Notification } from "./types";
import {
  notificationTypeColors,
  notificationTypeIcons,
  priorityConfig,
} from "./types";

interface NotificationDrawerProps {
  notification: Notification | null;
  onClose: () => void;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
  onActionClick: (notification: Notification) => void;
}

export function NotificationDrawer({
  notification,
  onClose,
  onMarkRead,
  onDelete,
  onActionClick,
}: NotificationDrawerProps) {
  if (!notification) return null;

  const TypeIcon = notificationTypeIcons[notification.type];
  const typeColors = notificationTypeColors[notification.type];
  const priority = priorityConfig[notification.priority];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <AnimatePresence onExitComplete={onClose}>
      <motion.div
        key="drawer-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        key="drawer"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl dark:bg-slate-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-4 dark:border-slate-700">
          <div className="flex-1">
            <h2
              id="drawer-title"
              className="text-lg font-semibold text-slate-900 dark:text-white"
            >
              Notification Details
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {timeAgo(new Date(notification.timestamp))}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
            aria-label="Close drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex h-[calc(100%-64px)] flex-col overflow-y-auto p-4">
          <div className="space-y-6">
            {/* Type & Priority Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                  typeColors.bg,
                  typeColors.text,
                )}
              >
                <TypeIcon className="h-3.5 w-3.5" strokeWidth={2} />
                {notification.type.replace("-", " ")}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
                  priority.className,
                )}
              >
                <priority.icon className="h-3 w-3" />
                {priority.label}
              </span>
              {!notification.read && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold text-white">
                  <span className="relative flex h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                  Unread
                </span>
              )}
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {notification.title}
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {notification.description}
              </p>
            </div>

            {/* Related Doctor */}
            {notification.relatedDoctor && (
              <div className="rounded-2xl border p-4 bg-slate-50/50 dark:bg-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400">
                      Related Doctor
                    </p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {notification.relatedDoctor.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {notification.relatedDoctor.department}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Related Appointment */}
            {notification.relatedAppointment && (
              <div className="rounded-2xl border p-4 bg-blue-50/50 dark:bg-blue-950/20">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/40">
                    <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400">
                      Related Appointment
                    </p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {notification.relatedAppointment.type}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-slate-500 dark:text-slate-400">
                      <span>{notification.relatedAppointment.date}</span>
                      <span>·</span>
                      <span>{notification.relatedAppointment.time}</span>
                      <span>·</span>
                      <span className="capitalize">
                        {notification.relatedAppointment.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Attachments */}
            {notification.attachments &&
              notification.attachments.length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400">
                    Attachments
                  </p>
                  <div className="space-y-2">
                    {notification.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center justify-between rounded-xl border border-slate-200 p-3 transition-colors hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                            <FileText className="h-5 w-5 text-slate-500" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                              {attachment.name}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {attachment.type} · {attachment.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                            aria-label={`Download ${attachment.name}`}
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                            aria-label={`Open ${attachment.name}`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Action Button */}
            {notification.actionUrl && (
              <motion.button
                type="button"
                onClick={() => onActionClick(notification)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl bg-[var(--color-primary)] px-4 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-[var(--color-primary-dark)] hover:shadow-md active:scale-[0.98] dark:bg-[var(--color-accent)] dark:text-slate-900"
              >
                {notification.actionLabel || "View Details"}
              </motion.button>
            )}
          </div>

          {/* Footer Actions */}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
            <button
              type="button"
              onClick={() => onMarkRead(notification.id)}
              className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {notification.read ? (
                <>
                  <Clock className="h-4 w-4" />
                  Mark Unread
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Mark Read
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => onDelete(notification.id)}
              className="flex h-10 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-900/40 dark:text-red-400 dark:hover:bg-red-950/20"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
