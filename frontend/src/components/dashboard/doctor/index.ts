// ── Appointment Details ──
export { AppointmentCardView } from "./appointments/AppointmentCardView";
export { AppointmentsLoadingSkeleton } from "./appointments/AppointmentsLoadingSkeleton";
export { AppointmentsTable } from "./appointments/AppointmentsTable";
export { AppointmentStats } from "./appointments/AppointmentStats";
export { AppointmentsToolbar } from "./appointments/AppointmentsToolbar";
export { AppointmentTimeline } from "./appointments/AppointmentTimeline";

// ── Patient List ──
export { AppointmentDetailHeader } from "./appointments/AppointmentDetailHeader";
export { AttachmentsTab } from "./appointments/AttachmentsTab";
export { ConsultationStatusBadge } from "./appointments/ConsultationStatus";
export { HistoryTab } from "./appointments/HistoryTab";
export { LabRequestTab } from "./appointments/LabRequestTab";
export { NotesTab } from "./appointments/NotesTab";
export { OverviewTab } from "./appointments/OverviewTab";
export { PatientHero } from "./appointments/PatientHero";
export { PatientSidebar } from "./appointments/PatientSidebar";
export { PrescriptionTab } from "./appointments/PrescriptionTab";
export { TimelineTab } from "./appointments/TimelineTab";
export { TodaySummary } from "./appointments/TodaySummary";
export { VitalsTab } from "./appointments/VitalsTab";
export { AvailabilityCard } from "./AvailabilityCard";
export { Breadcrumb } from "./Breadcrumb";
export { CalendarPreview } from "./CalendarPreview";
export { CommandPalette } from "./CommandPalette";
export { DashboardContainer } from "./DashboardContainer";
export { DashboardContent } from "./DashboardContent";
export { DashboardHero } from "./DashboardHero";
export { DashboardSkeleton } from "./DashboardSkeleton";
export { DoctorProvider, useDoctorContext } from "./DoctorProvider";
export { EmptyState } from "./EmptyState";
export { ErrorState } from "./ErrorState";
export { Header } from "./Header";
export { LoadingSkeleton } from "./LoadingSkeleton";
export { MobileSidebar } from "./MobileSidebar";
export { NotificationDropdown } from "./NotificationDropdown";
export { NotificationsCard } from "./NotificationsCard";
export { PageHeader } from "./PageHeader";
export { PatientOverview } from "./PatientOverview";
export { PatientCard } from "./patients/PatientCard";
export { PatientDrawer } from "./patients/PatientDrawer";
export { PatientEmptyState } from "./patients/PatientEmptyState";
export { PatientLoadingSkeleton } from "./patients/PatientLoadingSkeleton";
export { PatientStats } from "./patients/PatientStats";
export { PatientTable } from "./patients/PatientTable";
export { PatientToolbar } from "./patients/PatientToolbar";
export { PendingTasks } from "./PendingTasks";
export { PerformanceCharts } from "./PerformanceCharts";
export { QuickActionCards } from "./QuickActionCards";
export { QuickActions } from "./QuickActions";
export { RecentActivities } from "./RecentActivities";
export { SearchBar } from "./SearchBar";
export { Sidebar } from "./Sidebar";
export { SidebarGroup } from "./SidebarGroup";
export { SidebarItem } from "./SidebarItem";
export { StatisticsCards } from "./StatisticsCards";
export { ThemeToggle } from "./ThemeToggle";
export { TodaySchedule } from "./TodaySchedule";
export { UpcomingAppointments } from "./UpcomingAppointments";
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
