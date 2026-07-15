"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { Bell, Megaphone, Pin, Settings, ShieldAlert } from "lucide-react";
import {
  type Announcement,
  announcements as allAnnouncements,
  notificationStats,
} from "../_mock-data";

/* ─── Summary stat row ──────────────────────── */

function SummaryRow({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg px-3 py-2 text-sm">
      <span className="text-slate-600 dark:text-slate-400">{label}</span>
      <span
        className={`font-semibold ${
          color === "blue"
            ? "text-blue-600 dark:text-blue-400"
            : color === "rose"
              ? "text-rose-600 dark:text-rose-400"
              : color === "amber"
                ? "text-amber-600 dark:text-amber-400"
                : color === "emerald"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : color === "violet"
                    ? "text-violet-600 dark:text-violet-400"
                    : "text-slate-600 dark:text-slate-400"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════
   NotificationSidebar
   ══════════════════════════════════════════════ */

interface NotificationSidebarProps {
  className?: string;
  isMobile?: boolean;
  onClose?: () => void;
}

export function NotificationSidebar({
  className = "",
  isMobile = false,
  onClose,
}: NotificationSidebarProps) {
  const pinnedAnnouncements = allAnnouncements.filter((a) => a.pinned);

  // Compute summary from stats
  const totalUnread =
    notificationStats.find((s) => s.id === "unread")?.value ?? 0;
  const totalToday =
    notificationStats.find((s) => s.id === "today")?.value ?? 0;
  const totalEmergency =
    notificationStats.find((s) => s.id === "emergency")?.value ?? 0;
  const totalAnnouncements =
    notificationStats.find((s) => s.id === "announcements")?.value ?? 0;

  return (
    <motion.div
      variants={isMobile ? undefined : staggerContainer}
      initial={isMobile ? { x: 300, opacity: 0 } : "hidden"}
      animate={isMobile ? { x: 0, opacity: 1 } : "visible"}
      exit={isMobile ? { x: 300, opacity: 0 } : undefined}
      transition={
        isMobile ? { type: "spring", damping: 25, stiffness: 250 } : undefined
      }
      className={`space-y-5 ${className}`}
    >
      {/* Notification Summary */}
      <div className="dash-card p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Summary
        </h3>
        <div className="space-y-1">
          <SummaryRow label="Unread" value={totalUnread} color="blue" />
          <SummaryRow label="Today" value={totalToday} color="violet" />
          <SummaryRow label="Emergency" value={totalEmergency} color="rose" />
          <SummaryRow
            label="Announcements"
            value={totalAnnouncements}
            color="amber"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dash-card p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Quick Actions
        </h3>
        <div className="space-y-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <Bell className="h-4 w-4" />
            </div>
            Mark All as Read
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
              <Megaphone className="h-4 w-4" />
            </div>
            Create Announcement
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
              <ShieldAlert className="h-4 w-4" />
            </div>
            Send Emergency Alert
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400">
              <Settings className="h-4 w-4" />
            </div>
            Notification Settings
          </motion.button>
        </div>
      </div>

      {/* Pinned Announcements */}
      <div className="dash-card p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Pinned Announcements
        </h3>
        {pinnedAnnouncements.length === 0 ? (
          <p className="text-xs text-slate-400 dark:text-slate-500">
            No pinned announcements.
          </p>
        ) : (
          <div className="space-y-3">
            {pinnedAnnouncements.map((announcement) => (
              <PinnedItem key={announcement.id} announcement={announcement} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Pinned Item ───────────────────────────── */

function PinnedItem({ announcement }: { announcement: Announcement }) {
  return (
    <motion.div
      variants={staggerItem}
      className="group cursor-pointer rounded-lg border border-amber-200/50 bg-amber-50/30 p-3 transition-colors hover:bg-amber-50/60 dark:border-amber-900/30 dark:bg-amber-950/10 dark:hover:bg-amber-950/20"
    >
      <div className="flex items-start gap-2">
        <Pin className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
            {announcement.title}
          </p>
          <p className="mt-0.5 line-clamp-2 text-[10px] text-slate-500 dark:text-slate-400">
            {announcement.message}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
