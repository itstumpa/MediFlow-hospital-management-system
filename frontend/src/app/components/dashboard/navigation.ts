import {
  BarChart3,
  Bell,
  Building2,
  CalendarCheck,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
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
      { icon: LayoutDashboard as LucideIcon, label: "Dashboard", href: "/admin/dashboard" },
    ],
  },
  {
    label: "Management",
    items: [
      { icon: Stethoscope as LucideIcon, label: "Doctors", href: "/admin/doctors" },
      { icon: Users as LucideIcon, label: "Patients", href: "/admin/patients" },
      { icon: Building2 as LucideIcon, label: "Departments", href: "/admin/departments" },
      { icon: CalendarCheck as LucideIcon, label: "Appointments", href: "/admin/appointments" },
    ],
  },
  {
    label: "Content",
    items: [
      { icon: FileText as LucideIcon, label: "Articles", href: "/admin/articles" },
    ],
  },
  {
    label: "Insights",
    items: [
      { icon: BarChart3 as LucideIcon, label: "Analytics", href: "/admin/analytics" },
    ],
  },
  {
    label: "Communication",
    items: [
      { icon: MessageSquare as LucideIcon, label: "Messages", href: "/admin/messages" },
      { icon: Bell as LucideIcon, label: "Notifications", href: "/admin/notifications" },
    ],
  },
  {
    label: "System",
    items: [
      { icon: Settings as LucideIcon, label: "Settings", href: "/admin/settings" },
    ],
  },
];

/** Flat list of all nav items (useful for search / command palette) */
export const allNavItems = navigationGroups.flatMap((g) => g.items);

/** Map of href → label for breadcrumb resolution */
export const breadcrumbLabels: Record<string, string> =
  Object.fromEntries(allNavItems.map((item) => [item.href, item.label]));
