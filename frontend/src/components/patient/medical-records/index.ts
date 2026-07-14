export { EmptyState } from "./EmptyState";
export { Filters } from "./Filters";
export { HealthQuickSummary } from "./HealthQuickSummary";
export {
  CardsSkeleton,
  TableSkeleton,
  TimelineSkeleton,
} from "./LoadingSkeleton";
export { MedicalCard } from "./MedicalCard";
export { MedicalRecords } from "./MedicalRecords";
export { MedicalSummary } from "./MedicalSummary";
export { MedicalTable } from "./MedicalTable";
export { MedicalTimeline } from "./MedicalTimeline";

export type {
  HealthSummary,
  MedicalFilters,
  MedicalRecord,
  MedicalStats,
  RecordAttachment,
  RecordDoctor,
  RecordStatus,
  RecordType,
  ViewMode,
} from "./types";

export {
  allDepartments,
  allDoctors,
  computeMedicalStats,
  DEFAULT_MEDICAL_FILTERS,
  getFilteredRecords,
  groupRecordsByYear,
  mockHealthSummary,
  mockMedicalRecords,
  mockRecordDoctors,
  recordStatusConfig,
  recordTypeColors,
  recordTypeIcons,
  recordTypeLabels,
  sortRecords,
} from "./types";
