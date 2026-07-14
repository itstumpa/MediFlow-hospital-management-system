/* ============================================
   Patient List — Mock Data & Types
   ============================================ */

export type Gender = "Male" | "Female" | "Other";

export type BloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export type AppointmentStatus =
  | "Waiting"
  | "Checked In"
  | "In Consultation"
  | "Completed"
  | "Cancelled"
  | "No Show";

export type ViewMode = "table" | "cards";

export interface PatientRecord {
  id: string;
  patientId: string;
  name: string;
  initials: string;
  avatarGradient: string;
  age: number;
  gender: Gender;
  bloodGroup: BloodGroup;
  condition: string;
  lastVisit: string;
  appointmentStatus: AppointmentStatus;
  doctorNotes: string;
  phone: string;
  email: string;
  address: string;
  insurance: string;
  medicalAlerts: MedicalAlert[];
  recentVisits: RecentVisit[];
  currentMedications: string[];
  upcomingAppointment: string | null;
}

export interface MedicalAlert {
  type: "Allergy" | "Chronic Condition" | "Alert";
  label: string;
  severity: "Mild" | "Moderate" | "Severe" | "High" | "Managed" | "Stable";
}

export interface RecentVisit {
  date: string;
  reason: string;
  doctor: string;
}

export interface PatientStat {
  id: string;
  label: string;
  value: number;
  icon: string;
  color: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
}

export type FilterField =
  | "search"
  | "patientId"
  | "age"
  | "gender"
  | "bloodGroup"
  | "condition"
  | "lastVisit"
  | "sort";

export interface FilterState {
  search: string;
  patientId: string;
  age: string;
  gender: string;
  bloodGroup: string;
  condition: string;
  lastVisit: string;
  sort: string;
}

export const initialFilters: FilterState = {
  search: "",
  patientId: "",
  age: "",
  gender: "",
  bloodGroup: "",
  condition: "",
  lastVisit: "",
  sort: "name-asc",
};

/** Stats KPI cards */
export const patientStatsData: PatientStat[] = [
  {
    id: "total",
    label: "Total Patients",
    value: 284,
    icon: "Users",
    color: "from-cyan-500 to-blue-500",
    trend: "up",
    trendValue: "+12 this month",
  },
  {
    id: "today",
    label: "Today's Patients",
    value: 8,
    icon: "CalendarCheck",
    color: "from-indigo-500 to-purple-500",
    trend: "neutral",
    trendValue: "3 remaining",
  },
  {
    id: "new",
    label: "New Patients",
    value: 18,
    icon: "UserPlus",
    color: "from-emerald-500 to-green-500",
    trend: "up",
    trendValue: "+5 vs last month",
  },
  {
    id: "followup",
    label: "Follow-ups",
    value: 42,
    icon: "RefreshCw",
    color: "from-amber-500 to-orange-500",
    trend: "up",
    trendValue: "+8 vs last month",
  },
  {
    id: "critical",
    label: "Critical Patients",
    value: 3,
    icon: "HeartPulse",
    color: "from-rose-500 to-red-500",
    trend: "down",
    trendValue: "-1 vs last month",
  },
];

/** Mock patients */
export const mockPatients: PatientRecord[] = [
  {
    id: "pat-001",
    patientId: "PAT-001",
    name: "Emily Johnson",
    initials: "EJ",
    avatarGradient: "from-cyan-500 to-blue-500",
    age: 34,
    gender: "Female",
    bloodGroup: "A+",
    condition: "Stage 1 Hypertension",
    lastVisit: "Jul 14, 2026",
    appointmentStatus: "Completed",
    doctorNotes:
      "BP slightly elevated at 132/84. Continue monitoring. Follow-up in 3 months.",
    phone: "+1 (555) 123-4567",
    email: "emily.johnson@email.com",
    address: "452 Oak Avenue, Suite 200, Springfield",
    insurance: "Blue Cross Premium",
    medicalAlerts: [
      { type: "Chronic Condition", label: "Hypertension", severity: "Managed" },
      { type: "Allergy", label: "Penicillin", severity: "Moderate" },
      { type: "Allergy", label: "Sulfa Drugs", severity: "Mild" },
    ],
    recentVisits: [
      {
        date: "Jul 14, 2026",
        reason: "Annual checkup & BP review",
        doctor: "Dr. Sarah Mitchell",
      },
      {
        date: "Mar 10, 2026",
        reason: "Hypertension follow-up",
        doctor: "Dr. Sarah Mitchell",
      },
      {
        date: "Nov 22, 2025",
        reason: "Annual physical",
        doctor: "Dr. Sarah Mitchell",
      },
    ],
    currentMedications: ["Multivitamin — 1 tablet daily"],
    upcomingAppointment: "Oct 14, 2026 — 08:30 AM",
  },
  {
    id: "pat-002",
    patientId: "PAT-002",
    name: "Robert Rodriguez",
    initials: "RR",
    avatarGradient: "from-violet-500 to-purple-500",
    age: 45,
    gender: "Male",
    bloodGroup: "O+",
    condition: "Lower Back Pain",
    lastVisit: "Jul 14, 2026",
    appointmentStatus: "Waiting",
    doctorNotes:
      "MRI shows L4-L5 disc bulge. Recommended physical therapy and NSAIDs.",
    phone: "+1 (555) 234-5678",
    email: "robert.rodriguez@email.com",
    address: "789 Pine Road, Building B, Springfield",
    insurance: "United Health Plus",
    medicalAlerts: [
      {
        type: "Chronic Condition",
        label: "Chronic Back Pain",
        severity: "Stable",
      },
    ],
    recentVisits: [
      {
        date: "Jul 14, 2026",
        reason: "Follow-up — MRI results",
        doctor: "Dr. Sarah Mitchell",
      },
      {
        date: "Jun 28, 2026",
        reason: "Initial consultation — back pain",
        doctor: "Dr. Sarah Mitchell",
      },
    ],
    currentMedications: [
      "Ibuprofen 400mg — As needed",
      "Cyclobenzaprine 5mg — At bedtime",
    ],
    upcomingAppointment: "Jul 28, 2026 — 11:00 AM",
  },
  {
    id: "pat-003",
    patientId: "PAT-003",
    name: "Emily Watson",
    initials: "EW",
    avatarGradient: "from-emerald-500 to-teal-500",
    age: 28,
    gender: "Female",
    bloodGroup: "B-",
    condition: "Contact Dermatitis",
    lastVisit: "Jul 14, 2026",
    appointmentStatus: "Checked In",
    doctorNotes:
      "Rash on forearms consistent with allergic contact dermatitis. Likely new skincare product.",
    phone: "+1 (555) 345-6789",
    email: "emily.watson@email.com",
    address: "321 Maple Drive, Springfield",
    insurance: "Aetna Health",
    medicalAlerts: [
      { type: "Allergy", label: "Nickel", severity: "Mild" },
      { type: "Allergy", label: "Latex", severity: "Moderate" },
    ],
    recentVisits: [
      {
        date: "Jul 14, 2026",
        reason: "Skin rash evaluation",
        doctor: "Dr. Sarah Mitchell",
      },
    ],
    currentMedications: [],
    upcomingAppointment: null,
  },
  {
    id: "pat-004",
    patientId: "PAT-004",
    name: "James Anderson",
    initials: "JA",
    avatarGradient: "from-sky-500 to-indigo-500",
    age: 62,
    gender: "Male",
    bloodGroup: "A-",
    condition: "Type 2 Diabetes",
    lastVisit: "Jul 12, 2026",
    appointmentStatus: "Completed",
    doctorNotes:
      "HbA1c improved to 7.1%. Continue Metformin 500mg twice daily. Diet compliance good.",
    phone: "+1 (555) 456-7890",
    email: "james.anderson@email.com",
    address: "567 Cedar Lane, Springfield",
    insurance: "Medicare Plus",
    medicalAlerts: [
      {
        type: "Chronic Condition",
        label: "Type 2 Diabetes",
        severity: "Managed",
      },
      { type: "Chronic Condition", label: "Hypertension", severity: "Managed" },
      { type: "Alert", label: "Hypoglycemia Risk", severity: "Moderate" },
    ],
    recentVisits: [
      {
        date: "Jul 12, 2026",
        reason: "Quarterly diabetes review",
        doctor: "Dr. Sarah Mitchell",
      },
      {
        date: "Apr 10, 2026",
        reason: "Diabetes follow-up",
        doctor: "Dr. Sarah Mitchell",
      },
      {
        date: "Jan 8, 2026",
        reason: "Annual comprehensive exam",
        doctor: "Dr. Sarah Mitchell",
      },
    ],
    currentMedications: [
      "Metformin 500mg — Twice daily",
      "Lisinopril 10mg — Once daily",
      "Atorvastatin 20mg — Once daily",
    ],
    upcomingAppointment: "Oct 12, 2026 — 09:00 AM",
  },
  {
    id: "pat-005",
    patientId: "PAT-005",
    name: "Sophia Martinez",
    initials: "SM",
    avatarGradient: "from-pink-500 to-rose-500",
    age: 8,
    gender: "Female",
    bloodGroup: "O-",
    condition: "Recurrent Tonsillitis",
    lastVisit: "Jul 11, 2026",
    appointmentStatus: "Completed",
    doctorNotes:
      "3rd episode this year. Discussed tonsillectomy with parents. Referred to ENT.",
    phone: "+1 (555) 567-8901",
    email: "parent.martinez@email.com",
    address: "890 Birch Street, Springfield",
    insurance: "Family Health Plan",
    medicalAlerts: [
      { type: "Alert", label: "Recurrent Infections", severity: "Moderate" },
    ],
    recentVisits: [
      {
        date: "Jul 11, 2026",
        reason: "Throat pain & fever",
        doctor: "Dr. Sarah Mitchell",
      },
      {
        date: "May 3, 2026",
        reason: "Tonsillitis follow-up",
        doctor: "Dr. Sarah Mitchell",
      },
      {
        date: "Feb 18, 2026",
        reason: "Acute tonsillitis",
        doctor: "Dr. Sarah Mitchell",
      },
    ],
    currentMedications: ["Amoxicillin 250mg — Three times daily (as needed)"],
    upcomingAppointment: "Jul 25, 2026 — 10:30 AM",
  },
  {
    id: "pat-006",
    patientId: "PAT-006",
    name: "William Chen",
    initials: "WC",
    avatarGradient: "from-blue-500 to-cyan-500",
    age: 55,
    gender: "Male",
    bloodGroup: "AB+",
    condition: "Coronary Artery Disease",
    lastVisit: "Jul 10, 2026",
    appointmentStatus: "Completed",
    doctorNotes:
      "Stable angina. Stress test showed no significant changes. Continue current regimen.",
    phone: "+1 (555) 678-9012",
    email: "william.chen@email.com",
    address: "123 Walnut Street, Springfield",
    insurance: "Blue Shield Comprehensive",
    medicalAlerts: [
      { type: "Chronic Condition", label: "CAD", severity: "Managed" },
      {
        type: "Chronic Condition",
        label: "Hyperlipidemia",
        severity: "Managed",
      },
      { type: "Alert", label: "Chest Pain Protocol", severity: "Severe" },
    ],
    recentVisits: [
      {
        date: "Jul 10, 2026",
        reason: "Cardiology follow-up",
        doctor: "Dr. Sarah Mitchell",
      },
      {
        date: "Apr 5, 2026",
        reason: "Stress test review",
        doctor: "Dr. Sarah Mitchell",
      },
      {
        date: "Jan 12, 2026",
        reason: "Annual cardiac evaluation",
        doctor: "Dr. Sarah Mitchell",
      },
    ],
    currentMedications: [
      "Aspirin 81mg — Once daily",
      "Atorvastatin 40mg — Once daily",
      "Metoprolol 25mg — Twice daily",
    ],
    upcomingAppointment: "Oct 10, 2026 — 08:00 AM",
  },
  {
    id: "pat-007",
    patientId: "PAT-007",
    name: "Olivia Taylor",
    initials: "OT",
    avatarGradient: "from-purple-500 to-fuchsia-500",
    age: 31,
    gender: "Female",
    bloodGroup: "A+",
    condition: "Pregnancy — 28 Weeks",
    lastVisit: "Jul 9, 2026",
    appointmentStatus: "Completed",
    doctorNotes:
      "28-week prenatal visit. Fetal heart rate normal. Glucose screening passed. Next visit in 2 weeks.",
    phone: "+1 (555) 789-0123",
    email: "olivia.taylor@email.com",
    address: "654 Aspen Court, Springfield",
    insurance: "Maternity Care Plus",
    medicalAlerts: [
      { type: "Alert", label: "Prenatal Care", severity: "Stable" },
    ],
    recentVisits: [
      {
        date: "Jul 9, 2026",
        reason: "28-week prenatal checkup",
        doctor: "Dr. Sarah Mitchell",
      },
      {
        date: "Jun 25, 2026",
        reason: "Glucose screening",
        doctor: "Dr. Sarah Mitchell",
      },
      {
        date: "Jun 11, 2026",
        reason: "24-week prenatal checkup",
        doctor: "Dr. Sarah Mitchell",
      },
    ],
    currentMedications: [
      "Prenatal Vitamin — Once daily",
      "Iron Supplement — Once daily",
    ],
    upcomingAppointment: "Jul 23, 2026 — 10:00 AM",
  },
  {
    id: "pat-008",
    patientId: "PAT-008",
    name: "Anna Martinez",
    initials: "AM",
    avatarGradient: "from-violet-500 to-purple-500",
    age: 47,
    gender: "Female",
    bloodGroup: "O-",
    condition: "Persistent Moderate Asthma",
    lastVisit: "Jul 14, 2026",
    appointmentStatus: "In Consultation",
    doctorNotes:
      "Asthma exacerbation with increased SOB. Lung function shows reduced FEV1/FVC.",
    phone: "+1 (555) 234-5678",
    email: "anna.martinez@email.com",
    address: "432 Willow Way, Springfield",
    insurance: "United Health Plus",
    medicalAlerts: [
      { type: "Chronic Condition", label: "Asthma", severity: "Managed" },
      { type: "Allergy", label: "Aspirin", severity: "Moderate" },
      { type: "Allergy", label: "Pollen", severity: "Moderate" },
    ],
    recentVisits: [
      {
        date: "Jul 14, 2026",
        reason: "Asthma exacerbation follow-up",
        doctor: "Dr. Sarah Mitchell",
      },
      {
        date: "Apr 22, 2026",
        reason: "Lung function test review",
        doctor: "Dr. Sarah Mitchell",
      },
      {
        date: "Jan 10, 2026",
        reason: "Routine asthma checkup",
        doctor: "Dr. Sarah Mitchell",
      },
    ],
    currentMedications: [
      "Fluticasone/Salmeterol 250/50mcg — Twice daily",
      "Albuterol HFA 90mcg — As needed",
      "Montelukast 10mg — Once daily at bedtime",
    ],
    upcomingAppointment: "Jul 21, 2026 — 11:00 AM",
  },
  {
    id: "pat-009",
    patientId: "PAT-009",
    name: "George Brown",
    initials: "GB",
    avatarGradient: "from-amber-500 to-orange-500",
    age: 73,
    gender: "Male",
    bloodGroup: "B+",
    condition: "Osteoarthritis (Both Knees)",
    lastVisit: "Jul 8, 2026",
    appointmentStatus: "Completed",
    doctorNotes:
      "Knee pain worsening. X-ray shows advanced OA. Discussed joint replacement options.",
    phone: "+1 (555) 890-1234",
    email: "george.brown@email.com",
    address: "987 Elm Street, Springfield",
    insurance: "Medicare Advantage",
    medicalAlerts: [
      {
        type: "Chronic Condition",
        label: "Osteoarthritis",
        severity: "Managed",
      },
      { type: "Alert", label: "Fall Risk", severity: "High" },
    ],
    recentVisits: [
      {
        date: "Jul 8, 2026",
        reason: "Knee pain evaluation",
        doctor: "Dr. Sarah Mitchell",
      },
      {
        date: "Apr 15, 2026",
        reason: "X-ray results review",
        doctor: "Dr. Sarah Mitchell",
      },
      {
        date: "Jan 20, 2026",
        reason: "Joint pain management",
        doctor: "Dr. Sarah Mitchell",
      },
    ],
    currentMedications: [
      "Acetaminophen 500mg — As needed",
      "Celecoxib 200mg — Once daily",
      "Glucosamine/Chondroitin — Twice daily",
    ],
    upcomingAppointment: "Aug 5, 2026 — 09:30 AM",
  },
  {
    id: "pat-010",
    patientId: "PAT-010",
    name: "Mia Davis",
    initials: "MD",
    avatarGradient: "from-teal-500 to-emerald-500",
    age: 24,
    gender: "Female",
    bloodGroup: "AB-",
    condition: "Migraine (Chronic)",
    lastVisit: "Jul 7, 2026",
    appointmentStatus: "Completed",
    doctorNotes:
      "Migraine frequency decreased with Sumatriptan. Recommended magnesium supplementation.",
    phone: "+1 (555) 901-2345",
    email: "mia.davis@email.com",
    address: "159 Spruce Avenue, Springfield",
    insurance: "Cigna Health",
    medicalAlerts: [
      {
        type: "Chronic Condition",
        label: "Chronic Migraine",
        severity: "Managed",
      },
    ],
    recentVisits: [
      {
        date: "Jul 7, 2026",
        reason: "Migraine follow-up",
        doctor: "Dr. Sarah Mitchell",
      },
      {
        date: "May 20, 2026",
        reason: "Migraine treatment review",
        doctor: "Dr. Sarah Mitchell",
      },
      {
        date: "Mar 15, 2026",
        reason: "Initial migraine consultation",
        doctor: "Dr. Sarah Mitchell",
      },
    ],
    currentMedications: [
      "Sumatriptan 50mg — As needed for migraine",
      "Magnesium Glycinate 200mg — Once daily",
      "Vitamin B2 400mg — Once daily",
    ],
    upcomingAppointment: "Sep 7, 2026 — 02:00 PM",
  },
];

/** Get status config */
export const statusConfig: Record<
  AppointmentStatus,
  { bg: string; text: string; dot: string }
> = {
  Waiting: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  "Checked In": {
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    text: "text-cyan-600 dark:text-cyan-400",
    dot: "bg-cyan-500",
  },
  "In Consultation": {
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    text: "text-indigo-600 dark:text-indigo-400",
    dot: "bg-indigo-500",
  },
  Completed: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  Cancelled: {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    text: "text-rose-600 dark:text-rose-400",
    dot: "bg-rose-500",
  },
  "No Show": {
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-500 dark:text-slate-400",
    dot: "bg-slate-400",
  },
};

/** Gender filter options */
export const genderOptions = [
  { value: "", label: "All" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

/** Blood group filter options */
export const bloodGroupOptions = [
  { value: "", label: "All" },
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];

/** Sort options */
export const sortOptions = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "age-asc", label: "Age (Youngest)" },
  { value: "age-desc", label: "Age (Oldest)" },
  { value: "lastVisit-desc", label: "Last Visit (Newest)" },
  { value: "lastVisit-asc", label: "Last Visit (Oldest)" },
];
