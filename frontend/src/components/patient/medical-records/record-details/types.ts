// ============================================================
// Types & Mock Data — Medical Record Details Page
// ============================================================

import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  AlertTriangle,
  Ambulance,
  Calendar,
  CalendarClock,
  CalendarSync,
  CheckCircle2,
  ClipboardList,
  FileText,
  FlaskConical,
  HeartPulse,
  HelpCircle,
  Image,
  Info,
  Microscope,
  Pill,
  Scissors,
  Stethoscope,
  Syringe,
  UserCheck,
} from "lucide-react";
import type { MedicalRecord, RecordDoctor } from "../types";
import { mockMedicalRecords } from "../types";

/* ─── Vitals ─── */

export interface VitalsData {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  height: string;
  weight: string;
  bmi: string;
  oxygenSaturation: string;
  respiratoryRate: string;
}

/* ─── Diagnosis detail ─── */

export type RiskLevel = "low" | "moderate" | "high" | "critical";

export const riskLevelConfig: Record<
  RiskLevel,
  { label: string; className: string; icon: LucideIcon }
> = {
  low: {
    label: "Low",
    className:
      "bg-dash-primary-light text-dash-primary dark:bg-teal-950/40 dark:text-[var(--color-accent)]",
    icon: CheckCircle2,
  },
  moderate: {
    label: "Moderate",
    className:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    icon: AlertCircle,
  },
  high: {
    label: "High",
    className:
      "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400",
    icon: AlertTriangle,
  },
  critical: {
    label: "Critical",
    className: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    icon: HelpCircle,
  },
};

export interface DiagnosisData {
  primaryDiagnosis: string;
  secondaryDiagnosis: string | null;
  icdCode: string;
  riskLevel: RiskLevel;
  doctorRecommendation: string;
  severity: string;
  followUpRequired: boolean;
  followUpDate: string | null;
}

/* ─── Treatment ─── */

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface TreatmentData {
  plan: string;
  procedures: string[];
  medications: Medication[];
  lifestyleAdvice: string[];
  nextVisit: string | null;
}

/* ─── Prescription ─── */

export interface PrescriptionData {
  id: string;
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  prescribedBy: string;
  date: string;
  refills: number;
}

/* ─── Lab result ─── */

export type LabStatus = "completed" | "pending" | "in-progress" | "cancelled";

export const labStatusConfig: Record<
  LabStatus,
  { label: string; className: string }
> = {
  completed: {
    label: "Completed",
    className:
      "bg-dash-primary-light text-dash-primary dark:bg-teal-950/40 dark:text-[var(--color-accent)]",
  },
  pending: {
    label: "Pending",
    className:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  },
  "in-progress": {
    label: "In Progress",
    className:
      "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  },
  cancelled: {
    label: "Cancelled",
    className:
      "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
  },
};

export interface LabResultData {
  id: string;
  testName: string;
  category: string;
  result: string;
  referenceRange: string;
  status: LabStatus;
  date: string;
  notes: string | null;
  flagged: boolean;
}

/* ─── Attachment detail ─── */

export type AttachmentCategory =
  | "prescription"
  | "report"
  | "image"
  | "invoice"
  | "lab";

export const attachmentCategoryConfig: Record<
  AttachmentCategory,
  { label: string; icon: LucideIcon; color: string }
> = {
  prescription: {
    label: "Prescription",
    icon: Pill,
    color: "text-violet-500",
  },
  report: {
    label: "Report",
    icon: FileText,
    color: "text-blue-500",
  },
  image: {
    label: "Medical Image",
    icon: Image,
    color: "text-[var(--color-primary)]",
  },
  invoice: {
    label: "Invoice",
    icon: FileText,
    color: "text-amber-500",
  },
  lab: {
    label: "Lab Result",
    icon: Microscope,
    color: "text-rose-500",
  },
};

export interface AttachmentDetail {
  id: string;
  name: string;
  category: AttachmentCategory;
  type: string;
  size: string;
  date: string;
  description: string;
}

/* ─── Timeline event ─── */

export type TimelineEventType =
  | "booked"
  | "consultation"
  | "diagnosis"
  | "prescription"
  | "lab-test"
  | "follow-up"
  | "procedure"
  | "surgery"
  | "vaccination"
  | "emergency"
  | "check-in"
  | "completed";

export const timelineEventConfig: Record<
  TimelineEventType,
  { label: string; icon: LucideIcon; color: string; dotColor: string }
> = {
  booked: {
    label: "Appointment Booked",
    icon: Calendar,
    color: "text-slate-500",
    dotColor: "bg-slate-400",
  },
  consultation: {
    label: "Consultation",
    icon: Stethoscope,
    color: "text-blue-500",
    dotColor: "bg-blue-500",
  },
  diagnosis: {
    label: "Diagnosis",
    icon: ClipboardList,
    color: "text-violet-500",
    dotColor: "bg-violet-500",
  },
  prescription: {
    label: "Prescription Issued",
    icon: Pill,
    color: "text-emerald-500",
    dotColor: "bg-emerald-500",
  },
  "lab-test": {
    label: "Lab Test Ordered",
    icon: FlaskConical,
    color: "text-rose-500",
    dotColor: "bg-rose-500",
  },
  "follow-up": {
    label: "Follow-up Scheduled",
    icon: CalendarSync,
    color: "text-indigo-500",
    dotColor: "bg-indigo-500",
  },
  procedure: {
    label: "Procedure",
    icon: Syringe,
    color: "text-amber-500",
    dotColor: "bg-amber-500",
  },
  surgery: {
    label: "Surgery",
    icon: Scissors,
    color: "text-red-500",
    dotColor: "bg-red-500",
  },
  vaccination: {
    label: "Vaccination",
    icon: Syringe,
    color: "text-cyan-500",
    dotColor: "bg-cyan-500",
  },
  emergency: {
    label: "Emergency Visit",
    icon: Ambulance,
    color: "text-red-600",
    dotColor: "bg-red-600",
  },
  "check-in": {
    label: "Checked In",
    icon: UserCheck,
    color: "text-[var(--color-primary)]",
    dotColor: "bg-[var(--color-primary)]",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    color: "text-[var(--color-primary)]",
    dotColor: "bg-[var(--color-primary)]",
  },
};

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  date: string;
  time: string;
  title: string;
  description: string;
  doctor: string;
}

/* ─── Related record ─── */

export interface RelatedRecord {
  id: string;
  date: string;
  diagnosis: string;
  doctor: RecordDoctor;
  recordType: string;
  relationship: "previous" | "next" | "similar";
}

/* ─── Full record detail data ─── */

export interface RecordDetailData {
  record: MedicalRecord;
  vitals: VitalsData;
  diagnosis: DiagnosisData;
  treatment: TreatmentData;
  prescriptions: PrescriptionData[];
  labResults: LabResultData[];
  attachments: AttachmentDetail[];
  timeline: TimelineEvent[];
  relatedRecords: RelatedRecord[];
  symptoms: string[];
  chiefComplaint: string;
  doctorNotes: string;
  patientNotes: string | null;
}

/* ─── Tab definitions ─── */

export type TabId =
  | "overview"
  | "diagnosis"
  | "treatment"
  | "prescriptions"
  | "labs"
  | "attachments"
  | "timeline";

export type RecordTab =
  | "overview"
  | "diagnosis"
  | "treatment"
  | "prescriptions"
  | "lab-results"
  | "attachments"
  | "timeline";

export interface TabDef {
  id: RecordTab;
  label: string;
  icon: LucideIcon;
}

export const RECORD_TABS: TabDef[] = [
  { id: "overview", label: "Overview", icon: Info },
  { id: "diagnosis", label: "Diagnosis", icon: ClipboardList },
  { id: "treatment", label: "Treatment", icon: HeartPulse },
  { id: "prescriptions", label: "Prescriptions", icon: Pill },
  { id: "lab-results", label: "Lab Results", icon: Microscope },
  { id: "attachments", label: "Attachments", icon: FileText },
  { id: "timeline", label: "Timeline", icon: CalendarClock },
];

/* ─── Helper: generate detail data from a base MedicalRecord ─── */

function generateVitals(record: MedicalRecord): VitalsData {
  // Assign contextually appropriate vitals based on record type
  const base = {
    height: "5' 10\" (178 cm)",
    weight: "175 lbs (79.4 kg)",
    bmi: "25.1",
  };
  if (record.recordType === "emergency-visit") {
    return {
      ...base,
      bloodPressure: "160/95",
      heartRate: "108 bpm",
      temperature: "100.8°F (38.2°C)",
      oxygenSaturation: "94%",
      respiratoryRate: "22/min",
    };
  }
  if (record.recordType === "surgery") {
    return {
      ...base,
      bloodPressure: "135/85",
      heartRate: "78 bpm",
      temperature: "98.6°F (37.0°C)",
      oxygenSaturation: "98%",
      respiratoryRate: "16/min",
    };
  }
  if (record.recordType === "follow-up") {
    return {
      ...base,
      bloodPressure: "128/78",
      heartRate: "72 bpm",
      temperature: "98.4°F (36.9°C)",
      oxygenSaturation: "99%",
      respiratoryRate: "15/min",
    };
  }
  if (record.department === "Cardiology") {
    return {
      ...base,
      bloodPressure: "135/85",
      heartRate: "76 bpm",
      temperature: "98.4°F (36.9°C)",
      oxygenSaturation: "98%",
      respiratoryRate: "16/min",
    };
  }
  if (record.recordType === "vaccination") {
    return {
      ...base,
      bloodPressure: "120/80",
      heartRate: "70 bpm",
      temperature: "98.6°F (37.0°C)",
      oxygenSaturation: "99%",
      respiratoryRate: "14/min",
    };
  }
  return {
    ...base,
    bloodPressure: "125/82",
    heartRate: "74 bpm",
    temperature: "98.6°F (37.0°C)",
    oxygenSaturation: "98%",
    respiratoryRate: "16/min",
  };
}

function generateDiagnosis(record: MedicalRecord): DiagnosisData {
  const hasSecondary = !["vaccination", "procedure"].includes(
    record.recordType,
  );
  const severityMap: Record<string, string> = {
    "Acute Bronchitis": "Moderate",
    "Hypertension Checkup": "Stage 1",
    "Seasonal Influenza": "Mild",
    "Allergic Rhinitis": "Mild",
    "Type 2 Diabetes Mellitus": "Moderate",
    Appendicitis: "Acute",
    "Hyperlipidemia Screening": "Borderline",
    "Migraine Treatment Adjustment": "Chronic",
    "Lumbar Disc Herniation": "Severe",
    "Plantar Fasciitis": "Moderate",
    "Carpal Tunnel Syndrome": "Moderate",
    "Coronary Artery Disease - Annual Review": "Stable",
    Tonsillectomy: "N/A",
    "Eczema Flare-up": "Moderate",
    UTI: "Mild",
    "Colonoscopy Screening": "N/A",
    "COVID-19 Booster Vaccination": "N/A",
    "Hepatitis B Screening": "N/A",
    "Renal Colic - Kidney Stone": "Acute",
    "Anxiety Disorder - GAD": "Moderate",
    "Rotator Cuff Repair": "Severe",
    "Thyroid Function Monitoring": "Stable",
    "Verruca Vulgaris (Wart) Treatment": "Mild",
    GERD: "Moderate",
    "Sprained Ankle - Right": "Moderate",
    "Shingles Vaccination": "N/A",
    "Sleep Apnea - Initial Diagnosis": "Moderate",
  };
  const severity = severityMap[record.diagnosis] || "Moderate";
  const riskLevel: RiskLevel = record.status === "ongoing" ? "moderate" : "low";
  const secondaryDiagnoses: Record<string, string | null> = {
    "Acute Bronchitis": "Mild Sinus Congestion",
    "Hypertension Checkup": "Elevated LDL Cholesterol",
    "Type 2 Diabetes Mellitus": "Metabolic Syndrome",
    "Migraine Treatment Adjustment": "Tension-Type Headache",
    "Lumbar Disc Herniation": "Facet Joint Hypertrophy",
    "Coronary Artery Disease - Annual Review": "Hyperlipidemia",
    "Anxiety Disorder - GAD": "Insomnia",
    "Sleep Apnea - Initial Diagnosis": "Daytime Fatigue",
    GERD: "Hiatal Hernia (suspected)",
  };

  return {
    primaryDiagnosis: record.diagnosis,
    secondaryDiagnosis: hasSecondary
      ? (secondaryDiagnoses[record.diagnosis] ?? null)
      : null,
    icdCode: generateIcdCode(record),
    riskLevel: record.recordType === "emergency-visit" ? "high" : riskLevel,
    doctorRecommendation: generateRecommendation(record),
    severity,
    followUpRequired:
      record.status !== "completed" ||
      record.recordType === "follow-up" ||
      record.recordType === "diagnosis",
    followUpDate: record.status !== "completed" ? getFutureDate(30) : null,
  };
}

function generateIcdCode(record: MedicalRecord): string {
  const codes: Record<string, string> = {
    "Acute Bronchitis": "J20.9",
    "Hypertension Checkup": "I10",
    "Seasonal Influenza": "J10.1",
    "Allergic Rhinitis": "J30.4",
    "Type 2 Diabetes Mellitus": "E11.9",
    Appendicitis: "K35.80",
    "Hyperlipidemia Screening": "E78.5",
    "Migraine Treatment Adjustment": "G43.909",
    "Lumbar Disc Herniation": "M51.06",
    "Plantar Fasciitis": "M72.2",
    "Carpal Tunnel Syndrome": "G56.00",
    "Coronary Artery Disease - Annual Review": "I25.10",
    Tonsillectomy: "J35.01",
    "Eczema Flare-up": "L30.9",
    "Urinary Tract Infection": "N39.0",
    "Colonoscopy Screening": "Z12.11",
    "COVID-19 Booster Vaccination": "Z23",
    "Hepatitis B Screening": "Z11.59",
    "Renal Colic - Kidney Stone": "N20.0",
    "Anxiety Disorder - GAD": "F41.1",
    "Rotator Cuff Repair": "M75.100",
    "Thyroid Function Monitoring": "E03.9",
    "Verruca Vulgaris (Wart) Treatment": "B07",
    "Gastroesophageal Reflux Disease": "K21.9",
    "Sprained Ankle - Right": "S93.401",
    "Shingles (Herpes Zoster) Vaccination": "Z23",
    "Sleep Apnea - Initial Diagnosis": "G47.33",
  };
  return codes[record.diagnosis] || "R69";
}

function generateRecommendation(record: MedicalRecord): string {
  const recs: Record<string, string> = {
    "Acute Bronchitis":
      "Complete the full course of antibiotics. If cough persists beyond 10 days, return for follow-up. Consider pulmonary function testing if recurrent.",
    "Hypertension Checkup":
      "Continue low-sodium diet and regular exercise. Monitor blood pressure daily. Return in 3 months for medication adjustment evaluation.",
    "Seasonal Influenza":
      "Rest and hydrate. Take oseltamivir as prescribed. Monitor temperature. Seek immediate care if shortness of breath develops.",
    "Allergic Rhinitis":
      "Continue cetirizine daily during allergy season. Consider immunotherapy if symptoms worsen. Schedule allergy testing for next visit.",
    "Type 2 Diabetes Mellitus":
      "Monitor blood glucose 4x daily. Follow diabetic diet plan. Attend nutrition counseling. Target HbA1c < 7.0%. Follow up in 3 months.",
    Appendicitis:
      "No heavy lifting for 4 weeks. Keep surgical site clean and dry. Take antibiotics as prescribed. Follow up in 2 weeks for wound check.",
    "Migraine Treatment Adjustment":
      "Keep migraine diary. Take rizatriptan at first sign of attack. Gradually increase topiramate as tolerated. Follow up in 8 weeks.",
    "Lumbar Disc Herniation":
      "Avoid bending, lifting, and twisting. Continue physical therapy. Use brace when ambulating. Follow up in 6 weeks for surgical outcome assessment.",
    "Plantar Fasciitis":
      "Continue stretching exercises daily. Wear orthotics consistently. Consider night splint use. Follow up in 4 weeks if no improvement.",
    "Carpal Tunnel Syndrome":
      "Use wrist splint nightly. Take NSAIDs as needed. Ergonomic assessment completed. Consider surgical release if no improvement in 8 weeks.",
    "Coronary Artery Disease - Annual Review":
      "Continue current medications. Maintain cardiac diet. Exercise 30min daily. Annual follow-up scheduled.",
    "Eczema Flare-up":
      "Apply triamcinolone as directed. Use fragrance-free moisturizers liberally. Avoid known triggers. Return if flare persists beyond 2 weeks.",
    "Urinary Tract Infection":
      "Complete antibiotic course. Increase water intake. Urinate after intercourse. Return if symptoms recur.",
    "Anxiety Disorder - GAD":
      "Continue sertraline daily. Attend CBT sessions weekly. Practice mindfulness exercises. Follow up in 6 weeks for medication adjustment.",
    "Sleep Apnea - Initial Diagnosis":
      "Use CPAP device nightly for at least 7 hours. Clean equipment weekly. Follow up in 3 months for compliance data review.",
    "Gastroesophageal Reflux Disease":
      "Continue omeprazole. Elevate head of bed. Avoid trigger foods. Follow up after EGD results.",
    "Sprained Ankle - Right":
      "Continue RICE protocol. Use ankle brace during activity. Begin physical therapy in 1 week. Return in 4 weeks for reassessment.",
    "Rotator Cuff Repair":
      "Wear sling continuously for 4 weeks. Begin passive ROM exercises at week 2. No lifting > 5 lbs for 12 weeks.",
    "Thyroid Function Monitoring":
      "Take levothyroxine on empty stomach 30min before breakfast. Recheck TSH in 8 weeks. Report palpitations or anxiety.",
  };
  return (
    recs[record.diagnosis] ||
    "Follow the treatment plan as discussed. Return for follow-up as recommended or sooner if symptoms worsen."
  );
}

function generateChiefComplaint(record: MedicalRecord): string {
  const complaints: Record<string, string> = {
    "Acute Bronchitis":
      "Persistent cough with productive sputum for 5 days, accompanied by low-grade fever and shortness of breath.",
    "Hypertension Checkup":
      "Routine follow-up for blood pressure management. Patient reports occasional headaches and fatigue.",
    "Seasonal Influenza":
      "Sudden onset of high fever, body aches, sore throat, and dry cough over the past 48 hours.",
    "Allergic Rhinitis":
      "Seasonal nasal congestion, sneezing, and itchy eyes worsening over the past 2 weeks.",
    "Type 2 Diabetes Mellitus":
      "Increased thirst, frequent urination, unexplained weight loss, and fatigue over the past month.",
    Appendicitis:
      "Acute right lower quadrant abdominal pain with nausea, vomiting, and fever started 12 hours ago.",
    "Hyperlipidemia Screening":
      "Routine screening. Patient asymptomatic. Family history of early heart disease.",
    "Migraine Treatment Adjustment":
      "Recurrent severe headaches with aura, photophobia, and nausea — 8 episodes per month.",
    "Lumbar Disc Herniation":
      "Severe lower back pain radiating to right leg with numbness and tingling for 3 weeks.",
    "Plantar Fasciitis":
      "Sharp heel pain upon waking, improving after walking, worsening after prolonged standing.",
    "Carpal Tunnel Syndrome":
      "Numbness and tingling in right hand, especially at night, for the past 2 months.",
    "Coronary Artery Disease - Annual Review":
      "Annual cardiac follow-up. Patient stable with no new symptoms or concerns.",
    Tonsillectomy:
      "Recurrent tonsillitis — 6 episodes in the past year with increasing severity.",
    "Eczema Flare-up":
      "Itchy, red, scaly patches on arms and legs worsening over the past week.",
    "Urinary Tract Infection":
      "Painful urination, frequent urge to urinate, and lower abdominal discomfort for 3 days.",
    "Colonoscopy Screening":
      "Routine colorectal cancer screening. Patient age 50, average risk, no symptoms.",
    "COVID-19 Booster Vaccination":
      "Routine COVID-19 booster vaccination. No acute concerns.",
    "Hepatitis B Screening":
      "Abnormal liver enzymes on routine labs. Patient asymptomatic.",
    "Renal Colic - Kidney Stone":
      "Acute onset of severe right flank pain radiating to groin, nausea, hematuria.",
    "Anxiety Disorder - GAD":
      "Excessive worry, restlessness, difficulty concentrating, and sleep disturbance for 6 months.",
    "Rotator Cuff Repair":
      "Chronic right shoulder pain and weakness, difficulty raising arm above shoulder level.",
    "Thyroid Function Monitoring":
      "Routine thyroid function monitoring. Patient on levothyroxine replacement therapy.",
    "Verruca Vulgaris (Wart) Treatment":
      "Single verruca on right index finger, present for 8 months, occasionally painful.",
    "Gastroesophageal Reflux Disease":
      "Frequent heartburn and regurgitation 4-5 times weekly, worse after meals and lying down.",
    "Sprained Ankle - Right":
      "Right ankle inversion injury during basketball 2 days ago with swelling and difficulty bearing weight.",
    "Shingles (Herpes Zoster) Vaccination":
      "Routine Shingrix vaccination. No acute concerns.",
    "Sleep Apnea - Initial Diagnosis":
      "Loud snoring, witnessed apneas, excessive daytime sleepiness, and morning headaches.",
  };
  return (
    complaints[record.diagnosis] ||
    `Patient presented for ${record.recordType} related to ${record.diagnosis}.`
  );
}

function generateSymptoms(record: MedicalRecord): string[] {
  const symptomMap: Record<string, string[]> = {
    "Acute Bronchitis": [
      "Persistent cough",
      "Productive sputum (yellow/green)",
      "Low-grade fever (99.8°F)",
      "Shortness of breath",
      "Chest congestion",
      "Fatigue",
    ],
    "Hypertension Checkup": [
      "Occasional headaches",
      "Fatigue",
      "Mild dizziness",
      "Nocturia (1-2x/night)",
    ],
    "Seasonal Influenza": [
      "High fever (102.1°F)",
      "Severe body aches",
      "Sore throat",
      "Dry cough",
      "Headache",
      "Chills",
    ],
    "Allergic Rhinitis": [
      "Nasal congestion",
      "Sneezing fits",
      "Itchy eyes",
      "Watery eyes",
      "Post-nasal drip",
    ],
    "Type 2 Diabetes Mellitus": [
      "Increased thirst (polydipsia)",
      "Frequent urination (polyuria)",
      "Unexplained weight loss",
      "Fatigue",
      "Blurred vision",
    ],
    Appendicitis: [
      "RLQ abdominal pain",
      "Nausea",
      "Vomiting (2 episodes)",
      "Fever (100.4°F)",
      "Loss of appetite",
      "Rebound tenderness",
    ],
    "Hyperlipidemia Screening": ["Asymptomatic", "Family history of CAD"],
    "Migraine Treatment Adjustment": [
      "Throbbing headache (unilateral)",
      "Visual aura",
      "Photophobia",
      "Phonophobia",
      "Nausea",
      "8 episodes/month",
    ],
    "Lumbar Disc Herniation": [
      "Lower back pain",
      "Radiating pain to right leg",
      "Numbness in right foot",
      "Tingling sensation",
      "Weakness when standing",
    ],
    "Plantar Fasciitis": [
      "Sharp heel pain (morning)",
      "Pain after prolonged sitting",
      "Tenderness on palpation",
      "Pain worsens with stairs",
    ],
    "Carpal Tunnel Syndrome": [
      "Hand numbness (nighttime)",
      "Tingling in thumb/index/middle",
      "Weak grip strength",
      "Shaking hand for relief",
    ],
    "Coronary Artery Disease - Annual Review": [
      "Asymptomatic",
      "Stable angina (controlled)",
      "No new symptoms",
    ],
    "Eczema Flare-up": [
      "Intense itching",
      "Red inflamed patches",
      "Dry scaly skin",
      "Cracking skin",
      "Affected: arms and legs",
    ],
    "Urinary Tract Infection": [
      "Dysuria (burning)",
      "Urinary frequency",
      "Urgency",
      "Suprapubic discomfort",
      "Cloudy urine",
    ],
    "Anxiety Disorder - GAD": [
      "Excessive worry",
      "Restlessness",
      "Poor concentration",
      "Sleep disturbance",
      "Muscle tension",
      "Irritability",
    ],
    "Renal Colic - Kidney Stone": [
      "Severe colicky flank pain",
      "Nausea/vomiting",
      "Hematuria",
      "Urinary frequency",
      "Restlessness",
    ],
    "Gastroesophageal Reflux Disease": [
      "Heartburn (4-5x/week)",
      "Regurgitation",
      "Chest discomfort",
      "Difficulty swallowing",
      "Chronic cough",
    ],
    "Sprained Ankle - Right": [
      "Ankle swelling",
      "Bruising",
      "Pain on weight-bearing",
      "Limited range of motion",
      "Tenderness",
    ],
    "Sleep Apnea - Initial Diagnosis": [
      "Loud snoring",
      "Witnessed apneas",
      "Daytime sleepiness",
      "Morning headache",
      "Dry mouth on waking",
    ],
    "Rotator Cuff Repair": [
      "Shoulder pain",
      "Weakness raising arm",
      "Pain at night",
      "Clicking sensation",
      "Limited range of motion",
    ],
  };
  return symptomMap[record.diagnosis] || ["As reported during consultation"];
}

function generateDoctorNotes(record: MedicalRecord): string {
  const notes: Record<string, string> = {
    "Acute Bronchitis":
      "Patient presents with acute onset of productive cough and fever. Lungs clear on auscultation with mild wheezing. Chest X-ray negative for consolidation. Likely viral etiology, but started antibiotics given purulent sputum. Advised rest and hydration. Will follow up if symptoms persist beyond 10 days.",
    "Type 2 Diabetes Mellitus":
      "New diagnosis of Type 2 Diabetes. Fasting glucose 145 mg/dL, HbA1c 7.8%. Patient educated on glucose monitoring, carbohydrate counting, and signs of hypo/hyperglycemia. Started metformin therapy. Referred to dietitian and diabetes educator. Lifestyle modifications discussed in detail.",
    Appendicitis:
      "Patient presented with classic RLQ pain with rebound tenderness. CT confirmed acute appendicitis with no evidence of perforation. Emergency laparoscopic appendectomy performed. Intra-operative findings: inflamed appendix without gangrene. Patient tolerated procedure well.",
    "Migraine Treatment Adjustment":
      "Patient experiencing 8 migraine days per month despite sumatriptan PRN. Switching to rizatriptan for better tolerability and adding topiramate for prophylaxis. Patient educated on slow titration of topiramate and potential side effects including paresthesias.",
    "Lumbar Disc Herniation":
      "MRI confirms large right-sided disc herniation at L4-L5 causing nerve root compression. Patient has significant radicular symptoms. Surgical intervention recommended after failure of conservative management. Microdiscectomy scheduled.",
    "Anxiety Disorder - GAD":
      "GAD-7 score 15 indicating moderate-severe anxiety. Patient motivated for treatment. Started SSRI (sertraline). Referred for CBT. Discussed lifestyle modifications including exercise, sleep hygiene, and mindfulness. Safety plan discussed.",
    "Coronary Artery Disease - Annual Review":
      "Patient stable since last review. Stress echocardiogram shows no ischemia. BP well-controlled on current medications. Lipid panel improved with atorvastatin. Continue current management. Next annual review scheduled.",
  };
  return (
    notes[record.diagnosis] ||
    record.notes ||
    "Patient evaluated and treated as per standard protocol. All vital signs stable. Treatment plan discussed with patient and questions addressed."
  );
}

function generateTreatmentData(record: MedicalRecord): TreatmentData {
  const hasProcedures = ["surgery", "procedure", "emergency-visit"].includes(
    record.recordType,
  );
  const hasLifestyle = !["vaccination", "procedure"].includes(
    record.recordType,
  );

  const procedureMap: Record<string, string[]> = {
    Appendicitis: [
      "Emergency laparoscopic appendectomy",
      "IV antibiotic administration",
      "Post-operative monitoring (24h)",
    ],
    "Lumbar Disc Herniation": [
      "Microdiscectomy at L4-L5",
      "Nerve root decompression",
      "Hemostasis and wound closure",
    ],
    Tonsillectomy: [
      "Coblation tonsillectomy bilateral",
      "Hemostasis achieved with suction cautery",
      "Post-operative observation (4h)",
    ],
    "Rotator Cuff Repair": [
      "Arthroscopic rotator cuff repair",
      "Subacromial decompression",
      "Suture anchor placement",
    ],
    "Colonoscopy Screening": [
      "Colonoscopy to cecum",
      "Two polypectomies (tubular adenoma, 5mm)",
      "Biopsy for pathology",
    ],
    "Ingrown Toenail Removal": [
      "Partial nail avulsion under local anesthesia",
      "Wound dressing",
      "Patient education on foot care",
    ],
    "Renal Colic - Kidney Stone": [
      "IV fluid resuscitation",
      "Pain management (ketorolac)",
      "Medical expulsive therapy (tamsulosin)",
    ],
  };

  const lifestyleMap: Record<string, string[]> = {
    "Acute Bronchitis": [
      "Increase fluid intake (8-10 glasses/day)",
      "Use humidifier at night",
      "Avoid smoking and secondhand smoke",
      "Get adequate rest",
      "Practice good hand hygiene",
    ],
    "Hypertension Checkup": [
      "Maintain low-sodium diet (< 1500mg/day)",
      "Exercise 30 min/day, 5 days/week",
      "Limit alcohol to 1 drink/day",
      "Practice stress reduction techniques",
      "Monitor BP daily at home",
    ],
    "Type 2 Diabetes Mellitus": [
      "Follow carbohydrate-controlled diet",
      "Monitor blood glucose 4x daily",
      "Exercise 30 min after meals",
      "Maintain healthy weight",
      "Check feet daily for cuts/sores",
    ],
    "Migraine Treatment Adjustment": [
      "Keep migraine diary",
      "Identify and avoid triggers",
      "Maintain consistent sleep schedule",
      "Stay hydrated",
      "Limit screen time during attacks",
    ],
    "Anxiety Disorder - GAD": [
      "Practice daily mindfulness (10 min)",
      "Regular exercise (30 min, 5x/week)",
      "Maintain consistent sleep routine",
      "Reduce caffeine intake",
      "Join support group",
    ],
    "Coronary Artery Disease - Annual Review": [
      "Continue heart-healthy diet",
      "Walk 30 minutes daily",
      "Monitor BP weekly",
      "Attend cardiac rehab sessions",
      "Take medications as prescribed",
    ],
    GERD: [
      "Elevate head of bed 6 inches",
      "Avoid eating 3 hours before bedtime",
      "Avoid trigger foods (spicy, fatty, citrus)",
      "Eat smaller, more frequent meals",
      "Maintain healthy weight",
    ],
    "Sleep Apnea - Initial Diagnosis": [
      "Use CPAP for minimum 7 hours/night",
      "Clean CPAP equipment weekly",
      "Sleep on side position",
      "Avoid alcohol before bedtime",
      "Lose weight if BMI > 30",
    ],
    "Sprained Ankle - Right": [
      "Rest and elevate ankle",
      "Ice 20 min every 2 hours",
      "Use ankle brace during activity",
      "Begin ROM exercises after 48 hours",
      "Gradual return to activity",
    ],
  };

  return {
    plan: record.treatment,
    procedures: hasProcedures
      ? procedureMap[record.diagnosis] || [
          "Standard procedure performed as planned",
        ]
      : [],
    medications: generateMedications(record),
    lifestyleAdvice: hasLifestyle
      ? lifestyleMap[record.diagnosis] || [
          "Follow standard post-treatment guidelines",
          "Rest and recover adequately",
          "Stay hydrated",
          "Monitor symptoms and report worsening",
          "Attend follow-up appointments",
        ]
      : [],
    nextVisit:
      record.status === "ongoing"
        ? getFutureDate(30)
        : record.recordType === "follow-up"
          ? getFutureDate(90)
          : null,
  };
}

function generateMedications(record: MedicalRecord): Medication[] {
  const medMap: Record<string, Medication[]> = {
    "Acute Bronchitis": [
      {
        name: "Amoxicillin",
        dosage: "500mg",
        frequency: "Three times daily",
        duration: "7 days",
        instructions:
          "Take with food. Complete full course even if symptoms improve.",
      },
      {
        name: "Dextromethorphan",
        dosage: "15mg",
        frequency: "Every 6 hours PRN",
        duration: "As needed for cough",
        instructions:
          "Do not exceed 4 doses in 24 hours. May cause drowsiness.",
      },
      {
        name: "Acetaminophen",
        dosage: "500mg",
        frequency: "Every 6 hours PRN",
        duration: "As needed for fever",
        instructions: "Max 4000mg per day. Take with food if upset stomach.",
      },
    ],
    "Hypertension Checkup": [
      {
        name: "Losartan",
        dosage: "75mg",
        frequency: "Once daily",
        duration: "Long-term",
        instructions:
          "Take at same time each day. Monitor BP weekly. Avoid potassium supplements.",
      },
    ],
    "Seasonal Influenza": [
      {
        name: "Oseltamivir (Tamiflu)",
        dosage: "75mg",
        frequency: "Twice daily",
        duration: "5 days",
        instructions:
          "Start within 48h of symptom onset. Take with food to reduce GI side effects.",
      },
      {
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "Every 6 hours PRN",
        duration: "As needed for fever/pain",
        instructions: "Take with food. Do not exceed 2400mg/day.",
      },
    ],
    "Allergic Rhinitis": [
      {
        name: "Cetirizine",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "During allergy season",
        instructions: "Take in evening. May cause mild drowsiness.",
      },
      {
        name: "Fluticasone Nasal Spray",
        dosage: "50mcg/spray",
        frequency: "2 sprays each nostril daily",
        duration: "During allergy season",
        instructions: "Prime before first use. Do not aim at nasal septum.",
      },
    ],
    "Type 2 Diabetes Mellitus": [
      {
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily with meals",
        duration: "Long-term",
        instructions:
          "Start with 1 tablet daily for 1 week, then increase. Take with food to reduce GI effects.",
      },
      {
        name: "Glucose Test Strips",
        dosage: "As directed",
        frequency: "4 times daily",
        duration: "Ongoing",
        instructions: "Test before meals and at bedtime. Log all readings.",
      },
    ],
    "Migraine Treatment Adjustment": [
      {
        name: "Rizatriptan ODT",
        dosage: "10mg",
        frequency: "At onset (max 2/day)",
        duration: "As needed for acute attacks",
        instructions:
          "Place on tongue — dissolves without water. Take at first sign of migraine. Max 10 doses/month.",
      },
      {
        name: "Topiramate",
        dosage: "25mg",
        frequency: "Once daily at bedtime",
        duration: "Long-term prophylaxis",
        instructions:
          "Start with 25mg daily. Increase by 25mg weekly to target 100mg/day. Drink plenty of water.",
      },
    ],
    "Anxiety Disorder - GAD": [
      {
        name: "Sertraline",
        dosage: "50mg",
        frequency: "Once daily",
        duration: "Long-term",
        instructions:
          "Take in morning with food. May take 4-6 weeks for full effect. Report any unusual thoughts.",
      },
    ],
    GERD: [
      {
        name: "Omeprazole",
        dosage: "20mg",
        frequency: "Once daily",
        duration: "8 weeks",
        instructions:
          "Take 30-60 minutes before breakfast. Swallow whole — do not crush.",
      },
    ],
    "Coronary Artery Disease - Annual Review": [
      {
        name: "Aspirin",
        dosage: "81mg",
        frequency: "Once daily",
        duration: "Long-term",
        instructions: "Take with food. Report any signs of bleeding.",
      },
      {
        name: "Atorvastatin",
        dosage: "40mg",
        frequency: "Once daily at bedtime",
        duration: "Long-term",
        instructions: "Take at same time daily. Avoid grapefruit juice.",
      },
    ],
    "Sleep Apnea - Initial Diagnosis": [
      {
        name: "CPAP Therapy",
        dosage: "8 cmH2O",
        frequency: "Every night (7+ hours)",
        duration: "Long-term",
        instructions:
          "Use humidifier if dryness occurs. Clean mask and tube weekly.",
      },
    ],
  };

  return (
    medMap[record.diagnosis] ||
    (record.recordType === "vaccination"
      ? []
      : [
          {
            name: "As prescribed",
            dosage: "Per prescription",
            frequency: "As directed",
            duration: "As directed",
            instructions: "Follow the prescribed medication regimen.",
          },
        ])
  );
}

function generatePrescriptions(record: MedicalRecord): PrescriptionData[] {
  const meds = generateMedications(record);
  return meds.map((m, i) => ({
    id: `RX-${record.id}-${i + 1}`,
    medicine: m.name,
    dosage: m.dosage,
    frequency: m.frequency,
    duration: m.duration,
    instructions: m.instructions,
    prescribedBy: record.doctor.name,
    date: record.date,
    refills: record.status === "ongoing" ? 3 : 0,
  }));
}

function generateLabResults(record: MedicalRecord): LabResultData[] {
  const labMap: Record<string, LabResultData[]> = {
    "Acute Bronchitis": [
      {
        id: `lab-${record.id}-1`,
        testName: "Complete Blood Count (CBC)",
        category: "Hematology",
        result: "WBC 12.5 ×10³/µL (elevated)",
        referenceRange: "4.5-11.0 ×10³/µL",
        status: "completed",
        date: record.date,
        notes: "Leukocytosis consistent with infection",
        flagged: true,
      },
      {
        id: `lab-${record.id}-2`,
        testName: "Chest X-Ray (2 views)",
        category: "Radiology",
        result: "Clear lung fields, no consolidation",
        referenceRange: "Normal",
        status: "completed",
        date: record.date,
        notes: "No evidence of pneumonia",
        flagged: false,
      },
      {
        id: `lab-${record.id}-3`,
        testName: "C-Reactive Protein",
        category: "Inflammation",
        result: "18 mg/L (elevated)",
        referenceRange: "<5 mg/L",
        status: "completed",
        date: record.date,
        notes: "Mild elevation indicating infection",
        flagged: true,
      },
      {
        id: `lab-${record.id}-4`,
        testName: "Influenza PCR",
        category: "Microbiology",
        result: "Negative",
        referenceRange: "Negative",
        status: "completed",
        date: record.date,
        notes: "Ruled out influenza",
        flagged: false,
      },
    ],
    "Type 2 Diabetes Mellitus": [
      {
        id: `lab-${record.id}-1`,
        testName: "Hemoglobin A1c",
        category: "Endocrinology",
        result: "7.8% (elevated)",
        referenceRange: "<5.7%",
        status: "completed",
        date: record.date,
        notes: "Diagnostic of diabetes. Target <7.0%",
        flagged: true,
      },
      {
        id: `lab-${record.id}-2`,
        testName: "Fasting Blood Glucose",
        category: "Endocrinology",
        result: "145 mg/dL (elevated)",
        referenceRange: "70-100 mg/dL",
        status: "completed",
        date: record.date,
        notes: "Confirms diabetes diagnosis",
        flagged: true,
      },
      {
        id: `lab-${record.id}-3`,
        testName: "Lipid Panel",
        category: "Endocrinology",
        result: "LDL 160, HDL 38, TG 180",
        referenceRange: "LDL <100, HDL >40, TG <150",
        status: "completed",
        date: record.date,
        notes: "Mixed dyslipidemia present",
        flagged: true,
      },
      {
        id: `lab-${record.id}-4`,
        testName: "Comprehensive Metabolic Panel",
        category: "Chemistry",
        result: "Normal renal and liver function",
        referenceRange: "Within normal limits",
        status: "completed",
        date: record.date,
        notes: "No end-organ damage detected",
        flagged: false,
      },
    ],
    "Hyperlipidemia Screening": [
      {
        id: `lab-${record.id}-1`,
        testName: "Lipid Panel",
        category: "Endocrinology",
        result: "LDL 160 mg/dL, HDL 38 mg/dL, TG 175 mg/dL",
        referenceRange: "LDL <100, HDL >40, TG <150",
        status: "completed",
        date: record.date,
        notes: "Moderate cardiovascular risk",
        flagged: true,
      },
      {
        id: `lab-${record.id}-2`,
        testName: "hs-CRP",
        category: "Inflammation",
        result: "2.4 mg/L",
        referenceRange: "<1.0 mg/L low, 1.0-3.0 mg/L moderate",
        status: "completed",
        date: record.date,
        notes: "Moderate cardiovascular risk",
        flagged: false,
      },
    ],
    Appendicitis: [
      {
        id: `lab-${record.id}-1`,
        testName: "CT Abdomen & Pelvis (with contrast)",
        category: "Radiology",
        result: "Acute appendicitis with 7mm Appendix",
        referenceRange: "Normal Appendix <6mm",
        status: "completed",
        date: record.date,
        notes: "No perforation or abscess",
        flagged: true,
      },
      {
        id: `lab-${record.id}-2`,
        testName: "Complete Blood Count (CBC)",
        category: "Hematology",
        result: "WBC 14.2 ×10³/µL (elevated)",
        referenceRange: "4.5-11.0 ×10³/µL",
        status: "completed",
        date: record.date,
        notes: "Leukocytosis with left shift",
        flagged: true,
      },
    ],
    "Migraine Treatment Adjustment": [
      {
        id: `lab-${record.id}-1`,
        testName: "MRI Brain (without contrast)",
        category: "Radiology",
        result: "Normal brain parenchyma, no masses",
        referenceRange: "Normal",
        status: "completed",
        date: record.date,
        notes: "Ruled out structural causes",
        flagged: false,
      },
    ],
    "Lumbar Disc Herniation": [
      {
        id: `lab-${record.id}-1`,
        testName: "MRI Lumbar Spine (with contrast)",
        category: "Radiology",
        result: "Large right paracentral disc herniation L4-L5",
        referenceRange: "Normal disc contour",
        status: "completed",
        date: record.date,
        notes: "Nerve root compression confirmed",
        flagged: true,
      },
    ],
    "Coronary Artery Disease - Annual Review": [
      {
        id: `lab-${record.id}-1`,
        testName: "Lipid Panel",
        category: "Cardiology",
        result: "LDL 98 mg/dL, HDL 42 mg/dL, TG 150 mg/dL",
        referenceRange: "LDL <100, HDL >40, TG <150",
        status: "completed",
        date: record.date,
        notes: "Well-controlled on statin",
        flagged: false,
      },
      {
        id: `lab-${record.id}-2`,
        testName: "Stress Echocardiogram",
        category: "Cardiology",
        result: "Normal wall motion, no ischemia",
        referenceRange: "Normal stress response",
        status: "completed",
        date: record.date,
        notes: "No evidence of inducible ischemia",
        flagged: false,
      },
      {
        id: `lab-${record.id}-3`,
        testName: "ECG (12-lead)",
        category: "Cardiology",
        result: "Normal sinus rhythm, no ST changes",
        referenceRange: "Normal",
        status: "completed",
        date: record.date,
        notes: "Stable cardiac status",
        flagged: false,
      },
    ],
    "Renal Colic - Kidney Stone": [
      {
        id: `lab-${record.id}-1`,
        testName: "CT KUB (without contrast)",
        category: "Radiology",
        result: "4mm ureteral stone at UVJ",
        referenceRange: "No stones",
        status: "completed",
        date: record.date,
        notes: "Stone amenable to medical therapy",
        flagged: true,
      },
      {
        id: `lab-${record.id}-2`,
        testName: "Urinalysis",
        category: "Urinalysis",
        result: "Hematuria, pH 6.5",
        referenceRange: "No blood, pH 4.5-8.0",
        status: "completed",
        date: record.date,
        notes: "Consistent with nephrolithiasis",
        flagged: true,
      },
      {
        id: `lab-${record.id}-3`,
        testName: "Serum Creatinine",
        category: "Chemistry",
        result: "0.95 mg/dL",
        referenceRange: "0.6-1.2 mg/dL",
        status: "completed",
        date: record.date,
        notes: "Normal renal function",
        flagged: false,
      },
    ],
    "Hepatitis B Screening": [
      {
        id: `lab-${record.id}-1`,
        testName: "HBsAg (Surface Antigen)",
        category: "Serology",
        result: "Negative",
        referenceRange: "Negative",
        status: "completed",
        date: record.date,
        notes: "No active infection",
        flagged: false,
      },
      {
        id: `lab-${record.id}-2`,
        testName: "Anti-HBs (Surface Antibody)",
        category: "Serology",
        result: "Negative (<10 mIU/mL)",
        referenceRange: ">10 mIU/mL = immune",
        status: "completed",
        date: record.date,
        notes: "Not immune — vaccination indicated",
        flagged: true,
      },
      {
        id: `lab-${record.id}-3`,
        testName: "Anti-HBc (Core Antibody)",
        category: "Serology",
        result: "Negative",
        referenceRange: "Negative",
        status: "completed",
        date: record.date,
        notes: "No prior exposure",
        flagged: false,
      },
      {
        id: `lab-${record.id}-4`,
        testName: "Liver Enzymes (ALT/AST)",
        category: "Chemistry",
        result: "ALT 62, AST 48 (mildly elevated)",
        referenceRange: "ALT <40, AST <40",
        status: "completed",
        date: record.date,
        notes: "Transaminitis — further workup",
        flagged: true,
      },
    ],
    "Sleep Apnea - Initial Diagnosis": [
      {
        id: `lab-${record.id}-1`,
        testName: "Home Sleep Apnea Test",
        category: "Sleep Medicine",
        result: "AHI 22 events/hour",
        referenceRange: "AHI <5 = normal, 5-15 = mild, 15-30 = moderate",
        status: "completed",
        date: record.date,
        notes: "Moderate obstructive sleep apnea",
        flagged: true,
      },
      {
        id: `lab-${record.id}-2`,
        testName: "Overnight Oximetry",
        category: "Sleep Medicine",
        result: "Baseline SpO2 97%, Nadir 84%",
        referenceRange: "Nadir >90%",
        status: "completed",
        date: record.date,
        notes: "Significant desaturations during REM",
        flagged: true,
      },
    ],
    "Colonoscopy Screening": [
      {
        id: `lab-${record.id}-1`,
        testName: "Colonoscopy with Biopsy",
        category: "Radiology",
        result: "Two benign polyps removed (tubular adenoma, 5mm)",
        referenceRange: "No polyps",
        status: "completed",
        date: record.date,
        notes: "Low-risk adenoma. Follow up in 5 years.",
        flagged: false,
      },
      {
        id: `lab-${record.id}-2`,
        testName: "Pathology — Polyp Analysis",
        category: "Pathology",
        result: "Tubular adenoma, low-grade dysplasia",
        referenceRange: "Benign",
        status: "completed",
        date: record.date,
        notes: "No malignant changes detected",
        flagged: false,
      },
    ],
    "Urinary Tract Infection": [
      {
        id: `lab-${record.id}-1`,
        testName: "Urinalysis with Microscopy",
        category: "Microbiology",
        result: "Positive for nitrites, leukocytes, bacteria",
        referenceRange: "Negative",
        status: "completed",
        date: record.date,
        notes: "Consistent with UTI",
        flagged: true,
      },
      {
        id: `lab-${record.id}-2`,
        testName: "Urine Culture & Sensitivity",
        category: "Microbiology",
        result: "E. coli > 10⁵ CFU/mL, sensitive to nitrofurantoin",
        referenceRange: "No growth",
        status: "completed",
        date: record.date,
        notes: "Organism identified and susceptible",
        flagged: true,
      },
    ],
    "Sprained Ankle - Right": [
      {
        id: `lab-${record.id}-1`,
        testName: "Ankle X-Ray (3 views)",
        category: "Radiology",
        result: "No fracture or dislocation. Soft tissue swelling.",
        referenceRange: "Normal",
        status: "completed",
        date: record.date,
        notes: "Ottawa Ankle Rules negative for fracture",
        flagged: false,
      },
    ],
    "Thyroid Function Monitoring": [
      {
        id: `lab-${record.id}-1`,
        testName: "TSH",
        category: "Endocrinology",
        result: "3.8 mIU/L (elevated)",
        referenceRange: "0.4-2.5 mIU/L",
        status: "completed",
        date: record.date,
        notes: "Slightly elevated — dosage adjustment needed",
        flagged: true,
      },
      {
        id: `lab-${record.id}-2`,
        testName: "Free T4",
        category: "Endocrinology",
        result: "1.0 ng/dL",
        referenceRange: "0.8-1.8 ng/dL",
        status: "completed",
        date: record.date,
        notes: "Low-normal range",
        flagged: false,
      },
    ],
    "Gastroesophageal Reflux Disease": [
      {
        id: `lab-${record.id}-1`,
        testName: "Upper Endoscopy (EGD)",
        category: "Radiology",
        result: "LA Grade A esophagitis, small hiatal hernia",
        referenceRange: "Normal mucosa",
        status: "completed",
        date: record.date,
        notes: "Mild esophagitis confirmed",
        flagged: true,
      },
    ],
    "Rotator Cuff Repair": [
      {
        id: `lab-${record.id}-1`,
        testName: "MRI Right Shoulder (with contrast)",
        category: "Radiology",
        result: "Full-thickness tear of supraspinatus tendon",
        referenceRange: "Intact tendon",
        status: "completed",
        date: record.date,
        notes: "Surgical repair indicated",
        flagged: true,
      },
      {
        id: `lab-${record.id}-2`,
        testName: "Shoulder X-Ray (3 views)",
        category: "Radiology",
        result: "No fracture, mild AC joint arthrosis",
        referenceRange: "Normal",
        status: "completed",
        date: record.date,
        notes: "No additional pathology",
        flagged: false,
      },
    ],
  };

  return labMap[record.diagnosis] || [];
}

function generateTimeline(record: MedicalRecord): TimelineEvent[] {
  const date = new Date(record.date);
  const events: TimelineEvent[] = [
    {
      id: `${record.id}-tl-1`,
      type: "booked",
      date: formatDateStr(date.setDate(date.getDate() - 14)),
      time: "10:30 AM",
      title: "Appointment Booked",
      description: `Appointment scheduled with ${record.doctor.name} for ${record.diagnosis}`,
      doctor: record.doctor.name,
    },
    {
      id: `${record.id}-tl-2`,
      type: "check-in",
      date: record.date,
      time: "09:45 AM",
      title: "Checked In",
      description:
        "Patient checked in at reception. Insurance verified. Consent forms completed.",
      doctor: record.doctor.name,
    },
    {
      id: `${record.id}-tl-3`,
      type: "consultation",
      date: record.date,
      time: "10:00 AM",
      title: "Consultation",
      description: `Initial consultation with ${record.doctor.name}. Chief complaint reviewed. Vitals recorded. Medical history discussed.`,
      doctor: record.doctor.name,
    },
  ];

  if (record.recordType !== "vaccination") {
    events.push({
      id: `${record.id}-tl-4`,
      type: "diagnosis",
      date: record.date,
      time: "10:30 AM",
      title: "Diagnosis",
      description: `${record.diagnosis} diagnosed. Treatment plan discussed with patient. Questions addressed.`,
      doctor: record.doctor.name,
    });
  }

  const hasMedications = !["vaccination", "procedure"].includes(
    record.recordType,
  );
  if (hasMedications) {
    events.push({
      id: `${record.id}-tl-5`,
      type: "prescription",
      date: record.date,
      time: "10:45 AM",
      title: "Prescription Issued",
      description:
        "Prescription provided. Dosage and administration instructions reviewed with patient.",
      doctor: record.doctor.name,
    });
  }

  const hasLab = record.attachments.length > 0;
  if (hasLab) {
    events.push({
      id: `${record.id}-tl-6`,
      type: "lab-test",
      date: record.date,
      time: "11:00 AM",
      title: "Lab Tests Ordered",
      description: `Laboratory tests ordered: ${record.attachments.map((a) => a.name).join(", ")}`,
      doctor: record.doctor.name,
    });
  }

  if (record.recordType === "follow-up" || record.status === "ongoing") {
    events.push({
      id: `${record.id}-tl-7`,
      type: "follow-up",
      date: getFutureDate(30),
      time: "10:00 AM",
      title: "Follow-up Scheduled",
      description: `Follow-up appointment scheduled to ${record.status === "ongoing" ? "monitor treatment progress" : "review test results"}.`,
      doctor: record.doctor.name,
    });
  }

  events.push({
    id: `${record.id}-tl-8`,
    type: "completed",
    date: record.date,
    time: "11:30 AM",
    title: "Visit Completed",
    description:
      "Consultation completed. All questions addressed. Patient discharged with treatment plan and follow-up instructions.",
    doctor: record.doctor.name,
  });

  return events;
}

function generateAttachments(
  record: MedicalRecord,
  labResults: LabResultData[],
): AttachmentDetail[] {
  const attachments: AttachmentDetail[] = [];

  record.attachments.forEach((att, i) => {
    let category: AttachmentCategory = "report";
    if (
      att.name.toLowerCase().includes("x-ray") ||
      att.name.toLowerCase().includes("mri") ||
      att.name.toLowerCase().includes("ct ")
    ) {
      category = "image";
    } else if (
      att.name.toLowerCase().includes("lab") ||
      att.name.toLowerCase().includes("blood") ||
      att.name.toLowerCase().includes("pathology")
    ) {
      category = "lab";
    } else if (att.name.toLowerCase().includes("prescription")) {
      category = "prescription";
    } else if (
      att.name.toLowerCase().includes("invoice") ||
      att.name.toLowerCase().includes("bill")
    ) {
      category = "invoice";
    }

    attachments.push({
      id: `att-det-${record.id}-${i}`,
      name: att.name,
      category,
      type: att.type,
      size: att.size,
      date: record.date,
      description: `${record.diagnosis} — ${att.name}`,
    });
  });

  // If no attachments from record, generate some default ones
  if (attachments.length === 0) {
    attachments.push({
      id: `att-det-${record.id}-gen-1`,
      name: "Consultation Summary",
      category: "report",
      type: "PDF",
      size: "0.3 MB",
      date: record.date,
      description: `Visit summary for ${record.diagnosis}`,
    });
    if (labResults.length > 0) {
      attachments.push({
        id: `att-det-${record.id}-gen-2`,
        name: "Lab Results Summary",
        category: "lab",
        type: "PDF",
        size: "0.2 MB",
        date: record.date,
        description: `Laboratory results for ${record.diagnosis}`,
      });
    }
  }

  return attachments;
}

function generateRelatedRecords(record: MedicalRecord): RelatedRecord[] {
  const allRecords = mockMedicalRecords;
  const currentIndex = allRecords.findIndex((r) => r.id === record.id);
  const related: RelatedRecord[] = [];

  // Previous visit by same doctor
  const prevByDoctor = allRecords
    .filter((r) => r.doctor.id === record.doctor.id && r.date < record.date)
    .sort((a, b) => b.date.localeCompare(a.date));
  if (prevByDoctor.length > 0) {
    related.push({
      id: prevByDoctor[0].id,
      date: prevByDoctor[0].date,
      diagnosis: prevByDoctor[0].diagnosis,
      doctor: prevByDoctor[0].doctor,
      recordType: prevByDoctor[0].recordType,
      relationship: "previous",
    });
  }

  // Next visit by same doctor
  const nextByDoctor = allRecords
    .filter((r) => r.doctor.id === record.doctor.id && r.date > record.date)
    .sort((a, b) => a.date.localeCompare(b.date));
  if (nextByDoctor.length > 0) {
    related.push({
      id: nextByDoctor[0].id,
      date: nextByDoctor[0].date,
      diagnosis: nextByDoctor[0].diagnosis,
      doctor: nextByDoctor[0].doctor,
      recordType: nextByDoctor[0].recordType,
      relationship: "next",
    });
  }

  // Similar diagnoses (same department, different doctor, closest dates)
  const similar = allRecords
    .filter(
      (r) =>
        r.id !== record.id &&
        r.department === record.department &&
        r.date < record.date,
    )
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 1);
  similar.forEach((r) => {
    related.push({
      id: r.id,
      date: r.date,
      diagnosis: r.diagnosis,
      doctor: r.doctor,
      recordType: r.recordType,
      relationship: "similar",
    });
  });

  return related;
}

function generatePatientNotes(record: MedicalRecord): string | null {
  const notes: Record<string, string> = {
    "Acute Bronchitis":
      "I've been feeling much better after starting the antibiotics. The cough is still there but less frequent. I'm trying to rest as much as possible.",
    "Migraine Treatment Adjustment":
      "I really hope the new medication works better. I've been missing work because of these migraines and it's affecting my daily life. The sumatriptan made me feel nauseous.",
    "Type 2 Diabetes Mellitus":
      "I'm worried about this diagnosis but I'm determined to make changes. I've already started reducing sugar in my diet. Would like more information about carb counting.",
    "Anxiety Disorder - GAD":
      "I've been feeling anxious for years and I'm glad I finally spoke up. I'm a bit nervous about starting medication but willing to try.",
  };
  return notes[record.diagnosis] || null;
}

/* ─── Helper functions ─── */

function formatDateStr(ms: number): string {
  const d = new Date(ms);
  return d.toISOString().slice(0, 10);
}

function getFutureDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

/* ─── Main data generator ─── */

export function getRecordDetailData(id: string): RecordDetailData | undefined {
  const record = mockMedicalRecords.find((r) => r.id === id);
  if (!record) return undefined;

  const vitals = generateVitals(record);
  const diagnosis = generateDiagnosis(record);
  const treatment = generateTreatmentData(record);
  const prescriptions = generatePrescriptions(record);
  const labResults = generateLabResults(record);
  const timeline = generateTimeline(record);
  const relatedRecords = generateRelatedRecords(record);
  const attachments = generateAttachments(record, labResults);
  const symptoms = generateSymptoms(record);
  const chiefComplaint = generateChiefComplaint(record);
  const doctorNotes = generateDoctorNotes(record);
  const patientNotes = generatePatientNotes(record);

  return {
    record,
    vitals,
    diagnosis,
    treatment,
    prescriptions,
    labResults,
    attachments,
    timeline,
    relatedRecords,
    symptoms,
    chiefComplaint,
    doctorNotes,
    patientNotes,
  };
}
