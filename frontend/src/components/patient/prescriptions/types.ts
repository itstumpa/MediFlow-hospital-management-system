// ============================================================
// Types & Mock Data — Prescriptions Page
// ============================================================

import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

/* ─── Status ─── */

export type PrescriptionStatus = "active" | "completed" | "expired";

export const statusLabels: Record<PrescriptionStatus, string> = {
  active: "Active",
  completed: "Completed",
  expired: "Expired",
};

export const statusIcons: Record<PrescriptionStatus, LucideIcon> = {
  active: CheckCircle2,
  completed: Clock,
  expired: XCircle,
};

export const statusConfig: Record<
  PrescriptionStatus,
  { label: string; className: string; dot: string }
> = {
  active: {
    label: "Active",
    className:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  completed: {
    label: "Completed",
    className:
      "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  expired: {
    label: "Expired",
    className: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    dot: "bg-red-500",
  },
};

/* ─── Medication Schedule ─── */

export interface MedicationTime {
  time: string;
  label: string;
  taken: boolean;
}

export interface MedicationSchedule {
  morning: MedicationTime[];
  afternoon: MedicationTime[];
  evening: MedicationTime[];
  night: MedicationTime[];
}

/* ─── Doctor ─── */

export interface PrescriptionDoctor {
  id: string;
  name: string;
  initials: string;
  department: string;
  avatar: string;
}

/* ─── Prescription ─── */

export interface Prescription {
  id: string;
  medicine: string;
  genericName: string;
  doctor: PrescriptionDoctor;
  department: string;
  datePrescribed: string;
  expiryDate: string;
  dosage: string;
  frequency: string;
  duration: string;
  refillsTotal: number;
  refillsUsed: number;
  status: PrescriptionStatus;
  purpose: string;
  instructions: string;
  sideEffects: string[];
  warnings: string[];
  notes: string;
  schedule: MedicationSchedule;
}

/* ─── Filters ─── */

export type PrescriptionViewMode = "cards" | "table";
export type PrescriptionTab = "active" | "completed" | "expired" | "all";

export interface PrescriptionFilters {
  search: string;
  doctor: string;
  department: string;
  status: PrescriptionStatus | "";
  dateFrom: string;
  dateTo: string;
  sort: "date-desc" | "date-asc" | "medicine" | "doctor" | "status";
  tab: PrescriptionTab;
}

export const DEFAULT_PRESCRIPTION_FILTERS: PrescriptionFilters = {
  search: "",
  doctor: "",
  department: "",
  status: "",
  dateFrom: "",
  dateTo: "",
  sort: "date-desc",
  tab: "active",
};

/* ─── Statistics ─── */

export interface PrescriptionStats {
  active: number;
  completed: number;
  expired: number;
  refillsRemaining: number;
  totalDoctors: number;
}

/* ─── Helper functions ─── */

export function computeStats(prescriptions: Prescription[]): PrescriptionStats {
  return {
    active: prescriptions.filter((p) => p.status === "active").length,
    completed: prescriptions.filter((p) => p.status === "completed").length,
    expired: prescriptions.filter((p) => p.status === "expired").length,
    refillsRemaining: prescriptions.reduce(
      (sum, p) => sum + (p.refillsTotal - p.refillsUsed),
      0,
    ),
    totalDoctors: new Set(prescriptions.map((p) => p.doctor.id)).size,
  };
}

export function filterPrescriptions(
  prescriptions: Prescription[],
  filters: PrescriptionFilters,
): Prescription[] {
  return prescriptions.filter((p) => {
    // Tab filter
    if (filters.tab !== "all" && p.status !== filters.tab) return false;

    // Status filter
    if (filters.status && p.status !== filters.status) return false;

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchesSearch =
        p.medicine.toLowerCase().includes(q) ||
        p.genericName.toLowerCase().includes(q) ||
        p.doctor.name.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q) ||
        p.purpose.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    // Doctor
    if (filters.doctor && p.doctor.id !== filters.doctor) return false;

    // Department
    if (filters.department && p.department !== filters.department) return false;

    // Date range
    if (filters.dateFrom && p.datePrescribed < filters.dateFrom) return false;
    if (filters.dateTo && p.datePrescribed > filters.dateTo) return false;

    return true;
  });
}

export function sortPrescriptions(
  prescriptions: Prescription[],
  sort: PrescriptionFilters["sort"],
): Prescription[] {
  const sorted = [...prescriptions];
  switch (sort) {
    case "date-desc":
      return sorted.sort(
        (a, b) =>
          new Date(b.datePrescribed).getTime() -
          new Date(a.datePrescribed).getTime(),
      );
    case "date-asc":
      return sorted.sort(
        (a, b) =>
          new Date(a.datePrescribed).getTime() -
          new Date(b.datePrescribed).getTime(),
      );
    case "medicine":
      return sorted.sort((a, b) => a.medicine.localeCompare(b.medicine));
    case "doctor":
      return sorted.sort((a, b) => a.doctor.name.localeCompare(b.doctor.name));
    case "status": {
      const order: PrescriptionStatus[] = ["active", "completed", "expired"];
      return sorted.sort(
        (a, b) => order.indexOf(a.status) - order.indexOf(b.status),
      );
    }
    default:
      return sorted;
  }
}

/* ─── Mock data ─── */

export const mockDoctors: PrescriptionDoctor[] = [
  {
    id: "doc-1",
    name: "Dr. Sarah Chen",
    initials: "SC",
    department: "Cardiology",
    avatar: "",
  },
  {
    id: "doc-2",
    name: "Dr. Michael Mitchell",
    initials: "MM",
    department: "Internal Medicine",
    avatar: "",
  },
  {
    id: "doc-3",
    name: "Dr. James Wilson",
    initials: "JW",
    department: "Orthopedics",
    avatar: "",
  },
  {
    id: "doc-4",
    name: "Dr. Emily Rodriguez",
    initials: "ER",
    department: "Endocrinology",
    avatar: "",
  },
  {
    id: "doc-5",
    name: "Dr. Priya Patel",
    initials: "PP",
    department: "Pulmonology",
    avatar: "",
  },
  {
    id: "doc-6",
    name: "Dr. David Kim",
    initials: "DK",
    department: "Neurology",
    avatar: "",
  },
];

export const allDepartments = [
  "Cardiology",
  "Internal Medicine",
  "Orthopedics",
  "Endocrinology",
  "Pulmonology",
  "Neurology",
  "Gastroenterology",
  "Dermatology",
];

export const mockPrescriptions: Prescription[] = [
  {
    id: "rx-1",
    medicine: "Amoxicillin",
    genericName: "Amoxicillin Trihydrate",
    doctor: mockDoctors[0],
    department: "Cardiology",
    datePrescribed: "2026-07-01",
    expiryDate: "2026-07-15",
    dosage: "500mg",
    frequency: "3 times daily",
    duration: "10 days",
    refillsTotal: 2,
    refillsUsed: 0,
    status: "active",
    purpose:
      "Treatment of bacterial infection — prescribed for suspected endocarditis prophylaxis.",
    instructions:
      "Take with food to reduce stomach upset. Complete the full course even if you feel better. Swallow tablets whole with a full glass of water.",
    sideEffects: ["Nausea or vomiting", "Diarrhea", "Skin rash", "Headache"],
    warnings: [
      "Do not take if allergic to penicillin-class antibiotics.",
      "May reduce effectiveness of oral contraceptives — use backup contraception.",
      "Avoid alcohol during treatment.",
    ],
    notes:
      "Patient has history of mild allergic reaction to sulfa drugs — amoxicillin is safe alternative.",
    schedule: {
      morning: [
        { time: "07:00", label: "Breakfast", taken: true },
        { time: "08:00", label: "Post-meal", taken: true },
      ],
      afternoon: [{ time: "13:00", label: "Lunch", taken: false }],
      evening: [{ time: "20:00", label: "Dinner", taken: false }],
      night: [],
    },
  },
  {
    id: "rx-2",
    medicine: "Lisinopril",
    genericName: "Lisinopril Dihydrate",
    doctor: mockDoctors[1],
    department: "Internal Medicine",
    datePrescribed: "2026-06-20",
    expiryDate: "2026-08-20",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "90 days",
    refillsTotal: 3,
    refillsUsed: 0,
    status: "active",
    purpose:
      "Management of hypertension — helps relax blood vessels to lower blood pressure.",
    instructions:
      "Take at the same time each day, preferably in the morning. Can be taken with or without food. Do not stop suddenly without consulting your doctor.",
    sideEffects: ["Dry cough", "Dizziness", "Headache", "Fatigue"],
    warnings: [
      "Monitor blood pressure regularly.",
      "Avoid potassium supplements and salt substitutes.",
      "May cause dizziness — avoid driving until you know how it affects you.",
      "Do not use if pregnant or planning to become pregnant.",
    ],
    notes:
      "BP was 145/92 at last visit. Target is below 130/80. Follow-up in 4 weeks.",
    schedule: {
      morning: [{ time: "07:30", label: "Morning", taken: true }],
      afternoon: [],
      evening: [],
      night: [],
    },
  },
  {
    id: "rx-3",
    medicine: "Ibuprofen",
    genericName: "Ibuprofen BP",
    doctor: mockDoctors[2],
    department: "Orthopedics",
    datePrescribed: "2026-05-15",
    expiryDate: "2026-08-15",
    dosage: "400mg",
    frequency: "As needed (max 3 times daily)",
    duration: "30 days",
    refillsTotal: 1,
    refillsUsed: 1,
    status: "active",
    purpose:
      "Anti-inflammatory and pain relief for knee joint pain and inflammation.",
    instructions:
      "Take with food or milk to reduce stomach irritation. Do not exceed 3 tablets in 24 hours. Use only when experiencing pain.",
    sideEffects: [
      "Stomach pain or heartburn",
      "Nausea",
      "Drowsiness",
      "Mild dizziness",
    ],
    warnings: [
      "Do not take with other NSAIDs or blood thinners.",
      "Avoid long-term use without medical supervision.",
      "May increase risk of stomach bleeding — watch for dark stools.",
      "Do not take if you have a history of stomach ulcers.",
    ],
    notes:
      "Patient reports improved mobility since starting. Continue with physical therapy.",
    schedule: {
      morning: [{ time: "08:00", label: "Breakfast", taken: false }],
      afternoon: [{ time: "14:00", label: "Lunch", taken: true }],
      evening: [{ time: "20:00", label: "Dinner", taken: false }],
      night: [],
    },
  },
  {
    id: "rx-4",
    medicine: "Metformin",
    genericName: "Metformin Hydrochloride",
    doctor: mockDoctors[3],
    department: "Endocrinology",
    datePrescribed: "2026-03-10",
    expiryDate: "2026-06-10",
    dosage: "850mg",
    frequency: "Twice daily",
    duration: "90 days",
    refillsTotal: 0,
    refillsUsed: 2,
    status: "expired",
    purpose:
      "Management of Type 2 Diabetes — improves blood sugar control by reducing glucose production.",
    instructions:
      "Take with meals to reduce gastrointestinal side effects. Swallow tablets whole. Monitor blood sugar levels regularly.",
    sideEffects: [
      "Nausea or vomiting",
      "Diarrhea",
      "Metallic taste",
      "Loss of appetite",
    ],
    warnings: [
      "Risk of lactic acidosis — seek immediate help if you experience muscle pain, trouble breathing, or unusual drowsiness.",
      "Avoid alcohol while taking this medication.",
      "May cause vitamin B12 deficiency with long-term use.",
    ],
    notes:
      "HbA1c reduced from 8.2 to 7.1 over 3 months. Schedule follow-up for new prescription.",
    schedule: {
      morning: [{ time: "07:30", label: "Breakfast", taken: true }],
      afternoon: [],
      evening: [{ time: "19:30", label: "Dinner", taken: true }],
      night: [],
    },
  },
  {
    id: "rx-5",
    medicine: "Omeprazole",
    genericName: "Omeprazole Magnesium",
    doctor: mockDoctors[1],
    department: "Gastroenterology",
    datePrescribed: "2026-06-01",
    expiryDate: "2026-07-01",
    dosage: "20mg",
    frequency: "Once daily",
    duration: "30 days",
    refillsTotal: 0,
    refillsUsed: 0,
    status: "completed",
    purpose:
      "Treatment of GERD and acid reflux — reduces stomach acid production.",
    instructions:
      "Take at least 30 minutes before breakfast for best results. Swallow capsule whole — do not crush or chew. Complete the 30-day course.",
    sideEffects: ["Headache", "Nausea", "Abdominal pain", "Gas or bloating"],
    warnings: [
      "Long-term use may increase risk of bone fractures.",
      "May mask symptoms of gastric malignancy.",
      "May interfere with Vitamin B12 absorption.",
    ],
    notes:
      "Course completed successfully. Symptoms resolved. No further prescription needed at this time.",
    schedule: {
      morning: [{ time: "06:45", label: "Pre-breakfast", taken: true }],
      afternoon: [],
      evening: [],
      night: [],
    },
  },
  {
    id: "rx-6",
    medicine: "Albuterol",
    genericName: "Albuterol Sulfate",
    doctor: mockDoctors[4],
    department: "Pulmonology",
    datePrescribed: "2026-07-05",
    expiryDate: "2026-10-05",
    dosage: "90mcg",
    frequency: "2 puffs as needed (max 4 times daily)",
    duration: "90 days",
    refillsTotal: 3,
    refillsUsed: 0,
    status: "active",
    purpose:
      "Relief of bronchospasm in asthma — quick-relief bronchodilator for breathing difficulties.",
    instructions:
      "Shake inhaler well before each use. Exhale fully, then inhale slowly while pressing the canister. Hold breath for 10 seconds. Rinse mouth after use.",
    sideEffects: [
      "Shakiness or tremor",
      "Increased heart rate",
      "Nervousness",
      "Throat irritation",
    ],
    warnings: [
      "If you need more than 2 puffs per week for symptom relief, see your doctor.",
      "Seek emergency care if breathing does not improve after use.",
      "Do not exceed recommended dosage.",
    ],
    notes:
      "Peak flow has improved. Continue with maintenance inhaler (Fluticasone) as prescribed.",
    schedule: {
      morning: [{ time: "07:00", label: "Morning dose", taken: true }],
      afternoon: [],
      evening: [{ time: "19:00", label: "Evening dose", taken: true }],
      night: [{ time: "23:00", label: "Before bed", taken: false }],
    },
  },
  {
    id: "rx-7",
    medicine: "Gabapentin",
    genericName: "Gabapentin BP",
    doctor: mockDoctors[5],
    department: "Neurology",
    datePrescribed: "2026-06-15",
    expiryDate: "2026-09-15",
    dosage: "300mg",
    frequency: "3 times daily",
    duration: "90 days",
    refillsTotal: 2,
    refillsUsed: 1,
    status: "active",
    purpose:
      "Management of neuropathic pain and prevention of migraine episodes.",
    instructions:
      "Take with or without food. Doses should be spaced evenly throughout the day. Do not stop abruptly — taper off under medical supervision.",
    sideEffects: [
      "Drowsiness or dizziness",
      "Fatigue",
      "Blurred vision",
      "Coordination problems",
    ],
    warnings: [
      "May cause dizziness — avoid driving or operating machinery until you know how it affects you.",
      "Do not consume alcohol — may increase side effects.",
      "May cause suicidal thoughts — report mood changes immediately.",
    ],
    notes:
      "Patient reports 60% reduction in migraine frequency. Titrating up to 600mg over next 2 weeks.",
    schedule: {
      morning: [{ time: "08:00", label: "Morning", taken: true }],
      afternoon: [{ time: "14:00", label: "Afternoon", taken: true }],
      evening: [{ time: "20:00", label: "Evening", taken: true }],
      night: [],
    },
  },
  {
    id: "rx-8",
    medicine: "Atorvastatin",
    genericName: "Atorvastatin Calcium",
    doctor: mockDoctors[0],
    department: "Cardiology",
    datePrescribed: "2026-04-01",
    expiryDate: "2026-07-01",
    dosage: "20mg",
    frequency: "Once daily at bedtime",
    duration: "90 days",
    refillsTotal: 1,
    refillsUsed: 1,
    status: "completed",
    purpose:
      "Management of high cholesterol — reduces LDL cholesterol and triglycerides.",
    instructions:
      "Take in the evening for maximum effectiveness. Swallow whole with water. Avoid grapefruit juice during treatment.",
    sideEffects: ["Muscle aches or pain", "Joint pain", "Nausea", "Headache"],
    warnings: [
      "Report unexplained muscle pain, tenderness, or weakness immediately — could indicate rhabdomyolysis.",
      "Avoid excessive alcohol consumption.",
      "May increase liver enzymes — periodic blood tests required.",
    ],
    notes:
      "LDL reduced from 160 to 95 after 3 months. Continuing with maintenance dose. Repeat lipid panel in 6 months.",
    schedule: {
      morning: [],
      afternoon: [],
      evening: [],
      night: [{ time: "22:00", label: "Bedtime", taken: true }],
    },
  },
];

export const mockStats: PrescriptionStats = computeStats(mockPrescriptions);
