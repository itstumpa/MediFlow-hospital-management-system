export { Sidebar } from "./Sidebar";
export { SidebarItem } from "./SidebarItem";
export { SidebarGroup } from "./SidebarGroup";
export { MobileSidebar } from "./MobileSidebar";
export { Header } from "./Header";
export { SearchBar } from "./SearchBar";
export { Breadcrumb } from "./Breadcrumb";
export { NotificationDropdown } from "./NotificationDropdown";
export { UserDropdown } from "./UserDropdown";
export { ThemeToggle } from "./ThemeToggle";
export { DashboardContainer } from "./DashboardContainer";
export { DashboardContent } from "./DashboardContent";
export { PageHeader } from "./PageHeader";
export { DashboardProvider, useDashboard } from "./use-dashboard";
export {
  PageSkeleton,
  StatGridSkeleton,
  TableSkeleton,
  ChartSkeleton,
  StatCardSkeleton,
  TableRowSkeleton,
} from "./DashboardSkeleton";
export { navigationGroups, allNavItems, breadcrumbLabels } from "./navigation";
export {
  fadeUp,
  fadeDown,
  fadeIn,
  scaleFade,
  slideLeft,
  staggerContainer,
  staggerItem,
  hoverLift,
  buttonPress,
} from "./MotionVariants";
export type { NavItemDef, NavGroupDef, BreadcrumbSegment, NotificationItem, DashboardContextValue } from "./types";

/* ============================================
   Dashboard Overview components
   ============================================ */
export { AnimatedCounter } from "./AnimatedCounter";
export { Sparkline } from "./Sparkline";
export { StatsCard } from "./StatsCard";
export type { StatsCardData } from "./StatsCard";
export { StatsGrid } from "./StatsGrid";
export { RevenueChart } from "./RevenueChart";
export { AppointmentChart } from "./AppointmentChart";
export { AppointmentTable } from "./AppointmentTable";
export { RecentPatients } from "./RecentPatients";
export { QuickActions } from "./QuickActions";
export { ActivityTimeline } from "./ActivityTimeline";
export { LatestMessages } from "./LatestMessages";
export { TopDoctors } from "./TopDoctors";
export { SystemStatus } from "./SystemStatus";
