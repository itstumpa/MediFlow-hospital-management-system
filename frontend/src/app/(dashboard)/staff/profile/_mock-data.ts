import { type LucideIcon } from "lucide-react";

/* ══════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════ */

export type Gender = "male" | "female" | "other";
export type EmploymentStatus = "active" | "on-leave" | "resigned" | "suspended";
export type ShiftType = "morning" | "afternoon" | "night" | "rotating";
export type ThemeMode = "light" | "dark" | "system";
export type DateFormat = "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD";
export type TimeFormat = "12h" | "24h";
export type AccentColor =
  | "emerald"
  | "blue"
  | "violet"
  | "rose"
  | "amber"
  | "cyan";

export interface StaffProfile {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  initials: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  photoUrl?: string;
  role: string;
  department: string;
  manager: string;
  joiningDate: string;
  shift: ShiftType;
  workLocation: string;
  employmentStatus: EmploymentStatus;
  yearsOfService: number;
  bio?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  address: string;
}

export interface StaffPreferences {
  language: string;
  timezone: string;
  dateFormat: DateFormat;
  timeFormat: TimeFormat;
}

export interface NotificationSettings {
  appointments: boolean;
  queueUpdates: boolean;
  billingAlerts: boolean;
  announcements: boolean;
  email: boolean;
  sms: boolean;
  pushNotifications: boolean;
}

export interface AppearanceSettings {
  theme: ThemeMode;
  accentColor: AccentColor;
  compactMode: boolean;
}

export interface AccountInfo {
  username: string;
  twoFactorEnabled: boolean;
  connectedDevices: number;
  lastPasswordChange: string;
}

export interface ProfileCompletionItem {
  label: string;
  completed: boolean;
}

export interface RecentActivity {
  id: string;
  action: string;
  timestamp: Date;
  icon: LucideIcon;
}

/* ══════════════════════════════════════════════
   Mock Profile
   ══════════════════════════════════════════════ */

export const profile: StaffProfile = {
  id: "STF-001",
  employeeId: "EMP-2023-0042",
  firstName: "Jessica",
  lastName: "Martinez",
  fullName: "Jessica Martinez",
  initials: "JM",
  email: "jessica.martinez@mediflow.com",
  phone: "+1 (555) 234-5678",
  dateOfBirth: "1990-05-15",
  gender: "female",
  address: "742 Elm Street",
  city: "San Francisco",
  state: "CA",
  zipCode: "94102",
  photoUrl: "",
  role: "Senior Receptionist",
  department: "Front Desk",
  manager: "Dr. Sarah Chen",
  joiningDate: "2021-03-10",
  shift: "morning",
  workLocation: "Main Campus — Building A",
  employmentStatus: "active",
  yearsOfService: 3,
  bio: "Dedicated senior receptionist with over 5 years of experience in healthcare administration. Passionate about providing exceptional patient experiences and streamlining front desk operations.",
};

export const emergencyContact: EmergencyContact = {
  name: "David Martinez",
  relationship: "Spouse",
  phone: "+1 (555) 987-6543",
  address: "742 Elm Street, San Francisco, CA 94102",
};

export const defaultPreferences: StaffPreferences = {
  language: "English (US)",
  timezone: "America/Los_Angeles (PST)",
  dateFormat: "MM/DD/YYYY",
  timeFormat: "12h",
};

export const defaultNotificationSettings: NotificationSettings = {
  appointments: true,
  queueUpdates: true,
  billingAlerts: false,
  announcements: true,
  email: true,
  sms: false,
  pushNotifications: true,
};

export const defaultAppearance: AppearanceSettings = {
  theme: "system",
  accentColor: "emerald",
  compactMode: false,
};

export const accountInfo: AccountInfo = {
  username: "jessica.martinez",
  twoFactorEnabled: true,
  connectedDevices: 3,
  lastPasswordChange: "2026-03-15",
};

/* ══════════════════════════════════════════════
   Profile Completion
   ══════════════════════════════════════════════ */

export const profileCompletionItems: ProfileCompletionItem[] = [
  { label: "Personal Information", completed: true },
  { label: "Employment Details", completed: true },
  { label: "Emergency Contact", completed: true },
  { label: "Preferences", completed: true },
  { label: "Notification Settings", completed: false },
  { label: "Profile Photo", completed: false },
];

export const profileCompletionPercent = Math.round(
  (profileCompletionItems.filter((i) => i.completed).length /
    profileCompletionItems.length) *
    100,
);

/* ══════════════════════════════════════════════
   Recent Activity
   ══════════════════════════════════════════════ */

import { Edit, LogIn, Settings, Shield, UserCheck } from "lucide-react";

export const recentActivities: RecentActivity[] = [
  {
    id: "ACT-001",
    action: "Profile photo updated",
    timestamp: new Date(Date.now() - 86400000 * 2),
    icon: Edit,
  },
  {
    id: "ACT-002",
    action: "Password changed",
    timestamp: new Date(Date.now() - 86400000 * 5),
    icon: Shield,
  },
  {
    id: "ACT-003",
    action: "Notification preferences updated",
    timestamp: new Date(Date.now() - 86400000 * 7),
    icon: Settings,
  },
  {
    id: "ACT-004",
    action: "Two-factor authentication enabled",
    timestamp: new Date(Date.now() - 86400000 * 14),
    icon: UserCheck,
  },
  {
    id: "ACT-005",
    action: "Account logged in from new device",
    timestamp: new Date(Date.now() - 86400000 * 3),
    icon: LogIn,
  },
];

/* ══════════════════════════════════════════════
   Tabs config
   ══════════════════════════════════════════════ */

export type ProfileTab =
  | "personal"
  | "employment"
  | "emergency"
  | "preferences"
  | "notifications"
  | "appearance"
  | "account";

export const tabs: { id: ProfileTab; label: string }[] = [
  { id: "personal", label: "Personal Information" },
  { id: "employment", label: "Employment" },
  { id: "emergency", label: "Emergency Contact" },
  { id: "preferences", label: "Preferences" },
  { id: "notifications", label: "Notifications" },
  { id: "appearance", label: "Appearance" },
  { id: "account", label: "Account" },
];

/* ══════════════════════════════════════════════
   Select options
   ══════════════════════════════════════════════ */

export const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export const shiftOptions = [
  { value: "morning", label: "Morning (7:00 AM – 3:00 PM)" },
  { value: "afternoon", label: "Afternoon (3:00 PM – 11:00 PM)" },
  { value: "night", label: "Night (11:00 PM – 7:00 AM)" },
  { value: "rotating", label: "Rotating" },
];

export const languageOptions = [
  "English (US)",
  "English (UK)",
  "Spanish",
  "French",
  "German",
  "Mandarin",
  "Arabic",
  "Hindi",
];

export const timezoneOptions = [
  "America/Los_Angeles (PST)",
  "America/Denver (MST)",
  "America/Chicago (CST)",
  "America/New_York (EST)",
  "Europe/London (GMT)",
  "Europe/Paris (CET)",
  "Asia/Tokyo (JST)",
  "Asia/Dubai (GST)",
];

export const dateFormatOptions = [
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
  { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
];

export const timeFormatOptions = [
  { value: "12h", label: "12-hour (AM/PM)" },
  { value: "24h", label: "24-hour" },
];

export const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export const accentColorOptions: {
  value: AccentColor;
  label: string;
  color: string;
}[] = [
  { value: "emerald", label: "Emerald", color: "#10b981" },
  { value: "blue", label: "Blue", color: "#3b82f6" },
  { value: "violet", label: "Violet", color: "#8b5cf6" },
  { value: "rose", label: "Rose", color: "#f43f5e" },
  { value: "amber", label: "Amber", color: "#f59e0b" },
  { value: "cyan", label: "Cyan", color: "#06b6d4" },
];
