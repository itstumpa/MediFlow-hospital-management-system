"use client";

import { DashboardContainer } from "@/components/patient/DashboardContainer";
import { DashboardContent } from "@/components/patient/DashboardContent";
import { Header } from "@/components/patient/Header";
import { MobileSidebar } from "@/components/patient/MobileSidebar";
import { pageTransition } from "@/components/patient/MotionVariants";
import { PatientProvider } from "@/components/patient/PatientProvider";
import { Sidebar } from "@/components/patient/Sidebar";
import { motion } from "framer-motion";

export function PatientPortalShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PatientProvider>
      <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex">
          <Sidebar />
        </div>

        {/* Mobile sidebar drawer */}
        <MobileSidebar />

        {/* Main content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <DashboardContent>
            <DashboardContainer>
              <motion.div
                variants={pageTransition}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {children}
              </motion.div>
            </DashboardContainer>
          </DashboardContent>
        </div>
      </div>
    </PatientProvider>
  );
}
