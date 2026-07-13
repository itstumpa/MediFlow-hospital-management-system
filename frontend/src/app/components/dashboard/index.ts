export { AnimatedBadge, Badge } from "./Badge";
export type { BadgeProps, BadgeVariant } from "./Badge";
export { Breadcrumb } from "./Breadcrumb";
export { Button } from "./Button";
export type { ButtonProps, ButtonSize, ButtonVariant } from "./Button";
export { DashboardContainer } from "./DashboardContainer";
export { DashboardContent } from "./DashboardContent";
export {
  ChartSkeleton,
  PageSkeleton,
  StatCardSkeleton,
  StatGridSkeleton,
  TableRowSkeleton,
  TableSkeleton,
} from "./DashboardSkeleton";
export { Header } from "./Header";
export { MobileSidebar } from "./MobileSidebar";
export {
  badgePulse,
  buttonPress,
  counterEntrance,
  fadeDown,
  fadeIn,
  fadeInBackdrop,
  fadeUp,
  fastEase,
  hoverGlow,
  hoverLift,
  iconHover,
  pageTransition,
  scaleFade,
  scaleUp,
  shimmerAnimation,
  slideLeft,
  slideRight,
  slideUp,
  smoothEase,
  springBounce,
  springGentle,
  staggerContainer,
  staggerItem,
  staggerTable,
  tableRowFade,
} from "./MotionVariants";
export { allNavItems, breadcrumbLabels, navigationGroups } from "./navigation";
export { NotificationDropdown } from "./NotificationDropdown";
export { PageHeader } from "./PageHeader";
export { SearchBar } from "./SearchBar";
export { Sidebar } from "./Sidebar";
export { SidebarGroup } from "./SidebarGroup";
export { SidebarItem } from "./SidebarItem";
export { ThemeToggle } from "./ThemeToggle";
export type {
  BreadcrumbSegment,
  DashboardContextValue,
  NavGroupDef,
  NavItemDef,
  NotificationItem,
} from "./types";
export { DashboardProvider, useDashboard } from "./use-dashboard";
export { UserDropdown } from "./UserDropdown";

/* ============================================
   Dashboard Overview components
   ============================================ */
export { ActivityTimeline } from "./ActivityTimeline";
export { AnimatedCounter } from "./AnimatedCounter";
export { AppointmentChart } from "./AppointmentChart";
export { AppointmentTable } from "./AppointmentTable";
export { LatestMessages } from "./LatestMessages";

/* ============================================
   Appointment Detail components
   ============================================ */
export {
  ActivityTab,
  AppointmentHero,
  AppointmentSidebar,
  AppointmentStats,
  BillingTab,
  DoctorTab,
  MedicalNotesTab,
  OverviewTab,
  PatientTab,
  PrescriptionTab,
} from "./appointments";
export { QuickActions } from "./QuickActions";
export { RecentPatients } from "./RecentPatients";
export { RevenueChart } from "./RevenueChart";
export { Sparkline } from "./Sparkline";
export { StatsCard } from "./StatsCard";
export type { StatsCardData } from "./StatsCard";
export { StatsGrid } from "./StatsGrid";
export { SystemStatus } from "./SystemStatus";
export { TopDoctors } from "./TopDoctors";

/* ============================================
   Notification Center components
   ============================================ */
export {
  NotificationCard,
  NotificationDrawer,
  NotificationFilters,
  NotificationList,
  NotificationStats,
  SettingsDialog,
} from "./notifications";

/* ============================================
   Roles & Permissions (RBAC) components
   ============================================ */
export {
  AssignUsersDialog,
  DeleteDialog,
  PermissionMatrix,
  RoleForm,
  RolesPage,
  RolesTable,
  RoleStats,
  SearchFilters,
} from "./roles";

/* ============================================
   Manage Doctors components
   ============================================ */
export { DEFAULT_FILTERS, doctorsData } from "./doctors";
export { BulkActions } from "./doctors/BulkActions";
export { DeleteDoctorDialog } from "./doctors/DeleteDoctorDialog";
export { DoctorCard } from "./doctors/DoctorCard";
export { DoctorFilters } from "./doctors/DoctorFilters";
export { DoctorsStats } from "./doctors/DoctorsStats";
export { DoctorsTable } from "./doctors/DoctorsTable";
export { DoctorsToolbar } from "./doctors/DoctorsToolbar";
export { EmptyState } from "./doctors/EmptyState";
export { ExportDialog } from "./doctors/ExportDialog";
export { ImportDialog } from "./doctors/ImportDialog";
export { LoadingSkeleton } from "./doctors/LoadingSkeleton";
export type {
  Doctor,
  DoctorFilters as DoctorFiltersType,
  ExportFormat,
  SortField,
  ViewMode,
} from "./doctors/types";

/* ============================================
   Article Categories components
   ============================================ */
export { CategoryCard } from "./articles/categories/CategoryCard";
export { CategoryForm } from "./articles/categories/CategoryForm";
export type { CategoryFormData } from "./articles/categories/CategoryForm";
export { CategoryTable } from "./articles/categories/CategoryTable";
export { DeleteDialog as DeleteCategoryDialog } from "./articles/categories/DeleteDialog";
export { EmptyState as CategoryEmptyState } from "./articles/categories/EmptyState";
export { categoriesData } from "./articles/categories/mock";
export { StatsCards as CategoryStatsCards } from "./articles/categories/StatsCards";
export { DEFAULT_FILTERS as DEFAULT_CATEGORY_FILTERS } from "./articles/categories/types";
export type {
  ArticleCategory,
  CategoryFilters as CategoryFiltersType,
  CategoryStatus,
  ViewMode as CategoryViewMode,
} from "./articles/categories/types";

/* ============================================
   Command Palette (Global Search)
   ============================================ */
export {
  CommandPalette,
  CommandPaletteProvider,
  useCommandPalette,
} from "./command-palette";
export type {
  CommandPaletteContextValue,
  CommandPaletteItem,
} from "./command-palette";
