"use client";

import { AnimatePresence, motion } from "framer-motion";
import { EmptyState } from "./EmptyState";
import { CardsSkeleton } from "./LoadingSkeleton";
import { NotificationCard } from "./NotificationCard";
import type { Notification, NotificationGroup } from "./types";

interface NotificationListProps {
  groups: NotificationGroup[];
  loading?: boolean;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
  onOpenDrawer: (notification: Notification) => void;
  onActionClick: (notification: Notification) => void;
}

function GroupHeader({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-2 flex items-center gap-2 px-1"
    >
      <div className="h-0.5 flex-1 bg-slate-200 dark:bg-slate-700" />
      <span className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">
        {label}
      </span>
      <div className="h-0.5 flex-1 bg-slate-200 dark:bg-slate-700" />
    </motion.div>
  );
}

export function NotificationList({
  groups,
  loading,
  onMarkRead,
  onDelete,
  onOpenDrawer,
  onActionClick,
}: NotificationListProps) {
  if (loading) {
    return <CardsSkeleton count={6} />;
  }

  const totalNotifications = groups.reduce(
    (sum, g) => sum + g.notifications.length,
    0,
  );

  if (totalNotifications === 0) {
    return <EmptyState />;
  }

  return (
    <AnimatePresence mode="popLayout">
      <div className="space-y-6" role="list" aria-label="Notifications">
        {groups.map((group, groupIndex) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: groupIndex * 0.05 }}
            className="space-y-3"
          >
            <GroupHeader label={group.label} />
            <div className="space-y-2" role="list">
              {group.notifications.map((notification, index) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  index={index}
                  onClick={() => onOpenDrawer(notification)}
                  onMarkRead={onMarkRead}
                  onDelete={onDelete}
                  onActionClick={onActionClick}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}
