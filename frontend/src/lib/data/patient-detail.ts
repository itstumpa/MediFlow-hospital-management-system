// ============================================================
// Types & Mock Data — Patient Detail View
// ============================================================

export interface PatientAlert {
  type: "allergy" | "chronic" | "emergency";
  severity: "high" | "medium" | "low";
  message: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface Allergy {
  name: string;
  severity: "mild" | "moderate" | "severe";
  reaction: string;
}

export interface ChronicCondition {
  name: string;
  diagnosedDate: string;
  status: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
}

export interface Vaccination {
  vaccine: string;
  date: string;
  status: "completed" | "pending" | "overdue";
}

export interface PatientDetail {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  status: "active" | "inactive" | "critical" | "discharged";
  registrationDate: string;
  assignedDoctor: {
    id: string;
    name: string;
    specialty: string;
    imageUrl: string;
  };
  department: string;
  insuranceProvider: string;
  insuranceId: string;
  insuranceType: string;
  email: string;
  phone: string;
  avatar: string;
  dateOfBirth: string;
  occupation: string;
  maritalStatus: string;
  nationality: string;
  address: Address;
  emergencyContact: EmergencyContact;
  allergies: Allergy[];
  chronicConditions: ChronicCondition[];
  currentMedications: Medication[];
  vaccinationStatus: Vaccination[];
  totalVisits: number;
  upcomingAppointments: number;
  completedTreatments: number;
  totalPrescriptions: number;
  totalLabReports: number;
  outstandingBills: number;
  notes: string;
  alerts: PatientAlert[];
}

export interface Appointment {
  id: string;
  doctor: string;
  doctorAvatar: string;
  department: string;
  date: string;
  time: string;
  type: string;
  status: "scheduled" | "completed" | "cancelled" | "no-show";
}

export interface MedicalRecord {
  id: string;
  date: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  doctor: string;
  department: string;
  attachments: { name: string; type: string; size: string }[];
}

export interface Prescription {
  id: string;
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedBy: string;
  date: string;
  refills: number;
  status: "active" | "completed" | "discontinued";
}

export interface LabReport {
  id: string;
  name: string;
  category: string;
  date: string;
  doctor: string;
  status: "pending" | "completed" | "cancelled";
}

export interface BillingRecord {
  id: string;
  invoiceNumber: string;
  treatment: string;
  amount: number;
  status: "paid" | "pending" | "overdue" | "cancelled";
  paymentMethod: string;
  dueDate: string;
  paidDate?: string;
}

export interface Activity {
  id: string;
  type:
    | "registration"
    | "appointment"
    | "prescription"
    | "report"
    | "payment"
    | "record"
    | "visit";
  description: string;
  date: string;
  user: string;
}

// ─── Mock Patient Detail ────────────────────────────────────

export const mockPatient: PatientDetail = {
  id: "P-10024",
  name: "John Smith",
  age: 45,
  gender: "Male",
  bloodGroup: "A+",
  status: "active",
  registrationDate: "2024-03-15",
  assignedDoctor: {
    id: "doc-1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    imageUrl:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face",
  },
  department: "Cardiology",
  insuranceProvider: "BlueCross Shield",
  insuranceId: "BCS-4872-9912",
  insuranceType: "Premium Family Plan",
  email: "john.smith@email.com",
  phone: "+1 (555) 234-5678",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  dateOfBirth: "1981-04-23",
  occupation: "Software Engineer",
  maritalStatus: "Married",
  nationality: "American",
  address: {
    street: "1243 Oak Avenue, Apt 4B",
    city: "San Francisco",
    state: "CA",
    zip: "94110",
  },
  emergencyContact: {
    name: "Emily Smith",
    relationship: "Spouse",
    phone: "+1 (555) 987-6543",
  },
  allergies: [
    {
      name: "Penicillin",
      severity: "severe",
      reaction: "Anaphylaxis, hives, swelling",
    },
    {
      name: "Sulfa Drugs",
      severity: "moderate",
      reaction: "Skin rash, fever",
    },
    {
      name: "Latex",
      severity: "mild",
      reaction: "Contact dermatitis",
    },
  ],
  chronicConditions: [
    { name: "Hypertension", diagnosedDate: "2019-06-10", status: "Managed" },
    { name: "Type 2 Diabetes", diagnosedDate: "2021-01-22", status: "Managed" },
    {
      name: "Hyperlipidemia",
      diagnosedDate: "2020-03-15",
      status: "Under Treatment",
    },
  ],
  currentMedications: [
    {
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribedBy: "Dr. Sarah Johnson",
    },
    {
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      prescribedBy: "Dr. James Wilson",
    },
    {
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily at bedtime",
      prescribedBy: "Dr. Sarah Johnson",
    },
    {
      name: "Aspirin",
      dosage: "81mg",
      frequency: "Once daily",
      prescribedBy: "Dr. Sarah Johnson",
    },
  ],
  vaccinationStatus: [
    { vaccine: "COVID-19 (Moderna)", date: "2024-10-15", status: "completed" },
    { vaccine: "Influenza (Seasonal)", date: "2025-09-01", status: "completed" },
    { vaccine: "Tetanus Booster", date: "2023-05-20", status: "completed" },
    { vaccine: "Hepatitis B", date: "2026-01-10", status: "pending" },
  ],
  totalVisits: 24,
  upcomingAppointments: 2,
  completedTreatments: 18,
  totalPrescriptions: 12,
  totalLabReports: 8,
  outstandingBills: 1,
  notes:
    "Patient responds well to treatment. Blood pressure has been stable over the last 3 visits. Continue monitoring glucose levels and adjust Metformin dosage if needed. Patient has shown good adherence to medication schedule.",
  alerts: [
    {
      type: "allergy",
      severity: "high",
      message: "Severe Penicillin allergy — anaphylaxis risk",
    },
    {
      type: "chronic",
      severity: "high",
      message: "Hypertension — requires regular monitoring",
    },
    {
      type: "chronic",
      severity: "medium",
      message: "Type 2 Diabetes — HbA1c check overdue",
    },
    {
      type: "chronic",
      severity: "medium",
      message: "Hyperlipidemia — under treatment with Atorvastatin",
    },
  ],
};

// ─── Mock Appointments ──────────────────────────────────────

export const mockAppointments: Appointment[] = [
  {
    id: "apt-1",
    doctor: "Dr. Sarah Johnson",
    doctorAvatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face",
    department: "Cardiology",
    date: "2026-07-20",
    time: "10:30",
    type: "Follow-up",
    status: "scheduled",
  },
  {
    id: "apt-2",
    doctor: "Dr. James Wilson",
    doctorAvatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
    department: "Endocrinology",
    date: "2026-08-05",
    time: "14:00",
    type: "Consultation",
    status: "scheduled",
  },
  {
    id: "apt-3",
    doctor: "Dr. Sarah Johnson",
    doctorAvatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face",
    department: "Cardiology",
    date: "2026-06-28",
    time: "09:00",
    type: "Check-up",
    status: "completed",
  },
  {
    id: "apt-4",
    doctor: "Dr. Michael Chen",
    doctorAvatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    department: "General Medicine",
    date: "2026-06-15",
    time: "11:15",
    type: "Annual Physical",
    status: "completed",
  },
  {
    id: "apt-5",
    doctor: "Dr. Emily Rodriguez",
    doctorAvatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face",
    department: "Ophthalmology",
    date: "2026-05-10",
    time: "15:30",
    type: "Eye Exam",
    status: "completed",
  },
  {
    id: "apt-6",
    doctor: "Dr. Sarah Johnson",
    doctorAvatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face",
    department: "Cardiology",
    date: "2026-04-02",
    time: "08:45",
    type: "Emergency Follow-up",
    status: "cancelled",
  },
  {
    id: "apt-7",
    doctor: "Dr. James Wilson",
    doctorAvatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
    department: "Endocrinology",
    date: "2026-03-18",
    time: "13:00",
    type: "Lab Review",
    status: "no-show",
  },
];

// ─── Mock Medical Records ───────────────────────────────────

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: "rec-1",
    date: "2026-06-28",
    diagnosis: "Essential hypertension — Stage 1",
    treatment:
      "Continued Lisinopril 10mg daily. BP measured at 128/82 — improved from previous visit. Recommend dietary sodium reduction and 30min daily exercise.",
    notes:
      "Patient is responding well to current treatment regimen. Encouraged to continue lifestyle modifications. Follow-up in 3 months.",
    doctor: "Dr. Sarah Johnson",
    department: "Cardiology",
    attachments: [
      { name: "BP_Chart_Jun2026.pdf", type: "PDF", size: "245 KB" },
      { name: "ECG_Report_Jun2026.pdf", type: "PDF", size: "512 KB" },
    ],
  },
  {
    id: "rec-2",
    date: "2026-05-22",
    diagnosis: "Type 2 Diabetes — Annual Review",
    treatment:
      "HbA1c at 7.2% — within target range. Continued Metformin 500mg twice daily. Dietary consultation completed.",
    notes:
      "Diabetes management is on track. Patient has maintained consistent glucose monitoring. Continue current plan.",
    doctor: "Dr. James Wilson",
    department: "Endocrinology",
    attachments: [
      { name: "HbA1c_Report_May2026.pdf", type: "PDF", size: "189 KB" },
      { name: "Glucose_Log_May2026.xlsx", type: "Spreadsheet", size: "67 KB" },
    ],
  },
  {
    id: "rec-3",
    date: "2026-04-15",
    diagnosis: "Acute Bronchitis",
    treatment:
      "Prescribed Amoxicillin 500mg three times daily for 7 days. Recommended rest, increased fluid intake, and over-the-counter cough suppressant.",
    notes:
      "Condition resolved within 10 days. No complications. Chest X-ray was clear.",
    doctor: "Dr. Michael Chen",
    department: "General Medicine",
    attachments: [
      { name: "Chest_XRay_Apr2026.jpg", type: "Image", size: "1.2 MB" },
    ],
  },
  {
    id: "rec-4",
    date: "2026-03-01",
    diagnosis: "Hyperlipidemia — Initial Diagnosis",
    treatment:
      "Initiated Atorvastatin 20mg daily at bedtime. Lipid panel showed elevated LDL at 168 mg/dL. Dietary consultation scheduled.",
    notes:
      "Patient advised on heart-healthy diet. Will re-evaluate lipid panel in 3 months to assess statin efficacy.",
    doctor: "Dr. Sarah Johnson",
    department: "Cardiology",
    attachments: [
      { name: "Lipid_Panel_Mar2026.pdf", type: "PDF", size: "234 KB" },
    ],
  },
];

// ─── Mock Prescriptions ─────────────────────────────────────

export const mockPrescriptions: Prescription[] = [
  {
    id: "rx-1",
    medicine: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "90 days",
    prescribedBy: "Dr. Sarah Johnson",
    date: "2026-06-28",
    refills: 2,
    status: "active",
  },
  {
    id: "rx-2",
    medicine: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily with meals",
    duration: "90 days",
    prescribedBy: "Dr. James Wilson",
    date: "2026-05-22",
    refills: 3,
    status: "active",
  },
  {
    id: "rx-3",
    medicine: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily at bedtime",
    duration: "90 days",
    prescribedBy: "Dr. Sarah Johnson",
    date: "2026-03-01",
    refills: 2,
    status: "active",
  },
  {
    id: "rx-4",
    medicine: "Aspirin",
    dosage: "81mg",
    frequency: "Once daily",
    duration: "180 days",
    prescribedBy: "Dr. Sarah Johnson",
    date: "2026-03-01",
    refills: 5,
    status: "active",
  },
  {
    id: "rx-5",
    medicine: "Amoxicillin",
    dosage: "500mg",
    frequency: "Three times daily",
    duration: "7 days",
    prescribedBy: "Dr. Michael Chen",
    date: "2026-04-15",
    refills: 0,
    status: "completed",
  },
  {
    id: "rx-6",
    medicine: "Ibuprofen",
    dosage: "400mg",
    frequency: "As needed for pain",
    duration: "10 days",
    prescribedBy: "Dr. Sarah Johnson",
    date: "2026-02-10",
    refills: 0,
    status: "discontinued",
  },
];

// ─── Mock Lab Reports ───────────────────────────────────────

export const mockLabReports: LabReport[] = [
  {
    id: "lab-1",
    name: "Complete Blood Count (CBC)",
    category: "Hematology",
    date: "2026-06-28",
    doctor: "Dr. Sarah Johnson",
    status: "completed",
  },
  {
    id: "lab-2",
    name: "HbA1c Test",
    category: "Endocrinology",
    date: "2026-05-22",
    doctor: "Dr. James Wilson",
    status: "completed",
  },
  {
    id: "lab-3",
    name: "Lipid Panel",
    category: "Cardiology",
    date: "2026-06-28",
    doctor: "Dr. Sarah Johnson",
    status: "completed",
  },
  {
    id: "lab-4",
    name: "Comprehensive Metabolic Panel",
    category: "General",
    date: "2026-05-22",
    doctor: "Dr. James Wilson",
    status: "completed",
  },
  {
    id: "lab-5",
    name: "ECG / EKG",
    category: "Cardiology",
    date: "2026-06-28",
    doctor: "Dr. Sarah Johnson",
    status: "completed",
  },
  {
    id: "lab-6",
    name: "Thyroid Function Test",
    category: "Endocrinology",
    date: "2026-07-10",
    doctor: "Dr. James Wilson",
    status: "pending",
  },
  {
    id: "lab-7",
    name: "Vitamin D Level",
    category: "General",
    date: "2026-07-05",
    doctor: "Dr. Michael Chen",
    status: "pending",
  },
  {
    id: "lab-8",
    name: "Urinalysis",
    category: "General",
    date: "2026-04-15",
    doctor: "Dr. Michael Chen",
    status: "completed",
  },
];

// ─── Mock Billing Records ───────────────────────────────────

export const mockBillingRecords: BillingRecord[] = [
  {
    id: "bill-1",
    invoiceNumber: "INV-2026-0842",
    treatment: "Cardiology Consultation + ECG",
    amount: 450,
    status: "paid",
    paymentMethod: "Visa •••• 4242",
    dueDate: "2026-07-05",
    paidDate: "2026-07-01",
  },
  {
    id: "bill-2",
    invoiceNumber: "INV-2026-0791",
    treatment: "Annual Physical Examination",
    amount: 320,
    status: "paid",
    paymentMethod: "Insurance — BlueCross Shield",
    dueDate: "2026-06-20",
    paidDate: "2026-06-18",
  },
  {
    id: "bill-3",
    invoiceNumber: "INV-2026-0654",
    treatment: "HbA1c + Lipid Panel Lab Work",
    amount: 280,
    status: "paid",
    paymentMethod: "Insurance — BlueCross Shield",
    dueDate: "2026-06-10",
    paidDate: "2026-06-08",
  },
  {
    id: "bill-4",
    invoiceNumber: "INV-2026-0512",
    treatment: "Chest X-Ray + Pulmonology Consult",
    amount: 680,
    status: "pending",
    paymentMethod: "Pending",
    dueDate: "2026-07-30",
  },
  {
    id: "bill-5",
    invoiceNumber: "INV-2026-0423",
    treatment: "Emergency Visit — Bronchitis",
    amount: 1200,
    status: "overdue",
    paymentMethod: "Mastercard •••• 8890",
    dueDate: "2026-05-15",
  },
  {
    id: "bill-6",
    invoiceNumber: "INV-2026-0387",
    treatment: "Eye Examination",
    amount: 150,
    status: "paid",
    paymentMethod: "Visa •••• 4242",
    dueDate: "2026-05-01",
    paidDate: "2026-04-28",
  },
];

// ─── Mock Activity Feed ─────────────────────────────────────

export const mockActivities: Activity[] = [
  {
    id: "act-1",
    type: "registration",
    description: "Patient registered at MediFlow Hospital",
    date: "2024-03-15T09:30:00",
    user: "Admin",
  },
  {
    id: "act-2",
    type: "appointment",
    description: "First consultation with Dr. Sarah Johnson",
    date: "2024-03-18T10:00:00",
    user: "Reception",
  },
  {
    id: "act-3",
    type: "record",
    description: "Initial diagnosis: Essential Hypertension",
    date: "2024-03-18T10:45:00",
    user: "Dr. Sarah Johnson",
  },
  {
    id: "act-4",
    type: "prescription",
    description: "Prescribed Lisinopril 10mg for hypertension",
    date: "2024-03-18T11:00:00",
    user: "Dr. Sarah Johnson",
  },
  {
    id: "act-5",
    type: "appointment",
    description: "Follow-up appointment — blood pressure review",
    date: "2024-04-15T09:30:00",
    user: "Reception",
  },
  {
    id: "act-6",
    type: "report",
    description: "HbA1c test results uploaded — 7.2%",
    date: "2024-05-22T14:15:00",
    user: "Lab",
  },
  {
    id: "act-7",
    type: "record",
    description: "Diagnosis: Type 2 Diabetes — treatment plan initiated",
    date: "2024-05-22T15:00:00",
    user: "Dr. James Wilson",
  },
  {
    id: "act-8",
    type: "prescription",
    description: "Prescribed Metformin 500mg for diabetes management",
    date: "2024-05-22T15:30:00",
    user: "Dr. James Wilson",
  },
  {
    id: "act-9",
    type: "payment",
    description: "Payment completed — Cardiology Consultation ($450)",
    date: "2026-07-01T12:00:00",
    user: "Billing",
  },
  {
    id: "act-10",
    type: "visit",
    description: "Routine check-up — BP stable at 128/82",
    date: "2026-06-28T10:30:00",
    user: "Dr. Sarah Johnson",
  },
  {
    id: "act-11",
    type: "report",
    description: "Lipid panel results uploaded — LDL at 128 mg/dL",
    date: "2026-06-28T11:15:00",
    user: "Lab",
  },
  {
    id: "act-12",
    type: "prescription",
    description: "Atorvastatin dosage adjusted to 20mg",
    date: "2026-06-28T11:30:00",
    user: "Dr. Sarah Johnson",
  },
];

// ─── Related Patients (same doctor/department) ──────────────

export const mockRelatedPatients = [
  {
    id: "P-10012",
    name: "Alice Martinez",
    age: 52,
    gender: "Female",
    bloodGroup: "O+",
    department: "Cardiology",
    doctor: "Dr. Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    lastVisit: "2026-07-05",
    status: "active" as const,
  },
  {
    id: "P-10089",
    name: "Robert Chen",
    age: 38,
    gender: "Male",
    bloodGroup: "B+",
    department: "Cardiology",
    doctor: "Dr. Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    lastVisit: "2026-06-20",
    status: "active" as const,
  },
  {
    id: "P-10045",
    name: "Margaret Williams",
    age: 61,
    gender: "Female",
    bloodGroup: "A-",
    department: "Cardiology",
    doctor: "Dr. Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    lastVisit: "2026-07-10",
    status: "critical" as const,
  },
  {
    id: "P-10067",
    name: "David Thompson",
    age: 55,
    gender: "Male",
    bloodGroup: "AB+",
    department: "Endocrinology",
    doctor: "Dr. James Wilson",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    lastVisit: "2026-06-25",
    status: "active" as const,
  },
];
