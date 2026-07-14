"use client";

import { pageTransition } from "@/components/patient/MotionVariants";
import {
  DashboardHero,
  HealthSummary,
  HealthTips,
  NotificationsPreview,
  QuickActions,
  QuickStats,
  RecentActivity,
  RecentPrescriptions,
  RecentReports,
  UpcomingAppointment,
} from "@/components/patient/dashboard";
import { motion } from "framer-motion";

export default function PatientDashboardPage() {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Hero */}
      <DashboardHero />

      {/* Quick Stats */}
      <QuickStats />

      {/* Next Appointment + Health Summary — side by side on lg */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UpcomingAppointment />
        </div>
        <div className="lg:col-span-1">
          <HealthSummary />
        </div>
      </div>

      {/* Recent Activity + Quick Actions — side by side on lg */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentActivity />
        <QuickActions />
      </div>

      {/* Health Tips */}
      <HealthTips />

      {/* Recent Prescriptions + Recent Reports — side by side on lg */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentPrescriptions />
        <RecentReports />
      </div>

      {/* Notifications Preview */}
      <NotificationsPreview />
    </motion.div>
  );
}
