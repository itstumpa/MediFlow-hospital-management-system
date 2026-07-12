export type AppointmentStatus =
  | "Confirmed"
  | "Pending"
  | "Completed"
  | "Cancelled"
  | "No Show"
  | "Rescheduled"
  | "Checked In"
  | "In Progress";

export type ConsultationType = "Video" | "In-Person" | "Phone" | "Emergency";

export type PaymentStatus =
  | "Paid"
  | "Pending"
  | "Refunded"
  | "Waived"
  | "Insurance";

export type ViewMode = "table" | "card";

export type SortField =
  | "newest"
  | "oldest"
  | "date"
  | "time"
  | "name"
  | "doctor";

export type ExportFormat = "csv" | "excel" | "pdf";

export interface Appointment {
  id: string;
  appointmentId: string;
  patientName: string;
  patientInitials: string;
  patientAvatar: string;
  patientAge: number;
  patientGender: string;
  doctorName: string;
  doctorInitials: string;
  department: string;
  date: string;
  time: string;
  duration: number;
  consultationType: ConsultationType;
  paymentStatus: PaymentStatus;
  status: AppointmentStatus;
  notes: string;
  createdAt: string;
}

export interface AppointmentFilters {
  search: string;
  department: string[];
  doctor: string[];
  status: AppointmentStatus[];
  dateRange: [string, string];
  timeRange: [string, string];
  consultationType: ConsultationType[];
  paymentStatus: PaymentStatus[];
  sortBy: SortField;
  sortAsc: boolean;
}

export const DEFAULT_FILTERS: AppointmentFilters = {
  search: "",
  department: [],
  doctor: [],
  status: [],
  dateRange: ["", ""],
  timeRange: ["", ""],
  consultationType: [],
  paymentStatus: [],
  sortBy: "date",
  sortAsc: true,
};
