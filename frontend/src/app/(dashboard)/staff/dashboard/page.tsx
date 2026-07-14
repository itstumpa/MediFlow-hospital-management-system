"use client";

import { staggerContainer } from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { AnnouncementsCard } from "./_components/AnnouncementsCard";
import { AppointmentsTable } from "./_components/AppointmentsTable";
import { DashboardHero } from "./_components/DashboardHero";
import { DashboardSidebar } from "./_components/DashboardSidebar";
import { DoctorAvailability } from "./_components/DoctorAvailability";
import { PaymentsCard } from "./_components/PaymentsCard";
import { QuickActionsSection } from "./_components/QuickActionsSection";
import { RecentPatients } from "./_components/RecentPatients";
import { StatisticsCards } from "./_components/StatisticsCards";
import { WaitingQueue } from "./_components/WaitingQueue";

export default function StaffDashboardPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <DashboardHero />
      <StatisticsCards />
      <QuickActionsSection />

      <div className="grid gap-6 xl:grid-cols-4">
        <div className="space-y-6 xl:col-span-3">
          <AppointmentsTable />
          <WaitingQueue />
          <DoctorAvailability />
        </div>
        <div className="space-y-6">
          <DashboardSidebar />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentPatients />
        <PaymentsCard />
      </div>

      <AnnouncementsCard />
    </motion.div>
  );
}
