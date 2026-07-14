"use client";

import { pageTransition } from "@/components/patient/MotionVariants";
import { PageHeader } from "@/components/patient/PageHeader";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Share2, Trash2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { EmptyState } from "./EmptyState";
import { CardsSkeleton } from "./LoadingSkeleton";
import { NotificationDrawer } from "./NotificationDrawer";
import { NotificationFilters } from "./NotificationFilters";
import { NotificationList } from "./NotificationList";
import { NotificationStats } from "./NotificationStats";
import type { Notification } from "./types";
import {
  computeNotificationStats,
  DEFAULT_NOTIFICATION_FILTERS,
  filterNotifications,
  groupNotificationsByDate,
  mockNotifications,
  sortNotifications,
} from "./types";

/* ─── Toast ─── */

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-slate-800 px-5 py-3 text-sm font-medium text-white shadow-xl dark:bg-slate-700"
    >
      <Check className="h-4 w-4 text-emerald-400" />
      <span>{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </motion.div>
  );
}

export function Notifications() {
  /* ─── State ─── */
  const [filters, setFilters] = useState<typeof DEFAULT_NOTIFICATION_FILTERS>(
    DEFAULT_NOTIFICATION_FILTERS,
  );
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  /* ─── Derived Data ─── */
  const filtered = useMemo(
    () =>
      sortNotifications(
        filterNotifications(notifications, filters.filter),
        filters.sort,
      ),
    [notifications, filters],
  );

  const groups = useMemo(() => groupNotificationsByDate(filtered), [filtered]);

  const stats = useMemo(
    () => computeNotificationStats(notifications),
    [notifications],
  );

  const unreadCount = stats.unread;

  const hasActiveFilters =
    filters.filter !== "all" || filters.sort !== "newest";

  /* ─── Handlers ─── */
  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_NOTIFICATION_FILTERS);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleMarkRead = useCallback(
    (id: string) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
      showToast("Marked as read");
    },
    [showToast],
  );

  const handleMarkAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast("All notifications marked as read");
  }, [showToast]);

  const handleDelete = useCallback(
    (id: string) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      showToast("Notification deleted");
    },
    [showToast],
  );

  const handleDeleteRead = useCallback(() => {
    setNotifications((prev) => prev.filter((n) => !n.read));
    showToast("Read notifications deleted");
  }, [showToast]);

  const handleOpenDrawer = useCallback(
    (notification: Notification) => {
      setSelectedNotification(notification);
      if (!notification.read) {
        handleMarkRead(notification.id);
      }
    },
    [handleMarkRead],
  );

  const handleCloseDrawer = useCallback(() => {
    setSelectedNotification(null);
  }, []);

  const handleActionClick = useCallback(
    (notification: Notification) => {
      if (notification.actionUrl) {
        window.location.href = notification.actionUrl;
      }
      showToast(`Opening ${notification.actionLabel || "details"}`);
    },
    [showToast],
  );

  const handleMarkUnread = useCallback(
    (id: string) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: false } : n)),
      );
      showToast("Marked as unread");
    },
    [showToast],
  );

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen space-y-6 pb-10"
    >
      {/* Page Header */}
      <PageHeader
        title="Notifications"
        subtitle="Stay updated with your healthcare activities."
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50"
            >
              <Check className="h-4 w-4" />
              <span className="hidden sm:inline">Mark All Read</span>
              <span className="sm:hidden">Mark Read</span>
            </button>
            <button
              type="button"
              onClick={handleDeleteRead}
              disabled={notifications.every((n) => n.read)}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-50 hover:shadow-sm active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed dark:border-red-900/40 dark:text-red-400 dark:hover:bg-red-950/20"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Delete Read</span>
              <span className="sm:hidden">Delete</span>
            </button>
            <button
              type="button"
              onClick={() => showToast("Notification preferences opened")}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm active:scale-[0.97] dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Preferences</span>
            </button>
          </div>
        }
      />

      {/* Statistics */}
      <NotificationStats stats={stats} />

      {/* Filters */}
      <NotificationFilters
        filters={filters}
        onChange={setFilters}
        onReset={resetFilters}
        unreadCount={unreadCount}
      />

      {/* Main Content */}
      {loading && <CardsSkeleton count={6} />}

      {!loading && filtered.length === 0 && (
        <EmptyState
          hasFilters={hasActiveFilters}
          onClearFilters={resetFilters}
          filterLabel={filters.filter}
        />
      )}

      {!loading && filtered.length > 0 && (
        <AnimatePresence mode="wait">
          <NotificationList
            key={filters.filter}
            groups={groups}
            onMarkRead={handleMarkRead}
            onDelete={handleDelete}
            onOpenDrawer={handleOpenDrawer}
            onActionClick={handleActionClick}
          />
        </AnimatePresence>
      )}

      {/* Notification Drawer */}
      <NotificationDrawer
        notification={selectedNotification}
        onClose={handleCloseDrawer}
        onMarkRead={handleMarkRead}
        onDelete={handleDelete}
        onActionClick={handleActionClick}
      />

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}
