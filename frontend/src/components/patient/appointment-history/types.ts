import {
  CalendarCheck,
  CalendarX2,
  Clock,
  RefreshCw,
  XCircle,
  type LucideIcon,
} from "lucide-react";

/* ─── Status types ─── */

export type AppointmentStatus =
  | "upcoming"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "rescheduled"
  | "no-show";

export const statusConfig: Record<
  AppointmentStatus,
  { label: string; icon: LucideIcon; className: string; dotColor: string }
> = {
  upcoming: {
    label: "Upcoming",
    icon: CalendarCheck,
    className:
      "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    dotColor: "bg-blue-500",
  },
  confirmed: {
    label: "Confirmed",
    icon: Clock,
    className:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    dotColor: "bg-emerald-500",
  },
  completed: {
    label: "Completed",
    icon: CalendarCheck,
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    dotColor: "bg-slate-400",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    dotColor: "bg-red-500",
  },
  rescheduled: {
    label: "Rescheduled",
    icon: RefreshCw,
    className:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    dotColor: "bg-amber-500",
  },
  "no-show": {
    label: "No Show",
    icon: CalendarX2,
    className:
      "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
    dotColor: "bg-rose-500",
  },
};

/* ─── Doctor ─── */

export interface AppointmentDoctor {
  id: string;
  name: string;
  initials: string;
  department: string;
  avatarColor?: string;
}

/* ─── Appointment ─── */

export interface Appointment {
  id: string;
  appointmentId: string;
  doctor: AppointmentDoctor;
  department: string;
  clinic: string;
  date: Date;
  time: string;
  duration: string;
  consultationType: "In-Person" | "Video" | "Phone";
  status: AppointmentStatus;
  reason?: string;
  notes?: string;
  isFavoriteDoctor?: boolean;
}

/* ─── Tab option ─── */

export type TabOption = "all" | "upcoming" | "completed" | "cancelled";

export interface TabDef {
  key: TabOption;
  label: string;
  count?: number;
}

/* ─── Filter state ─── */

export interface FilterState {
  search: string;
  status: AppointmentStatus[];
  department: string[];
  consultationType: string[];
  sort: "date-asc" | "date-desc" | "doctor" | "status";
}

/* ─── View mode ─── */

export type ViewMode = "table" | "cards";

/* ─── Mock Doctors ─── */

export const mockDoctors: AppointmentDoctor[] = [
  {
    id: "d1",
    name: "Dr. Sarah Chen",
    initials: "SC",
    department: "Cardiology",
  },
  {
    id: "d2",
    name: "Dr. Michael Mitchell",
    initials: "MM",
    department: "General Medicine",
  },
  {
    id: "d3",
    name: "Dr. Emily Rodriguez",
    initials: "ER",
    department: "Neurology",
  },
  {
    id: "d4",
    name: "Dr. James Wilson",
    initials: "JW",
    department: "Orthopedics",
  },
  {
    id: "d5",
    name: "Dr. Priya Patel",
    initials: "PP",
    department: "Cardiology",
  },
  {
    id: "d6",
    name: "Dr. Robert Kim",
    initials: "RK",
    department: "Pediatrics",
  },
  {
    id: "d7",
    name: "Dr. Amanda Foster",
    initials: "AF",
    department: "Ophthalmology",
  },
  { id: "d8", name: "Dr. David Thompson", initials: "DT", department: "ENT" },
  {
    id: "d9",
    name: "Dr. Lisa Chang",
    initials: "LC",
    department: "Dermatology",
  },
  {
    id: "d10",
    name: "Dr. Marcus Johnson",
    initials: "MJ",
    department: "Psychiatry",
  },
];

/* ─── Clinics ─── */

const clinics = [
  "MediFlow Main Campus, Suite 200",
  "MediFlow East Wing, Room 105",
  "MediFlow West Clinic, Floor 2",
  "MediFlow North Tower, Suite 450",
  "MediFlow South Pavilion, Room 310",
];

/* ─── Consultation types ─── */

const consultTypes = ["In-Person", "Video", "Phone"] as const;

/* ─── Helper to generate mock appointments ─── */

function generateMockAppointments(): Appointment[] {
  const today = new Date();
  const appointments: Appointment[] = [];

  const statuses: AppointmentStatus[] = [
    "upcoming",
    "confirmed",
    "completed",
    "cancelled",
    "rescheduled",
    "no-show",
    "completed",
    "completed",
    "upcoming",
    "confirmed",
    "completed",
    "cancelled",
    "completed",
    "completed",
    "upcoming",
    "confirmed",
    "completed",
    "completed",
    "upcoming",
    "completed",
    "completed",
    "cancelled",
    "completed",
    "completed",
  ];

  const reasons = [
    "Annual checkup",
    "Chest pain evaluation",
    "Headache and migraines",
    "Knee pain consultation",
    "Heart rhythm monitoring",
    "Child wellness visit",
    "Vision test",
    "Sinus infection",
    "Skin rash examination",
    "Anxiety consultation",
    "Blood pressure follow-up",
    "MRI results review",
    "Post-surgery follow-up",
    "Allergy testing",
    "Vaccination",
    "Sleep study consultation",
    "Digestive issues",
    "Thyroid function test",
    "Joint pain",
    "Eye pressure check",
    "Hearing test",
    "Dermatology screening",
    "Stress management",
    "Nutrition counseling",
  ];

  for (let i = 0; i < 24; i++) {
    const doctor = mockDoctors[i % mockDoctors.length];
    const status = statuses[i];
    const daysOffset =
      status === "upcoming" ||
      status === "confirmed" ||
      status === "rescheduled"
        ? Math.floor(Math.random() * 30) + 1
        : -(Math.floor(Math.random() * 90) + 1);

    const aptDate = new Date(today);
    aptDate.setDate(today.getDate() + daysOffset);

    const hour = 8 + Math.floor(Math.random() * 10);
    const minute = Math.random() > 0.5 ? "00" : "30";
    const ampm = hour >= 12 ? "PM" : "AM";
    const h12 = hour % 12 || 12;
    const timeStr = `${h12}:${minute} ${ampm}`;

    appointments.push({
      id: `apt-${String(i + 1).padStart(3, "0")}`,
      appointmentId: `MF-${String(today.getFullYear()).slice(-2)}${String(aptDate.getMonth() + 1).padStart(2, "0")}-${String(i + 1).padStart(4, "0")}`,
      doctor,
      department: doctor.department,
      clinic: clinics[i % clinics.length],
      date: aptDate,
      time: timeStr,
      duration: "30 min",
      consultationType: consultTypes[i % consultTypes.length],
      status,
      reason: reasons[i % reasons.length],
      isFavoriteDoctor: i % 5 === 0,
    });
  }

  return appointments;
}

export const mockAppointments = generateMockAppointments();

/* ─── Derived stats ─── */

export interface AppointmentStats {
  upcoming: number;
  completed: number;
  cancelled: number;
  missed: number;
  thisMonth: number;
  favoriteDoctorVisits: number;
}

export function computeStats(appointments: Appointment[]): AppointmentStats {
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  return {
    upcoming: appointments.filter(
      (a) =>
        a.status === "upcoming" ||
        a.status === "confirmed" ||
        a.status === "rescheduled",
    ).length,
    completed: appointments.filter((a) => a.status === "completed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
    missed: appointments.filter((a) => a.status === "no-show").length,
    thisMonth: appointments.filter((a) => a.date >= thisMonthStart).length,
    favoriteDoctorVisits: appointments.filter(
      (a) => a.isFavoriteDoctor && a.status === "completed",
    ).length,
  };
}

/* ─── Departments list for filters ─── */

export const allDepartments = Array.from(
  new Set(mockDoctors.map((d) => d.department)),
).sort();

/* ─── Filter helpers ─── */

export const DEFAULT_APPOINTMENT_FILTERS: FilterState = {
  search: "",
  status: [],
  department: [],
  consultationType: [],
  sort: "date-desc",
};

export function getPatientAppointments(
  filters: FilterState,
  appointments: Appointment[],
): Appointment[] {
  let result = [...appointments];

  // Search
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (a) =>
        a.doctor.name.toLowerCase().includes(q) ||
        a.department.toLowerCase().includes(q) ||
        a.appointmentId.toLowerCase().includes(q) ||
        a.clinic.toLowerCase().includes(q) ||
        a.reason?.toLowerCase().includes(q),
    );
  }

  // Status filter
  if (filters.status.length > 0) {
    result = result.filter((a) => filters.status.includes(a.status));
  }

  // Department filter
  if (filters.department.length > 0) {
    result = result.filter((a) => filters.department.includes(a.department));
  }

  // Consultation type filter
  if (filters.consultationType.length > 0) {
    result = result.filter((a) =>
      filters.consultationType.includes(a.consultationType),
    );
  }

  // Sort
  switch (filters.sort) {
    case "date-desc":
      result.sort((a, b) => b.date.getTime() - a.date.getTime());
      break;
    case "date-asc":
      result.sort((a, b) => a.date.getTime() - b.date.getTime());
      break;
    case "doctor":
      result.sort((a, b) => a.doctor.name.localeCompare(b.doctor.name));
      break;
    case "status":
      const statusOrder: Record<string, number> = {
        upcoming: 0,
        confirmed: 1,
        rescheduled: 2,
        completed: 3,
        cancelled: 4,
        "no-show": 5,
      };
      result.sort(
        (a, b) => (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99),
      );
      break;
  }

  return result;
}
