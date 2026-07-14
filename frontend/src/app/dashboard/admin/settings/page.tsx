"use client";

import { APISettings } from "@/app/components/dashboard/settings/APISettings";
import { AppearanceSettings } from "@/app/components/dashboard/settings/AppearanceSettings";
import { AppointmentSettings } from "@/app/components/dashboard/settings/AppointmentSettings";
import { BackupSettings } from "@/app/components/dashboard/settings/BackupSettings";
import { BillingSettings } from "@/app/components/dashboard/settings/BillingSettings";
import { DangerZone } from "@/app/components/dashboard/settings/DangerZone";
import { GeneralSettings } from "@/app/components/dashboard/settings/GeneralSettings";
import { IntegrationsSettings } from "@/app/components/dashboard/settings/IntegrationSettings";
import { NotificationsSettings } from "@/app/components/dashboard/settings/NotificationsSettings";
import { SecuritySettings } from "@/app/components/dashboard/settings/SecuritySettings";
import { SettingsSidebar } from "@/app/components/dashboard/settings/SettingsSidebar";
import {
  MOCK_ALL_SETTINGS,
  SETTINGS_NAV,
  SettingsSection,
} from "@/app/components/dashboard/settings/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  Calendar,
  CreditCard,
  Database,
  Globe,
  Palette,
  Plug,
  Settings,
  Shield,
  Terminal,
} from "lucide-react";
import { useState } from "react";
import { DashboardShell } from "../dashboard-shell";

const SECTIONS: {
  id: SettingsSection;
  label: string;
  component: React.ComponentType<any>;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: "general",
    label: "General",
    component: GeneralSettings,
    icon: Settings,
  },
  {
    id: "appearance",
    label: "Appearance",
    component: AppearanceSettings,
    icon: Palette,
  },
  {
    id: "localization",
    label: "Localization",
    component: NotificationsSettings,
    icon: Globe,
  },
  {
    id: "notifications",
    label: "Notifications",
    component: NotificationsSettings,
    icon: Bell,
  },
  {
    id: "appointments",
    label: "Appointments",
    component: AppointmentSettings,
    icon: Calendar,
  },
  {
    id: "security",
    label: "Security",
    component: SecuritySettings,
    icon: Shield,
  },
  {
    id: "integrations",
    label: "Integrations",
    component: IntegrationsSettings,
    icon: Plug,
  },
  { id: "backup", label: "Backup", component: BackupSettings, icon: Database },
  { id: "api", label: "API", component: APISettings, icon: Terminal },
  {
    id: "billing",
    label: "Billing",
    component: BillingSettings,
    icon: CreditCard,
  },
  {
    id: "danger",
    label: "Danger Zone",
    component: DangerZone,
    icon: AlertTriangle,
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("general");
  const [settings, setSettings] = useState(MOCK_ALL_SETTINGS);

  const handleSettingsChange = (section: SettingsSection, data: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const handleSectionSelect = (section: string) => {
    setActiveSection(section as SettingsSection);
  };

  const ActiveComponent =
    SECTIONS.find((s) => s.id === activeSection)?.component || GeneralSettings;

  return (
    <DashboardShell>
      <div className="flex h-full">
        <SettingsSidebar
          items={SETTINGS_NAV}
          activeSection={activeSection}
          onSelect={handleSectionSelect}
        />

        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            <AnimatePresence mode="wait">
              <ActiveComponent
                key={activeSection}
                initialData={settings[activeSection] as any}
                onChange={(data) => handleSettingsChange(activeSection, data)}
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </DashboardShell>
  );
}
