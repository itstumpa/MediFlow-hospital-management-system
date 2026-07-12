"use client";

import { staggerContainer } from "@/lib/animations/stagger";
import type {
  Notification,
  NotificationFiltersState,
  NotificationSettings,
} from "@/lib/data/notifications";
import {
  calculateStats,
  defaultNotificationFilters,
  defaultNotificationSettings,
  filterNotifications,
  getNotifications,
  groupLabels,
  groupNotifications,
} from "@/lib/data/notifications";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Archive, Bell, CheckCheck, ChevronDown, Settings } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { NotificationCard } from "./NotificationCard";
import { NotificationDrawer } from "./NotificationDrawer";
import { NotificationFilters } from "./NotificationFilters";
import { NotificationStats } from "./NotificationStats";
import { SettingsDialog } from "./SettingsDialog";

interface NotificationListProps {
  className?: string;
}

export function NotificationList({ className }: NotificationListProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(getNotifications);
  const [filters, setFilters] = useState<NotificationFiltersState>(
    defaultNotificationFilters,
  );
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<NotificationSettings>(
    defaultNotificationSettings,
  );
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    { today: true, yesterday: true, thisWeek: true, older: true },
  );

  const filtered = useMemo(
    () => filterNotifications(notifications, filters),
    [notifications, filters],
  );

  const grouped = useMemo(() => groupNotifications(filtered), [filtered]);

  const stats = useMemo(() => calculateStats(notifications), [notifications]);

  const hasActiveFilters =
    filters.mode !== "all" ||
    filters.category !== "all" ||
    filters.priority !== "all";

  const handleMarkRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }, []);

  const handleMarkAllRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((n) => (n.read ? n : { ...n, read: true })),
    );
  }, []);

  const handleArchive = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, archived: true } : n)),
    );
  }, []);

  const handleDelete = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setSelectedNotification((prev) => (prev?.id === id ? null : prev));
  }, []);

  const handleClearRead = useCallback(() => {
    setNotifications((prev) => prev.filter((n) => !n.read));
  }, []);

  const handleViewDetails = useCallback((notification: Notification) => {
    setSelectedNotification(notification);
    setDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const handleSaveSettings = useCallback(() => {
    // In a real app, persist settings to backend
    console.log("Settings saved:", settings);
  }, [settings]);

  const toggleGroup = useCallback((group: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  }, []);

  return (
    <div className={cn("space-y-5", className)}>
      {/* Stats */}
      <NotificationStats stats={stats} />

      {/* Page-level actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {filtered.length === notifications.length
            ? `${notifications.length} notification${notifications.length !== 1 ? "s" : ""}`
            : `${filtered.length} of ${notifications.length} notifications`}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleMarkAllRead}
            disabled={stats.unread === 0}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
              stats.unread > 0
                ? "text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30"
                : "text-slate-300 dark:text-slate-600 cursor-not-allowed",
            )}
            aria-label="Mark all notifications as read"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Mark All Read
          </button>
          <button
            type="button"
            onClick={handleClearRead}
            disabled={stats.unread === notifications.length}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
              stats.unread < notifications.length
                ? "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                : "text-slate-300 dark:text-slate-600 cursor-not-allowed",
            )}
            aria-label="Clear read notifications"
          >
            <Archive className="h-3.5 w-3.5" />
            Clear Read
          </button>
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Notification settings"
          >
            <Settings className="h-3.5 w-3.5" />
            Settings
          </button>
        </div>
      </div>

      {/* Filters */}
      <NotificationFilters filters={filters} onFiltersChange={setFilters} />

      {/* Notification list */}
      <div className="space-y-5">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-800/50"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
              <Bell className="h-7 w-7 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              No notifications
            </h3>
            <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
              {hasActiveFilters
                ? "No notifications match your current filters. Try adjusting your filter criteria."
                : "You're all caught up! New notifications will appear here when there's activity."}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => setFilters(defaultNotificationFilters)}
                className="mt-4 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-all hover:bg-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:hover:bg-blue-950/50"
              >
                Clear Filters
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {grouped.map(([group, groupNotifications]) => (
              <div key={group}>
                {/* Group header */}
                <button
                  type="button"
                  onClick={() => toggleGroup(group)}
                  className="mb-2 flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {groupLabels[group]}
                  </h3>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    ({groupNotifications.length})
                  </span>
                  <motion.div
                    animate={{ rotate: expandedGroups[group] ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-auto"
                  >
                    <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedGroups[group] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="space-y-2 overflow-hidden"
                    >
                      {groupNotifications.map((notif) => (
                        <NotificationCard
                          key={notif.id}
                          notification={notif}
                          onMarkRead={handleMarkRead}
                          onArchive={handleArchive}
                          onDelete={handleDelete}
                          onViewDetails={handleViewDetails}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Detail Drawer */}
      <NotificationDrawer
        notification={selectedNotification}
        open={drawerOpen}
        onClose={handleCloseDrawer}
        onMarkRead={handleMarkRead}
        onArchive={handleArchive}
        onDelete={handleDelete}
      />

      {/* Settings Dialog */}
      <SettingsDialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onSettingsChange={setSettings}
        onSave={handleSaveSettings}
      />
    </div>
  );
}
