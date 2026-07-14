import {
  Activity,
  BarChart3,
  Bell,
  Building2,
  CalendarCheck,
  CalendarPlus,
  FilePlus,
  FileText,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  PlusCircle,
  Settings,
  Shield,
  Stethoscope,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { CommandPaletteItem } from "./types";

/* ─── Pages (from dashboard navigation) ─── */

export const PALETTE_PAGES: CommandPaletteItem[] = [
  {
    id: "page-dashboard",
    type: "page",
    label: "Dashboard",
    description: "Overview of key metrics and activity",
    href: "/dashboard/admin/dashboard",
    icon: LayoutDashboard as LucideIcon,
    iconName: "LayoutDashboard",
    shortcut: "G D",
    group: "Pages",
    keywords: ["home", "overview", "metrics", "stats"],
  },
  {
    id: "page-doctors",
    type: "page",
    label: "Doctors",
    description: "Manage doctor profiles and schedules",
    href: "/dashboard/admin/doctors",
    icon: Stethoscope as LucideIcon,
    iconName: "Stethoscope",
    shortcut: "G O",
    group: "Pages",
    keywords: ["physicians", "specialists", "providers"],
  },
  {
    id: "page-patients",
    type: "page",
    label: "Patients",
    description: "View and manage patient records",
    href: "/dashboard/admin/patients",
    icon: Users as LucideIcon,
    iconName: "Users",
    shortcut: "G P",
    group: "Pages",
    keywords: ["clients", "people", "records"],
  },
  {
    id: "page-departments",
    type: "page",
    label: "Departments",
    description: "Organize hospital departments and units",
    href: "/dashboard/admin/departments",
    icon: Building2 as LucideIcon,
    iconName: "Building2",
    shortcut: "G D",
    group: "Pages",
    keywords: ["units", "divisions", "wards"],
  },
  {
    id: "page-appointments",
    type: "page",
    label: "Appointments",
    description: "Schedule and manage appointments",
    href: "/dashboard/admin/appointments",
    icon: CalendarCheck as LucideIcon,
    iconName: "CalendarCheck",
    shortcut: "G A",
    group: "Pages",
    keywords: ["bookings", "schedule", "visits"],
  },
  {
    id: "page-articles",
    type: "page",
    label: "Articles",
    description: "Create and manage content articles",
    href: "/dashboard/admin/articles",
    icon: FileText as LucideIcon,
    iconName: "FileText",
    shortcut: "G R",
    group: "Pages",
    keywords: ["blog", "content", "posts", "news"],
  },
  {
    id: "page-categories",
    type: "page",
    label: "Categories",
    description: "Organize articles by categories",
    href: "/dashboard/admin/articles/categories",
    icon: FolderOpen as LucideIcon,
    iconName: "FolderOpen",
    group: "Pages",
    keywords: ["tags", "groups", "classification"],
  },
  {
    id: "page-analytics",
    type: "page",
    label: "Analytics",
    description: "Insights, reports, and data visualizations",
    href: "/dashboard/admin/analytics",
    icon: BarChart3 as LucideIcon,
    iconName: "BarChart3",
    shortcut: "G N",
    group: "Pages",
    keywords: ["reports", "charts", "data", "statistics"],
  },
  {
    id: "page-messages",
    type: "page",
    label: "Messages",
    description: "Internal communication and messaging",
    href: "/dashboard/admin/messages",
    icon: MessageSquare as LucideIcon,
    iconName: "MessageSquare",
    shortcut: "G M",
    group: "Pages",
    keywords: ["chat", "inbox", "conversations", "mail"],
  },
  {
    id: "page-notifications",
    type: "page",
    label: "Notifications",
    description: "View and manage alerts and notifications",
    href: "/dashboard/admin/notifications",
    icon: Bell as LucideIcon,
    iconName: "Bell",
    group: "Pages",
    keywords: ["alerts", "updates", "reminders"],
  },
  {
    id: "page-settings",
    type: "page",
    label: "Settings",
    description: "Configure system preferences and options",
    href: "/dashboard/admin/settings",
    icon: Settings as LucideIcon,
    iconName: "Settings",
    shortcut: "G S",
    group: "Pages",
    keywords: ["preferences", "configuration", "options"],
  },
  {
    id: "page-activity-logs",
    type: "page",
    label: "Activity Logs",
    description: "Audit trail of system activity",
    href: "/dashboard/admin/activity-logs",
    icon: Activity as LucideIcon,
    iconName: "Activity",
    group: "Pages",
    keywords: ["audit", "history", "tracking", "logs"],
  },
  {
    id: "page-roles",
    type: "page",
    label: "Roles & Permissions",
    description: "Manage role-based access control",
    href: "/dashboard/admin/roles",
    icon: Shield as LucideIcon,
    iconName: "Shield",
    group: "Pages",
    keywords: ["rbac", "access", "security", "permissions"],
  },
];

/* ─── Commands ─── */

export const PALETTE_COMMANDS: CommandPaletteItem[] = [
  {
    id: "cmd-new-doctor",
    type: "command",
    label: "New Doctor",
    description: "Add a new doctor to the system",
    href: "/dashboard/admin/doctors/new",
    icon: UserPlus as LucideIcon,
    iconName: "UserPlus",
    shortcut: "C D",
    group: "Commands",
    keywords: ["create", "add", "physician", "hire"],
  },
  {
    id: "cmd-new-department",
    type: "command",
    label: "New Department",
    description: "Create a new department",
    href: "/dashboard/admin/departments/new",
    icon: PlusCircle as LucideIcon,
    iconName: "PlusCircle",
    shortcut: "C P",
    group: "Commands",
    keywords: ["create", "add", "unit", "division"],
  },
  {
    id: "cmd-new-article",
    type: "command",
    label: "Create Article",
    description: "Write and publish a new article",
    href: "/dashboard/admin/articles/new",
    icon: FilePlus as LucideIcon,
    iconName: "FilePlus",
    shortcut: "C A",
    group: "Commands",
    keywords: ["write", "blog", "post", "content", "create"],
  },
  {
    id: "cmd-new-appointment",
    type: "command",
    label: "New Appointment",
    description: "Schedule a new appointment",
    href: "/dashboard/admin/appointments",
    icon: CalendarPlus as LucideIcon,
    iconName: "CalendarPlus",
    shortcut: "C O",
    group: "Commands",
    keywords: ["schedule", "book", "visit", "create"],
  },
  {
    id: "cmd-dashboard",
    type: "command",
    label: "Go to Dashboard",
    description: "Navigate to the main dashboard",
    href: "/dashboard/admin/dashboard",
    icon: LayoutDashboard as LucideIcon,
    iconName: "LayoutDashboard",
    shortcut: "G H",
    group: "Commands",
    keywords: ["home", "main", "overview"],
  },
  {
    id: "cmd-analytics",
    type: "command",
    label: "View Analytics",
    description: "Open analytics and reports",
    href: "/dashboard/admin/analytics",
    icon: BarChart3 as LucideIcon,
    iconName: "BarChart3",
    group: "Commands",
    keywords: ["reports", "data", "stats", "insights"],
  },
  {
    id: "cmd-settings",
    type: "command",
    label: "Open Settings",
    description: "Configure system preferences",
    href: "/dashboard/admin/settings",
    icon: Settings as LucideIcon,
    iconName: "Settings",
    group: "Commands",
    keywords: ["preferences", "configure", "options"],
  },
  {
    id: "cmd-logout",
    type: "action",
    label: "Logout",
    description: "Sign out of your account",
    href: "/auth/logout",
    icon: LogOut as LucideIcon,
    iconName: "LogOut",
    shortcut: "L O",
    group: "Commands",
    keywords: ["sign out", "exit", "leave"],
  },
];

/* ─── Combined list ─── */

export const ALL_PALETTE_ITEMS: CommandPaletteItem[] = [
  ...PALETTE_PAGES,
  ...PALETTE_COMMANDS,
];

/* ─── Icon lookup (for restoring from localStorage) ─── */

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Stethoscope,
  Users,
  Building2,
  CalendarCheck,
  FileText,
  FolderOpen,
  BarChart3,
  MessageSquare,
  Bell,
  Settings,
  Activity,
  Shield,
  UserPlus,
  PlusCircle,
  FilePlus,
  CalendarPlus,
  LogOut,
};

export function getIconByName(name: string): LucideIcon {
  return ICON_MAP[name] || LayoutDashboard;
}

/* ─── Search helper ─── */

export function searchPaletteItems(query: string): CommandPaletteItem[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return ALL_PALETTE_ITEMS.filter((item) => {
    if (item.label.toLowerCase().includes(q)) return true;
    if (item.description.toLowerCase().includes(q)) return true;
    if (item.keywords.some((kw) => kw.includes(q))) return true;
    return false;
  });
}

/* ─── Group results ─── */

export function groupResults(items: CommandPaletteItem[]): ResultGroup[] {
  const groups = new Map<string, CommandPaletteItem[]>();
  for (const item of items) {
    const list = groups.get(item.group) || [];
    list.push(item);
    groups.set(item.group, list);
  }
  return Array.from(groups.entries()).map(([label, items]) => ({
    label,
    items,
  }));
}

/* ─── Re-export type for convenience ─── */
import type { ResultGroup } from "./types";
