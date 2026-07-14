// ============================================================
// Types & Mock Data — Medical Records Page
// ============================================================

import { format } from "date-fns";
import type { LucideIcon } from "lucide-react";
import {
  Ambulance,
  CalendarSync,
  FlaskConical,
  Pill,
  Scissors,
  Stethoscope,
  Syringe,
} from "lucide-react";

/* ─── Record types ─── */

export type RecordType =
  | "diagnosis"
  | "treatment"
  | "procedure"
  | "surgery"
  | "vaccination"
  | "emergency-visit"
  | "follow-up";

export const recordTypeLabels: Record<RecordType, string> = {
  diagnosis: "Diagnosis",
  treatment: "Treatment",
  procedure: "Procedure",
  surgery: "Surgery",
  vaccination: "Vaccination",
  "emergency-visit": "Emergency Visit",
  "follow-up": "Follow-up",
};

export const recordTypeIcons: Record<RecordType, LucideIcon> = {
  diagnosis: Stethoscope,
  treatment: Pill,
  procedure: FlaskConical,
  surgery: Scissors,
  vaccination: Syringe,
  "emergency-visit": Ambulance,
  "follow-up": CalendarSync,
};

export const recordTypeColors: Record<
  RecordType,
  { dot: string; bg: string; text: string; darkBg: string; darkText: string }
> = {
  diagnosis: {
    dot: "bg-blue-500",
    bg: "bg-blue-50",
    text: "text-blue-700",
    darkBg: "dark:bg-blue-950/40",
    darkText: "dark:text-blue-400",
  },
  treatment: {
    dot: "bg-emerald-500",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    darkBg: "dark:bg-emerald-950/40",
    darkText: "dark:text-emerald-400",
  },
  procedure: {
    dot: "bg-violet-500",
    bg: "bg-violet-50",
    text: "text-violet-700",
    darkBg: "dark:bg-violet-950/40",
    darkText: "dark:text-violet-400",
  },
  surgery: {
    dot: "bg-rose-500",
    bg: "bg-rose-50",
    text: "text-rose-700",
    darkBg: "dark:bg-rose-950/40",
    darkText: "dark:text-rose-400",
  },
  vaccination: {
    dot: "bg-amber-500",
    bg: "bg-amber-50",
    text: "text-amber-700",
    darkBg: "dark:bg-amber-950/40",
    darkText: "dark:text-amber-400",
  },
  "emergency-visit": {
    dot: "bg-red-500",
    bg: "bg-red-50",
    text: "text-red-700",
    darkBg: "dark:bg-red-950/40",
    darkText: "dark:text-red-400",
  },
  "follow-up": {
    dot: "bg-indigo-500",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    darkBg: "dark:bg-indigo-950/40",
    darkText: "dark:text-indigo-400",
  },
};

export type RecordStatus = "completed" | "ongoing" | "scheduled" | "referred";

export const recordStatusConfig: Record<
  RecordStatus,
  { label: string; className: string }
> = {
  completed: {
    label: "Completed",
    className:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  ongoing: {
    label: "Ongoing",
    className:
      "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  },
  scheduled: {
    label: "Scheduled",
    className:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  },
  referred: {
    label: "Referred",
    className:
      "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400",
  },
};

/* ─── Doctor ─── */

export interface RecordDoctor {
  id: string;
  name: string;
  initials: string;
  department: string;
  avatar: string;
}

/* ─── Attachment ─── */

export interface RecordAttachment {
  id: string;
  name: string;
  type: string;
  size: string;
}

/* ─── Medical record ─── */

export interface MedicalRecord {
  id: string;
  date: string;
  diagnosis: string;
  doctor: RecordDoctor;
  department: string;
  recordType: RecordType;
  status: RecordStatus;
  treatment: string;
  notes?: string;
  attachments: RecordAttachment[];
}

/* ─── Health summary ─── */

export interface HealthSummary {
  bloodGroup: string;
  height: string;
  weight: string;
  bmi: string;
  allergies: string[];
  chronicConditions: string[];
  currentMedications: string[];
}

/* ─── Statistics ─── */

export interface MedicalStats {
  totalRecords: number;
  diagnoses: number;
  treatments: number;
  surgeries: number;
  vaccinations: number;
  allergies: number;
}

/* ─── Filters ─── */

export interface MedicalFilters {
  search: string;
  doctor: string;
  department: string;
  dateFrom: string;
  dateTo: string;
  recordType: RecordType | "";
  sort: "date-desc" | "date-asc" | "doctor" | "type";
}

export const DEFAULT_MEDICAL_FILTERS: MedicalFilters = {
  search: "",
  doctor: "",
  department: "",
  dateFrom: "",
  dateTo: "",
  recordType: "",
  sort: "date-desc",
};

export type ViewMode = "timeline" | "table" | "cards";

/* ─── Mock doctors ─── */

export const mockRecordDoctors: RecordDoctor[] = [
  {
    id: "DOC-001",
    name: "Dr. Sarah Johnson",
    initials: "SJ",
    department: "Cardiology",
    avatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "DOC-002",
    name: "Dr. Michael Chen",
    initials: "MC",
    department: "Neurology",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "DOC-003",
    name: "Dr. Amanda Patel",
    initials: "AP",
    department: "Orthopedics",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "DOC-004",
    name: "Dr. Robert Tanaka",
    initials: "RT",
    department: "General Medicine",
    avatar:
      "https://images.unsplash.com/photo-1622253694242-0b5b78b8c60b?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "DOC-005",
    name: "Dr. Emily Davis",
    initials: "ED",
    department: "Dermatology",
    avatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "DOC-006",
    name: "Dr. James Okafor",
    initials: "JO",
    department: "Pulmonology",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "DOC-007",
    name: "Dr. Lisa Chang",
    initials: "LC",
    department: "Endocrinology",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "DOC-008",
    name: "Dr. Kevin Brooks",
    initials: "KB",
    department: "Cardiology",
    avatar:
      "https://images.unsplash.com/photo-1622253694242-0b5b78b8c60b?w=100&h=100&fit=crop&crop=face",
  },
];

/* ─── Mock medical records (26 entries across 2020-2026) ─── */

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: "MR-001",
    date: "2026-07-08",
    diagnosis: "Acute Bronchitis",
    doctor: mockRecordDoctors[5],
    department: "Pulmonology",
    recordType: "diagnosis",
    status: "completed",
    treatment:
      "Prescribed amoxicillin 500mg for 7 days, cough suppressant, and recommended increased fluid intake.",
    notes:
      "Patient presented with persistent cough and mild fever. Chest X-ray clear. Follow up if symptoms persist beyond 10 days.",
    attachments: [
      { id: "att-1", name: "Chest X-Ray Report", type: "PDF", size: "1.2 MB" },
      { id: "att-2", name: "Lab Results - CBC", type: "PDF", size: "0.4 MB" },
    ],
  },
  {
    id: "MR-002",
    date: "2026-06-22",
    diagnosis: "Hypertension Checkup",
    doctor: mockRecordDoctors[0],
    department: "Cardiology",
    recordType: "follow-up",
    status: "completed",
    treatment:
      "Adjusted losartan dosage from 50mg to 75mg daily. Continue low-sodium diet.",
    notes:
      "Blood pressure 135/85 — slightly elevated. Encouraged regular exercise and dietary changes.",
    attachments: [
      {
        id: "att-3",
        name: "Blood Pressure Log - June 2026",
        type: "PDF",
        size: "0.2 MB",
      },
    ],
  },
  {
    id: "MR-003",
    date: "2026-06-15",
    diagnosis: "Seasonal Influenza",
    doctor: mockRecordDoctors[3],
    department: "General Medicine",
    recordType: "diagnosis",
    status: "completed",
    treatment:
      "Prescribed oseltamivir 75mg twice daily for 5 days. Rest and hydration advised.",
    notes:
      "Patient tested positive for Influenza A. Fever resolved within 48 hours of treatment.",
    attachments: [
      { id: "att-4", name: "Flu Test Result", type: "PDF", size: "0.3 MB" },
    ],
  },
  {
    id: "MR-004",
    date: "2026-05-30",
    diagnosis: "Routine Vaccination - Tdap Booster",
    doctor: mockRecordDoctors[3],
    department: "General Medicine",
    recordType: "vaccination",
    status: "completed",
    treatment:
      "Administered Tdap booster (0.5ml IM). Site observed for 15 minutes post-injection.",
    notes: "No adverse reactions. Next tetanus booster due in 10 years.",
    attachments: [
      {
        id: "att-5",
        name: "Vaccination Record Card",
        type: "PDF",
        size: "0.1 MB",
      },
    ],
  },
  {
    id: "MR-005",
    date: "2026-05-12",
    diagnosis: "Allergic Rhinitis",
    doctor: mockRecordDoctors[4],
    department: "Dermatology",
    recordType: "diagnosis",
    status: "completed",
    treatment:
      "Prescribed cetirizine 10mg daily and fluticasone nasal spray PRN.",
    notes:
      "Allergy testing recommended for next visit. Patient reports spring seasonal symptoms.",
    attachments: [
      {
        id: "att-6",
        name: "Allergy Assessment Form",
        type: "PDF",
        size: "0.5 MB",
      },
    ],
  },
  {
    id: "MR-006",
    date: "2026-04-28",
    diagnosis: "Type 2 Diabetes Mellitus",
    doctor: mockRecordDoctors[6],
    department: "Endocrinology",
    recordType: "diagnosis",
    status: "ongoing",
    treatment:
      "Started metformin 500mg twice daily. Referred to dietitian for medical nutrition therapy. HbA1c target < 7.0%.",
    notes:
      "Fasting glucose 145 mg/dL, HbA1c 7.8%. Patient educated on glucose monitoring and carbohydrate counting.",
    attachments: [
      {
        id: "att-7",
        name: "Diabetes Management Plan",
        type: "PDF",
        size: "1.0 MB",
      },
      { id: "att-8", name: "Lab Results - HbA1c", type: "PDF", size: "0.3 MB" },
    ],
  },
  {
    id: "MR-007",
    date: "2026-04-10",
    diagnosis: "Plantar Fasciitis",
    doctor: mockRecordDoctors[2],
    department: "Orthopedics",
    recordType: "treatment",
    status: "completed",
    treatment:
      "Physical therapy 2x/week for 6 weeks. Prescribed custom orthotics and recommended night splint.",
    notes:
      "Pain improved significantly after 4 weeks of therapy. Continue stretching exercises.",
    attachments: [
      {
        id: "att-9",
        name: "Physical Therapy Plan",
        type: "PDF",
        size: "0.6 MB",
      },
    ],
  },
  {
    id: "MR-008",
    date: "2026-03-22",
    diagnosis: "Ingrown Toenail Removal",
    doctor: mockRecordDoctors[4],
    department: "Dermatology",
    recordType: "procedure",
    status: "completed",
    treatment:
      "Partial nail avulsion under local anesthesia. Wound dressed and healing well.",
    notes:
      "Procedure completed in 20 minutes. Patient discharged with wound care instructions.",
    attachments: [
      { id: "att-10", name: "Procedure Note", type: "PDF", size: "0.2 MB" },
    ],
  },
  {
    id: "MR-009",
    date: "2026-03-05",
    diagnosis: "Migraine Treatment Adjustment",
    doctor: mockRecordDoctors[1],
    department: "Neurology",
    recordType: "follow-up",
    status: "completed",
    treatment:
      "Switched from sumatriptan to rizatriptan 10mg ODT for acute attacks. Started topiramate 25mg daily for prophylaxis.",
    notes:
      "Patient reported 8 migraine days per month. New regimen aims to reduce frequency by 50%.",
    attachments: [
      {
        id: "att-11",
        name: "Migraine Diary - Feb 2026",
        type: "PDF",
        size: "0.3 MB",
      },
    ],
  },
  {
    id: "MR-010",
    date: "2026-02-18",
    diagnosis: "Appendicitis",
    doctor: mockRecordDoctors[7],
    department: "Cardiology",
    recordType: "emergency-visit",
    status: "completed",
    treatment:
      "Emergency laparoscopic appendectomy performed. IV antibiotics administered post-op. Discharged after 24 hours observation.",
    notes:
      "Patient presented with RLQ pain, nausea, fever. CT confirmed acute appendicitis. Surgery successful.",
    attachments: [
      { id: "att-12", name: "CT Abdomen Report", type: "PDF", size: "1.5 MB" },
      { id: "att-13", name: "Surgical Report", type: "PDF", size: "0.8 MB" },
      { id: "att-14", name: "Discharge Summary", type: "PDF", size: "0.4 MB" },
    ],
  },
  {
    id: "MR-011",
    date: "2026-02-01",
    diagnosis: "Hyperlipidemia Screening",
    doctor: mockRecordDoctors[0],
    department: "Cardiology",
    recordType: "diagnosis",
    status: "completed",
    treatment:
      "Prescribed atorvastatin 20mg daily. Dietary counseling for cholesterol management.",
    notes:
      "LDL 160 mg/dL, HDL 38 mg/dL. Moderate cardiovascular risk. Started statin therapy.",
    attachments: [
      {
        id: "att-15",
        name: "Lipid Panel Results",
        type: "PDF",
        size: "0.2 MB",
      },
    ],
  },
  {
    id: "MR-012",
    date: "2026-01-15",
    diagnosis: "Lumbar Disc Herniation",
    doctor: mockRecordDoctors[2],
    department: "Orthopedics",
    recordType: "surgery",
    status: "completed",
    treatment:
      "Microdiscectomy at L4-L5. Patient mobilized same day. Prescribed pain management protocol.",
    notes:
      "MRI confirmed herniated nucleus pulposus at L4-L5 causing right-sided radiculopathy. Surgery uneventful.",
    attachments: [
      {
        id: "att-16",
        name: "MRI Lumbar Spine Report",
        type: "PDF",
        size: "1.8 MB",
      },
      {
        id: "att-17",
        name: "Surgical Report - Microdiscectomy",
        type: "PDF",
        size: "0.9 MB",
      },
      {
        id: "att-18",
        name: "Post-Op Instructions",
        type: "PDF",
        size: "0.3 MB",
      },
    ],
  },
  {
    id: "MR-013",
    date: "2025-12-20",
    diagnosis: "Influenza Vaccination",
    doctor: mockRecordDoctors[3],
    department: "General Medicine",
    recordType: "vaccination",
    status: "completed",
    treatment: "Administered quadrivalent influenza vaccine (0.5ml IM).",
    notes: "Annual seasonal vaccination. Patient tolerated well.",
    attachments: [
      { id: "att-19", name: "Vaccination Record", type: "PDF", size: "0.1 MB" },
    ],
  },
  {
    id: "MR-014",
    date: "2025-12-05",
    diagnosis: "Eczema Flare-up",
    doctor: mockRecordDoctors[4],
    department: "Dermatology",
    recordType: "treatment",
    status: "completed",
    treatment:
      "Prescribed triamcinolone 0.1% cream twice daily for 2 weeks. Emollient therapy continued.",
    notes:
      "Flare triggered by stress and dry winter air. Advised humidifier use and fragrance-free products.",
    attachments: [
      {
        id: "att-20",
        name: "Treatment Plan - Eczema",
        type: "PDF",
        size: "0.3 MB",
      },
    ],
  },
  {
    id: "MR-015",
    date: "2025-11-12",
    diagnosis: "Carpal Tunnel Syndrome",
    doctor: mockRecordDoctors[2],
    department: "Orthopedics",
    recordType: "treatment",
    status: "completed",
    treatment:
      "Wrist splint nightly for 8 weeks. NSAIDs prescribed. Ergonomic workstation assessment recommended.",
    notes:
      "Nerve conduction study confirmed moderate CTS. Symptoms improving with conservative management.",
    attachments: [
      {
        id: "att-21",
        name: "Nerve Conduction Study Report",
        type: "PDF",
        size: "0.7 MB",
      },
    ],
  },
  {
    id: "MR-016",
    date: "2025-10-08",
    diagnosis: "Coronary Artery Disease - Annual Review",
    doctor: mockRecordDoctors[0],
    department: "Cardiology",
    recordType: "follow-up",
    status: "completed",
    treatment:
      "Continued aspirin 81mg and atorvastatin 40mg. Stress echocardiogram normal. No intervention required.",
    notes:
      "Patient stable. BP 128/78, HR 72. Continue current management plan. Next review in 12 months.",
    attachments: [
      { id: "att-22", name: "Stress Echo Report", type: "PDF", size: "1.1 MB" },
      {
        id: "att-23",
        name: "Cardiology Annual Summary",
        type: "PDF",
        size: "0.5 MB",
      },
    ],
  },
  {
    id: "MR-017",
    date: "2025-09-15",
    diagnosis: "Tonsillectomy",
    doctor: mockRecordDoctors[7],
    department: "Cardiology",
    recordType: "surgery",
    status: "completed",
    treatment:
      "Coblation tonsillectomy. Post-op pain management with acetaminophen and ibuprofen. Soft diet for 2 weeks.",
    notes:
      "History of recurrent tonsillitis (6 episodes in past year). Surgery completed without complications.",
    attachments: [
      { id: "att-24", name: "Pre-Op Assessment", type: "PDF", size: "0.4 MB" },
      {
        id: "att-25",
        name: "Surgical Report - Tonsillectomy",
        type: "PDF",
        size: "0.6 MB",
      },
    ],
  },
  {
    id: "MR-018",
    date: "2025-08-22",
    diagnosis: "Urinary Tract Infection",
    doctor: mockRecordDoctors[3],
    department: "General Medicine",
    recordType: "diagnosis",
    status: "completed",
    treatment:
      "Prescribed nitrofurantoin 100mg twice daily for 5 days. Increased fluid intake recommended.",
    notes:
      "Urinalysis positive for nitrites and leukocytes. Symptoms resolved after 3 days of antibiotics.",
    attachments: [
      { id: "att-26", name: "Urinalysis Report", type: "PDF", size: "0.2 MB" },
    ],
  },
  {
    id: "MR-019",
    date: "2025-07-14",
    diagnosis: "Colonoscopy Screening",
    doctor: mockRecordDoctors[5],
    department: "Pulmonology",
    recordType: "procedure",
    status: "completed",
    treatment:
      "Colonoscopy performed under conscious sedation. Two benign polyps removed (tubular adenoma, 5mm).",
    notes:
      "Patient age 50, average risk. Complete exam to cecum. Follow-up colonoscopy in 5 years.",
    attachments: [
      { id: "att-27", name: "Colonoscopy Report", type: "PDF", size: "0.5 MB" },
      {
        id: "att-28",
        name: "Pathology Report - Polyps",
        type: "PDF",
        size: "0.4 MB",
      },
    ],
  },
  {
    id: "MR-020",
    date: "2025-06-05",
    diagnosis: "COVID-19 Booster Vaccination",
    doctor: mockRecordDoctors[3],
    department: "General Medicine",
    recordType: "vaccination",
    status: "completed",
    treatment:
      "Administered Pfizer-BioNTech COVID-19 booster (0.3ml IM). Observed for 15 minutes.",
    notes:
      "Patient previously completed primary series. Booster dose #2 for 2025 season.",
    attachments: [
      {
        id: "att-29",
        name: "COVID-19 Vaccination Record",
        type: "PDF",
        size: "0.1 MB",
      },
    ],
  },
  {
    id: "MR-021",
    date: "2025-04-18",
    diagnosis: "Hepatitis B Screening",
    doctor: mockRecordDoctors[6],
    department: "Endocrinology",
    recordType: "diagnosis",
    status: "completed",
    treatment:
      "Negative for Hepatitis B surface antigen. No treatment required. Vaccination series initiated.",
    notes:
      "Routine screening due to elevated liver enzymes on recent labs. HBsAb negative — vaccination indicated.",
    attachments: [
      {
        id: "att-30",
        name: "Hepatitis Panel Results",
        type: "PDF",
        size: "0.3 MB",
      },
    ],
  },
  {
    id: "MR-022",
    date: "2025-03-10",
    diagnosis: "Renal Colic - Kidney Stone",
    doctor: mockRecordDoctors[3],
    department: "General Medicine",
    recordType: "emergency-visit",
    status: "completed",
    treatment:
      "IV fluids, ketorolac for pain, tamsulosin 0.4mg daily for stone passage. CT confirmed 4mm ureteral stone.",
    notes:
      "Patient passed stone spontaneously after 3 days. Strained urine and stone analysis showed calcium oxalate.",
    attachments: [
      { id: "att-31", name: "CT KUB Report", type: "PDF", size: "1.3 MB" },
      {
        id: "att-32",
        name: "Stone Analysis Report",
        type: "PDF",
        size: "0.2 MB",
      },
    ],
  },
  {
    id: "MR-023",
    date: "2025-01-22",
    diagnosis: "Anxiety Disorder - GAD",
    doctor: mockRecordDoctors[1],
    department: "Neurology",
    recordType: "diagnosis",
    status: "ongoing",
    treatment:
      "Started sertraline 50mg daily. Referred to cognitive behavioral therapy (CBT). Follow-up in 6 weeks.",
    notes:
      "GAD-7 score 15 (moderate-severe anxiety). Patient motivated for treatment. Therapy initiated.",
    attachments: [
      {
        id: "att-33",
        name: "Mental Health Assessment",
        type: "PDF",
        size: "0.4 MB",
      },
    ],
  },
  {
    id: "MR-024",
    date: "2024-12-10",
    diagnosis: "Rotator Cuff Repair",
    doctor: mockRecordDoctors[2],
    department: "Orthopedics",
    recordType: "surgery",
    status: "completed",
    treatment:
      "Arthroscopic rotator cuff repair (right shoulder). Sling immobilization for 4 weeks followed by PT.",
    notes:
      "Full-thickness tear of supraspinatus tendon confirmed on MRI. Surgery successful. Expected recovery 4-6 months.",
    attachments: [
      {
        id: "att-34",
        name: "MRI Shoulder Report",
        type: "PDF",
        size: "1.6 MB",
      },
      {
        id: "att-35",
        name: "Surgical Report - Rotator Cuff",
        type: "PDF",
        size: "0.7 MB",
      },
      {
        id: "att-36",
        name: "Rehabilitation Protocol",
        type: "PDF",
        size: "0.5 MB",
      },
    ],
  },
  {
    id: "MR-025",
    date: "2024-09-15",
    diagnosis: "Thyroid Function Monitoring",
    doctor: mockRecordDoctors[6],
    department: "Endocrinology",
    recordType: "follow-up",
    status: "completed",
    treatment:
      "Levothyroxine dosage adjusted from 75mcg to 88mcg daily. TSH target maintained between 0.5-2.5 mIU/L.",
    notes:
      "TSH 3.8 mIU/L (slightly elevated). Patient asymptomatic. Dosage adjusted and recheck in 8 weeks.",
    attachments: [
      {
        id: "att-37",
        name: "Thyroid Function Panel",
        type: "PDF",
        size: "0.2 MB",
      },
    ],
  },
  {
    id: "MR-026",
    date: "2024-07-20",
    diagnosis: "Verruca Vulgaris (Wart) Treatment",
    doctor: mockRecordDoctors[4],
    department: "Dermatology",
    recordType: "treatment",
    status: "completed",
    treatment:
      "Cryotherapy with liquid nitrogen (2 freeze-thaw cycles). Patient tolerated well.",
    notes:
      "Single verruca on right index finger. Re-evaluate in 4 weeks for possible repeat treatment.",
    attachments: [],
  },
  {
    id: "MR-027",
    date: "2024-06-01",
    diagnosis: "Gastroesophageal Reflux Disease",
    doctor: mockRecordDoctors[3],
    department: "General Medicine",
    recordType: "diagnosis",
    status: "completed",
    treatment:
      "Prescribed omeprazole 20mg daily for 8 weeks. Lifestyle modifications discussed (elevate head of bed, avoid trigger foods).",
    notes:
      "Patient reported heartburn 4-5x weekly. EGD ordered to rule out Barrett's esophagus.",
    attachments: [
      { id: "att-38", name: "EGD Report", type: "PDF", size: "0.7 MB" },
    ],
  },
  {
    id: "MR-028",
    date: "2024-04-15",
    diagnosis: "Sprained Ankle - Right",
    doctor: mockRecordDoctors[2],
    department: "Orthopedics",
    recordType: "treatment",
    status: "completed",
    treatment:
      "RICE protocol (Rest, Ice, Compression, Elevation). Prescribed NSAIDs. Ankle brace fitted. Partial weight-bearing with crutches.",
    notes:
      "Grade II lateral ankle sprain. X-ray ruled out fracture. Full recovery expected in 4-6 weeks.",
    attachments: [
      { id: "att-39", name: "Ankle X-Ray Report", type: "PDF", size: "0.5 MB" },
    ],
  },
  {
    id: "MR-029",
    date: "2024-02-28",
    diagnosis: "Shingles (Herpes Zoster) Vaccination",
    doctor: mockRecordDoctors[3],
    department: "General Medicine",
    recordType: "vaccination",
    status: "completed",
    treatment:
      "Administered Shingrix dose 1 (0.5ml IM). Dose 2 scheduled in 2 months.",
    notes:
      "Patient age 55, recommended for prevention. Mild arm soreness post-injection.",
    attachments: [
      {
        id: "att-40",
        name: "Vaccination Record - Shingrix",
        type: "PDF",
        size: "0.1 MB",
      },
    ],
  },
  {
    id: "MR-030",
    date: "2024-01-10",
    diagnosis: "Sleep Apnea - Initial Diagnosis",
    doctor: mockRecordDoctors[5],
    department: "Pulmonology",
    recordType: "diagnosis",
    status: "ongoing",
    treatment:
      "Home sleep study ordered. CPAP therapy initiated at 8 cmH2O. Follow-up in 3 months for compliance review.",
    notes:
      "AHI 22 events/hour (moderate OSA). Patient tolerating CPAP well. Compliance data reviewed remotely.",
    attachments: [
      { id: "att-41", name: "Sleep Study Report", type: "PDF", size: "1.4 MB" },
      { id: "att-42", name: "CPAP Prescription", type: "PDF", size: "0.2 MB" },
    ],
  },
];

/* ─── Mock health summary ─── */

export const mockHealthSummary: HealthSummary = {
  bloodGroup: "A+",
  height: "5' 10\" (178 cm)",
  weight: "175 lbs (79.4 kg)",
  bmi: "25.1 (Overweight)",
  allergies: ["Penicillin", "Sulfa Drugs", "Pollen"],
  chronicConditions: ["Hypertension (Stage 1)", "Hyperlipidemia", "GERD"],
  currentMedications: [
    "Losartan 75mg daily",
    "Atorvastatin 20mg daily",
    "Omeprazole 20mg daily",
  ],
};

/* ─── Stats computation ─── */

export function computeMedicalStats(
  records: MedicalRecord[],
  health: HealthSummary,
): MedicalStats {
  return {
    totalRecords: records.length,
    diagnoses: records.filter((r) => r.recordType === "diagnosis").length,
    treatments: records.filter((r) => r.recordType === "treatment").length,
    surgeries: records.filter((r) => r.recordType === "surgery").length,
    vaccinations: records.filter((r) => r.recordType === "vaccination").length,
    allergies: health.allergies.length,
  };
}

/* ─── Filtering & grouping helpers ─── */

export function getFilteredRecords(
  records: MedicalRecord[],
  filters: MedicalFilters,
): MedicalRecord[] {
  return records.filter((r) => {
    if (
      filters.search &&
      !r.diagnosis.toLowerCase().includes(filters.search.toLowerCase()) &&
      !r.doctor.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !r.department.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    if (filters.doctor && r.doctor.id !== filters.doctor) return false;
    if (filters.department && r.department !== filters.department) return false;
    if (filters.recordType && r.recordType !== filters.recordType) return false;
    if (filters.dateFrom && r.date < filters.dateFrom) return false;
    if (filters.dateTo && r.date > filters.dateTo) return false;
    return true;
  });
}

export function sortRecords(
  records: MedicalRecord[],
  sort: MedicalFilters["sort"],
): MedicalRecord[] {
  const sorted = [...records];
  switch (sort) {
    case "date-desc":
      return sorted.sort((a, b) => b.date.localeCompare(a.date));
    case "date-asc":
      return sorted.sort((a, b) => a.date.localeCompare(b.date));
    case "doctor":
      return sorted.sort((a, b) => a.doctor.name.localeCompare(b.doctor.name));
    case "type":
      return sorted.sort((a, b) => a.recordType.localeCompare(b.recordType));
    default:
      return sorted;
  }
}

export function groupRecordsByYear(
  records: MedicalRecord[],
): Record<string, MedicalRecord[]> {
  const groups: Record<string, MedicalRecord[]> = {};
  for (const record of records) {
    const year = record.date.slice(0, 4);
    if (!groups[year]) groups[year] = [];
    groups[year].push(record);
  }
  return groups;
}

export const allDepartments = [
  ...new Set(mockMedicalRecords.map((r) => r.department)),
];

export const allDoctors = mockRecordDoctors;

export { format };
