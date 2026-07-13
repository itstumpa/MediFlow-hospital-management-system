import {
  AlertTriangle,
  Database,
  Key,
  Settings,
  Trash2,
  UserX,
} from "lucide-react";

export type SettingsSection =
  | "general"
  | "appearance"
  | "localization"
  | "notifications"
  | "appointments"
  | "security"
  | "integrations"
  | "backup"
  | "api"
  | "billing"
  | "danger";

export interface SettingsNavItem {
  id: SettingsSection;
  label: string;
  icon: string;
  description: string;
}

export const SETTINGS_NAV: SettingsNavItem[] = [
  {
    id: "general",
    label: "General",
    icon: "Settings",
    description: "Clinic information, contact details, business hours",
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: "Palette",
    description: "Theme, colors, sidebar style, animations",
  },
  {
    id: "localization",
    label: "Localization",
    icon: "Globe",
    description: "Timezone, language, date/time formats, currency",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "Bell",
    description: "Email, SMS, push, and browser notifications",
  },
  {
    id: "appointments",
    label: "Appointments",
    icon: "CalendarCheck",
    description: "Working days, slot duration, booking rules",
  },
  {
    id: "security",
    label: "Security",
    icon: "Shield",
    description: "2FA, password policy, session timeout, login attempts",
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: "Plug",
    description:
      "Google Calendar, Zoom, Stripe, PayPal, Twilio, Maps, Cloudinary",
  },
  {
    id: "backup",
    label: "Backup",
    icon: "Database",
    description: "Automatic backup, frequency, restore, export",
  },
  {
    id: "api",
    label: "API",
    icon: "Key",
    description: "API keys, webhooks, rate limits",
  },
  {
    id: "billing",
    label: "Billing",
    icon: "CreditCard",
    description: "Subscription, payment methods, invoices (UI only)",
  },
  {
    id: "danger",
    label: "Danger Zone",
    icon: "TriangleAlert",
    description: "Delete demo data, reset settings, deactivate clinic",
  },
];

// General Settings Types
export interface ClinicInfo {
  name: string;
  logo: string;
  favicon: string;
  description: string;
  website: string;
  phone: string;
  email: string;
  address: string;
  businessHours: BusinessHours;
}

export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  enabled: boolean;
  open: string;
  close: string;
}

// Appearance Settings Types
export interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  primaryColor: string;
  accentColor: string;
  sidebarStyle: "default" | "compact" | "minimal";
  cardRadius: "none" | "sm" | "md" | "lg" | "xl" | "full";
  animationsEnabled: boolean;
  darkModeEnabled: boolean;
}

// Localization Settings Types
export interface LocalizationSettings {
  timezone: string;
  language: string;
  dateFormat: string;
  timeFormat: "12h" | "24h";
  currency: string;
  measurementUnits: "metric" | "imperial";
}

// Notifications Settings Types
export interface NotificationSettings {
  emailAlerts: boolean;
  smsAlerts: boolean;
  pushNotifications: boolean;
  browserNotifications: boolean;
  emailTypes: NotificationType[];
  smsTypes: NotificationType[];
}

export interface NotificationType {
  id: string;
  label: string;
  enabled: boolean;
}

// Appointments Settings Types
export interface AppointmentSettings {
  workingDays: number[];
  slotDuration: number;
  defaultConsultationTime: number;
  cancellationWindow: number;
  bookingRules: BookingRule[];
}

export interface BookingRule {
  id: string;
  label: string;
  enabled: boolean;
}

// Security Settings Types
export interface SecuritySettings {
  twoFactorEnabled: boolean;
  passwordPolicy: PasswordPolicy;
  sessionTimeout: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
  trustedDevices: TrustedDevice[];
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  maxAge: number;
  preventReuse: number;
}

export interface TrustedDevice {
  id: string;
  name: string;
  lastActive: string;
  ip: string;
  current: boolean;
}

// Integrations Settings Types
export interface IntegrationSettings {
  googleCalendar: IntegrationConfig;
  zoom: IntegrationConfig;
  stripe: IntegrationConfig;
  paypal: IntegrationConfig;
  twilio: IntegrationConfig;
  googleMaps: IntegrationConfig;
  cloudinary: IntegrationConfig;
}

export interface IntegrationConfig {
  enabled: boolean;
  connected: boolean;
  status?: "connected" | "disconnected" | "error";
  apiKey?: string;
  apiSecret?: string;
  publishableKey?: string;
  secretKey?: string;
  clientId?: string;
  secret?: string;
  accountSid?: string;
  authToken?: string;
  phoneNumber?: string;
  cloudName?: string;
  webhookUrl?: string;
  lastSync?: string;
}

// Backup Settings Types
export interface BackupSettings {
  autoBackup: boolean;
  frequency: "daily" | "weekly" | "monthly";
  retentionDays: number;
  lastBackup: string | null;
  nextBackup: string | null;
  backups: BackupRecord[];
  schedule: BackupSchedule;
  history: BackupHistoryItem[];
  storageUsed: number;
  storageLimit: number;
  storageProvider: "local" | "s3" | "gcs" | "azure";
  encryptBackups: boolean;
  verifyBackups: boolean;
  lastBackupStatus: "completed" | "failed" | "in_progress" | "never";
}

export interface BackupSchedule {
  enabled: boolean;
  frequency: "daily" | "weekly" | "monthly";
  time: string;
  timezone: string;
  retention: number;
  compression: "none" | "gzip" | "brotli";
  include: Record<string, boolean>;
  retentionDays: number;
  compressionEnabled: boolean;
}

export interface BackupHistoryItem {
  id: string;
  type: "auto" | "manual";
  status: "completed" | "failed" | "in_progress";
  size: string;
  startedAt: string;
  completedAt: string | null;
  duration?: string;
}

export interface BackupRecord {
  id: string;
  date: string;
  size: string;
  status: "completed" | "failed" | "in_progress";
}

// API Settings Types
export interface APISettings {
  keys: APIKey[];
  webhooks: Webhook[];
  rateLimits: RateLimitRule[];
  globalRateLimit: GlobalRateLimit;
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  prefix: string;
  scopes: string[];
  createdAt: string;
  lastUsed: string | null;
  status: "active" | "revoked" | "expired";
}

export interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  secret: string;
  active: boolean;
  createdAt: string;
}

export interface RateLimitRule {
  id: string;
  endpoint: string;
  method: string;
  requests: number;
  window: number;
  action: "throttle" | "block";
}

export interface GlobalRateLimit {
  enabled: boolean;
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
}

// Billing Settings Types (UI only)
export interface BillingSettings {
  subscription: Subscription;
  paymentMethods: PaymentMethod[];
  autoPayEnabled: boolean;
  paymentRetryAttempts: number;
  paymentRetryInterval: number;
  sendPaymentReceipts: boolean;
  invoices: Invoice[];
  contacts: BillingContact[];
}

export interface Subscription {
  plan: "free" | "professional" | "enterprise";
  status: "active" | "cancelled" | "past_due" | "trialing";
  interval: "month" | "year";
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: "month" | "year";
  features: string[];
  limits: {
    patients: number;
    appointments: number;
    storage: number;
    users: number;
  };
  popular: boolean;
}

export interface PaymentMethod {
  id: string;
  type: "card" | "bank";
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed" | "refunded";
  plan: string;
  pdfUrl: string;
}

export interface BillingContact {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "billing";
  notifications: boolean;
}

// Danger Zone Types
export interface DangerZoneActions {
  clearCache: DangerAction;
  resetSettings: DangerAction;
  deleteLogs: DangerAction;
  anonymizeData: DangerAction;
  revokeAllSessions: DangerAction;
  deleteAllData: DangerAction;
}

export interface DangerAction {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
  confirmText: string;
  destructive: boolean;
  requiresDoubleConfirm: boolean;
}

// Combined Settings State
export interface AllSettings {
  general: ClinicInfo;
  appearance: AppearanceSettings;
  localization: LocalizationSettings;
  notifications: NotificationSettings;
  appointments: AppointmentSettings;
  security: SecuritySettings;
  integrations: IntegrationSettings;
  backup: BackupSettings;
  api: APISettings;
  billing: BillingSettings;
  danger: DangerZoneActions;
}

// Mock Data
export const MOCK_CLINIC_INFO: ClinicInfo = {
  name: "MediFlow Medical Center",
  logo: "/logo.svg",
  favicon: "/favicon.ico",
  description:
    "A modern healthcare facility providing comprehensive medical services with compassionate care and cutting-edge technology.",
  website: "https://mediflow.example.com",
  phone: "+1 (555) 123-4567",
  email: "info@mediflow.example.com",
  address: "123 Healthcare Avenue, Medical District, New York, NY 10001",
  businessHours: {
    monday: { enabled: true, open: "08:00", close: "18:00" },
    tuesday: { enabled: true, open: "08:00", close: "18:00" },
    wednesday: { enabled: true, open: "08:00", close: "18:00" },
    thursday: { enabled: true, open: "08:00", close: "18:00" },
    friday: { enabled: true, open: "08:00", close: "17:00" },
    saturday: { enabled: true, open: "09:00", close: "14:00" },
    sunday: { enabled: false, open: "00:00", close: "00:00" },
  },
};

export const MOCK_APPEARANCE: AppearanceSettings = {
  theme: "system",
  primaryColor: "#2563eb",
  accentColor: "#0ea5e9",
  sidebarStyle: "default",
  cardRadius: "lg",
  animationsEnabled: true,
  darkModeEnabled: true,
};

export const MOCK_LOCALIZATION: LocalizationSettings = {
  timezone: "America/New_York",
  language: "en-US",
  dateFormat: "MM/DD/YYYY",
  timeFormat: "12h",
  currency: "USD",
  measurementUnits: "imperial",
};

export const MOCK_NOTIFICATIONS: NotificationSettings = {
  emailAlerts: true,
  smsAlerts: true,
  pushNotifications: true,
  browserNotifications: false,
  emailTypes: [
    {
      id: "appointment_confirmed",
      label: "Appointment Confirmed",
      enabled: true,
    },
    {
      id: "appointment_reminder",
      label: "Appointment Reminder (24h)",
      enabled: true,
    },
    {
      id: "appointment_cancelled",
      label: "Appointment Cancelled",
      enabled: true,
    },
    { id: "new_message", label: "New Contact Message", enabled: true },
    { id: "system_alerts", label: "System Alerts", enabled: true },
    { id: "weekly_report", label: "Weekly Analytics Report", enabled: false },
  ],
  smsTypes: [
    {
      id: "appointment_reminder",
      label: "Appointment Reminder (2h)",
      enabled: true,
    },
    {
      id: "appointment_confirmed",
      label: "Appointment Confirmed",
      enabled: false,
    },
    { id: "otp_verification", label: "OTP Verification", enabled: true },
  ],
};

export const MOCK_APPOINTMENTS: AppointmentSettings = {
  workingDays: [1, 2, 3, 4, 5],
  slotDuration: 15,
  defaultConsultationTime: 30,
  cancellationWindow: 24,
  bookingRules: [
    {
      id: "advance_booking",
      label: "Allow booking up to 90 days in advance",
      enabled: true,
    },
    { id: "same_day", label: "Allow same-day appointments", enabled: true },
    { id: "double_booking", label: "Prevent double booking", enabled: true },
    { id: "min_notice", label: "Require 2-hour minimum notice", enabled: true },
    {
      id: "patient_limit",
      label: "Limit to 3 appointments per patient per week",
      enabled: false,
    },
  ],
};

export const MOCK_SECURITY: SecuritySettings = {
  twoFactorEnabled: true,
  passwordPolicy: {
    minLength: 10,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    maxAge: 90,
    preventReuse: 5,
  },
  sessionTimeout: 30,
  maxLoginAttempts: 5,
  lockoutDuration: 15,
  trustedDevices: [
    {
      id: "1",
      name: "MacBook Pro - Chrome",
      lastActive: "2024-01-15T10:30:00Z",
      ip: "192.168.1.100",
      current: true,
    },
    {
      id: "2",
      name: "iPhone 15 - Safari",
      lastActive: "2024-01-14T18:45:00Z",
      ip: "192.168.1.101",
      current: false,
    },
    {
      id: "3",
      name: "iPad Air - Safari",
      lastActive: "2024-01-10T09:15:00Z",
      ip: "192.168.1.102",
      current: false,
    },
  ],
};

export const MOCK_INTEGRATIONS: IntegrationSettings = {
  googleCalendar: {
    enabled: true,
    connected: true,
    apiKey: "AIzaSyC...",
    secretKey: "GOCSPX...",
    webhookUrl: "https://api.mediflow.example.com/webhooks/google-calendar",
    status: "connected",
  },
  zoom: {
    enabled: true,
    connected: true,
    apiKey: "ZOOM_API_KEY...",
    secretKey: "ZOOM_SECRET...",
    webhookUrl: "https://api.mediflow.example.com/webhooks/zoom",
    status: "connected",
  },
  stripe: {
    enabled: true,
    connected: true,
    apiKey: "sk_live_...",
    secretKey: "whsec_...",
    webhookUrl: "https://api.mediflow.example.com/webhooks/stripe",
    status: "connected",
  },
  paypal: {
    enabled: false,
    connected: false,
    apiKey: "",
    secretKey: "",
    webhookUrl: "https://api.mediflow.example.com/webhooks/paypal",
    status: "disconnected",
  },
  twilio: {
    enabled: true,
    connected: true,
    apiKey: "AC...",
    secretKey: "auth_token...",
    webhookUrl: "https://api.mediflow.example.com/webhooks/twilio",
    status: "connected",
  },
  googleMaps: {
    enabled: true,
    connected: true,
    apiKey: "AIzaSyB...",
    secretKey: "",
    webhookUrl: "",
    status: "connected",
  },
  cloudinary: {
    enabled: true,
    connected: true,
    apiKey: "123456789...",
    secretKey: "abcdef...",
    webhookUrl: "https://api.mediflow.example.com/webhooks/cloudinary",
    status: "connected",
  },
};

export const MOCK_BACKUP: BackupSettings = {
  autoBackup: true,
  frequency: "daily",
  retentionDays: 30,
  lastBackup: "2024-01-15T02:00:00Z",
  nextBackup: "2024-01-16T02:00:00Z",
  backups: [
    {
      id: "1",
      date: "2024-01-15T02:00:00Z",
      size: "2.4 GB",
      status: "completed",
    },
    {
      id: "2",
      date: "2024-01-14T02:00:00Z",
      size: "2.3 GB",
      status: "completed",
    },
    {
      id: "3",
      date: "2024-01-13T02:00:00Z",
      size: "2.3 GB",
      status: "completed",
    },
    {
      id: "4",
      date: "2024-01-12T02:00:00Z",
      size: "2.2 GB",
      status: "completed",
    },
    {
      id: "5",
      date: "2024-01-11T02:00:00Z",
      size: "2.2 GB",
      status: "completed",
    },
  ],
  schedule: {
    enabled: true,
    frequency: "daily",
    time: "02:00",
    timezone: "America/New_York",
    retention: 30,
    compression: "gzip",
    include: { database: true, files: true, config: true, logs: true },
    retentionDays: 30,
    compressionEnabled: true,
  },
  history: [
    {
      id: "bk_1",
      type: "auto",
      status: "completed",
      size: "2.4 GB",
      startedAt: "2024-01-15T02:00:00Z",
      completedAt: "2024-01-15T02:15:00Z",
      duration: "15m",
    },
    {
      id: "bk_2",
      type: "auto",
      status: "completed",
      size: "2.3 GB",
      startedAt: "2024-01-14T02:00:00Z",
      completedAt: "2024-01-14T02:12:00Z",
      duration: "12m",
    },
    {
      id: "bk_3",
      type: "manual",
      status: "completed",
      size: "1.8 GB",
      startedAt: "2024-01-13T14:30:00Z",
      completedAt: "2024-01-13T14:45:00Z",
      duration: "15m",
    },
    {
      id: "bk_4",
      type: "auto",
      status: "completed",
      size: "2.3 GB",
      startedAt: "2024-01-13T02:00:00Z",
      completedAt: "2024-01-13T02:14:00Z",
      duration: "14m",
    },
    {
      id: "bk_5",
      type: "auto",
      status: "failed",
      size: "0",
      startedAt: "2024-01-12T02:00:00Z",
      completedAt: "2024-01-12T02:05:00Z",
      duration: "5m",
    },
  ],
  storageUsed: 12.5,
  storageLimit: 100,
  storageProvider: "s3",
  encryptBackups: true,
  verifyBackups: true,
  lastBackupStatus: "completed",
};

export const MOCK_API: APISettings = {
  keys: [
    {
      id: "key_1",
      name: "Production API Key",
      key: "mf_live_abc123...",
      prefix: "mf_live",
      scopes: [
        "patients:read",
        "patients:write",
        "appointments:read",
        "appointments:write",
      ],
      createdAt: "2024-01-01T00:00:00Z",
      lastUsed: "2024-01-15T10:30:00Z",
      status: "active",
    },
    {
      id: "key_2",
      name: "Development API Key",
      key: "mf_dev_xyz789...",
      prefix: "mf_dev",
      scopes: ["patients:read", "appointments:read"],
      createdAt: "2024-01-10T00:00:00Z",
      lastUsed: "2024-01-14T15:20:00Z",
      status: "active",
    },
    {
      id: "key_3",
      name: "Legacy API Key (Revoked)",
      key: "mf_old_...",
      prefix: "mf_old",
      scopes: ["patients:read"],
      createdAt: "2023-06-01T00:00:00Z",
      lastUsed: "2023-12-01T00:00:00Z",
      status: "revoked",
    },
  ],
  webhooks: [
    {
      id: "wh_1",
      name: "Appointment Webhooks",
      url: "https://webhook.example.com/mediflow",
      events: ["appointment.created", "appointment.updated", "patient.created"],
      secret: "whsec_abc123...",
      active: true,
      createdAt: "2024-01-05T00:00:00Z",
    },
    {
      id: "wh_2",
      name: "Analytics Webhooks",
      url: "https://analytics.example.com/events",
      events: ["*"],
      secret: "whsec_xyz789...",
      active: true,
      createdAt: "2024-01-10T00:00:00Z",
    },
  ],
  rateLimits: [
    {
      id: "1",
      endpoint: "/api/patients",
      method: "GET",
      requests: 100,
      window: 60,
      action: "throttle",
    },
    {
      id: "2",
      endpoint: "/api/appointments",
      method: "POST",
      requests: 50,
      window: 60,
      action: "throttle",
    },
    {
      id: "3",
      endpoint: "/api/doctors",
      method: "GET",
      requests: 200,
      window: 60,
      action: "throttle",
    },
    {
      id: "4",
      endpoint: "/api/messages",
      method: "POST",
      requests: 30,
      window: 60,
      action: "block",
    },
  ],
  globalRateLimit: {
    enabled: true,
    requestsPerMinute: 100,
    requestsPerHour: 1000,
    requestsPerDay: 10000,
  },
};

export const MOCK_BILLING: BillingSettings = {
  subscription: {
    plan: "professional",
    status: "active",
    interval: "month",
    currentPeriodEnd: "2024-02-01T00:00:00Z",
    cancelAtPeriodEnd: false,
  },
  paymentMethods: [
    {
      id: "pm_1",
      type: "card",
      brand: "Visa",
      last4: "4242",
      expiryMonth: 12,
      expiryYear: 2026,
      isDefault: true,
    },
    {
      id: "pm_2",
      type: "card",
      brand: "Mastercard",
      last4: "5555",
      expiryMonth: 6,
      expiryYear: 2025,
      isDefault: false,
    },
  ],
  autoPayEnabled: true,
  paymentRetryAttempts: 3,
  paymentRetryInterval: 3,
  sendPaymentReceipts: true,
  invoices: [
    {
      id: "inv_001",
      number: "INV-2024-001",
      date: "2024-01-01",
      amount: 99,
      status: "paid",
      plan: "professional",
      pdfUrl: "#",
    },
    {
      id: "inv_002",
      number: "INV-2023-012",
      date: "2023-12-01",
      amount: 99,
      status: "paid",
      plan: "professional",
      pdfUrl: "#",
    },
    {
      id: "inv_003",
      number: "INV-2023-011",
      date: "2023-11-01",
      amount: 99,
      status: "paid",
      plan: "professional",
      pdfUrl: "#",
    },
  ],
  contacts: [
    {
      id: "contact_1",
      name: "Dr. Sarah Johnson",
      email: "sarah@mediflow.example.com",
      role: "billing",
      notifications: true,
    },
    {
      id: "contact_2",
      name: "Admin User",
      email: "admin@mediflow.example.com",
      role: "admin",
      notifications: true,
    },
  ],
};

export const MOCK_DANGER: DangerZoneActions = {
  clearCache: {
    id: "clearCache",
    label: "Clear Cache",
    description:
      "Clear all cached data including API responses, images, and temporary files. This may temporarily slow down the application.",
    icon: Database,
    color: "amber",
    bgColor:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    borderColor: "border-amber-200 dark:border-amber-900/30",
    confirmText: "CLEAR CACHE",
    destructive: false,
    requiresDoubleConfirm: false,
  },
  resetSettings: {
    id: "resetSettings",
    label: "Reset All Settings",
    description:
      "Reset all configuration settings to their default values. This cannot be undone and will affect all users.",
    icon: Settings,
    color: "orange",
    bgColor:
      "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    borderColor: "border-orange-200 dark:border-orange-900/30",
    confirmText: "RESET SETTINGS",
    destructive: true,
    requiresDoubleConfirm: false,
  },
  deleteLogs: {
    id: "deleteLogs",
    label: "Delete Audit Logs",
    description:
      "Permanently delete all audit logs and activity history. This action is irreversible and may affect compliance requirements.",
    icon: Trash2,
    color: "red",
    bgColor: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    borderColor: "border-red-200 dark:border-red-900/30",
    confirmText: "DELETE LOGS",
    destructive: true,
    requiresDoubleConfirm: false,
  },
  anonymizeData: {
    id: "anonymizeData",
    label: "Anonymize Patient Data",
    description:
      "Replace all personally identifiable information with anonymized data. Use for development/testing environments only.",
    icon: UserX,
    color: "purple",
    bgColor:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    borderColor: "border-purple-200 dark:border-purple-900/30",
    confirmText: "ANONYMIZE DATA",
    destructive: true,
    requiresDoubleConfirm: false,
  },
  revokeAllSessions: {
    id: "revokeAllSessions",
    label: "Revoke All Sessions",
    description:
      "Force logout all users across all devices. All active sessions will be terminated immediately.",
    icon: Key,
    color: "blue",
    bgColor: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    borderColor: "border-blue-200 dark:border-blue-900/30",
    confirmText: "REVOKE SESSIONS",
    destructive: false,
    requiresDoubleConfirm: false,
  },
  deleteAllData: {
    id: "deleteAllData",
    label: "Delete All Data",
    description:
      "PERMANENTLY DELETE ALL APPLICATION DATA including patients, appointments, records, and configurations. THIS CANNOT BE UNDONE.",
    icon: AlertTriangle,
    color: "red",
    bgColor: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    borderColor: "border-red-200 dark:border-red-900/30",
    confirmText: "DELETE ALL DATA",
    destructive: true,
    requiresDoubleConfirm: true,
  },
};

export const MOCK_ALL_SETTINGS: AllSettings = {
  general: MOCK_CLINIC_INFO,
  appearance: MOCK_APPEARANCE,
  localization: MOCK_LOCALIZATION,
  notifications: MOCK_NOTIFICATIONS,
  appointments: MOCK_APPOINTMENTS,
  security: MOCK_SECURITY,
  integrations: MOCK_INTEGRATIONS,
  backup: MOCK_BACKUP,
  api: MOCK_API,
  billing: MOCK_BILLING,
  danger: MOCK_DANGER,
};

// Timezone options
export const TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Anchorage",
  "Pacific/Honolulu",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Rome",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Dubai",
  "Asia/Singapore",
  "Australia/Sydney",
];

// Language options
export const LANGUAGES = [
  { code: "en-US", name: "English (US)" },
  { code: "en-GB", name: "English (UK)" },
  { code: "es-ES", name: "Spanish (Spain)" },
  { code: "es-MX", name: "Spanish (Mexico)" },
  { code: "fr-FR", name: "French (France)" },
  { code: "de-DE", name: "German (Germany)" },
  { code: "it-IT", name: "Italian (Italy)" },
  { code: "pt-BR", name: "Portuguese (Brazil)" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "ja-JP", name: "Japanese" },
  { code: "ko-KR", name: "Korean" },
  { code: "ar-SA", name: "Arabic (Saudi Arabia)" },
];

// Date format options
export const DATE_FORMATS = [
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY (01/15/2024)" },
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY (15/01/2024)" },
  { value: "YYYY-MM-DD", label: "YYYY-MM-DD (2024-01-15)" },
  { value: "MMM DD, YYYY", label: "MMM DD, YYYY (Jan 15, 2024)" },
  { value: "DD MMM YYYY", label: "DD MMM YYYY (15 Jan 2024)" },
];

// Currency options
export const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "CAD", symbol: "CA$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
];

// Color presets
export const COLOR_PRESETS = [
  { name: "Blue", primary: "#2563eb", accent: "#0ea5e9" },
  { name: "Emerald", primary: "#059669", accent: "#10b981" },
  { name: "Violet", primary: "#7c3aed", accent: "#a855f7" },
  { name: "Rose", primary: "#e11d48", accent: "#f43f5e" },
  { name: "Amber", primary: "#d97706", accent: "#f59e0b" },
  { name: "Cyan", primary: "#0891b2", accent: "#06b6d4" },
  { name: "Indigo", primary: "#4f46e5", accent: "#6366f1" },
  { name: "Teal", primary: "#0d9488", accent: "#14b8a6" },
];
