import type { ElementType, ReactNode } from "react";

/** Navigation item definition */
export interface PatientNavItemDef {
  icon: ElementType;
  label: string;
  href: string;
  badge?: number;
}

/** Navigation group definition */
export interface PatientNavGroupDef {
  label: string;
  items: PatientNavItemDef[];
}

/** Sidebar state */
export interface PatientSidebarState {
  collapsed: boolean;
  mobileOpen: boolean;
}

/** Breadcrumb segment */
export interface PatientBreadcrumbSegment {
  label: string;
  href: string;
}

/** Notification item */
export interface PatientNotificationItem {
  id: string;
  title: string;
  description: string;
  time: Date;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
}

/** Patient context value */
export interface PatientContextValue {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleMobileSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

/** Patient provider props */
export interface PatientProviderProps {
  children: ReactNode;
}
