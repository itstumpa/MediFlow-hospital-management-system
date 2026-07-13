"use client";

import { Button } from "@/app/components/dashboard/Button";
import { staggerContainer } from "@/app/components/dashboard/MotionVariants";
import { PageHeader } from "@/app/components/dashboard/PageHeader";
import { motion } from "framer-motion";
import { CalendarCheck, Download, Plus } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic imports for heavier components with skeleton fallbacks
const ActivityTimeline = dynamic(
  () =>
    import("@/app/components/dashboard/ActivityTimeline").then(
      (m) => m.ActivityTimeline,
    ),
  {
    loading: () => <div className="dash-card h-[300px] animate-pulse" />,
    ssr: false,
  },
);
const AppointmentChart = dynamic(
  () =>
    import("@/app/components/dashboard/AppointmentChart").then(
      (m) => m.AppointmentChart,
    ),
  {
    loading: () => <div className="dash-card h-[350px] animate-pulse" />,
    ssr: false,
  },
);
const AppointmentTable = dynamic(
  () =>
    import("@/app/components/dashboard/AppointmentTable").then(
      (m) => m.AppointmentTable,
    ),
  {
    loading: () => <div className="dash-card h-[300px] animate-pulse" />,
    ssr: false,
  },
);
const LatestMessages = dynamic(
  () =>
    import("@/app/components/dashboard/LatestMessages").then(
      (m) => m.LatestMessages,
    ),
  {
    loading: () => <div className="dash-card h-[300px] animate-pulse" />,
    ssr: false,
  },
);
const QuickActions = dynamic(
  () =>
    import("@/app/components/dashboard/QuickActions").then(
      (m) => m.QuickActions,
    ),
  {
    loading: () => <div className="dash-card h-[300px] animate-pulse" />,
    ssr: false,
  },
);
const RecentPatients = dynamic(
  () =>
    import("@/app/components/dashboard/RecentPatients").then(
      (m) => m.RecentPatients,
    ),
  {
    loading: () => <div className="dash-card h-[300px] animate-pulse" />,
    ssr: false,
  },
);
const RevenueChart = dynamic(
  () =>
    import("@/app/components/dashboard/RevenueChart").then(
      (m) => m.RevenueChart,
    ),
  {
    loading: () => <div className="dash-card h-[350px] animate-pulse" />,
    ssr: false,
  },
);
const StatsGrid = dynamic(
  () => import("@/app/components/dashboard/StatsGrid").then((m) => m.StatsGrid),
  {
    loading: () => (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="dash-card h-[120px] animate-pulse" />
        ))}
        {}
      </div>
    ),
    ssr: false,
  },
);
const SystemStatus = dynamic(
  () =>
    import("@/app/components/dashboard/SystemStatus").then(
      (m) => m.SystemStatus,
    ),
  {
    loading: () => <div className="dash-card h-[200px] animate-pulse" />,
    ssr: false,
  },
);
const TopDoctors = dynamic(
  () =>
    import("@/app/components/dashboard/TopDoctors").then((m) => m.TopDoctors),
  {
    loading: () => <div className="dash-card h-[300px] animate-pulse" />,
    ssr: false,
  },
);

export default function DashboardPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* ─── Page Header ─── */}
      <PageHeader
        title="Dashboard Overview"
        subtitle="Welcome back, Admin. Here's what's happening today."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" icon={Download} size="sm">
              Export Report
            </Button>
            <Button variant="outline" icon={CalendarCheck} size="sm">
              Create Appointment
            </Button>
            <Button variant="primary" icon={Plus} size="sm">
              Add Doctor
            </Button>
          </div>
        }
      />

      {/* ─── Section 1: Statistics Cards ─── */}
      <StatsGrid />

      {/* ─── Section 2: Charts ─── */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <AppointmentChart />
      </div>

      {/* ─── Section 3: Today's Appointments ─── */}
      <AppointmentTable />

      {/* ─── Section 4: Recent Patients ─── */}
      <RecentPatients />

      {/* ─── Sections 5+6: Quick Actions + Activity Timeline ─── */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityTimeline />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* ─── Section 7+8: Latest Messages + Top Doctors ─── */}
      <div className="grid gap-6 lg:grid-cols-2">
        <LatestMessages />
        <TopDoctors />
      </div>

      {/* ─── Section 9: System Status ─── */}
      <SystemStatus />
    </motion.div>
  );
}
