/* ============================================
   Security & Privacy — Mock Data
   ============================================ */

export interface LoginEntry {
  id: string;
  date: string;
  time: string;
  ip: string;
  browser: string;
  location: string;
  status: "Successful" | "Failed" | "Pending";
}

export interface DeviceEntry {
  id: string;
  device: string;
  browser: string;
  os: string;
  lastActive: string;
}

export interface PrivacySetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export interface RecoveryCode {
  id: string;
  code: string;
  used: boolean;
}

/* ---------- Login History ---------- */

export const loginHistory: LoginEntry[] = [
  {
    id: "lh-1",
    date: "Jul 13, 2026",
    time: "09:42 AM",
    ip: "192.168.1.101",
    browser: "Chrome 126.0 / Windows 11",
    location: "New York, NY, US",
    status: "Successful",
  },
  {
    id: "lh-2",
    date: "Jul 12, 2026",
    time: "11:15 PM",
    ip: "203.0.113.45",
    browser: "Safari 17.5 / macOS 14.5",
    location: "San Francisco, CA, US",
    status: "Successful",
  },
  {
    id: "lh-3",
    date: "Jul 11, 2026",
    time: "06:30 AM",
    ip: "198.51.100.22",
    browser: "Firefox 128.0 / Linux",
    location: "Chicago, IL, US",
    status: "Failed",
  },
  {
    id: "lh-4",
    date: "Jul 10, 2026",
    time: "08:00 AM",
    ip: "192.168.1.101",
    browser: "Chrome 126.0 / Windows 11",
    location: "New York, NY, US",
    status: "Successful",
  },
  {
    id: "lh-5",
    date: "Jul 08, 2026",
    time: "02:45 PM",
    ip: "72.14.192.1",
    browser: "Edge 125.0 / Windows 11",
    location: "Boston, MA, US",
    status: "Successful",
  },
  {
    id: "lh-6",
    date: "Jul 06, 2026",
    time: "10:10 PM",
    ip: "185.220.101.34",
    browser: "Chrome 125.0 / Android 14",
    location: "Miami, FL, US",
    status: "Failed",
  },
  {
    id: "lh-7",
    date: "Jul 04, 2026",
    time: "07:22 AM",
    ip: "192.168.1.101",
    browser: "Chrome 126.0 / Windows 11",
    location: "New York, NY, US",
    status: "Successful",
  },
];

/* ---------- Connected Devices ---------- */

export const connectedDevices: DeviceEntry[] = [
  {
    id: "dev-1",
    device: "Dell XPS 15",
    browser: "Chrome 126.0",
    os: "Windows 11 Pro",
    lastActive: "Active now",
  },
  {
    id: "dev-2",
    device: "iPhone 16 Pro",
    browser: "Safari 17.5",
    os: "iOS 18.0",
    lastActive: "2 hours ago",
  },
  {
    id: "dev-3",
    device: 'iPad Air 13"',
    browser: "Safari 17.5",
    os: "iPadOS 18.0",
    lastActive: "Yesterday",
  },
  {
    id: "dev-4",
    device: "MacBook Pro 16",
    browser: "Firefox 128.0",
    os: "macOS 14.5 Sequoia",
    lastActive: "3 days ago",
  },
  {
    id: "dev-5",
    device: "Samsung Galaxy S25",
    browser: "Samsung Internet 25.0",
    os: "Android 15",
    lastActive: "1 week ago",
  },
];

/* ---------- Privacy Settings ---------- */

export const privacySettings: PrivacySetting[] = [
  {
    id: "pr-1",
    label: "Profile Visibility",
    description:
      "Make your profile visible to doctors when booking appointments.",
    enabled: true,
  },
  {
    id: "pr-2",
    label: "Medical Data Sharing",
    description:
      "Allow anonymized medical data to be shared with partner hospitals for better care coordination.",
    enabled: true,
  },
  {
    id: "pr-3",
    label: "Marketing Emails",
    description:
      "Receive promotional offers, health tips, and newsletter updates.",
    enabled: false,
  },
  {
    id: "pr-4",
    label: "Research Participation",
    description:
      "Contribute anonymized health data to medical research studies.",
    enabled: false,
  },
];

/* ---------- Recovery Codes ---------- */

export const recoveryCodes: RecoveryCode[] = [
  { id: "rc-1", code: "A1B2-C3D4-E5F6-G7H8", used: false },
  { id: "rc-2", code: "I9J0-K1L2-M3N4-O5P6", used: false },
  { id: "rc-3", code: "Q7R8-S9T0-U1V2-W3X4", used: false },
  { id: "rc-4", code: "Y5Z6-A7B8-C9D0-E1F2", used: false },
  { id: "rc-5", code: "G3H4-I5J6-K7L8-M9N0", used: false },
  { id: "rc-6", code: "O1P2-Q3R4-S5T6-U7V8", used: false },
  { id: "rc-7", code: "W9X0-Y1Z2-A3B4-C5D6", used: false },
  { id: "rc-8", code: "E7F8-G9H0-I1J2-K3L4", used: false },
];
