// ── Types ──

export type PasswordStrength =
  | "weak"
  | "fair"
  | "good"
  | "strong"
  | "very-strong";

export type TwoFactorMethod = "app" | "sms";

export interface LoginSession {
  id: string;
  date: string;
  time: string;
  device: string;
  browser: string;
  os: string;
  ipAddress: string;
  location: string;
  status: "current" | "active" | "expired";
}

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

export interface ConnectedDevice {
  id: string;
  type: "desktop" | "laptop" | "tablet" | "mobile";
  name: string;
  lastActive: string;
}

export interface PrivacySettings {
  profileVisibility: "all" | "patients" | "staff" | "none";
  appointmentVisibility: "all" | "patients" | "staff";
  patientContactPreference: "any" | "approved" | "none";
  analyticsSharing: boolean;
  marketingEmails: boolean;
}

export interface BackupCode {
  code: string;
  used: boolean;
}

export interface SecurityScoreData {
  score: number;
  total: number;
  percentage: number;
  recommendations: SecurityRecommendation[];
  completedChecks: SecurityCheckItem[];
}

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

export interface SecurityMetrics {
  totalLogins: number;
  uniqueLocations: number;
  activeSessions: number;
  connectedDevices: number;
  daysSinceLastPasswordChange: number;
  twoFactorEnabled: boolean;
}

// ── Mock Data ──

export const mockSecurityScore: SecurityScoreData = {
  score: 78,
  total: 100,
  percentage: 78,
  recommendations: [
    {
      id: "rec-1",
      label: "Enable two-factor authentication",
      severity: "critical",
      completed: true,
    },
    {
      id: "rec-2",
      label: "Update your password",
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
      label: "Remove unused connected devices",
      severity: "medium",
      completed: false,
    },
    {
      id: "rec-5",
      label: "Set profile visibility preferences",
      severity: "low",
      completed: true,
    },
  ],
  completedChecks: [
    { id: "chk-1", label: "Strong password set", completed: true },
    {
      id: "chk-2",
      label: "Two-factor authentication enabled",
      completed: true,
    },
    { id: "chk-3", label: "Active sessions reviewed", completed: true },
    { id: "chk-4", label: "Connected devices managed", completed: false },
    { id: "chk-5", label: "Privacy settings configured", completed: true },
    { id: "chk-6", label: "Recovery options set up", completed: false },
    { id: "chk-7", label: "Login history reviewed", completed: true },
  ],
};

export const mockSecurityMetrics: SecurityMetrics = {
  totalLogins: 142,
  uniqueLocations: 6,
  activeSessions: 3,
  connectedDevices: 4,
  daysSinceLastPasswordChange: 45,
  twoFactorEnabled: true,
};

export const mockLoginHistory: LoginSession[] = [
  {
    id: "login-001",
    date: "2026-07-14",
    time: "08:32 AM",
    device: 'MacBook Pro 16"',
    browser: "Chrome 126.0",
    os: "macOS 14.5",
    ipAddress: "192.168.1.42",
    location: "New York, NY",
    status: "current",
  },
  {
    id: "login-002",
    date: "2026-07-14",
    time: "07:15 AM",
    device: "iPhone 15 Pro",
    browser: "Safari 17.5",
    os: "iOS 17.5",
    ipAddress: "192.168.1.42",
    location: "New York, NY",
    status: "active",
  },
  {
    id: "login-003",
    date: "2026-07-13",
    time: "06:45 PM",
    device: "iPad Air 5",
    browser: "Safari 17.5",
    os: "iPadOS 17.5",
    ipAddress: "10.0.0.15",
    location: "New York, NY",
    status: "active",
  },
  {
    id: "login-004",
    date: "2026-07-13",
    time: "12:10 PM",
    device: "Windows 11 PC",
    browser: "Edge 126.0",
    os: "Windows 11",
    ipAddress: "203.0.113.45",
    location: "Brooklyn, NY",
    status: "active",
  },
  {
    id: "login-005",
    date: "2026-07-12",
    time: "09:30 AM",
    device: 'MacBook Pro 16"',
    browser: "Chrome 126.0",
    os: "macOS 14.5",
    ipAddress: "192.168.1.42",
    location: "New York, NY",
    status: "expired",
  },
  {
    id: "login-006",
    date: "2026-07-11",
    time: "03:20 PM",
    device: "Samsung Galaxy S24",
    browser: "Chrome 125.0",
    os: "Android 14",
    ipAddress: "198.51.100.78",
    location: "Jersey City, NJ",
    status: "expired",
  },
  {
    id: "login-007",
    date: "2026-07-10",
    time: "11:05 AM",
    device: "Lenovo ThinkPad",
    browser: "Firefox 128.0",
    os: "Windows 11",
    ipAddress: "172.16.0.88",
    location: "Boston, MA",
    status: "expired",
  },
  {
    id: "login-008",
    date: "2026-07-09",
    time: "02:45 PM",
    device: 'MacBook Pro 16"',
    browser: "Chrome 126.0",
    os: "macOS 14.5",
    ipAddress: "192.168.1.42",
    location: "New York, NY",
    status: "expired",
  },
];

export const mockActiveSessions: ActiveSession[] = [
  {
    id: "session-001",
    device: 'MacBook Pro 16"',
    browser: "Chrome 126.0",
    os: "macOS 14.5",
    ipAddress: "192.168.1.42",
    location: "New York, NY",
    lastActive: "Active now",
    isCurrent: true,
  },
  {
    id: "session-002",
    device: "iPhone 15 Pro",
    browser: "MediFlow App",
    os: "iOS 17.5",
    ipAddress: "192.168.1.42",
    location: "New York, NY",
    lastActive: "2 minutes ago",
    isCurrent: false,
  },
  {
    id: "session-003",
    device: "iPad Air 5",
    browser: "Safari 17.5",
    os: "iPadOS 17.5",
    ipAddress: "10.0.0.15",
    location: "New York, NY",
    lastActive: "1 hour ago",
    isCurrent: false,
  },
  {
    id: "session-004",
    device: "Windows 11 PC",
    browser: "Edge 126.0",
    os: "Windows 11",
    ipAddress: "203.0.113.45",
    location: "Brooklyn, NY",
    lastActive: "Yesterday at 6:45 PM",
    isCurrent: false,
  },
];

export const mockConnectedDevices: ConnectedDevice[] = [
  {
    id: "dev-001",
    type: "desktop",
    name: 'MacBook Pro 16"',
    lastActive: "Active now",
  },
  {
    id: "dev-002",
    type: "mobile",
    name: "iPhone 15 Pro",
    lastActive: "2 minutes ago",
  },
  {
    id: "dev-003",
    type: "tablet",
    name: "iPad Air 5",
    lastActive: "1 hour ago",
  },
  {
    id: "dev-004",
    type: "laptop",
    name: "Lenovo ThinkPad X1",
    lastActive: "3 days ago",
  },
];

export const mockPrivacySettings: PrivacySettings = {
  profileVisibility: "patients",
  appointmentVisibility: "patients",
  patientContactPreference: "approved",
  analyticsSharing: true,
  marketingEmails: false,
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
  good: "bg-yellow-500",
  strong: "bg-green-500",
  "very-strong": "bg-emerald-500",
};

export function evaluatePasswordStrength(password: string): PasswordStrength {
  if (!password) return "weak";
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  if (/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(password))
    score += 1;

  if (score <= 2) return "weak";
  if (score <= 4) return "fair";
  if (score <= 5) return "good";
  if (score <= 6) return "strong";
  return "very-strong";
}

export const securityTips = [
  {
    icon: "Key",
    title: "Use a strong password",
    description:
      "Combine uppercase, lowercase, numbers, and symbols for maximum protection.",
  },
  {
    icon: "Shield",
    title: "Enable two-factor authentication",
    description:
      "Add an extra layer of security to prevent unauthorized access.",
  },
  {
    icon: "LogOut",
    title: "Sign out of unused sessions",
    description:
      "Regularly review and terminate sessions on devices you no longer use.",
  },
  {
    icon: "Eye",
    title: "Review login history",
    description: "Check for any unrecognized login attempts or locations.",
  },
  {
    icon: "Smartphone",
    title: "Keep devices updated",
    description:
      "Install security updates promptly on all your connected devices.",
  },
];
