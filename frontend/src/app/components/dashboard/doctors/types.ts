export type DoctorStatus =
  | "Active"
  | "Inactive"
  | "On Leave"
  | "Vacation"
  | "Emergency Duty";
export type Availability = "Available" | "Busy" | "Out of Office";
export type Gender = "Male" | "Female";
export type ConsultationType = "Online" | "Offline" | "Both";
export type ViewMode = "table" | "grid";
export type SortField =
  | "name"
  | "department"
  | "experience"
  | "patients"
  | "rating"
  | "status";
export type ExportFormat = "csv" | "excel" | "pdf";

export interface Doctor {
  id: string;
  name: string;
  initials: string;
  photo: string;
  department: string;
  specialization: string;
  experience: number;
  patients: number;
  rating: number;
  status: DoctorStatus;
  availability: Availability;
  gender: Gender;
  languages: string[];
  consultationType: ConsultationType;
  email: string;
  phone: string;
  appointmentsToday: number;
  verified: boolean;
}

export interface DoctorFilters {
  search: string;
  department: string[];
  specialization: string[];
  experience: [number, number];
  status: DoctorStatus[];
  gender: Gender[];
  availability: Availability[];
  consultationType: ConsultationType[];
  rating: [number, number];
  sortBy: SortField;
  sortAsc: boolean;
}

export const DEFAULT_FILTERS: DoctorFilters = {
  search: "",
  department: [],
  specialization: [],
  experience: [0, 50],
  status: [],
  gender: [],
  availability: [],
  consultationType: [],
  rating: [0, 5],
  sortBy: "name",
  sortAsc: true,
};
