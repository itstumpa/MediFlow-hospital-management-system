/* ============================================
   Doctor Dashboard — Mock Data
   All data is static for UI demonstration.
   ============================================ */

export interface StatCardData {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend: number;
  trendLabel: string;
  icon: string;
  color: string;
  sparkline: number[];
}

export interface ScheduleItem {
  id: string;
  time: string;
  patient: string;
  patientId: string;
  age: number;
  reason: string;
  room: string;
  status: "upcoming" | "in-progress" | "completed" | "cancelled";
}

export interface UpcomingAppointment {
  id: string;
  patientName: string;
  initials: string;
  age: number;
  department: string;
  time: string;
  visitType: string;
  priority: "normal" | "urgent" | "emergency";
}

export interface PatientOverviewItem {
  id: string;
  name: string;
  initials: string;
  age: number;
  gender: string;
  lastVisit: string;
  condition: string;
}

export interface PendingTask {
  id: string;
  label: string;
  completed: boolean;
  category: "lab" | "prescription" | "notes" | "call";
}

export interface ActivityItem {
  id: string;
  action: string;
  patient: string;
  time: string;
  type: "prescription" | "appointment" | "check-in" | "record" | "lab";
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "info" | "warning" | "emergency" | "success";
}

export interface CalendarEvent {
  date: number;
  type: "appointment" | "available" | "busy" | "vacation";
  count?: number;
}

/* ============================================
   Statistics Cards
   ============================================ */

export const statisticsCards: StatCardData[] = [
  {
    id: "stat-1",
    label: "Today's Appointments",
    value: 12,
    trend: 8.3,
    trendLabel: "vs yesterday",
    icon: "CalendarCheck",
    color: "cyan",
    sparkline: [4, 6, 5, 8, 7, 10, 12],
  },
  {
    id: "stat-2",
    label: "Waiting Patients",
    value: 4,
    trend: -12.5,
    trendLabel: "vs yesterday",
    icon: "Users",
    color: "amber",
    sparkline: [8, 7, 6, 5, 7, 5, 4],
  },
  {
    id: "stat-3",
    label: "Completed Consultations",
    value: 8,
    trend: 14.2,
    trendLabel: "this week",
    icon: "ClipboardCheck",
    color: "emerald",
    sparkline: [3, 5, 4, 6, 7, 6, 8],
  },
  {
    id: "stat-4",
    label: "Pending Prescriptions",
    value: 6,
    trend: -5.0,
    trendLabel: "vs yesterday",
    icon: "Pill",
    color: "rose",
    sparkline: [5, 7, 6, 8, 7, 6, 6],
  },
  {
    id: "stat-5",
    label: "Available Hours",
    value: 3.5,
    trend: 0,
    trendLabel: "today",
    icon: "Clock",
    color: "violet",
    sparkline: [2, 4, 3, 5, 4, 3, 3.5],
  },
  {
    id: "stat-6",
    label: "Total Patients",
    value: 1284,
    trend: 5.6,
    trendLabel: "this month",
    icon: "HeartPulse",
    color: "blue",
    sparkline: [1100, 1150, 1180, 1200, 1230, 1250, 1284],
  },
];

/* ============================================
   Today's Schedule
   ============================================ */

export const todaySchedule: ScheduleItem[] = [
  {
    id: "sched-1",
    time: "09:00 AM",
    patient: "Emily Johnson",
    patientId: "P-1024",
    age: 34,
    reason: "Annual checkup",
    room: "Room 201",
    status: "completed",
  },
  {
    id: "sched-2",
    time: "09:30 AM",
    patient: "Michael Chen",
    patientId: "P-1025",
    age: 45,
    reason: "Cardiology follow-up",
    room: "Room 203",
    status: "completed",
  },
  {
    id: "sched-3",
    time: "10:15 AM",
    patient: "Sarah Williams",
    patientId: "P-1026",
    age: 28,
    reason: "Migraine consultation",
    room: "Room 201",
    status: "in-progress",
  },
  {
    id: "sched-4",
    time: "11:00 AM",
    patient: "James Rodriguez",
    patientId: "P-1027",
    age: 52,
    reason: "Blood pressure review",
    room: "Room 205",
    status: "upcoming",
  },
  {
    id: "sched-5",
    time: "11:30 AM",
    patient: "Lisa Thompson",
    patientId: "P-1028",
    age: 39,
    reason: "Pre-surgery assessment",
    room: "Room 202",
    status: "upcoming",
  },
  {
    id: "sched-6",
    time: "01:00 PM",
    patient: "David Kim",
    patientId: "P-1029",
    age: 61,
    reason: "Diabetes management",
    room: "Room 204",
    status: "upcoming",
  },
  {
    id: "sched-7",
    time: "02:00 PM",
    patient: "Anna Martinez",
    patientId: "P-1030",
    age: 47,
    reason: "Lung function test",
    room: "Room 203",
    status: "upcoming",
  },
  {
    id: "sched-8",
    time: "02:30 PM",
    patient: "Robert Wilson",
    patientId: "P-1031",
    age: 55,
    reason: "ECG review",
    room: "Room 201",
    status: "cancelled",
  },
];

/* ============================================
   Upcoming Appointments
   ============================================ */

export const upcomingAppointments: UpcomingAppointment[] = [
  {
    id: "ua-1",
    patientName: "James Rodriguez",
    initials: "JR",
    age: 52,
    department: "Cardiology",
    time: "11:00 AM",
    visitType: "Follow-up",
    priority: "urgent",
  },
  {
    id: "ua-2",
    patientName: "Lisa Thompson",
    initials: "LT",
    age: 39,
    department: "Surgery",
    time: "11:30 AM",
    visitType: "Pre-op Assessment",
    priority: "normal",
  },
  {
    id: "ua-3",
    patientName: "David Kim",
    initials: "DK",
    age: 61,
    department: "Endocrinology",
    time: "01:00 PM",
    visitType: "Routine Check",
    priority: "normal",
  },
  {
    id: "ua-4",
    patientName: "Anna Martinez",
    initials: "AM",
    age: 47,
    department: "Pulmonology",
    time: "02:00 PM",
    visitType: "Diagnostic",
    priority: "urgent",
  },
  {
    id: "ua-5",
    patientName: "Olivia Brown",
    initials: "OB",
    age: 32,
    department: "Cardiology",
    time: "03:00 PM",
    visitType: "New Patient",
    priority: "normal",
  },
];

/* ============================================
   Patient Overview (Recent Patients)
   ============================================ */

export const recentPatients: PatientOverviewItem[] = [
  {
    id: "rp-1",
    name: "Emily Johnson",
    initials: "EJ",
    age: 34,
    gender: "Female",
    lastVisit: "Today, 09:00 AM",
    condition: "Annual Checkup",
  },
  {
    id: "rp-2",
    name: "Michael Chen",
    initials: "MC",
    age: 45,
    gender: "Male",
    lastVisit: "Today, 09:30 AM",
    condition: "Hypertension",
  },
  {
    id: "rp-3",
    name: "Sarah Williams",
    initials: "SW",
    age: 28,
    gender: "Female",
    lastVisit: "Today, 10:15 AM",
    condition: "Chronic Migraine",
  },
  {
    id: "rp-4",
    name: "James Rodriguez",
    initials: "JR",
    age: 52,
    gender: "Male",
    lastVisit: "Yesterday",
    condition: "Arrhythmia",
  },
  {
    id: "rp-5",
    name: "Lisa Thompson",
    initials: "LT",
    age: 39,
    gender: "Female",
    lastVisit: "Yesterday",
    condition: "Pre-surgery",
  },
];

/* ============================================
   Pending Tasks
   ============================================ */

export const pendingTasks: PendingTask[] = [
  {
    id: "task-1",
    label: "Review Lab Report — Emily Johnson",
    completed: false,
    category: "lab",
  },
  {
    id: "task-2",
    label: "Approve Prescription — Michael Chen",
    completed: false,
    category: "prescription",
  },
  {
    id: "task-3",
    label: "Complete Consultation Notes — Sarah Williams",
    completed: false,
    category: "notes",
  },
  {
    id: "task-4",
    label: "Call Patient — David Kim",
    completed: true,
    category: "call",
  },
  {
    id: "task-5",
    label: "Review ECG Results — Robert Wilson",
    completed: false,
    category: "lab",
  },
  {
    id: "task-6",
    label: "Sign Off — Lisa Thompson Pre-op",
    completed: true,
    category: "notes",
  },
];

/* ============================================
   Recent Activities
   ============================================ */

export const recentActivities: ActivityItem[] = [
  {
    id: "act-1",
    action: "Prescription Created",
    patient: "Emily Johnson",
    time: "5 min ago",
    type: "prescription",
  },
  {
    id: "act-2",
    action: "Appointment Completed",
    patient: "Michael Chen",
    time: "15 min ago",
    type: "appointment",
  },
  {
    id: "act-3",
    action: "Patient Checked In",
    patient: "Sarah Williams",
    time: "25 min ago",
    type: "check-in",
  },
  {
    id: "act-4",
    action: "Medical Record Updated",
    patient: "James Rodriguez",
    time: "1 hour ago",
    type: "record",
  },
  {
    id: "act-5",
    action: "Lab Results Received",
    patient: "Lisa Thompson",
    time: "2 hours ago",
    type: "lab",
  },
  {
    id: "act-6",
    action: "Appointment Rescheduled",
    patient: "Robert Wilson",
    time: "3 hours ago",
    type: "appointment",
  },
];

/* ============================================
   Notifications
   ============================================ */

export const dashboardNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Appointment Reminder",
    description: "David Kim's appointment is in 1 hour",
    time: "10 min ago",
    read: false,
    type: "info",
  },
  {
    id: "notif-2",
    title: "Lab Report Available",
    description: "Emily Johnson's blood work results are ready",
    time: "30 min ago",
    read: false,
    type: "success",
  },
  {
    id: "notif-3",
    title: "Emergency Case",
    description: "New emergency patient assigned to you",
    time: "45 min ago",
    read: false,
    type: "emergency",
  },
  {
    id: "notif-4",
    title: "Prescription Refill Request",
    description: "Michael Chen requested Amoxicillin refill",
    time: "2 hours ago",
    read: true,
    type: "info",
  },
];

/* ============================================
   Calendar Preview (Current Month)
   ============================================ */

export const calendarPreview: CalendarEvent[] = [
  { date: 2, type: "appointment", count: 4 },
  { date: 3, type: "vacation" },
  { date: 5, type: "appointment", count: 6 },
  { date: 7, type: "available" },
  { date: 8, type: "appointment", count: 5 },
  { date: 9, type: "busy" },
  { date: 10, type: "appointment", count: 8 },
  { date: 12, type: "available" },
  { date: 14, type: "appointment", count: 7 },
  { date: 15, type: "busy" },
  { date: 16, type: "appointment", count: 4 },
  { date: 17, type: "available" },
  { date: 19, type: "vacation" },
  { date: 21, type: "appointment", count: 6 },
  { date: 22, type: "available" },
  { date: 23, type: "busy" },
  { date: 24, type: "appointment", count: 5 },
  { date: 28, type: "appointment", count: 3 },
  { date: 29, type: "available" },
  { date: 30, type: "busy" },
];

/* ============================================
   Performance Charts Data
   ============================================ */

export const appointmentsWeekData = [
  { day: "Mon", appointments: 8, completed: 6 },
  { day: "Tue", appointments: 10, completed: 8 },
  { day: "Wed", appointments: 7, completed: 5 },
  { day: "Thu", appointments: 12, completed: 10 },
  { day: "Fri", appointments: 9, completed: 7 },
  { day: "Sat", appointments: 4, completed: 3 },
  { day: "Sun", appointments: 2, completed: 2 },
];

export const patientsByDepartmentData = [
  { department: "Cardiology", patients: 45 },
  { department: "Neurology", patients: 28 },
  { department: "Pediatrics", patients: 35 },
  { department: "Orthopedics", patients: 22 },
  { department: "Dermatology", patients: 18 },
  { department: "ENT", patients: 15 },
];

export const consultationStatusData = [
  { name: "Completed", value: 145, color: "#10b981" },
  { name: "In Progress", value: 38, color: "#0ea5e9" },
  { name: "Cancelled", value: 12, color: "#f43f5e" },
  { name: "No Show", value: 8, color: "#f59e0b" },
];

export const weeklyHoursData = [
  { day: "Mon", hours: 7.5 },
  { day: "Tue", hours: 8.0 },
  { day: "Wed", hours: 6.5 },
  { day: "Thu", hours: 8.5 },
  { day: "Fri", hours: 7.0 },
  { day: "Sat", hours: 3.0 },
  { day: "Sun", hours: 0 },
];

/* ============================================
   Quick Action Cards
   ============================================ */

export interface QuickActionCardData {
  id: string;
  label: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

export const quickActionCards: QuickActionCardData[] = [
  {
    id: "qa-1",
    label: "New Prescription",
    description: "Create and manage patient prescriptions",
    icon: "FileText",
    href: "/doctor/prescriptions",
    color: "cyan",
  },
  {
    id: "qa-2",
    label: "Today's Appointments",
    description: "View and manage your daily schedule",
    icon: "CalendarCheck",
    href: "/doctor/appointments",
    color: "violet",
  },
  {
    id: "qa-3",
    label: "Patient List",
    description: "Access complete patient records and history",
    icon: "Users",
    href: "/doctor/patients",
    color: "emerald",
  },
  {
    id: "qa-4",
    label: "Medical Records",
    description: "Review and update patient medical records",
    icon: "FolderOpen",
    href: "/doctor/patients",
    color: "blue",
  },
  {
    id: "qa-5",
    label: "Schedule",
    description: "Manage your availability and time off",
    icon: "Clock",
    href: "/doctor/schedule",
    color: "rose",
  },
];
