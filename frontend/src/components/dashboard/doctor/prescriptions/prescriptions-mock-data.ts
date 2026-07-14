/* ============================================
   Prescription Management — Mock Data & Types
   ============================================ */

export type PrescriptionStatus =
  | "Active"
  | "Completed"
  | "Discontinued"
  | "Expired"
  | "Pending";

export type ViewMode = "table" | "cards";

export type PrescriptionSort =
  | "date-desc"
  | "date-asc"
  | "patient-asc"
  | "patient-desc"
  | "status";

export interface MedicineItem {
  id: string;
  name: string;
  genericName: string;
  brand: string;
  strength: string;
  category: string;
  dosage: string;
  frequency: string;
  duration: string;
  durationUnit: "days" | "weeks" | "months";
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
  night: boolean;
  beforeFood: boolean;
  afterFood: boolean;
  instructions: string;
}

export interface PrescriptionRecord {
  id: string;
  prescriptionId: string;
  patientId: string;
  patientName: string;
  patientInitials: string;
  patientAvatarGradient: string;
  patientAge: number;
  patientGender: string;
  doctorName: string;
  doctorId: string;
  diagnosis: string;
  medicines: MedicineItem[];
  notes: string;
  followUpDate: string | null;
  createdDate: string;
  createdBy: string;
  status: PrescriptionStatus;
  templateUsed: string | null;
  refills: number;
  refillsUsed: number;
}

export interface PrescriptionStat {
  id: string;
  label: string;
  value: number | string;
  icon: string;
  color: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
}

export interface MedicineOption {
  id: string;
  name: string;
  genericName: string;
  brand: string;
  strength: string;
  category: string;
  commonDosages: string[];
  commonFrequencies: string[];
}

export interface PrescriptionTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  diagnosis: string;
  medicines: Omit<MedicineItem, "id">[];
  notes: string;
}

export interface FilterState {
  search: string;
  patient: string;
  medicine: string;
  doctor: string;
  status: string;
  date: string;
  prescriptionId: string;
  sort: PrescriptionSort;
}

export const initialFilters: FilterState = {
  search: "",
  patient: "",
  medicine: "",
  doctor: "",
  status: "",
  date: "",
  prescriptionId: "",
  sort: "date-desc",
};

/* ── Stats KPI Data ── */

export const prescriptionStatsData: PrescriptionStat[] = [
  {
    id: "active",
    label: "Active Prescriptions",
    value: 148,
    icon: "FileText",
    color: "from-emerald-500 to-green-500",
    trend: "up",
    trendValue: "+12 this week",
  },
  {
    id: "today",
    label: "Today's Prescriptions",
    value: 9,
    icon: "CalendarCheck",
    color: "from-dash-primary to-dash-primary-dark",
    trend: "neutral",
    trendValue: "3 pending review",
  },
  {
    id: "pending",
    label: "Pending",
    value: 14,
    icon: "Clock",
    color: "from-amber-500 to-orange-500",
    trend: "up",
    trendValue: "+5 vs yesterday",
  },
  {
    id: "expired",
    label: "Expired",
    value: 23,
    icon: "XCircle",
    color: "from-rose-500 to-red-500",
    trend: "down",
    trendValue: "-3 this month",
  },
  {
    id: "refills",
    label: "Refills",
    value: 42,
    icon: "RefreshCw",
    color: "from-indigo-500 to-purple-500",
    trend: "up",
    trendValue: "+8 this month",
  },
];

/* ── Medicine Options (for autocomplete) ── */

export const medicineOptions: MedicineOption[] = [
  {
    id: "med-1",
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    brand: "Amoxil",
    strength: "500mg",
    category: "Antibiotic",
    commonDosages: ["250mg", "500mg", "875mg"],
    commonFrequencies: ["Once daily", "Twice daily", "Three times daily"],
  },
  {
    id: "med-2",
    name: "Metformin",
    genericName: "Metformin HCl",
    brand: "Glucophage",
    strength: "500mg",
    category: "Antidiabetic",
    commonDosages: ["500mg", "850mg", "1000mg"],
    commonFrequencies: ["Once daily", "Twice daily"],
  },
  {
    id: "med-3",
    name: "Amlodipine",
    genericName: "Amlodipine Besylate",
    brand: "Norvasc",
    strength: "5mg",
    category: "Antihypertensive",
    commonDosages: ["2.5mg", "5mg", "10mg"],
    commonFrequencies: ["Once daily"],
  },
  {
    id: "med-4",
    name: "Atorvastatin",
    genericName: "Atorvastatin Calcium",
    brand: "Lipitor",
    strength: "10mg",
    category: "Antihyperlipidemic",
    commonDosages: ["10mg", "20mg", "40mg", "80mg"],
    commonFrequencies: ["Once daily"],
  },
  {
    id: "med-5",
    name: "Omeprazole",
    genericName: "Omeprazole",
    brand: "Prilosec",
    strength: "20mg",
    category: "Proton Pump Inhibitor",
    commonDosages: ["10mg", "20mg", "40mg"],
    commonFrequencies: ["Once daily", "Twice daily"],
  },
  {
    id: "med-6",
    name: "Ibuprofen",
    genericName: "Ibuprofen",
    brand: "Advil",
    strength: "400mg",
    category: "NSAID",
    commonDosages: ["200mg", "400mg", "600mg", "800mg"],
    commonFrequencies: ["Three times daily", "Four times daily"],
  },
  {
    id: "med-7",
    name: "Lisinopril",
    genericName: "Lisinopril",
    brand: "Zestril",
    strength: "10mg",
    category: "ACE Inhibitor",
    commonDosages: ["5mg", "10mg", "20mg", "40mg"],
    commonFrequencies: ["Once daily"],
  },
  {
    id: "med-8",
    name: "Metoprolol",
    genericName: "Metoprolol Tartrate",
    brand: "Lopressor",
    strength: "50mg",
    category: "Beta Blocker",
    commonDosages: ["25mg", "50mg", "100mg"],
    commonFrequencies: ["Once daily", "Twice daily"],
  },
  {
    id: "med-9",
    name: "Salbutamol",
    genericName: "Albuterol Sulfate",
    brand: "Ventolin",
    strength: "100mcg",
    category: "Bronchodilator",
    commonDosages: ["100mcg", "200mcg"],
    commonFrequencies: ["As needed", "Four times daily"],
  },
  {
    id: "med-10",
    name: "Levothyroxine",
    genericName: "Levothyroxine Sodium",
    brand: "Synthroid",
    strength: "50mcg",
    category: "Thyroid Hormone",
    commonDosages: ["25mcg", "50mcg", "75mcg", "100mcg"],
    commonFrequencies: ["Once daily"],
  },
  {
    id: "med-11",
    name: "Losartan",
    genericName: "Losartan Potassium",
    brand: "Cozaar",
    strength: "50mg",
    category: "ARB",
    commonDosages: ["25mg", "50mg", "100mg"],
    commonFrequencies: ["Once daily", "Twice daily"],
  },
  {
    id: "med-12",
    name: "Azithromycin",
    genericName: "Azithromycin",
    brand: "Zithromax",
    strength: "250mg",
    category: "Antibiotic",
    commonDosages: ["250mg", "500mg", "600mg"],
    commonFrequencies: ["Once daily"],
  },
  {
    id: "med-13",
    name: "Prednisone",
    genericName: "Prednisone",
    brand: "Deltasone",
    strength: "10mg",
    category: "Corticosteroid",
    commonDosages: ["5mg", "10mg", "20mg", "40mg"],
    commonFrequencies: ["Once daily", "Twice daily"],
  },
  {
    id: "med-14",
    name: "Warfarin",
    genericName: "Warfarin Sodium",
    brand: "Coumadin",
    strength: "5mg",
    category: "Anticoagulant",
    commonDosages: ["1mg", "2mg", "2.5mg", "5mg", "7.5mg", "10mg"],
    commonFrequencies: ["Once daily"],
  },
  {
    id: "med-15",
    name: "Insulin Glargine",
    genericName: "Insulin Glargine",
    brand: "Lantus",
    strength: "100 units/mL",
    category: "Insulin",
    commonDosages: ["10 units", "20 units", "30 units", "40 units"],
    commonFrequencies: ["Once daily", "Twice daily"],
  },
];

/* ── Prescription Templates ── */

export const prescriptionTemplates: PrescriptionTemplate[] = [
  {
    id: "tpl-diabetes",
    name: "Diabetes Type 2",
    description: "Standard metformin regimen for Type 2 Diabetes",
    icon: "Activity",
    color: "from-emerald-500 to-green-500",
    diagnosis: "Type 2 Diabetes Mellitus",
    medicines: [
      {
        name: "Metformin",
        genericName: "Metformin HCl",
        brand: "Glucophage",
        strength: "500mg",
        dosage: "500mg",
        frequency: "Twice daily",
        duration: "90",
        durationUnit: "days",
        category: "Antidiabetic",
        morning: true,
        afternoon: false,
        evening: true,
        night: false,
        beforeFood: false,
        afterFood: true,
        instructions: "Take after meals",
      },
    ],
    notes: "Monitor blood glucose levels regularly. Follow up in 3 months.",
  },
  {
    id: "tpl-hypertension",
    name: "Hypertension",
    description: "First-line antihypertensive therapy",
    icon: "Heart",
    color: "from-rose-500 to-red-500",
    diagnosis: "Essential Hypertension",
    medicines: [
      {
        name: "Amlodipine",
        genericName: "Amlodipine Besylate",
        brand: "Norvasc",
        strength: "5mg",
        dosage: "5mg",
        frequency: "Once daily",
        duration: "30",
        durationUnit: "days",
        category: "Antihypertensive",
        morning: true,
        afternoon: false,
        evening: false,
        night: false,
        beforeFood: false,
        afterFood: false,
        instructions: "Take at the same time each day",
      },
    ],
    notes: "Monitor blood pressure weekly. Follow up in 1 month.",
  },
  {
    id: "tpl-fever",
    name: "Fever / Infection",
    description: "Antibiotic + antipyretic for fever with suspected infection",
    icon: "Thermometer",
    color: "from-amber-500 to-orange-500",
    diagnosis: "Acute Febrile Illness",
    medicines: [
      {
        name: "Amoxicillin",
        genericName: "Amoxicillin",
        brand: "Amoxil",
        strength: "500mg",
        dosage: "500mg",
        frequency: "Three times daily",
        duration: "7",
        durationUnit: "days",
        category: "Antibiotic",
        morning: true,
        afternoon: true,
        evening: true,
        night: false,
        beforeFood: false,
        afterFood: true,
        instructions: "Complete the full course even if symptoms improve",
      },
      {
        name: "Ibuprofen",
        genericName: "Ibuprofen",
        brand: "Advil",
        strength: "400mg",
        dosage: "400mg",
        frequency: "Three times daily",
        duration: "5",
        durationUnit: "days",
        category: "NSAID",
        morning: true,
        afternoon: true,
        evening: true,
        night: false,
        beforeFood: false,
        afterFood: true,
        instructions: "Take after meals to avoid stomach upset",
      },
    ],
    notes: "Rest, hydrate well. Return if fever persists beyond 3 days.",
  },
  {
    id: "tpl-cold",
    name: "Common Cold / Flu",
    description: "Symptomatic relief for viral upper respiratory infection",
    icon: "Wind",
    color: "from-dash-primary to-dash-primary-dark",
    diagnosis: "Upper Respiratory Tract Infection / Common Cold",
    medicines: [
      {
        name: "Ibuprofen",
        genericName: "Ibuprofen",
        brand: "Advil",
        strength: "400mg",
        dosage: "400mg",
        frequency: "Three times daily",
        duration: "5",
        durationUnit: "days",
        category: "NSAID",
        morning: true,
        afternoon: true,
        evening: true,
        night: false,
        beforeFood: false,
        afterFood: true,
        instructions: "Take after meals",
      },
    ],
    notes:
      "Rest, warm fluids, saline gargles. Symptoms typically resolve in 5-7 days.",
  },
  {
    id: "tpl-asthma",
    name: "Asthma",
    description: "Maintenance therapy for persistent asthma",
    icon: "Lungs",
    color: "from-indigo-500 to-purple-500",
    diagnosis: "Bronchial Asthma",
    medicines: [
      {
        name: "Salbutamol",
        genericName: "Albuterol Sulfate",
        brand: "Ventolin",
        strength: "100mcg",
        dosage: "100mcg",
        frequency: "As needed",
        duration: "30",
        durationUnit: "days",
        category: "Bronchodilator",
        morning: false,
        afternoon: false,
        evening: false,
        night: false,
        beforeFood: false,
        afterFood: false,
        instructions: "Use as needed for symptom relief. Max 4 times daily.",
      },
    ],
    notes:
      "Use rescue inhaler as needed. Follow up for pulmonary function test.",
  },
  {
    id: "tpl-custom",
    name: "Custom Template",
    description: "Start from scratch with a blank prescription",
    icon: "FilePlus",
    color: "from-slate-500 to-slate-600",
    diagnosis: "",
    medicines: [],
    notes: "",
  },
];

/* ── Mock Prescriptions ── */

const sharedMedicine1: MedicineItem = {
  id: "rx-med-1",
  name: "Amoxicillin",
  genericName: "Amoxicillin",
  brand: "Amoxil",
  strength: "500mg",
  dosage: "500mg",
  frequency: "Three times daily",
  duration: "7",
  durationUnit: "days",
  category: "Antibiotic",
  morning: true,
  afternoon: true,
  evening: true,
  night: false,
  beforeFood: false,
  afterFood: true,
  instructions: "Complete the full course of antibiotics",
};

const sharedMedicine2: MedicineItem = {
  id: "rx-med-2",
  name: "Metformin",
  genericName: "Metformin HCl",
  brand: "Glucophage",
  strength: "500mg",
  dosage: "500mg",
  frequency: "Twice daily",
  duration: "90",
  durationUnit: "days",
  category: "Antidiabetic",
  morning: true,
  afternoon: false,
  evening: true,
  night: false,
  beforeFood: false,
  afterFood: true,
  instructions: "Take after breakfast and dinner",
};

const sharedMedicine3: MedicineItem = {
  id: "rx-med-3",
  name: "Amlodipine",
  genericName: "Amlodipine Besylate",
  brand: "Norvasc",
  strength: "5mg",
  dosage: "5mg",
  frequency: "Once daily",
  duration: "30",
  durationUnit: "days",
  category: "Antihypertensive",
  morning: true,
  afternoon: false,
  evening: false,
  night: false,
  beforeFood: false,
  afterFood: false,
  instructions: "Take at the same time each day",
};

const sharedMedicine4: MedicineItem = {
  id: "rx-med-4",
  name: "Atorvastatin",
  genericName: "Atorvastatin Calcium",
  brand: "Lipitor",
  strength: "10mg",
  dosage: "10mg",
  frequency: "Once daily",
  duration: "90",
  durationUnit: "days",
  category: "Antihyperlipidemic",
  morning: false,
  afternoon: false,
  evening: false,
  night: true,
  beforeFood: false,
  afterFood: false,
  instructions: "Take at bedtime",
};

export const mockPrescriptions: PrescriptionRecord[] = [
  {
    id: "rx-001",
    prescriptionId: "RX-2024-001",
    patientId: "PAT-001",
    patientName: "Sarah Johnson",
    patientInitials: "SJ",
    patientAvatarGradient: "from-dash-primary to-dash-primary-dark",
    patientAge: 34,
    patientGender: "Female",
    doctorName: "Dr. Emily Carter",
    doctorId: "DOC-001",
    diagnosis: "Acute Sinusitis",
    medicines: [sharedMedicine1],
    notes:
      "Patient presented with facial pressure and green nasal discharge. Prescribed antibiotics for 7 days.",
    followUpDate: "2024-04-21",
    createdDate: "2024-04-14",
    createdBy: "Dr. Emily Carter",
    status: "Active",
    templateUsed: null,
    refills: 0,
    refillsUsed: 0,
  },
  {
    id: "rx-002",
    prescriptionId: "RX-2024-002",
    patientId: "PAT-003",
    patientName: "Marcus Rivera",
    patientInitials: "MR",
    patientAvatarGradient: "from-amber-400 to-orange-500",
    patientAge: 45,
    patientGender: "Male",
    doctorName: "Dr. Emily Carter",
    doctorId: "DOC-001",
    diagnosis: "Type 2 Diabetes Mellitus",
    medicines: [sharedMedicine2],
    notes:
      "Established patient with diabetes. Continuing metformin therapy. HbA1c improving.",
    followUpDate: "2024-07-14",
    createdDate: "2024-04-10",
    createdBy: "Dr. Emily Carter",
    status: "Active",
    templateUsed: "tpl-diabetes",
    refills: 2,
    refillsUsed: 0,
  },
  {
    id: "rx-003",
    prescriptionId: "RX-2024-003",
    patientId: "PAT-005",
    patientName: "Emily Watson",
    patientInitials: "EW",
    patientAvatarGradient: "from-purple-400 to-pink-500",
    patientAge: 52,
    patientGender: "Female",
    doctorName: "Dr. James Mitchell",
    doctorId: "DOC-003",
    diagnosis: "Essential Hypertension",
    medicines: [sharedMedicine3],
    notes: "Recently diagnosed with hypertension. Starting amlodipine 5mg.",
    followUpDate: "2024-05-12",
    createdDate: "2024-04-08",
    createdBy: "Dr. James Mitchell",
    status: "Active",
    templateUsed: "tpl-hypertension",
    refills: 3,
    refillsUsed: 0,
  },
  {
    id: "rx-004",
    prescriptionId: "RX-2024-004",
    patientId: "PAT-002",
    patientName: "Robert Chen",
    patientInitials: "RC",
    patientAvatarGradient: "from-emerald-400 to-teal-500",
    patientAge: 58,
    patientGender: "Male",
    doctorName: "Dr. Emily Carter",
    doctorId: "DOC-001",
    diagnosis: "Hyperlipidemia, Hypertension",
    medicines: [sharedMedicine3, sharedMedicine4],
    notes:
      "Combination therapy for hypertension and high cholesterol. Monitoring liver function.",
    followUpDate: "2024-07-08",
    createdDate: "2024-04-05",
    createdBy: "Dr. Emily Carter",
    status: "Active",
    templateUsed: null,
    refills: 3,
    refillsUsed: 1,
  },
  {
    id: "rx-005",
    prescriptionId: "RX-2024-005",
    patientId: "PAT-007",
    patientName: "Lisa Anderson",
    patientInitials: "LA",
    patientAvatarGradient: "from-rose-400 to-red-500",
    patientAge: 29,
    patientGender: "Female",
    doctorName: "Dr. Sarah Patel",
    doctorId: "DOC-002",
    diagnosis: "Acute Bronchitis",
    medicines: [
      {
        ...sharedMedicine1,
        id: "rx-med-5",
        instructions: "Take with food. Complete full course.",
      },
    ],
    notes:
      "Persistent cough with productive sputum. Prescribed antibiotics and advised rest.",
    followUpDate: "2024-04-18",
    createdDate: "2024-04-03",
    createdBy: "Dr. Sarah Patel",
    status: "Completed",
    templateUsed: "tpl-fever",
    refills: 0,
    refillsUsed: 0,
  },
  {
    id: "rx-006",
    prescriptionId: "RX-2024-006",
    patientId: "PAT-006",
    patientName: "David Kim",
    patientInitials: "DK",
    patientAvatarGradient: "from-blue-400 to-indigo-500",
    patientAge: 41,
    patientGender: "Male",
    doctorName: "Dr. James Mitchell",
    doctorId: "DOC-003",
    diagnosis: "Bronchial Asthma",
    medicines: [
      {
        id: "rx-med-6",
        name: "Salbutamol",
        genericName: "Albuterol Sulfate",
        brand: "Ventolin",
        strength: "100mcg",
        dosage: "100mcg",
        frequency: "As needed",
        duration: "30",
        durationUnit: "days",
        category: "Bronchodilator",
        morning: false,
        afternoon: false,
        evening: false,
        night: false,
        beforeFood: false,
        afterFood: false,
        instructions: "Use as needed for symptom relief. Max 4 times daily.",
      },
    ],
    notes:
      "Mild persistent asthma. Using rescue inhaler PRN. Consider starting maintenance therapy.",
    followUpDate: "2024-05-03",
    createdDate: "2024-04-01",
    createdBy: "Dr. James Mitchell",
    status: "Active",
    templateUsed: "tpl-asthma",
    refills: 1,
    refillsUsed: 0,
  },
  {
    id: "rx-007",
    prescriptionId: "RX-2024-007",
    patientId: "PAT-004",
    patientName: "Maria Garcia",
    patientInitials: "MG",
    patientAvatarGradient: "from-pink-400 to-rose-500",
    patientAge: 37,
    patientGender: "Female",
    doctorName: "Dr. Emily Carter",
    doctorId: "DOC-001",
    diagnosis: "Upper Respiratory Tract Infection",
    medicines: [
      {
        ...sharedMedicine1,
        id: "rx-med-7",
        dosage: "250mg",
        strength: "250mg",
        instructions: "Take after meals. Finish entire course.",
      },
    ],
    notes: "Mild URTI symptoms. Short course of antibiotics.",
    followUpDate: null,
    createdDate: "2024-03-28",
    createdBy: "Dr. Emily Carter",
    status: "Completed",
    templateUsed: null,
    refills: 0,
    refillsUsed: 0,
  },
  {
    id: "rx-008",
    prescriptionId: "RX-2024-008",
    patientId: "PAT-008",
    patientName: "James Wilson",
    patientInitials: "JW",
    patientAvatarGradient: "from-slate-400 to-slate-500",
    patientAge: 67,
    patientGender: "Male",
    doctorName: "Dr. Sarah Patel",
    doctorId: "DOC-002",
    diagnosis: "Type 2 Diabetes, Hypertension",
    medicines: [sharedMedicine2, sharedMedicine3],
    notes:
      "Elderly patient with multiple comorbidities. Close monitoring required.",
    followUpDate: "2024-05-30",
    createdDate: "2024-03-25",
    createdBy: "Dr. Sarah Patel",
    status: "Active",
    templateUsed: "tpl-diabetes",
    refills: 3,
    refillsUsed: 2,
  },
  {
    id: "rx-009",
    prescriptionId: "RX-2024-009",
    patientId: "PAT-001",
    patientName: "Sarah Johnson",
    patientInitials: "SJ",
    patientAvatarGradient: "from-dash-primary to-dash-primary-dark",
    patientAge: 34,
    patientGender: "Female",
    doctorName: "Dr. Emily Carter",
    doctorId: "DOC-001",
    diagnosis: "Migraine",
    medicines: [
      {
        id: "rx-med-9",
        name: "Ibuprofen",
        genericName: "Ibuprofen",
        brand: "Advil",
        strength: "600mg",
        dosage: "600mg",
        frequency: "As needed",
        duration: "10",
        durationUnit: "days",
        category: "NSAID",
        morning: false,
        afternoon: false,
        evening: false,
        night: false,
        beforeFood: false,
        afterFood: true,
        instructions: "Take at onset of migraine. Max 3 tablets per day.",
      },
    ],
    notes:
      "Patient experiences migraines 2-3 times per month. Prescribed NSAID for acute relief.",
    followUpDate: null,
    createdDate: "2024-03-20",
    createdBy: "Dr. Emily Carter",
    status: "Completed",
    templateUsed: null,
    refills: 1,
    refillsUsed: 1,
  },
  {
    id: "rx-010",
    prescriptionId: "RX-2024-010",
    patientId: "PAT-009",
    patientName: "Sophia Martinez",
    patientInitials: "SM",
    patientAvatarGradient: "from-violet-400 to-purple-500",
    patientAge: 25,
    patientGender: "Female",
    doctorName: "Dr. James Mitchell",
    doctorId: "DOC-003",
    diagnosis: "Acute Pharyngitis",
    medicines: [
      {
        id: "rx-med-10",
        name: "Azithromycin",
        genericName: "Azithromycin",
        brand: "Zithromax",
        strength: "250mg",
        dosage: "250mg",
        frequency: "Once daily",
        duration: "5",
        durationUnit: "days",
        category: "Antibiotic",
        morning: true,
        afternoon: false,
        evening: false,
        night: false,
        beforeFood: false,
        afterFood: true,
        instructions:
          "Take on an empty stomach or with food. Finish entire course.",
      },
    ],
    notes: "Strep throat confirmed. Z-pack prescribed for 5 days.",
    followUpDate: "2024-04-02",
    createdDate: "2024-03-18",
    createdBy: "Dr. James Mitchell",
    status: "Completed",
    templateUsed: null,
    refills: 0,
    refillsUsed: 0,
  },
  {
    id: "rx-011",
    prescriptionId: "RX-2024-011",
    patientId: "PAT-003",
    patientName: "Marcus Rivera",
    patientInitials: "MR",
    patientAvatarGradient: "from-amber-400 to-orange-500",
    patientAge: 45,
    patientGender: "Male",
    doctorName: "Dr. Emily Carter",
    doctorId: "DOC-001",
    diagnosis: "Diabetic Neuropathy",
    medicines: [
      {
        id: "rx-med-11",
        name: "Prednisone",
        genericName: "Prednisone",
        brand: "Deltasone",
        strength: "10mg",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "14",
        durationUnit: "days",
        category: "Corticosteroid",
        morning: true,
        afternoon: false,
        evening: false,
        night: false,
        beforeFood: true,
        afterFood: false,
        instructions: "Take in the morning with breakfast. Taper as directed.",
      },
    ],
    notes: "Short course for diabetic neuropathy flare-up.",
    followUpDate: "2024-04-15",
    createdDate: "2024-03-15",
    createdBy: "Dr. Emily Carter",
    status: "Discontinued",
    templateUsed: null,
    refills: 0,
    refillsUsed: 0,
  },
  {
    id: "rx-012",
    prescriptionId: "RX-2024-012",
    patientId: "PAT-010",
    patientName: "Oliver Brown",
    patientInitials: "OB",
    patientAvatarGradient: "from-teal-500 to-dash-primary",
    patientAge: 72,
    patientGender: "Male",
    doctorName: "Dr. Sarah Patel",
    doctorId: "DOC-002",
    diagnosis: "Atrial Fibrillation",
    medicines: [
      {
        id: "rx-med-12",
        name: "Warfarin",
        genericName: "Warfarin Sodium",
        brand: "Coumadin",
        strength: "5mg",
        dosage: "5mg",
        frequency: "Once daily",
        duration: "365",
        durationUnit: "days",
        category: "Anticoagulant",
        morning: false,
        afternoon: false,
        evening: false,
        night: true,
        beforeFood: false,
        afterFood: false,
        instructions: "Take at bedtime. Monitor INR regularly as scheduled.",
      },
    ],
    notes: "Long-term anticoagulation for AFib. INR target 2.0-3.0.",
    followUpDate: "2024-04-22",
    createdDate: "2024-03-10",
    createdBy: "Dr. Sarah Patel",
    status: "Expired",
    templateUsed: null,
    refills: 5,
    refillsUsed: 5,
  },
];

/* ── Filter / Search Helpers ── */

export function filterPrescriptions(
  prescriptions: PrescriptionRecord[],
  filters: FilterState,
): PrescriptionRecord[] {
  let result = [...prescriptions];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.prescriptionId.toLowerCase().includes(q) ||
        p.patientName.toLowerCase().includes(q) ||
        p.diagnosis.toLowerCase().includes(q) ||
        p.medicines.some((m) => m.name.toLowerCase().includes(q)),
    );
  }
  if (filters.patient) {
    const q = filters.patient.toLowerCase();
    result = result.filter((p) => p.patientName.toLowerCase().includes(q));
  }
  if (filters.medicine) {
    const q = filters.medicine.toLowerCase();
    result = result.filter((p) =>
      p.medicines.some((m) => m.name.toLowerCase().includes(q)),
    );
  }
  if (filters.doctor) {
    const q = filters.doctor.toLowerCase();
    result = result.filter((p) => p.doctorName.toLowerCase().includes(q));
  }
  if (filters.status) {
    result = result.filter((p) => p.status === filters.status);
  }
  if (filters.date) {
    result = result.filter((p) => p.createdDate === filters.date);
  }
  if (filters.prescriptionId) {
    const q = filters.prescriptionId.toLowerCase();
    result = result.filter((p) => p.prescriptionId.toLowerCase().includes(q));
  }

  switch (filters.sort) {
    case "date-desc":
      result.sort(
        (a, b) =>
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime(),
      );
      break;
    case "date-asc":
      result.sort(
        (a, b) =>
          new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
      );
      break;
    case "patient-asc":
      result.sort((a, b) => a.patientName.localeCompare(b.patientName));
      break;
    case "patient-desc":
      result.sort((a, b) => b.patientName.localeCompare(a.patientName));
      break;
    case "status":
      const statusOrder: Record<string, number> = {
        Active: 0,
        Pending: 1,
        Completed: 2,
        Discontinued: 3,
        Expired: 4,
      };
      result.sort(
        (a, b) => (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99),
      );
      break;
  }

  return result;
}

/* ── Generate a new prescription ID ── */

let prescriptionCounter = 13;

export function generatePrescriptionId(): string {
  const year = new Date().getFullYear();
  const id = String(prescriptionCounter++).padStart(3, "0");
  return `RX-${year}-${id}`;
}
