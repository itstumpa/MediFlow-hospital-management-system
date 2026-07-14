// ============================================================
// Types & Mock Data — Notifications Center
// ============================================================

import { format, formatDistanceToNow, parseISO } from "date-fns";
import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  Bell,
  Calendar,
  FileText,
  HeartPulse,
  Info,
  MessageSquare,
  Pill,
  Shield,
  XCircle,
} from "lucide-react";

/* ─── Notification Types ─── */

export type NotificationType =
  | "appointment"
  | "prescription"
  | "lab-report"
  | "announcement"
  | "system"
  | "promotion";

export const notificationTypeLabels: Record<NotificationType, string> = {
  appointment: "Appointments",
  prescription: "Prescriptions",
  "lab-report": "Lab Reports",
  announcement: "Announcements",
  system: "System",
  promotion: "Promotions",
};

export const notificationTypeIcons: Record<NotificationType, LucideIcon> = {
  appointment: Calendar,
  prescription: Pill,
  "lab-report": FileText,
  announcement: MessageSquare,
  system: Shield,
  promotion: HeartPulse,
};

export const notificationTypeColors: Record<
  NotificationType,
  { bg: string; text: string; border: string; iconBg: string }
> = {
  appointment: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    iconBg: "bg-blue-100",
  },
  prescription: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    iconBg: "bg-emerald-100",
  },
  "lab-report": {
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
    iconBg: "bg-violet-100",
  },
  announcement: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    iconBg: "bg-amber-100",
  },
  system: {
    bg: "bg-slate-50",
    text: "text-slate-700",
    border: "border-slate-200",
    iconBg: "bg-slate-100",
  },
  promotion: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    iconBg: "bg-rose-100",
  },
};

/* ─── Priority ─── */

export type NotificationPriority = "low" | "normal" | "high" | "urgent";

export const priorityConfig: Record<
  NotificationPriority,
  { label: string; className: string; icon: LucideIcon }
> = {
  low: {
    label: "Low",
    className:
      "bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    icon: Info,
  },
  normal: {
    label: "Normal",
    className:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    icon: Bell,
  },
  high: {
    label: "High",
    className:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
    icon: AlertCircle,
  },
  urgent: {
    label: "Urgent",
    className: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
    icon: XCircle,
  },
};

/* ─── Related Entity ─── */

export interface RelatedDoctor {
  id: string;
  name: string;
  initials: string;
  department: string;
  avatar: string;
}

export interface RelatedAppointment {
  id: string;
  date: string;
  time: string;
  type: string;
  status: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
}

/* ─── Notification ─── */

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string; // ISO string
  read: boolean;
  priority: NotificationPriority;
  relatedDoctor?: RelatedDoctor;
  relatedAppointment?: RelatedAppointment;
  attachments?: Attachment[];
  actionUrl?: string;
  actionLabel?: string;
}

/* ─── Filter & Sort ─── */

export type NotificationFilter =
  | "all"
  | "unread"
  | "appointment"
  | "prescription"
  | "lab-report"
  | "announcement"
  | "system"
  | "promotion";

export type NotificationSort = "newest" | "oldest";

export interface NotificationFilters {
  filter: NotificationFilter;
  sort: NotificationSort;
}

export const DEFAULT_NOTIFICATION_FILTERS: NotificationFilters = {
  filter: "all",
  sort: "newest",
};

/* ─── Stats ─── */

export interface NotificationStats {
  total: number;
  unread: number;
  appointments: number;
  prescriptions: number;
  labReports: number;
  announcements: number;
}

/* ─── Grouped Notifications ─── */

export interface NotificationGroup {
  label: string;
  notifications: Notification[];
}

/* ─── Mock Data ─── */

const now = new Date();

const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    type: "appointment",
    title: "Appointment Confirmed",
    description:
      "Your appointment with Dr. Sarah Mitchell (Cardiology) has been confirmed for tomorrow at 10:30 AM.",
    timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    priority: "high",
    relatedDoctor: {
      id: "doc-1",
      name: "Dr. Sarah Mitchell",
      initials: "SM",
      department: "Cardiology",
      avatar: "",
    },
    relatedAppointment: {
      id: "apt-1",
      date: "2026-07-14",
      time: "10:30 AM",
      type: "Follow-up Consultation",
      status: "confirmed",
    },
    actionUrl: "/dashboard/patient/appointments/apt-1",
    actionLabel: "View Appointment",
  },
  {
    id: "notif-2",
    type: "prescription",
    title: "Prescription Ready for Pickup",
    description:
      "Your prescription for Lisinopril 10mg is ready for pickup at MediFlow Pharmacy.",
    timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
    read: false,
    priority: "normal",
    relatedDoctor: {
      id: "doc-2",
      name: "Dr. James Chen",
      initials: "JC",
      department: "Internal Medicine",
      avatar: "",
    },
    actionUrl: "/dashboard/patient/prescriptions",
    actionLabel: "View Prescription",
  },
  {
    id: "notif-3",
    type: "lab-report",
    title: "Lab Results Available",
    description:
      "Your Complete Blood Count (CBC) and Lipid Panel results are now available.",
    timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
    read: false,
    priority: "high",
    relatedDoctor: {
      id: "doc-3",
      name: "Dr. Emily Rodriguez",
      initials: "ER",
      department: "Pathology",
      avatar: "",
    },
    attachments: [
      {
        id: "att-1",
        name: "CBC_Results.pdf",
        type: "PDF",
        size: "245 KB",
        url: "#",
      },
      {
        id: "att-2",
        name: "Lipid_Panel.pdf",
        type: "PDF",
        size: "189 KB",
        url: "#",
      },
    ],
    actionUrl: "/dashboard/patient/lab-reports",
    actionLabel: "View Report",
  },
  {
    id: "notif-4",
    type: "announcement",
    title: "New Telehealth Services",
    description:
      "MediFlow now offers 24/7 telehealth consultations. Book a virtual visit from the comfort of your home.",
    timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: "normal",
    actionUrl: "/dashboard/patient/appointments/book",
    actionLabel: "Learn More",
  },
  {
    id: "notif-5",
    type: "system",
    title: "Security Alert: New Login",
    description:
      "A new login was detected from Chrome on Windows in New York, NY. If this wasn't you, please secure your account.",
    timestamp: new Date(now.getTime() - 26 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: "urgent",
    actionUrl: "/dashboard/patient/settings/security",
    actionLabel: "Review Activity",
  },
  {
    id: "notif-6",
    type: "appointment",
    title: "Appointment Reminder",
    description:
      "Reminder: You have an appointment with Dr. Michael Torres (Dermatology) in 30 minutes.",
    timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
    read: true,
    priority: "high",
    relatedDoctor: {
      id: "doc-4",
      name: "Dr. Michael Torres",
      initials: "MT",
      department: "Dermatology",
      avatar: "",
    },
    relatedAppointment: {
      id: "apt-2",
      date: "2026-07-13",
      time: "2:00 PM",
      type: "Skin Check",
      status: "confirmed",
    },
    actionUrl: "/dashboard/patient/appointments/apt-2",
    actionLabel: "View Details",
  },
  {
    id: "notif-7",
    type: "prescription",
    title: "Refill Reminder",
    description:
      "Your prescription for Metformin 500mg has 2 refills remaining. Request a refill before it expires.",
    timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: "low",
    relatedDoctor: {
      id: "doc-5",
      name: "Dr. Lisa Park",
      initials: "LP",
      department: "Endocrinology",
      avatar: "",
    },
    actionUrl: "/dashboard/patient/prescriptions",
    actionLabel: "Request Refill",
  },
  {
    id: "notif-8",
    type: "lab-report",
    title: "Lab Report: Thyroid Function Test",
    description:
      "Your TSH, T3, and T4 test results are ready. All values are within normal range.",
    timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: "normal",
    relatedDoctor: {
      id: "doc-6",
      name: "Dr. Robert Kim",
      initials: "RK",
      department: "Endocrinology",
      avatar: "",
    },
    attachments: [
      {
        id: "att-3",
        name: "Thyroid_Function.pdf",
        type: "PDF",
        size: "156 KB",
        url: "#",
      },
    ],
    actionUrl: "/dashboard/patient/lab-reports",
    actionLabel: "View Report",
  },
  {
    id: "notif-9",
    type: "announcement",
    title: "Holiday Hours Schedule",
    description:
      "MediFlow clinics will have modified hours during the upcoming holiday week. Check the schedule.",
    timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: "low",
    actionUrl: "/announcements/holiday-hours",
    actionLabel: "View Schedule",
  },
  {
    id: "notif-10",
    type: "system",
    title: "Profile Updated Successfully",
    description:
      "Your contact information has been updated. If you didn't make this change, please contact support.",
    timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: "low",
    actionUrl: "/dashboard/patient/profile",
    actionLabel: "View Profile",
  },
  {
    id: "notif-11",
    type: "promotion",
    title: "Wellness Package Discount",
    description:
      "Get 20% off our Annual Wellness Package including comprehensive health screening and consultation.",
    timestamp: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: "low",
    actionUrl: "/dashboard/patient/wellness-package",
    actionLabel: "View Offer",
  },
  {
    id: "notif-12",
    type: "appointment",
    title: "Appointment Rescheduled",
    description:
      "Your appointment with Dr. Amanda Foster (Neurology) has been rescheduled to July 20th at 3:00 PM.",
    timestamp: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: "normal",
    relatedDoctor: {
      id: "doc-7",
      name: "Dr. Amanda Foster",
      initials: "AF",
      department: "Neurology",
      avatar: "",
    },
    relatedAppointment: {
      id: "apt-3",
      date: "2026-07-20",
      time: "3:00 PM",
      type: "Neurology Consultation",
      status: "rescheduled",
    },
    actionUrl: "/dashboard/patient/appointments/apt-3",
    actionLabel: "View Appointment",
  },
  {
    id: "notif-13",
    type: "prescription",
    title: "New Prescription Added",
    description:
      "Dr. Kevin Walsh (Psychiatry) has prescribed Sertraline 50mg. Instructions have been added to your medication list.",
    timestamp: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: "normal",
    relatedDoctor: {
      id: "doc-8",
      name: "Dr. Kevin Walsh",
      initials: "KW",
      department: "Psychiatry",
      avatar: "",
    },
    actionUrl: "/dashboard/patient/prescriptions",
    actionLabel: "View Prescription",
  },
  {
    id: "notif-14",
    type: "lab-report",
    title: "Lab Report: Vitamin D Level",
    description:
      "Your Vitamin D test result shows a deficiency. Dr. Lisa Park has added a supplement recommendation.",
    timestamp: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: "high",
    relatedDoctor: {
      id: "doc-5",
      name: "Dr. Lisa Park",
      initials: "LP",
      department: "Endocrinology",
      avatar: "",
    },
    attachments: [
      {
        id: "att-4",
        name: "Vitamin_D_Results.pdf",
        type: "PDF",
        size: "98 KB",
        url: "#",
      },
    ],
    actionUrl: "/dashboard/patient/lab-reports",
    actionLabel: "View Report",
  },
  {
    id: "notif-15",
    type: "announcement",
    title: "New Specialist: Dr. Rachel Green",
    description:
      "Welcome Dr. Rachel Green, our new Rheumatology specialist. She is now accepting new patients.",
    timestamp: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: "low",
    actionUrl: "/doctors/dr-rachel-green",
    actionLabel: "View Profile",
  },
];

/* ─── Helpers ─── */

export function formatNotificationTime(isoString: string): string {
  const date = parseISO(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffHours / 24;

  if (diffHours < 1) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else if (diffHours < 24) {
    return format(date, "h:mm a");
  } else if (diffDays < 7) {
    return format(date, "EEEE");
  } else {
    return format(date, "MMM d, yyyy");
  }
}

export function getNotificationGroupLabel(isoString: string): string {
  const date = parseISO(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays < 1) return "Today";
  if (diffDays < 2) return "Yesterday";
  if (diffDays < 7) return "Earlier This Week";
  return "Older";
}

export function groupNotificationsByDate(
  notifications: Notification[],
): NotificationGroup[] {
  const groups = new Map<string, Notification[]>();

  for (const notification of notifications) {
    const label = getNotificationGroupLabel(notification.timestamp);
    if (!groups.has(label)) {
      groups.set(label, []);
    }
    groups.get(label)!.push(notification);
  }

  const groupOrder = ["Today", "Yesterday", "Earlier This Week", "Older"];
  return groupOrder
    .map((label) => {
      const notifications = groups.get(label);
      if (notifications && notifications.length > 0) {
        return { label, notifications };
      }
      return null;
    })
    .filter((g): g is NotificationGroup => g !== null);
}

export function filterNotifications(
  notifications: Notification[],
  filter: NotificationFilter,
): Notification[] {
  switch (filter) {
    case "unread":
      return notifications.filter((n) => !n.read);
    case "all":
      return notifications;
    default:
      return notifications.filter((n) => n.type === filter);
  }
}

export function sortNotifications(
  notifications: Notification[],
  sort: NotificationSort,
): Notification[] {
  return [...notifications].sort((a, b) => {
    const timeA = parseISO(a.timestamp).getTime();
    const timeB = parseISO(b.timestamp).getTime();
    return sort === "newest" ? timeB - timeA : timeA - timeB;
  });
}

export function computeNotificationStats(
  notifications: Notification[],
): NotificationStats {
  return {
    total: notifications.length,
    unread: notifications.filter((n) => !n.read).length,
    appointments: notifications.filter((n) => n.type === "appointment").length,
    prescriptions: notifications.filter((n) => n.type === "prescription")
      .length,
    labReports: notifications.filter((n) => n.type === "lab-report").length,
    announcements: notifications.filter(
      (n) =>
        n.type === "announcement" ||
        n.type === "system" ||
        n.type === "promotion",
    ).length,
  };
}

export function getUniqueDoctors(
  notifications: Notification[],
): RelatedDoctor[] {
  const doctors = new Map<string, RelatedDoctor>();
  for (const n of notifications) {
    if (n.relatedDoctor) {
      doctors.set(n.relatedDoctor.id, n.relatedDoctor);
    }
  }
  return Array.from(doctors.values());
}

export function getUniqueAppointmentTypes(
  notifications: Notification[],
): string[] {
  const types = new Set<string>();
  for (const n of notifications) {
    if (n.relatedAppointment?.type) {
      types.add(n.relatedAppointment.type);
    }
  }
  return Array.from(types);
}

/* ─── Exports ─── */

export { mockNotifications };
