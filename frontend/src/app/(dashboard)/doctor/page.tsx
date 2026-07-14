"use client";

import { AvailabilityCard } from "@/components/dashboard/doctor/AvailabilityCard";
import { CalendarPreview } from "@/components/dashboard/doctor/CalendarPreview";
import { DashboardHero } from "@/components/dashboard/doctor/DashboardHero";
import { NotificationsCard } from "@/components/dashboard/doctor/NotificationsCard";
import { PatientOverview } from "@/components/dashboard/doctor/PatientOverview";
import { PendingTasks } from "@/components/dashboard/doctor/PendingTasks";
import { PerformanceCharts } from "@/components/dashboard/doctor/PerformanceCharts";
import { QuickActionCards } from "@/components/dashboard/doctor/QuickActionCards";
import { RecentActivities } from "@/components/dashboard/doctor/RecentActivities";
import { StatisticsCards } from "@/components/dashboard/doctor/StatisticsCards";
import { TodaySchedule } from "@/components/dashboard/doctor/TodaySchedule";
import { UpcomingAppointments } from "@/components/dashboard/doctor/UpcomingAppointments";

export default function DoctorDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Hero */}
      <DashboardHero />

      {/* KPI Statistics Cards */}
      <StatisticsCards />

      {/* Quick Action Cards */}
      <QuickActionCards />

      {/* Main grid: Left (2/3) + Right (1/3) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Today's Schedule */}
          <TodaySchedule />

          {/* Patient Overview Table */}
          <PatientOverview />

          {/* Performance Charts */}
          <PerformanceCharts />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Upcoming Appointments */}
          <UpcomingAppointments />

          {/* Pending Tasks */}
          <PendingTasks />

          {/* Recent Activities */}
          <RecentActivities />

          {/* Notifications */}
          <NotificationsCard />

          {/* Calendar Preview */}
          <CalendarPreview />

          {/* Availability Status */}
          <AvailabilityCard />
        </div>
      </div>
    </div>
  );
}
