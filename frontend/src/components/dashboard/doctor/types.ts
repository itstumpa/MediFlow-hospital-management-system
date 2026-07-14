import type { ElementType } from "react";

/* ============================================
   Navigation
   ============================================ */

export interface DoctorNavItemDef {
  icon: ElementType;
  label: string;
  href: string;
  badge?: number;
}

export interface DoctorNavGroupDef {
  label: string;
  items: DoctorNavItemDef[];
}

/* ============================================
   Sidebar state
   ============================================ */

export interface DoctorSidebarState {
  collapsed: boolean;
  mobileOpen: boolean;
}

/* ============================================
   Breadcrumb
   ============================================ */

export interface DoctorBreadcrumbSegment {
  label: string;
  href: string;
}

/* ============================================
   Notification
   ============================================ */

export type NotificationType = "info" | "success" | "warning" | "error";

export interface DoctorNotificationItem {
  id: string;
  title: string;
  description: string;
  time: Date;
  read: boolean;
  type: NotificationType;
}

/* ============================================
   Quick Action
   ============================================ */

export interface DoctorQuickActionDef {
  icon: ElementType;
  label: string;
  shortcut?: string;
  action: () => void;
}

/* ============================================
   Command Palette
   ============================================ */

export interface CommandPaletteItem {
  icon: ElementType;
  label: string;
  description?: string;
  href?: string;
  action?: () => void;
  category: "page" | "patient" | "appointment" | "action";
}

/* ============================================
   Doctor Context
   ============================================ */

export interface DoctorContextValue {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleMobileSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
}

/* ============================================
   Skeleton types
   ============================================ */

export type SkeletonVariant =
  | "card"
  | "table"
  | "form"
  | "sidebar"
  | "header"
  | "text"
  | "avatar";
