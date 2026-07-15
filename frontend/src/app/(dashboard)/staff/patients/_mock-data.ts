import {
  ArrowLeftRight,
  Hourglass,
  type LucideIcon,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";

/* ══════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════ */

export type PatientStatus =
  | "registered"
  | "checked-in"
  | "waiting"
  | "in-consultation"
  | "completed"
  | "cancelled"
  | "emergency";

export type Gender = "male" | "female" | "other";

export type BloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export type VisitType =
  | "general-checkup"
  | "follow-up"
  | "consultation"
  | "emergency"
  | "routine-exam"
  | "procedure"
  | "telehealth";

export interface UpcomingAppointment {
  date: string;
  time: string;
  doctor: string;
  reason: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface Patient {
  id: string;
  name: string;
  initials: string;
  age: number;
  gender: Gender;
  bloodGroup: BloodGroup;
  phone: string;
  email: string;
  address: string;
  nationalId: string;
  assignedDoctor: string;
  assignedDoctorId: string;
  department: string;
  status: PatientStatus;
  lastVisit: string;
  lastVisitReason: string;
  upcomingAppointment: UpcomingAppointment | null;
  allergies: string[];
  chronicDiseases: string[];
  insuranceProvider: string;
  insuranceNumber: string;
  emergencyContact: EmergencyContact;
  outstandingBalance: number;
  isVIP: boolean;
  createdAt: string;
  notes?: string;
}

export interface PatientStat {
  id: string;
  label: string;
  value: number;
  change: number;
  changeLabel: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  color: string;
}

/* ══════════════════════════════════════════════
   Config maps
   ══════════════════════════════════════════════ */

export const statusConfig: Record<
  PatientStatus,
  { label: string; class: string; dot: string }
> = {
  registered: {
    label: "Registered",
    class: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    dot: "bg-slate-500",
  },
  "checked-in": {
    label: "Checked In",
    class: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  waiting: {
    label: "Waiting",
    class:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  "in-consultation": {
    label: "In Consultation",
    class:
      "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400",
    dot: "bg-violet-500",
  },
  completed: {
    label: "Completed",
    class:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  cancelled: {
    label: "Cancelled",
    class: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    dot: "bg-red-500",
  },
  emergency: {
    label: "Emergency",
    class: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
    dot: "bg-rose-500",
  },
};

export const genderOptions = [
  { value: "all", label: "All Genders" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export const statusOptions: { value: PatientStatus | "all"; label: string }[] =
  [
    { value: "all", label: "All Statuses" },
    { value: "registered", label: "Registered" },
    { value: "checked-in", label: "Checked In" },
    { value: "waiting", label: "Waiting" },
    { value: "in-consultation", label: "In Consultation" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "emergency", label: "Emergency" },
  ];

export const bloodGroupOptions = [
  { value: "all", label: "All Blood Groups" },
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];

export const visitTypeOptions = [
  { value: "all", label: "All Visit Types" },
  { value: "general-checkup", label: "General Checkup" },
  { value: "follow-up", label: "Follow-up" },
  { value: "consultation", label: "Consultation" },
  { value: "emergency", label: "Emergency" },
  { value: "routine-exam", label: "Routine Exam" },
  { value: "procedure", label: "Procedure" },
  { value: "telehealth", label: "Telehealth" },
];

export const doctorOptions = [
  { value: "all", label: "All Doctors" },
  { value: "Dr. Sarah Chen", label: "Dr. Sarah Chen" },
  { value: "Dr. James Wilson", label: "Dr. James Wilson" },
  { value: "Dr. Emily Martinez", label: "Dr. Emily Martinez" },
  { value: "Dr. Robert Kim", label: "Dr. Robert Kim" },
  { value: "Dr. David Park", label: "Dr. David Park" },
  { value: "Dr. Lisa Anderson", label: "Dr. Lisa Anderson" },
  { value: "Dr. Michael Torres", label: "Dr. Michael Torres" },
];

export const sortOptions = [
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "age-asc", label: "Age ↑" },
  { value: "age-desc", label: "Age ↓" },
  { value: "last-visit", label: "Last Visit" },
  { value: "newest", label: "Newest First" },
];

/* ══════════════════════════════════════════════
   Statistics Data
   ══════════════════════════════════════════════ */

export const patientStats: PatientStat[] = [
  {
    id: "total",
    label: "Total Patients",
    value: 2847,
    change: 12.5,
    changeLabel: "vs last month",
    trend: "up",
    icon: Users,
    color: "emerald",
  },
  {
    id: "today-registrations",
    label: "Today's Registrations",
    value: 18,
    change: 28.6,
    changeLabel: "vs yesterday",
    trend: "up",
    icon: UserPlus,
    color: "blue",
  },
  {
    id: "checked-in",
    label: "Checked-in",
    value: 24,
    change: 14.3,
    changeLabel: "vs yesterday",
    trend: "up",
    icon: UserCheck,
    color: "violet",
  },
  {
    id: "waiting",
    label: "Waiting",
    value: 12,
    change: -8.3,
    changeLabel: "vs yesterday",
    trend: "down",
    icon: Hourglass,
    color: "amber",
  },
  {
    id: "new-patients",
    label: "New Patients",
    value: 142,
    change: 22.1,
    changeLabel: "vs last month",
    trend: "up",
    icon: UserPlus,
    color: "cyan",
  },
  {
    id: "returning",
    label: "Returning Patients",
    value: 268,
    change: 5.4,
    changeLabel: "vs last month",
    trend: "up",
    icon: ArrowLeftRight,
    color: "rose",
  },
];

/* ══════════════════════════════════════════════
   Patients Data
   ══════════════════════════════════════════════ */

export const patients: Patient[] = [
  {
    id: "P-1001",
    name: "Emily Johnson",
    initials: "EJ",
    age: 32,
    gender: "female",
    bloodGroup: "A+",
    phone: "+1 (555) 123-4567",
    email: "emily.johnson@email.com",
    address: "123 Oak Street, Springfield, IL 62701",
    nationalId: "XXX-XX-1234",
    assignedDoctor: "Dr. Sarah Chen",
    assignedDoctorId: "D-001",
    department: "General Medicine",
    status: "checked-in",
    lastVisit: "2026-06-28",
    lastVisitReason: "Annual physical examination",
    upcomingAppointment: {
      date: "2026-07-28",
      time: "10:30 AM",
      doctor: "Dr. Sarah Chen",
      reason: "Follow-up blood work",
    },
    allergies: ["Penicillin", "Sulfa"],
    chronicDiseases: [],
    insuranceProvider: "Blue Cross Blue Shield",
    insuranceNumber: "BCBS-98765432",
    emergencyContact: {
      name: "John Johnson",
      phone: "+1 (555) 987-6543",
      relationship: "Spouse",
    },
    outstandingBalance: 150.0,
    isVIP: false,
    createdAt: "2026-01-15",
    notes: "Patient prefers morning appointments.",
  },
  {
    id: "P-1002",
    name: "Michael Brown",
    initials: "MB",
    age: 58,
    gender: "male",
    bloodGroup: "O-",
    phone: "+1 (555) 234-5678",
    email: "michael.brown@email.com",
    address: "456 Maple Avenue, Springfield, IL 62702",
    nationalId: "XXX-XX-5678",
    assignedDoctor: "Dr. James Wilson",
    assignedDoctorId: "D-002",
    department: "Cardiology",
    status: "waiting",
    lastVisit: "2026-07-08",
    lastVisitReason: "Chest pain evaluation",
    upcomingAppointment: {
      date: "2026-07-28",
      time: "02:00 PM",
      doctor: "Dr. James Wilson",
      reason: "ECG follow-up",
    },
    allergies: [],
    chronicDiseases: ["Hypertension", "High Cholesterol"],
    insuranceProvider: "Aetna",
    insuranceNumber: "AET-45678901",
    emergencyContact: {
      name: "Sarah Brown",
      phone: "+1 (555) 876-5432",
      relationship: "Spouse",
    },
    outstandingBalance: 320.75,
    isVIP: false,
    createdAt: "2025-09-22",
    notes: "Requires wheelchair assistance.",
  },
  {
    id: "P-1003",
    name: "Sophia Garcia",
    initials: "SG",
    age: 7,
    gender: "female",
    bloodGroup: "B+",
    phone: "+1 (555) 345-6789",
    email: "sophia.garcia@email.com",
    address: "789 Pine Road, Springfield, IL 62703",
    nationalId: "XXX-XX-9012",
    assignedDoctor: "Dr. Emily Martinez",
    assignedDoctorId: "D-003",
    department: "Pediatrics",
    status: "completed",
    lastVisit: "2026-07-14",
    lastVisitReason: "Child wellness check",
    upcomingAppointment: {
      date: "2026-08-14",
      time: "09:00 AM",
      doctor: "Dr. Emily Martinez",
      reason: "Vaccination follow-up",
    },
    allergies: ["Peanuts"],
    chronicDiseases: ["Asthma"],
    insuranceProvider: "Cigna",
    insuranceNumber: "CGN-34567890",
    emergencyContact: {
      name: "Maria Garcia",
      phone: "+1 (555) 765-4321",
      relationship: "Mother",
    },
    outstandingBalance: 0,
    isVIP: false,
    createdAt: "2026-03-10",
  },
  {
    id: "P-1004",
    name: "William Davis",
    initials: "WD",
    age: 45,
    gender: "male",
    bloodGroup: "AB+",
    phone: "+1 (555) 456-7890",
    email: "william.davis@email.com",
    address: "321 Elm Street, Springfield, IL 62704",
    nationalId: "XXX-XX-3456",
    assignedDoctor: "Dr. Robert Kim",
    assignedDoctorId: "D-004",
    department: "Orthopedics",
    status: "registered",
    lastVisit: "2026-07-01",
    lastVisitReason: "Knee injury follow-up",
    upcomingAppointment: {
      date: "2026-07-25",
      time: "11:00 AM",
      doctor: "Dr. Robert Kim",
      reason: "Physical therapy assessment",
    },
    allergies: ["Codeine"],
    chronicDiseases: ["Type 2 Diabetes"],
    insuranceProvider: "United Health",
    insuranceNumber: "UH-56789012",
    emergencyContact: {
      name: "Lisa Davis",
      phone: "+1 (555) 654-3210",
      relationship: "Spouse",
    },
    outstandingBalance: 200.0,
    isVIP: true,
    createdAt: "2025-11-05",
    notes: "VIP patient — former board member.",
  },
  {
    id: "P-1005",
    name: "Olivia Martinez",
    initials: "OM",
    age: 29,
    gender: "female",
    bloodGroup: "O+",
    phone: "+1 (555) 567-8901",
    email: "olivia.martinez@email.com",
    address: "654 Cedar Lane, Springfield, IL 62705",
    nationalId: "XXX-XX-7890",
    assignedDoctor: "Dr. Sarah Chen",
    assignedDoctorId: "D-001",
    department: "General Medicine",
    status: "registered",
    lastVisit: "2026-07-12",
    lastVisitReason: "Blood test results review",
    upcomingAppointment: null,
    allergies: [],
    chronicDiseases: [],
    insuranceProvider: "Kaiser Permanente",
    insuranceNumber: "KP-23456789",
    emergencyContact: {
      name: "Carlos Martinez",
      phone: "+1 (555) 543-2109",
      relationship: "Brother",
    },
    outstandingBalance: 75.5,
    isVIP: false,
    createdAt: "2026-06-01",
  },
  {
    id: "P-1006",
    name: "James Taylor",
    initials: "JT",
    age: 62,
    gender: "male",
    bloodGroup: "A-",
    phone: "+1 (555) 678-9012",
    email: "james.taylor@email.com",
    address: "987 Birch Court, Springfield, IL 62706",
    nationalId: "XXX-XX-1235",
    assignedDoctor: "Dr. David Park",
    assignedDoctorId: "D-005",
    department: "Neurology",
    status: "in-consultation",
    lastVisit: "2026-07-14",
    lastVisitReason: "Migraine assessment",
    upcomingAppointment: {
      date: "2026-08-01",
      time: "11:30 AM",
      doctor: "Dr. David Park",
      reason: "MRI results review",
    },
    allergies: ["Latex"],
    chronicDiseases: ["Migraine", "Arthritis"],
    insuranceProvider: "Medicare",
    insuranceNumber: "MCR-89012345",
    emergencyContact: {
      name: "Patricia Taylor",
      phone: "+1 (555) 432-1098",
      relationship: "Spouse",
    },
    outstandingBalance: 0,
    isVIP: false,
    createdAt: "2025-07-15",
    notes: "Patient has photosensitivity — keep lights dim.",
  },
  {
    id: "P-1007",
    name: "Emma Wilson",
    initials: "EW",
    age: 24,
    gender: "female",
    bloodGroup: "B-",
    phone: "+1 (555) 789-0123",
    email: "emma.wilson@email.com",
    address: "147 Walnut Drive, Springfield, IL 62707",
    nationalId: "XXX-XX-5679",
    assignedDoctor: "Dr. Emily Martinez",
    assignedDoctorId: "D-003",
    department: "Pediatrics",
    status: "emergency",
    lastVisit: "2026-07-13",
    lastVisitReason: "School physical",
    upcomingAppointment: null,
    allergies: ["Ibuprofen"],
    chronicDiseases: [],
    insuranceProvider: "Blue Cross Blue Shield",
    insuranceNumber: "BCBS-34567890",
    emergencyContact: {
      name: "Robert Wilson",
      phone: "+1 (555) 321-0987",
      relationship: "Father",
    },
    outstandingBalance: 50.0,
    isVIP: false,
    createdAt: "2026-04-20",
  },
  {
    id: "P-1008",
    name: "Daniel Kim",
    initials: "DK",
    age: 51,
    gender: "male",
    bloodGroup: "AB-",
    phone: "+1 (555) 890-1234",
    email: "daniel.kim@email.com",
    address: "258 Spruce Way, Springfield, IL 62708",
    nationalId: "XXX-XX-9013",
    assignedDoctor: "Dr. James Wilson",
    assignedDoctorId: "D-002",
    department: "Cardiology",
    status: "waiting",
    lastVisit: "2026-07-13",
    lastVisitReason: "ECG procedure",
    upcomingAppointment: {
      date: "2026-07-28",
      time: "02:30 PM",
      doctor: "Dr. James Wilson",
      reason: "Stress test",
    },
    allergies: [],
    chronicDiseases: ["Coronary Artery Disease", "Hypertension"],
    insuranceProvider: "Aetna",
    insuranceNumber: "AET-67890123",
    emergencyContact: {
      name: "Mia Kim",
      phone: "+1 (555) 210-9876",
      relationship: "Spouse",
    },
    outstandingBalance: 1100.0,
    isVIP: true,
    createdAt: "2025-04-10",
    notes: "VIP — CEO of local manufacturing company.",
  },
  {
    id: "P-1009",
    name: "Jennifer White",
    initials: "JW",
    age: 37,
    gender: "female",
    bloodGroup: "A+",
    phone: "+1 (555) 901-2345",
    email: "jennifer.white@email.com",
    address: "369 Oak Avenue, Springfield, IL 62709",
    nationalId: "XXX-XX-3457",
    assignedDoctor: "Dr. Lisa Anderson",
    assignedDoctorId: "D-006",
    department: "Dermatology",
    status: "cancelled",
    lastVisit: "2026-07-07",
    lastVisitReason: "Skin rash evaluation",
    upcomingAppointment: null,
    allergies: ["Sulfa", "Latex"],
    chronicDiseases: ["Eczema"],
    insuranceProvider: "Cigna",
    insuranceNumber: "CGN-78901234",
    emergencyContact: {
      name: "David White",
      phone: "+1 (555) 109-8765",
      relationship: "Spouse",
    },
    outstandingBalance: 180.25,
    isVIP: false,
    createdAt: "2026-02-14",
  },
  {
    id: "P-1010",
    name: "Thomas Clark",
    initials: "TC",
    age: 19,
    gender: "male",
    bloodGroup: "O+",
    phone: "+1 (555) 012-3456",
    email: "thomas.clark@email.com",
    address: "741 Maple Street, Springfield, IL 62710",
    nationalId: "XXX-XX-7891",
    assignedDoctor: "Dr. Robert Kim",
    assignedDoctorId: "D-004",
    department: "Orthopedics",
    status: "completed",
    lastVisit: "2026-06-28",
    lastVisitReason: "Cast removal follow-up",
    upcomingAppointment: null,
    allergies: [],
    chronicDiseases: [],
    insuranceProvider: "United Health",
    insuranceNumber: "UH-89012345",
    emergencyContact: {
      name: "Susan Clark",
      phone: "+1 (555) 098-7654",
      relationship: "Mother",
    },
    outstandingBalance: 0,
    isVIP: false,
    createdAt: "2026-05-05",
  },
  {
    id: "P-1011",
    name: "Amanda Lee",
    initials: "AL",
    age: 41,
    gender: "female",
    bloodGroup: "A-",
    phone: "+1 (555) 112-2334",
    email: "amanda.lee@email.com",
    address: "852 Cherry Lane, Springfield, IL 62711",
    nationalId: "XXX-XX-4568",
    assignedDoctor: "Dr. Sarah Chen",
    assignedDoctorId: "D-001",
    department: "General Medicine",
    status: "registered",
    lastVisit: "2026-07-10",
    lastVisitReason: "General checkup",
    upcomingAppointment: {
      date: "2026-08-05",
      time: "09:30 AM",
      doctor: "Dr. Sarah Chen",
      reason: "Thyroid function follow-up",
    },
    allergies: ["Shellfish"],
    chronicDiseases: ["Hypothyroidism"],
    insuranceProvider: "Kaiser Permanente",
    insuranceNumber: "KP-45678901",
    emergencyContact: {
      name: "Steven Lee",
      phone: "+1 (555) 334-4556",
      relationship: "Spouse",
    },
    outstandingBalance: 0,
    isVIP: false,
    createdAt: "2025-12-01",
  },
  {
    id: "P-1012",
    name: "Christopher Moore",
    initials: "CM",
    age: 55,
    gender: "male",
    bloodGroup: "B+",
    phone: "+1 (555) 223-3445",
    email: "christopher.moore@email.com",
    address: "963 Ash Boulevard, Springfield, IL 62712",
    nationalId: "XXX-XX-6789",
    assignedDoctor: "Dr. Michael Torres",
    assignedDoctorId: "D-007",
    department: "Pulmonology",
    status: "in-consultation",
    lastVisit: "2026-07-14",
    lastVisitReason: "COPD management",
    upcomingAppointment: {
      date: "2026-07-29",
      time: "03:00 PM",
      doctor: "Dr. Michael Torres",
      reason: "Pulmonary function test",
    },
    allergies: ["Dust", "Pollen"],
    chronicDiseases: ["COPD", "Sleep Apnea"],
    insuranceProvider: "Medicare",
    insuranceNumber: "MCR-56789012",
    emergencyContact: {
      name: "Nancy Moore",
      phone: "+1 (555) 556-6778",
      relationship: "Spouse",
    },
    outstandingBalance: 450.0,
    isVIP: false,
    createdAt: "2025-06-20",
    notes: "Uses CPAP machine nightly. O2 saturation monitored.",
  },
  {
    id: "P-1013",
    name: "Isabella Robinson",
    initials: "IR",
    age: 16,
    gender: "female",
    bloodGroup: "O-",
    phone: "+1 (555) 334-4556",
    email: "isabella.robinson@email.com",
    address: "159 Willow Road, Springfield, IL 62713",
    nationalId: "XXX-XX-8901",
    assignedDoctor: "Dr. Emily Martinez",
    assignedDoctorId: "D-003",
    department: "Pediatrics",
    status: "registered",
    lastVisit: "2026-07-05",
    lastVisitReason: "Sports physical",
    upcomingAppointment: {
      date: "2026-08-10",
      time: "10:00 AM",
      doctor: "Dr. Emily Martinez",
      reason: "Vaccination",
    },
    allergies: [],
    chronicDiseases: [],
    insuranceProvider: "Blue Cross Blue Shield",
    insuranceNumber: "BCBS-12345678",
    emergencyContact: {
      name: "Karen Robinson",
      phone: "+1 (555) 667-7889",
      relationship: "Mother",
    },
    outstandingBalance: 0,
    isVIP: false,
    createdAt: "2026-07-05",
  },
  {
    id: "P-1014",
    name: "Ethan Harris",
    initials: "EH",
    age: 68,
    gender: "male",
    bloodGroup: "AB+",
    phone: "+1 (555) 445-5667",
    email: "ethan.harris@email.com",
    address: "753 Hickory Lane, Springfield, IL 62714",
    nationalId: "XXX-XX-2345",
    assignedDoctor: "Dr. David Park",
    assignedDoctorId: "D-005",
    department: "Neurology",
    status: "waiting",
    lastVisit: "2026-07-10",
    lastVisitReason: "Memory loss assessment",
    upcomingAppointment: {
      date: "2026-08-03",
      time: "01:30 PM",
      doctor: "Dr. David Park",
      reason: "Cognitive therapy session",
    },
    allergies: ["Morphine"],
    chronicDiseases: ["Dementia", "Hypertension"],
    insuranceProvider: "Medicare",
    insuranceNumber: "MCR-67890123",
    emergencyContact: {
      name: "Rachel Harris",
      phone: "+1 (555) 778-8990",
      relationship: "Daughter",
    },
    outstandingBalance: 210.0,
    isVIP: false,
    createdAt: "2025-08-12",
    notes: "Patient may need assistance remembering appointment details.",
  },
  {
    id: "P-1015",
    name: "Mia Thompson",
    initials: "MT",
    age: 35,
    gender: "female",
    bloodGroup: "B-",
    phone: "+1 (555) 556-6778",
    email: "mia.thompson@email.com",
    address: "444 Sycamore Drive, Springfield, IL 62715",
    nationalId: "XXX-XX-5670",
    assignedDoctor: "Dr. Lisa Anderson",
    assignedDoctorId: "D-006",
    department: "Dermatology",
    status: "checked-in",
    lastVisit: "2026-07-02",
    lastVisitReason: "Acne treatment follow-up",
    upcomingAppointment: {
      date: "2026-07-28",
      time: "04:00 PM",
      doctor: "Dr. Lisa Anderson",
      reason: "Laser treatment session",
    },
    allergies: [],
    chronicDiseases: [],
    insuranceProvider: "Aetna",
    insuranceNumber: "AET-12345678",
    emergencyContact: {
      name: "Olivia Thompson",
      phone: "+1 (555) 889-9001",
      relationship: "Sister",
    },
    outstandingBalance: 340.0,
    isVIP: false,
    createdAt: "2026-03-01",
    notes: "Cosmetic consultations — insurance may not cover.",
  },
  {
    id: "P-1016",
    name: "Alexander Wright",
    initials: "AW",
    age: 73,
    gender: "male",
    bloodGroup: "A+",
    phone: "+1 (555) 667-7889",
    email: "alexander.wright@email.com",
    address: "888 Chestnut Avenue, Springfield, IL 62716",
    nationalId: "XXX-XX-8902",
    assignedDoctor: "Dr. James Wilson",
    assignedDoctorId: "D-002",
    department: "Cardiology",
    status: "emergency",
    lastVisit: "2026-07-14",
    lastVisitReason: "Chest pain — ER admission",
    upcomingAppointment: null,
    allergies: ["Aspirin"],
    chronicDiseases: ["Atrial Fibrillation", "Heart Failure", "Diabetes"],
    insuranceProvider: "Medicare",
    insuranceNumber: "MCR-78901234",
    emergencyContact: {
      name: "Grace Wright",
      phone: "+1 (555) 990-0112",
      relationship: "Spouse",
    },
    outstandingBalance: 5200.0,
    isVIP: false,
    createdAt: "2024-11-30",
    notes: "Cardiac history — admit if chest pain persists.",
  },
  {
    id: "P-1017",
    name: "Charlotte Hall",
    initials: "CH",
    age: 11,
    gender: "female",
    bloodGroup: "O+",
    phone: "+1 (555) 778-8990",
    email: "charlotte.hall@email.com",
    address: "222 Poplar Court, Springfield, IL 62717",
    nationalId: "XXX-XX-1236",
    assignedDoctor: "Dr. Emily Martinez",
    assignedDoctorId: "D-003",
    department: "Pediatrics",
    status: "completed",
    lastVisit: "2026-07-14",
    lastVisitReason: "Ear infection check",
    upcomingAppointment: null,
    allergies: ["Amoxicillin"],
    chronicDiseases: ["Recurrent Otitis Media"],
    insuranceProvider: "Cigna",
    insuranceNumber: "CGN-90123456",
    emergencyContact: {
      name: "Daniel Hall",
      phone: "+1 (555) 001-1223",
      relationship: "Father",
    },
    outstandingBalance: 0,
    isVIP: false,
    createdAt: "2026-02-28",
  },
  {
    id: "P-1018",
    name: "Benjamin Young",
    initials: "BY",
    age: 47,
    gender: "male",
    bloodGroup: "O-",
    phone: "+1 (555) 889-9001",
    email: "benjamin.young@email.com",
    address: "555 Magnolia Street, Springfield, IL 62718",
    nationalId: "XXX-XX-4569",
    assignedDoctor: "Dr. Michael Torres",
    assignedDoctorId: "D-007",
    department: "Pulmonology",
    status: "registered",
    lastVisit: "2026-06-20",
    lastVisitReason: "Asthma management",
    upcomingAppointment: {
      date: "2026-08-12",
      time: "10:00 AM",
      doctor: "Dr. Michael Torres",
      reason: "Annual asthma review",
    },
    allergies: ["Cats", "Mold"],
    chronicDiseases: ["Asthma", "Seasonal Allergies"],
    insuranceProvider: "United Health",
    insuranceNumber: "UH-34567890",
    emergencyContact: {
      name: "Amber Young",
      phone: "+1 (555) 112-2334",
      relationship: "Spouse",
    },
    outstandingBalance: 60.0,
    isVIP: false,
    createdAt: "2025-10-15",
  },
  {
    id: "P-1019",
    name: "Abigail Scott",
    initials: "AS",
    age: 26,
    gender: "female",
    bloodGroup: "AB-",
    phone: "+1 (555) 990-0112",
    email: "abigail.scott@email.com",
    address: "777 Redwood Terrace, Springfield, IL 62719",
    nationalId: "XXX-XX-7892",
    assignedDoctor: "Dr. Sarah Chen",
    assignedDoctorId: "D-001",
    department: "General Medicine",
    status: "checked-in",
    lastVisit: "2026-07-01",
    lastVisitReason: "Pre-employment physical",
    upcomingAppointment: null,
    allergies: [],
    chronicDiseases: [],
    insuranceProvider: "Blue Cross Blue Shield",
    insuranceNumber: "BCBS-56789012",
    emergencyContact: {
      name: "Grace Scott",
      phone: "+1 (555) 223-3445",
      relationship: "Mother",
    },
    outstandingBalance: 0,
    isVIP: false,
    createdAt: "2026-07-01",
  },
  {
    id: "P-1020",
    name: "Henry Adams",
    initials: "HA",
    age: 81,
    gender: "male",
    bloodGroup: "A+",
    phone: "+1 (555) 001-1223",
    email: "henry.adams@email.com",
    address: "333 Juniper Way, Springfield, IL 62720",
    nationalId: "XXX-XX-3458",
    assignedDoctor: "Dr. James Wilson",
    assignedDoctorId: "D-002",
    department: "Cardiology",
    status: "cancelled",
    lastVisit: "2026-07-10",
    lastVisitReason: "Regular cardiology checkup",
    upcomingAppointment: {
      date: "2026-08-15",
      time: "09:00 AM",
      doctor: "Dr. James Wilson",
      reason: "Pacemaker check",
    },
    allergies: ["Contrast Dye"],
    chronicDiseases: ["Heart Failure", "Chronic Kidney Disease"],
    insuranceProvider: "Medicare",
    insuranceNumber: "MCR-89012345",
    emergencyContact: {
      name: "Laura Adams",
      phone: "+1 (555) 334-4556",
      relationship: "Daughter",
    },
    outstandingBalance: 0,
    isVIP: false,
    createdAt: "2024-08-20",
    notes: "Pacemaker patient — biannual checks required.",
  },
];
