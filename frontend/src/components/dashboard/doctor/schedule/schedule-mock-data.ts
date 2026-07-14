"use client";

import { addDays, format, startOfWeek } from "date-fns";

// ─── Types ───────────────────────────────────────────────────────────────────

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type CalendarViewType = "month" | "week" | "day" | "agenda";

export type AvailabilityStatusType =
  | "available"
  | "busy"
  | "on-leave"
  | "emergency-only"
  | "offline";

export type BlockedTimeType =
  | "lunch"
  | "meeting"
  | "emergency"
  | "personal"
  | "training"
  | "custom";

export type VacationType = "vacation" | "holiday" | "leave";
export type VacationStatus = "approved" | "pending" | "rejected";
export type AppointmentType =
  | "checkup"
  | "follow-up"
  | "consultation"
  | "emergency"
  | "procedure";

export interface ScheduleStat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon: string;
  color: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export interface WorkingDay {
  day: DayOfWeek;
  label: string;
  shortLabel: string;
  isWorkingDay: boolean;
  startTime: string;
  endTime: string;
  breakStart: string;
  breakEnd: string;
  slotDuration: number;
  maxPatients: number;
  bufferMinutes: number;
}

export interface TimeSlot {
  id: string;
  day: DayOfWeek;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  isRecurring: boolean;
  maxPatients: number;
  bookedCount: number;
  label?: string;
}

export interface BlockedTimeEntry {
  id: string;
  day: DayOfWeek;
  date: string;
  startTime: string;
  endTime: string;
  type: BlockedTimeType;
  label: string;
  description?: string;
  isRecurring: boolean;
  color: string;
}

export interface VacationEntry {
  id: string;
  startDate: string;
  endDate: string;
  type: VacationType;
  reason: string;
  isRecurring: boolean;
  recurringDay?: DayOfWeek;
  status: VacationStatus;
}

export interface ScheduleAppointment {
  id: string;
  patientName: string;
  patientInitials: string;
  patientId: string;
  day: DayOfWeek;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  type: AppointmentType;
  status: string;
  notes?: string;
  isConflict: boolean;
}

export interface TodaySummary {
  date: string;
  totalAppointments: number;
  completedAppointments: number;
  remainingAppointments: number;
  nextAppointment: ScheduleAppointment | null;
  currentStatus: AvailabilityStatusType;
  workingHours: { start: string; end: string };
  upcomingBreak: { start: string; end: string } | null;
  availableSlots: number;
}

export interface FilterState {
  search: string;
  view: CalendarViewType;
  weekOffset: number;
  selectedDate: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const dayOfWeekLabels: Record<
  DayOfWeek,
  { label: string; shortLabel: string; order: number }
> = {
  monday: { label: "Monday", shortLabel: "Mon", order: 1 },
  tuesday: { label: "Tuesday", shortLabel: "Tue", order: 2 },
  wednesday: { label: "Wednesday", shortLabel: "Wed", order: 3 },
  thursday: { label: "Thursday", shortLabel: "Thu", order: 4 },
  friday: { label: "Friday", shortLabel: "Fri", order: 5 },
  saturday: { label: "Saturday", shortLabel: "Sat", order: 6 },
  sunday: { label: "Sunday", shortLabel: "Sun", order: 7 },
};

export const dayOfWeekOrder: DayOfWeek[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const ALL_DAY_ORDER: DayOfWeek[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function getWeekDates(offset = 0): Date[] {
  const now = new Date();
  const weekStart = startOfWeek(addDays(now, offset * 7), { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
}

export function getDayOfWeek(date: Date): DayOfWeek {
  const dayIndex = date.getDay();
  const map: DayOfWeek[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return map[dayIndex];
}

export function getCurrentWeekDates(): Date[] {
  return getWeekDates(0);
}

export function formatTime12h(hours: number, minutes = 0): string {
  const period = hours >= 12 ? "PM" : "AM";
  const h12 = hours % 12 || 12;
  return `${h12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + (minutes || 0);
}

export function minutesToTime12h(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return formatTime12h(h, m);
}

export function generateTimeSlots(
  startTime: string,
  endTime: string,
  slotDuration: number,
  breakStart?: string,
  breakEnd?: string,
): string[] {
  const slots: string[] = [];
  const start = parseTimeToMinutes(startTime);
  const end = parseTimeToMinutes(endTime);
  const breakS = breakStart ? parseTimeToMinutes(breakStart) : -1;
  const breakE = breakEnd ? parseTimeToMinutes(breakEnd) : -1;

  for (let t = start; t + slotDuration <= end; t += slotDuration) {
    if (t >= breakS && t < breakE) continue;
    slots.push(minutesToTime12h(t));
  }
  return slots;
}

export function getMonthDays(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startPad = firstDay.getDay();
  const days: (Date | null)[] = [];

  for (let i = 0; i < startPad; i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++)
    days.push(new Date(year, month, d));

  const remaining = 42 - days.length;
  for (let i = 0; i < remaining; i++) days.push(null);

  return days;
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export const scheduleStatsData: ScheduleStat[] = [
  {
    id: "sstat-1",
    label: "Working Hours",
    value: 40,
    suffix: "hrs",
    icon: "Clock",
    color: "from-emerald-500 to-green-500",
    trend: "up",
    trendValue: "+2 hrs",
  },
  {
    id: "sstat-2",
    label: "Appointments This Week",
    value: 28,
    icon: "CalendarCheck",
    color: "from-dash-primary to-dash-primary-dark",
    trend: "up",
    trendValue: "+12%",
  },
  {
    id: "sstat-3",
    label: "Available Slots",
    value: 14,
    icon: "CalendarPlus",
    color: "from-amber-500 to-orange-500",
    trend: "neutral",
    trendValue: "Stable",
  },
  {
    id: "sstat-4",
    label: "Blocked Slots",
    value: 6,
    icon: "Ban",
    color: "from-rose-500 to-red-500",
    trend: "down",
    trendValue: "-2",
  },
  {
    id: "sstat-5",
    label: "Vacation Days",
    value: 3,
    suffix: "days",
    icon: "Plane",
    color: "from-indigo-500 to-purple-500",
    trend: "neutral",
    trendValue: "This month",
  },
];

// ─── Working Hours ───────────────────────────────────────────────────────────

export const defaultWorkingHours: WorkingDay[] = [
  {
    day: "monday",
    label: "Monday",
    shortLabel: "Mon",
    isWorkingDay: true,
    startTime: "08:00",
    endTime: "17:00",
    breakStart: "12:00",
    breakEnd: "13:00",
    slotDuration: 30,
    maxPatients: 16,
    bufferMinutes: 5,
  },
  {
    day: "tuesday",
    label: "Tuesday",
    shortLabel: "Tue",
    isWorkingDay: true,
    startTime: "08:00",
    endTime: "17:00",
    breakStart: "12:00",
    breakEnd: "13:00",
    slotDuration: 30,
    maxPatients: 16,
    bufferMinutes: 5,
  },
  {
    day: "wednesday",
    label: "Wednesday",
    shortLabel: "Wed",
    isWorkingDay: true,
    startTime: "09:00",
    endTime: "18:00",
    breakStart: "13:00",
    breakEnd: "14:00",
    slotDuration: 30,
    maxPatients: 14,
    bufferMinutes: 5,
  },
  {
    day: "thursday",
    label: "Thursday",
    shortLabel: "Thu",
    isWorkingDay: true,
    startTime: "08:00",
    endTime: "17:00",
    breakStart: "12:00",
    breakEnd: "13:00",
    slotDuration: 30,
    maxPatients: 16,
    bufferMinutes: 5,
  },
  {
    day: "friday",
    label: "Friday",
    shortLabel: "Fri",
    isWorkingDay: true,
    startTime: "08:00",
    endTime: "16:00",
    breakStart: "12:00",
    breakEnd: "13:00",
    slotDuration: 30,
    maxPatients: 14,
    bufferMinutes: 5,
  },
  {
    day: "saturday",
    label: "Saturday",
    shortLabel: "Sat",
    isWorkingDay: false,
    startTime: "09:00",
    endTime: "13:00",
    breakStart: "",
    breakEnd: "",
    slotDuration: 30,
    maxPatients: 6,
    bufferMinutes: 10,
  },
  {
    day: "sunday",
    label: "Sunday",
    shortLabel: "Sun",
    isWorkingDay: false,
    startTime: "09:00",
    endTime: "13:00",
    breakStart: "",
    breakEnd: "",
    slotDuration: 30,
    maxPatients: 4,
    bufferMinutes: 10,
  },
];

// ─── Blocked Time ────────────────────────────────────────────────────────────

export const blockedTimeEntries: BlockedTimeEntry[] = [
  {
    id: "block-01",
    day: "monday",
    date: "",
    startTime: "12:00",
    endTime: "13:00",
    type: "lunch",
    label: "Lunch Break",
    description: "Daily lunch break",
    isRecurring: true,
    color: "from-amber-400 to-amber-500",
  },
  {
    id: "block-02",
    day: "wednesday",
    date: "",
    startTime: "13:00",
    endTime: "14:00",
    type: "lunch",
    label: "Lunch Break",
    description: "Daily lunch break",
    isRecurring: true,
    color: "from-amber-400 to-amber-500",
  },
  {
    id: "block-03",
    day: "tuesday",
    date: "",
    startTime: "10:00",
    endTime: "11:00",
    type: "meeting",
    label: "Staff Meeting",
    description: "Weekly department meeting",
    isRecurring: true,
    color: "from-blue-400 to-blue-500",
  },
  {
    id: "block-04",
    day: "thursday",
    date: "",
    startTime: "15:00",
    endTime: "16:00",
    type: "training",
    label: "CME Training",
    description: "Continuing medical education",
    isRecurring: true,
    color: "from-purple-400 to-purple-500",
  },
  {
    id: "block-05",
    day: "friday",
    date: "",
    startTime: "14:00",
    endTime: "15:00",
    type: "meeting",
    label: "Case Review",
    description: "Weekly case review session",
    isRecurring: true,
    color: "from-blue-400 to-blue-500",
  },
];

// ─── Time Slots ──────────────────────────────────────────────────────────────

export function generateWeeklyTimeSlots(weekDates: Date[]): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const slotIdCounter = { current: 0 };

  weekDates.forEach((date) => {
    const day = getDayOfWeek(date);
    const wh = defaultWorkingHours.find((w) => w.day === day);
    if (!wh || !wh.isWorkingDay) return;

    const dateStr = format(date, "yyyy-MM-dd");
    const times = generateTimeSlots(
      wh.startTime,
      wh.endTime,
      wh.slotDuration,
      wh.breakStart,
      wh.breakEnd,
    );

    times.forEach((time) => {
      const startMinutes = parseTimeToMinutes(time);
      const endMinutes = startMinutes + wh.slotDuration;
      slotIdCounter.current++;
      slots.push({
        id: `slot-${slotIdCounter.current}`,
        day,
        date: dateStr,
        startTime: time,
        endTime: minutesToTime12h(endMinutes),
        isAvailable: true,
        isRecurring: false,
        maxPatients: wh.maxPatients,
        bookedCount: 0,
      });
    });
  });

  return slots;
}

// ─── Appointments ────────────────────────────────────────────────────────────

const patientNames = [
  "Sarah Johnson",
  "Michael Chen",
  "Emily Rodriguez",
  "David Kim",
  "Jessica Patel",
  "Robert Williams",
  "Amanda Garcia",
  "James Thompson",
  "Sophia Lee",
  "William Brown",
  "Olivia Davis",
  "Ethan Martinez",
  "Isabella Anderson",
  "Alexander Taylor",
  "Mia Thomas",
];

export function generateWeeklyAppointments(
  weekDates: Date[],
): ScheduleAppointment[] {
  const appointments: ScheduleAppointment[] = [];
  const types: AppointmentType[] = [
    "checkup",
    "follow-up",
    "consultation",
    "procedure",
  ];
  const statuses = [
    "scheduled",
    "confirmed",
    "in-progress",
    "completed",
    "cancelled",
  ];

  weekDates.forEach((date) => {
    const day = getDayOfWeek(date);
    const dateStr = format(date, "yyyy-MM-dd");
    const wh = defaultWorkingHours.find((w) => w.day === day);
    if (!wh || !wh.isWorkingDay) return;

    const times = generateTimeSlots(
      wh.startTime,
      wh.endTime,
      wh.slotDuration,
      wh.breakStart,
      wh.breakEnd,
    );
    const today = format(new Date(), "yyyy-MM-dd");

    // 2-4 appointments per day
    const count = 2 + Math.floor(Math.random() * 3);

    for (let i = 0; i < count && i < times.length; i++) {
      const idx = Math.floor(Math.random() * times.length);
      const time = times[idx];
      const startMins = parseTimeToMinutes(time);
      const endMins = startMins + wh.slotDuration + wh.bufferMinutes;
      const patientIdx = Math.floor(Math.random() * patientNames.length);
      const initial0 = patientNames[patientIdx].charAt(0);
      const spaceIdx = patientNames[patientIdx].indexOf(" ");
      const initial1 = patientNames[patientIdx].charAt(spaceIdx + 1);

      appointments.push({
        id: `sched-apt-${dateStr}-${i}`,
        patientName: patientNames[patientIdx],
        patientInitials: `${initial0}${initial1}`,
        patientId: `PT-${String(1000 + Math.floor(Math.random() * 9000))}`,
        day,
        date: dateStr,
        startTime: time,
        endTime: minutesToTime12h(endMins),
        duration: wh.slotDuration,
        type: types[Math.floor(Math.random() * types.length)],
        status:
          dateStr < today
            ? "completed"
            : dateStr === today
              ? statuses[Math.floor(Math.random() * 3)]
              : "scheduled",
        isConflict: Math.random() < 0.1,
      });
    }
  });

  return appointments;
}

// ─── Vacations ───────────────────────────────────────────────────────────────

export const vacationEntries: VacationEntry[] = [
  {
    id: "vac-01",
    startDate: "2026-08-10",
    endDate: "2026-08-17",
    type: "vacation",
    reason: "Annual Family Vacation",
    isRecurring: false,
    status: "approved",
  },
  {
    id: "vac-02",
    startDate: "2026-07-27",
    endDate: "2026-07-27",
    type: "leave",
    reason: "Personal Day",
    isRecurring: false,
    status: "approved",
  },
  {
    id: "vac-03",
    startDate: "2026-09-07",
    endDate: "2026-09-07",
    type: "holiday",
    reason: "Labor Day (Observed)",
    isRecurring: true,
    status: "approved",
  },
  {
    id: "vac-04",
    startDate: "2026-12-25",
    endDate: "2026-12-25",
    type: "holiday",
    reason: "Christmas Day",
    isRecurring: true,
    status: "approved",
  },
  {
    id: "vac-05",
    startDate: "2026-11-26",
    endDate: "2026-11-26",
    type: "holiday",
    reason: "Thanksgiving Day",
    isRecurring: true,
    status: "approved",
  },
  {
    id: "vac-06",
    startDate: "2026-07-20",
    endDate: "2026-07-21",
    type: "leave",
    reason: "Medical Appointment",
    isRecurring: false,
    status: "pending",
  },
];

// ─── Default Filters ─────────────────────────────────────────────────────────

export const defaultScheduleFilters: FilterState = {
  search: "",
  view: "week",
  weekOffset: 0,
  selectedDate: format(new Date(), "yyyy-MM-dd"),
};

// ─── Current Week Context ────────────────────────────────────────────────────

export function buildCurrentWeekData() {
  const weekDates = getCurrentWeekDates();
  const timeSlots = generateWeeklyTimeSlots(weekDates);
  const appointments = generateWeeklyAppointments(weekDates);

  // Mark booked slots
  const bookedSlots = new Map<string, number>();
  appointments.forEach((apt) => {
    const key = `${apt.date}|${apt.startTime}`;
    bookedSlots.set(key, (bookedSlots.get(key) || 0) + 1);
  });

  timeSlots.forEach((slot) => {
    const key = `${slot.date}|${slot.startTime}`;
    const booked = bookedSlots.get(key) || 0;
    slot.bookedCount = booked;
    slot.isAvailable = booked < slot.maxPatients;
  });

  return { weekDates, timeSlots, appointments };
}

export function computeTodaySummary(): TodaySummary {
  const today = format(new Date(), "yyyy-MM-dd");
  const day = getDayOfWeek(new Date());
  const wh = defaultWorkingHours.find((w) => w.day === day);
  const { appointments } = buildCurrentWeekData();
  const todayAppts = appointments.filter((a) => a.date === today);
  const completed = todayAppts.filter((a) => a.status === "completed").length;
  const nextAppt = todayAppts.find(
    (a) => a.status === "scheduled" || a.status === "confirmed",
  );
  const timeSlots = generateWeeklyTimeSlots(getCurrentWeekDates());
  const todaySlots = timeSlots.filter((s) => s.date === today && s.isAvailable);

  return {
    date: today,
    totalAppointments: todayAppts.length,
    completedAppointments: completed,
    remainingAppointments: todayAppts.length - completed,
    nextAppointment: nextAppt || null,
    currentStatus: "available",
    workingHours: wh
      ? { start: wh.startTime, end: wh.endTime }
      : { start: "09:00", end: "17:00" },
    upcomingBreak: wh?.breakStart
      ? { start: wh.breakStart, end: wh.breakEnd }
      : null,
    availableSlots: todaySlots.length,
  };
}

export const blockedTimeTypeOptions: {
  value: BlockedTimeType;
  label: string;
  color: string;
}[] = [
  {
    value: "lunch",
    label: "Lunch Break",
    color: "from-amber-400 to-amber-500",
  },
  { value: "meeting", label: "Meeting", color: "from-blue-400 to-blue-500" },
  { value: "emergency", label: "Emergency", color: "from-red-400 to-red-500" },
  {
    value: "personal",
    label: "Personal Time",
    color: "from-green-400 to-green-500",
  },
  {
    value: "training",
    label: "Training",
    color: "from-purple-400 to-purple-500",
  },
  { value: "custom", label: "Custom", color: "from-slate-400 to-slate-500" },
];

export const availabilityStatusOptions: {
  value: AvailabilityStatusType;
  label: string;
  color: string;
  dotColor: string;
}[] = [
  {
    value: "available",
    label: "Available",
    color: "text-emerald-600 dark:text-emerald-400",
    dotColor: "bg-emerald-500",
  },
  {
    value: "busy",
    label: "Busy",
    color: "text-amber-600 dark:text-amber-400",
    dotColor: "bg-amber-500",
  },
  {
    value: "on-leave",
    label: "On Leave",
    color: "text-blue-600 dark:text-blue-400",
    dotColor: "bg-blue-500",
  },
  {
    value: "emergency-only",
    label: "Emergency Only",
    color: "text-red-600 dark:text-red-400",
    dotColor: "bg-red-500",
  },
  {
    value: "offline",
    label: "Offline",
    color: "text-slate-600 dark:text-slate-400",
    dotColor: "bg-slate-400",
  },
];
