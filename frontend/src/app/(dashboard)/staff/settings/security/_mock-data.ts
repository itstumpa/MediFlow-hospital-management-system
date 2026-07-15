/* ══════════════════════════════════════════════
   Module 11 — Security & Privacy Types & Mock Data
   ══════════════════════════════════════════════ */

// ─── Password ───

export type PasswordStrength =
  | "weak"
  | "fair"
  | "good"
  | "strong"
  | "very-strong";

export interface PasswordRequirement {
  label: string;
  met: boolean;
}

// ─── Two-Factor ───

export type TwoFactorMethod = "app" | "sms";

export interface BackupCode {
  code: string;
  used: boolean;
}

// ─── Login History ───

export interface LoginSession {
  id: string;
  date: string;
  time: string;
  browser: string;
  os: string;
  ipAddress: string;
  location: string;
  status: "current" | "active" | "expired";
}

// ─── Active Sessions ───

export interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  os: string;
  ipAddress: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

// ─── Connected Devices ───

export type DeviceType = "desktop" | "laptop" | "tablet" | "mobile";

export interface ConnectedDevice {
  id: string;
  type: DeviceType;
  name: string;
  browser: string;
  lastLogin: string;
}

// ─── Privacy Settings ───

export interface PrivacySettings {
  profileVisibility: "all" | "staff" | "none";
  directoryVisibility: "all" | "staff" | "none";
  emailVisibility: "all" | "staff" | "none";
  phoneVisibility: "all" | "staff" | "none";
  analyticsSharing: boolean;
}

// ─── Security Score ───

export interface SecurityRecommendation {
  id: string;
  label: string;
  severity: "critical" | "high" | "medium" | "low";
  completed: boolean;
}

export interface SecurityCheckItem {
  id: string;
  label: string;
  completed: boolean;
}

export interface SecurityScoreData {
  score: number;
  total: number;
  percentage: number;
  recommendations: SecurityRecommendation[];
  completedChecks: SecurityCheckItem[];
}

// ─── Security Tips ───

export interface SecurityTip {
  icon: string;
  title: string;
  description: string;
}

// ══════════════════════════════════════════════
//  Mock Data
// ══════════════════════════════════════════════

export const mockSecurityScore: SecurityScoreData = {
  score: 72,
  total: 100,
  percentage: 72,
  recommendations: [
    {
      id: "rec-1",
      label: "Enable two-factor authentication",
      severity: "critical",
      completed: false,
    },
    {
      id: "rec-2",
      label: "Update to a stronger password",
      severity: "high",
      completed: false,
    },
    {
      id: "rec-3",
      label: "Review active sessions",
      severity: "medium",
      completed: true,
    },
    {
      id: "rec-4",
      label: "Enable login notifications",
      severity: "medium",
      completed: false,
    },
    {
      id: "rec-5",
      label: "Remove unused connected devices",
      severity: "low",
      completed: true,
    },
  ],
  completedChecks: [
    { id: "check-1", label: "Password set", completed: true },
    { id: "check-2", label: "Two-factor authentication", completed: false },
    { id: "check-3", label: "Active sessions reviewed", completed: true },
    { id: "check-4", label: "Connected devices reviewed", completed: true },
    { id: "check-5", label: "Privacy settings configured", completed: true },
    { id: "check-6", label: "Login notifications enabled", completed: false },
  ],
};

export const mockLoginHistory: LoginSession[] = [
  {
    id: "lh-1",
    date: "2026-07-14",
    time: "08:32 AM",
    browser: "Chrome 128",
    os: "Windows 11",
    ipAddress: "192.168.1.42",
    location: "San Francisco, US",
    status: "current",
  },
  {
    id: "lh-2",
    date: "2026-07-14",
    time: "07:15 AM",
    browser: "Safari 18",
    os: "iOS 19",
    ipAddress: "10.0.0.15",
    location: "San Francisco, US",
    status: "active",
  },
  {
    id: "lh-3",
    date: "2026-07-13",
    time: "06:42 PM",
    browser: "Edge 128",
    os: "Windows 11",
    ipAddress: "192.168.1.42",
    location: "San Francisco, US",
    status: "active",
  },
  {
    id: "lh-4",
    date: "2026-07-13",
    time: "12:10 PM",
    browser: "Chrome 128",
    os: "macOS 15",
    ipAddress: "203.0.113.45",
    location: "Oakland, US",
    status: "active",
  },
  {
    id: "lh-5",
    date: "2026-07-12",
    time: "09:30 AM",
    browser: "Firefox 130",
    os: "Windows 11",
    ipAddress: "192.168.1.42",
    location: "San Francisco, US",
    status: "active",
  },
  {
    id: "lh-6",
    date: "2026-07-11",
    time: "03:22 PM",
    browser: "Chrome 127",
    os: "Android 15",
    ipAddress: "198.51.100.78",
    location: "San Jose, US",
    status: "expired",
  },
  {
    id: "lh-7",
    date: "2026-07-10",
    time: "11:05 AM",
    browser: "Safari 18",
    os: "macOS 15",
    ipAddress: "203.0.113.23",
    location: "San Francisco, US",
    status: "expired",
  },
  {
    id: "lh-8",
    date: "2026-07-09",
    time: "02:50 PM",
    browser: "Edge 127",
    os: "Windows 10",
    ipAddress: "192.168.1.100",
    location: "San Francisco, US",
    status: "expired",
  },
];

export const mockActiveSessions: ActiveSession[] = [
  {
    id: "as-1",
    device: "Dell OptiPlex 7090",
    browser: "Chrome 128",
    os: "Windows 11",
    ipAddress: "192.168.1.42",
    location: "San Francisco, US",
    lastActive: "Now",
    isCurrent: true,
  },
  {
    id: "as-2",
    device: "iPhone 17 Pro",
    browser: "Safari 18",
    os: "iOS 19",
    ipAddress: "10.0.0.15",
    location: "San Francisco, US",
    lastActive: "2 min ago",
    isCurrent: false,
  },
  {
    id: "as-3",
    device: 'MacBook Pro 16"',
    browser: "Chrome 128",
    os: "macOS 15",
    ipAddress: "203.0.113.45",
    location: "Oakland, US",
    lastActive: "1 hour ago",
    isCurrent: false,
  },
  {
    id: "as-4",
    device: "Samsung Galaxy Tab S10",
    browser: "Chrome 127",
    os: "Android 15",
    ipAddress: "198.51.100.78",
    location: "San Jose, US",
    lastActive: "Yesterday",
    isCurrent: false,
  },
];

export const mockConnectedDevices: ConnectedDevice[] = [
  {
    id: "cd-1",
    type: "desktop",
    name: "Dell OptiPlex 7090",
    browser: "Chrome 128",
    lastLogin: "Just now",
  },
  {
    id: "cd-2",
    type: "laptop",
    name: 'MacBook Pro 16" (2025)',
    browser: "Chrome 128",
    lastLogin: "1 hour ago",
  },
  {
    id: "cd-3",
    type: "mobile",
    name: "iPhone 17 Pro",
    browser: "Safari 18",
    lastLogin: "2 min ago",
  },
  {
    id: "cd-4",
    type: "tablet",
    name: "Samsung Galaxy Tab S10",
    browser: "Chrome 127",
    lastLogin: "Yesterday",
  },
];

export const mockPrivacySettings: PrivacySettings = {
  profileVisibility: "staff",
  directoryVisibility: "all",
  emailVisibility: "staff",
  phoneVisibility: "none",
  analyticsSharing: true,
};

export const mockBackupCodes: BackupCode[] = [
  { code: "A1B2-C3D4", used: false },
  { code: "E5F6-G7H8", used: false },
  { code: "I9J0-K1L2", used: true },
  { code: "M3N4-O5P6", used: false },
  { code: "Q7R8-S9T0", used: false },
  { code: "U1V2-W3X4", used: true },
  { code: "Y5Z6-A7B8", used: false },
  { code: "C9D0-E1F2", used: false },
];

export const securityTips: SecurityTip[] = [
  {
    icon: "Key",
    title: "Strong Passwords",
    description:
      "Use a unique password with at least 12 characters, including symbols and numbers.",
  },
  {
    icon: "Shield",
    title: "Two-Factor Authentication",
    description:
      "Add an extra layer of security by enabling 2FA on your account.",
  },
  {
    icon: "LogOut",
    title: "Review Active Sessions",
    description: "Sign out from unused devices to prevent unauthorized access.",
  },
  {
    icon: "Eye",
    title: "Privacy Settings",
    description:
      "Review who can see your profile information in the staff directory.",
  },
  {
    icon: "Smartphone",
    title: "Keep Apps Updated",
    description:
      "Always use the latest version of your browser and apps for security patches.",
  },
];

export const passwordStrengthLabels: Record<PasswordStrength, string> = {
  weak: "Weak",
  fair: "Fair",
  good: "Good",
  strong: "Strong",
  "very-strong": "Very Strong",
};

export const passwordStrengthColors: Record<PasswordStrength, string> = {
  weak: "bg-red-500",
  fair: "bg-orange-500",
  good: "bg-amber-500",
  strong: "bg-emerald-500",
  "very-strong": "bg-emerald-600",
};

export function evaluatePasswordStrength(password: string): PasswordStrength {
  if (!password) return "weak";
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  if (score <= 1) return "weak";
  if (score === 2) return "fair";
  if (score === 3) return "good";
  if (score === 4) return "strong";
  return "very-strong";
}

export function getPasswordRequirements(
  password: string,
): PasswordRequirement[] {
  return [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "At least 12 characters", met: password.length >= 12 },
    {
      label: "Uppercase & lowercase letters",
      met: /[a-z]/.test(password) && /[A-Z]/.test(password),
    },
    { label: "At least one number", met: /\d/.test(password) },
    { label: "At least one symbol", met: /[^a-zA-Z0-9]/.test(password) },
  ];
}
