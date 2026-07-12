"use client";

import { NotificationList } from "@/app/components/dashboard/notifications/NotificationList";
import { PageHeader } from "@/app/components/dashboard/PageHeader";
import { staggerContainer } from "@/lib/animations/stagger";
import { motion } from "framer-motion";

export default function NotificationsPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <PageHeader
        title="Notifications"
        subtitle="Stay updated with important clinic activities, reminders, and system alerts."
      />
      <NotificationList />
    </motion.div>
  );
}
