import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Heart,
  User,
  UserCheck,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

/* ══════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════ */

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

export type PatientType = "walk-in" | "scheduled" | "emergency";

export type VisitType =
  | "general-checkup"
  | "follow-up"
  | "consultation"
  | "emergency"
  | "routine-exam"
  | "procedure"
  | "telehealth";

export type Priority = "low" | "normal" | "high" | "urgent";

export type RoomStatus = "available" | "occupied" | "cleaning";

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  dateOfBirth: string;
  bloodGroup: BloodGroup;
  phone: string;
  email: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  nationalId: string;
  allergies: string[];
  chronicDiseases: string[];
  currentMedications: string[];
  insuranceProvider: string;
  insuranceNumber: string;
  primaryPhysician: string;
  createdAt: string;
  lastVisit?: string;
  isVIP: boolean;
}

export interface QueueEntry {
  queueNumber: string;
  patientName: string;
  patientInitials: string;
  patientType: PatientType;
  doctorName: string;
  department: string;
  estimatedWait: string;
  status: "waiting" | "in-consultation" | "completed" | "cancelled";
  room?: string;
  isVIP: boolean;
  priority: Priority;
}

export interface DoctorSlot {
  doctorName: string;
  department: string;
  status: "available" | "busy" | "on-break" | "off-duty";
  availableSlots: number;
  color: string;
  initials: string;
  patientsSeen: number;
}

export interface RecentRegistration {
  id: string;
  patientName: string;
  patientInitials: string;
  time: string;
  type: PatientType;
}

export interface RegistrationFormData {
  // Step 1 — Search
  searchQuery: string;
  searchBy: "id" | "phone" | "email" | "nationalId";

  // Step 2 — Personal
  firstName: string;
  lastName: string;
  gender: Gender | "";
  dateOfBirth: string;
  bloodGroup: BloodGroup | "";
  phone: string;
  email: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;

  // Step 3 — Medical
  allergies: string;
  chronicDiseases: string;
  currentMedications: string;
  insuranceProvider: string;
  insuranceNumber: string;
  primaryPhysician: string;

  // Step 4 — Appointment
  doctor: string;
  department: string;
  visitType: VisitType | "";
  visitReason: string;
  priority: Priority;
  preferredTime: string;

  // Step 5 — Check-in
  queueNumber: string;
  estimatedWait: string;
  roomAssignment: string;
  receptionNotes: string;
}

export const defaultFormData: RegistrationFormData = {
  searchQuery: "",
  searchBy: "phone",

  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  bloodGroup: "",
  phone: "",
  email: "",
  address: "",
  emergencyContactName: "",
  emergencyContactPhone: "",

  allergies: "",
  chronicDiseases: "",
  currentMedications: "",
  insuranceProvider: "",
  insuranceNumber: "",
  primaryPhysician: "",

  doctor: "",
  department: "",
  visitType: "",
  visitReason: "",
  priority: "normal",
  preferredTime: "",

  queueNumber: "",
  estimatedWait: "",
  roomAssignment: "",
  receptionNotes: "",
};

/* ══════════════════════════════════════════════
   Mock Patients (for search)
   ══════════════════════════════════════════════ */

export const existingPatients: Patient[] = [
  {
    id: "P-1001",
    firstName: "Emily",
    lastName: "Johnson",
    gender: "female",
    dateOfBirth: "1990-05-14",
    bloodGroup: "A+",
    phone: "+1 (555) 111-2233",
    email: "emily.johnson@email.com",
    address: "123 Oak St, Springfield, IL 62701",
    emergencyContactName: "Mark Johnson",
    emergencyContactPhone: "+1 (555) 111-2244",
    nationalId: "XXX-XX-1234",
    allergies: ["Penicillin", "Pollen"],
    chronicDiseases: ["Asthma"],
    currentMedications: ["Albuterol inhaler"],
    insuranceProvider: "Blue Cross",
    insuranceNumber: "BC-98765432",
    primaryPhysician: "Dr. Sarah Chen",
    createdAt: "2025-11-10T09:00:00Z",
    lastVisit: "2026-06-28",
    isVIP: false,
  },
  {
    id: "P-1002",
    firstName: "Michael",
    lastName: "Brown",
    gender: "male",
    dateOfBirth: "1985-08-22",
    bloodGroup: "O+",
    phone: "+1 (555) 222-3344",
    email: "michael.brown@email.com",
    address: "456 Maple Ave, Springfield, IL 62702",
    emergencyContactName: "Sarah Brown",
    emergencyContactPhone: "+1 (555) 222-3355",
    nationalId: "XXX-XX-5678",
    allergies: ["Sulfa drugs"],
    chronicDiseases: ["Hypertension", "Type 2 Diabetes"],
    currentMedications: ["Lisinopril 10mg", "Metformin 500mg"],
    insuranceProvider: "Aetna",
    insuranceNumber: "AE-45678901",
    primaryPhysician: "Dr. James Wilson",
    createdAt: "2025-08-15T14:30:00Z",
    lastVisit: "2026-07-10",
    isVIP: false,
  },
  {
    id: "P-1003",
    firstName: "Sophia",
    lastName: "Garcia",
    gender: "female",
    dateOfBirth: "2018-03-10",
    bloodGroup: "B+",
    phone: "+1 (555) 333-4455",
    email: "sophia.garcia@email.com",
    address: "789 Pine Rd, Springfield, IL 62703",
    emergencyContactName: "Maria Garcia",
    emergencyContactPhone: "+1 (555) 333-4466",
    nationalId: "XXX-XX-9012",
    allergies: [],
    chronicDiseases: [],
    currentMedications: [],
    insuranceProvider: "Cigna",
    insuranceNumber: "CG-34567890",
    primaryPhysician: "Dr. Emily Martinez",
    createdAt: "2026-01-20T11:00:00Z",
    lastVisit: "2026-07-05",
    isVIP: false,
  },
  {
    id: "P-1004",
    firstName: "William",
    lastName: "Davis",
    gender: "male",
    dateOfBirth: "1972-11-30",
    bloodGroup: "A-",
    phone: "+1 (555) 444-5566",
    email: "william.davis@email.com",
    address: "321 Elm Blvd, Springfield, IL 62704",
    emergencyContactName: "Linda Davis",
    emergencyContactPhone: "+1 (555) 444-5577",
    nationalId: "XXX-XX-3456",
    allergies: ["Latex"],
    chronicDiseases: ["Coronary Artery Disease"],
    currentMedications: ["Aspirin 81mg", "Atorvastatin 20mg"],
    insuranceProvider: "United Health",
    insuranceNumber: "UH-23456789",
    primaryPhysician: "Dr. Robert Kim",
    createdAt: "2025-06-05T08:00:00Z",
    lastVisit: "2026-07-01",
    isVIP: true,
  },
  {
    id: "P-1005",
    firstName: "Olivia",
    lastName: "Martinez",
    gender: "female",
    dateOfBirth: "1995-07-18",
    bloodGroup: "AB+",
    phone: "+1 (555) 555-6677",
    email: "olivia.martinez@email.com",
    address: "654 Cedar Ln, Springfield, IL 62705",
    emergencyContactName: "Carlos Martinez",
    emergencyContactPhone: "+1 (555) 555-6688",
    nationalId: "XXX-XX-7890",
    allergies: ["Peanuts", "Shellfish"],
    chronicDiseases: [],
    currentMedications: [],
    insuranceProvider: "Humana",
    insuranceNumber: "HU-56789012",
    primaryPhysician: "Dr. Sarah Chen",
    createdAt: "2026-03-12T16:45:00Z",
    lastVisit: "2026-07-12",
    isVIP: false,
  },
  {
    id: "P-1006",
    firstName: "James",
    lastName: "Taylor",
    gender: "male",
    dateOfBirth: "1968-01-25",
    bloodGroup: "O-",
    phone: "+1 (555) 666-7788",
    email: "james.taylor@email.com",
    address: "987 Birch St, Springfield, IL 62706",
    emergencyContactName: "Patricia Taylor",
    emergencyContactPhone: "+1 (555) 666-7799",
    nationalId: "XXX-XX-1230",
    allergies: ["Codeine", "Ibuprofen"],
    chronicDiseases: ["Glaucoma", "Arthritis"],
    currentMedications: ["Latanoprost", "Acetaminophen PRN"],
    insuranceProvider: "Medicare",
    insuranceNumber: "MC-67890123",
    primaryPhysician: "Dr. David Park",
    createdAt: "2025-04-18T07:30:00Z",
    lastVisit: "2026-06-15",
    isVIP: false,
  },
  {
    id: "P-1007",
    firstName: "Emma",
    lastName: "Wilson",
    gender: "female",
    dateOfBirth: "2020-09-05",
    bloodGroup: "B-",
    phone: "+1 (555) 777-8899",
    email: "emma.wilson@email.com",
    address: "246 Walnut Ave, Springfield, IL 62707",
    emergencyContactName: "Laura Wilson",
    emergencyContactPhone: "+1 (555) 777-8800",
    nationalId: "XXX-XX-4560",
    allergies: ["Eggs"],
    chronicDiseases: [],
    currentMedications: [],
    insuranceProvider: "Blue Cross",
    insuranceNumber: "BC-78901234",
    primaryPhysician: "Dr. Emily Martinez",
    createdAt: "2026-04-01T10:00:00Z",
    lastVisit: "2026-07-11",
    isVIP: false,
  },
  {
    id: "P-1008",
    firstName: "Daniel",
    lastName: "Kim",
    gender: "male",
    dateOfBirth: "1988-12-12",
    bloodGroup: "AB-",
    phone: "+1 (555) 888-9900",
    email: "daniel.kim@email.com",
    address: "135 Spruce Dr, Springfield, IL 62708",
    emergencyContactName: "Susan Kim",
    emergencyContactPhone: "+1 (555) 888-9911",
    nationalId: "XXX-XX-7891",
    allergies: [],
    chronicDiseases: ["GERD"],
    currentMedications: ["Omeprazole 20mg"],
    insuranceProvider: "Aetna",
    insuranceNumber: "AE-89012345",
    primaryPhysician: "Dr. James Wilson",
    createdAt: "2025-09-22T13:15:00Z",
    lastVisit: "2026-07-13",
    isVIP: true,
  },
  {
    id: "P-1009",
    firstName: "Jennifer",
    lastName: "White",
    gender: "female",
    dateOfBirth: "1983-04-02",
    bloodGroup: "A+",
    phone: "+1 (555) 999-0011",
    email: "jennifer.white@email.com",
    address: "753 Ash Ct, Springfield, IL 62709",
    emergencyContactName: "Robert White",
    emergencyContactPhone: "+1 (555) 999-0022",
    nationalId: "XXX-XX-2345",
    allergies: ["Morphine"],
    chronicDiseases: ["Migraine"],
    currentMedications: ["Sumatriptan PRN"],
    insuranceProvider: "Cigna",
    insuranceNumber: "CG-90123456",
    primaryPhysician: "Dr. Lisa Anderson",
    createdAt: "2025-12-08T12:00:00Z",
    lastVisit: "2026-07-07",
    isVIP: false,
  },
  {
    id: "P-1010",
    firstName: "Thomas",
    lastName: "Clark",
    gender: "male",
    dateOfBirth: "1955-06-17",
    bloodGroup: "O+",
    phone: "+1 (555) 000-1122",
    email: "thomas.clark@email.com",
    address: "864 Willow Way, Springfield, IL 62710",
    emergencyContactName: "Nancy Clark",
    emergencyContactPhone: "+1 (555) 000-1133",
    nationalId: "XXX-XX-6780",
    allergies: ["Tetracycline"],
    chronicDiseases: ["COPD", "Osteoporosis"],
    currentMedications: ["Tiotropium", "Alendronate 70mg"],
    insuranceProvider: "Medicare",
    insuranceNumber: "MC-01234567",
    primaryPhysician: "Dr. Robert Kim",
    createdAt: "2025-02-14T09:45:00Z",
    lastVisit: "2026-05-20",
    isVIP: false,
  },
];

/* ══════════════════════════════════════════════
   Mock Queue
   ══════════════════════════════════════════════ */

export const queueEntries: QueueEntry[] = [
  {
    queueNumber: "Q-001",
    patientName: "Emily Johnson",
    patientInitials: "EJ",
    patientType: "scheduled",
    doctorName: "Dr. Sarah Chen",
    department: "General Medicine",
    estimatedWait: "5 min",
    status: "in-consultation",
    room: "Exam 3",
    isVIP: false,
    priority: "normal",
  },
  {
    queueNumber: "Q-002",
    patientName: "Michael Brown",
    patientInitials: "MB",
    patientType: "scheduled",
    doctorName: "Dr. James Wilson",
    department: "Cardiology",
    estimatedWait: "12 min",
    status: "waiting",
    room: "Exam 1",
    isVIP: false,
    priority: "high",
  },
  {
    queueNumber: "Q-003",
    patientName: "Sophia Garcia",
    patientInitials: "SG",
    patientType: "walk-in",
    doctorName: "Dr. Emily Martinez",
    department: "Pediatrics",
    estimatedWait: "20 min",
    status: "waiting",
    room: "Exam 5",
    isVIP: false,
    priority: "normal",
  },
  {
    queueNumber: "Q-004",
    patientName: "William Davis",
    patientInitials: "WD",
    patientType: "scheduled",
    doctorName: "Dr. Robert Kim",
    department: "Orthopedics",
    estimatedWait: "8 min",
    status: "waiting",
    room: "Exam 2",
    isVIP: true,
    priority: "urgent",
  },
  {
    queueNumber: "Q-005",
    patientName: "Olivia Martinez",
    patientInitials: "OM",
    patientType: "walk-in",
    doctorName: "Dr. Sarah Chen",
    department: "General Medicine",
    estimatedWait: "35 min",
    status: "waiting",
    room: "",
    isVIP: false,
    priority: "low",
  },
  {
    queueNumber: "Q-006",
    patientName: "James Taylor",
    patientInitials: "JT",
    patientType: "emergency",
    doctorName: "Dr. David Park",
    department: "Neurology",
    estimatedWait: "2 min",
    status: "in-consultation",
    room: "ER-2",
    isVIP: false,
    priority: "urgent",
  },
  {
    queueNumber: "Q-007",
    patientName: "Daniel Kim",
    patientInitials: "DK",
    patientType: "scheduled",
    doctorName: "Dr. James Wilson",
    department: "Cardiology",
    estimatedWait: "15 min",
    status: "waiting",
    room: "Exam 4",
    isVIP: true,
    priority: "urgent",
  },
];

/* ══════════════════════════════════════════════
   Mock Doctors (availability)
   ══════════════════════════════════════════════ */

export const doctorSlots: DoctorSlot[] = [
  {
    doctorName: "Dr. Sarah Chen",
    department: "General Medicine",
    status: "available",
    availableSlots: 4,
    color: "teal",
    initials: "SC",
    patientsSeen: 8,
  },
  {
    doctorName: "Dr. James Wilson",
    department: "Cardiology",
    status: "busy",
    availableSlots: 1,
    color: "blue",
    initials: "JW",
    patientsSeen: 12,
  },
  {
    doctorName: "Dr. Emily Martinez",
    department: "Pediatrics",
    status: "available",
    availableSlots: 3,
    color: "rose",
    initials: "EM",
    patientsSeen: 6,
  },
  {
    doctorName: "Dr. Robert Kim",
    department: "Orthopedics",
    status: "on-break",
    availableSlots: 2,
    color: "amber",
    initials: "RK",
    patientsSeen: 5,
  },
  {
    doctorName: "Dr. David Park",
    department: "Neurology",
    status: "available",
    availableSlots: 3,
    color: "violet",
    initials: "DP",
    patientsSeen: 9,
  },
  {
    doctorName: "Dr. Lisa Anderson",
    department: "Dermatology",
    status: "off-duty",
    availableSlots: 0,
    color: "emerald",
    initials: "LA",
    patientsSeen: 0,
  },
];

/* ══════════════════════════════════════════════
   Recent Registrations
   ══════════════════════════════════════════════ */

export const recentRegistrations: RecentRegistration[] = [
  {
    id: "REG-001",
    patientName: "Alice Cooper",
    patientInitials: "AC",
    time: "08:15 AM",
    type: "walk-in",
  },
  {
    id: "REG-002",
    patientName: "George Harris",
    patientInitials: "GH",
    time: "08:45 AM",
    type: "scheduled",
  },
  {
    id: "REG-003",
    patientName: "Nancy Drew",
    patientInitials: "ND",
    time: "09:00 AM",
    type: "walk-in",
  },
  {
    id: "REG-004",
    patientName: "Frank Castle",
    patientInitials: "FC",
    time: "09:12 AM",
    type: "emergency",
  },
  {
    id: "REG-005",
    patientName: "Rachel Green",
    patientInitials: "RG",
    time: "09:30 AM",
    type: "scheduled",
  },
];

/* ══════════════════════════════════════════════
   Rooms
   ══════════════════════════════════════════════ */

export const rooms = [
  { id: "Exam 1", status: "occupied" as RoomStatus, patient: "Michael Brown" },
  { id: "Exam 2", status: "occupied" as RoomStatus, patient: "William Davis" },
  { id: "Exam 3", status: "occupied" as RoomStatus, patient: "Emily Johnson" },
  { id: "Exam 4", status: "occupied" as RoomStatus, patient: "Daniel Kim" },
  { id: "Exam 5", status: "occupied" as RoomStatus, patient: "Sophia Garcia" },
  { id: "Exam 6", status: "available" as RoomStatus, patient: "" },
  { id: "Exam 7", status: "cleaning" as RoomStatus, patient: "" },
  { id: "Exam 8", status: "available" as RoomStatus, patient: "" },
  { id: "ER-1", status: "available" as RoomStatus, patient: "" },
  { id: "ER-2", status: "occupied" as RoomStatus, patient: "James Taylor" },
];

/* ══════════════════════════════════════════════
   Select Options
   ══════════════════════════════════════════════ */

export const bloodGroups: BloodGroup[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export const departments = [
  "General Medicine",
  "Cardiology",
  "Pediatrics",
  "Orthopedics",
  "Neurology",
  "Dermatology",
  "Ophthalmology",
];

export const doctorNames = [
  "Dr. Sarah Chen",
  "Dr. James Wilson",
  "Dr. Emily Martinez",
  "Dr. Robert Kim",
  "Dr. David Park",
  "Dr. Lisa Anderson",
  "Dr. Michael Thompson",
];

export const visitTypes: { value: VisitType; label: string }[] = [
  { value: "general-checkup", label: "General Checkup" },
  { value: "follow-up", label: "Follow-up" },
  { value: "consultation", label: "Consultation" },
  { value: "emergency", label: "Emergency" },
  { value: "routine-exam", label: "Routine Exam" },
  { value: "procedure", label: "Procedure" },
  { value: "telehealth", label: "Telehealth" },
];

export const timeSlots = [
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
];

/* ══════════════════════════════════════════════
   Config helpers
   ══════════════════════════════════════════════ */

export const priorityConfig: Record<
  Priority,
  { label: string; class: string }
> = {
  low: {
    label: "Low",
    class: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  },
  normal: {
    label: "Normal",
    class: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  },
  high: {
    label: "High",
    class:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  },
  urgent: {
    label: "Urgent",
    class: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
  },
};

export const patientTypeConfig: Record<
  PatientType,
  { label: string; icon: LucideIcon; class: string }
> = {
  "walk-in": {
    label: "Walk-in",
    icon: UserPlus,
    class: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  },
  scheduled: {
    label: "Scheduled",
    icon: UserCheck,
    class:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  emergency: {
    label: "Emergency",
    icon: AlertTriangle,
    class: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
  },
};

export const roomStatusConfig: Record<
  RoomStatus,
  { label: string; dot: string }
> = {
  available: { label: "Available", dot: "bg-emerald-500" },
  occupied: { label: "Occupied", dot: "bg-red-500" },
  cleaning: { label: "Cleaning", dot: "bg-amber-500" },
};

/* ══════════════════════════════════════════════
   Step labels
   ══════════════════════════════════════════════ */

export const stepLabels = [
  { id: 1, label: "Patient Search", icon: UserPlus },
  { id: 2, label: "Personal Info", icon: User },
  { id: 3, label: "Medical Info", icon: Heart },
  { id: 4, label: "Appointment", icon: Clock },
  { id: 5, label: "Check-in", icon: CheckCircle2 },
];

/* ══════════════════════════════════════════════
   Search helper
   ══════════════════════════════════════════════ */

export function searchPatients(
  query: string,
  by: "id" | "phone" | "email" | "nationalId",
): Patient[] {
  if (!query) return [];
  const q = query.toLowerCase();
  return existingPatients.filter((p) => {
    switch (by) {
      case "id":
        return p.id.toLowerCase().includes(q);
      case "phone":
        return p.phone.toLowerCase().includes(q);
      case "email":
        return p.email.toLowerCase().includes(q);
      case "nationalId":
        return p.nationalId.toLowerCase().includes(q);
      default:
        return false;
    }
  });
}
