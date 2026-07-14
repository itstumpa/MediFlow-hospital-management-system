/* ============================================
   Patient Profile — Mock Data & Types
   ============================================ */

export interface VitalsData {
  height: string;
  weight: string;
  bmi: number;
  bloodPressure: string;
  heartRate: number;
  temperature: string;
  oxygenSaturation: number;
}

export interface MedicationItem {
  name: string;
  dosage: string;
  frequency: string;
}

export interface DiagnosisItem {
  condition: string;
  date: string;
  notes: string;
}

export interface SurgeryItem {
  procedure: string;
  date: string;
  hospital: string;
}

export interface HospitalizationItem {
  reason: string;
  date: string;
  hospital: string;
  duration: string;
}

export interface PreviousTreatmentItem {
  treatment: string;
  date: string;
  provider: string;
}

export interface FamilyHistoryItem {
  relation: string;
  condition: string;
}

export interface AppointmentHistoryItem {
  id: string;
  date: string;
  doctor: string;
  department: string;
  diagnosis: string;
  status: string;
}

export interface PrescriptionHistoryItem {
  id: string;
  medicine: string;
  dosage: string;
  duration: string;
  doctor: string;
  status: "Active" | "Completed" | "Discontinued";
}

export interface LabReportItem {
  id: string;
  testName: string;
  date: string;
  status: "Completed" | "Pending" | "Reviewed";
}

export interface AllergyItem {
  type: "Medicine" | "Food" | "Environmental";
  allergen: string;
  severity: "Mild" | "Moderate" | "Severe";
  reaction: string;
}

export interface VaccinationItem {
  name: string;
  date: string;
  nextDue: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: "PDF" | "Image" | "Scan" | "Invoice";
  date: string;
  category: "Medical" | "Insurance" | "Administrative";
}

export interface TimelineEntry {
  id: string;
  date: string;
  event: string;
  type:
    | "registration"
    | "appointment"
    | "prescription"
    | "surgery"
    | "lab"
    | "vaccination";
}

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

export interface RiskScore {
  overall: "Low" | "Moderate" | "High";
  score: number;
  factors: string[];
}

export interface PatientProfile {
  id: string;
  patientId: string;
  name: string;
  initials: string;
  avatarGradient: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  bloodGroup: string;
  phone: string;
  email: string;
  address: string;
  insurance: string;
  emergencyContact: EmergencyContact;
  medicalAlerts: { type: string; label: string; severity: string }[];
  vitals: VitalsData;
  chiefComplaint: string;
  currentSymptoms: string[];
  doctorNotes: string;
  currentMedications: MedicationItem[];
  chronicDiseases: string[];
  lifestyleNotes: string;
  diagnoses: DiagnosisItem[];
  surgeries: SurgeryItem[];
  hospitalizations: HospitalizationItem[];
  previousTreatments: PreviousTreatmentItem[];
  familyHistory: FamilyHistoryItem[];
  mentalHealthNotes: string;
  appointmentHistory: AppointmentHistoryItem[];
  prescriptionHistory: PrescriptionHistoryItem[];
  labReports: LabReportItem[];
  allergies: AllergyItem[];
  vaccinations: VaccinationItem[];
  documents: DocumentItem[];
  timeline: TimelineEntry[];
  riskScore: RiskScore;
  upcomingAppointment: string | null;
}

/* ── Mock Data ── */

const patient1: PatientProfile = {
  id: "P001",
  patientId: "PAT-001",
  name: "Sarah Johnson",
  initials: "SJ",
  avatarGradient: "from-blue-400 to-cyan-500",
  age: 34,
  gender: "Female",
  bloodGroup: "A+",
  phone: "+1 (555) 123-4567",
  email: "sarah.johnson@example.com",
  address: "123 Elm Street, Springfield, IL 62701",
  insurance: "BlueCross BlueShield — PPO Plan",
  emergencyContact: {
    name: "Michael Johnson",
    relation: "Spouse",
    phone: "+1 (555) 987-6543",
  },
  medicalAlerts: [
    {
      type: "Allergy",
      label: "Penicillin — Severe Reaction",
      severity: "Severe",
    },
    {
      type: "Chronic Condition",
      label: "Type 2 Diabetes — Managed",
      severity: "Managed",
    },
  ],

  vitals: {
    height: "5'6\" (168 cm)",
    weight: "72 kg (159 lbs)",
    bmi: 26.2,
    bloodPressure: "128/84",
    heartRate: 76,
    temperature: "98.6°F",
    oxygenSaturation: 98,
  },

  chiefComplaint:
    "Persistent lower back pain for 3 weeks with occasional numbness in left leg.",
  currentSymptoms: [
    "Lower back pain (aching, 6/10)",
    "Left leg numbness",
    "Morning stiffness (30 min)",
    "Difficulty sitting for prolonged periods",
  ],
  doctorNotes:
    "Patient reports onset after lifting heavy boxes. Pain radiates down left posterior thigh. No bowel or bladder dysfunction. Recommend physiotherapy and NSAIDs.",
  currentMedications: [
    {
      name: "Metformin",
      dosage: "500 mg",
      frequency: "Twice daily with meals",
    },
    {
      name: "Ibuprofen",
      dosage: "400 mg",
      frequency: "As needed for pain, max 3x/day",
    },
    { name: "Lisinopril", dosage: "10 mg", frequency: "Once daily" },
  ],
  chronicDiseases: [
    "Type 2 Diabetes (diagnosed 2019)",
    "Hypertension (diagnosed 2021)",
  ],
  lifestyleNotes:
    "Sedentary desk job. Smokes occasionally (3-4/week). No regular exercise. Diet high in processed foods.",

  diagnoses: [
    {
      condition: "Lumbar Strain with Sciatica",
      date: "Mar 2026",
      notes: "MRI confirmed mild disc bulge at L4-L5",
    },
    {
      condition: "Type 2 Diabetes",
      date: "Sep 2019",
      notes: "HbA1c 7.2% — managed with Metformin",
    },
    {
      condition: "Hypertension (Stage 1)",
      date: "Jan 2021",
      notes: "Controlled with Lisinopril",
    },
  ],
  surgeries: [
    {
      procedure: "Laparoscopic Cholecystectomy",
      date: "Jun 2022",
      hospital: "Springfield General Hospital",
    },
  ],
  hospitalizations: [
    {
      reason: "Diabetic Ketoacidosis",
      date: "Aug 2020",
      hospital: "Springfield General Hospital",
      duration: "3 days",
    },
  ],
  previousTreatments: [
    {
      treatment: "Physical Therapy — Lower Back",
      date: "2024",
      provider: "Dr. Lisa Ray",
    },
    {
      treatment: "Dietary Counseling",
      date: "2023",
      provider: "Nutrition Clinic",
    },
  ],
  familyHistory: [
    { relation: "Father", condition: "Type 2 Diabetes, Heart Disease" },
    { relation: "Mother", condition: "Hypertension, Osteoarthritis" },
    { relation: "Brother (42)", condition: "Type 2 Diabetes" },
  ],
  mentalHealthNotes:
    "Patient reports occasional anxiety related to chronic condition management. No diagnosed mental health condition.",

  appointmentHistory: [
    {
      id: "APT-301",
      date: "2026-07-12",
      doctor: "Dr. Emily Carter",
      department: "Orthopedics",
      diagnosis: "Lumbar Strain",
      status: "Completed",
    },
    {
      id: "APT-289",
      date: "2026-06-28",
      doctor: "Dr. Emily Carter",
      department: "Orthopedics",
      diagnosis: "Follow-up — Back Pain",
      status: "Completed",
    },
    {
      id: "APT-245",
      date: "2026-05-15",
      doctor: "Dr. James Wilson",
      department: "Endocrinology",
      diagnosis: "Diabetes Check-up",
      status: "Completed",
    },
    {
      id: "APT-201",
      date: "2026-03-10",
      doctor: "Dr. Sarah Lee",
      department: "Cardiology",
      diagnosis: "Hypertension Monitoring",
      status: "Completed",
    },
    {
      id: "APT-178",
      date: "2026-01-05",
      doctor: "Dr. Emily Carter",
      department: "Orthopedics",
      diagnosis: "Initial Back Pain",
      status: "Completed",
    },
  ],

  prescriptionHistory: [
    {
      id: "RX-401",
      medicine: "Metformin 500mg",
      dosage: "1 tablet twice daily",
      duration: "Ongoing",
      doctor: "Dr. James Wilson",
      status: "Active",
    },
    {
      id: "RX-398",
      medicine: "Ibuprofen 400mg",
      dosage: "As needed — max 3/day",
      duration: "2 weeks",
      doctor: "Dr. Emily Carter",
      status: "Active",
    },
    {
      id: "RX-378",
      medicine: "Lisinopril 10mg",
      dosage: "1 tablet daily",
      duration: "Ongoing",
      doctor: "Dr. Sarah Lee",
      status: "Active",
    },
    {
      id: "RX-350",
      medicine: "Amoxicillin 500mg",
      dosage: "1 capsule 3x/day",
      duration: "7 days",
      doctor: "Dr. Mark Taylor",
      status: "Completed",
    },
    {
      id: "RX-325",
      medicine: "Omeprazole 20mg",
      dosage: "1 capsule daily",
      duration: "4 weeks",
      doctor: "Dr. James Wilson",
      status: "Completed",
    },
  ],

  labReports: [
    {
      id: "LAB-501",
      testName: "Complete Blood Count (CBC)",
      date: "2026-07-10",
      status: "Completed",
    },
    {
      id: "LAB-502",
      testName: "HbA1c",
      date: "2026-07-10",
      status: "Completed",
    },
    {
      id: "LAB-503",
      testName: "Lipid Panel",
      date: "2026-07-10",
      status: "Completed",
    },
    {
      id: "LAB-504",
      testName: "Lumbar MRI",
      date: "2026-06-25",
      status: "Reviewed",
    },
    {
      id: "LAB-505",
      testName: "Urinalysis",
      date: "2026-06-28",
      status: "Completed",
    },
    {
      id: "LAB-506",
      testName: "Vitamin D Level",
      date: "2026-05-15",
      status: "Pending",
    },
  ],

  allergies: [
    {
      type: "Medicine",
      allergen: "Penicillin",
      severity: "Severe",
      reaction: "Anaphylaxis (hives, swelling, difficulty breathing)",
    },
    {
      type: "Medicine",
      allergen: "Sulfa Drugs",
      severity: "Moderate",
      reaction: "Skin rash, itching",
    },
    {
      type: "Food",
      allergen: "Shellfish",
      severity: "Moderate",
      reaction: "Nausea, hives",
    },
    {
      type: "Environmental",
      allergen: "Pollen (Seasonal)",
      severity: "Mild",
      reaction: "Sneezing, watery eyes",
    },
    {
      type: "Environmental",
      allergen: "Latex",
      severity: "Mild",
      reaction: "Contact dermatitis",
    },
  ],

  vaccinations: [
    { name: "Influenza (2025-2026)", date: "Oct 2025", nextDue: "Oct 2026" },
    {
      name: "COVID-19 (Bivalent Booster)",
      date: "Sep 2025",
      nextDue: "Sep 2026",
    },
    { name: "Tdap (Tetanus)", date: "Jan 2023", nextDue: "Jan 2033" },
    { name: "Hepatitis B Series", date: "Completed 2018", nextDue: "N/A" },
    { name: "Pneumococcal", date: "Mar 2024", nextDue: "Mar 2029" },
  ],

  documents: [
    {
      id: "DOC-001",
      name: "Lumbar MRI Report",
      type: "PDF",
      date: "2026-06-26",
      category: "Medical",
    },
    {
      id: "DOC-002",
      name: "Lumbar MRI Scans",
      type: "Image",
      date: "2026-06-25",
      category: "Medical",
    },
    {
      id: "DOC-003",
      name: "Blood Work Results — Jul 2026",
      type: "PDF",
      date: "2026-07-10",
      category: "Medical",
    },
    {
      id: "DOC-004",
      name: "Insurance Authorization Form",
      type: "PDF",
      date: "2026-05-01",
      category: "Insurance",
    },
    {
      id: "DOC-005",
      name: "Hospital Discharge Summary — Aug 2020",
      type: "PDF",
      date: "2020-08-15",
      category: "Medical",
    },
    {
      id: "DOC-006",
      name: "Invoice — Laparoscopic Cholecystectomy",
      type: "Invoice",
      date: "2022-06-20",
      category: "Administrative",
    },
    {
      id: "DOC-007",
      name: "Chest X-Ray (Pre-op)",
      type: "Image",
      date: "2022-06-10",
      category: "Medical",
    },
    {
      id: "DOC-008",
      name: "Vaccination Record Card",
      type: "Scan",
      date: "2025-10-15",
      category: "Medical",
    },
  ],

  timeline: [
    {
      id: "TL-01",
      date: "Sep 2019",
      event: "Diagnosed with Type 2 Diabetes",
      type: "appointment",
    },
    {
      id: "TL-02",
      date: "Jan 2021",
      event: "Diagnosed with Hypertension",
      type: "appointment",
    },
    {
      id: "TL-03",
      date: "Jun 2022",
      event: "Laparoscopic Cholecystectomy Surgery",
      type: "surgery",
    },
    {
      id: "TL-04",
      date: "Aug 2020",
      event: "Hospitalized — Diabetic Ketoacidosis",
      type: "appointment",
    },
    {
      id: "TL-05",
      date: "Jan 2026",
      event: "Initial Consultation — Lower Back Pain",
      type: "appointment",
    },
    {
      id: "TL-06",
      date: "Jun 2026",
      event: "MRI Lumbar Spine Completed",
      type: "lab",
    },
    {
      id: "TL-07",
      date: "Jul 2026",
      event: "Prescribed Ibuprofen & Physiotherapy",
      type: "prescription",
    },
  ],

  riskScore: {
    overall: "Moderate",
    score: 62,
    factors: [
      "Uncontrolled Type 2 Diabetes (HbA1c 7.2%)",
      "Hypertension (Stage 1)",
      "Sedentary lifestyle",
      "Smoking (occasional)",
      "Family history of heart disease",
    ],
  },
  upcomingAppointment:
    "Jul 28, 2026 at 10:30 AM — Dr. Emily Carter (Orthopedics)",
};

const patient2: PatientProfile = {
  id: "P002",
  patientId: "PAT-002",
  name: "James Rodriguez",
  initials: "JR",
  avatarGradient: "from-emerald-400 to-teal-500",
  age: 58,
  gender: "Male",
  bloodGroup: "O-",
  phone: "+1 (555) 234-5678",
  email: "james.rodriguez@example.com",
  address: "456 Oak Avenue, Springfield, IL 62702",
  insurance: "Medicare Part D",
  emergencyContact: {
    name: "Elena Rodriguez",
    relation: "Spouse",
    phone: "+1 (555) 876-5432",
  },
  medicalAlerts: [
    {
      type: "Chronic Condition",
      label: "Coronary Artery Disease",
      severity: "High",
    },
    { type: "Allergy", label: "Codeine — Severe Reaction", severity: "Severe" },
  ],
  vitals: {
    height: "5'10\" (178 cm)",
    weight: "92 kg (203 lbs)",
    bmi: 29.8,
    bloodPressure: "145/92",
    heartRate: 82,
    temperature: "98.4°F",
    oxygenSaturation: 96,
  },
  chiefComplaint:
    "Chest tightness on exertion lasting 5-10 minutes, relieved by rest.",
  currentSymptoms: [
    "Chest tightness with stairs",
    "Shortness of breath walking uphill",
    "Occasional palpitations",
  ],
  doctorNotes:
    "Suspect stable angina. Ordered stress test and echocardiogram. Continue current cardiac medications.",
  currentMedications: [
    { name: "Aspirin 81mg", dosage: "1 tablet daily", frequency: "Once daily" },
    {
      name: "Atorvastatin 40mg",
      dosage: "1 tablet at bedtime",
      frequency: "Once daily",
    },
    {
      name: "Metoprolol 50mg",
      dosage: "1 tablet twice daily",
      frequency: "Twice daily",
    },
  ],
  chronicDiseases: [
    "Coronary Artery Disease (diagnosed 2020)",
    "Hyperlipidemia (diagnosed 2018)",
  ],
  lifestyleNotes:
    "Retired teacher. Walks daily but limited by chest tightness. Non-smoker. Occasional alcohol.",
  diagnoses: [
    {
      condition: "Stable Angina",
      date: "Feb 2026",
      notes: "Awaits stress test results",
    },
    {
      condition: "Coronary Artery Disease",
      date: "Jun 2020",
      notes: "Status post stent placement LAD",
    },
    {
      condition: "Hyperlipidemia",
      date: "Mar 2018",
      notes: "LDL managed with Atorvastatin",
    },
  ],
  surgeries: [
    {
      procedure: "Cardiac Catheterization with Stent (LAD)",
      date: "Jul 2020",
      hospital: "Springfield Heart Institute",
    },
  ],
  hospitalizations: [
    {
      reason: "Chest Pain Observation",
      date: "Feb 2026",
      hospital: "Springfield Heart Institute",
      duration: "1 day",
    },
  ],
  previousTreatments: [
    {
      treatment: "Cardiac Rehabilitation Program",
      date: "2020-2021",
      provider: "Springfield Heart Institute",
    },
  ],
  familyHistory: [
    { relation: "Father", condition: "Heart Attack at 62, Type 2 Diabetes" },
    { relation: "Mother", condition: "Hypertension, Stroke at 70" },
  ],
  mentalHealthNotes:
    "No concerns. Patient is optimistic and engaged in care plan.",
  appointmentHistory: [
    {
      id: "APT-303",
      date: "2026-07-14",
      doctor: "Dr. Sarah Lee",
      department: "Cardiology",
      diagnosis: "Stable Angina Follow-up",
      status: "Completed",
    },
    {
      id: "APT-290",
      date: "2026-06-20",
      doctor: "Dr. Sarah Lee",
      department: "Cardiology",
      diagnosis: "Chest Pain Evaluation",
      status: "Completed",
    },
    {
      id: "APT-250",
      date: "2026-04-10",
      doctor: "Dr. Sarah Lee",
      department: "Cardiology",
      diagnosis: "Routine Cardiac Check",
      status: "Completed",
    },
  ],
  prescriptionHistory: [
    {
      id: "RX-405",
      medicine: "Aspirin 81mg",
      dosage: "1 tablet daily",
      duration: "Ongoing",
      doctor: "Dr. Sarah Lee",
      status: "Active",
    },
    {
      id: "RX-404",
      medicine: "Atorvastatin 40mg",
      dosage: "1 tablet at bedtime",
      duration: "Ongoing",
      doctor: "Dr. Sarah Lee",
      status: "Active",
    },
    {
      id: "RX-403",
      medicine: "Metoprolol 50mg",
      dosage: "1 tablet twice daily",
      duration: "Ongoing",
      doctor: "Dr. Sarah Lee",
      status: "Active",
    },
  ],
  labReports: [
    {
      id: "LAB-510",
      testName: "Lipid Panel",
      date: "2026-07-10",
      status: "Completed",
    },
    {
      id: "LAB-511",
      testName: "Troponin Level",
      date: "2026-07-14",
      status: "Completed",
    },
    {
      id: "LAB-512",
      testName: "Stress Test",
      date: "2026-07-18",
      status: "Pending",
    },
  ],
  allergies: [
    {
      type: "Medicine",
      allergen: "Codeine",
      severity: "Severe",
      reaction: "Anaphylaxis",
    },
  ],
  vaccinations: [
    { name: "Influenza (2025-2026)", date: "Oct 2025", nextDue: "Oct 2026" },
    {
      name: "COVID-19 (Bivalent Booster)",
      date: "Sep 2025",
      nextDue: "Sep 2026",
    },
    { name: "Pneumococcal", date: "Mar 2024", nextDue: "Mar 2029" },
  ],
  documents: [
    {
      id: "DOC-101",
      name: "Cardiac Cath Report — Jul 2020",
      type: "PDF",
      date: "2020-07-15",
      category: "Medical",
    },
    {
      id: "DOC-102",
      name: "Echocardiogram Report",
      type: "PDF",
      date: "2026-06-20",
      category: "Medical",
    },
  ],
  timeline: [
    {
      id: "TL-08",
      date: "Mar 2018",
      event: "Diagnosed with Hyperlipidemia",
      type: "appointment",
    },
    {
      id: "TL-09",
      date: "Jun 2020",
      event: "Cardiac Stent Placement (LAD)",
      type: "surgery",
    },
    {
      id: "TL-10",
      date: "Feb 2026",
      event: "Hospitalized — Chest Pain Observation",
      type: "appointment",
    },
    {
      id: "TL-11",
      date: "Jul 2026",
      event: "Stress Test Ordered",
      type: "lab",
    },
  ],
  riskScore: {
    overall: "High",
    score: 78,
    factors: [
      "Coronary Artery Disease",
      "Uncontrolled BP (145/92)",
      "Obesity (BMI 29.8)",
      "Family history of heart disease",
    ],
  },
  upcomingAppointment: "Jul 21, 2026 at 9:00 AM — Stress Test (Cardiology)",
};

export const mockPatientProfiles: Record<string, PatientProfile> = {
  P001: patient1,
  "PAT-001": patient1,
  P002: patient2,
  "PAT-002": patient2,
};

/** Tab definitions for the patient profile page */
export type ProfileTabId =
  | "overview"
  | "medical-history"
  | "appointments"
  | "prescriptions"
  | "lab-reports"
  | "allergies"
  | "vaccinations"
  | "documents"
  | "timeline";

export interface ProfileTabOption {
  id: ProfileTabId;
  label: string;
}

export const profileTabOptions: ProfileTabOption[] = [
  { id: "overview", label: "Overview" },
  { id: "medical-history", label: "Medical History" },
  { id: "appointments", label: "Appointments" },
  { id: "prescriptions", label: "Prescriptions" },
  { id: "lab-reports", label: "Lab Reports" },
  { id: "allergies", label: "Allergies" },
  { id: "vaccinations", label: "Vaccinations" },
  { id: "documents", label: "Documents" },
  { id: "timeline", label: "Timeline" },
];
