"use client";

import {
  DashboardContainer,
  DashboardContent,
  Header,
  MobileSidebar,
  Sidebar,
} from "@/components/dashboard/doctor";
import { CommandPalette } from "@/components/dashboard/doctor/CommandPalette";
import { pageTransition } from "@/components/dashboard/doctor/MotionVariants";
import { motion } from "framer-motion";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
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

      {/* Global Command Palette */}
      <CommandPalette />
    </div>
  );
}
