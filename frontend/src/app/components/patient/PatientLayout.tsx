"use client";

import { DashboardContainer } from "@/components/patient/DashboardContainer";
import { DashboardContent } from "@/components/patient/DashboardContent";
import { Header } from "@/components/patient/Header";
import { MobileSidebar } from "@/components/patient/MobileSidebar";
import { pageTransition } from "@/components/patient/MotionVariants";
import { PatientProvider } from "@/components/patient/PatientProvider";
import { Sidebar } from "@/components/patient/Sidebar";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PatientLayoutProps {
  children: ReactNode;
}

export function PatientLayout({ children }: PatientLayoutProps) {
  return (
    <PatientProvider>
      <div className="flex min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(14,124,123,0.08),_transparent_32%),linear-gradient(135deg,_#f8fbfb_0%,_#f2f7f7_100%)] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <div className="hidden lg:flex">
          <Sidebar />
        </div>

        <MobileSidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <DashboardContent>
            <DashboardContainer>
              <motion.div
                variants={pageTransition}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
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
