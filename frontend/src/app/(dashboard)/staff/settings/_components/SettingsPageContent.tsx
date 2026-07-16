"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { PageHeader } from "@/components/dashboard/staff/PageHeader";
import { motion } from "framer-motion";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { useState } from "react";
import { type SettingsTab } from "../_mock-data";
import { AdvancedTab } from "./AdvancedTab";
import { AppearanceTab } from "./AppearanceTab";
import { GeneralTab } from "./GeneralTab";
import { IntegrationsTab } from "./IntegrationsTab";
import { NotificationsTab } from "./NotificationsTab";
import { PrivacyTab } from "./PrivacyTab";
import { SettingsSidebar } from "./SettingsSidebar";
import { SettingsTabs } from "./SettingsTabs";

export function SettingsPageContent() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderTab = () => {
    switch (activeTab) {
      case "general":
        return <GeneralTab />;
      case "notifications":
        return <NotificationsTab />;
      case "appearance":
        return <AppearanceTab />;
      case "privacy":
        return <PrivacyTab />;
      case "integrations":
        return <IntegrationsTab />;
      case "advanced":
        return <AdvancedTab />;
      default:
        return <GeneralTab />;
    }
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Page Header */}
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Settings"
          subtitle="Configure your account and application preferences"
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/50"
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? (
              <PanelRightClose className="h-4 w-4" />
            ) : (
              <PanelRightOpen className="h-4 w-4" />
            )}
          </button>
        </PageHeader>
      </motion.div>

      {/* Main Content + Sidebar */}
      <div className="flex flex-col gap-5 lg:flex-row">
        {/* Left: Main Content */}
        <div className="min-w-0 flex-1 space-y-5">
          <motion.div variants={staggerItem}>
            <SettingsTabs activeTab={activeTab} onChange={setActiveTab} />
          </motion.div>
          <motion.div variants={staggerItem}>{renderTab()}</motion.div>
        </div>

        {/* Right Sidebar */}
        <motion.div
          variants={staggerItem}
          className="w-full shrink-0 lg:w-72 xl:w-80"
          style={{ display: sidebarOpen ? "block" : "none" }}
        >
          <div className="lg:sticky lg:top-24">
            <SettingsSidebar />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
