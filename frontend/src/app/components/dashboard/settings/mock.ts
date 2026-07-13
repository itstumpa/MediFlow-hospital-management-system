import {
  AlertTriangle,
  Database,
  Key,
  Settings,
  Trash2,
  UserX,
} from "lucide-react";

import {
  APISettings,
  AppearanceSettings,
  AppointmentSettings,
  BackupSettings,
  BillingSettings,
  ClinicInfo,
  DangerZoneActions,
  IntegrationSettings,
  LocalizationSettings,
  NotificationSettings,
  SecuritySettings,
} from "./types";

export const MOCK_CLINIC_INFO: ClinicInfo = {
  name: "MediFlow Medical Center",
  logo: "",
  favicon: "",
  description:
    "MediFlow Medical Center is a state-of-the-art healthcare facility providing comprehensive medical services across multiple specialties. Our team of experienced physicians and healthcare professionals is dedicated to delivering exceptional patient care in a modern, comfortable environment.",
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
    saturday: { enabled: true, open: "09:00", close: "13:00" },
    sunday: { enabled: false, open: "09:00", close: "13:00" },
  },
};

export const MOCK_APPEARANCE: AppearanceSettings = {
  theme: "system",
  primaryColor: "#0e7c7b",
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
  workingDays: [1, 2, 3, 4, 5], // Mon-Fri
  slotDuration: 30,
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
    minLength: 12,
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
    lastSync: "2024-01-15T10:00:00Z",
  },
  zoom: { enabled: true, connected: false, apiKey: "", apiSecret: "" },
  stripe: {
    enabled: true,
    connected: true,
    publishableKey: "pk_live_...",
    secretKey: "sk_live_...",
  },
  paypal: { enabled: false, connected: false, clientId: "", secret: "" },
  twilio: {
    enabled: true,
    connected: true,
    accountSid: "AC...",
    authToken: "****",
    phoneNumber: "+15551234567",
  },
  googleMaps: { enabled: true, connected: true, apiKey: "AIza..." },
  cloudinary: {
    enabled: true,
    connected: true,
    cloudName: "mediflow",
    apiKey: "123...",
    apiSecret: "****",
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
      id: "1",
      name: "Production API Key",
      key: "mf_live_...",
      prefix: "mf_live",
      scopes: [
        "patients:read",
        "patients:write",
        "appointments:read",
        "appointments:write",
      ],
      createdAt: "2024-01-10T10:00:00Z",
      lastUsed: "2024-01-15T09:30:00Z",
      status: "active",
    },
    {
      id: "2",
      name: "Development API Key",
      key: "mf_test_...",
      prefix: "mf_test",
      scopes: ["patients:read", "appointments:read"],
      createdAt: "2024-01-05T14:00:00Z",
      lastUsed: "2024-01-14T16:20:00Z",
      status: "active",
    },
    {
      id: "3",
      name: "Mobile App Key",
      key: "mf_mobile_...",
      prefix: "mf_mobile",
      scopes: ["patients:read", "appointments:read", "messages:read"],
      createdAt: "2024-01-01T09:00:00Z",
      lastUsed: "2024-01-13T11:45:00Z",
      status: "revoked",
    },
  ],
  webhooks: [
    {
      id: "1",
      name: "Appointment Webhooks",
      url: "https://api.mediflow.example.com/webhooks/appointments",
      events: [
        "appointment.created",
        "appointment.updated",
        "appointment.cancelled",
      ],
      secret: "whsec_...",
      active: true,
      createdAt: "2024-01-10T10:00:00Z",
    },
    {
      id: "2",
      name: "Message Webhooks",
      url: "https://api.mediflow.example.com/webhooks/messages",
      events: ["message.received"],
      secret: "whsec_...",
      active: true,
      createdAt: "2024-01-12T14:00:00Z",
    },
    {
      id: "3",
      name: "Patient Webhooks",
      url: "https://api.mediflow.example.com/webhooks/patients",
      events: ["patient.created", "patient.updated"],
      secret: "whsec_...",
      active: false,
      createdAt: "2024-01-15T09:00:00Z",
    },
  ],
  rateLimits: [
    {
      id: "1",
      endpoint: "/api/v1/patients",
      method: "GET",
      requests: 100,
      window: 60,
      action: "throttle",
    },
    {
      id: "2",
      endpoint: "/api/v1/appointments",
      method: "POST",
      requests: 50,
      window: 60,
      action: "throttle",
    },
    {
      id: "3",
      endpoint: "/api/v1/messages",
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
    bgColor: "bg-dash-primary-light text-dash-primary dark:bg-teal-900/30 dark:text-accent",
    borderColor: "border-dash-primary-light dark:border-dash-primary/30",
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
