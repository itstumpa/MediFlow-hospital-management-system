import {
  AlertCircle,
  Calendar,
  CalendarCheck,
  CalendarX,
  CheckCircle2,
  Clock,
  type LucideIcon,
  RefreshCw,
  UserX,
} from "lucide-react";

/* ══════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════ */

export type AppointmentStatus =
  | "confirmed"
  | "checked-in"
  | "waiting"
  | "completed"
  | "cancelled"
  | "no-show"
  | "rescheduled";

export type VisitType =
  | "general-checkup"
  | "follow-up"
  | "consultation"
  | "emergency"
  | "routine-exam"
  | "procedure"
  | "telehealth";

export type Priority = "low" | "normal" | "high" | "urgent";

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientInitials: string;
  patientAvatar?: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  startTime: string;
  endTime: string;
  type: VisitType;
  status: AppointmentStatus;
  priority: Priority;
  reason: string;
  notes?: string;
  createdAt: string;
}

export interface AppointmentStat {
  id: string;
  label: string;
  value: number;
  change: number;
  changeLabel: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  color: string;
}

export interface WaitlistEntry {
  id: string;
  patientName: string;
  patientInitials: string;
  requestedDoctor: string;
  preferredDate: string;
  preferredTime: string;
  priority: Priority;
  reason: string;
  addedAt: string;
  phone: string;
}

export interface DoctorSlot {
  doctorId: string;
  doctorName: string;
  department: string;
  available: boolean;
  nextSlot: string;
  slotsToday: number;
  image?: string;
}

export interface CalendarDay {
  date: number;
  month: number;
  year: number;
  isToday: boolean;
  isCurrentMonth: boolean;
  appointments: Appointment[];
}

/* ══════════════════════════════════════════════
   Statistics Data
   ══════════════════════════════════════════════ */

export const appointmentStats: AppointmentStat[] = [
  {
    id: "today",
    label: "Today's Appointments",
    value: 24,
    change: 12.5,
    changeLabel: "vs yesterday",
    trend: "up",
    icon: CalendarCheck,
    color: "emerald",
  },
  {
    id: "upcoming",
    label: "Upcoming",
    value: 18,
    change: 8.3,
    changeLabel: "vs yesterday",
    trend: "up",
    icon: Calendar,
    color: "blue",
  },
  {
    id: "completed",
    label: "Completed",
    value: 32,
    change: 15.0,
    changeLabel: "vs last week",
    trend: "up",
    icon: CheckCircle2,
    color: "violet",
  },
  {
    id: "cancelled",
    label: "Cancelled",
    value: 4,
    change: -33.3,
    changeLabel: "vs last week",
    trend: "down",
    icon: CalendarX,
    color: "rose",
  },
  {
    id: "no-show",
    label: "No Show",
    value: 2,
    change: 0,
    changeLabel: "no change",
    trend: "neutral",
    icon: UserX,
    color: "amber",
  },
  {
    id: "rescheduled",
    label: "Rescheduled",
    value: 5,
    change: 25.0,
    changeLabel: "vs last week",
    trend: "up",
    icon: RefreshCw,
    color: "cyan",
  },
];

/* ══════════════════════════════════════════════
   Appointments Data
   ══════════════════════════════════════════════ */

export const appointments: Appointment[] = [
  {
    id: "APT-001",
    patientId: "P-1001",
    patientName: "Emily Johnson",
    patientInitials: "EJ",
    doctorId: "D-001",
    doctorName: "Dr. Sarah Chen",
    department: "General Medicine",
    date: "2026-07-14",
    startTime: "09:00",
    endTime: "09:30",
    type: "general-checkup",
    status: "checked-in",
    priority: "normal",
    reason: "Annual physical examination",
    createdAt: "2026-07-10T08:00:00Z",
  },
  {
    id: "APT-002",
    patientId: "P-1002",
    patientName: "Michael Brown",
    patientInitials: "MB",
    doctorId: "D-002",
    doctorName: "Dr. James Wilson",
    department: "Cardiology",
    date: "2026-07-14",
    startTime: "09:30",
    endTime: "10:00",
    type: "consultation",
    status: "waiting",
    priority: "high",
    reason: "Chest pain follow-up",
    notes: "Patient has history of hypertension",
    createdAt: "2026-07-08T14:30:00Z",
  },
  {
    id: "APT-003",
    patientId: "P-1003",
    patientName: "Sophia Garcia",
    patientInitials: "SG",
    doctorId: "D-003",
    doctorName: "Dr. Emily Martinez",
    department: "Pediatrics",
    date: "2026-07-14",
    startTime: "10:00",
    endTime: "10:30",
    type: "routine-exam",
    status: "completed",
    priority: "normal",
    reason: "Child wellness check",
    createdAt: "2026-07-05T10:00:00Z",
  },
  {
    id: "APT-004",
    patientId: "P-1004",
    patientName: "William Davis",
    patientInitials: "WD",
    doctorId: "D-004",
    doctorName: "Dr. Robert Kim",
    department: "Orthopedics",
    date: "2026-07-14",
    startTime: "10:30",
    endTime: "11:00",
    type: "follow-up",
    status: "confirmed",
    priority: "normal",
    reason: "Knee injury follow-up",
    createdAt: "2026-07-01T09:00:00Z",
  },
  {
    id: "APT-005",
    patientId: "P-1005",
    patientName: "Olivia Martinez",
    patientInitials: "OM",
    doctorId: "D-001",
    doctorName: "Dr. Sarah Chen",
    department: "General Medicine",
    date: "2026-07-14",
    startTime: "11:00",
    endTime: "11:30",
    type: "follow-up",
    status: "confirmed",
    priority: "low",
    reason: "Blood test results review",
    createdAt: "2026-07-12T16:00:00Z",
  },
  {
    id: "APT-006",
    patientId: "P-1006",
    patientName: "James Taylor",
    patientInitials: "JT",
    doctorId: "D-005",
    doctorName: "Dr. David Park",
    department: "Neurology",
    date: "2026-07-14",
    startTime: "11:30",
    endTime: "12:00",
    type: "consultation",
    status: "checked-in",
    priority: "high",
    reason: "Migraine assessment",
    notes: "Patient reports increased frequency",
    createdAt: "2026-07-09T11:00:00Z",
  },
  {
    id: "APT-007",
    patientId: "P-1007",
    patientName: "Emma Wilson",
    patientInitials: "EW",
    doctorId: "D-003",
    doctorName: "Dr. Emily Martinez",
    department: "Pediatrics",
    date: "2026-07-14",
    startTime: "13:00",
    endTime: "13:30",
    type: "general-checkup",
    status: "confirmed",
    priority: "normal",
    reason: "School physical",
    createdAt: "2026-07-11T07:30:00Z",
  },
  {
    id: "APT-008",
    patientId: "P-1008",
    patientName: "Daniel Kim",
    patientInitials: "DK",
    doctorId: "D-002",
    doctorName: "Dr. James Wilson",
    department: "Cardiology",
    date: "2026-07-14",
    startTime: "14:00",
    endTime: "14:30",
    type: "procedure",
    status: "confirmed",
    priority: "urgent",
    reason: "ECG procedure",
    createdAt: "2026-07-13T08:00:00Z",
  },
  {
    id: "APT-009",
    patientId: "P-1009",
    patientName: "Jennifer White",
    patientInitials: "JW",
    doctorId: "D-006",
    doctorName: "Dr. Lisa Anderson",
    department: "Dermatology",
    date: "2026-07-14",
    startTime: "09:00",
    endTime: "09:30",
    type: "consultation",
    status: "cancelled",
    priority: "normal",
    reason: "Skin rash evaluation",
    createdAt: "2026-07-07T13:00:00Z",
  },
  {
    id: "APT-010",
    patientId: "P-1010",
    patientName: "Thomas Clark",
    patientInitials: "TC",
    doctorId: "D-004",
    doctorName: "Dr. Robert Kim",
    department: "Orthopedics",
    date: "2026-07-14",
    startTime: "15:00",
    endTime: "15:30",
    type: "follow-up",
    status: "no-show",
    priority: "normal",
    reason: "Cast removal follow-up",
    createdAt: "2026-06-28T10:00:00Z",
  },
  {
    id: "APT-011",
    patientId: "P-1011",
    patientName: "Amanda Lee",
    patientInitials: "AL",
    doctorId: "D-001",
    doctorName: "Dr. Sarah Chen",
    department: "General Medicine",
    date: "2026-07-14",
    startTime: "08:00",
    endTime: "08:30",
    type: "general-checkup",
    status: "completed",
    priority: "normal",
    reason: "Pre-employment checkup",
    createdAt: "2026-07-03T09:00:00Z",
  },
  {
    id: "APT-012",
    patientId: "P-1012",
    patientName: "Robert Brown",
    patientInitials: "RB",
    doctorId: "D-001",
    doctorName: "Dr. Sarah Chen",
    department: "General Medicine",
    date: "2026-07-14",
    startTime: "16:00",
    endTime: "16:30",
    type: "telehealth",
    status: "confirmed",
    priority: "low",
    reason: "Medication review",
    notes: "Virtual visit via video call",
    createdAt: "2026-07-12T12:00:00Z",
  },
  {
    id: "APT-013",
    patientId: "P-1013",
    patientName: "Sarah Johnson",
    patientInitials: "SJ",
    doctorId: "D-005",
    doctorName: "Dr. David Park",
    department: "Neurology",
    date: "2026-07-14",
    startTime: "14:30",
    endTime: "15:00",
    type: "consultation",
    status: "rescheduled",
    priority: "high",
    reason: "Seizure evaluation",
    createdAt: "2026-07-06T15:00:00Z",
  },
  {
    id: "APT-014",
    patientId: "P-1014",
    patientName: "David Miller",
    patientInitials: "DM",
    doctorId: "D-007",
    doctorName: "Dr. Michael Thompson",
    department: "Ophthalmology",
    date: "2026-07-15",
    startTime: "09:00",
    endTime: "09:30",
    type: "routine-exam",
    status: "confirmed",
    priority: "normal",
    reason: "Annual eye exam",
    createdAt: "2026-07-10T08:30:00Z",
  },
  {
    id: "APT-015",
    patientId: "P-1015",
    patientName: "Jessica Brown",
    patientInitials: "JB",
    doctorId: "D-003",
    doctorName: "Dr. Emily Martinez",
    department: "Pediatrics",
    date: "2026-07-14",
    startTime: "08:30",
    endTime: "09:00",
    type: "emergency",
    status: "completed",
    priority: "urgent",
    reason: "High fever & cough",
    createdAt: "2026-07-14T07:45:00Z",
  },
];

/* ══════════════════════════════════════════════
   Waitlist Data
   ══════════════════════════════════════════════ */

export const waitlist: WaitlistEntry[] = [
  {
    id: "WL-001",
    patientName: "Alice Cooper",
    patientInitials: "AC",
    requestedDoctor: "Dr. Sarah Chen",
    preferredDate: "2026-07-15",
    preferredTime: "Morning",
    priority: "high",
    reason: "Acute back pain",
    addedAt: "2026-07-14T08:30:00Z",
    phone: "+1 (555) 123-4567",
  },
  {
    id: "WL-002",
    patientName: "George Harris",
    patientInitials: "GH",
    requestedDoctor: "Dr. Robert Kim",
    preferredDate: "2026-07-16",
    preferredTime: "Afternoon",
    priority: "normal",
    reason: "Follow-up on fracture",
    addedAt: "2026-07-13T14:15:00Z",
    phone: "+1 (555) 234-5678",
  },
  {
    id: "WL-003",
    patientName: "Nancy Drew",
    patientInitials: "ND",
    requestedDoctor: "Dr. James Wilson",
    preferredDate: "2026-07-15",
    preferredTime: "Morning",
    priority: "low",
    reason: "General checkup",
    addedAt: "2026-07-12T10:00:00Z",
    phone: "+1 (555) 345-6789",
  },
  {
    id: "WL-004",
    patientName: "Frank Castle",
    patientInitials: "FC",
    requestedDoctor: "Dr. David Park",
    preferredDate: "2026-07-14",
    preferredTime: "Any",
    priority: "urgent",
    reason: "Severe headaches",
    addedAt: "2026-07-14T06:00:00Z",
    phone: "+1 (555) 456-7890",
  },
];

/* ══════════════════════════════════════════════
   Doctor Availability
   ══════════════════════════════════════════════ */

export const doctorSlots: DoctorSlot[] = [
  {
    doctorId: "D-001",
    doctorName: "Dr. Sarah Chen",
    department: "General Medicine",
    available: true,
    nextSlot: "11:00 AM",
    slotsToday: 4,
  },
  {
    doctorId: "D-002",
    doctorName: "Dr. James Wilson",
    department: "Cardiology",
    available: true,
    nextSlot: "2:00 PM",
    slotsToday: 2,
  },
  {
    doctorId: "D-003",
    doctorName: "Dr. Emily Martinez",
    department: "Pediatrics",
    available: false,
    nextSlot: "Tomorrow",
    slotsToday: 0,
  },
  {
    doctorId: "D-004",
    doctorName: "Dr. Robert Kim",
    department: "Orthopedics",
    available: true,
    nextSlot: "10:30 AM",
    slotsToday: 3,
  },
  {
    doctorId: "D-005",
    doctorName: "Dr. David Park",
    department: "Neurology",
    available: true,
    nextSlot: "11:30 AM",
    slotsToday: 2,
  },
  {
    doctorId: "D-006",
    doctorName: "Dr. Lisa Anderson",
    department: "Dermatology",
    available: true,
    nextSlot: "2:30 PM",
    slotsToday: 1,
  },
];

/* ══════════════════════════════════════════════
   Filter Options
   ══════════════════════════════════════════════ */

export const departments = [
  "All Departments",
  "General Medicine",
  "Cardiology",
  "Pediatrics",
  "Orthopedics",
  "Neurology",
  "Dermatology",
  "Ophthalmology",
];

export const doctors = [
  "All Doctors",
  "Dr. Sarah Chen",
  "Dr. James Wilson",
  "Dr. Emily Martinez",
  "Dr. Robert Kim",
  "Dr. David Park",
  "Dr. Lisa Anderson",
  "Dr. Michael Thompson",
];

export const visitTypes: { value: VisitType | "all"; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "general-checkup", label: "General Checkup" },
  { value: "follow-up", label: "Follow-up" },
  { value: "consultation", label: "Consultation" },
  { value: "emergency", label: "Emergency" },
  { value: "routine-exam", label: "Routine Exam" },
  { value: "procedure", label: "Procedure" },
  { value: "telehealth", label: "Telehealth" },
];

export const statusOptions: { value: AppointmentStatus | "all"; label: string }[] = [
  { value: "all", label: "All Status" },
  { value: "confirmed", label: "Confirmed" },
  { value: "checked-in", label: "Checked In" },
  { value: "waiting", label: "Waiting" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "no-show", label: "No Show" },
  { value: "rescheduled", label: "Rescheduled" },
];

/* ══════════════════════════════════════════════
   Mock utility helpers
   ══════════════════════════════════════════════ */

export const statusConfig: Record<
  AppointmentStatus,
  { label: string; class: string; dot: string }
> = {
  confirmed: {
    label: "Confirmed",
    class:
      "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  "checked-in": {
    label: "Checked In",
    class:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  waiting: {
    label: "Waiting",
    class:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  completed: {
    label: "Completed",
    class:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    dot: "bg-slate-500",
  },
  cancelled: {
    label: "Cancelled",
    class:
      "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    dot: "bg-red-500",
  },
  "no-show": {
    label: "No Show",
    class:
      "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
    dot: "bg-rose-500",
  },
  rescheduled: {
    label: "Rescheduled",
    class:
      "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400",
    dot: "bg-violet-500",
  },
};

export const typeConfig: Record<VisitType, { label: string }> = {
  "general-checkup": { label: "General Checkup" },
  "follow-up": { label: "Follow-up" },
  consultation: { label: "Consultation" },
  emergency: { label: "Emergency" },
  "routine-exam": { label: "Routine Exam" },
  procedure: { label: "Procedure" },
  telehealth: { label: "Telehealth" },
};

export const priorityConfig: Record<
  Priority,
  { label: string; class: string; icon: LucideIcon }
> = {
  low: { label: "Low", class: "text-slate-500", icon: AlertCircle },
  normal: { label: "Normal", class: "text-blue-500", icon: AlertCircle },
  high: { label: "High", class: "text-amber-500", icon: AlertCircle },
  urgent: { label: "Urgent", class: "text-red-500", icon: AlertCircle },
};

/** Generate calendar days for a given month/year */
export function generateCalendarDays(
  month: number,
  year: number,
  appointmentsList: Appointment[]
): CalendarDay[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const today = new Date();

  const days: CalendarDay[] = [];

  // Previous month overflow
  for (let i = firstDay - 1; i >= 0; i--) {
    const date = daysInPrevMonth - i;
    days.push({
      date,
      month: month - 1,
      year: month === 0 ? year - 1 : year,
      isToday: false,
      isCurrentMonth: false,
      appointments: [],
    });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday =
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const dayAppointments = appointmentsList.filter((a) => a.date === dateStr);
    days.push({
      date: d,
      month,
      year,
      isToday,
      isCurrentMonth: true,
      appointments: dayAppointments,
    });
  }

  // Next month overflow to fill 6 rows (42 cells)
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push({
      date: d,
      month: month + 1,
      year: month === 11 ? year + 1 : year,
      isToday: false,
      isCurrentMonth: false,
      appointments: [],
    });
  }

  return days;
}
