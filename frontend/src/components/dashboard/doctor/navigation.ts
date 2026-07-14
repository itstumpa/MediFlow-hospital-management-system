import {
  CalendarCheck,
  CalendarDays,
  Clock,
  ExternalLink,
  FileText,
  LayoutDashboard,
  Settings,
  Shield,
  Stethoscope,
  User,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import type { DoctorNavGroupDef } from "./types";

/** All navigation groups for the doctor portal sidebar */
export const doctorNavigationGroups: DoctorNavGroupDef[] = [
  {
    label: "Main",
    items: [
      {
        icon: LayoutDashboard as LucideIcon,
        label: "Dashboard",
        href: "/doctor",
      },
    ],
  },
  {
    label: "Clinical",
    items: [
      {
        icon: CalendarDays as LucideIcon,
        label: "Today's Appointments",
        href: "/doctor/appointments",
      },
      {
        icon: UserRound as LucideIcon,
        label: "Patients",
        href: "/doctor/patients",
      },
      {
        icon: FileText as LucideIcon,
        label: "Prescriptions",
        href: "/doctor/prescriptions",
      },
    ],
  },
  {
    label: "Planning",
    items: [
      {
        icon: Clock as LucideIcon,
        label: "Schedule",
        href: "/doctor/schedule",
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        icon: Stethoscope as LucideIcon,
        label: "Profile",
        href: "/doctor/profile",
      },
      {
        icon: Settings as LucideIcon,
        label: "Settings",
        href: "/doctor/settings",
      },
      {
        icon: Shield as LucideIcon,
        label: "Security & Privacy",
        href: "/doctor/settings/security",
      },
      {
        icon: ExternalLink as LucideIcon,
        label: "Go to Homepage",
        href: "/",
      },
    ],
  },
];

/** Quick actions pinned in sidebar footer area */
export interface DoctorQuickActionItem {
  icon: LucideIcon;
  label: string;
  actionLabel: string;
  href: string;
  shortcut?: string;
}

export const doctorQuickActions: DoctorQuickActionItem[] = [
  {
    icon: FileText as LucideIcon,
    label: "New Prescription",
    actionLabel: "Create prescription",
    href: "/doctor/prescriptions",
  },
  {
    icon: CalendarCheck as LucideIcon,
    label: "Today's Schedule",
    actionLabel: "View schedule",
    href: "/doctor/schedule",
  },
  {
    icon: User as LucideIcon,
    label: "Search Patient",
    actionLabel: "Find patient",
    href: "/doctor/patients",
  },
];

/** Flat list of all nav items (useful for search / command palette) */
export const allDoctorNavItems = doctorNavigationGroups.flatMap((g) => g.items);

/** Map of href → label for breadcrumb resolution */
const autoLabels = Object.fromEntries(
  allDoctorNavItems.map((item) => [item.href, item.label]),
);

/** Map of href → label for breadcrumb resolution */
export const doctorBreadcrumbLabels: Record<string, string> = {
  ...autoLabels,
  "/doctor": "Dashboard",
  "/doctor/appointments": "Today's Appointments",
  "/doctor/patients": "Patients",
  "/doctor/prescriptions": "Prescriptions",
  "/doctor/schedule": "Schedule",
  "/doctor/profile": "Profile",
  "/doctor/settings": "Settings",
  "/doctor/settings/security": "Security & Privacy",
  "/": "Homepage",
};

/** Command palette items for the doctor portal */
export const doctorCommandPaletteItems = [
  // Pages
  ...allDoctorNavItems.map((item) => ({
    icon: item.icon,
    label: item.label,
    href: item.href,
    category: "page" as const,
    description: `Navigate to ${item.label}`,
  })),
  // Quick actions
  {
    icon: FileText as LucideIcon,
    label: "New Prescription",
    category: "action" as const,
    description: "Create a new prescription",
    href: "#",
  },
  {
    icon: CalendarCheck as LucideIcon,
    label: "Book Appointment",
    category: "action" as const,
    description: "Schedule a new appointment",
    href: "#",
  },
  {
    icon: User as LucideIcon,
    label: "Register Patient",
    category: "action" as const,
    description: "Add a new patient record",
    href: "#",
  },
];
