// ============================================================
// Types & Mock Data — Appointment Calendar
// ============================================================

export type CalendarView = "day" | "week" | "month";

export type AppointmentStatus =
  | "Confirmed"
  | "Pending"
  | "Cancelled"
  | "Completed"
  | "No Show"
  | "Rescheduled"
  | "Checked In"
  | "In Progress";

export interface CalendarAppointment {
  id: string;
  patientName: string;
  patientInitials: string;
  patientId: string;
  doctorName: string;
  doctorId: string;
  doctorInitials: string;
  department: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  endTime: string;
  duration: number; // minutes
  status: AppointmentStatus;
  consultationType: string;
  notes?: string;
  isEmergency?: boolean;
}

export interface DoctorAvailability {
  doctorId: string;
  doctorName: string;
  doctorInitials: string;
  department: string;
  isAvailable: boolean;
  nextSlot?: string;
}

export interface DaySummary {
  totalAppointments: number;
  completed: number;
  pending: number;
  cancelled: number;
  noShow: number;
}

// ─── Status Color Map ───────────────────────────────────────

export const statusColorMap: Record<AppointmentStatus, string> = {
  Confirmed: "emerald",
  Pending: "amber",
  Cancelled: "red",
  Completed: "blue",
  "No Show": "slate",
  Rescheduled: "violet",
  "Checked In": "cyan",
  "In Progress": "indigo",
};

export const statusBgMap: Record<AppointmentStatus, string> = {
  Confirmed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  Pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  Cancelled: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  Completed: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  "No Show": "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  Rescheduled: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
  "Checked In": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
  "In Progress": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
};

export const statusDotMap: Record<AppointmentStatus, string> = {
  Confirmed: "bg-emerald-500",
  Pending: "bg-amber-500",
  Cancelled: "bg-red-500",
  Completed: "bg-blue-500",
  "No Show": "bg-slate-400",
  Rescheduled: "bg-violet-500",
  "Checked In": "bg-cyan-500",
  "In Progress": "bg-indigo-500",
};

export const statusEventBgMap: Record<AppointmentStatus, string> = {
  Confirmed: "bg-emerald-500/85 border-emerald-600 hover:bg-emerald-500",
  Pending: "bg-amber-500/85 border-amber-600 hover:bg-amber-500",
  Cancelled: "bg-red-500/85 border-red-600 hover:bg-red-500",
  Completed: "bg-blue-500/85 border-blue-600 hover:bg-blue-500",
  "No Show": "bg-slate-400/85 border-slate-500 hover:bg-slate-400",
  Rescheduled: "bg-violet-500/85 border-violet-600 hover:bg-violet-500",
  "Checked In": "bg-cyan-500/85 border-cyan-600 hover:bg-cyan-500",
  "In Progress": "bg-indigo-500/85 border-indigo-600 hover:bg-indigo-500",
};

// ─── Doctors for Calendar ───────────────────────────────────

export const calendarDoctors = [
  { id: "DOC-001", name: "Dr. Sarah Johnson", initials: "SJ", department: "Cardiology" },
  { id: "DOC-002", name: "Dr. James Mitchell", initials: "JM", department: "Neurology" },
  { id: "DOC-003", name: "Dr. Ayesha Khan", initials: "AK", department: "Pediatrics" },
  { id: "DOC-004", name: "Dr. Robert Chen", initials: "RC", department: "Orthopedics" },
  { id: "DOC-005", name: "Dr. Emily Watson", initials: "EW", department: "Dermatology" },
  { id: "DOC-006", name: "Dr. Michael Torres", initials: "MT", department: "Cardiology" },
  { id: "DOC-007", name: "Dr. Lisa Park", initials: "LP", department: "Pediatrics" },
  { id: "DOC-008", name: "Dr. Omar Hassan", initials: "OH", department: "General Surgery" },
  { id: "DOC-009", name: "Dr. Maria Santos", initials: "MS", department: "Ophthalmology" },
  { id: "DOC-010", name: "Dr. John Baker", initials: "JB", department: "Pulmonology" },
] as const;

export const calendarDepartments = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "General Surgery",
  "Ophthalmology",
  "Pulmonology",
] as const;

// ─── Generate Mock Appointments ─────────────────────────────

const patients = [
  { name: "Emily Johnson", initials: "EJ", id: "PAT-001" },
  { name: "Michael Chen", initials: "MC", id: "PAT-002" },
  { name: "Sophia Williams", initials: "SW", id: "PAT-003" },
  { name: "James Brown", initials: "JB", id: "PAT-004" },
  { name: "Olivia Davis", initials: "OD", id: "PAT-005" },
  { name: "William Miller", initials: "WM", id: "PAT-006" },
  { name: "Ava Wilson", initials: "AW", id: "PAT-007" },
  { name: "Alexander Lewis", initials: "AL", id: "PAT-008" },
  { name: "Mia Taylor", initials: "MT", id: "PAT-009" },
  { name: "Daniel Anderson", initials: "DA", id: "PAT-010" },
  { name: "Charlotte Thomas", initials: "CT", id: "PAT-011" },
  { name: "Ethan Martinez", initials: "EM", id: "PAT-012" },
  { name: "Amelia Garcia", initials: "AG", id: "PAT-013" },
  { name: "Benjamin Robinson", initials: "BR", id: "PAT-014" },
  { name: "Harper Clark", initials: "HC", id: "PAT-015" },
  { name: "Lucas Rodriguez", initials: "LR", id: "PAT-016" },
  { name: "Evelyn Lee", initials: "EL", id: "PAT-017" },
  { name: "Henry Walker", initials: "HW", id: "PAT-018" },
  { name: "Abigail Hall", initials: "AH", id: "PAT-019" },
  { name: "Sebastian Young", initials: "SY", id: "PAT-020" },
  { name: "Elizabeth King", initials: "EK", id: "PAT-021" },
  { name: "Jack Wright", initials: "JW", id: "PAT-022" },
  { name: "Sofia Lopez", initials: "SL", id: "PAT-023" },
  { name: "Owen Hill", initials: "OH", id: "PAT-024" },
  { name: "Aria Scott", initials: "AS", id: "PAT-025" },
  { name: "Grayson Green", initials: "GG", id: "PAT-026" },
  { name: "Scarlett Adams", initials: "SA", id: "PAT-027" },
  { name: "Dylan Baker", initials: "DB", id: "PAT-028" },
  { name: "Victoria Nelson", initials: "VN", id: "PAT-029" },
  { name: "Carter Carter", initials: "CC", id: "PAT-030" },
  { name: "Luna Mitchell", initials: "LM", id: "PAT-031" },
  { name: "Leo Perez", initials: "LP", id: "PAT-032" },
  { name: "Chloe Roberts", initials: "CR", id: "PAT-033" },
  { name: "Nolan Turner", initials: "NT", id: "PAT-034" },
  { name: "Riley Phillips", initials: "RP", id: "PAT-035" },
];

const statuses: AppointmentStatus[] = [
  "Confirmed", "Confirmed", "Confirmed", "Pending", "Completed",
  "Completed", "Cancelled", "Confirmed", "Confirmed", "In Progress",
  "Checked In", "No Show", "Rescheduled", "Confirmed", "Pending",
  "Confirmed", "Completed", "Confirmed", "Pending", "Confirmed",
  "Confirmed", "Completed", "Confirmed", "Confirmed", "Pending",
  "Completed", "Confirmed", "Confirmed", "Checked In", "Confirmed",
  "Confirmed", "Pending", "Completed", "Confirmed", "No Show",
];

const consultationTypes = ["In-Person", "Video", "Phone", "In-Person", "In-Person", "Video", "In-Person", "Phone", "In-Person", "Emergency"];

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  return `${pad(Math.floor(total / 60) % 24)}:${pad(total % 60)}`;
}

function formatDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function generateMockAppointments(): CalendarAppointment[] {
  const today = new Date(2026, 6, 12); // July 12, 2026
  const appointments: CalendarAppointment[] = [];

  // Generate appointments for a 2-week range around today
  for (let dayOffset = -5; dayOffset <= 10; dayOffset++) {
    const date = new Date(today);
    date.setDate(date.getDate() + dayOffset);

    // Skip weekends for most appointments
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const count = isWeekend ? (dayOffset === 0 ? 2 : 0) : (dayOffset === 0 ? Math.floor(Math.random() * 5) + 6 : Math.floor(Math.random() * 4) + 3);

    for (let i = 0; i < count; i++) {
      const patientIdx = Math.floor(Math.random() * patients.length);
      const doctorIdx = Math.floor(Math.random() * calendarDoctors.length);
      const statusIdx = Math.floor(Math.random() * statuses.length);
      const consultIdx = Math.floor(Math.random() * consultationTypes.length);
      const hour = 8 + Math.floor(Math.random() * 9); // 8 AM - 5 PM
      const minute = Math.random() < 0.5 ? 0 : 30;
      const duration = [15, 30, 45, 60, 90][Math.floor(Math.random() * 5)];
      const time = `${pad(hour)}:${pad(minute)}`;

      const appointment: CalendarAppointment = {
        id: `CAL-${dayOffset > 0 ? "F" : "P"}${pad(Math.abs(dayOffset))}-${pad(i + 1)}`,
        patientName: patients[patientIdx].name,
        patientInitials: patients[patientIdx].initials,
        patientId: patients[patientIdx].id,
        doctorName: calendarDoctors[doctorIdx].name,
        doctorId: calendarDoctors[doctorIdx].id,
        doctorInitials: calendarDoctors[doctorIdx].initials,
        department: calendarDoctors[doctorIdx].department,
        date: formatDate(date),
        time,
        endTime: addMinutes(time, duration),
        duration,
        status: statuses[statusIdx],
        consultationType: consultationTypes[consultIdx],
        isEmergency: Math.random() < 0.05,
      };

      appointments.push(appointment);
    }
  }

  return appointments;
}

export const mockCalendarAppointments = generateMockAppointments();

// ─── Doctor Availability ────────────────────────────────────

export const mockDoctorAvailability: DoctorAvailability[] = calendarDoctors.map((doc) => ({
  doctorId: doc.id,
  doctorName: doc.name,
  doctorInitials: doc.initials,
  department: doc.department,
  isAvailable: Math.random() > 0.25,
  nextSlot: Math.random() > 0.3 ? `${pad(9 + Math.floor(Math.random() * 7))}:${Math.random() < 0.5 ? "00" : "30"}` : undefined,
}));

// ─── Today's Summary ────────────────────────────────────────

export function getTodaySummary(date: string, appointments: CalendarAppointment[]): DaySummary {
  const todayApps = appointments.filter((a) => a.date === date);
  return {
    totalAppointments: todayApps.length,
    completed: todayApps.filter((a) => a.status === "Completed").length,
    pending: todayApps.filter((a) => a.status === "Pending").length,
    cancelled: todayApps.filter((a) => a.status === "Cancelled").length,
    noShow: todayApps.filter((a) => a.status === "No Show").length,
  };
}

// ─── Date Helpers ───────────────────────────────────────────

export function getWeekDays(date: Date): Date[] {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Monday start
  start.setDate(diff);
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}

export function getMonthDays(date: Date): (Date | null)[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startPad = firstDay.getDay(); // 0=Sun
  const days: (Date | null)[] = [];

  for (let i = 0; i < startPad; i++) {
    days.push(null);
  }
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }
  return days;
}

export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function formatDayHeader(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "short", day: "numeric" });
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isToday(date: Date): boolean {
  const today = new Date(2026, 6, 12);
  return isSameDay(date, today);
}
