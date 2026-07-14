import {
  Activity,
  BarChart3,
  Bell,
  Building2,
  CalendarCheck,
  FileText,
  FolderOpen,
  Home,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Shield,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { NavGroupDef } from "./types";

/** All navigation groups for the dashboard sidebar */
export const navigationGroups: NavGroupDef[] = [
  {
    label: "Main",
    items: [
      {
        icon: LayoutDashboard as LucideIcon,
        label: "Dashboard",
        href: "/dashboard/admin/dashboard",
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        icon: Stethoscope as LucideIcon,
        label: "Doctors",
        href: "/dashboard/admin/doctors",
      },
      {
        icon: Users as LucideIcon,
        label: "Patients",
        href: "/dashboard/admin/patients",
      },
      {
        icon: Building2 as LucideIcon,
        label: "Departments",
        href: "/dashboard/admin/departments",
      },
      {
        icon: CalendarCheck as LucideIcon,
        label: "Appointments",
        href: "/dashboard/admin/appointments",
      },
    ],
  },
  {
    label: "Content",
    items: [
      {
        icon: FileText as LucideIcon,
        label: "Articles",
        href: "/dashboard/admin/articles",
      },
      {
        icon: FolderOpen as LucideIcon,
        label: "Categories",
        href: "/dashboard/admin/articles/categories",
      },
    ],
  },
  {
    label: "Insights",
    items: [
      {
        icon: BarChart3 as LucideIcon,
        label: "Analytics",
        href: "/dashboard/admin/analytics",
      },
    ],
  },
  {
    label: "Communication",
    items: [
      {
        icon: MessageSquare as LucideIcon,
        label: "Messages",
        href: "/dashboard/admin/messages",
      },
      {
        icon: Bell as LucideIcon,
        label: "Notifications",
        href: "/dashboard/admin/notifications",
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        icon: Shield as LucideIcon,
        label: "Roles & Permissions",
        href: "/dashboard/admin/roles",
      },
      {
        icon: Settings as LucideIcon,
        label: "Settings",
        href: "/dashboard/admin/settings",
      },
      {
        icon: Activity as LucideIcon,
        label: "Activity Logs",
        href: "/dashboard/admin/activity-logs",
      },
      {
        icon: Home as LucideIcon,
        label: "Back to Homepage",
        href: "/",
      },
    ],
  },
];

/** Flat list of all nav items (useful for search / command palette) */
export const allNavItems = navigationGroups.flatMap((g) => g.items);

/** Map of href → label for breadcrumb resolution */
const autoLabels = Object.fromEntries(
  allNavItems.map((item) => [item.href, item.label]),
);

/** Map of href → label for breadcrumb resolution */
export const breadcrumbLabels: Record<string, string> = {
  ...autoLabels,
  "/dashboard/admin/roles": "Roles & Permissions",
  "/dashboard/admin/doctors/new": "New Doctor",
  "/dashboard/admin/doctors/[id]/edit": "Edit Doctor",
  "/dashboard/admin/departments/new": "New Department",
  "/dashboard/admin/departments/[id]/edit": "Edit Department",
  "/dashboard/admin/articles/new": "New Article",
  "/dashboard/admin/articles/[id]/edit": "Edit Article",
  "/dashboard/admin/activity-logs": "Activity Logs",
};
