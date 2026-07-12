export type PatientStatus =
  | "Active"
  | "Inactive"
  | "Admitted"
  | "Discharged"
  | "Pending";
export type Gender = "Male" | "Female";
export type BloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";
export type ViewMode = "table" | "card";
export type SortField = "newest" | "oldest" | "name" | "recentVisit";
export type ExportFormat = "csv" | "excel" | "pdf";

export interface Patient {
  id: string;
  patientId: string;
  name: string;
  initials: string;
  avatar: string;
  age: number;
  gender: Gender;
  bloodGroup: BloodGroup;
  email: string;
  phone: string;
  department: string;
  assignedDoctor: string;
  assignedDoctorInitials: string;
  lastVisit: string;
  upcomingAppointment: string | null;
  status: PatientStatus;
  insurance: string;
  registrationDate: string;
  address: string;
  emergencyContact: string;
  notes: string;
}

export interface PatientFilters {
  search: string;
  department: string[];
  doctor: string[];
  bloodGroup: BloodGroup[];
  gender: Gender[];
  insurance: string[];
  ageRange: [number, number];
  status: PatientStatus[];
  appointmentStatus: string[];
  registrationDate: string;
  sortBy: SortField;
  sortAsc: boolean;
}

export const DEFAULT_FILTERS: PatientFilters = {
  search: "",
  department: [],
  doctor: [],
  bloodGroup: [],
  gender: [],
  insurance: [],
  ageRange: [0, 120],
  status: [],
  appointmentStatus: [],
  registrationDate: "",
  sortBy: "newest",
  sortAsc: false,
};
