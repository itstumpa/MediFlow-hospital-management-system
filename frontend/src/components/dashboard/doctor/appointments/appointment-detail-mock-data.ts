/* ============================================
   Appointment Detail — Mock Data & Types
   Consultation workspace data for UI demo.
   ============================================ */

/* ─── Types ─────────────────────────────────────────────── */

export type ConsultationStatus =
  | "Waiting"
  | "Checked In"
  | "In Progress"
  | "Completed";

export interface VitalsData {
  bloodPressure: string;
  heartRate: number;
  temperature: string;
  height: string;
  weight: string;
  bmi: number;
  oxygenSaturation: number;
  recordedAt: string;
}

export interface ChronicCondition {
  condition: string;
  since: string;
  status: string;
}

export interface AllergyEntry {
  allergen: string;
  severity: "Mild" | "Moderate" | "Severe";
  reaction: string;
}

export interface MedicationEntry {
  name: string;
  dosage: string;
  frequency: string;
  started: string;
  prescribedBy: string;
}

export interface SurgeryEntry {
  procedure: string;
  date: string;
  hospital: string;
}

export interface MedicalHistoryData {
  previousVisits: { date: string; reason: string; doctor: string }[];
  chronicConditions: ChronicCondition[];
  allergies: AllergyEntry[];
  currentMedications: MedicationEntry[];
  surgeries: SurgeryEntry[];
}

export interface PrescriptionEntry {
  id: string;
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface LabRequestEntry {
  id: string;
  test: string;
  status: "Pending" | "Collected" | "Processing" | "Completed";
  priority: "Routine" | "Urgent" | "STAT";
  notes?: string;
}

export interface AttachmentEntry {
  id: string;
  name: string;
  type: "Medical Image" | "Report" | "Document";
  date: string;
  size: string;
  url: string;
}

export interface TimelineEntry {
  id: string;
  action: string;
  description: string;
  time: string;
  icon: string;
  completed: boolean;
}

export interface UpcomingAppointmentData {
  id: string;
  date: string;
  time: string;
  reason: string;
}

export interface EmergencyContactData {
  name: string;
  relationship: string;
  phone: string;
}

export interface QuickActionItem {
  id: string;
  label: string;
  icon: string;
  action: string;
}

export interface AppointmentPatientData {
  id: string;
  name: string;
  initials: string;
  age: number;
  gender: string;
  bloodGroup: string;
  patientId: string;
  phone: string;
  insurance: string;
  avatarGradient: string;
}

export interface AppointmentDetailData {
  id: string;
  appointmentId: string;
  patient: AppointmentPatientData;
  date: string;
  time: string;
  status: ConsultationStatus;
  reasonForVisit: string;
  chiefComplaint: string;
  symptoms: string[];
  previousDiagnosis: string;
  doctorNotes: string;
  vitals: VitalsData;
  medicalHistory: MedicalHistoryData;
  prescriptions: PrescriptionEntry[];
  labRequests: LabRequestEntry[];
  attachments: AttachmentEntry[];
  timeline: TimelineEntry[];
  upcomingAppointments: UpcomingAppointmentData[];
  emergencyContact: EmergencyContactData;
  quickActions: QuickActionItem[];
  patientSummary: string;
}

/* ─── Status Config ─────────────────────────────────────── */

export const consultationStatusStyleMap: Record<
  ConsultationStatus,
  { bg: string; dot: string; text: string; label: string }
> = {
  Waiting: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    dot: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    label: "Waiting",
  },
  "Checked In": {
    bg: "bg-dash-primary-light dark:bg-teal-950/30",
    dot: "bg-dash-primary",
    text: "text-dash-primary dark:text-accent",
    label: "Checked In",
  },
  "In Progress": {
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    dot: "bg-indigo-500",
    text: "text-indigo-600 dark:text-indigo-400",
    label: "In Progress",
  },
  Completed: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    dot: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    label: "Completed",
  },
};

/* ─── Mock Data ─────────────────────────────────────────── */

export const mockAppointmentDetails: Record<string, AppointmentDetailData> = {
  "apt-001": {
    id: "apt-001",
    appointmentId: "APT-2026-0101",
    patient: {
      id: "PAT-001",
      name: "Emily Johnson",
      initials: "EJ",
      age: 34,
      gender: "Female",
      bloodGroup: "A+",
      patientId: "PAT-001",
      phone: "+1 (555) 123-4567",
      insurance: "Blue Cross Premium",
      avatarGradient: "from-dash-primary to-dash-primary-dark",
    },
    date: "July 14, 2026",
    time: "08:00 AM — 08:30 AM",
    status: "Completed",
    reasonForVisit:
      "Routine annual checkup and blood pressure review. Patient has a history of mild hypertension managed with lifestyle changes.",
    chiefComplaint:
      "Patient reports occasional headaches over the past month, particularly in the evenings. No associated visual disturbances or nausea.",
    symptoms: [
      "Occasional evening headaches (2-3 per week)",
      "Mild fatigue towards end of day",
      "Occasional palpitations when stressed",
    ],
    previousDiagnosis:
      "Stage 1 Hypertension (ICD-10: I10) — diagnosed March 2025. Patient has been managing with diet and exercise. No medication prescribed to date.",
    doctorNotes:
      "Patient is generally healthy. BP slightly elevated at 132/84 but within acceptable range for lifestyle-managed hypertension. Recommended continued monitoring, stress management techniques, and follow-up in 3 months. No medication changes needed at this time.",
    vitals: {
      bloodPressure: "132/84",
      heartRate: 76,
      temperature: "98.6°F",
      height: "5'6\"",
      weight: "145 lbs",
      bmi: 23.4,
      oxygenSaturation: 98,
      recordedAt: "08:15 AM",
    },
    medicalHistory: {
      previousVisits: [
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
        {
          date: "Mar 15, 2025",
          reason: "Initial hypertension diagnosis",
          doctor: "Dr. James Wilson",
        },
      ],
      chronicConditions: [
        {
          condition: "Stage 1 Hypertension",
          since: "March 2025",
          status: "Managed",
        },
      ],
      allergies: [
        {
          allergen: "Penicillin",
          severity: "Moderate",
          reaction: "Skin rash, hives",
        },
        {
          allergen: "Sulfa Drugs",
          severity: "Mild",
          reaction: "Nausea",
        },
      ],
      currentMedications: [
        {
          name: "Multivitamin",
          dosage: "1 tablet daily",
          frequency: "Once daily",
          started: "Jan 2024",
          prescribedBy: "Self",
        },
      ],
      surgeries: [],
    },
    prescriptions: [
      {
        id: "rx-001",
        medicine: "Lisinopril 5mg",
        dosage: "5 mg",
        frequency: "Once daily",
        duration: "30 days",
        instructions:
          "Take orally with or without food. Monitor blood pressure weekly.",
      },
    ],
    labRequests: [
      {
        id: "lab-001",
        test: "Complete Blood Count (CBC)",
        status: "Completed",
        priority: "Routine",
        notes: "Fasting required",
      },
      {
        id: "lab-002",
        test: "Lipid Profile",
        status: "Completed",
        priority: "Routine",
        notes: "12-hour fasting required",
      },
      {
        id: "lab-003",
        test: "HbA1c",
        status: "Pending",
        priority: "Routine",
      },
    ],
    attachments: [
      {
        id: "att-001",
        name: "Lab Results — CBC March 2026",
        type: "Report",
        date: "Mar 10, 2026",
        size: "245 KB",
        url: "#",
      },
      {
        id: "att-002",
        name: "ECG Report — March 2026",
        type: "Medical Image",
        date: "Mar 10, 2026",
        size: "1.2 MB",
        url: "#",
      },
      {
        id: "att-003",
        name: "Insurance Authorization Form",
        type: "Document",
        date: "Jan 15, 2026",
        size: "89 KB",
        url: "#",
      },
    ],
    timeline: [
      {
        id: "tl-001",
        action: "Appointment Created",
        description: "Appointment was scheduled by patient",
        time: "Jun 20, 2026 — 10:30 AM",
        icon: "CalendarPlus",
        completed: true,
      },
      {
        id: "tl-002",
        action: "Patient Checked In",
        description: "Patient arrived at clinic",
        time: "Jul 14, 2026 — 07:55 AM",
        icon: "UserCheck",
        completed: true,
      },
      {
        id: "tl-003",
        action: "Consultation Started",
        description: "Dr. Sarah Mitchell began consultation",
        time: "Jul 14, 2026 — 08:02 AM",
        icon: "Stethoscope",
        completed: true,
      },
      {
        id: "tl-004",
        action: "Vitals Recorded",
        description: "Nurse recorded patient vitals",
        time: "Jul 14, 2026 — 08:10 AM",
        icon: "Activity",
        completed: true,
      },
      {
        id: "tl-005",
        action: "Prescription Added",
        description: "Lisinopril 5mg prescribed",
        time: "Jul 14, 2026 — 08:22 AM",
        icon: "Pill",
        completed: true,
      },
      {
        id: "tl-006",
        action: "Consultation Completed",
        description: "Appointment marked as completed",
        time: "Jul 14, 2026 — 08:28 AM",
        icon: "CheckCircle2",
        completed: true,
      },
    ],
    upcomingAppointments: [
      {
        id: "apt-future-001",
        date: "Oct 14, 2026",
        time: "08:30 AM",
        reason: "Follow-up — BP Review",
      },
      {
        id: "apt-future-002",
        date: "Jan 14, 2027",
        time: "09:00 AM",
        reason: "Quarterly Checkup",
      },
    ],
    emergencyContact: {
      name: "Michael Johnson",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543",
    },
    quickActions: [
      {
        id: "qa-001",
        label: "Schedule Follow-up",
        icon: "CalendarPlus",
        action: "schedule",
      },
      {
        id: "qa-002",
        label: "Refer to Specialist",
        icon: "UserRound",
        action: "refer",
      },
      {
        id: "qa-003",
        label: "Print Summary",
        icon: "Printer",
        action: "print",
      },
    ],
    patientSummary:
      "34-year-old female with Stage 1 Hypertension (managed). No significant surgical history. Known allergies to Penicillin and Sulfa drugs. Generally healthy, active lifestyle.",
  },

  "apt-008": {
    id: "apt-008",
    appointmentId: "APT-2026-0108",
    patient: {
      id: "PAT-008",
      name: "Anna Martinez",
      initials: "AM",
      age: 47,
      gender: "Female",
      bloodGroup: "O-",
      patientId: "PAT-008",
      phone: "+1 (555) 234-5678",
      insurance: "United Health Plus",
      avatarGradient: "from-violet-500 to-purple-500",
    },
    date: "July 14, 2026",
    time: "11:30 AM — 12:15 PM",
    status: "In Progress",
    reasonForVisit:
      "Follow-up for lung function test results. Patient has a history of asthma and has been experiencing increased shortness of breath over the past 2 weeks.",
    chiefComplaint:
      "Shortness of breath during moderate exertion. Patient reports needing to use rescue inhaler 3-4 times per week, up from 1-2 times per month.",
    symptoms: [
      "Increased shortness of breath on exertion",
      "Occasional wheezing at night",
      "Dry cough, particularly in mornings",
      "Reduced exercise tolerance",
    ],
    previousDiagnosis:
      "Persistent Moderate Asthma (ICD-10: J45.40) — diagnosed 2019. Well-controlled on current regimen until recent exacerbation.",
    doctorNotes:
      "Patient shows signs of asthma exacerbation. Lung function tests show reduced FEV1/FVC ratio compared to previous visit. Discussed trigger avoidance and proper inhaler technique. Will adjust maintenance therapy.",
    vitals: {
      bloodPressure: "118/76",
      heartRate: 82,
      temperature: "98.4°F",
      height: "5'4\"",
      weight: "152 lbs",
      bmi: 26.1,
      oxygenSaturation: 95,
      recordedAt: "11:35 AM",
    },
    medicalHistory: {
      previousVisits: [
        {
          date: "Apr 22, 2026",
          reason: "Asthma review — lung function tests",
          doctor: "Dr. Sarah Mitchell",
        },
        {
          date: "Jan 10, 2026",
          reason: "Routine asthma checkup",
          doctor: "Dr. Sarah Mitchell",
        },
        {
          date: "Sep 5, 2025",
          reason: "Seasonal allergy assessment",
          doctor: "Dr. Rachel Green",
        },
      ],
      chronicConditions: [
        {
          condition: "Persistent Moderate Asthma",
          since: "2019",
          status: "Managed — Recent Exacerbation",
        },
        {
          condition: "Seasonal Allergies",
          since: "2015",
          status: "Managed",
        },
      ],
      allergies: [
        {
          allergen: "Pollen (Seasonal)",
          severity: "Moderate",
          reaction: "Sneezing, itchy eyes, wheezing",
        },
        {
          allergen: "Dust Mites",
          severity: "Mild",
          reaction: "Nasal congestion, sneezing",
        },
        {
          allergen: "Aspirin",
          severity: "Moderate",
          reaction: "Respiratory difficulty, hives",
        },
      ],
      currentMedications: [
        {
          name: "Fluticasone/Salmeterol 250/50mcg",
          dosage: "1 inhalation twice daily",
          frequency: "Twice daily",
          started: "Jan 2024",
          prescribedBy: "Dr. Sarah Mitchell",
        },
        {
          name: "Albuterol HFA 90mcg (Rescue)",
          dosage: "2 puffs as needed",
          frequency: "As needed",
          started: "2019",
          prescribedBy: "Dr. Sarah Mitchell",
        },
        {
          name: "Montelukast 10mg",
          dosage: "1 tablet at bedtime",
          frequency: "Once daily",
          started: "Mar 2026",
          prescribedBy: "Dr. Sarah Mitchell",
        },
      ],
      surgeries: [
        {
          procedure: "Tonsillectomy",
          date: "June 2005",
          hospital: "City General Hospital",
        },
      ],
    },
    prescriptions: [
      {
        id: "rx-008-001",
        medicine: "Fluticasone/Salmeterol 250/50mcg",
        dosage: "1 inhalation twice daily",
        frequency: "Twice daily",
        duration: "90 days",
        instructions: "Rinse mouth after use. Continue maintenance therapy.",
      },
      {
        id: "rx-008-002",
        medicine: "Prednisone 40mg",
        dosage: "40 mg once daily",
        frequency: "Once daily",
        duration: "5 days",
        instructions:
          "Short course for acute exacerbation. Take with food. Decrease dose by 10mg every 2 days.",
      },
    ],
    labRequests: [
      {
        id: "lab-008-001",
        test: "Pulmonary Function Test",
        status: "Completed",
        priority: "Urgent",
        notes: "Pre and post bronchodilator",
      },
      {
        id: "lab-008-002",
        test: "Complete Blood Count (CBC)",
        status: "Pending",
        priority: "Routine",
      },
      {
        id: "lab-008-003",
        test: "IgE Levels",
        status: "Pending",
        priority: "Routine",
      },
      {
        id: "lab-008-004",
        test: "Chest X-Ray",
        status: "Pending",
        priority: "Urgent",
        notes: "PA and Lateral views",
      },
    ],
    attachments: [
      {
        id: "att-008-001",
        name: "PFT Report — April 2026",
        type: "Report",
        date: "Apr 22, 2026",
        size: "320 KB",
        url: "#",
      },
      {
        id: "att-008-002",
        name: "Chest X-Ray — April 2026",
        type: "Medical Image",
        date: "Apr 22, 2026",
        size: "2.1 MB",
        url: "#",
      },
      {
        id: "att-008-003",
        name: "Asthma Action Plan",
        type: "Document",
        date: "Jan 10, 2026",
        size: "112 KB",
        url: "#",
      },
      {
        id: "att-008-004",
        name: "Referral — Pulmonology Consult",
        type: "Document",
        date: "Apr 22, 2026",
        size: "78 KB",
        url: "#",
      },
    ],
    timeline: [
      {
        id: "tl-008-001",
        action: "Appointment Created",
        description: "Follow-up scheduled by Dr. Mitchell's office",
        time: "Jul 1, 2026 — 2:15 PM",
        icon: "CalendarPlus",
        completed: true,
      },
      {
        id: "tl-008-002",
        action: "Patient Checked In",
        description: "Patient arrived at clinic",
        time: "Jul 14, 2026 — 11:20 AM",
        icon: "UserCheck",
        completed: true,
      },
      {
        id: "tl-008-003",
        action: "Consultation Started",
        description: "Consultation in progress",
        time: "Jul 14, 2026 — 11:32 AM",
        icon: "Stethoscope",
        completed: true,
      },
      {
        id: "tl-008-004",
        action: "Vitals Recorded",
        description: "Nurse recorded patient vitals",
        time: "Jul 14, 2026 — 11:35 AM",
        icon: "Activity",
        completed: true,
      },
      {
        id: "tl-008-005",
        action: "Lab Tests Ordered",
        description: "CBC, IgE, Chest X-Ray ordered",
        time: "Pending",
        icon: "FlaskConical",
        completed: false,
      },
      {
        id: "tl-008-006",
        action: "Prescription Updated",
        description: "Prednisone short course added",
        time: "Pending",
        icon: "Pill",
        completed: false,
      },
      {
        id: "tl-008-007",
        action: "Consultation Completed",
        description: "Awaiting completion",
        time: "Pending",
        icon: "CheckCircle2",
        completed: false,
      },
    ],
    upcomingAppointments: [
      {
        id: "apt-future-008-001",
        date: "Jul 21, 2026",
        time: "11:00 AM",
        reason: "Follow-up — Symptom Review",
      },
      {
        id: "apt-future-008-002",
        date: "Oct 14, 2026",
        time: "10:00 AM",
        reason: "Quarterly Asthma Review",
      },
    ],
    emergencyContact: {
      name: "Carlos Martinez",
      relationship: "Brother",
      phone: "+1 (555) 876-5432",
    },
    quickActions: [
      {
        id: "qa-008-001",
        label: "Schedule Follow-up",
        icon: "CalendarPlus",
        action: "schedule",
      },
      {
        id: "qa-008-002",
        label: "Refer to Pulmonology",
        icon: "UserRound",
        action: "refer",
      },
      {
        id: "qa-008-003",
        label: "Print Asthma Action Plan",
        icon: "Printer",
        action: "print",
      },
    ],
    patientSummary:
      "47-year-old female with Persistent Moderate Asthma (diagnosed 2019). Recent exacerbation triggered by seasonal allergies. Allergic to Aspirin. Non-smoker. Active lifestyle with reduced exercise tolerance.",
  },
};

/* ─── Helper ────────────────────────────────────────────── */

export const tabOptions = [
  { id: "overview", label: "Overview" },
  { id: "vitals", label: "Vitals" },
  { id: "history", label: "Medical History" },
  { id: "notes", label: "Notes" },
  { id: "prescription", label: "Prescription" },
  { id: "lab-requests", label: "Lab Requests" },
  { id: "attachments", label: "Attachments" },
  { id: "timeline", label: "Timeline" },
] as const;

export type TabId = (typeof tabOptions)[number]["id"];
