import {
  Bell,
  CalendarCheck,
  CalendarPlus,
  FileText,
  FlaskConical,
  Heart,
  LayoutDashboard,
  Pill,
  Settings,
  Shield,
  User,
  type LucideIcon,
} from "lucide-react";
import type { PatientNavGroupDef } from "./types";

/** All navigation groups for the patient portal sidebar */
export const patientNavigationGroups: PatientNavGroupDef[] = [
  {
    label: "Overview",
    items: [
      {
        icon: LayoutDashboard as LucideIcon,
        label: "Dashboard",
        href: "/patient/dashboard",
      },
    ],
  },
  {
    label: "Appointments",
    items: [
      {
        icon: CalendarPlus as LucideIcon,
        label: "Book Appointment",
        href: "/patient/appointments/book",
      },
      {
        icon: CalendarCheck as LucideIcon,
        label: "My Appointments",
        href: "/patient/appointments",
      },
    ],
  },
  {
    label: "Health Records",
    items: [
      {
        icon: FileText as LucideIcon,
        label: "Medical Records",
        href: "/patient/medical-records",
      },
      {
        icon: Pill as LucideIcon,
        label: "Prescriptions",
        href: "/patient/prescriptions",
      },
      {
        icon: FlaskConical as LucideIcon,
        label: "Lab Reports",
        href: "/patient/lab-reports",
      },
    ],
  },
  {
    label: "Connections",
    items: [
      {
        icon: Heart as LucideIcon,
        label: "Favorite Doctors",
        href: "/patient/favorite-doctors",
      },
      {
        icon: Bell as LucideIcon,
        label: "Notifications",
        href: "/patient/notifications",
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        icon: User as LucideIcon,
        label: "Profile",
        href: "/patient/profile",
      },
      {
        icon: Shield as LucideIcon,
        label: "Security & Privacy",
        href: "/patient/settings/security",
      },
      {
        icon: Settings as LucideIcon,
        label: "Settings",
        href: "/patient/settings",
      },
    ],
  },
];

/** Flat list of all nav items (useful for search / command palette) */
export const allPatientNavItems = patientNavigationGroups.flatMap(
  (g) => g.items,
);

/** Map of href → label for breadcrumb resolution */
const autoLabels = Object.fromEntries(
  allPatientNavItems.map((item) => [item.href, item.label]),
);

/** Map of href → label for breadcrumb resolution */
export const patientBreadcrumbLabels: Record<string, string> = {
  ...autoLabels,
  "/patient/dashboard": "Dashboard",
  "/patient/appointments/book": "Book Appointment",
  "/patient/appointments": "My Appointments",
  "/patient/medical-records": "Medical Records",
  "/patient/prescriptions": "Prescriptions",
  "/patient/lab-reports": "Lab Reports",
  "/patient/favorite-doctors": "Favorite Doctors",
  "/patient/notifications": "Notifications",
  "/patient/profile": "Profile",
  "/patient/settings": "Settings",
  "/patient/settings/security": "Security & Privacy",
  "/dashboard": "Patient Portal",
};
