// ============================================================
// Types & Mock Data — Lab Reports Page
// ============================================================

import type { LucideIcon } from "lucide-react";
import {
  Activity,
  CheckCircle2,
  Clock,
  Droplets,
  Heart,
  Weight,
  Zap,
} from "lucide-react";

/* ─── Status ─── */

export type ReportStatus = "pending" | "processing" | "completed" | "abnormal";

export const reportStatusConfig: Record<
  ReportStatus,
  { label: string; className: string; dotColor: string }
> = {
  pending: {
    label: "Pending",
    className:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    dotColor: "bg-amber-500",
  },
  processing: {
    label: "Processing",
    className:
      "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    dotColor: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    className:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    dotColor: "bg-emerald-500",
  },
  abnormal: {
    label: "Abnormal",
    className: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    dotColor: "bg-red-500",
  },
};

/* ─── Result flag ─── */

export type ResultFlag = "normal" | "high" | "low" | "critical";

export const resultFlagConfig: Record<
  ResultFlag,
  { label: string; className: string }
> = {
  normal: {
    label: "Normal",
    className: "text-emerald-600 dark:text-emerald-400",
  },
  high: {
    label: "High",
    className: "text-amber-600 dark:text-amber-400",
  },
  low: {
    label: "Low",
    className: "text-orange-600 dark:text-orange-400",
  },
  critical: {
    label: "Critical",
    className: "text-red-600 dark:text-red-400",
  },
};

/* ─── Result row ─── */

export interface TestResult {
  test: string;
  result: string;
  unit: string;
  referenceRange: string;
  flag: ResultFlag;
}

/* ─── Timeline step ─── */

export type TimelineStepName =
  | "requested"
  | "collected"
  | "processing"
  | "completed"
  | "downloaded";

export interface TimelineStep {
  name: TimelineStepName;
  label: string;
  date: string;
  completed: boolean;
  icon: LucideIcon;
}

/* ─── Report ─── */

export interface LabReport {
  id: string;
  testName: string;
  labId: string;
  category: string;
  department: string;
  requestedBy: string;
  requestedByAvatar: string;
  collectionDate: string;
  reportDate: string;
  status: ReportStatus;
  resultSummary: string;
  results: TestResult[];
  timeline: TimelineStep[];
  doctorComments?: string;
  patientInfo: {
    name: string;
    age: number;
    gender: string;
    bloodGroup: string;
  };
  laboratory: {
    name: string;
    address: string;
    accreditation: string;
  };
  description: string;
}

/* ─── Doctor ─── */

export interface LabDoctor {
  id: string;
  name: string;
  initials: string;
  department: string;
  avatar: string;
}

/* ─── Statistics ─── */

export interface LabStats {
  totalReports: number;
  pending: number;
  completed: number;
  abnormal: number;
  thisYear: number;
}

/* ─── Filters ─── */

export interface LabFilters {
  search: string;
  doctor: string;
  department: string;
  status: ReportStatus | "";
  dateFrom: string;
  dateTo: string;
  sort: "date-desc" | "date-asc" | "status" | "department";
}

export const DEFAULT_LAB_FILTERS: LabFilters = {
  search: "",
  doctor: "",
  department: "",
  status: "",
  dateFrom: "",
  dateTo: "",
  sort: "date-desc",
};

/* ─── View mode ─── */

export type ViewMode = "cards" | "table" | "timeline";

/* ─── Trend data ─── */

export interface TrendPoint {
  date: string;
  value: number;
}

export interface TrendMetric {
  id: string;
  label: string;
  icon: LucideIcon;
  unit: string;
  color: string;
  data: TrendPoint[];
  minNormal: number;
  maxNormal: number;
}

/* ─── Mock doctors ─── */

export const mockLabDoctors: LabDoctor[] = [
  {
    id: "DOC-001",
    name: "Dr. Michael Mitchell",
    initials: "MM",
    department: "Cardiology",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "DOC-002",
    name: "Dr. Sarah Chen",
    initials: "SC",
    department: "Endocrinology",
    avatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "DOC-003",
    name: "Dr. Emily Rodriguez",
    initials: "ER",
    department: "Pathology",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "DOC-004",
    name: "Dr. James Kim",
    initials: "JK",
    department: "Hematology",
    avatar:
      "https://images.unsplash.com/photo-1622253694242-0b5b78b8c60b?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "DOC-005",
    name: "Dr. Lisa Patel",
    initials: "LP",
    department: "Biochemistry",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "DOC-006",
    name: "Dr. Robert Tanaka",
    initials: "RT",
    department: "Microbiology",
    avatar:
      "https://images.unsplash.com/photo-1622253694242-0b5b78b8c60b?w=100&h=100&fit=crop&crop=face",
  },
];

/* ─── Mock departments ─── */

export const labDepartments: string[] = [
  "Hematology",
  "Biochemistry",
  "Endocrinology",
  "Pathology",
  "Microbiology",
  "Immunology",
  "Toxicology",
  "Genetics",
];

/* ─── Mock lab reports ─── */

function buildTimeline(
  collectionDate: string,
  reportDate: string,
  status: ReportStatus,
): TimelineStep[] {
  const requested: TimelineStep = {
    name: "requested",
    label: "Test Requested",
    date: collectionDate,
    completed: true,
    icon: Activity,
  };
  const collected: TimelineStep = {
    name: "collected",
    label: "Sample Collected",
    date: collectionDate,
    completed: true,
    icon: Droplets,
  };
  const processing: TimelineStep = {
    name: "processing",
    label: "Processing",
    date: "",
    completed:
      status === "processing" ||
      status === "completed" ||
      status === "abnormal",
    icon: Zap,
  };
  const completed: TimelineStep = {
    name: "completed",
    label: "Completed",
    date: reportDate,
    completed: status === "completed" || status === "abnormal",
    icon: CheckCircle2,
  };
  const downloaded: TimelineStep = {
    name: "downloaded",
    label: "Downloaded",
    date: "",
    completed: false,
    icon: Clock,
  };

  // Set processing date
  if (processing.completed) {
    const collect = new Date(collectionDate);
    collect.setDate(collect.getDate() + 1);
    processing.date = collect.toISOString().split("T")[0];
  }

  return [requested, collected, processing, completed, downloaded];
}

export const mockLabReports: LabReport[] = [
  {
    id: "LR-001",
    testName: "Complete Blood Count (CBC)",
    labId: "LAB-2026-0842",
    category: "Hematology",
    department: "Hematology",
    requestedBy: "Dr. Michael Mitchell",
    requestedByAvatar: mockLabDoctors[0].avatar,
    collectionDate: "2026-07-10",
    reportDate: "2026-07-12",
    status: "completed",
    resultSummary: "All counts within normal range. Slight elevation in WBC.",
    patientInfo: {
      name: "John Anderson",
      age: 34,
      gender: "Male",
      bloodGroup: "A+",
    },
    laboratory: {
      name: "MediFlow Diagnostic Lab",
      address: "123 Healthcare Ave, Medical District",
      accreditation: "CAP Accredited",
    },
    description:
      "Complete blood count evaluates overall health and detects a wide range of disorders including anemia, infection, and leukemia.",
    results: [
      {
        test: "WBC",
        result: "6.8",
        unit: "×10³/µL",
        referenceRange: "4.0–11.0",
        flag: "normal",
      },
      {
        test: "RBC",
        result: "5.1",
        unit: "×10⁶/µL",
        referenceRange: "4.7–6.1",
        flag: "normal",
      },
      {
        test: "Hemoglobin",
        result: "14.2",
        unit: "g/dL",
        referenceRange: "13.5–17.5",
        flag: "normal",
      },
      {
        test: "Hematocrit",
        result: "42.1",
        unit: "%",
        referenceRange: "38.3–48.6",
        flag: "normal",
      },
      {
        test: "MCV",
        result: "85",
        unit: "fL",
        referenceRange: "80–100",
        flag: "normal",
      },
      {
        test: "Platelets",
        result: "245",
        unit: "×10³/µL",
        referenceRange: "150–450",
        flag: "normal",
      },
      {
        test: "Neutrophils",
        result: "62",
        unit: "%",
        referenceRange: "40–80",
        flag: "normal",
      },
    ],
    timeline: buildTimeline("2026-07-10", "2026-07-12", "completed"),
    doctorComments:
      "Results are generally satisfactory. The slight WBC elevation suggests a mild immune response; monitor and repeat if symptoms develop.",
  },
  {
    id: "LR-002",
    testName: "Lipid Profile",
    labId: "LAB-2026-0843",
    category: "Biochemistry",
    department: "Biochemistry",
    requestedBy: "Dr. Michael Mitchell",
    requestedByAvatar: mockLabDoctors[0].avatar,
    collectionDate: "2026-07-10",
    reportDate: "2026-07-12",
    status: "abnormal",
    resultSummary:
      "Elevated LDL cholesterol and triglycerides. HDL below optimal.",
    patientInfo: {
      name: "John Anderson",
      age: 34,
      gender: "Male",
      bloodGroup: "A+",
    },
    laboratory: {
      name: "MediFlow Diagnostic Lab",
      address: "123 Healthcare Ave, Medical District",
      accreditation: "CAP Accredited",
    },
    description:
      "Lipid panel measures cholesterol levels to assess cardiovascular health and risk of heart disease.",
    results: [
      {
        test: "Total Cholesterol",
        result: "245",
        unit: "mg/dL",
        referenceRange: "<200",
        flag: "high",
      },
      {
        test: "LDL Cholesterol",
        result: "162",
        unit: "mg/dL",
        referenceRange: "<100",
        flag: "high",
      },
      {
        test: "HDL Cholesterol",
        result: "38",
        unit: "mg/dL",
        referenceRange: ">60",
        flag: "low",
      },
      {
        test: "Triglycerides",
        result: "210",
        unit: "mg/dL",
        referenceRange: "<150",
        flag: "high",
      },
      {
        test: "VLDL",
        result: "42",
        unit: "mg/dL",
        referenceRange: "5–40",
        flag: "high",
      },
    ],
    timeline: buildTimeline("2026-07-10", "2026-07-12", "abnormal"),
    doctorComments:
      "Elevated lipid levels confirm dyslipidemia. Patient advised on dietary modifications and prescribed atorvastatin 10mg. Follow up in 3 months.",
  },
  {
    id: "LR-003",
    testName: "Thyroid Function Test (TFT)",
    labId: "LAB-2026-0791",
    category: "Endocrinology",
    department: "Endocrinology",
    requestedBy: "Dr. Sarah Chen",
    requestedByAvatar: mockLabDoctors[1].avatar,
    collectionDate: "2026-06-25",
    reportDate: "2026-06-27",
    status: "completed",
    resultSummary: "TSH, T3, and T4 levels within normal limits.",
    patientInfo: {
      name: "John Anderson",
      age: 34,
      gender: "Male",
      bloodGroup: "A+",
    },
    laboratory: {
      name: "MediFlow Diagnostic Lab",
      address: "123 Healthcare Ave, Medical District",
      accreditation: "CAP Accredited",
    },
    description:
      "Thyroid function test evaluates the thyroid gland's ability to produce and regulate thyroid hormones.",
    results: [
      {
        test: "TSH",
        result: "2.1",
        unit: "mIU/L",
        referenceRange: "0.4–4.0",
        flag: "normal",
      },
      {
        test: "T3",
        result: "135",
        unit: "ng/dL",
        referenceRange: "80–200",
        flag: "normal",
      },
      {
        test: "T4",
        result: "8.2",
        unit: "µg/dL",
        referenceRange: "4.5–11.5",
        flag: "normal",
      },
    ],
    timeline: buildTimeline("2026-06-25", "2026-06-27", "completed"),
    doctorComments:
      "Thyroid function is normal. No intervention required at this time.",
  },
  {
    id: "LR-004",
    testName: "Comprehensive Metabolic Panel (CMP)",
    labId: "LAB-2026-0755",
    category: "Biochemistry",
    department: "Biochemistry",
    requestedBy: "Dr. Sarah Chen",
    requestedByAvatar: mockLabDoctors[1].avatar,
    collectionDate: "2026-06-10",
    reportDate: "2026-06-12",
    status: "completed",
    resultSummary: "All metabolic markers within reference ranges.",
    patientInfo: {
      name: "John Anderson",
      age: 34,
      gender: "Male",
      bloodGroup: "A+",
    },
    laboratory: {
      name: "MediFlow Diagnostic Lab",
      address: "123 Healthcare Ave, Medical District",
      accreditation: "CAP Accredited",
    },
    description:
      "Comprehensive metabolic panel evaluates kidney and liver function, electrolyte balance, and blood glucose levels.",
    results: [
      {
        test: "Glucose",
        result: "92",
        unit: "mg/dL",
        referenceRange: "70–100",
        flag: "normal",
      },
      {
        test: "BUN",
        result: "14",
        unit: "mg/dL",
        referenceRange: "7–20",
        flag: "normal",
      },
      {
        test: "Creatinine",
        result: "0.95",
        unit: "mg/dL",
        referenceRange: "0.7–1.3",
        flag: "normal",
      },
      {
        test: "Sodium",
        result: "140",
        unit: "mmol/L",
        referenceRange: "136–145",
        flag: "normal",
      },
      {
        test: "Potassium",
        result: "4.2",
        unit: "mmol/L",
        referenceRange: "3.5–5.1",
        flag: "normal",
      },
      {
        test: "ALT",
        result: "28",
        unit: "U/L",
        referenceRange: "10–40",
        flag: "normal",
      },
      {
        test: "AST",
        result: "24",
        unit: "U/L",
        referenceRange: "10–40",
        flag: "normal",
      },
    ],
    timeline: buildTimeline("2026-06-10", "2026-06-12", "completed"),
    doctorComments:
      "Metabolic panel unremarkable. Continue current management.",
  },
  {
    id: "LR-005",
    testName: "Urinalysis",
    labId: "LAB-2026-0722",
    category: "Pathology",
    department: "Pathology",
    requestedBy: "Dr. Emily Rodriguez",
    requestedByAvatar: mockLabDoctors[2].avatar,
    collectionDate: "2026-05-28",
    reportDate: "2026-05-30",
    status: "completed",
    resultSummary:
      "No abnormalities detected. Normal physical, chemical, and microscopic examination.",
    patientInfo: {
      name: "John Anderson",
      age: 34,
      gender: "Male",
      bloodGroup: "A+",
    },
    laboratory: {
      name: "MediFlow Diagnostic Lab",
      address: "123 Healthcare Ave, Medical District",
      accreditation: "CAP Accredited",
    },
    description:
      "Urinalysis provides valuable information about kidney function, urinary tract infections, and metabolic conditions.",
    results: [
      {
        test: "Color",
        result: "Yellow",
        unit: "",
        referenceRange: "Pale to Dark Yellow",
        flag: "normal",
      },
      {
        test: "Specific Gravity",
        result: "1.020",
        unit: "",
        referenceRange: "1.005–1.030",
        flag: "normal",
      },
      {
        test: "pH",
        result: "6.0",
        unit: "",
        referenceRange: "4.5–8.0",
        flag: "normal",
      },
      {
        test: "Protein",
        result: "Negative",
        unit: "",
        referenceRange: "Negative",
        flag: "normal",
      },
      {
        test: "Glucose",
        result: "Negative",
        unit: "",
        referenceRange: "Negative",
        flag: "normal",
      },
      {
        test: "Ketones",
        result: "Negative",
        unit: "",
        referenceRange: "Negative",
        flag: "normal",
      },
    ],
    timeline: buildTimeline("2026-05-28", "2026-05-30", "completed"),
  },
  {
    id: "LR-006",
    testName: "Vitamin D (25-OH)",
    labId: "LAB-2026-0688",
    category: "Endocrinology",
    department: "Endocrinology",
    requestedBy: "Dr. Emily Rodriguez",
    requestedByAvatar: mockLabDoctors[2].avatar,
    collectionDate: "2026-05-20",
    reportDate: "2026-05-22",
    status: "abnormal",
    resultSummary: "Vitamin D level significantly below normal range.",
    patientInfo: {
      name: "John Anderson",
      age: 34,
      gender: "Male",
      bloodGroup: "A+",
    },
    laboratory: {
      name: "MediFlow Diagnostic Lab",
      address: "123 Healthcare Ave, Medical District",
      accreditation: "CAP Accredited",
    },
    description:
      "Vitamin D test measures the level of 25-hydroxyvitamin D to assess nutritional status and bone health.",
    results: [
      {
        test: "25-OH Vitamin D",
        result: "18",
        unit: "ng/mL",
        referenceRange: "30–100",
        flag: "low",
      },
    ],
    timeline: buildTimeline("2026-05-20", "2026-05-22", "abnormal"),
    doctorComments:
      "Vitamin D deficiency identified. Prescribed vitamin D3 2000 IU daily for 12 weeks. Repeat test after supplementation.",
  },
  {
    id: "LR-007",
    testName: "Hemoglobin A1c",
    labId: "LAB-2026-0645",
    category: "Endocrinology",
    department: "Endocrinology",
    requestedBy: "Dr. Sarah Chen",
    requestedByAvatar: mockLabDoctors[1].avatar,
    collectionDate: "2026-05-05",
    reportDate: "2026-05-07",
    status: "completed",
    resultSummary:
      "HbA1c within prediabetic range. Improvement from previous results.",
    patientInfo: {
      name: "John Anderson",
      age: 34,
      gender: "Male",
      bloodGroup: "A+",
    },
    laboratory: {
      name: "MediFlow Diagnostic Lab",
      address: "123 Healthcare Ave, Medical District",
      accreditation: "CAP Accredited",
    },
    description:
      "Hemoglobin A1c provides a three-month average of blood glucose levels for diabetes management.",
    results: [
      {
        test: "HbA1c",
        result: "5.9",
        unit: "%",
        referenceRange: "<5.7",
        flag: "high",
      },
      {
        test: "eAG",
        result: "123",
        unit: "mg/dL",
        referenceRange: "<117",
        flag: "high",
      },
    ],
    timeline: buildTimeline("2026-05-05", "2026-05-07", "completed"),
    doctorComments:
      "HbA1c has improved from 6.2% to 5.9%. Continue lifestyle modifications and recheck in 6 months.",
  },
  {
    id: "LR-008",
    testName: "Iron Studies",
    labId: "LAB-2026-0601",
    category: "Hematology",
    department: "Hematology",
    requestedBy: "Dr. James Kim",
    requestedByAvatar: mockLabDoctors[3].avatar,
    collectionDate: "2026-04-18",
    reportDate: "2026-04-20",
    status: "completed",
    resultSummary: "Serum iron and ferritin levels within normal range.",
    patientInfo: {
      name: "John Anderson",
      age: 34,
      gender: "Male",
      bloodGroup: "A+",
    },
    laboratory: {
      name: "MediFlow Diagnostic Lab",
      address: "123 Healthcare Ave, Medical District",
      accreditation: "CAP Accredited",
    },
    description:
      "Iron studies evaluate iron metabolism and storage to diagnose anemia and iron overload conditions.",
    results: [
      {
        test: "Serum Iron",
        result: "85",
        unit: "µg/dL",
        referenceRange: "50–170",
        flag: "normal",
      },
      {
        test: "Ferritin",
        result: "65",
        unit: "ng/mL",
        referenceRange: "20–250",
        flag: "normal",
      },
      {
        test: "TIBC",
        result: "320",
        unit: "µg/dL",
        referenceRange: "250–450",
        flag: "normal",
      },
      {
        test: "Transferrin Saturation",
        result: "27",
        unit: "%",
        referenceRange: "15–45",
        flag: "normal",
      },
    ],
    timeline: buildTimeline("2026-04-18", "2026-04-20", "completed"),
  },
  {
    id: "LR-009",
    testName: "Liver Function Test (LFT)",
    labId: "LAB-2026-0558",
    category: "Biochemistry",
    department: "Biochemistry",
    requestedBy: "Dr. Robert Tanaka",
    requestedByAvatar: mockLabDoctors[5].avatar,
    collectionDate: "2026-04-02",
    reportDate: "2026-04-04",
    status: "completed",
    resultSummary: "Liver enzymes and bilirubin within normal limits.",
    patientInfo: {
      name: "John Anderson",
      age: 34,
      gender: "Male",
      bloodGroup: "A+",
    },
    laboratory: {
      name: "MediFlow Diagnostic Lab",
      address: "123 Healthcare Ave, Medical District",
      accreditation: "CAP Accredited",
    },
    description:
      "Liver function test assesses liver health by measuring enzymes, proteins, and bilirubin levels.",
    results: [
      {
        test: "ALT (SGPT)",
        result: "22",
        unit: "U/L",
        referenceRange: "10–40",
        flag: "normal",
      },
      {
        test: "AST (SGOT)",
        result: "20",
        unit: "U/L",
        referenceRange: "10–40",
        flag: "normal",
      },
      {
        test: "ALP",
        result: "68",
        unit: "U/L",
        referenceRange: "30–120",
        flag: "normal",
      },
      {
        test: "Bilirubin (Total)",
        result: "0.8",
        unit: "mg/dL",
        referenceRange: "0.1–1.2",
        flag: "normal",
      },
      {
        test: "Albumin",
        result: "4.2",
        unit: "g/dL",
        referenceRange: "3.5–5.0",
        flag: "normal",
      },
    ],
    timeline: buildTimeline("2026-04-02", "2026-04-04", "completed"),
  },
  {
    id: "LR-010",
    testName: "C-Reactive Protein (CRP)",
    labId: "LAB-2026-0512",
    category: "Immunology",
    department: "Immunology",
    requestedBy: "Dr. Michael Mitchell",
    requestedByAvatar: mockLabDoctors[0].avatar,
    collectionDate: "2026-03-15",
    reportDate: "2026-03-17",
    status: "abnormal",
    resultSummary: "Elevated CRP indicating systemic inflammation.",
    patientInfo: {
      name: "John Anderson",
      age: 34,
      gender: "Male",
      bloodGroup: "A+",
    },
    laboratory: {
      name: "MediFlow Diagnostic Lab",
      address: "123 Healthcare Ave, Medical District",
      accreditation: "CAP Accredited",
    },
    description:
      "C-reactive protein test measures inflammation levels in the body, useful for detecting and monitoring inflammatory conditions.",
    results: [
      {
        test: "CRP",
        result: "12.4",
        unit: "mg/L",
        referenceRange: "<3.0",
        flag: "high",
      },
    ],
    timeline: buildTimeline("2026-03-15", "2026-03-17", "abnormal"),
    doctorComments:
      "Elevated CRP suggests ongoing inflammation. Further investigation recommended. Patient referred to rheumatology.",
  },
  {
    id: "LR-011",
    testName: "Blood Glucose (Fasting)",
    labId: "LAB-2026-0478",
    category: "Biochemistry",
    department: "Biochemistry",
    requestedBy: "Dr. Sarah Chen",
    requestedByAvatar: mockLabDoctors[1].avatar,
    collectionDate: "2026-02-28",
    reportDate: "2026-02-28",
    status: "completed",
    resultSummary: "Fasting glucose within normal range.",
    patientInfo: {
      name: "John Anderson",
      age: 34,
      gender: "Male",
      bloodGroup: "A+",
    },
    laboratory: {
      name: "MediFlow Diagnostic Lab",
      address: "123 Healthcare Ave, Medical District",
      accreditation: "CAP Accredited",
    },
    description:
      "Fasting blood glucose measures blood sugar after an overnight fast to screen for diabetes.",
    results: [
      {
        test: "Fasting Glucose",
        result: "88",
        unit: "mg/dL",
        referenceRange: "70–100",
        flag: "normal",
      },
    ],
    timeline: buildTimeline("2026-02-28", "2026-02-28", "completed"),
  },
  {
    id: "LR-012",
    testName: "HbA1c (Follow-up)",
    labId: "LAB-2026-0420",
    category: "Endocrinology",
    department: "Endocrinology",
    requestedBy: "Dr. Sarah Chen",
    requestedByAvatar: mockLabDoctors[1].avatar,
    collectionDate: "2026-02-10",
    reportDate: "2026-02-12",
    status: "completed",
    resultSummary: "HbA1c at 6.2% — within prediabetic range.",
    patientInfo: {
      name: "John Anderson",
      age: 34,
      gender: "Male",
      bloodGroup: "A+",
    },
    laboratory: {
      name: "MediFlow Diagnostic Lab",
      address: "123 Healthcare Ave, Medical District",
      accreditation: "CAP Accredited",
    },
    description:
      "Follow-up hemoglobin A1c to monitor glucose control over time.",
    results: [
      {
        test: "HbA1c",
        result: "6.2",
        unit: "%",
        referenceRange: "<5.7",
        flag: "high",
      },
    ],
    timeline: buildTimeline("2026-02-10", "2026-02-12", "completed"),
    doctorComments:
      "Prediabetic range. Continue dietary modifications and increase physical activity. Metformin discussed but not yet initiated.",
  },
  {
    id: "LR-013",
    testName: "Blood Glucose (Fasting)",
    labId: "LAB-2026-0385",
    category: "Biochemistry",
    department: "Biochemistry",
    requestedBy: "Dr. Sarah Chen",
    requestedByAvatar: mockLabDoctors[1].avatar,
    collectionDate: "2025-10-15",
    reportDate: "2025-10-15",
    status: "completed",
    resultSummary: "Fasting glucose elevated at 108 mg/dL.",
    patientInfo: {
      name: "John Anderson",
      age: 33,
      gender: "Male",
      bloodGroup: "A+",
    },
    laboratory: {
      name: "MediFlow Diagnostic Lab",
      address: "123 Healthcare Ave, Medical District",
      accreditation: "CAP Accredited",
    },
    description: "Fasting blood glucose screening test.",
    results: [
      {
        test: "Fasting Glucose",
        result: "108",
        unit: "mg/dL",
        referenceRange: "70–100",
        flag: "high",
      },
    ],
    timeline: buildTimeline("2025-10-15", "2025-10-15", "completed"),
    doctorComments:
      "Impaired fasting glucose detected. Patient counseled on lifestyle modifications. Repeat test in 3 months.",
  },
  {
    id: "LR-014",
    testName: "Complete Blood Count (CBC)",
    labId: "LAB-2025-1520",
    category: "Hematology",
    department: "Hematology",
    requestedBy: "Dr. James Kim",
    requestedByAvatar: mockLabDoctors[3].avatar,
    collectionDate: "2025-07-22",
    reportDate: "2025-07-24",
    status: "completed",
    resultSummary: "All parameters within normal limits.",
    patientInfo: {
      name: "John Anderson",
      age: 33,
      gender: "Male",
      bloodGroup: "A+",
    },
    laboratory: {
      name: "MediFlow Diagnostic Lab",
      address: "123 Healthcare Ave, Medical District",
      accreditation: "CAP Accredited",
    },
    description: "Routine complete blood count for annual health screening.",
    results: [
      {
        test: "WBC",
        result: "5.9",
        unit: "×10³/µL",
        referenceRange: "4.0–11.0",
        flag: "normal",
      },
      {
        test: "RBC",
        result: "5.0",
        unit: "×10⁶/µL",
        referenceRange: "4.7–6.1",
        flag: "normal",
      },
      {
        test: "Hemoglobin",
        result: "14.5",
        unit: "g/dL",
        referenceRange: "13.5–17.5",
        flag: "normal",
      },
      {
        test: "Hematocrit",
        result: "43.0",
        unit: "%",
        referenceRange: "38.3–48.6",
        flag: "normal",
      },
      {
        test: "Platelets",
        result: "230",
        unit: "×10³/µL",
        referenceRange: "150–450",
        flag: "normal",
      },
    ],
    timeline: buildTimeline("2025-07-22", "2025-07-24", "completed"),
  },
  {
    id: "LR-015",
    testName: "Lipid Profile",
    labId: "LAB-2025-1488",
    category: "Biochemistry",
    department: "Biochemistry",
    requestedBy: "Dr. Michael Mitchell",
    requestedByAvatar: mockLabDoctors[0].avatar,
    collectionDate: "2025-07-22",
    reportDate: "2025-07-24",
    status: "completed",
    resultSummary: "Borderline elevated LDL. Other markers normal.",
    patientInfo: {
      name: "John Anderson",
      age: 33,
      gender: "Male",
      bloodGroup: "A+",
    },
    laboratory: {
      name: "MediFlow Diagnostic Lab",
      address: "123 Healthcare Ave, Medical District",
      accreditation: "CAP Accredited",
    },
    description: "Annual lipid profile for cardiovascular risk assessment.",
    results: [
      {
        test: "Total Cholesterol",
        result: "210",
        unit: "mg/dL",
        referenceRange: "<200",
        flag: "high",
      },
      {
        test: "LDL Cholesterol",
        result: "135",
        unit: "mg/dL",
        referenceRange: "<100",
        flag: "high",
      },
      {
        test: "HDL Cholesterol",
        result: "42",
        unit: "mg/dL",
        referenceRange: ">60",
        flag: "low",
      },
      {
        test: "Triglycerides",
        result: "165",
        unit: "mg/dL",
        referenceRange: "<150",
        flag: "high",
      },
    ],
    timeline: buildTimeline("2025-07-22", "2025-07-24", "completed"),
    doctorComments:
      "Borderline dyslipidemia. Patient advised on heart-healthy diet and regular exercise. Recheck in 6 months.",
  },
  {
    id: "LR-016",
    testName: "Vitamin B12 Level",
    labId: "LAB-2026-0890",
    category: "Biochemistry",
    department: "Biochemistry",
    requestedBy: "Dr. Lisa Patel",
    requestedByAvatar: mockLabDoctors[4].avatar,
    collectionDate: "2026-07-05",
    reportDate: "2026-07-07",
    status: "pending",
    resultSummary: "Awaiting results.",
    patientInfo: {
      name: "John Anderson",
      age: 34,
      gender: "Male",
      bloodGroup: "A+",
    },
    laboratory: {
      name: "MediFlow Diagnostic Lab",
      address: "123 Healthcare Ave, Medical District",
      accreditation: "CAP Accredited",
    },
    description:
      "Vitamin B12 test measures cobalamin levels to evaluate nutritional status and neurological health.",
    results: [],
    timeline: buildTimeline("2026-07-05", "", "pending"),
  },
  {
    id: "LR-017",
    testName: "HbA1c (Quarterly)",
    labId: "LAB-2026-0901",
    category: "Endocrinology",
    department: "Endocrinology",
    requestedBy: "Dr. Sarah Chen",
    requestedByAvatar: mockLabDoctors[1].avatar,
    collectionDate: "2026-08-01",
    reportDate: "",
    status: "processing",
    resultSummary: "Processing in progress.",
    patientInfo: {
      name: "John Anderson",
      age: 34,
      gender: "Male",
      bloodGroup: "A+",
    },
    laboratory: {
      name: "MediFlow Diagnostic Lab",
      address: "123 Healthcare Ave, Medical District",
      accreditation: "CAP Accredited",
    },
    description: "Quarterly HbA1c monitoring for diabetes risk management.",
    results: [],
    timeline: buildTimeline("2026-08-01", "", "processing"),
  },
];

/* ─── Computed stats ─── */

export function computeLabStats(reports: LabReport[]): LabStats {
  const currentYear = new Date().getFullYear().toString();
  return {
    totalReports: reports.length,
    pending: reports.filter((r) => r.status === "pending").length,
    completed: reports.filter((r) => r.status === "completed").length,
    abnormal: reports.filter((r) => r.status === "abnormal").length,
    thisYear: reports.filter((r) => r.reportDate?.startsWith(currentYear))
      .length,
  };
}

/* ─── Filter helpers ─── */

export function getFilteredReports(
  reports: LabReport[],
  filters: LabFilters,
): LabReport[] {
  return reports.filter((report) => {
    if (
      filters.search &&
      !report.testName.toLowerCase().includes(filters.search.toLowerCase()) &&
      !report.labId.toLowerCase().includes(filters.search.toLowerCase()) &&
      !report.requestedBy.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    if (filters.doctor && report.requestedBy !== filters.doctor) return false;
    if (filters.department && report.department !== filters.department)
      return false;
    if (filters.status && report.status !== filters.status) return false;
    if (
      filters.dateFrom &&
      report.reportDate &&
      report.reportDate < filters.dateFrom
    )
      return false;
    if (
      filters.dateTo &&
      report.reportDate &&
      report.reportDate > filters.dateTo
    )
      return false;
    return true;
  });
}

export function sortReports(
  reports: LabReport[],
  sort: LabFilters["sort"],
): LabReport[] {
  const sorted = [...reports];
  switch (sort) {
    case "date-desc":
      return sorted.sort(
        (a, b) =>
          new Date(b.reportDate || b.collectionDate).getTime() -
          new Date(a.reportDate || a.collectionDate).getTime(),
      );
    case "date-asc":
      return sorted.sort(
        (a, b) =>
          new Date(a.reportDate || a.collectionDate).getTime() -
          new Date(b.reportDate || b.collectionDate).getTime(),
      );
    case "status": {
      const order: Record<string, number> = {
        abnormal: 0,
        pending: 1,
        processing: 2,
        completed: 3,
      };
      return sorted.sort(
        (a, b) => (order[a.status] ?? 0) - (order[b.status] ?? 0),
      );
    }
    case "department":
      return sorted.sort((a, b) => a.department.localeCompare(b.department));
    default:
      return sorted;
  }
}

/* ─── Unique filter values ─── */

export const uniqueDoctors = [
  ...new Set(mockLabReports.map((r) => r.requestedBy)),
].sort();
export const uniqueDepartments = [
  ...new Set(mockLabReports.map((r) => r.department)),
].sort();

/* ─── Trend data ─── */

export const mockTrendData: TrendMetric[] = [
  {
    id: "blood-sugar",
    label: "Blood Sugar (Fasting)",
    icon: Activity,
    unit: "mg/dL",
    color: "#ef4444",
    minNormal: 70,
    maxNormal: 100,
    data: [
      { date: "2025-10-15", value: 108 },
      { date: "2026-02-28", value: 88 },
      { date: "2026-05-05", value: 92 },
    ],
  },
  {
    id: "cholesterol",
    label: "Total Cholesterol",
    icon: Heart,
    unit: "mg/dL",
    color: "#f59e0b",
    minNormal: 0,
    maxNormal: 200,
    data: [
      { date: "2025-07-22", value: 210 },
      { date: "2026-07-12", value: 245 },
    ],
  },
  {
    id: "hemoglobin",
    label: "Hemoglobin",
    icon: Droplets,
    unit: "g/dL",
    color: "#3b82f6",
    minNormal: 13.5,
    maxNormal: 17.5,
    data: [
      { date: "2025-07-24", value: 14.5 },
      { date: "2026-07-12", value: 14.2 },
    ],
  },
  {
    id: "blood-pressure",
    label: "Blood Pressure (Systolic)",
    icon: Activity,
    unit: "mmHg",
    color: "#8b5cf6",
    minNormal: 90,
    maxNormal: 120,
    data: [
      { date: "2025-07-22", value: 128 },
      { date: "2026-02-28", value: 122 },
      { date: "2026-05-05", value: 118 },
      { date: "2026-07-12", value: 124 },
    ],
  },
  {
    id: "weight",
    label: "Weight",
    icon: Weight,
    unit: "kg",
    color: "#10b981",
    minNormal: 60,
    maxNormal: 85,
    data: [
      { date: "2025-07-22", value: 82 },
      { date: "2026-02-28", value: 80 },
      { date: "2026-05-05", value: 79 },
      { date: "2026-07-12", value: 78 },
    ],
  },
];
