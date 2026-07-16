/* ══════════════════════════════════════════════
   Module 10 — Settings Types & Mock Data
   ══════════════════════════════════════════════ */

import { Bell, Cpu, Palette, Plug, Settings, Shield } from "lucide-react";

// ─── Settings Tabs ───

export type SettingsTab =
  | "general"
  | "notifications"
  | "appearance"
  | "privacy"
  | "integrations"
  | "advanced";

export interface SettingsTabDef {
  id: SettingsTab;
  label: string;
  icon: React.ElementType;
  description: string;
}

export const settingsTabs: SettingsTabDef[] = [
  {
    id: "general",
    label: "General",
    icon: Settings,
    description: "Basic application settings and preferences",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    description: "Configure how and when you receive notifications",
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
    description: "Customize the look and feel of the application",
  },
  {
    id: "privacy",
    label: "Privacy",
    icon: Shield,
    description: "Manage your privacy and data sharing preferences",
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Plug,
    description: "Connect third-party services and APIs",
  },
  {
    id: "advanced",
    label: "Advanced",
    icon: Cpu,
    description: "Advanced configuration and developer options",
  },
];

// ─── General Settings ───

export interface GeneralSettings {
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: "12h" | "24h";
  defaultDashboard: string;
  autoSave: boolean;
  compactMode: boolean;
}

export const defaultGeneralSettings: GeneralSettings = {
  language: "en-US",
  timezone: "America/New_York",
  dateFormat: "MM/DD/YYYY",
  timeFormat: "12h",
  defaultDashboard: "overview",
  autoSave: true,
  compactMode: false,
};

export const languageOptions = [
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (UK)" },
  { value: "es-ES", label: "Spanish" },
  { value: "fr-FR", label: "French" },
  { value: "de-DE", label: "German" },
  { value: "zh-CN", label: "Chinese (Simplified)" },
];

export const timezoneOptions = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "UTC", label: "UTC" },
];

export const dateFormatOptions = [
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY (01/15/2024)" },
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY (15/01/2024)" },
  { value: "YYYY-MM-DD", label: "YYYY-MM-DD (2024-01-15)" },
  { value: "MMM DD, YYYY", label: "MMM DD, YYYY (Jan 15, 2024)" },
];

export const dashboardOptions = [
  { value: "overview", label: "Overview Dashboard" },
  { value: "appointments", label: "Appointments" },
  { value: "patients", label: "Patients" },
  { value: "queue", label: "Queue Management" },
];

// ─── Notification Settings ───

export interface NotificationSettings {
  email: {
    enabled: boolean;
    appointments: boolean;
    reminders: boolean;
    billing: boolean;
    system: boolean;
    marketing: boolean;
  };
  sms: {
    enabled: boolean;
    appointments: boolean;
    reminders: boolean;
    urgent: boolean;
  };
  push: {
    enabled: boolean;
    appointments: boolean;
    reminders: boolean;
    chat: boolean;
    system: boolean;
  };
  inApp: {
    enabled: boolean;
    sound: boolean;
    desktop: boolean;
  };
}

export const defaultNotificationSettings: NotificationSettings = {
  email: {
    enabled: true,
    appointments: true,
    reminders: true,
    billing: true,
    system: true,
    marketing: false,
  },
  sms: {
    enabled: true,
    appointments: true,
    reminders: true,
    urgent: true,
  },
  push: {
    enabled: true,
    appointments: true,
    reminders: true,
    chat: true,
    system: true,
  },
  inApp: {
    enabled: true,
    sound: true,
    desktop: true,
  },
};

// ─── Appearance Settings ───

export interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  primaryColor: string;
  fontSize: "small" | "medium" | "large";
  reducedMotion: boolean;
  highContrast: boolean;
  sidebarCollapsed: boolean;
  animationsEnabled: boolean;
}

export const defaultAppearanceSettings: AppearanceSettings = {
  theme: "system",
  primaryColor: "emerald",
  fontSize: "medium",
  reducedMotion: false,
  highContrast: false,
  sidebarCollapsed: false,
  animationsEnabled: true,
};

export const themeOptions = [
  { value: "light", label: "Light", icon: "Sun" },
  { value: "dark", label: "Dark", icon: "Moon" },
  { value: "system", label: "System", icon: "Monitor" },
];

export const colorOptions = [
  { value: "emerald", label: "Emerald", hex: "#10b981" },
  { value: "blue", label: "Blue", hex: "#3b82f6" },
  { value: "purple", label: "Purple", hex: "#8b5cf6" },
  { value: "rose", label: "Rose", hex: "#f43f5e" },
  { value: "amber", label: "Amber", hex: "#f59e0b" },
  { value: "teal", label: "Teal", hex: "#14b8a6" },
];

export const fontSizeOptions = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

// ─── Privacy Settings ───

export interface PrivacySettings {
  profileVisibility: "all" | "staff" | "none";
  directoryVisibility: "all" | "staff" | "none";
  emailVisibility: "all" | "staff" | "none";
  phoneVisibility: "all" | "staff" | "none";
  analyticsSharing: boolean;
  crashReporting: boolean;
  usageStatistics: boolean;
}

export const defaultPrivacySettings: PrivacySettings = {
  profileVisibility: "staff",
  directoryVisibility: "staff",
  emailVisibility: "staff",
  phoneVisibility: "none",
  analyticsSharing: true,
  crashReporting: true,
  usageStatistics: false,
};

export const visibilityOptions = [
  { value: "all", label: "Everyone" },
  { value: "staff", label: "Staff Only" },
  { value: "none", label: "Nobody" },
];

// ─── Integrations ───

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "ehr" | "communication" | "billing" | "analytics" | "other";
  connected: boolean;
  configUrl?: string;
  docsUrl?: string;
}

export const availableIntegrations: Integration[] = [
  {
    id: "epic",
    name: "Epic EHR",
    description: "Connect with Epic electronic health records",
    icon: "Database",
    category: "ehr",
    connected: false,
    configUrl: "/settings/integrations/epic",
    docsUrl: "https://docs.example.com/epic",
  },
  {
    id: "cerner",
    name: "Cerner",
    description: "Integrate with Cerner Millennium",
    icon: "Database",
    category: "ehr",
    connected: false,
    configUrl: "/settings/integrations/cerner",
    docsUrl: "https://docs.example.com/cerner",
  },
  {
    id: "twilio",
    name: "Twilio SMS",
    description: "Send SMS notifications via Twilio",
    icon: "MessageSquare",
    category: "communication",
    connected: true,
    configUrl: "/settings/integrations/twilio",
    docsUrl: "https://docs.example.com/twilio",
  },
  {
    id: "sendgrid",
    name: "SendGrid Email",
    description: "Transactional email delivery",
    icon: "Mail",
    category: "communication",
    connected: false,
    configUrl: "/settings/integrations/sendgrid",
    docsUrl: "https://docs.example.com/sendgrid",
  },
  {
    id: "stripe",
    name: "Stripe Payments",
    description: "Process credit card payments",
    icon: "CreditCard",
    category: "billing",
    connected: false,
    configUrl: "/settings/integrations/stripe",
    docsUrl: "https://docs.example.com/stripe",
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    description: "Sync invoices and payments",
    icon: "FileText",
    category: "billing",
    connected: false,
    configUrl: "/settings/integrations/quickbooks",
    docsUrl: "https://docs.example.com/quickbooks",
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    description: "Track usage and engagement",
    icon: "BarChart",
    category: "analytics",
    connected: false,
    configUrl: "/settings/integrations/google-analytics",
    docsUrl: "https://docs.example.com/ga",
  },
  {
    id: "mixpanel",
    name: "Mixpanel",
    description: "Advanced product analytics",
    icon: "BarChart",
    category: "analytics",
    connected: false,
    configUrl: "/settings/integrations/mixpanel",
    docsUrl: "https://docs.example.com/mixpanel",
  },
];

// ─── Advanced Settings ───

export interface AdvancedSettings {
  apiAccess: boolean;
  webhooksEnabled: boolean;
  debugMode: boolean;
  cacheEnabled: boolean;
  logLevel: "error" | "warn" | "info" | "debug";
  sessionTimeout: number;
  maxFileUploadSize: number;
  allowedFileTypes: string[];
}

export const defaultAdvancedSettings: AdvancedSettings = {
  apiAccess: false,
  webhooksEnabled: false,
  debugMode: false,
  cacheEnabled: true,
  logLevel: "warn",
  sessionTimeout: 480,
  maxFileUploadSize: 10,
  allowedFileTypes: ["pdf", "jpg", "jpeg", "png", "doc", "docx"],
};

export const logLevelOptions = [
  { value: "error", label: "Error Only" },
  { value: "warn", label: "Warnings & Errors" },
  { value: "info", label: "Info, Warnings & Errors" },
  { value: "debug", label: "Debug (Verbose)" },
];
