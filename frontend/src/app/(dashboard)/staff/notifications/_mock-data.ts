import { type LucideIcon } from "lucide-react";

/* ══════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════ */

export type NotificationCategory =
  | "appointments"
  | "billing"
  | "patients"
  | "doctors"
  | "announcements"
  | "emergency";

export type NotificationPriority = "low" | "normal" | "high" | "urgent";

export type NotificationStatus = "read" | "unread";

export type AnnouncementType =
  | "hospital-update"
  | "holiday"
  | "doctor-leave"
  | "maintenance"
  | "system-update";

export type ReminderType =
  | "appointment"
  | "payment"
  | "follow-up"
  | "lab-report";

export type EmergencyType =
  | "critical-patient"
  | "code-blue"
  | "emergency-doctor"
  | "urgent-message";

export interface NotificationItem {
  id: string;
  icon: LucideIcon;
  title: string;
  message: string;
  timestamp: Date;
  category: NotificationCategory;
  priority: NotificationPriority;
  status: NotificationStatus;
  actionable?: boolean;
  actionLabel?: string;
}

export interface Announcement {
  id: string;
  type: AnnouncementType;
  title: string;
  message: string;
  date: Date;
  author: string;
  pinned: boolean;
  priority: NotificationPriority;
}

export interface Reminder {
  id: string;
  type: ReminderType;
  title: string;
  description: string;
  dueDate: Date;
  priority: NotificationPriority;
  completed: boolean;
}

export interface EmergencyAlert {
  id: string;
  type: EmergencyType;
  title: string;
  message: string;
  timestamp: Date;
  severity: "critical" | "moderate" | "minor";
  location?: string;
  acknowledged: boolean;
}

export interface NotificationStat {
  id: string;
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  change: number;
  trend: "up" | "down" | "neutral";
  suffix?: string;
}

export type NotificationFilter =
  | "all"
  | "unread"
  | "appointments"
  | "billing"
  | "patients"
  | "doctors"
  | "announcements"
  | "emergency";

/* ══════════════════════════════════════════════
   Helpers
   ══════════════════════════════════════════════ */

function hoursAgo(h: number): Date {
  const d = new Date();
  d.setHours(d.getHours() - h);
  return d;
}

function daysAgo(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(8, 0, 0, 0);
  return d;
}

function laterToday(): Date {
  const d = new Date();
  d.setHours(d.getHours() + 3);
  return d;
}

function tomorrow(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(9, 0, 0, 0);
  return d;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/* ══════════════════════════════════════════════
   Priority config
   ══════════════════════════════════════════════ */

export const priorityConfig: Record<
  NotificationPriority,
  { label: string; dot: string; class: string }
> = {
  urgent: {
    label: "Urgent",
    dot: "bg-red-500",
    class:
      "bg-red-50 text-red-700 ring-1 ring-red-600/20 dark:bg-red-950/30 dark:text-red-400 dark:ring-red-500/30",
  },
  high: {
    label: "High",
    dot: "bg-amber-500",
    class:
      "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 dark:bg-amber-950/30 dark:text-amber-400 dark:ring-amber-500/30",
  },
  normal: {
    label: "Normal",
    dot: "bg-blue-500",
    class:
      "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-950/30 dark:text-blue-400 dark:ring-blue-500/30",
  },
  low: {
    label: "Low",
    dot: "bg-slate-400",
    class:
      "bg-slate-50 text-slate-600 ring-1 ring-slate-400/20 dark:bg-slate-800/50 dark:text-slate-400 dark:ring-slate-500/30",
  },
};

/* ══════════════════════════════════════════════
   Category config
   ══════════════════════════════════════════════ */

export const categoryConfig: Record<
  NotificationCategory,
  { label: string; color: string }
> = {
  appointments: { label: "Appointments", color: "blue" },
  billing: { label: "Billing", color: "violet" },
  patients: { label: "Patients", color: "emerald" },
  doctors: { label: "Doctors", color: "cyan" },
  announcements: { label: "Announcements", color: "amber" },
  emergency: { label: "Emergency", color: "rose" },
};

/* ══════════════════════════════════════════════
   Notification filters
   ══════════════════════════════════════════════ */

export const filterOptions: {
  value: NotificationFilter;
  label: string;
}[] = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "appointments", label: "Appointments" },
  { value: "billing", label: "Billing" },
  { value: "patients", label: "Patients" },
  { value: "doctors", label: "Doctors" },
  { value: "announcements", label: "Announcements" },
  { value: "emergency", label: "Emergency" },
];

/* ══════════════════════════════════════════════
   Notification stats
   ══════════════════════════════════════════════ */

import {
  AlertTriangle,
  Bell,
  CalendarClock,
  HeartPulse,
  Megaphone,
  MessageCircle,
} from "lucide-react";

export const notificationStats: NotificationStat[] = [
  {
    id: "unread",
    label: "Unread",
    value: 12,
    icon: Bell,
    color: "blue",
    change: 3,
    trend: "up",
  },
  {
    id: "today",
    label: "Today's Notifications",
    value: 24,
    icon: MessageCircle,
    color: "violet",
    change: 8,
    trend: "up",
  },
  {
    id: "announcements",
    label: "Announcements",
    value: 6,
    icon: Megaphone,
    color: "amber",
    change: 1,
    trend: "up",
  },
  {
    id: "emergency",
    label: "Emergency Alerts",
    value: 4,
    icon: AlertTriangle,
    color: "rose",
    change: 2,
    trend: "up",
  },
  {
    id: "reminders",
    label: "Appointment Reminders",
    value: 8,
    icon: CalendarClock,
    color: "emerald",
    change: 5,
    trend: "up",
  },
  {
    id: "critical",
    label: "Critical Alerts",
    value: 2,
    icon: HeartPulse,
    color: "rose",
    change: 0,
    trend: "neutral",
  },
];

/* ══════════════════════════════════════════════
   Notifications
   ══════════════════════════════════════════════ */

import {
  Ambulance,
  ArrowRightLeft,
  Building,
  Calendar,
  CalendarX,
  ClipboardList,
  Clock,
  CreditCard,
  DollarSign,
  FileText,
  FlaskConical,
  Heart,
  Pill,
  Settings,
  ShieldAlert,
  Stethoscope,
  Syringe,
  UserCheck,
  UserMinus,
  UserPlus,
} from "lucide-react";

export const notifications: NotificationItem[] = [
  {
    id: "NOT-001",
    icon: Calendar,
    title: "Appointment Confirmed",
    message:
      "Sarah Chen confirmed for Cardiology check-up tomorrow at 10:00 AM with Dr. Sarah Chen.",
    timestamp: hoursAgo(1),
    category: "appointments",
    priority: "high",
    status: "unread",
    actionable: true,
    actionLabel: "View Details",
  },
  {
    id: "NOT-002",
    icon: UserPlus,
    title: "New Patient Registered",
    message:
      "John Smith (P-1024) has been registered as a new patient. Please complete the intake process.",
    timestamp: hoursAgo(2),
    category: "patients",
    priority: "normal",
    status: "unread",
  },
  {
    id: "NOT-003",
    icon: CreditCard,
    title: "Payment Received",
    message:
      "Payment of $250.00 received from Marcus Webb for Invoice #INV-2024-0421.",
    timestamp: hoursAgo(3),
    category: "billing",
    priority: "normal",
    status: "read",
  },
  {
    id: "NOT-004",
    icon: ClipboardList,
    title: "Doctor Schedule Updated",
    message:
      "Dr. Michael Kim's schedule has been updated for next week. New slots available on Thursday.",
    timestamp: hoursAgo(4),
    category: "doctors",
    priority: "low",
    status: "read",
  },
  {
    id: "NOT-005",
    icon: Settings,
    title: "System Maintenance Tonight",
    message:
      "The clinic management system will undergo maintenance from 2:00 AM to 4:00 AM. Expect brief downtime.",
    timestamp: hoursAgo(5),
    category: "announcements",
    priority: "high",
    status: "unread",
  },
  {
    id: "NOT-006",
    icon: ShieldAlert,
    title: "Code Blue — Ward 3",
    message:
      "Code Blue activated in Ward 3, Room 312. Immediate response team required.",
    timestamp: hoursAgo(1),
    category: "emergency",
    priority: "urgent",
    status: "unread",
    actionable: true,
    actionLabel: "Respond",
  },
  {
    id: "NOT-007",
    icon: FlaskConical,
    title: "Lab Results Ready",
    message:
      "Lab results for Patient Emma Wilson (P-1024) are now available. Abnormal markers detected.",
    timestamp: hoursAgo(2),
    category: "patients",
    priority: "high",
    status: "unread",
    actionable: true,
    actionLabel: "View Results",
  },
  {
    id: "NOT-008",
    icon: CalendarX,
    title: "Appointment Cancelled",
    message:
      "Emily Davis has cancelled her 2:00 PM appointment with Dr. Rodriguez.",
    timestamp: hoursAgo(3),
    category: "appointments",
    priority: "normal",
    status: "read",
  },
  {
    id: "NOT-009",
    icon: DollarSign,
    title: "Payment Overdue",
    message:
      "Invoice #INV-2024-0398 for George Kaplan is now 15 days overdue. Total due: $180.00.",
    timestamp: hoursAgo(6),
    category: "billing",
    priority: "high",
    status: "unread",
    actionable: true,
    actionLabel: "Send Reminder",
  },
  {
    id: "NOT-010",
    icon: UserCheck,
    title: "New Doctor Onboarded",
    message:
      "Dr. Olivia Martinez has joined the Pediatrics department. Orientation scheduled for Friday.",
    timestamp: hoursAgo(8),
    category: "doctors",
    priority: "low",
    status: "read",
  },
  {
    id: "NOT-011",
    icon: Building,
    title: "Holiday Notice — Independence Day",
    message:
      "The clinic will be closed on July 4th for Independence Day. Limited emergency staff available.",
    timestamp: daysAgo(1),
    category: "announcements",
    priority: "normal",
    status: "read",
  },
  {
    id: "NOT-012",
    icon: Heart,
    title: "Critical Patient in ER",
    message:
      "Critical patient admitted to ER — Room 204. Cardiac arrest suspected. Cardiology team notified.",
    timestamp: hoursAgo(1),
    category: "emergency",
    priority: "urgent",
    status: "unread",
    actionable: true,
    actionLabel: "View Details",
  },
  {
    id: "NOT-013",
    icon: Clock,
    title: "Follow-up Reminder",
    message:
      "Reminder: Michael Brown is due for a follow-up consultation regarding his recent surgery.",
    timestamp: hoursAgo(5),
    category: "patients",
    priority: "normal",
    status: "unread",
  },
  {
    id: "NOT-014",
    icon: Pill,
    title: "Prescription Refill Request",
    message:
      "Lisa Thompson has requested a refill for her blood pressure medication (Amlodipine 10mg).",
    timestamp: hoursAgo(7),
    category: "patients",
    priority: "normal",
    status: "read",
    actionable: true,
    actionLabel: "Process",
  },
  {
    id: "NOT-015",
    icon: Calendar,
    title: "Department Meeting Tomorrow",
    message:
      "All staff: Quarterly department meeting tomorrow at 8:00 AM in Conference Room B.",
    timestamp: hoursAgo(10),
    category: "announcements",
    priority: "low",
    status: "read",
  },
  {
    id: "NOT-016",
    icon: FileText,
    title: "Abnormal Lab Results",
    message:
      "Patient James Taylor's blood work shows elevated liver enzymes. Follow-up recommended within 48 hours.",
    timestamp: hoursAgo(4),
    category: "patients",
    priority: "high",
    status: "unread",
    actionable: true,
    actionLabel: "Review Chart",
  },
  {
    id: "NOT-017",
    icon: DollarSign,
    title: "Insurance Verification Needed",
    message:
      "Insurance verification required for Patient Maria Garcia before scheduled procedure on July 16th.",
    timestamp: hoursAgo(6),
    category: "billing",
    priority: "normal",
    status: "unread",
    actionable: true,
    actionLabel: "Verify",
  },
  {
    id: "NOT-018",
    icon: ArrowRightLeft,
    title: "Staff Schedule Change",
    message:
      "Nurse assignment changes for tomorrow's morning shift. Updated roster available.",
    timestamp: hoursAgo(9),
    category: "doctors",
    priority: "low",
    status: "read",
  },
  {
    id: "NOT-019",
    icon: Ambulance,
    title: "Emergency Doctor Request",
    message:
      "Cardiology department requesting additional doctor support. Multiple critical patients in ER.",
    timestamp: hoursAgo(1),
    category: "emergency",
    priority: "urgent",
    status: "unread",
    actionable: true,
    actionLabel: "Volunteer",
  },
  {
    id: "NOT-020",
    icon: Calendar,
    title: "Appointment Rescheduled",
    message:
      "Lisa Thompson's appointment has been moved from July 15th to July 17th at 11:00 AM.",
    timestamp: hoursAgo(5),
    category: "appointments",
    priority: "normal",
    status: "read",
  },
  {
    id: "NOT-021",
    icon: Megaphone,
    title: "New Policy Update",
    message:
      "Updated patient check-in procedures effective next Monday. Mandatory training session for all front desk staff.",
    timestamp: hoursAgo(3),
    category: "announcements",
    priority: "high",
    status: "unread",
  },
  {
    id: "NOT-022",
    icon: Stethoscope,
    title: "Doctor Availability Change",
    message:
      "Dr. James Wilson is now available for additional consultations this afternoon (2:00–5:00 PM).",
    timestamp: hoursAgo(2),
    category: "doctors",
    priority: "normal",
    status: "unread",
  },
  {
    id: "NOT-023",
    icon: Syringe,
    title: "Vaccination Drive",
    message:
      "Free flu vaccination drive scheduled for July 20th. Sign up to volunteer at the registration desk.",
    timestamp: daysAgo(1),
    category: "announcements",
    priority: "normal",
    status: "read",
  },
  {
    id: "NOT-024",
    icon: CreditCard,
    title: "Refund Processed",
    message:
      "Refund of $75.00 has been processed for Patient Carlos Mendez (overpayment on invoice #INV-2024-0415).",
    timestamp: hoursAgo(8),
    category: "billing",
    priority: "low",
    status: "read",
  },
];

/* ══════════════════════════════════════════════
   Announcements
   ══════════════════════════════════════════════ */

export const announcements: Announcement[] = [
  {
    id: "ANN-001",
    type: "hospital-update",
    title: "New Wing Opening",
    message:
      "The new east wing of the hospital will open on August 1st, featuring 50 new patient rooms, a state-of-the-art imaging center, and expanded emergency department.",
    date: daysAgo(0),
    author: "Administration",
    pinned: true,
    priority: "high",
  },
  {
    id: "ANN-002",
    type: "holiday",
    title: "Independence Day Schedule",
    message:
      "The clinic will operate on a reduced schedule on July 4th. Emergency services will remain fully staffed. Regular operations resume July 5th.",
    date: daysAgo(1),
    author: "HR Department",
    pinned: true,
    priority: "normal",
  },
  {
    id: "ANN-003",
    type: "doctor-leave",
    title: "Dr. Wilson on Leave",
    message:
      "Dr. James Wilson will be on annual leave from July 18th to July 25th. Patients have been reassigned to Dr. Patel and Dr. Lee.",
    date: daysAgo(2),
    author: "Scheduling Office",
    pinned: false,
    priority: "high",
  },
  {
    id: "ANN-004",
    type: "maintenance",
    title: "Elevator Maintenance",
    message:
      "The west wing elevators will be under maintenance on July 16th from 9:00 PM to 5:00 AM. Please use the east wing elevators during this time.",
    date: daysAgo(3),
    author: "Facilities Team",
    pinned: false,
    priority: "low",
  },
  {
    id: "ANN-005",
    type: "system-update",
    title: "EMR System Upgrade v3.2",
    message:
      "The Electronic Medical Records system will be upgraded to version 3.2 on July 22nd. New features include improved lab integration and faster search. Training materials available in the staff portal.",
    date: daysAgo(4),
    author: "IT Department",
    pinned: false,
    priority: "normal",
  },
  {
    id: "ANN-006",
    type: "hospital-update",
    title: "Quarterly Staff Meeting",
    message:
      "Mandatory quarterly staff meeting on July 28th at 8:00 AM in the main auditorium. Agenda includes performance review, new protocols, and Q&A session.",
    date: daysAgo(5),
    author: "Administration",
    pinned: true,
    priority: "normal",
  },
];

/* ══════════════════════════════════════════════
   Reminders
   ══════════════════════════════════════════════ */

export const reminders: Reminder[] = [
  {
    id: "REM-001",
    type: "appointment",
    title: "Sarah Chen — Cardiology",
    description:
      "Upcoming appointment tomorrow at 10:00 AM with Dr. Sarah Chen. Pre-appointment checklist pending.",
    dueDate: tomorrow(),
    priority: "high",
    completed: false,
  },
  {
    id: "REM-002",
    type: "payment",
    title: "Invoice #INV-2024-0398",
    description:
      "Overdue payment of $180.00 for George Kaplan. Second reminder notice to be sent.",
    dueDate: daysAgo(5),
    priority: "high",
    completed: false,
  },
  {
    id: "REM-003",
    type: "follow-up",
    title: "Michael Brown — Post-Surgery",
    description:
      "Follow-up call scheduled for post-surgery check. Patient hasn't responded to initial outreach.",
    dueDate: laterToday(),
    priority: "normal",
    completed: false,
  },
  {
    id: "REM-004",
    type: "lab-report",
    title: "Emma Wilson — Blood Work",
    description:
      "Lab results ready for review. Abnormal liver enzymes detected — recommend follow-up within 48 hours.",
    dueDate: tomorrow(),
    priority: "high",
    completed: false,
  },
  {
    id: "REM-005",
    type: "appointment",
    title: "James Taylor — Prescription Renewal",
    description:
      "Amlodipine 10mg prescription due for renewal. Patient requested 90-day supply.",
    dueDate: laterToday(),
    priority: "normal",
    completed: true,
  },
  {
    id: "REM-006",
    type: "follow-up",
    title: "Maria Garcia — Insurance",
    description:
      "Follow up on insurance verification before scheduled procedure on July 16th.",
    dueDate: tomorrow(),
    priority: "normal",
    completed: false,
  },
];

/* ══════════════════════════════════════════════
   Emergency Alerts
   ══════════════════════════════════════════════ */

export const emergencyAlerts: EmergencyAlert[] = [
  {
    id: "ALR-001",
    type: "critical-patient",
    title: "Critical Patient in ER",
    message:
      "Patient admitted with suspected cardiac arrest. Cardiology team and crash cart dispatched to ER Room 204.",
    timestamp: hoursAgo(0.5),
    severity: "critical",
    location: "ER — Room 204",
    acknowledged: false,
  },
  {
    id: "ALR-002",
    type: "code-blue",
    title: "Code Blue — Ward 3",
    message:
      "Code Blue activated in Ward 3, Room 312. Immediate resuscitation team response required.",
    timestamp: hoursAgo(1),
    severity: "critical",
    location: "Ward 3 — Room 312",
    acknowledged: false,
  },
  {
    id: "ALR-003",
    type: "emergency-doctor",
    title: "Cardiology Backup Needed",
    message:
      "ER requesting additional Cardiology support. Three critical patients in triage requiring immediate specialist attention.",
    timestamp: hoursAgo(1.5),
    severity: "moderate",
    location: "Emergency Department",
    acknowledged: false,
  },
  {
    id: "ALR-004",
    type: "urgent-message",
    title: "Staff Shortage — Night Shift",
    message:
      "Urgent: Two nurses called in sick for the night shift. All available staff please report to staffing office.",
    timestamp: hoursAgo(3),
    severity: "moderate",
    location: "Hospital Wide",
    acknowledged: true,
  },
  {
    id: "ALR-005",
    type: "critical-patient",
    title: "Pediatric Emergency",
    message:
      "7-year-old patient with severe asthma attack being admitted. Respiratory team and Pediatrics on standby.",
    timestamp: hoursAgo(4),
    severity: "critical",
    location: "ER — Room 108",
    acknowledged: true,
  },
];

/* ══════════════════════════════════════════════
   Color map
   ══════════════════════════════════════════════ */

export const colorMap: Record<string, string> = {
  emerald:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  violet:
    "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
  rose: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  cyan: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400",
};

/* ══════════════════════════════════════════════
   Announcement type config
   ══════════════════════════════════════════════ */

export const announcementTypeConfig: Record<
  AnnouncementType,
  { label: string; icon: LucideIcon; color: string }
> = {
  "hospital-update": {
    label: "Hospital Update",
    icon: Building,
    color: "blue",
  },
  holiday: {
    label: "Holiday Notice",
    icon: Calendar,
    color: "amber",
  },
  "doctor-leave": {
    label: "Doctor Leave",
    icon: UserMinus,
    color: "violet",
  },
  maintenance: {
    label: "Maintenance",
    icon: Settings,
    color: "cyan",
  },
  "system-update": {
    label: "System Update",
    icon: ClipboardList,
    color: "emerald",
  },
};

/* ══════════════════════════════════════════════
   Reminder type config
   ══════════════════════════════════════════════ */

export const reminderTypeConfig: Record<
  ReminderType,
  { label: string; icon: LucideIcon }
> = {
  appointment: { label: "Appointment", icon: CalendarClock },
  payment: { label: "Payment", icon: DollarSign },
  "follow-up": { label: "Follow-up", icon: Clock },
  "lab-report": { label: "Lab Report", icon: FlaskConical },
};

/* ══════════════════════════════════════════════
   Emergency type config
   ══════════════════════════════════════════════ */

export const emergencyTypeConfig: Record<
  EmergencyType,
  { label: string; icon: LucideIcon; severityColor: string }
> = {
  "critical-patient": {
    label: "Critical Patient",
    icon: Heart,
    severityColor: "rose",
  },
  "code-blue": {
    label: "Code Blue",
    icon: ShieldAlert,
    severityColor: "rose",
  },
  "emergency-doctor": {
    label: "Doctor Request",
    icon: Ambulance,
    severityColor: "amber",
  },
  "urgent-message": {
    label: "Urgent Message",
    icon: AlertTriangle,
    severityColor: "amber",
  },
};

/* ══════════════════════════════════════════════
   Severity config
   ══════════════════════════════════════════════ */

export const severityConfig: Record<
  string,
  { label: string; class: string; dot: string }
> = {
  critical: {
    label: "Critical",
    class:
      "bg-red-50 text-red-700 ring-1 ring-red-600/20 dark:bg-red-950/30 dark:text-red-400 dark:ring-red-500/30",
    dot: "bg-red-500",
  },
  moderate: {
    label: "Moderate",
    class:
      "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 dark:bg-amber-950/30 dark:text-amber-400 dark:ring-amber-500/30",
    dot: "bg-amber-500",
  },
  minor: {
    label: "Minor",
    class:
      "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-950/30 dark:text-blue-400 dark:ring-blue-500/30",
    dot: "bg-blue-500",
  },
};
