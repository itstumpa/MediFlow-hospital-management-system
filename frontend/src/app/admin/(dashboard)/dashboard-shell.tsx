"use client";

import { Sidebar } from "@/app/components/dashboard/Sidebar";
import { MobileSidebar } from "@/app/components/dashboard/MobileSidebar";
import { Header } from "@/app/components/dashboard/Header";
import { DashboardContent } from "@/app/components/dashboard/DashboardContent";
import { DashboardContainer } from "@/app/components/dashboard/DashboardContainer";

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
          <DashboardContainer>{children}</DashboardContainer>
        </DashboardContent>
      </div>
    </div>
  );
}
