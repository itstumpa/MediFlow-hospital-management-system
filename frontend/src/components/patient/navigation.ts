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
        href: "/dashboard/patient/dashboard",
      },
    ],
  },
  {
    label: "Appointments",
    items: [
      {
        icon: CalendarPlus as LucideIcon,
        label: "Book Appointment",
        href: "/dashboard/patient/appointments/book",
      },
      {
        icon: CalendarCheck as LucideIcon,
        label: "My Appointments",
        href: "/dashboard/patient/appointments",
      },
    ],
  },
  {
    label: "Health Records",
    items: [
      {
        icon: FileText as LucideIcon,
        label: "Medical Records",
        href: "/dashboard/patient/medical-records",
      },
      {
        icon: Pill as LucideIcon,
        label: "Prescriptions",
        href: "/dashboard/patient/prescriptions",
      },
      {
        icon: FlaskConical as LucideIcon,
        label: "Lab Reports",
        href: "/dashboard/patient/lab-reports",
      },
    ],
  },
  {
    label: "Connections",
    items: [
      {
        icon: Heart as LucideIcon,
        label: "Favorite Doctors",
        href: "/dashboard/patient/favorite-doctors",
      },
      {
        icon: Bell as LucideIcon,
        label: "Notifications",
        href: "/dashboard/patient/notifications",
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        icon: User as LucideIcon,
        label: "Profile",
        href: "/dashboard/patient/profile",
      },
      {
        icon: Settings as LucideIcon,
        label: "Settings",
        href: "/dashboard/patient/settings",
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
  "/dashboard/patient/dashboard": "Dashboard",
  "/dashboard/patient/appointments/book": "Book Appointment",
  "/dashboard/patient/appointments": "My Appointments",
  "/dashboard/patient/medical-records": "Medical Records",
  "/dashboard/patient/prescriptions": "Prescriptions",
  "/dashboard/patient/lab-reports": "Lab Reports",
  "/dashboard/patient/favorite-doctors": "Favorite Doctors",
  "/dashboard/patient/notifications": "Notifications",
  "/dashboard/patient/profile": "Profile",
  "/dashboard/patient/settings": "Settings",
  "/dashboard": "Patient Portal",
};
