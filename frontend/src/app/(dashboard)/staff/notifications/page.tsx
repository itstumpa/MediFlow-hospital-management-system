"use client";

import {
  buttonPress,
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { PageHeader } from "@/components/dashboard/staff/PageHeader";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  BellOff,
  CheckCheck,
  Filter,
  FilterX,
  PanelRightClose,
  PanelRightOpen,
  Settings,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import {
  AnnouncementCard,
  EmergencyAlertCard,
  EmptyState,
  NotificationFilters,
  NotificationList,
  NotificationSidebar,
  NotificationStats,
  ReminderCard,
} from "./_components";
import {
  type EmergencyAlert,
  type NotificationFilter,
  type NotificationItem,
  type Reminder,
  announcements as allAnnouncements,
  emergencyAlerts as allEmergencyAlerts,
  notifications as allNotifications,
  reminders as allReminders,
} from "./_mock-data";

/* ══════════════════════════════════════════════
   NotificationsPage
   ══════════════════════════════════════════════ */

export default function NotificationsPage() {
  /* ── State ──────────────────────────────────── */

  const [activeFilter, setActiveFilter] = useState<NotificationFilter>("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Mutable state for notifications, reminders, emergency alerts
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(allNotifications);
  const [reminders, setReminders] = useState<Reminder[]>(allReminders);
  const [emergencyAlerts, setEmergencyAlerts] =
    useState<EmergencyAlert[]>(allEmergencyAlerts);

  /* ── Filtered notifications ────────────────── */

  const filteredNotifications = useMemo(() => {
    let items = notifications;

    switch (activeFilter) {
      case "unread":
        items = items.filter((n) => n.status === "unread");
        break;
      case "appointments":
      case "billing":
      case "patients":
      case "doctors":
      case "announcements":
      case "emergency":
        items = items.filter((n) => n.category === activeFilter);
        break;
      default:
        break;
    }

    // Sort: unread first, then by timestamp descending
    return items.sort((a, b) => {
      if (a.status !== b.status) {
        return a.status === "unread" ? -1 : 1;
      }
      return b.timestamp.getTime() - a.timestamp.getTime();
    });
  }, [notifications, activeFilter]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => n.status === "unread").length,
    [notifications],
  );

  /* ── Handlers ───────────────────────────────── */

  const handleMarkRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "read" as const } : n)),
    );
  }, []);

  const handleMarkAllRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, status: "read" as const })),
    );
  }, []);

  const handleDismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const handleToggleReminder = useCallback((id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r)),
    );
  }, []);

  const handleAcknowledge = useCallback((id: string) => {
    setEmergencyAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)),
    );
  }, []);

  /* ── Determine view state ──────────────────── */

  const showNotificationList =
    activeFilter !== "announcements" && activeFilter !== "emergency";
  const showAnnouncements =
    activeFilter === "all" ||
    activeFilter === "announcements" ||
    activeFilter === "unread";
  const showEmergency =
    activeFilter === "all" ||
    activeFilter === "emergency" ||
    activeFilter === "unread";
  const showReminders = activeFilter === "all" || activeFilter === "unread";

  const hasAnyContent =
    filteredNotifications.length > 0 ||
    (showAnnouncements && allAnnouncements.length > 0) ||
    (showReminders && reminders.length > 0) ||
    (showEmergency && emergencyAlerts.length > 0);

  /* ── Render ─────────────────────────────────── */

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* ── Header ─────────────────────────────── */}
      <motion.div
        variants={staggerItem}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <PageHeader
          title="Notifications"
          subtitle="Stay updated with clinic activities and announcements."
        />
        <div className="flex items-center gap-2">
          {/* Unread count badge */}
          {unreadCount > 0 && (
            <motion.button
              {...buttonPress}
              onClick={handleMarkAllRead}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-xs font-medium text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-700/50"
            >
              <CheckCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Mark All Read</span>
              <span className="inline sm:hidden">Read</span>
            </motion.button>
          )}

          {/* Filter toggle */}
          <motion.button
            {...buttonPress}
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors ${
              showFilters
                ? "bg-[var(--color-primary)] text-white shadow-sm"
                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-700/50"
            }`}
          >
            {showFilters ? (
              <FilterX className="h-4 w-4" />
            ) : (
              <Filter className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">
              {showFilters ? "Hide Filters" : "Filter"}
            </span>
          </motion.button>

          {/* Notification Settings */}
          <motion.button
            {...buttonPress}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-xs font-medium text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-700/50"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </motion.button>

          {/* Sidebar toggle (desktop) */}
          <motion.button
            {...buttonPress}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden rounded-lg bg-white p-2 text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-700/50 lg:inline-flex"
          >
            {sidebarOpen ? (
              <PanelRightClose className="h-4 w-4" />
            ) : (
              <PanelRightOpen className="h-4 w-4" />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* ── Stats ──────────────────────────────── */}
      <motion.div variants={staggerItem}>
        <NotificationStats />
      </motion.div>

      {/* ── Filters ────────────────────────────── */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <NotificationFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Active filter indicator (when filters not expanded) ── */}
      {!showFilters && (
        <NotificationFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      )}

      {/* ── Body: Main + Sidebar ────────────────── */}
      <motion.div variants={staggerItem} className="flex gap-6">
        {/* Main content */}
        <div className="min-w-0 flex-1 space-y-8">
          {!hasAnyContent ? (
            <EmptyState
              title="No notifications found."
              description="There are no notifications matching your current filters. Try adjusting your filter to see more."
            />
          ) : (
            <>
              {/* Notification List */}
              {showNotificationList && filteredNotifications.length > 0 && (
                <section>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {activeFilter === "all"
                        ? "All Notifications"
                        : activeFilter === "unread"
                          ? "Unread Notifications"
                          : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}`}
                    </h2>
                    {unreadCount > 0 && activeFilter === "unread" && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleMarkAllRead}
                        className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-primary)] hover:underline"
                      >
                        <CheckCheck className="h-3.5 w-3.5" />
                        Mark All Read
                      </motion.button>
                    )}
                  </div>
                  <NotificationList
                    items={filteredNotifications}
                    onMarkRead={handleMarkRead}
                    onDismiss={handleDismiss}
                  />
                </section>
              )}

              {/* Announcements */}
              {showAnnouncements && allAnnouncements.length > 0 && (
                <section>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                      <Bell className="h-3.5 w-3.5" />
                    </div>
                    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Announcements
                    </h2>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                      {allAnnouncements.length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {allAnnouncements.map((announcement) => (
                      <AnnouncementCard
                        key={announcement.id}
                        announcement={announcement}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Reminders */}
              {showReminders && reminders.length > 0 && (
                <section>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                      <Bell className="h-3.5 w-3.5" />
                    </div>
                    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Reminders
                    </h2>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                      {reminders.length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {reminders.map((reminder) => (
                      <ReminderCard
                        key={reminder.id}
                        reminder={reminder}
                        onToggleComplete={handleToggleReminder}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Emergency Alerts */}
              {showEmergency && emergencyAlerts.length > 0 && (
                <section>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                      <BellOff className="h-3.5 w-3.5" />
                    </div>
                    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Emergency Alerts
                    </h2>
                    <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
                      {emergencyAlerts.length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {emergencyAlerts.map((alert) => (
                      <EmergencyAlertCard
                        key={alert.id}
                        alert={alert}
                        onAcknowledge={handleAcknowledge}
                      />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>

        {/* ── Right Sidebar ─────────────────────── */}
        <AnimatePresence>
          {sidebarOpen && (
            <div className="hidden w-72 shrink-0 xl:block">
              <div className="lg:sticky lg:top-6">
                <NotificationSidebar />
              </div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Mobile sidebar drawer ──────────────── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={false}
            animate={false}
            className="mt-6 xl:hidden"
          >
            <NotificationSidebar isMobile />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
