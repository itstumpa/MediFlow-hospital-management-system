export { Breadcrumb } from "./Breadcrumb";
export { DashboardContainer } from "./DashboardContainer";
export { DashboardContent } from "./DashboardContent";
export { Header } from "./Header";
export { MobileSidebar } from "./MobileSidebar";
export { NotificationDropdown } from "./NotificationDropdown";
export { PageHeader } from "./PageHeader";
export { PatientProvider, usePatientContext } from "./PatientProvider";
export { SearchBar } from "./SearchBar";
export { Sidebar } from "./Sidebar";
export { SidebarGroup } from "./SidebarGroup";
export { SidebarItem } from "./SidebarItem";
export { ThemeToggle } from "./ThemeToggle";
export { UserDropdown } from "./UserDropdown";

/* Re-export motion variants for convenience */
export {
  activeIndicatorVariants,
  fadeDown,
  fadeIn,
  fadeInBackdrop,
  fadeUp,
  fastEase,
  hoverLift,
  logoTextVariants,
  pageTransition,
  scaleFade,
  scaleUp,
  sidebarVariants,
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

/* Re-export types */
export type {
  PatientBreadcrumbSegment,
  PatientContextValue,
  PatientNavGroupDef,
  PatientNavItemDef,
  PatientNotificationItem,
  PatientProviderProps,
  PatientSidebarState,
} from "./types";

/* Re-export navigation constants */
export {
  allPatientNavItems,
  patientBreadcrumbLabels,
  patientNavigationGroups,
} from "./navigation";
