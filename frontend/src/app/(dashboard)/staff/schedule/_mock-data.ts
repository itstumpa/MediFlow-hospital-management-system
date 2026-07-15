import { type LucideIcon } from "lucide-react";

/* ══════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════ */

export type DoctorStatus =
  | "available"
  | "busy"
  | "on-leave"
  | "emergency-available"
  | "offline";

export type SlotType =
  | "available"
  | "booked"
  | "blocked"
  | "emergency"
  | "lunch-break"
  | "vacation";

export type AppointmentPriority = "routine" | "urgent" | "emergency";

export type ViewMode = "month" | "week" | "day" | "agenda";

export type AppointmentStatus =
  | "scheduled"
  | "in-progress"
  | "completed"
  | "cancelled"
  | "no-show";

export type LeaveType = "vacation" | "sick" | "personal" | "holiday";

/* ─── Interfaces ────────────────────────────── */

export interface ScheduleEvent {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorDepartment: string;
  patientName: string | null;
  patientId: string | null;
  date: string;
  startTime: string;
  endTime: string;
  slotType: SlotType;
  priority: AppointmentPriority;
  reason: string;
  status: AppointmentStatus;
  color: string;
}

export interface TimeSlot {
  id: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  slotType: SlotType;
  patientName: string | null;
  patientId: string | null;
  priority: AppointmentPriority;
  reason: string;
  isAvailable: boolean;
  color: string;
}

export interface DoctorScheduleEntry {
  doctorId: string;
  doctorName: string;
  department: string;
  photoUrl: string;
  status: DoctorStatus;
  workingHours: { start: string; end: string };
  slots: TimeSlot[];
  events: ScheduleEvent[];
}

export interface ScheduleStat {
  id: string;
  label: string;
  value: number;
  change: number;
  changeLabel: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  color: string;
}

export interface LeaveEntry {
  id: string;
  doctorId: string;
  doctorName: string;
  department: string;
  startDate: string;
  endDate: string;
  reason: string;
  type: LeaveType;
  status: "approved" | "pending" | "rejected";
}

export interface CalendarDay {
  date: string;
  dayNumber: number;
  dayName: string;
  isToday: boolean;
  isCurrentMonth: boolean;
  events: ScheduleEvent[];
}

export interface Holiday {
  date: string;
  name: string;
}

/* ─── Doctor Info (light) ───────────────────── */

export interface DoctorInfo {
  id: string;
  name: string;
  department: string;
  photoUrl: string;
  status: DoctorStatus;
  workingHours: string;
  nextAvailable: string | null;
  todayAppointments: number;
  totalSlots: number;
  bookedSlots: number;
}

/* ══════════════════════════════════════════════
   Department colors
   ══════════════════════════════════════════════ */

export const departmentColors: Record<string, string> = {
  Cardiologist: "#ef4444",
  "Interventional Cardiologist": "#dc2626",
  "Pediatric Cardiologist": "#f87171",
  Neurologist: "#3b82f6",
  "Clinical Neurologist": "#2563eb",
  Pediatrician: "#10b981",
  "Orthopedic Surgeon": "#f59e0b",
  Dermatologist: "#ec4899",
  "General Surgeon": "#8b5cf6",
  Ophthalmologist: "#06b6d4",
  Pulmonologist: "#84cc16",
  Neonatologist: "#14b8a6",
};

/* ══════════════════════════════════════════════
   Status config
   ══════════════════════════════════════════════ */

export const doctorStatusConfig: Record<
  DoctorStatus,
  { label: string; class: string; dot: string }
> = {
  available: {
    label: "Available",
    class:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  busy: {
    label: "Busy",
    class:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  "on-leave": {
    label: "On Leave",
    class: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    dot: "bg-red-500",
  },
  "emergency-available": {
    label: "Emergency Available",
    class:
      "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400",
    dot: "bg-violet-500",
  },
  offline: {
    label: "Offline",
    class: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    dot: "bg-slate-400",
  },
};

export const slotTypeConfig: Record<
  SlotType,
  { label: string; class: string; dot: string }
> = {
  available: {
    label: "Available",
    class:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  booked: {
    label: "Booked",
    class: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  blocked: {
    label: "Blocked",
    class: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    dot: "bg-red-500",
  },
  emergency: {
    label: "Emergency",
    class:
      "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400",
    dot: "bg-violet-500",
  },
  "lunch-break": {
    label: "Lunch Break",
    class:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  vacation: {
    label: "Vacation",
    class: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
    dot: "bg-rose-500",
  },
};

export const priorityConfig: Record<
  AppointmentPriority,
  { label: string; class: string }
> = {
  routine: {
    label: "Routine",
    class: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  },
  urgent: {
    label: "Urgent",
    class:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  },
  emergency: {
    label: "Emergency",
    class: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  },
};

export const appointmentStatusConfig: Record<
  AppointmentStatus,
  { label: string; class: string; dot: string }
> = {
  scheduled: {
    label: "Scheduled",
    class: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  "in-progress": {
    label: "In Progress",
    class:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  completed: {
    label: "Completed",
    class:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  cancelled: {
    label: "Cancelled",
    class: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    dot: "bg-slate-400",
  },
  "no-show": {
    label: "No Show",
    class: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    dot: "bg-red-500",
  },
};

/* ══════════════════════════════════════════════
   Sort options
   ══════════════════════════════════════════════ */

export const sortOptions = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "available-first", label: "Available First" },
  { value: "busy-first", label: "Busy First" },
  { value: "department", label: "Department" },
];

export const viewModeOptions = [
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "day", label: "Day" },
  { value: "agenda", label: "Agenda" },
];

/* ══════════════════════════════════════════════
   Helpers
   ══════════════════════════════════════════════ */

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getDayName(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });
}

export function getMonthName(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "long" });
}

export function getRelativeDay(dateStr: string): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);
  const diff = Math.floor(
    (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  return formatDate(dateStr);
}

export function isToday(dateStr: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);
  return date.getTime() === today.getTime();
}

export function getWeekDates(referenceDate: Date = new Date()): string[] {
  const start = new Date(referenceDate);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Monday start
  start.setDate(diff);
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

export function getMonthDays(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: CalendarDay[] = [];
  const today = new Date().toISOString().split("T")[0];

  // Previous month's overflow
  const startPad = firstDay.getDay();
  for (let i = startPad - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    const dateStr = d.toISOString().split("T")[0];
    days.push({
      date: dateStr,
      dayNumber: d.getDate(),
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
      isToday: dateStr === today,
      isCurrentMonth: false,
      events: [],
    });
  }

  // Current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const d = new Date(year, month, i);
    const dateStr = d.toISOString().split("T")[0];
    days.push({
      date: dateStr,
      dayNumber: d.getDate(),
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
      isToday: dateStr === today,
      isCurrentMonth: true,
      events: [],
    });
  }

  // Next month's overflow
  const endPad = 42 - days.length;
  for (let i = 1; i <= endPad; i++) {
    const d = new Date(year, month + 1, i);
    const dateStr = d.toISOString().split("T")[0];
    days.push({
      date: dateStr,
      dayNumber: d.getDate(),
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
      isToday: dateStr === today,
      isCurrentMonth: false,
      events: [],
    });
  }

  return days;
}

export function getCurrentDateStr(): string {
  return new Date().toISOString().split("T")[0];
}

/* ══════════════════════════════════════════════
   Mock Doctors Info
   ══════════════════════════════════════════════ */

const doctorPhotoUrls: Record<string, string> = {
  "1": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=600&fit=crop&crop=face",
  "2": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=600&fit=crop&crop=face",
  "3": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop&crop=face",
  "4": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=600&fit=crop&crop=face",
  "5": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&h=600&fit=crop&crop=face",
  "6": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face",
  "7": "https://images.unsplash.com/photo-1527613426441-4da17471b0d0?w=600&h=600&fit=crop&crop=face",
  "8": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=600&fit=crop&crop=face",
  "9": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=600&fit=crop&crop=face",
  "10": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&h=600&fit=crop&crop=face",
  "11": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=600&fit=crop&crop=face",
  "12": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face",
};

export const doctorsInfo: DoctorInfo[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    department: "Cardiologist",
    photoUrl: doctorPhotoUrls["1"],
    status: "available",
    workingHours: "09:00 – 17:00",
    nextAvailable: "Now",
    todayAppointments: 5,
    totalSlots: 14,
    bookedSlots: 5,
  },
  {
    id: "2",
    name: "Dr. James Mitchell",
    department: "Neurologist",
    photoUrl: doctorPhotoUrls["2"],
    status: "busy",
    workingHours: "10:00 – 18:00",
    nextAvailable: "11:30 AM",
    todayAppointments: 8,
    totalSlots: 14,
    bookedSlots: 8,
  },
  {
    id: "3",
    name: "Dr. Ayesha Khan",
    department: "Pediatrician",
    photoUrl: doctorPhotoUrls["3"],
    status: "available",
    workingHours: "09:00 – 17:00",
    nextAvailable: "Now",
    todayAppointments: 4,
    totalSlots: 14,
    bookedSlots: 4,
  },
  {
    id: "4",
    name: "Dr. Robert Chen",
    department: "Orthopedic Surgeon",
    photoUrl: doctorPhotoUrls["4"],
    status: "on-leave",
    workingHours: "08:00 – 16:00",
    nextAvailable: "Jul 21",
    todayAppointments: 0,
    totalSlots: 14,
    bookedSlots: 0,
  },
  {
    id: "5",
    name: "Dr. Emily Watson",
    department: "Dermatologist",
    photoUrl: doctorPhotoUrls["5"],
    status: "available",
    workingHours: "10:00 – 16:00",
    nextAvailable: "Now",
    todayAppointments: 3,
    totalSlots: 10,
    bookedSlots: 3,
  },
  {
    id: "6",
    name: "Dr. Michael Torres",
    department: "Interventional Cardiologist",
    photoUrl: doctorPhotoUrls["6"],
    status: "busy",
    workingHours: "09:00 – 17:00",
    nextAvailable: "01:00 PM",
    todayAppointments: 7,
    totalSlots: 14,
    bookedSlots: 7,
  },
  {
    id: "7",
    name: "Dr. Lisa Park",
    department: "Pediatric Cardiologist",
    photoUrl: doctorPhotoUrls["7"],
    status: "emergency-available",
    workingHours: "08:00 – 20:00",
    nextAvailable: "Now (Emergency)",
    todayAppointments: 2,
    totalSlots: 20,
    bookedSlots: 2,
  },
  {
    id: "8",
    name: "Dr. Omar Hassan",
    department: "General Surgeon",
    photoUrl: doctorPhotoUrls["8"],
    status: "busy",
    workingHours: "07:00 – 15:00",
    nextAvailable: "02:30 PM",
    todayAppointments: 9,
    totalSlots: 14,
    bookedSlots: 9,
  },
  {
    id: "9",
    name: "Dr. Maria Santos",
    department: "Ophthalmologist",
    photoUrl: doctorPhotoUrls["9"],
    status: "available",
    workingHours: "09:00 – 17:00",
    nextAvailable: "Now",
    todayAppointments: 6,
    totalSlots: 14,
    bookedSlots: 6,
  },
  {
    id: "10",
    name: "Dr. John Baker",
    department: "Pulmonologist",
    photoUrl: doctorPhotoUrls["10"],
    status: "offline",
    workingHours: "13:00 – 21:00",
    nextAvailable: "01:00 PM",
    todayAppointments: 0,
    totalSlots: 14,
    bookedSlots: 0,
  },
  {
    id: "11",
    name: "Dr. Rachel Green",
    department: "Neonatologist",
    photoUrl: doctorPhotoUrls["11"],
    status: "available",
    workingHours: "09:00 – 17:00",
    nextAvailable: "Now",
    todayAppointments: 3,
    totalSlots: 14,
    bookedSlots: 3,
  },
  {
    id: "12",
    name: "Dr. David Kim",
    department: "Clinical Neurologist",
    photoUrl: doctorPhotoUrls["12"],
    status: "busy",
    workingHours: "08:00 – 16:00",
    nextAvailable: "12:00 PM",
    todayAppointments: 6,
    totalSlots: 14,
    bookedSlots: 6,
  },
];

/* ══════════════════════════════════════════════
   Schedule Stats
   ══════════════════════════════════════════════ */

import {
  Ambulance,
  CalendarCheck,
  CalendarClock,
  Coffee,
  Stethoscope,
  Users,
} from "lucide-react";

export const scheduleStats: ScheduleStat[] = [
  {
    id: "available-doctors",
    label: "Available Doctors",
    value: 5,
    change: 2,
    changeLabel: "vs yesterday",
    trend: "up",
    icon: Stethoscope,
    color: "emerald",
  },
  {
    id: "busy-doctors",
    label: "Busy Doctors",
    value: 4,
    change: 1,
    changeLabel: "vs yesterday",
    trend: "down",
    icon: Users,
    color: "amber",
  },
  {
    id: "on-leave",
    label: "On Leave",
    value: 2,
    change: 0,
    changeLabel: "vs yesterday",
    trend: "neutral",
    icon: Coffee,
    color: "rose",
  },
  {
    id: "emergency-available",
    label: "Emergency Available",
    value: 1,
    change: 0,
    changeLabel: "vs yesterday",
    trend: "neutral",
    icon: Ambulance,
    color: "violet",
  },
  {
    id: "appointments-today",
    label: "Appointments Today",
    value: 53,
    change: 7,
    changeLabel: "vs yesterday",
    trend: "up",
    icon: CalendarCheck,
    color: "blue",
  },
  {
    id: "open-slots",
    label: "Open Slots",
    value: 82,
    change: 12,
    changeLabel: "vs yesterday",
    trend: "up",
    icon: CalendarClock,
    color: "cyan",
  },
];

/* ══════════════════════════════════════════════
   Patient Names Pool
   ══════════════════════════════════════════════ */

const patientNames = [
  "Alice Thompson",
  "Bob Martinez",
  "Carol Williams",
  "David Brown",
  "Emma Davis",
  "Frank Wilson",
  "Grace Lee",
  "Henry Taylor",
  "Isabella Anderson",
  "Jack Thomas",
  "Karen Jackson",
  "Leo White",
  "Mia Harris",
  "Noah Martin",
  "Olivia Garcia",
  "Peter Robinson",
  "Quinn Clark",
  "Rachel Lewis",
  "Sam Walker",
  "Tina Hall",
  "Uma Allen",
  "Victor Young",
  "Wendy King",
  "Xavier Wright",
  "Yara Scott",
  "Zane Adams",
];

const appointmentReasons = [
  "Chest pain evaluation",
  "Routine checkup",
  "Follow-up visit",
  "Headache consultation",
  "Skin rash examination",
  "Joint pain assessment",
  "Vision test",
  "Breathing difficulty",
  "Newborn examination",
  "Vaccination",
  "Pre-surgery evaluation",
  "Lab result review",
  "Medication adjustment",
  "Allergy consultation",
  "Blood pressure check",
  "Diabetes management",
  "Thyroid evaluation",
  "Sleep study consultation",
  "Digestive issues",
  "General wellness",
];

const emergencyReasons = [
  "Acute chest pain - Emergency",
  "Severe headache - Urgent",
  "Trauma assessment",
  "Allergic reaction",
  "Stroke symptoms",
  "Cardiac arrest response",
  "Respiratory distress",
];

/* ══════════════════════════════════════════════
   Generate Mock Data
   ══════════════════════════════════════════════ */

function generateTimeSlots(
  doctorId: string,
  date: string,
  startHour: number,
  endHour: number,
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const slotDuration = 30; // minutes
  const totalMinutes = (endHour - startHour) * 60;
  const slotCount = Math.floor(totalMinutes / slotDuration);

  for (let i = 0; i < slotCount; i++) {
    const mins = startHour * 60 + i * slotDuration;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const startTime = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
    const endMins = mins + slotDuration;
    const eh = Math.floor(endMins / 60);
    const em = endMins % 60;
    const endTime = `${eh.toString().padStart(2, "0")}:${em.toString().padStart(2, "0")}`;

    slots.push({
      id: `slot-${doctorId}-${date}-${i}`,
      doctorId,
      date,
      startTime,
      endTime,
      slotType: "available",
      patientName: null,
      patientId: null,
      priority: "routine",
      reason: "",
      isAvailable: true,
      color: "#10b981",
    });
  }
  return slots;
}

function bookRandomSlots(
  slots: TimeSlot[],
  count: number,
  patientPool: string[],
  reasonPool: string[],
): TimeSlot[] {
  const availableIndices = slots
    .map((s, i) => (s.slotType === "available" ? i : -1))
    .filter((i) => i !== -1);

  const shuffled = [...availableIndices].sort(() => Math.random() - 0.5);
  const toBook = shuffled.slice(0, Math.min(count, shuffled.length));

  const usedPatients = new Set<string>();

  const result = slots.map((slot, idx) => {
    if (toBook.includes(idx)) {
      let patientName: string;
      let attempts = 0;
      do {
        patientName =
          patientPool[Math.floor(Math.random() * patientPool.length)];
        attempts++;
      } while (usedPatients.has(patientName) && attempts < 20);
      usedPatients.add(patientName);

      const patientId = `PT-${Math.floor(1000 + Math.random() * 9000)}`;
      const reason = reasonPool[Math.floor(Math.random() * reasonPool.length)];
      const priorities: AppointmentPriority[] = [
        "routine",
        "routine",
        "routine",
        "urgent",
      ];
      const priority =
        priorities[Math.floor(Math.random() * priorities.length)];

      return {
        ...slot,
        slotType: "booked" as SlotType,
        patientName,
        patientId,
        priority,
        reason,
        isAvailable: false,
        color: "#3b82f6",
      };
    }

    // Add lunch break around noon
    if (slot.startTime === "12:00" || slot.startTime === "12:30") {
      return {
        ...slot,
        slotType: "lunch-break" as SlotType,
        isAvailable: false,
        color: "#f59e0b",
        reason: "Lunch Break",
      };
    }

    return slot;
  });

  return result;
}

function generateEventsFromSlots(
  doctorId: string,
  doctorName: string,
  department: string,
  slots: TimeSlot[],
): ScheduleEvent[] {
  return slots
    .filter(
      (s) =>
        s.slotType === "booked" ||
        s.slotType === "emergency" ||
        s.slotType === "blocked",
    )
    .map((s) => ({
      id: `event-${s.id}`,
      doctorId: s.doctorId,
      doctorName,
      doctorDepartment: department,
      patientName: s.patientName,
      patientId: s.patientId,
      date: s.date,
      startTime: s.startTime,
      endTime: s.endTime,
      slotType: s.slotType,
      priority: s.priority,
      reason: s.reason,
      status: "scheduled" as AppointmentStatus,
      color: s.color,
    }));
}

function generateDoctorDay(
  doctor: DoctorInfo,
  date: string,
  startHour: number,
  endHour: number,
  patientPool: string[],
  reasonPool: string[],
  appointmentCount: number,
): { slots: TimeSlot[]; events: ScheduleEvent[] } {
  let slots = generateTimeSlots(doctor.id, date, startHour, endHour);
  slots = bookRandomSlots(slots, appointmentCount, patientPool, reasonPool);
  const events = generateEventsFromSlots(
    doctor.id,
    doctor.name,
    doctor.department,
    slots,
  );
  return { slots, events };
}

/* ─── Working hours per doctor ──────────────── */

const doctorHours: Record<string, { start: number; end: number }> = {
  "1": { start: 9, end: 17 },
  "2": { start: 10, end: 18 },
  "3": { start: 9, end: 17 },
  "4": { start: 8, end: 16 },
  "5": { start: 10, end: 16 },
  "6": { start: 9, end: 17 },
  "7": { start: 8, end: 20 },
  "8": { start: 7, end: 15 },
  "9": { start: 9, end: 17 },
  "10": { start: 13, end: 21 },
  "11": { start: 9, end: 17 },
  "12": { start: 8, end: 16 },
};

/* ─── Generate 7 days of data ───────────────── */

const today = new Date();
const todayStr = today.toISOString().split("T")[0];

export function generateScheduleDataForDate(
  dateStr: string,
): DoctorScheduleEntry[] {
  return doctorsInfo.map((doctor) => {
    const hours = doctorHours[doctor.id] ?? { start: 9, end: 17 };
    const isDoctorOnLeave = doctor.id === "4" || doctor.id === "10";
    const apptCount =
      doctor.status === "on-leave" || doctor.status === "offline"
        ? 0
        : doctor.todayAppointments;

    const { slots, events } = generateDoctorDay(
      doctor,
      dateStr,
      hours.start,
      hours.end,
      patientNames,
      appointmentReasons,
      apptCount,
    );

    // If on leave, mark all slots as vacation
    const finalSlots = isDoctorOnLeave
      ? slots.map((s) => ({
          ...s,
          slotType: "vacation" as SlotType,
          isAvailable: false,
          color: "#f43f5e",
          reason: "On Leave",
        }))
      : slots;

    const finalEvents = isDoctorOnLeave ? [] : events;

    return {
      doctorId: doctor.id,
      doctorName: doctor.name,
      department: doctor.department,
      photoUrl: doctor.photoUrl,
      status: doctor.status,
      workingHours: { start: `${hours.start}:00`, end: `${hours.end}:00` },
      slots: finalSlots,
      events: finalEvents,
    };
  });
}

export const scheduleData: DoctorScheduleEntry[] =
  generateScheduleDataForDate(todayStr);

export const weekScheduleData = getWeekDates(today).map((dateStr) => ({
  date: dateStr,
  entries: generateScheduleDataForDate(dateStr),
}));

/* ══════════════════════════════════════════════
   Leave Entries
   ══════════════════════════════════════════════ */

export const leaveEntries: LeaveEntry[] = [
  {
    id: "leave-1",
    doctorId: "4",
    doctorName: "Dr. Robert Chen",
    department: "Orthopedic Surgeon",
    startDate: "2026-07-14",
    endDate: "2026-07-20",
    reason: "Annual leave - Family vacation",
    type: "vacation",
    status: "approved",
  },
  {
    id: "leave-2",
    doctorId: "10",
    doctorName: "Dr. John Baker",
    department: "Pulmonologist",
    startDate: "2026-07-14",
    endDate: "2026-07-14",
    reason: "Personal leave",
    type: "personal",
    status: "approved",
  },
  {
    id: "leave-3",
    doctorId: "6",
    doctorName: "Dr. Michael Torres",
    department: "Interventional Cardiologist",
    startDate: "2026-07-21",
    endDate: "2026-07-25",
    reason: "Conference attendance - ACC Cardiology Summit",
    type: "vacation",
    status: "pending",
  },
  {
    id: "leave-4",
    doctorId: "12",
    doctorName: "Dr. David Kim",
    department: "Clinical Neurologist",
    startDate: "2026-07-16",
    endDate: "2026-07-17",
    reason: "Sick leave",
    type: "sick",
    status: "approved",
  },
  {
    id: "leave-5",
    doctorId: "2",
    doctorName: "Dr. James Mitchell",
    department: "Neurologist",
    startDate: "2026-07-28",
    endDate: "2026-08-03",
    reason: "Annual leave",
    type: "vacation",
    status: "pending",
  },
  {
    id: "leave-6",
    doctorId: "9",
    doctorName: "Dr. Maria Santos",
    department: "Ophthalmologist",
    startDate: "2026-07-22",
    endDate: "2026-07-23",
    reason: "Personal leave",
    type: "personal",
    status: "approved",
  },
];

/* ══════════════════════════════════════════════
   Holidays
   ══════════════════════════════════════════════ */

export const holidays: Holiday[] = [
  { date: "2026-07-04", name: "Independence Day" },
  { date: "2026-09-07", name: "Labor Day" },
  { date: "2026-11-26", name: "Thanksgiving Day" },
  { date: "2026-11-27", name: "Day After Thanksgiving" },
  { date: "2026-12-25", name: "Christmas Day" },
];

/* ══════════════════════════════════════════════
   Filter values
   ══════════════════════════════════════════════ */

export interface FilterValues {
  doctor: string;
  department: string;
  availability: string;
  date: string;
  location: string;
  sort: string;
  viewMode: ViewMode;
}

export const defaultFilterValues: FilterValues = {
  doctor: "",
  department: "",
  availability: "",
  date: "",
  location: "",
  sort: "available-first",
  viewMode: "week",
};
