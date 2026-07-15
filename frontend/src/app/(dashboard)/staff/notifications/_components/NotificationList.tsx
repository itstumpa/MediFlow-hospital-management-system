"use client";

import {
  hoverLift,
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { CheckCheck, MoreHorizontal } from "lucide-react";
import { useRef, useState } from "react";
import {
  categoryConfig,
  type NotificationItem,
  priorityConfig,
} from "../_mock-data";

/* ─── Time formatting ───────────────────────── */

function formatTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/* ─── Unread pulse indicator ────────────────── */

const pulseVariants = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.4, 1],
    opacity: [1, 0.4, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

/* ─── Action Menu ───────────────────────────── */

function ActionMenu({
  onMarkRead,
  onDismiss,
}: {
  onMarkRead?: () => void;
  onDismiss?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
        aria-label="More actions"
      >
        <MoreHorizontal className="h-4 w-4" />
      </motion.button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 z-50 mt-1 w-36 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800"
          >
            {onMarkRead && (
              <button
                onClick={() => {
                  onMarkRead();
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark as Read
              </button>
            )}
            {onDismiss && (
              <button
                onClick={() => {
                  onDismiss();
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50"
              >
                Dismiss
              </button>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
}

/* ─── Notification Card ─────────────────────── */

function NotificationCard({
  item,
  onMarkRead,
  onDismiss,
}: {
  item: NotificationItem;
  onMarkRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
}) {
  const Icon = item.icon;
  const priority = priorityConfig[item.priority];
  const category = categoryConfig[item.category];

  return (
    <motion.div
      variants={staggerItem}
      layout
      {...hoverLift}
      className={`group relative rounded-xl border p-4 transition-colors sm:p-5 ${
        item.status === "unread"
          ? "border-blue-200 bg-blue-50/50 dark:border-blue-900/50 dark:bg-blue-950/20"
          : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Icon */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            category.color === "blue"
              ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
              : category.color === "violet"
                ? "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400"
                : category.color === "emerald"
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                  : category.color === "amber"
                    ? "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
                    : category.color === "cyan"
                      ? "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400"
                      : "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3
                  className={`truncate text-sm font-medium ${
                    item.status === "unread"
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {item.title}
                </h3>
                {/* Unread pulse dot */}
                {item.status === "unread" && (
                  <motion.span
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                    className="h-2 w-2 shrink-0 rounded-full bg-blue-500"
                  />
                )}
              </div>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {item.message}
              </p>
            </div>
            <ActionMenu
              onMarkRead={
                item.status === "unread"
                  ? () => onMarkRead?.(item.id)
                  : undefined
              }
              onDismiss={() => onDismiss?.(item.id)}
            />
          </div>

          {/* Footer */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {/* Priority badge */}
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${priority.class}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${priority.dot}`} />
              {priority.label}
            </span>
            {/* Category */}
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              {category.label}
            </span>
            {/* Timestamp */}
            <span className="ml-auto text-[10px] text-slate-400 dark:text-slate-500">
              {formatTime(item.timestamp)}
            </span>
          </div>

          {/* Actionable button */}
          {item.actionable && item.actionLabel && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-3 rounded-lg bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/20"
            >
              {item.actionLabel}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   NotificationList
   ══════════════════════════════════════════════ */

interface NotificationListProps {
  items: NotificationItem[];
  onMarkRead?: (id: string) => void;
  onMarkAllRead?: () => void;
  onDismiss?: (id: string) => void;
}

export function NotificationList({
  items,
  onMarkRead,
  onMarkAllRead,
  onDismiss,
}: NotificationListProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {items.map((item) => (
        <NotificationCard
          key={item.id}
          item={item}
          onMarkRead={onMarkRead}
          onDismiss={onDismiss}
        />
      ))}
    </motion.div>
  );
}
