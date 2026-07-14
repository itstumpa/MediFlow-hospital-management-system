"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Accessibility,
  Bell,
  Globe,
  History,
  Palette,
  SlidersHorizontal,
  Smartphone,
  UserRound,
} from "lucide-react";
import { SettingsSection } from "./types";

const sidebarItems: {
  id: SettingsSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  group: "general" | "preferences" | "account";
}[] = [
  { id: "profile", label: "Profile", icon: UserRound, group: "general" },
  {
    id: "preferences",
    label: "Preferences",
    icon: SlidersHorizontal,
    group: "general",
  },
  { id: "notifications", label: "Notifications", icon: Bell, group: "general" },
  { id: "language", label: "Language", icon: Globe, group: "preferences" },
  {
    id: "accessibility",
    label: "Accessibility",
    icon: Accessibility,
    group: "preferences",
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
    group: "preferences",
  },
  { id: "sessions", label: "Sessions", icon: History, group: "account" },
  {
    id: "devices",
    label: "Connected Devices",
    icon: Smartphone,
    group: "account",
  },
];

const groupLabels: Record<string, string> = {
  general: "General",
  preferences: "Preferences",
  account: "Account",
};

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
  hasUnsavedChanges: boolean;
}

const sidebarVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export default function SettingsSidebar({
  activeSection,
  onSectionChange,
  hasUnsavedChanges,
}: SettingsSidebarProps) {
  const groups = ["general", "preferences", "account"] as const;

  return (
    <motion.nav
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="w-full lg:w-64 shrink-0"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-[#1a2e2e] dark:text-white px-3">
            Settings
          </h2>
          <p className="text-sm text-[#5c7373] dark:text-[#8a9a9a] px-3 mt-0.5">
            Manage your account
          </p>
        </div>

        {groups.map((group) => (
          <div key={group}>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8a9a9a] dark:text-[#6b8181] px-3 mb-2">
              {groupLabels[group]}
            </p>
            <div className="space-y-1">
              {sidebarItems
                .filter((item) => item.group === group)
                .map((item, index) => {
                  const isActive = activeSection === item.id;
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      custom={index}
                      variants={itemVariants}
                      onClick={() => onSectionChange(item.id)}
                      className={cn(
                        "relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                        isActive
                          ? "bg-[#0e7c7b]/10 text-[#0e7c7b] dark:bg-[#2dd4bf]/10 dark:text-[#2dd4bf]"
                          : "text-[#5c7373] dark:text-[#8a9a9a] hover:bg-[#f0f5f5] dark:hover:bg-[#1a2a2a] hover:text-[#1a2e2e] dark:hover:text-white",
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="settings-sidebar-indicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#0e7c7b] dark:bg-[#2dd4bf] rounded-full"
                          transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 350,
                          }}
                        />
                      )}
                      <div
                        className={cn(
                          "p-1.5 rounded-lg transition-colors",
                          isActive
                            ? "bg-[#0e7c7b]/10 dark:bg-[#2dd4bf]/10"
                            : "group-hover:bg-[#e1e8e8] dark:group-hover:bg-[#2a3a3a]",
                        )}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <span>{item.label}</span>
                      {hasUnsavedChanges && isActive && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-amber-500" />
                      )}
                    </motion.button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </motion.nav>
  );
}
