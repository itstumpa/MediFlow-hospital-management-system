"use client";

import {
  CommandPalette,
  CommandPaletteProvider,
} from "@/app/components/dashboard/command-palette";
import { DashboardContainer } from "@/app/components/dashboard/DashboardContainer";
import { DashboardContent } from "@/app/components/dashboard/DashboardContent";
import { Header } from "@/app/components/dashboard/Header";
import { MobileSidebar } from "@/app/components/dashboard/MobileSidebar";
import { pageTransition } from "@/app/components/dashboard/MotionVariants";
import { Sidebar } from "@/app/components/dashboard/Sidebar";
import { motion } from "framer-motion";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <CommandPaletteProvider>
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

      {/* Global Command Palette */}
      <CommandPalette />
    </CommandPaletteProvider>
  );
}
