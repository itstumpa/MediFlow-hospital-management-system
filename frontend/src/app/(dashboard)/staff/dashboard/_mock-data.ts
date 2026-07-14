import {
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Clock,
  DollarSign,
  Stethoscope,
  UserCheck,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

/* ══════════════════════════════════════════════
   Dashboard Mock Data
   ══════════════════════════════════════════════ */

// ─── Statistics ─────────────────────────────────

export interface StatData {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change: number;
  changeLabel: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  color: string;
  chartData: { value: number }[];
}

export const dashboardStats: StatData[] = [
  {
    id: "appointments",
    label: "Today's Appointments",
    value: 24,
    change: 12.5,
    changeLabel: "vs yesterday",
    trend: "up",
    icon: CalendarCheck,
    color: "emerald",
    chartData: [
      { value: 18 },
      { value: 22 },
      { value: 20 },
      { value: 25 },
      { value: 23 },
      { value: 26 },
      { value: 21 },
      { value: 24 },
    ],
  },
  {
    id: "checkedin",
    label: "Checked-in Patients",
    value: 12,
    change: 8.3,
    changeLabel: "vs yesterday",
    trend: "up",
    icon: UserCheck,
    color: "blue",
    chartData: [
      { value: 8 },
      { value: 10 },
      { value: 9 },
      { value: 11 },
      { value: 13 },
      { value: 12 },
      { value: 14 },
      { value: 12 },
    ],
  },
  {
    id: "waiting",
    label: "Waiting Patients",
    value: 8,
    change: 14.3,
    changeLabel: "vs yesterday",
    trend: "down",
    icon: Clock,
    color: "amber",
    chartData: [
      { value: 5 },
      { value: 6 },
      { value: 4 },
      { value: 7 },
      { value: 9 },
      { value: 8 },
      { value: 6 },
      { value: 8 },
    ],
  },
  {
    id: "completed",
    label: "Completed Visits",
    value: 16,
    change: 6.7,
    changeLabel: "vs yesterday",
    trend: "up",
    icon: CheckCircle2,
    color: "violet",
    chartData: [
      { value: 12 },
      { value: 14 },
      { value: 13 },
      { value: 15 },
      { value: 17 },
      { value: 16 },
      { value: 18 },
      { value: 16 },
    ],
  },
  {
    id: "doctors",
    label: "Available Doctors",
    value: 6,
    change: 0,
    changeLabel: "no change",
    trend: "neutral",
    icon: Stethoscope,
    color: "rose",
    chartData: [
      { value: 5 },
      { value: 6 },
      { value: 5 },
      { value: 7 },
      { value: 6 },
      { value: 6 },
      { value: 5 },
      { value: 6 },
    ],
  },
  {
    id: "revenue",
    label: "Today's Revenue",
    value: 3240,
    prefix: "$",
    change: 18.2,
    changeLabel: "vs yesterday",
    trend: "up",
    icon: DollarSign,
    color: "cyan",
    chartData: [
      { value: 2100 },
      { value: 2800 },
      { value: 2400 },
      { value: 3100 },
      { value: 2900 },
      { value: 3400 },
      { value: 3000 },
      { value: 3240 },
    ],
  },
];

// ─── Quick Actions ──────────────────────────────

export interface DashboardQuickAction {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  gradient: string;
}

export const dashboardQuickActions: DashboardQuickAction[] = [
  {
    id: "register",
    label: "Register Patient",
    description: "Add a new patient record",
    href: "/staff/patient-registration/register",
    icon: UserPlus,
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    id: "appointment",
    label: "Book Appointment",
    description: "Schedule a new appointment",
    href: "/staff/appointments/create",
    icon: CalendarCheck,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    id: "checkin",
    label: "Check-in Patient",
    description: "Check in arriving patients",
    href: "/staff/patient-registration/check-in",
    icon: UserCheck,
    gradient: "from-violet-500 to-violet-600",
  },
  {
    id: "invoice",
    label: "Generate Invoice",
    description: "Create a new invoice",
    href: "/staff/billing/invoices",
    icon: DollarSign,
    gradient: "from-amber-500 to-amber-600",
  },
  {
    id: "schedule",
    label: "Doctor Schedule",
    description: "View doctor availability",
    href: "/staff/schedule",
    icon: Stethoscope,
    gradient: "from-rose-500 to-rose-600",
  },
  {
    id: "queue",
    label: "Queue Management",
    description: "Monitor patient queues",
    href: "/staff/queue",
    icon: ClipboardList,
    gradient: "from-cyan-500 to-cyan-600",
  },
];

// ─── Appointments ───────────────────────────────

export type AppointmentStatus =
  | "confirmed"
  | "checked-in"
  | "waiting"
  | "completed"
  | "cancelled"
  | "no-show";

export interface DashboardAppointment {
  id: string;
  patientName: string;
  patientInitials: string;
  doctor: string;
  department: string;
  time: string;
  status: AppointmentStatus;
}

export const todayAppointments: DashboardAppointment[] = [
  {
    id: "APT-001",
    patientName: "Emily Johnson",
    patientInitials: "EJ",
    doctor: "Dr. Sarah Chen",
    department: "General Medicine",
    time: "09:00 AM",
    status: "checked-in",
  },
  {
    id: "APT-002",
    patientName: "Michael Brown",
    patientInitials: "MB",
    doctor: "Dr. James Wilson",
    department: "Cardiology",
    time: "09:30 AM",
    status: "waiting",
  },
  {
    id: "APT-003",
    patientName: "Sophia Garcia",
    patientInitials: "SG",
    doctor: "Dr. Emily Martinez",
    department: "Pediatrics",
    time: "10:00 AM",
    status: "completed",
  },
  {
    id: "APT-004",
    patientName: "William Davis",
    patientInitials: "WD",
    doctor: "Dr. Robert Kim",
    department: "Orthopedics",
    time: "10:30 AM",
    status: "confirmed",
  },
  {
    id: "APT-005",
    patientName: "Olivia Martinez",
    patientInitials: "OM",
    doctor: "Dr. Sarah Chen",
    department: "General Medicine",
    time: "11:00 AM",
    status: "confirmed",
  },
  {
    id: "APT-006",
    patientName: "James Taylor",
    patientInitials: "JT",
    doctor: "Dr. David Park",
    department: "Neurology",
    time: "11:30 AM",
    status: "checked-in",
  },
  {
    id: "APT-007",
    patientName: "Emma Wilson",
    patientInitials: "EW",
    doctor: "Dr. Emily Martinez",
    department: "Pediatrics",
    time: "01:00 PM",
    status: "confirmed",
  },
];

// ─── Waiting Queue ──────────────────────────────

export type Priority = "low" | "normal" | "high" | "emergency";
export type QueueStatus = "waiting" | "in-consultation" | "lab" | "ready";

export interface WaitingQueueItem {
  id: string;
  token: string;
  patientName: string;
  patientInitials: string;
  waitingTime: string;
  priority: Priority;
  status: QueueStatus;
  doctor: string;
}

export const waitingQueue: WaitingQueueItem[] = [
  {
    id: "WQ-001",
    token: "A-12",
    patientName: "Robert Brown",
    patientInitials: "RB",
    waitingTime: "12 min",
    priority: "high",
    status: "waiting",
    doctor: "Dr. Sarah Chen",
  },
  {
    id: "WQ-002",
    token: "A-13",
    patientName: "Amanda Lee",
    patientInitials: "AL",
    waitingTime: "8 min",
    priority: "normal",
    status: "waiting",
    doctor: "Dr. James Wilson",
  },
  {
    id: "WQ-003",
    token: "A-14",
    patientName: "Daniel Kim",
    patientInitials: "DK",
    waitingTime: "5 min",
    priority: "emergency",
    status: "in-consultation",
    doctor: "Dr. Robert Kim",
  },
  {
    id: "WQ-004",
    token: "A-15",
    patientName: "Jennifer White",
    patientInitials: "JW",
    waitingTime: "15 min",
    priority: "low",
    status: "lab",
    doctor: "Dr. Emily Martinez",
  },
  {
    id: "WQ-005",
    token: "A-16",
    patientName: "Thomas Clark",
    patientInitials: "TC",
    waitingTime: "3 min",
    priority: "high",
    status: "waiting",
    doctor: "Dr. David Park",
  },
];

// ─── Doctor Availability ────────────────────────

export type DoctorStatus =
  | "available"
  | "busy"
  | "on-break"
  | "away"
  | "off-duty";

export interface DoctorAvailabilityData {
  id: string;
  name: string;
  department: string;
  initials: string;
  status: DoctorStatus;
  nextSlot: string;
  patientsInQueue: number;
  color: string;
}

export const doctorAvailability: DoctorAvailabilityData[] = [
  {
    id: "DOC-001",
    name: "Dr. Sarah Chen",
    department: "General Medicine",
    initials: "SC",
    status: "available",
    nextSlot: "11:00 AM",
    patientsInQueue: 2,
    color: "emerald",
  },
  {
    id: "DOC-002",
    name: "Dr. James Wilson",
    department: "Cardiology",
    initials: "JW",
    status: "busy",
    nextSlot: "10:15 AM",
    patientsInQueue: 3,
    color: "rose",
  },
  {
    id: "DOC-003",
    name: "Dr. Emily Martinez",
    department: "Pediatrics",
    initials: "EM",
    status: "available",
    nextSlot: "10:00 AM",
    patientsInQueue: 1,
    color: "emerald",
  },
  {
    id: "DOC-004",
    name: "Dr. Robert Kim",
    department: "Orthopedics",
    initials: "RK",
    status: "busy",
    nextSlot: "10:45 AM",
    patientsInQueue: 4,
    color: "amber",
  },
  {
    id: "DOC-005",
    name: "Dr. David Park",
    department: "Neurology",
    initials: "DP",
    status: "on-break",
    nextSlot: "11:30 AM",
    patientsInQueue: 0,
    color: "blue",
  },
  {
    id: "DOC-006",
    name: "Dr. Lisa Anderson",
    department: "Dermatology",
    initials: "LA",
    status: "available",
    nextSlot: "09:30 AM",
    patientsInQueue: 1,
    color: "emerald",
  },
];

// ─── Recent Patients ────────────────────────────

export type RecentPatientStatus =
  | "registered"
  | "checked-in"
  | "in-progress"
  | "completed";

export interface RecentPatient {
  id: string;
  name: string;
  initials: string;
  registrationTime: string;
  purpose: string;
  status: RecentPatientStatus;
}

export const recentPatients: RecentPatient[] = [
  {
    id: "PAT-001",
    name: "Emily Johnson",
    initials: "EJ",
    registrationTime: "08:45 AM",
    purpose: "General Checkup",
    status: "in-progress",
  },
  {
    id: "PAT-002",
    name: "Michael Brown",
    initials: "MB",
    registrationTime: "09:00 AM",
    purpose: "Cardiology Consult",
    status: "checked-in",
  },
  {
    id: "PAT-003",
    name: "Sophia Garcia",
    initials: "SG",
    registrationTime: "09:15 AM",
    purpose: "Pediatric Vaccination",
    status: "completed",
  },
  {
    id: "PAT-004",
    name: "William Davis",
    initials: "WD",
    registrationTime: "09:30 AM",
    purpose: "Orthopedic Follow-up",
    status: "checked-in",
  },
  {
    id: "PAT-005",
    name: "Olivia Martinez",
    initials: "OM",
    registrationTime: "09:45 AM",
    purpose: "Blood Test",
    status: "registered",
  },
];

// ─── Payments ───────────────────────────────────

export type PaymentMethod = "cash" | "card" | "insurance" | "online";
export type PaymentStatus = "paid" | "pending" | "refunded" | "failed";

export interface Payment {
  id: string;
  invoice: string;
  patientName: string;
  amount: string;
  method: PaymentMethod;
  status: PaymentStatus;
  time: string;
}

export const recentPayments: Payment[] = [
  {
    id: "PAY-001",
    invoice: "INV-0842",
    patientName: "Emily Johnson",
    amount: "$250.00",
    method: "card",
    status: "paid",
    time: "2 min ago",
  },
  {
    id: "PAY-002",
    invoice: "INV-0843",
    patientName: "Michael Brown",
    amount: "$180.00",
    method: "insurance",
    status: "pending",
    time: "15 min ago",
  },
  {
    id: "PAY-003",
    invoice: "INV-0844",
    patientName: "Sophia Garcia",
    amount: "$120.00",
    method: "cash",
    status: "paid",
    time: "32 min ago",
  },
  {
    id: "PAY-004",
    invoice: "INV-0845",
    patientName: "William Davis",
    amount: "$350.00",
    method: "card",
    status: "paid",
    time: "1h ago",
  },
  {
    id: "PAY-005",
    invoice: "INV-0846",
    patientName: "Olivia Martinez",
    amount: "$75.00",
    method: "online",
    status: "paid",
    time: "1h ago",
  },
];

// ─── Announcements ──────────────────────────────

export type AnnouncementType = "info" | "warning" | "danger" | "success";

export interface Announcement {
  id: string;
  title: string;
  message: string;
  time: string;
  type: AnnouncementType;
}

export const announcements: Announcement[] = [
  {
    id: "ANN-001",
    title: "Clinic Closed for Maintenance",
    message:
      "The clinic will be closed on Saturday, July 20th for scheduled HVAC maintenance. Normal operations resume Monday.",
    time: "2h ago",
    type: "warning",
  },
  {
    id: "ANN-002",
    title: "Dr. Wilson on Leave",
    message:
      "Dr. James Wilson will be on annual leave from July 22-26. Patients have been notified and appointments rescheduled.",
    time: "4h ago",
    type: "info",
  },
  {
    id: "ANN-003",
    title: "Emergency Protocol Update",
    message:
      "Updated emergency response protocols are now available. All staff must review by end of week.",
    time: "1d ago",
    type: "danger",
  },
  {
    id: "ANN-004",
    title: "New Equipment Installed",
    message:
      "The new digital X-ray machine in Room 204 is now operational. Training sessions available this week.",
    time: "2d ago",
    type: "success",
  },
];

// ─── Upcoming Tasks ─────────────────────────────

export interface DashboardTask {
  id: string;
  title: string;
  time: string;
  completed: boolean;
  priority: "low" | "normal" | "high";
}

export const upcomingTasks: DashboardTask[] = [
  {
    id: "TASK-001",
    title: "Review pending lab results",
    time: "10:30 AM",
    completed: false,
    priority: "high",
  },
  {
    id: "TASK-002",
    title: "Submit daily attendance report",
    time: "12:00 PM",
    completed: false,
    priority: "normal",
  },
  {
    id: "TASK-003",
    title: "Verify insurance claims",
    time: "02:00 PM",
    completed: true,
    priority: "high",
  },
  {
    id: "TASK-004",
    title: "Order office supplies",
    time: "03:30 PM",
    completed: false,
    priority: "low",
  },
  {
    id: "TASK-005",
    title: "Staff meeting",
    time: "04:00 PM",
    completed: false,
    priority: "normal",
  },
];

// ─── Shift Summary ──────────────────────────────

export interface ShiftSummary {
  shift: string;
  time: string;
  patientsAttended: number;
  appointmentsCompleted: number;
  revenueCollected: string;
  checkIns: number;
  newRegistrations: number;
}

export const shiftSummary: ShiftSummary = {
  shift: "Morning Shift",
  time: "8:00 AM – 2:00 PM",
  patientsAttended: 28,
  appointmentsCompleted: 16,
  revenueCollected: "$3,240",
  checkIns: 12,
  newRegistrations: 6,
};
