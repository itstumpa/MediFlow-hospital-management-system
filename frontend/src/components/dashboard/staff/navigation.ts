import {
  Bell,
  Calendar,
  CalendarCheck,
  CalendarPlus,
  CalendarX,
  ClipboardList,
  CreditCard,
  DollarSign,
  FileText,
  LayoutDashboard,
  LogOut,
  Receipt,
  RotateCcw,
  Settings,
  Shield,
  Stethoscope,
  User,
  UserCheck,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ElementType } from "react";
import type { StaffNavGroupDef, StaffQuickActionDef } from "./types";

/* ============================================
   Staff Navigation Groups
   ============================================ */

export const staffNavigationGroups: StaffNavGroupDef[] = [
  {
    label: "Main",
    items: [
      {
        icon: LayoutDashboard as LucideIcon,
        label: "Dashboard",
        href: "/staff",
      },
    ],
  },
  {
    label: "Appointments",
    items: [
      {
        icon: CalendarPlus as LucideIcon,
        label: "Create Appointment",
        href: "/staff/appointments/create",
      },
      {
        icon: Calendar as LucideIcon,
        label: "Calendar",
        href: "/staff/appointments/calendar",
      },
      {
        icon: CalendarCheck as LucideIcon,
        label: "Reschedule",
        href: "/staff/appointments/reschedule",
      },
      {
        icon: CalendarX as LucideIcon,
        label: "Cancel",
        href: "/staff/appointments/cancel",
      },
    ],
  },
  {
    label: "Patient Registration",
    items: [
      {
        icon: UserPlus as LucideIcon,
        label: "Register Patient",
        href: "/staff/patient-registration/register",
      },
      {
        icon: UserCheck as LucideIcon,
        label: "Check-in",
        href: "/staff/patient-registration/check-in",
      },
      {
        icon: User as LucideIcon,
        label: "Walk-in",
        href: "/staff/patient-registration/walk-in",
      },
      {
        icon: Shield as LucideIcon,
        label: "Emergency",
        href: "/staff/patient-registration/emergency",
      },
    ],
  },
  {
    label: "Patients",
    items: [
      {
        icon: Users as LucideIcon,
        label: "All Patients",
        href: "/staff/patients",
      },
    ],
  },
  {
    label: "Billing",
    items: [
      {
        icon: FileText as LucideIcon,
        label: "Invoices",
        href: "/staff/billing/invoices",
      },
      {
        icon: CreditCard as LucideIcon,
        label: "Payments",
        href: "/staff/billing/payments",
      },
      {
        icon: RotateCcw as LucideIcon,
        label: "Refunds",
        href: "/staff/billing/refunds",
      },
      {
        icon: Receipt as LucideIcon,
        label: "Receipts",
        href: "/staff/billing/receipts",
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        icon: Stethoscope as LucideIcon,
        label: "Doctor Schedule",
        href: "/staff/schedule",
      },
      {
        icon: ClipboardList as LucideIcon,
        label: "Queue Management",
        href: "/staff/queue",
      },
      {
        icon: Bell as LucideIcon,
        label: "Notifications",
        href: "/staff/notifications",
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        icon: User as LucideIcon,
        label: "Profile",
        href: "/staff/profile",
      },
      {
        icon: Settings as LucideIcon,
        label: "Settings",
        href: "/staff/settings",
      },
      {
        icon: LogOut as LucideIcon,
        label: "Logout",
        href: "/staff/logout",
      },
    ],
  },
];

/* ============================================
   Quick Actions
   ============================================ */

export const staffQuickActions: StaffQuickActionDef[] = [
  {
    icon: CalendarPlus as LucideIcon,
    label: "New Appointment",
    description: "Schedule a patient appointment",
    href: "/staff/appointments/create",
    shortcut: "A",
    color: "emerald",
  },
  {
    icon: UserPlus as LucideIcon,
    label: "Register Patient",
    description: "Add a new patient record",
    href: "/staff/patient-registration/register",
    shortcut: "R",
    color: "blue",
  },
  {
    icon: DollarSign as LucideIcon,
    label: "Generate Invoice",
    description: "Create a new invoice",
    href: "/staff/billing/invoices",
    shortcut: "I",
    color: "amber",
  },
  {
    icon: UserCheck as LucideIcon,
    label: "Check-in Patient",
    description: "Check in an arriving patient",
    href: "/staff/patient-registration/check-in",
    shortcut: "C",
    color: "violet",
  },
  {
    icon: Users as LucideIcon,
    label: "Search Patient",
    description: "Find a patient record",
    href: "/staff/patients",
    shortcut: "S",
    color: "rose",
  },
];

/* ============================================
   Breadcrumb Labels
   ============================================ */

export const staffBreadcrumbLabels: Record<string, string> = {
  "/staff": "Dashboard",
  "/staff/appointments": "Appointments",
  "/staff/appointments/create": "Create Appointment",
  "/staff/appointments/calendar": "Calendar",
  "/staff/appointments/reschedule": "Reschedule",
  "/staff/appointments/cancel": "Cancel",
  "/staff/patient-registration": "Patient Registration",
  "/staff/patient-registration/register": "Register Patient",
  "/staff/patient-registration/check-in": "Check-in",
  "/staff/patient-registration/walk-in": "Walk-in",
  "/staff/patient-registration/emergency": "Emergency Registration",
  "/staff/patients": "Patients",
  "/staff/billing": "Billing",
  "/staff/billing/invoices": "Invoices",
  "/staff/billing/payments": "Payments",
  "/staff/billing/refunds": "Refunds",
  "/staff/billing/receipts": "Receipts",
  "/staff/schedule": "Doctor Schedule",
  "/staff/queue": "Queue Management",
  "/staff/notifications": "Notifications",
  "/staff/profile": "Profile",
  "/staff/settings": "Settings",
  "/staff/logout": "Logout",
};

/* ============================================
   Command Palette Items
   ============================================ */

export const staffCommandPaletteItems = [
  {
    id: "go-dashboard",
    label: "Go to Dashboard",
    description: "View staff dashboard overview",
    href: "/staff",
    icon: LayoutDashboard as ElementType,
    category: "Navigation",
    keywords: ["home", "overview", "main", "staff"],
  },
  {
    id: "create-appointment",
    label: "Create Appointment",
    description: "Schedule a new patient appointment",
    href: "/staff/appointments/create",
    icon: CalendarPlus as ElementType,
    category: "Appointments",
    keywords: ["schedule", "book", "new", "add"],
  },
  {
    id: "calendar",
    label: "Appointment Calendar",
    description: "View appointment calendar",
    href: "/staff/appointments/calendar",
    icon: Calendar as ElementType,
    category: "Appointments",
    keywords: ["schedule", "view", "dates"],
  },
  {
    id: "reschedule-appointment",
    label: "Reschedule Appointment",
    description: "Change an appointment date or time",
    href: "/staff/appointments/reschedule",
    icon: CalendarCheck as ElementType,
    category: "Appointments",
    keywords: ["change", "move", "update", "date"],
  },
  {
    id: "cancel-appointment",
    label: "Cancel Appointment",
    description: "Cancel a scheduled appointment",
    href: "/staff/appointments/cancel",
    icon: CalendarX as ElementType,
    category: "Appointments",
    keywords: ["remove", "delete"],
  },
  {
    id: "register-patient",
    label: "Register Patient",
    description: "Add a new patient to the system",
    href: "/staff/patient-registration/register",
    icon: UserPlus as ElementType,
    category: "Registration",
    keywords: ["new", "add", "create", "patient"],
  },
  {
    id: "check-in",
    label: "Check-in Patient",
    description: "Check in an arriving patient",
    href: "/staff/patient-registration/check-in",
    icon: UserCheck as ElementType,
    category: "Registration",
    keywords: ["arrive", "arrival", "sign in"],
  },
  {
    id: "walk-in",
    label: "Walk-in Registration",
    description: "Register a walk-in patient",
    href: "/staff/patient-registration/walk-in",
    icon: User as ElementType,
    category: "Registration",
    keywords: ["drop in", "urgent", "immediate"],
  },
  {
    id: "emergency-registration",
    label: "Emergency Registration",
    description: "Register an emergency patient",
    href: "/staff/patient-registration/emergency",
    icon: Shield as ElementType,
    category: "Registration",
    keywords: ["urgent", "critical", "immediate"],
  },
  {
    id: "all-patients",
    label: "All Patients",
    description: "View and manage patient records",
    href: "/staff/patients",
    icon: Users as ElementType,
    category: "Patients",
    keywords: ["list", "view", "search", "records"],
  },
  {
    id: "invoices",
    label: "Invoices",
    description: "View and manage invoices",
    href: "/staff/billing/invoices",
    icon: FileText as ElementType,
    category: "Billing",
    keywords: ["bill", "charges", "billing"],
  },
  {
    id: "payments",
    label: "Payments",
    description: "View and process payments",
    href: "/staff/billing/payments",
    icon: CreditCard as ElementType,
    category: "Billing",
    keywords: ["pay", "charge", "transaction"],
  },
  {
    id: "refunds",
    label: "Refunds",
    description: "Process refunds",
    href: "/staff/billing/refunds",
    icon: RotateCcw as ElementType,
    category: "Billing",
    keywords: ["return", "credit", "reverse"],
  },
  {
    id: "receipts",
    label: "Receipts",
    description: "View transaction receipts",
    href: "/staff/billing/receipts",
    icon: Receipt as ElementType,
    category: "Billing",
    keywords: ["payment proof", "transaction"],
  },
  {
    id: "doctor-schedule",
    label: "Doctor Schedule",
    description: "View doctor availability and schedules",
    href: "/staff/schedule",
    icon: Stethoscope as ElementType,
    category: "Operations",
    keywords: ["doctor", "availability", "roster"],
  },
  {
    id: "queue",
    label: "Queue Management",
    description: "Manage patient queue",
    href: "/staff/queue",
    icon: ClipboardList as ElementType,
    category: "Operations",
    keywords: ["waiting", "line", "order"],
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "View all notifications and announcements",
    href: "/staff/notifications",
    icon: Bell as ElementType,
    category: "Operations",
    keywords: ["alerts", "announcements", "messages"],
  },
  {
    id: "profile",
    label: "Profile",
    description: "View and edit your profile",
    href: "/staff/profile",
    icon: User as ElementType,
    category: "Account",
    keywords: ["account", "personal", "info"],
  },
  {
    id: "settings",
    label: "Settings",
    description: "Configure your preferences",
    href: "/staff/settings",
    icon: Settings as ElementType,
    category: "Account",
    keywords: ["preferences", "configuration"],
  },
];
