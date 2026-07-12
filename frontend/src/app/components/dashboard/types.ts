import type { ElementType, ReactNode } from "react";

/** Navigation item definition */
export interface NavItemDef {
  icon: ElementType;
  label: string;
  href: string;
  badge?: number;
}

/** Navigation group definition */
export interface NavGroupDef {
  label: string;
  items: NavItemDef[];
}

/** Sidebar state */
export interface SidebarState {
  collapsed: boolean;
  mobileOpen: boolean;
}

/** Breadcrumb segment */
export interface BreadcrumbSegment {
  label: string;
  href: string;
}

/** Notification item */
export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: Date;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
}

/** Dashboard context value */
export interface DashboardContextValue {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleMobileSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

/** Dashboard provider props */
export interface DashboardProviderProps {
  children: ReactNode;
}
