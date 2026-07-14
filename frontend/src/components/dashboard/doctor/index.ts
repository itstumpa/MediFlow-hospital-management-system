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

// ── Patient Profile ──
export { HealthSummaryCards } from "./patients/HealthSummaryCards";
export {
  mockPatientProfiles,
  profileTabOptions,
} from "./patients/patient-profile-mock-data";
export type {
  AllergyItem,
  AppointmentHistoryItem,
  DiagnosisItem,
  DocumentItem,
  LabReportItem,
  MedicationItem,
  PatientProfile,
  PrescriptionHistoryItem,
  ProfileTabId,
  RiskScore,
  TimelineEntry,
  VaccinationItem,
  VitalsData,
} from "./patients/patient-profile-mock-data";
export { PatientProfileHero } from "./patients/PatientProfileHero";
export { PatientProfileSidebar } from "./patients/PatientProfileSidebar";
export { ProfileAllergyTab } from "./patients/ProfileAllergyTab";
export { ProfileAppointmentHistoryTab } from "./patients/ProfileAppointmentHistoryTab";
export { ProfileDocumentsTab } from "./patients/ProfileDocumentsTab";
export { ProfileLabReportsTab } from "./patients/ProfileLabReportsTab";
export { ProfileMedicalHistoryTab } from "./patients/ProfileMedicalHistoryTab";
export { ProfileOverviewTab } from "./patients/ProfileOverviewTab";
export { ProfilePrescriptionHistoryTab } from "./patients/ProfilePrescriptionHistoryTab";
export { ProfileTimelineTab } from "./patients/ProfileTimelineTab";
export { ProfileVaccinationTab } from "./patients/ProfileVaccinationTab";

// ── Prescription Management ──
export { MedicineCard } from "./prescriptions/MedicineCard";
export { MedicineSearch } from "./prescriptions/MedicineSearch";
export { PrescriptionCard } from "./prescriptions/PrescriptionCard";
export { PrescriptionEditor } from "./prescriptions/PrescriptionEditor";
export { PrescriptionPreview } from "./prescriptions/PrescriptionPreview";
export {
  filterPrescriptions,
  generatePrescriptionId,
  initialFilters,
  medicineOptions,
  mockPrescriptions,
  prescriptionStatsData,
  prescriptionTemplates,
} from "./prescriptions/prescriptions-mock-data";
export type {
  FilterState,
  MedicineItem,
  MedicineOption,
  PrescriptionRecord,
  PrescriptionSort,
  PrescriptionStat,
  PrescriptionStatus,
  PrescriptionTemplate,
  ViewMode,
} from "./prescriptions/prescriptions-mock-data";
export { PrescriptionStats } from "./prescriptions/PrescriptionStats";
export { PrescriptionTable } from "./prescriptions/PrescriptionTable";
export { PrescriptionToolbar } from "./prescriptions/PrescriptionToolbar";
export { TemplateSelector } from "./prescriptions/TemplateSelector";

// ── Schedule Management ──
export { AvailabilityStatus } from "./schedule/AvailabilityStatus";
export { CalendarView } from "./schedule/CalendarView";
export {
  availabilityStatusOptions,
  blockedTimeEntries,
  blockedTimeTypeOptions,
  buildCurrentWeekData,
  computeTodaySummary,
  dayOfWeekLabels,
  dayOfWeekOrder,
  defaultScheduleFilters,
  defaultWorkingHours,
  formatTime12h,
  generateTimeSlots,
  generateWeeklyTimeSlots,
  getMonthDays,
  getWeekDates,
  parseTimeToMinutes,
  scheduleStatsData,
  vacationEntries,
} from "./schedule/schedule-mock-data";
export type {
  AvailabilityStatusType,
  BlockedTimeEntry,
  BlockedTimeType,
  CalendarViewType,
  DayOfWeek,
  ScheduleAppointment,
  ScheduleStat,
  TimeSlot,
  VacationEntry,
  VacationStatus,
  VacationType,
  WorkingDay,
} from "./schedule/schedule-mock-data";
export { ScheduleSidebar } from "./schedule/ScheduleSidebar";
export { ScheduleStats } from "./schedule/ScheduleStats";
export { TimeSlotEditor } from "./schedule/TimeSlotEditor";
export { VacationManager } from "./schedule/VacationManager";
export { WorkingHours } from "./schedule/WorkingHours";

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

// ── Doctor Profile ──
export { AccountSettings } from "./profile/AccountSettings";
export { CertificateTab } from "./profile/CertificateTab";
export { ClinicTab } from "./profile/ClinicTab";
export { ConsultationSettings } from "./profile/ConsultationSettings";
export {
  computeProfileCompletion,
  doctorProfileTabOptions,
  mockDoctorProfile,
} from "./profile/doctor-profile-mock-data";
export type {
  AccountSettings as AccountSettingsType,
  CertificateEntry,
  ClinicInfo,
  ConsultationSettings as ConsultationSettingsType,
  DoctorProfile,
  DoctorProfileTabId,
  DoctorProfileTabOption,
  EducationEntry,
  ExperienceEntry,
  LanguageEntry,
  NotificationChannel,
  NotificationSettings as NotificationSettingsType,
  ProfileCompletionSection,
} from "./profile/doctor-profile-mock-data";
export { DoctorHero } from "./profile/DoctorHero";
export { EducationTab } from "./profile/EducationTab";
export { ExperienceTab } from "./profile/ExperienceTab";
export { LanguageTab } from "./profile/LanguageTab";
export { NotificationSettings } from "./profile/NotificationSettings";
export { PersonalTab } from "./profile/PersonalTab";
export { ProfessionalTab } from "./profile/ProfessionalTab";
export { ProfileCompletion } from "./profile/ProfileCompletion";
export { ProfileSidebar } from "./profile/ProfileSidebar";

// ── Security & Privacy ──
export { DangerZone } from "./security/DangerZone";
export { DevicesCard } from "./security/DevicesCard";
export { ExportCard } from "./security/ExportCard";
export { LoginHistory } from "./security/LoginHistory";
export { PasswordCard } from "./security/PasswordCard";
export { PrivacyCard } from "./security/PrivacyCard";
export {
  evaluatePasswordStrength,
  mockActiveSessions,
  mockBackupCodes,
  mockConnectedDevices,
  mockLoginHistory,
  mockPrivacySettings,
  mockSecurityMetrics,
  mockSecurityScore,
  passwordStrengthColors,
  passwordStrengthLabels,
  securityTips,
} from "./security/security-mock-data";
export type {
  ActiveSession,
  BackupCode,
  ConnectedDevice,
  LoginSession,
  PasswordStrength,
  PrivacySettings,
  SecurityCheckItem,
  SecurityMetrics,
  SecurityRecommendation,
  SecurityScoreData,
  TwoFactorMethod,
} from "./security/security-mock-data";
export { SecurityScore } from "./security/SecurityScore";
export { SessionsCard } from "./security/SessionsCard";
export { TwoFactorCard } from "./security/TwoFactorCard";
