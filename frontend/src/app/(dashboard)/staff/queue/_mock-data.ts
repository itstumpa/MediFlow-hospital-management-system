import { type LucideIcon } from "lucide-react";

/* ══════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════ */

export type QueuePriority = "emergency" | "high" | "normal" | "low";

export type QueueStatus =
  | "waiting"
  | "called"
  | "in-consultation"
  | "completed"
  | "no-show"
  | "cancelled";

export type AppointmentType =
  | "walk-in"
  | "scheduled"
  | "emergency"
  | "follow-up"
  | "check-up";

export interface QueueEntry {
  id: string;
  queueNumber: number;
  patientName: string;
  patientId: string;
  patientInitials: string;
  doctorName: string;
  doctorId: string;
  department: string;
  priority: QueuePriority;
  status: QueueStatus;
  appointmentType: AppointmentType;
  appointmentTime: string;
  checkInTime: string;
  calledTime?: string;
  consultationStartTime?: string;
  consultationEndTime?: string;
  waitingMinutes: number;
  notes?: string;
  color: string;
}

export interface QueueStat {
  id: string;
  label: string;
  value: number;
  change: number;
  changeLabel: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  color: string;
  suffix?: string;
}

export interface QueueFilterValues {
  doctor: string;
  department: string;
  status: string;
  priority: string;
  appointmentType: string;
  sort: string;
}

/* ══════════════════════════════════════════════
   Doctor list
   ══════════════════════════════════════════════ */

export const doctors = [
  { name: "Dr. Sarah Chen", id: "DOC-001", department: "Cardiology" },
  { name: "Dr. James Wilson", id: "DOC-002", department: "Neurology" },
  { name: "Dr. Emily Rodriguez", id: "DOC-003", department: "Pediatrics" },
  { name: "Dr. Michael Kim", id: "DOC-004", department: "Orthopedics" },
  { name: "Dr. Lisa Thompson", id: "DOC-005", department: "Dermatology" },
  { name: "Dr. Robert Patel", id: "DOC-006", department: "Ophthalmology" },
  { name: "Dr. Amanda Foster", id: "DOC-007", department: "Pulmonology" },
  { name: "Dr. David Mitchell", id: "DOC-008", department: "General Surgery" },
  { name: "Dr. Jessica Lee", id: "DOC-009", department: "Cardiology" },
  { name: "Dr. Christopher Brown", id: "DOC-010", department: "Neurology" },
  { name: "Dr. Olivia Martinez", id: "DOC-011", department: "Pediatrics" },
  { name: "Dr. Daniel Taylor", id: "DOC-012", department: "Orthopedics" },
];

export const departments = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Ophthalmology",
  "Pulmonology",
  "General Surgery",
];

/* ══════════════════════════════════════════════
   Priority config
   ══════════════════════════════════════════════ */

export const priorityConfig: Record<
  QueuePriority,
  {
    label: string;
    class: string;
    dot: string;
    order: number;
  }
> = {
  emergency: {
    label: "Emergency",
    class:
      "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 ring-1 ring-red-200 dark:ring-red-800/50",
    dot: "bg-red-500",
    order: 0,
  },
  high: {
    label: "High",
    class:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 ring-1 ring-amber-200 dark:ring-amber-800/50",
    dot: "bg-amber-500",
    order: 1,
  },
  normal: {
    label: "Normal",
    class:
      "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 ring-1 ring-blue-200 dark:ring-blue-800/50",
    dot: "bg-blue-500",
    order: 2,
  },
  low: {
    label: "Low",
    class:
      "bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400 ring-1 ring-slate-200 dark:ring-slate-700/50",
    dot: "bg-slate-400",
    order: 3,
  },
};

/* ══════════════════════════════════════════════
   Status config
   ══════════════════════════════════════════════ */

export const statusConfig: Record<
  QueueStatus,
  { label: string; class: string; dot: string }
> = {
  waiting: {
    label: "Waiting",
    class: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    dot: "bg-slate-400",
  },
  called: {
    label: "Called",
    class:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  "in-consultation": {
    label: "In Consultation",
    class: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    class:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  "no-show": {
    label: "No Show",
    class: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
    dot: "bg-rose-500",
  },
  cancelled: {
    label: "Cancelled",
    class: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-500",
    dot: "bg-slate-300",
  },
};

/* ══════════════════════════════════════════════
   Appointment type config
   ══════════════════════════════════════════════ */

export const appointmentTypeConfig: Record<
  AppointmentType,
  { label: string; class: string }
> = {
  "walk-in": {
    label: "Walk-in",
    class:
      "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400",
  },
  scheduled: {
    label: "Scheduled",
    class: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  },
  emergency: {
    label: "Emergency",
    class: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  },
  "follow-up": {
    label: "Follow-up",
    class:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  "check-up": {
    label: "Check-up",
    class: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400",
  },
};

/* ══════════════════════════════════════════════
   Filter options
   ══════════════════════════════════════════════ */

export const statusOptions = [
  { value: "waiting", label: "Waiting" },
  { value: "called", label: "Called" },
  { value: "in-consultation", label: "In Consultation" },
  { value: "completed", label: "Completed" },
  { value: "no-show", label: "No Show" },
  { value: "cancelled", label: "Cancelled" },
];

export const priorityOptions = [
  { value: "emergency", label: "Emergency" },
  { value: "high", label: "High" },
  { value: "normal", label: "Normal" },
  { value: "low", label: "Low" },
];

export const appointmentTypeOptions = [
  { value: "walk-in", label: "Walk-in" },
  { value: "scheduled", label: "Scheduled" },
  { value: "emergency", label: "Emergency" },
  { value: "follow-up", label: "Follow-up" },
  { value: "check-up", label: "Check-up" },
];

export const sortOptions = [
  { value: "queue-asc", label: "Queue Number (Asc)" },
  { value: "queue-desc", label: "Queue Number (Desc)" },
  { value: "waiting-longest", label: "Longest Waiting" },
  { value: "waiting-shortest", label: "Shortest Waiting" },
  { value: "priority", label: "Priority (Highest)" },
  { value: "name", label: "Patient Name" },
];

export const defaultFilterValues: QueueFilterValues = {
  doctor: "",
  department: "",
  status: "",
  priority: "",
  appointmentType: "",
  sort: "queue-asc",
};

/* ══════════════════════════════════════════════
   Mock queue data
   ══════════════════════════════════════════════ */

function generateInitials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const now = new Date();
const today = now.toISOString().split("T")[0];
const currentHour = now.getHours();
const currentMinute = now.getMinutes();

function makeTime(hour: number, minute: number): string {
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
}

export const queueEntries: QueueEntry[] = [
  {
    id: "Q-101",
    queueNumber: 101,
    patientName: "Eleanor Waters",
    patientId: "PT-1024",
    patientInitials: "EW",
    doctorName: "Dr. Sarah Chen",
    doctorId: "DOC-001",
    department: "Cardiology",
    priority: "emergency",
    status: "in-consultation",
    appointmentType: "emergency",
    appointmentTime: "09:00",
    checkInTime: "08:45",
    consultationStartTime: "09:05",
    waitingMinutes: 20,
    notes: "Chest pain, elevated BP",
    color: "#ef4444",
  },
  {
    id: "Q-102",
    queueNumber: 102,
    patientName: "Marcus Webb",
    patientId: "PT-1011",
    patientInitials: "MW",
    doctorName: "Dr. Sarah Chen",
    doctorId: "DOC-001",
    department: "Cardiology",
    priority: "high",
    status: "waiting",
    appointmentType: "scheduled",
    appointmentTime: "09:30",
    checkInTime: "09:10",
    waitingMinutes: 42,
    notes: "Follow-up on pacemaker",
    color: "#f59e0b",
  },
  {
    id: "Q-103",
    queueNumber: 103,
    patientName: "Lydia Hart",
    patientId: "PT-1033",
    patientInitials: "LH",
    doctorName: "Dr. James Wilson",
    doctorId: "DOC-002",
    department: "Neurology",
    priority: "normal",
    status: "waiting",
    appointmentType: "scheduled",
    appointmentTime: "10:00",
    checkInTime: "09:35",
    waitingMinutes: 17,
    color: "#3b82f6",
  },
  {
    id: "Q-104",
    queueNumber: 104,
    patientName: "Oscar Finn",
    patientId: "PT-1040",
    patientInitials: "OF",
    doctorName: "Dr. Emily Rodriguez",
    doctorId: "DOC-003",
    department: "Pediatrics",
    priority: "high",
    status: "waiting",
    appointmentType: "walk-in",
    appointmentTime: "—",
    checkInTime: "09:40",
    waitingMinutes: 12,
    notes: "Fever, cough",
    color: "#f59e0b",
  },
  {
    id: "Q-105",
    queueNumber: 105,
    patientName: "George Kaplan",
    patientId: "PT-1005",
    patientInitials: "GK",
    doctorName: "Dr. Michael Kim",
    doctorId: "DOC-004",
    department: "Orthopedics",
    priority: "normal",
    status: "called",
    appointmentType: "follow-up",
    appointmentTime: "10:15",
    checkInTime: "09:45",
    calledTime: "09:55",
    waitingMinutes: 10,
    color: "#3b82f6",
  },
  {
    id: "Q-106",
    queueNumber: 106,
    patientName: "Nina Frost",
    patientId: "PT-1042",
    patientInitials: "NF",
    doctorName: "Dr. Lisa Thompson",
    doctorId: "DOC-005",
    department: "Dermatology",
    priority: "low",
    status: "waiting",
    appointmentType: "check-up",
    appointmentTime: "10:30",
    checkInTime: "10:00",
    waitingMinutes: 0,
    color: "#94a3b8",
  },
  {
    id: "Q-107",
    queueNumber: 107,
    patientName: "Anita Rao",
    patientId: "PT-1029",
    patientInitials: "AR",
    doctorName: "Dr. Robert Patel",
    doctorId: "DOC-006",
    department: "Ophthalmology",
    priority: "normal",
    status: "completed",
    appointmentType: "scheduled",
    appointmentTime: "09:00",
    checkInTime: "08:30",
    calledTime: "08:40",
    consultationStartTime: "09:00",
    consultationEndTime: "09:25",
    waitingMinutes: 10,
    color: "#3b82f6",
  },
  {
    id: "Q-108",
    queueNumber: 108,
    patientName: "Tom Bracken",
    patientId: "PT-1036",
    patientInitials: "TB",
    doctorName: "Dr. Amanda Foster",
    doctorId: "DOC-007",
    department: "Pulmonology",
    priority: "high",
    status: "in-consultation",
    appointmentType: "scheduled",
    appointmentTime: "09:45",
    checkInTime: "09:20",
    consultationStartTime: "09:50",
    waitingMinutes: 30,
    notes: "Shortness of breath",
    color: "#f59e0b",
  },
  {
    id: "Q-109",
    queueNumber: 109,
    patientName: "Ivy Chen",
    patientId: "PT-1043",
    patientInitials: "IC",
    doctorName: "Dr. David Mitchell",
    doctorId: "DOC-008",
    department: "General Surgery",
    priority: "normal",
    status: "waiting",
    appointmentType: "follow-up",
    appointmentTime: "10:00",
    checkInTime: "09:30",
    waitingMinutes: 22,
    color: "#3b82f6",
  },
  {
    id: "Q-110",
    queueNumber: 110,
    patientName: "Derek Shaw",
    patientId: "PT-1014",
    patientInitials: "DS",
    doctorName: "Dr. Jessica Lee",
    doctorId: "DOC-009",
    department: "Cardiology",
    priority: "emergency",
    status: "waiting",
    appointmentType: "emergency",
    appointmentTime: "—",
    checkInTime: "09:50",
    waitingMinutes: 2,
    notes: "Irregular heartbeat",
    color: "#ef4444",
  },
  {
    id: "Q-111",
    queueNumber: 111,
    patientName: "Paula Grant",
    patientId: "PT-1030",
    patientInitials: "PG",
    doctorName: "Dr. Christopher Brown",
    doctorId: "DOC-010",
    department: "Neurology",
    priority: "normal",
    status: "no-show",
    appointmentType: "scheduled",
    appointmentTime: "09:00",
    checkInTime: "—",
    waitingMinutes: 0,
    color: "#3b82f6",
  },
  {
    id: "Q-112",
    queueNumber: 112,
    patientName: "Samir Joshi",
    patientId: "PT-1044",
    patientInitials: "SJ",
    doctorName: "Dr. Olivia Martinez",
    doctorId: "DOC-011",
    department: "Pediatrics",
    priority: "low",
    status: "completed",
    appointmentType: "check-up",
    appointmentTime: "08:30",
    checkInTime: "08:15",
    calledTime: "08:20",
    consultationStartTime: "08:30",
    consultationEndTime: "08:50",
    waitingMinutes: 5,
    color: "#94a3b8",
  },
  {
    id: "Q-113",
    queueNumber: 113,
    patientName: "Jade Monroe",
    patientId: "PT-1045",
    patientInitials: "JM",
    doctorName: "Dr. Daniel Taylor",
    doctorId: "DOC-012",
    department: "Orthopedics",
    priority: "normal",
    status: "waiting",
    appointmentType: "scheduled",
    appointmentTime: "10:30",
    checkInTime: "10:05",
    waitingMinutes: 0,
    color: "#3b82f6",
  },
  {
    id: "Q-114",
    queueNumber: 114,
    patientName: "Raymond Torres",
    patientId: "PT-1019",
    patientInitials: "RT",
    doctorName: "Dr. Sarah Chen",
    doctorId: "DOC-001",
    department: "Cardiology",
    priority: "high",
    status: "waiting",
    appointmentType: "follow-up",
    appointmentTime: "10:00",
    checkInTime: "09:25",
    waitingMinutes: 27,
    color: "#f59e0b",
  },
  {
    id: "Q-115",
    queueNumber: 115,
    patientName: "Hannah Blake",
    patientId: "PT-1038",
    patientInitials: "HB",
    doctorName: "Dr. James Wilson",
    doctorId: "DOC-002",
    department: "Neurology",
    priority: "normal",
    status: "waiting",
    appointmentType: "walk-in",
    appointmentTime: "—",
    checkInTime: "10:00",
    waitingMinutes: 0,
    color: "#3b82f6",
  },
  {
    id: "Q-116",
    queueNumber: 116,
    patientName: "Carlos Mendez",
    patientId: "PT-1046",
    patientInitials: "CM",
    doctorName: "Dr. Michael Kim",
    doctorId: "DOC-004",
    department: "Orthopedics",
    priority: "high",
    status: "cancelled",
    appointmentType: "scheduled",
    appointmentTime: "09:30",
    checkInTime: "—",
    waitingMinutes: 0,
    notes: "Patient cancelled due to emergency",
    color: "#f59e0b",
  },
  {
    id: "Q-117",
    queueNumber: 117,
    patientName: "Fiona Gallagher",
    patientId: "PT-1031",
    patientInitials: "FG",
    doctorName: "Dr. Emily Rodriguez",
    doctorId: "DOC-003",
    department: "Pediatrics",
    priority: "normal",
    status: "completed",
    appointmentType: "scheduled",
    appointmentTime: "08:00",
    checkInTime: "07:45",
    calledTime: "07:50",
    consultationStartTime: "08:00",
    consultationEndTime: "08:20",
    waitingMinutes: 5,
    color: "#3b82f6",
  },
  {
    id: "Q-118",
    queueNumber: 118,
    patientName: "Uma Patel",
    patientId: "PT-1047",
    patientInitials: "UP",
    doctorName: "Dr. Lisa Thompson",
    doctorId: "DOC-005",
    department: "Dermatology",
    priority: "normal",
    status: "in-consultation",
    appointmentType: "scheduled",
    appointmentTime: "10:00",
    checkInTime: "09:40",
    consultationStartTime: "10:05",
    waitingMinutes: 25,
    color: "#3b82f6",
  },
  {
    id: "Q-119",
    queueNumber: 119,
    patientName: "Victor Stone",
    patientId: "PT-1048",
    patientInitials: "VS",
    doctorName: "Dr. Robert Patel",
    doctorId: "DOC-006",
    department: "Ophthalmology",
    priority: "low",
    status: "called",
    appointmentType: "check-up",
    appointmentTime: "10:00",
    checkInTime: "09:35",
    calledTime: "09:50",
    waitingMinutes: 15,
    color: "#94a3b8",
  },
  {
    id: "Q-120",
    queueNumber: 120,
    patientName: "Wendy Park",
    patientId: "PT-1049",
    patientInitials: "WP",
    doctorName: "Dr. Amanda Foster",
    doctorId: "DOC-007",
    department: "Pulmonology",
    priority: "high",
    status: "waiting",
    appointmentType: "emergency",
    appointmentTime: "—",
    checkInTime: "09:55",
    waitingMinutes: 0,
    notes: "Asthma attack",
    color: "#f59e0b",
  },
];

/* ══════════════════════════════════════════════
   Queue stats
   ══════════════════════════════════════════════ */

import {
  AlertTriangle,
  Clock,
  Timer,
  UserCheck,
  UserMinus,
  Users,
} from "lucide-react";

const waitingCount = queueEntries.filter((e) => e.status === "waiting").length;
const checkedInCount = queueEntries.filter(
  (e) => e.status === "waiting" || e.status === "called",
).length;
const inConsultationCount = queueEntries.filter(
  (e) => e.status === "in-consultation",
).length;
const completedCount = queueEntries.filter(
  (e) => e.status === "completed",
).length;
const emergencyCount = queueEntries.filter(
  (e) =>
    e.priority === "emergency" &&
    e.status !== "cancelled" &&
    e.status !== "no-show",
).length;

const waitingTimes = queueEntries
  .filter((e) => e.status === "waiting" || e.status === "called")
  .map((e) => e.waitingMinutes);
const avgWaitTime =
  waitingTimes.length > 0
    ? Math.round(waitingTimes.reduce((a, b) => a + b, 0) / waitingTimes.length)
    : 0;

export const queueStats: QueueStat[] = [
  {
    id: "waiting",
    label: "Patients Waiting",
    value: waitingCount,
    change: 12,
    changeLabel: "vs last hour",
    trend: "up",
    icon: Users,
    color: "blue",
  },
  {
    id: "checked-in",
    label: "Checked-in",
    value: checkedInCount,
    change: 5,
    changeLabel: "vs last hour",
    trend: "up",
    icon: UserCheck,
    color: "emerald",
  },
  {
    id: "in-consultation",
    label: "In Consultation",
    value: inConsultationCount,
    change: 2,
    changeLabel: "currently",
    trend: "neutral",
    icon: Clock,
    color: "violet",
  },
  {
    id: "completed",
    label: "Completed",
    value: completedCount,
    change: 8,
    changeLabel: "today",
    trend: "up",
    icon: UserMinus,
    color: "cyan",
  },
  {
    id: "emergency",
    label: "Emergency Cases",
    value: emergencyCount,
    change: 3,
    changeLabel: "vs yesterday",
    trend: "up",
    icon: AlertTriangle,
    color: "rose",
  },
  {
    id: "avg-wait",
    label: "Avg Waiting Time",
    value: avgWaitTime,
    change: 4,
    changeLabel: "vs yesterday",
    trend: "down",
    icon: Timer,
    color: "amber",
    suffix: " min",
  },
];

/* ══════════════════════════════════════════════
   Doctor availability for sidebar
   ══════════════════════════════════════════════ */

export const doctorAvailability = [
  {
    name: "Dr. Sarah Chen",
    status: "available",
    patients: 3,
    nextSlot: "10:30",
  },
  { name: "Dr. James Wilson", status: "busy", patients: 2, nextSlot: "10:15" },
  {
    name: "Dr. Emily Rodriguez",
    status: "available",
    patients: 1,
    nextSlot: "10:00",
  },
  { name: "Dr. Michael Kim", status: "break", patients: 0, nextSlot: "10:45" },
  {
    name: "Dr. Lisa Thompson",
    status: "available",
    patients: 2,
    nextSlot: "10:30",
  },
  { name: "Dr. Robert Patel", status: "busy", patients: 2, nextSlot: "10:20" },
  {
    name: "Dr. Amanda Foster",
    status: "available",
    patients: 1,
    nextSlot: "10:15",
  },
  {
    name: "Dr. David Mitchell",
    status: "available",
    patients: 1,
    nextSlot: "10:00",
  },
  {
    name: "Dr. Jessica Lee",
    status: "available",
    patients: 2,
    nextSlot: "10:30",
  },
  {
    name: "Dr. Christopher Brown",
    status: "busy",
    patients: 1,
    nextSlot: "10:45",
  },
  {
    name: "Dr. Olivia Martinez",
    status: "available",
    patients: 0,
    nextSlot: "10:00",
  },
  {
    name: "Dr. Daniel Taylor",
    status: "break",
    patients: 0,
    nextSlot: "11:00",
  },
];

/* ══════════════════════════════════════════════
   Helpers
   ══════════════════════════════════════════════ */

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function formatTime(time: string): string {
  if (time === "—") return "—";
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export function getInitialsColor(name: string): string {
  const colors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-violet-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-cyan-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}
