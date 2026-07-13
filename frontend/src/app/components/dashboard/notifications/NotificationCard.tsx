"use client";

import { staggerItem } from "@/lib/animations/stagger";
import type {
  Notification,
  NotificationCategory,
} from "@/lib/data/notifications";
import { priorityConfig } from "@/lib/data/notifications";
import { cn, timeAgo } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Archive,
  Bell,
  CalendarCheck,
  Check,
  Eye,
  FileText,
  MessageSquare,
  Stethoscope,
  Trash2,
  UserPlus,
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

interface NotificationCardProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onViewDetails: (notification: Notification) => void;
}

export function NotificationCard({
  notification,
  onMarkRead,
  onArchive,
  onDelete,
  onViewDetails,
}: NotificationCardProps) {
  const Icon = categoryIcons[notification.category];
  const priority = priorityConfig[notification.priority];
  const isUnread = !notification.read;

  return (
    <motion.div
      variants={staggerItem}
      layout
      whileHover={{ scale: 1.003, y: -1 }}
      whileTap={{ scale: 0.997 }}
      className={cn(
        "group relative cursor-pointer rounded-xl border px-5 py-4 shadow-sm transition-all duration-200",
        isUnread
          ? "border-dash-primary-light/60 bg-dash-primary-light/30 shadow-dash-primary-dark/5 dark:border-teal-800/40 dark:bg-teal-950/20"
          : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600",
      )}
      onClick={() => onViewDetails(notification)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onViewDetails(notification);
        }
      }}
      aria-label={`${notification.title}${isUnread ? " (unread)" : ""}`}
    >
      {/* Unread glow bar */}
      {isUnread && (
        <div className="absolute left-0 top-2 h-8 w-1 rounded-r-full bg-dash-primary shadow-[0_0_8px_rgba(14,124,123,0.4)]" />
      )}

      <div className="flex items-start gap-3.5">
        {/* Category icon */}
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            categoryBg[notification.category],
            isUnread && "ring-2 ring-dash-primary dark:ring-teal-800",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h4
                  className={cn(
                    "truncate text-sm",
                    isUnread
                      ? "font-semibold text-slate-900 dark:text-white"
                      : "font-medium text-slate-700 dark:text-slate-300",
                  )}
                >
                  {notification.title}
                </h4>
              </div>
              <p className="mt-0.5 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                {notification.description}
              </p>
            </div>
            {/* Priority badge */}
            <span
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                priority.color,
              )}
            >
              {priority.label}
            </span>
          </div>

          {/* Footer */}
          <div className="mt-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-xs text-slate-400 dark:text-slate-500">
              <span>{timeAgo(notification.timestamp)}</span>
              {notification.relatedUser && (
                <>
                  <span aria-hidden="true">Â·</span>
                  <span className="truncate max-w-[120px]">
                    {notification.relatedUser.name}
                  </span>
                </>
              )}
            </div>

            {/* Quick actions â€” visible on hover */}
            <div className="flex items-center gap-0.5 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              {isUnread && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkRead(notification.id);
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-dash-primary-light hover:text-dash-primary dark:hover:bg-teal-950/30 dark:hover:text-dash-primary"
                  aria-label="Mark as read"
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onArchive(notification.id);
                }}
                className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-950/30 dark:hover:text-amber-400"
                aria-label="Archive"
              >
                <Archive className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(notification.id);
                }}
                className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                aria-label="Delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(notification);
                }}
                className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                aria-label="View details"
              >
                <Eye className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
