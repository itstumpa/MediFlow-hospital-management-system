"use client";

import { motion } from "framer-motion";
import { Calendar, Check, ChevronRight, Clock, MoreVertical, Trash2, User, Paperclip, ExternalLink } from "lucide-react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { staggerItem } from "@/components/patient/MotionVariants";
import type { Notification, NotificationType } from "./types";
import { notificationTypeIcons, notificationTypeColors, priorityConfig } from "./types";

interface NotificationCardProps {
  notification: Notification;
  index: number;
  onClick: () => void;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
  onActionClick: (notification: Notification) => void;
  onOpenDrawer?: (notification: Notification) => void;
}

export function NotificationCard({
  notification,
  index,
  onClick,
  onMarkRead,
  onDelete,
  onActionClick,
}: NotificationCardProps) {
  const TypeIcon = notificationTypeIcons[notification.type];
  const typeColors = notificationTypeColors[notification.type];
  const priority = priorityConfig[notification.priority];

  const handleClick = (e: React.MouseEvent) => {
    // Don't trigger card click if clicking on action buttons
    if (
      e.target instanceof HTMLElement &&
      (e.target.closest("button") || e.target.closest("a"))
    ) {
      return;
    }
    onClick();
  };

  const handleMarkRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMarkRead(notification.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(notification.id);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onActionClick(notification);
  };

  return (
    <motion.article
      variants={staggerItem}
      style={{ "--index": index } as CSSProperties}
      onClick={handleClick}
      className={cn(
        "relative group flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all duration-200",
        "bg-white dark:bg-slate-800/60",
        "hover:shadow-lg hover:-translate-y-0.5 hover:border-slate-300/50",
        "dark:hover:border-slate-600/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
        !notification.read &&
          "bg-[var(--color-primary)]/5 dark:bg-teal-950/20 border-[var(--color-primary)]/20 dark:border-teal-900/40",
      )}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      aria-label={notification.read ? "" : "Unread notification, "}
      aria-pressed={!notification.read}
    >
      {/* Unread indicator */}
      {!notification.read && (
        <motion.span
          className="absolute -left-1 top-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-[var(--color-primary)] dark:bg-[var(--color-accent)]"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
      )}

      {/* Icon */}
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          typeColors.iconBg,
          typeColors.text
        )}
      >
        <TypeIcon className="h-5 w-5" strokeWidth={1.8} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3
                className={cn(
                  "text-sm font-semibold truncate",
                  !notification.read
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-600 dark:text-slate-400"
                )}
              >
                {notification.title}
              </h3>
              <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold", priority.className)}>
                <priority.icon className="h-2.5 w-2.5" />
                {priority.label}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {timeAgo(new Date(notification.timestamp))}
            </p>
          </div>

          {/* Actions Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => e.stopPropagation()}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              aria-label="More options"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
          {notification.description}
        </p>

        {/* Related Doctor */}
        {notification.relatedDoctor && (
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <User className="h-3.5 w-3.5" />
            <span className="font-medium text-slate-600 dark:text-slate-300">
              Dr. {notification.relatedDoctor.name.split(" ").pop()}
            </span>
            <span>·</span>
            <span>{notification.relatedDoctor.department}</span>
          </div>
        )}

        {/* Related Appointment */}
        {notification.relatedAppointment && (
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Calendar className="h-3.5 w-3.5" />
            <span className="font-medium text-slate-600 dark:text-slate-300">
              {notification.relatedAppointment.type}
            </span>
            <span>·</span>
            <span>{notification.relatedAppointment.date}</span>
            <span>·</span>
            <span>{notification.relatedAppointment.time}</span>
          </div>
        )}

        {/* Attachments indicator */}
        {notification.attachments && notification.attachments.length > 0 && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Paperclip className="h-3.5 w-3.5" />
            <span>{notification.attachments.length} attachment(s)</span>
          </div>
        )}

        {/* Primary Action */}
        {notification.actionUrl && (
          <motion.button
            type="button"
            onClick={handleActionClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary)]/10 px-3 py-1.5 text-xs font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/20 dark:text-[var(--color-accent)] dark:hover:bg-[var(--color-accent)]/20"
          >
            {notification.actionLabel || "View Details"}
            <ExternalLink className="h-3.5 w-3.5" />
          </motion.button>
        )}

        {/* Quick Actions (visible on hover) */}
        <div className="absolute right-4 bottom-4 opacity-0 transition-opacity group-hover:opacity-100 flex items-center gap-1">
          {!notification.read && (
            <button
              type="button"
              onClick={handleMarkRead}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              aria-label="Mark as read"
            >
              <Check className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={handleDelete}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20 dark:hover:text-red-400"
            aria-label="Delete notification"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Time Ago Helper ─── */

function timeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}