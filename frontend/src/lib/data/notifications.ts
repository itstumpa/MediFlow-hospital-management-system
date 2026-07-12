// ============================================================
// Types & Mock Data — Notifications Center
// ============================================================

export type NotificationCategory =
  | "appointments"
  | "doctors"
  | "patients"
  | "articles"
  | "system"
  | "messages";

export type NotificationPriority = "low" | "medium" | "high" | "critical";

export type NotificationGroup = "today" | "yesterday" | "thisWeek" | "older";

export interface NotificationRelatedUser {
  name: string;
  avatar: string;
  role: string;
}

export interface NotificationDetailContent {
  fullDescription: string;
  relatedLinks?: { label: string; href: string }[];
  activity?: { action: string; timestamp: string }[];
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  archived: boolean;
  category: NotificationCategory;
  priority: NotificationPriority;
  relatedUser?: NotificationRelatedUser;
  detailContent?: NotificationDetailContent;
}

export interface NotificationStats {
  total: number;
  unread: number;
  critical: number;
  appointments: number;
  system: number;
  messages: number;
}

export interface NotificationSettings {
  appointmentAlerts: boolean;
  newPatientAlerts: boolean;
  doctorUpdates: boolean;
  cmsNotifications: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

// ─── Category config ───

export const categoryConfig: Record<
  NotificationCategory,
  { label: string; color: string; bg: string; icon: string }
> = {
  appointments: {
    label: "Appointments",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    icon: "CalendarCheck",
  },
  doctors: {
    label: "Doctors",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
    icon: "Stethoscope",
  },
  patients: {
    label: "Patients",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    icon: "UserPlus",
  },
  articles: {
    label: "Articles",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-500/10",
    icon: "FileText",
  },
  system: {
    label: "System",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    icon: "Bell",
  },
  messages: {
    label: "Messages",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-500/10",
    icon: "MessageSquare",
  },
};

export const priorityConfig: Record<
  NotificationPriority,
  { label: string; color: string; dot: string }
> = {
  low: {
    label: "Low",
    color: "text-slate-500 bg-slate-50 dark:text-slate-400 dark:bg-slate-800",
    dot: "bg-slate-400",
  },
  medium: {
    label: "Medium",
    color: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10",
    dot: "bg-blue-500",
  },
  high: {
    label: "High",
    color:
      "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10",
    dot: "bg-amber-500",
  },
  critical: {
    label: "Critical",
    color: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-500/10",
    dot: "bg-red-500",
  },
};

// ─── Mock data ───

export const mockNotifications: Notification[] = [
  // ── TODAY ──
  {
    id: "notif-001",
    title: "New appointment booked",
    description:
      "Sarah Chen booked a cardiology consultation for tomorrow at 10:00 AM with Dr. Johnson.",
    timestamp: "2026-07-12T09:45:00",
    read: false,
    archived: false,
    category: "appointments",
    priority: "medium",
    relatedUser: {
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      role: "Patient",
    },
    detailContent: {
      fullDescription:
        "Sarah Chen has booked a new cardiology consultation appointment. The appointment is scheduled for tomorrow (July 13, 2026) at 10:00 AM with Dr. Sarah Johnson in the Cardiology Department. Estimated duration is 45 minutes. Please ensure all prior medical records are prepared.",
      relatedLinks: [
        { label: "View Appointment", href: "/admin/appointments/APT-2026-001" },
        { label: "View Patient Profile", href: "/admin/patients/PAT-0042" },
      ],
      activity: [
        {
          action: "Appointment created by patient portal",
          timestamp: "2026-07-12T09:45:00",
        },
        {
          action: "Confirmation sent to patient email",
          timestamp: "2026-07-12T09:46:00",
        },
      ],
    },
  },
  {
    id: "notif-002",
    title: "Patient record updated",
    description:
      "Dr. Mitchell updated John Doe's medical history — new lab results added.",
    timestamp: "2026-07-12T09:15:00",
    read: false,
    archived: false,
    category: "patients",
    priority: "low",
    relatedUser: {
      name: "Dr. Mitchell",
      avatar:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
      role: "Physician",
    },
  },
  {
    id: "notif-003",
    title: "System backup completed",
    description: "Daily database backup completed successfully. Size: 2.4 GB.",
    timestamp: "2026-07-12T08:00:00",
    read: false,
    archived: false,
    category: "system",
    priority: "low",
    detailContent: {
      fullDescription:
        "The automated daily database backup has completed successfully. Backup size: 2.4 GB. Duration: 12 minutes. Location: s3://mediflow-backups/daily/2026-07-12/. No errors were reported during the process.",
      relatedLinks: [
        { label: "View Backup Logs", href: "/admin/settings?tab=backups" },
      ],
      activity: [
        { action: "Backup initiated", timestamp: "2026-07-12T07:48:00" },
        {
          action: "Backup completed successfully",
          timestamp: "2026-07-12T08:00:00",
        },
      ],
    },
  },
  {
    id: "notif-004",
    title: "Appointment cancelled",
    description:
      "Michael Brown cancelled his follow-up visit scheduled for July 14.",
    timestamp: "2026-07-12T06:30:00",
    read: false,
    archived: false,
    category: "appointments",
    priority: "high",
    relatedUser: {
      name: "Michael Brown",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      role: "Patient",
    },
    detailContent: {
      fullDescription:
        "Michael Brown has cancelled his follow-up appointment scheduled for July 14, 2026 at 2:00 PM with Dr. Williams. Cancellation reason: scheduling conflict. No reschedule request was submitted. The time slot is now available for other patients.",
      relatedLinks: [
        { label: "View Appointment", href: "/admin/appointments" },
        {
          label: "Notify Available Slot",
          href: "/admin/appointments?slot=free",
        },
      ],
      activity: [
        {
          action: "Cancellation submitted via patient portal",
          timestamp: "2026-07-12T06:30:00",
        },
        {
          action: "Notification sent to Dr. Williams",
          timestamp: "2026-07-12T06:31:00",
        },
      ],
    },
  },
  {
    id: "notif-005",
    title: "New doctor onboarded",
    description:
      "Dr. Emily Watson has completed onboarding and is now available for consultations.",
    timestamp: "2026-07-12T04:00:00",
    read: true,
    archived: false,
    category: "doctors",
    priority: "medium",
    relatedUser: {
      name: "Dr. Emily Watson",
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      role: "Neurologist",
    },
    detailContent: {
      fullDescription:
        "Dr. Emily Watson has successfully completed the onboarding process. She is now available for patient consultations in the Neurology Department. Specialties include movement disorders and neuromuscular medicine. Her initial schedule is set for Monday, Wednesday, and Friday.",
      relatedLinks: [
        { label: "View Doctor Profile", href: "/admin/doctors/DOC-004" },
        {
          label: "Configure Schedule",
          href: "/admin/doctors/DOC-004/schedule",
        },
      ],
      activity: [
        {
          action: "Onboarding checklist completed",
          timestamp: "2026-07-12T03:45:00",
        },
        {
          action: "Schedule published to portal",
          timestamp: "2026-07-12T04:00:00",
        },
      ],
    },
  },
  {
    id: "notif-006",
    title: "Critical lab result received",
    description:
      "Patient Robert Kim's lab results show critical values requiring immediate attention.",
    timestamp: "2026-07-12T02:15:00",
    read: false,
    archived: false,
    category: "patients",
    priority: "critical",
    relatedUser: {
      name: "Robert Kim",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      role: "Patient",
    },
    detailContent: {
      fullDescription:
        "CRITICAL ALERT: Robert Kim's latest blood work shows elevated cardiac enzymes (Troponin I: 2.4 ng/mL, CK-MB: 25 ng/mL). These values are consistent with acute myocardial injury. Immediate cardiology consultation is recommended. Patient has been notified and advised to visit the ER.",
      relatedLinks: [
        { label: "View Lab Results", href: "/admin/patients/PAT-0089" },
        { label: "Contact Patient", href: "/admin/messages" },
      ],
      activity: [
        {
          action: "Lab results received from pathology",
          timestamp: "2026-07-12T02:00:00",
        },
        {
          action: "Critical value alert triggered",
          timestamp: "2026-07-12T02:15:00",
        },
        {
          action: "Alert sent to attending physician",
          timestamp: "2026-07-12T02:16:00",
        },
      ],
    },
  },
  {
    id: "notif-007",
    title: "Article published",
    description:
      "New article 'Understanding Hypertension' has been reviewed and published on the portal.",
    timestamp: "2026-07-12T01:00:00",
    read: true,
    archived: false,
    category: "articles",
    priority: "low",
    detailContent: {
      fullDescription:
        "The article 'Understanding Hypertension: Causes, Symptoms, and Management' has passed the review process and is now live on the patient portal. Author: Dr. Sarah Johnson. Estimated read time: 8 minutes.",
      relatedLinks: [
        { label: "View Article", href: "/admin/articles/hypertension-guide" },
        {
          label: "View Analytics",
          href: "/admin/analytics?article=hypertension-guide",
        },
      ],
      activity: [
        {
          action: "Article submitted for review",
          timestamp: "2026-07-10T14:00:00",
        },
        {
          action: "Review approved by editorial board",
          timestamp: "2026-07-11T16:00:00",
        },
        { action: "Article published", timestamp: "2026-07-12T01:00:00" },
      ],
    },
  },
  {
    id: "notif-008",
    title: "New message from patient",
    description:
      "Amanda Patel sent a message regarding her recent prescription refill request.",
    timestamp: "2026-07-12T00:30:00",
    read: false,
    archived: false,
    category: "messages",
    priority: "medium",
    relatedUser: {
      name: "Amanda Patel",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      role: "Patient",
    },
    detailContent: {
      fullDescription:
        "Amanda Patel has sent a new message via the patient portal regarding her prescription for Metformin 500mg. She is requesting an early refill as she will be traveling abroad for 3 weeks. Current prescription expires in 10 days.",
      relatedLinks: [
        { label: "View Message", href: "/admin/messages?thread=msg-042" },
        { label: "View Patient Profile", href: "/admin/patients/PAT-0056" },
      ],
      activity: [
        {
          action: "Message sent via patient portal",
          timestamp: "2026-07-12T00:30:00",
        },
      ],
    },
  },

  // ── YESTERDAY ──
  {
    id: "notif-009",
    title: "Department schedule updated",
    description:
      "Cardiology Department schedule has been updated for next week — 3 new time slots added.",
    timestamp: "2026-07-11T22:00:00",
    read: true,
    archived: false,
    category: "system",
    priority: "low",
    detailContent: {
      fullDescription:
        "The Cardiology Department schedule has been updated for the week of July 14–18. Three new time slots have been added to accommodate increased patient demand. Changes effective immediately.",
      activity: [
        {
          action: "Schedule updated by admin",
          timestamp: "2026-07-11T22:00:00",
        },
      ],
    },
  },
  {
    id: "notif-010",
    title: "Appointment reminder sent",
    description:
      "Automated reminders sent to 24 patients for tomorrow's appointments.",
    timestamp: "2026-07-11T18:00:00",
    read: true,
    archived: false,
    category: "appointments",
    priority: "low",
  },
  {
    id: "notif-011",
    title: "Doctor profile updated",
    description:
      "Dr. Lisa Chen updated her profile — new certifications and specializations added.",
    timestamp: "2026-07-11T14:00:00",
    read: false,
    archived: false,
    category: "doctors",
    priority: "low",
    relatedUser: {
      name: "Dr. Lisa Chen",
      avatar:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face",
      role: "Pediatrician",
    },
  },
  {
    id: "notif-012",
    title: "New patient registered",
    description:
      "James Wilson has registered through the patient portal and completed his intake forms.",
    timestamp: "2026-07-11T10:00:00",
    read: false,
    archived: false,
    category: "patients",
    priority: "medium",
    relatedUser: {
      name: "James Wilson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      role: "New Patient",
    },
  },
  {
    id: "notif-013",
    title: "Payment received",
    description:
      "Payment of $250 received from Maria Garcia for consultation on July 10.",
    timestamp: "2026-07-11T08:00:00",
    read: true,
    archived: false,
    category: "system",
    priority: "medium",
    relatedUser: {
      name: "Maria Garcia",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      role: "Patient",
    },
  },

  // ── THIS WEEK ──
  {
    id: "notif-014",
    title: "Weekly analytics report ready",
    description:
      "This week's analytics report is now available — patient volume up 12%.",
    timestamp: "2026-07-10T10:00:00",
    read: true,
    archived: true,
    category: "system",
    priority: "low",
    detailContent: {
      fullDescription:
        "The weekly analytics report for July 6–12 is now available. Key highlights: Patient volume increased by 12% compared to last week. Average wait time decreased by 4 minutes. Appointment no-show rate reduced to 3.2%. New patient registrations up by 8%.",
      relatedLinks: [
        { label: "View Full Report", href: "/admin/analytics" },
        { label: "Export PDF", href: "/admin/analytics/export" },
      ],
      activity: [
        {
          action: "Report generated automatically",
          timestamp: "2026-07-10T10:00:00",
        },
      ],
    },
  },
  {
    id: "notif-015",
    title: "Productivity milestone",
    description:
      "Dr. Johnson completed her 100th successful surgery this year.",
    timestamp: "2026-07-10T08:00:00",
    read: true,
    archived: false,
    category: "doctors",
    priority: "medium",
    relatedUser: {
      name: "Dr. Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      role: "Cardiologist",
    },
  },
  {
    id: "notif-016",
    title: "System maintenance scheduled",
    description:
      "Planned maintenance for the patient portal will occur on July 15, 2:00–4:00 AM.",
    timestamp: "2026-07-09T16:00:00",
    read: true,
    archived: false,
    category: "system",
    priority: "high",
    detailContent: {
      fullDescription:
        "A scheduled maintenance window has been planned for the patient portal and internal scheduling system. Date: July 15, 2026. Time: 2:00 AM – 4:00 AM EST. Expected downtime: approximately 45 minutes. Please notify staff and update the portal banner accordingly.",
      relatedLinks: [
        {
          label: "Maintenance Details",
          href: "/admin/settings?tab=maintenance",
        },
      ],
      activity: [
        {
          action: "Maintenance window created",
          timestamp: "2026-07-09T16:00:00",
        },
        {
          action: "Notification sent to all staff",
          timestamp: "2026-07-09T16:05:00",
        },
      ],
    },
  },
  {
    id: "notif-017",
    title: "Patient feedback received",
    description:
      "New 5-star review from David Park for his experience in the Orthopedics Department.",
    timestamp: "2026-07-09T09:00:00",
    read: true,
    archived: false,
    category: "patients",
    priority: "low",
    relatedUser: {
      name: "David Park",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      role: "Patient",
    },
  },
  {
    id: "notif-018",
    title: "New article draft submitted",
    description:
      "Dr. Williams submitted a draft article 'Managing Diabetes in Children' for review.",
    timestamp: "2026-07-08T14:00:00",
    read: true,
    archived: false,
    category: "articles",
    priority: "low",
  },
  {
    id: "notif-019",
    title: "Staff meeting reminder",
    description:
      "All-hands staff meeting scheduled for Friday, July 17 at 3:00 PM in Conference Room A.",
    timestamp: "2026-07-08T09:00:00",
    read: true,
    archived: false,
    category: "system",
    priority: "medium",
  },

  // ── OLDER ──
  {
    id: "notif-020",
    title: "Quarterly compliance audit",
    description:
      "The Q2 2026 compliance audit has been completed — all standards met.",
    timestamp: "2026-07-04T11:00:00",
    read: true,
    archived: true,
    category: "system",
    priority: "high",
    detailContent: {
      fullDescription:
        "The Q2 2026 compliance audit has been completed successfully. All regulatory standards have been met, including HIPAA, OSHA, and Joint Commission requirements. No critical findings were identified. Three minor recommendations were noted and have been assigned to the compliance team.",
      relatedLinks: [
        { label: "View Audit Report", href: "/admin/settings?tab=compliance" },
      ],
      activity: [
        {
          action: "Audit initiated by compliance team",
          timestamp: "2026-07-02T09:00:00",
        },
        {
          action: "On-site inspection completed",
          timestamp: "2026-07-03T17:00:00",
        },
        { action: "Final report published", timestamp: "2026-07-04T11:00:00" },
      ],
    },
  },
  {
    id: "notif-021",
    title: "New article published",
    description:
      "'Preventive Care Tips for Summer' is now live on the patient education portal.",
    timestamp: "2026-06-30T09:00:00",
    read: true,
    archived: true,
    category: "articles",
    priority: "low",
  },
  {
    id: "notif-022",
    title: "Doctor license renewal",
    description:
      "Dr. Mitchell's medical license renewal has been approved — valid through 2028.",
    timestamp: "2026-06-25T15:00:00",
    read: true,
    archived: true,
    category: "doctors",
    priority: "medium",
    relatedUser: {
      name: "Dr. James Mitchell",
      avatar:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
      role: "Physician",
    },
  },
  {
    id: "notif-023",
    title: "System upgrade completed",
    description:
      "EMR system has been upgraded to version 4.2. New features are now available.",
    timestamp: "2026-06-15T10:00:00",
    read: true,
    archived: true,
    category: "system",
    priority: "high",
    detailContent: {
      fullDescription:
        "The Electronic Medical Records (EMR) system has been successfully upgraded to version 4.2. New features include: improved search functionality, enhanced medication interaction warnings, and a redesigned patient summary view. All data has been migrated successfully.",
      relatedLinks: [
        { label: "Release Notes", href: "/admin/settings?tab=releases" },
        { label: "Training Materials", href: "/admin/settings?tab=training" },
      ],
      activity: [
        { action: "Upgrade initiated", timestamp: "2026-06-15T01:00:00" },
        {
          action: "Data migration completed",
          timestamp: "2026-06-15T08:00:00",
        },
        {
          action: "System verified and live",
          timestamp: "2026-06-15T10:00:00",
        },
      ],
    },
  },
];

// ─── Helpers ───

export function getNotifications(): Notification[] {
  return mockNotifications.filter((n) => !n.archived);
}

export function getAllNotifications(): Notification[] {
  return mockNotifications;
}

export function getNotificationById(id: string): Notification | undefined {
  return mockNotifications.find((n) => n.id === id);
}

export function calculateStats(
  notifications: Notification[],
): NotificationStats {
  return {
    total: notifications.length,
    unread: notifications.filter((n) => !n.read).length,
    critical: notifications.filter((n) => n.priority === "critical").length,
    appointments: notifications.filter((n) => n.category === "appointments")
      .length,
    system: notifications.filter((n) => n.category === "system").length,
    messages: notifications.filter((n) => n.category === "messages").length,
  };
}

export function getNotificationGroup(timestamp: string): NotificationGroup {
  const now = new Date("2026-07-12T10:00:00");
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return "today";
  if (diffDays < 2) return "yesterday";
  if (diffDays < 7) return "thisWeek";
  return "older";
}

export const groupLabels: Record<NotificationGroup, string> = {
  today: "Today",
  yesterday: "Yesterday",
  thisWeek: "This Week",
  older: "Older",
};

export function groupNotifications(
  notifications: Notification[],
): [NotificationGroup, Notification[]][] {
  const groups = new Map<NotificationGroup, Notification[]>();

  for (const notif of notifications) {
    const group = getNotificationGroup(notif.timestamp);
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push(notif);
  }

  const order: NotificationGroup[] = [
    "today",
    "yesterday",
    "thisWeek",
    "older",
  ];
  return order.filter((g) => groups.has(g)).map((g) => [g, groups.get(g)!]);
}

export type NotificationFilterMode = "all" | "unread" | "read";

export interface NotificationFiltersState {
  mode: NotificationFilterMode;
  category: NotificationCategory | "all";
  priority: NotificationPriority | "all";
  search: string;
}

export function filterNotifications(
  notifications: Notification[],
  filters: NotificationFiltersState,
): Notification[] {
  return notifications.filter((n) => {
    if (filters.mode === "unread" && n.read) return false;
    if (filters.mode === "read" && !n.read) return false;
    if (filters.category !== "all" && n.category !== filters.category)
      return false;
    if (filters.priority !== "all" && n.priority !== filters.priority)
      return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (
        !n.title.toLowerCase().includes(q) &&
        !n.description.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });
}

export const defaultNotificationFilters: NotificationFiltersState = {
  mode: "all",
  category: "all",
  priority: "all",
  search: "",
};

export const defaultNotificationSettings: NotificationSettings = {
  appointmentAlerts: true,
  newPatientAlerts: true,
  doctorUpdates: true,
  cmsNotifications: true,
  emailNotifications: true,
  pushNotifications: false,
};
