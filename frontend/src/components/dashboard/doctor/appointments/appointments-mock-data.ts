/* ============================================
   Today's Appointments — Mock Data & Types
   All data is static for UI demonstration.
   ============================================ */

/* ─── Types ─────────────────────────────────────────────── */

export type AppointmentStatus =
  | "Waiting"
  | "Checked In"
  | "In Consultation"
  | "Completed"
  | "Cancelled"
  | "No Show";

export type AppointmentPriority = "Normal" | "Urgent" | "Emergency";

export type ViewMode = "table" | "timeline" | "cards";

export interface AppointmentStat {
  id: string;
  label: string;
  value: number;
  icon: string;
  color: string;
}

export interface AppointmentRecord {
  id: string;
  appointmentId: string;
  time: string;
  endTime: string;
  duration: number;
  patientName: string;
  patientInitials: string;
  patientId: string;
  age: number;
  gender: string;
  department: string;
  type: string;
  reason: string;
  priority: AppointmentPriority;
  status: AppointmentStatus;
  notes?: string;
}

export interface TodaySummary {
  total: number;
  completed: number;
  remaining: number;
  completionRate: number;
  checkedIn: number;
  inConsultation: number;
  waiting: number;
  cancelled: number;
  noShow: number;
  nextAppointment: { time: string; patient: string } | null;
  workingHours: { start: string; end: string };
}

export interface FilterState {
  search: string;
  appointmentId: string;
  department: string;
  priority: string;
  status: string;
  timeRange: string;
}

/* ─── Initial Filters ──────────────────────────────────── */

export const defaultFilters: FilterState = {
  search: "",
  appointmentId: "",
  department: "All Departments",
  priority: "All Priorities",
  status: "All Statuses",
  timeRange: "All Day",
};

export const departmentOptions = [
  "All Departments",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "General Surgery",
  "Ophthalmology",
  "Pulmonology",
  "ENT",
];

export const priorityOptions = [
  "All Priorities",
  "Normal",
  "Urgent",
  "Emergency",
];

export const statusOptions: AppointmentStatus[] = [
  "Waiting",
  "Checked In",
  "In Consultation",
  "Completed",
  "Cancelled",
  "No Show",
];

export const timeRangeOptions = [
  "All Day",
  "Morning (6AM–12PM)",
  "Afternoon (12PM–5PM)",
  "Evening (5PM–9PM)",
];

/* ─── Status Config ─────────────────────────────────────── */

export type AppointmentStatColor =
  | "cyan"
  | "amber"
  | "indigo"
  | "emerald"
  | "red"
  | "slate";

export const statusStyleMap: Record<
  AppointmentStatus,
  { bg: string; dot: string; text: string; label: string }
> = {
  Waiting: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    dot: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    label: "Waiting",
  },
  "Checked In": {
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    dot: "bg-cyan-500",
    text: "text-cyan-600 dark:text-cyan-400",
    label: "Checked In",
  },
  "In Consultation": {
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    dot: "bg-indigo-500",
    text: "text-indigo-600 dark:text-indigo-400",
    label: "In Consultation",
  },
  Completed: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    dot: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    label: "Completed",
  },
  Cancelled: {
    bg: "bg-red-50 dark:bg-red-950/30",
    dot: "bg-red-500",
    text: "text-red-600 dark:text-red-400",
    label: "Cancelled",
  },
  "No Show": {
    bg: "bg-slate-50 dark:bg-slate-800",
    dot: "bg-slate-400",
    text: "text-slate-600 dark:text-slate-400",
    label: "No Show",
  },
};

export const priorityStyleMap: Record<
  AppointmentPriority,
  { badge: string; indicator: string }
> = {
  Normal: {
    badge: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    indicator: "bg-slate-400",
  },
  Urgent: {
    badge:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
    indicator: "bg-amber-500",
  },
  Emergency: {
    badge: "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400",
    indicator: "bg-red-500",
  },
};

/* ─── Stats ─────────────────────────────────────────────── */

export const appointmentStats: AppointmentStat[] = [
  {
    id: "astat-1",
    label: "Today's Appointments",
    value: 18,
    icon: "CalendarCheck",
    color: "cyan",
  },
  {
    id: "astat-2",
    label: "Waiting",
    value: 5,
    icon: "UserRound",
    color: "amber",
  },
  {
    id: "astat-3",
    label: "In Consultation",
    value: 3,
    icon: "Stethoscope",
    color: "indigo",
  },
  {
    id: "astat-4",
    label: "Completed",
    value: 7,
    icon: "ClipboardCheck",
    color: "emerald",
  },
  {
    id: "astat-5",
    label: "Cancelled",
    value: 2,
    icon: "XCircle",
    color: "red",
  },
  {
    id: "astat-6",
    label: "No Show",
    value: 1,
    icon: "UserX",
    color: "slate",
  },
];

/* ─── Appointments ──────────────────────────────────────── */

export const todayAppointments: AppointmentRecord[] = [
  {
    id: "apt-001",
    appointmentId: "APT-2026-0101",
    time: "08:00 AM",
    endTime: "08:30 AM",
    duration: 30,
    patientName: "Emily Johnson",
    patientInitials: "EJ",
    patientId: "PAT-001",
    age: 34,
    gender: "Female",
    department: "Cardiology",
    type: "Follow-up",
    reason: "Annual checkup & BP review",
    priority: "Normal",
    status: "Completed",
  },
  {
    id: "apt-002",
    appointmentId: "APT-2026-0102",
    time: "08:30 AM",
    endTime: "09:00 AM",
    duration: 30,
    patientName: "Michael Chen",
    patientInitials: "MC",
    patientId: "PAT-002",
    age: 45,
    gender: "Male",
    department: "Cardiology",
    type: "Follow-up",
    reason: "Cardiology follow-up — arrhythmia monitoring",
    priority: "Urgent",
    status: "Completed",
  },
  {
    id: "apt-003",
    appointmentId: "APT-2026-0103",
    time: "09:00 AM",
    endTime: "09:45 AM",
    duration: 45,
    patientName: "Sarah Williams",
    patientInitials: "SW",
    patientId: "PAT-003",
    age: 28,
    gender: "Female",
    department: "Neurology",
    type: "Consultation",
    reason: "Migraine consultation & medication review",
    priority: "Normal",
    status: "Completed",
  },
  {
    id: "apt-004",
    appointmentId: "APT-2026-0104",
    time: "09:30 AM",
    endTime: "10:00 AM",
    duration: 30,
    patientName: "James Rodriguez",
    patientInitials: "JR",
    patientId: "PAT-004",
    age: 52,
    gender: "Male",
    department: "Cardiology",
    type: "Follow-up",
    reason: "Blood pressure review & ECG",
    priority: "Urgent",
    status: "Completed",
  },
  {
    id: "apt-005",
    appointmentId: "APT-2026-0105",
    time: "10:00 AM",
    endTime: "10:30 AM",
    duration: 30,
    patientName: "Lisa Thompson",
    patientInitials: "LT",
    patientId: "PAT-005",
    age: 39,
    gender: "Female",
    department: "General Surgery",
    type: "Pre-op Assessment",
    reason: "Pre-surgery assessment & lab review",
    priority: "Normal",
    status: "Completed",
  },
  {
    id: "apt-006",
    appointmentId: "APT-2026-0106",
    time: "10:30 AM",
    endTime: "11:00 AM",
    duration: 30,
    patientName: "Robert Wilson",
    patientInitials: "RW",
    patientId: "PAT-006",
    age: 55,
    gender: "Male",
    department: "Cardiology",
    type: "Follow-up",
    reason: "ECG review & medication adjustment",
    priority: "Normal",
    status: "Completed",
  },
  {
    id: "apt-007",
    appointmentId: "APT-2026-0107",
    time: "11:00 AM",
    endTime: "11:30 AM",
    duration: 30,
    patientName: "David Kim",
    patientInitials: "DK",
    patientId: "PAT-007",
    age: 61,
    gender: "Male",
    department: "Endocrinology",
    type: "Routine Check",
    reason: "Diabetes management & HbA1c review",
    priority: "Normal",
    status: "Completed",
  },
  {
    id: "apt-008",
    appointmentId: "APT-2026-0108",
    time: "11:30 AM",
    endTime: "12:15 PM",
    duration: 45,
    patientName: "Anna Martinez",
    patientInitials: "AM",
    patientId: "PAT-008",
    age: 47,
    gender: "Female",
    department: "Pulmonology",
    type: "Diagnostic",
    reason: "Lung function test results review",
    priority: "Urgent",
    status: "In Consultation",
  },
  {
    id: "apt-009",
    appointmentId: "APT-2026-0109",
    time: "12:00 PM",
    endTime: "12:30 PM",
    duration: 30,
    patientName: "Olivia Brown",
    patientInitials: "OB",
    patientId: "PAT-009",
    age: 32,
    gender: "Female",
    department: "Cardiology",
    type: "New Patient",
    reason: "New patient intake & cardiac assessment",
    priority: "Normal",
    status: "In Consultation",
  },
  {
    id: "apt-010",
    appointmentId: "APT-2026-0110",
    time: "01:00 PM",
    endTime: "01:30 PM",
    duration: 30,
    patientName: "William Davis",
    patientInitials: "WD",
    patientId: "PAT-010",
    age: 48,
    gender: "Male",
    department: "Orthopedics",
    type: "Follow-up",
    reason: "Knee pain follow-up & MRI review",
    priority: "Normal",
    status: "Checked In",
  },
  {
    id: "apt-011",
    appointmentId: "APT-2026-0111",
    time: "01:30 PM",
    endTime: "02:00 PM",
    duration: 30,
    patientName: "Sophia Garcia",
    patientInitials: "SG",
    patientId: "PAT-011",
    age: 29,
    gender: "Female",
    department: "Dermatology",
    type: "Consultation",
    reason: "Skin rash consultation & biopsy",
    priority: "Normal",
    status: "Checked In",
  },
  {
    id: "apt-012",
    appointmentId: "APT-2026-0112",
    time: "02:00 PM",
    endTime: "02:30 PM",
    duration: 30,
    patientName: "Alexander Lee",
    patientInitials: "AL",
    patientId: "PAT-012",
    age: 67,
    gender: "Male",
    department: "Cardiology",
    type: "Follow-up",
    reason: "Heart failure follow-up & medication review",
    priority: "Urgent",
    status: "Waiting",
  },
  {
    id: "apt-013",
    appointmentId: "APT-2026-0113",
    time: "02:30 PM",
    endTime: "03:15 PM",
    duration: 45,
    patientName: "Mia Taylor",
    patientInitials: "MT",
    patientId: "PAT-013",
    age: 25,
    gender: "Female",
    department: "Neurology",
    type: "Consultation",
    reason: "Headache assessment & imaging review",
    priority: "Normal",
    status: "Waiting",
  },
  {
    id: "apt-014",
    appointmentId: "APT-2026-0114",
    time: "03:00 PM",
    endTime: "03:30 PM",
    duration: 30,
    patientName: "Daniel Anderson",
    patientInitials: "DA",
    patientId: "PAT-014",
    age: 41,
    gender: "Male",
    department: "General Surgery",
    type: "Follow-up",
    reason: "Post-op wound check & suture removal",
    priority: "Normal",
    status: "Waiting",
  },
  {
    id: "apt-015",
    appointmentId: "APT-2026-0115",
    time: "03:30 PM",
    endTime: "04:00 PM",
    duration: 30,
    patientName: "Charlotte Thomas",
    patientInitials: "CT",
    patientId: "PAT-015",
    age: 56,
    gender: "Female",
    department: "Cardiology",
    type: "Emergency",
    reason: "Chest pain evaluation & ECG",
    priority: "Emergency",
    status: "Waiting",
  },
  {
    id: "apt-016",
    appointmentId: "APT-2026-0116",
    time: "04:00 PM",
    endTime: "04:30 PM",
    duration: 30,
    patientName: "Ethan Martinez",
    patientInitials: "EM",
    patientId: "PAT-016",
    age: 35,
    gender: "Male",
    department: "ENT",
    type: "Follow-up",
    reason: "Hearing test results review",
    priority: "Normal",
    status: "Cancelled",
  },
  {
    id: "apt-017",
    appointmentId: "APT-2026-0117",
    time: "04:30 PM",
    endTime: "05:00 PM",
    duration: 30,
    patientName: "Amelia Robinson",
    patientInitials: "AR",
    patientId: "PAT-017",
    age: 72,
    gender: "Female",
    department: "Cardiology",
    type: "Follow-up",
    reason: "Pacemaker check & battery status",
    priority: "Normal",
    status: "Cancelled",
  },
  {
    id: "apt-018",
    appointmentId: "APT-2026-0118",
    time: "05:00 PM",
    endTime: "05:30 PM",
    duration: 30,
    patientName: "Benjamin Clark",
    patientInitials: "BC",
    patientId: "PAT-018",
    age: 33,
    gender: "Male",
    department: "Orthopedics",
    type: "Consultation",
    reason: "Shoulder pain consultation & ultrasound",
    priority: "Normal",
    status: "No Show",
  },
];

/* ─── Compute Today's Summary ───────────────────────────── */

export function computeTodaySummary(): TodaySummary {
  const total = todayAppointments.length;
  const completed = todayAppointments.filter(
    (a) => a.status === "Completed",
  ).length;
  const cancelled = todayAppointments.filter(
    (a) => a.status === "Cancelled",
  ).length;
  const noShow = todayAppointments.filter((a) => a.status === "No Show").length;

  const nextAppt = todayAppointments.find(
    (a) =>
      a.status === "Waiting" ||
      a.status === "Checked In" ||
      a.status === "In Consultation",
  );

  return {
    total,
    completed,
    remaining: total - completed - cancelled - noShow,
    completionRate:
      total > 0
        ? Math.round((completed / (total - cancelled - noShow)) * 100)
        : 0,
    checkedIn: todayAppointments.filter((a) => a.status === "Checked In")
      .length,
    inConsultation: todayAppointments.filter(
      (a) => a.status === "In Consultation",
    ).length,
    waiting: todayAppointments.filter((a) => a.status === "Waiting").length,
    cancelled,
    noShow,
    nextAppointment: nextAppt
      ? { time: nextAppt.time, patient: nextAppt.patientName }
      : null,
    workingHours: { start: "8:00 AM", end: "5:00 PM" },
  };
}

/* ─── Filter Function ───────────────────────────────────── */

export function filterAppointments(
  appointments: AppointmentRecord[],
  filters: FilterState,
): AppointmentRecord[] {
  return appointments.filter((apt) => {
    // Search patient name
    if (
      filters.search &&
      !apt.patientName.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;

    // Appointment ID
    if (
      filters.appointmentId &&
      !apt.appointmentId
        .toLowerCase()
        .includes(filters.appointmentId.toLowerCase())
    )
      return false;

    // Department
    if (
      filters.department &&
      filters.department !== "All Departments" &&
      apt.department !== filters.department
    )
      return false;

    // Priority
    if (
      filters.priority &&
      filters.priority !== "All Priorities" &&
      apt.priority !== filters.priority
    )
      return false;

    // Status
    if (
      filters.status &&
      filters.status !== "All Statuses" &&
      apt.status !== filters.status
    )
      return false;

    // Time range
    if (filters.timeRange && filters.timeRange !== "All Day") {
      const hour = parseInt(apt.time.split(":")[0]);
      const isPM = apt.time.includes("PM");
      const hour24 = isPM && hour !== 12 ? hour + 12 : hour;

      if (filters.timeRange === "Morning (6AM–12PM)") {
        if (hour24 < 6 || hour24 >= 12) return false;
      } else if (filters.timeRange === "Afternoon (12PM–5PM)") {
        if (hour24 < 12 || hour24 >= 17) return false;
      } else if (filters.timeRange === "Evening (5PM–9PM)") {
        if (hour24 < 17 || hour24 >= 21) return false;
      }
    }

    return true;
  });
}
