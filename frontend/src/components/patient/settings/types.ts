export type SettingsSection =
  | "profile"
  | "preferences"
  | "notifications"
  | "language"
  | "accessibility"
  | "appearance"
  | "sessions"
  | "devices";

export interface ProfileSettings {
  displayName: string;
  bio: string;
  email: string;
  phone: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
}

export interface PreferenceSettings {
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  appointmentReminders: boolean;
  prescriptionReminders: boolean;
  labReportAlerts: boolean;
}

export interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  accentColor: string;
  animationsEnabled: boolean;
  fontSize: "small" | "medium" | "large" | "extra-large";
}

export interface Session {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  isCurrent: boolean;
  lastActive: string;
  loggedInAt: string;
}

export interface Device {
  id: string;
  name: string;
  type: "smartphone" | "laptop" | "tablet" | "desktop";
  os: string;
  browser: string;
  ip: string;
  location: string;
  isCurrent: boolean;
  lastActive: string;
  addedAt: string;
}

export interface AllSettings {
  profile: ProfileSettings;
  preferences: PreferenceSettings;
  notifications: NotificationSettings;
  appearance: AppearanceSettings;
}

export const ACCENT_COLORS = [
  { name: "Teal", value: "#0e7c7b" },
  { name: "Emerald", value: "#059669" },
  { name: "Blue", value: "#2563eb" },
  { name: "Indigo", value: "#4f46e5" },
  { name: "Purple", value: "#7c3aed" },
  { name: "Pink", value: "#db2777" },
  { name: "Rose", value: "#e11d48" },
  { name: "Orange", value: "#ea580c" },
  { name: "Amber", value: "#d97706" },
] as const;

export const THEME_OPTIONS = [
  {
    id: "light" as const,
    label: "Light",
    description: "Clean, bright interface",
  },
  { id: "dark" as const, label: "Dark", description: "Easy on the eyes" },
  {
    id: "system" as const,
    label: "System",
    description: "Follows your device",
  },
];

export const FONT_SIZE_OPTIONS = [
  { id: "small" as const, label: "Small", preview: "A" },
  { id: "medium" as const, label: "Medium", preview: "A" },
  { id: "large" as const, label: "Large", preview: "A" },
  { id: "extra-large" as const, label: "Extra Large", preview: "A" },
];

export const SECTION_ICONS: Record<SettingsSection, string> = {
  profile: "UserRound",
  preferences: "SlidersHorizontal",
  notifications: "Bell",
  language: "Globe",
  accessibility: "Accessibility",
  appearance: "Palette",
  sessions: "History",
  devices: "Smartphone",
};

export const initialSettings: AllSettings = {
  profile: {
    displayName: "Alex Morgan",
    bio: "Patient since 2019",
    email: "alex.morgan@email.com",
    phone: "(555) 123-4567",
    timezone: "America/Los_Angeles",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
  },
  preferences: {
    language: "English",
    timezone: "America/Los_Angeles",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    appointmentReminders: true,
    prescriptionReminders: true,
    labReportAlerts: true,
  },
  appearance: {
    theme: "system",
    accentColor: "#0e7c7b",
    animationsEnabled: true,
    fontSize: "medium",
  },
};

export const mockSessions: Session[] = [
  {
    id: "session-current",
    device: "Windows 11 PC",
    browser: "Chrome 125.0",
    ip: "192.168.1.42",
    location: "San Francisco, CA",
    isCurrent: true,
    lastActive: "Active now",
    loggedInAt: "2026-07-14T08:30:00",
  },
  {
    id: "session-2",
    device: "iPhone 15 Pro",
    browser: "Safari 18.0",
    ip: "192.168.1.42",
    location: "San Francisco, CA",
    isCurrent: false,
    lastActive: "3 hours ago",
    loggedInAt: "2026-07-14T06:15:00",
  },
  {
    id: "session-3",
    device: "MacBook Pro",
    browser: "Firefox 128.0",
    ip: "203.0.113.45",
    location: "New York, NY",
    isCurrent: false,
    lastActive: "2 days ago",
    loggedInAt: "2026-07-12T14:20:00",
  },
  {
    id: "session-4",
    device: "Samsung Galaxy S24",
    browser: "Chrome Mobile 125.0",
    ip: "198.51.100.78",
    location: "Los Angeles, CA",
    isCurrent: false,
    lastActive: "5 days ago",
    loggedInAt: "2026-07-09T19:45:00",
  },
];

export const mockDevices: Device[] = [
  {
    id: "device-current",
    name: "Alex's Work PC",
    type: "desktop",
    os: "Windows 11",
    browser: "Chrome 125.0",
    ip: "192.168.1.42",
    location: "San Francisco, CA",
    isCurrent: true,
    lastActive: "Active now",
    addedAt: "2024-03-15",
  },
  {
    id: "device-2",
    name: "Alex's iPhone",
    type: "smartphone",
    os: "iOS 18.0",
    browser: "Safari 18.0",
    ip: "192.168.1.42",
    location: "San Francisco, CA",
    isCurrent: false,
    lastActive: "3 hours ago",
    addedAt: "2024-06-20",
  },
  {
    id: "device-3",
    name: "Alex's MacBook",
    type: "laptop",
    os: "macOS 15.0",
    browser: "Firefox 128.0",
    ip: "203.0.113.45",
    location: "New York, NY",
    isCurrent: false,
    lastActive: "2 days ago",
    addedAt: "2024-01-10",
  },
  {
    id: "device-4",
    name: "Home Tablet",
    type: "tablet",
    os: "iPadOS 18.0",
    browser: "Safari 18.0",
    ip: "198.51.100.78",
    location: "Los Angeles, CA",
    isCurrent: false,
    lastActive: "1 week ago",
    addedAt: "2024-09-05",
  },
];
