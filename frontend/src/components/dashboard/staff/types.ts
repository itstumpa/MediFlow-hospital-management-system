import type { ElementType } from "react";

/** Navigation item definition */
export interface StaffNavItemDef {
  icon: ElementType;
  label: string;
  href: string;
  badge?: number;
  children?: StaffNavChildDef[];
}

/** Navigation child (sub-route) definition */
export interface StaffNavChildDef {
  label: string;
  href: string;
}

/** Navigation group definition */
export interface StaffNavGroupDef {
  label: string;
  items: StaffNavItemDef[];
}

/** Sidebar state */
export interface StaffSidebarState {
  collapsed: boolean;
  mobileOpen: boolean;
}

/** Breadcrumb segment */
export interface StaffBreadcrumbSegment {
  label: string;
  href: string;
}

/** Notification item */
export interface StaffNotificationItem {
  id: string;
  title: string;
  description: string;
  time: Date;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
}

/** Quick action definition */
export interface StaffQuickActionDef {
  icon: ElementType;
  label: string;
  description: string;
  href: string;
  shortcut?: string;
  color: string;
}

/** Command palette item */
export interface StaffCommandItem {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: ElementType;
  category: string;
  keywords: string[];
}

/** Staff context value */
export interface StaffContextValue {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleMobileSidebar: () => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

/** Staff member info */
export interface StaffMember {
  name: string;
  initials: string;
  email: string;
  department: string;
  role: string;
  avatar?: string;
}
