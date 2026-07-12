"use client";

import { ActivityTimeline } from "@/app/components/dashboard/ActivityTimeline";
import { AppointmentChart } from "@/app/components/dashboard/AppointmentChart";
import { AppointmentTable } from "@/app/components/dashboard/AppointmentTable";
import { LatestMessages } from "@/app/components/dashboard/LatestMessages";
import { staggerContainer } from "@/app/components/dashboard/MotionVariants";
import { PageHeader } from "@/app/components/dashboard/PageHeader";
import { QuickActions } from "@/app/components/dashboard/QuickActions";
import { RecentPatients } from "@/app/components/dashboard/RecentPatients";
import { RevenueChart } from "@/app/components/dashboard/RevenueChart";
import { StatsGrid } from "@/app/components/dashboard/StatsGrid";
import { SystemStatus } from "@/app/components/dashboard/SystemStatus";
import { TopDoctors } from "@/app/components/dashboard/TopDoctors";
import { motion } from "framer-motion";
import { CalendarCheck, Download, Plus } from "lucide-react";

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
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700">
              <Download className="h-4 w-4" />
              Export Report
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700">
              <CalendarCheck className="h-4 w-4" />
              Create Appointment
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-md">
              <Plus className="h-4 w-4" />
              Add Doctor
            </button>
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
