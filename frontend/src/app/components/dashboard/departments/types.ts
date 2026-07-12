export type DepartmentStatus =
  | "Active"
  | "Inactive"
  | "Under Maintenance"
  | "Closed";
export type ViewMode = "table" | "grid";
export type SortField =
  | "name"
  | "head"
  | "doctors"
  | "patients"
  | "appointments"
  | "floor"
  | "status"
  | "createdAt";
export type ExportFormat = "csv" | "excel" | "pdf";

export interface Department {
  id: string;
  name: string;
  icon: string;
  iconBg: string;
  description: string;
  head: string;
  headInitials: string;
  headAvatar?: string;
  doctors: number;
  patients: number;
  appointments: number;
  appointmentsToday: number;
  floor: string;
  building: string;
  status: DepartmentStatus;
  createdAt: string;
  satisfaction: number;
  color: string;
}

export interface DepartmentFilters {
  search: string;
  head: string;
  status: DepartmentStatus[];
  floor: string[];
  building: string[];
  doctorsRange: [number, number];
  patientsRange: [number, number];
  appointmentVolume: [number, number];
  sortBy: SortField;
  sortAsc: boolean;
}

export const DEFAULT_FILTERS: DepartmentFilters = {
  search: "",
  head: "",
  status: [],
  floor: [],
  building: [],
  doctorsRange: [0, 100],
  patientsRange: [0, 50000],
  appointmentVolume: [0, 10000],
  sortBy: "name",
  sortAsc: true,
};

export const STATUS_OPTIONS: DepartmentStatus[] = [
  "Active",
  "Inactive",
  "Under Maintenance",
  "Closed",
];

export const FLOOR_OPTIONS = [
  "Ground Floor",
  "1st Floor",
  "2nd Floor",
  "3rd Floor",
  "4th Floor",
  "5th Floor",
  "6th Floor",
  "7th Floor",
  "8th Floor",
  "9th Floor",
  "10th Floor",
] as const;

export const BUILDING_OPTIONS = [
  "Main Building",
  "East Wing",
  "West Wing",
  "North Wing",
  "South Wing",
  "Children's Pavilion",
  "Cardiac Tower",
  "Research Center",
] as const;

export const DOCTOR_COUNT_RANGES = [
  { label: "0–10", min: 0, max: 10 },
  { label: "11–25", min: 11, max: 25 },
  { label: "26–50", min: 26, max: 50 },
  { label: "50+", min: 50, max: 999 },
] as const;

export const PATIENT_COUNT_RANGES = [
  { label: "0–1K", min: 0, max: 1000 },
  { label: "1K–5K", min: 1000, max: 5000 },
  { label: "5K–15K", min: 5000, max: 15000 },
  { label: "15K+", min: 15000, max: 999999 },
] as const;

export const APPOINTMENT_VOLUME_RANGES = [
  { label: "0–500", min: 0, max: 500 },
  { label: "500–2K", min: 500, max: 2000 },
  { label: "2K–5K", min: 2000, max: 5000 },
  { label: "5K+", min: 5000, max: 99999 },
] as const;
