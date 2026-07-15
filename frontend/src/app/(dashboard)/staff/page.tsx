"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { AnnouncementsCard } from "./dashboard/_components/AnnouncementsCard";
import { AppointmentsTable } from "./dashboard/_components/AppointmentsTable";
import { DashboardHero } from "./dashboard/_components/DashboardHero";
import { DashboardSidebar } from "./dashboard/_components/DashboardSidebar";
import { DoctorAvailability } from "./dashboard/_components/DoctorAvailability";
import { PaymentsCard } from "./dashboard/_components/PaymentsCard";
import { QuickActionsSection } from "./dashboard/_components/QuickActionsSection";
import { RecentPatients } from "./dashboard/_components/RecentPatients";
import { StatisticsCards } from "./dashboard/_components/StatisticsCards";
import { WaitingQueue } from "./dashboard/_components/WaitingQueue";

export default function StaffDashboardPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={staggerItem}>
        <DashboardHero />
      </motion.div>
      <motion.div variants={staggerItem}>
        <StatisticsCards />
      </motion.div>
      <motion.div variants={staggerItem}>
        <QuickActionsSection />
      </motion.div>

      <motion.div variants={staggerItem} className="grid gap-6 xl:grid-cols-4">
        <div className="space-y-6 xl:col-span-3">
          <AppointmentsTable />
          <WaitingQueue />
          <DoctorAvailability />
        </div>
        <div className="space-y-6">
          <DashboardSidebar />
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="grid gap-6 lg:grid-cols-2">
        <RecentPatients />
        <PaymentsCard />
      </motion.div>

      <motion.div variants={staggerItem}>
        <AnnouncementsCard />
      </motion.div>
    </motion.div>
  );
}
