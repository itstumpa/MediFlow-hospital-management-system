// ============================================================
// Types & Mock Data — Appointment Detail View
// ============================================================

export interface AppointmentPatient {
  id: string;
  name: string;
  avatar: string;
  age: number;
  gender: string;
  bloodGroup: string;
  phone: string;
  email: string;
  medicalAlerts: string[];
  insurance: { provider: string; id: string; type: string };
  emergencyContact: { name: string; relationship: string; phone: string };
}

export interface AppointmentDoctor {
  id: string;
  name: string;
  avatar: string;
  department: string;
  specialization: string;
  experience: number;
  availability: string;
  consultationFee: number;
  rating: number;
}

export interface PrescriptionItem {
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes: string;
}

export interface BillingInfo {
  invoiceNumber: string;
  paymentMethod: string;
  amount: number;
  status: "paid" | "unpaid" | "partial" | "refunded";
  discount: number;
  tax: number;
  total: number;
}

export interface ActivityEntry {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  type:
    | "created"
    | "confirmed"
    | "checked-in"
    | "started"
    | "completed"
    | "payment"
    | "cancelled";
}

export interface AppointmentAttachment {
  name: string;
  url: string;
  size: string;
  type: string;
}

export interface AppointmentStats {
  appointmentDuration: string;
  waitingTime: string;
  visitCount: number;
  previousAppointments: number;
  outstandingBills: number;
}

export interface AppointmentDetail {
  id: string;
  appointmentId: string;
  patient: AppointmentPatient;
  doctor: AppointmentDoctor;
  department: string;
  date: string;
  time: string;
  duration: number;
  consultationType: "Video" | "In-Person" | "Phone" | "Emergency";
  status:
    | "scheduled"
    | "confirmed"
    | "in-progress"
    | "completed"
    | "cancelled"
    | "no-show";
  paymentStatus: "paid" | "unpaid" | "partial" | "refunded";
  stats: AppointmentStats;
  reasonForVisit: string;
  symptoms: string[];
  priority: "low" | "medium" | "high" | "emergency";
  notes: string;
  diagnosis: string;
  treatment: string;
  recommendations: string[];
  attachments: AppointmentAttachment[];
  prescriptions: PrescriptionItem[];
  billing: BillingInfo;
  activity: ActivityEntry[];
  nextAppointment: {
    date: string;
    time: string;
    doctor: string;
  } | null;
}

// ============================================================
// Mock Data
// ============================================================

export const mockAppointmentDetails: Record<string, AppointmentDetail> = {
  "APT-2026-001": {
    id: "APT-2026-001",
    appointmentId: "APT-2026-001",
    patient: {
      id: "PAT-0042",
      name: "John Smith",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      age: 45,
      gender: "Male",
      bloodGroup: "A+",
      phone: "+1 (555) 234-5678",
      email: "john.smith@email.com",
      medicalAlerts: ["Penicillin Allergy", "Hypertension"],
      insurance: {
        provider: "Blue Cross Blue Shield",
        id: "BCS-98472-1",
        type: "Premium PPO",
      },
      emergencyContact: {
        name: "Sarah Smith",
        relationship: "Spouse",
        phone: "+1 (555) 234-5679",
      },
    },
    doctor: {
      id: "DOC-001",
      name: "Dr. Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face",
      department: "Cardiology",
      specialization: "Interventional Cardiology",
      experience: 18,
      availability: "Mon–Fri, 8:00 AM – 4:00 PM",
      consultationFee: 250,
      rating: 4.9,
    },
    department: "Cardiology",
    date: "2026-07-14",
    time: "09:00 AM",
    duration: 45,
    consultationType: "In-Person",
    status: "confirmed",
    paymentStatus: "unpaid",
    stats: {
      appointmentDuration: "45 min",
      waitingTime: "12 min",
      visitCount: 12,
      previousAppointments: 11,
      outstandingBills: 0,
    },
    reasonForVisit:
      "Follow-up on recent cardiac stress test results and medication adjustment for hypertension management.",
    symptoms: [
      "Mild chest discomfort",
      "Shortness of breath on exertion",
      "Occasional dizziness",
      "Fatigue",
    ],
    priority: "medium",
    notes:
      "Patient has a history of hypertension and elevated cholesterol. Recent stress test showed mild ischemia in the inferior wall. Currently on Metoprolol 50mg and Atorvastatin 20mg. Need to review latest lipid panel and consider dose adjustment.",
    diagnosis:
      "Essential hypertension (I10) with mild inferior wall ischemia on stress testing. Hyperlipidemia. Patient is responding well to current medication regimen but requires closer monitoring of blood pressure trends.",
    treatment:
      "1. Continue Metoprolol 50mg daily — increased to 75mg if BP remains >140/90 at next check\n2. Continue Atorvastatin 20mg daily\n3. Add low-dose Aspirin 81mg daily\n4. Dietary consultation for DASH diet plan\n5. Follow-up stress echocardiogram in 3 months",
    recommendations: [
      "Low-sodium DASH diet with emphasis on whole grains and leafy greens",
      "Moderate aerobic exercise — 30 min brisk walking, 5 days per week",
      "Daily blood pressure monitoring — log readings",
      "Reduce caffeine intake to 1 cup per day",
      "Follow-up in 4 weeks for BP check and medication review",
    ],
    attachments: [
      {
        name: "Cardiac_Stress_Report.pdf",
        url: "#",
        size: "2.4 MB",
        type: "PDF",
      },
      {
        name: "Lipid_Panel_Results.pdf",
        url: "#",
        size: "1.1 MB",
        type: "PDF",
      },
      {
        name: "ECG_Tracing_Jul2026.png",
        url: "#",
        size: "3.8 MB",
        type: "Image",
      },
      {
        name: "Insurance_PreAuth.pdf",
        url: "#",
        size: "0.8 MB",
        type: "PDF",
      },
    ],
    prescriptions: [
      {
        medicine: "Metoprolol Succinate",
        dosage: "50 mg",
        frequency: "Once daily — morning",
        duration: "90 days",
        notes: "Increase to 75mg if resting HR > 80 bpm after 2 weeks",
      },
      {
        medicine: "Atorvastatin",
        dosage: "20 mg",
        frequency: "Once daily — evening",
        duration: "90 days",
        notes: "Take with dinner. Monitor for muscle pain.",
      },
      {
        medicine: "Aspirin",
        dosage: "81 mg",
        frequency: "Once daily — morning",
        duration: "90 days",
        notes: "Low-dose, enteric-coated. Take with food.",
      },
    ],
    billing: {
      invoiceNumber: "INV-2026-0892",
      paymentMethod: "Credit Card (Visa)",
      amount: 250,
      status: "unpaid",
      discount: 0,
      tax: 25.0,
      total: 275.0,
    },
    activity: [
      {
        id: "act-1",
        action: "Appointment Created",
        description: "Appointment booked by patient via online portal",
        timestamp: "2026-06-28 14:32:00",
        type: "created",
      },
      {
        id: "act-2",
        action: "Confirmed by Staff",
        description: "Front desk confirmed availability with doctor",
        timestamp: "2026-06-28 16:15:00",
        type: "confirmed",
      },
      {
        id: "act-3",
        action: "Insurance Verified",
        description: "Pre-authorization confirmed by insurance provider",
        timestamp: "2026-07-01 10:00:00",
        type: "confirmed",
      },
      {
        id: "act-4",
        action: "Payment Processed",
        description: "Co-payment of $75 received via card",
        timestamp: "2026-07-10 09:30:00",
        type: "payment",
      },
    ],
    nextAppointment: {
      date: "2026-08-11",
      time: "09:00 AM",
      doctor: "Dr. Sarah Johnson",
    },
  },

  "APT-2026-002": {
    id: "APT-2026-002",
    appointmentId: "APT-2026-002",
    patient: {
      id: "PAT-0087",
      name: "Emily Davis",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
      age: 32,
      gender: "Female",
      bloodGroup: "O-",
      phone: "+1 (555) 987-6543",
      email: "emily.davis@email.com",
      medicalAlerts: ["Sulfa Allergy"],
      insurance: {
        provider: "Aetna Health",
        id: "AET-45123-7",
        type: "Gold HMO",
      },
      emergencyContact: {
        name: "James Davis",
        relationship: "Brother",
        phone: "+1 (555) 987-6544",
      },
    },
    doctor: {
      id: "DOC-003",
      name: "Dr. Michael Chen",
      avatar:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
      department: "Neurology",
      specialization: "Clinical Neurophysiology",
      experience: 14,
      availability: "Mon–Thu, 9:00 AM – 5:00 PM",
      consultationFee: 300,
      rating: 4.8,
    },
    department: "Neurology",
    date: "2026-07-12",
    time: "10:30 AM",
    duration: 60,
    consultationType: "Video",
    status: "completed",
    paymentStatus: "paid",
    stats: {
      appointmentDuration: "60 min",
      waitingTime: "5 min",
      visitCount: 5,
      previousAppointments: 4,
      outstandingBills: 0,
    },
    reasonForVisit:
      "Recurring migraine headaches with aura — evaluate current treatment efficacy and consider prophylactic therapy adjustment.",
    symptoms: [
      "Throbbing headache (unilateral)",
      "Visual aura — flashing lights",
      "Nausea and photophobia",
      "Episode frequency: 3–4 per month",
    ],
    priority: "medium",
    notes:
      "Patient has been on Topiramate 50mg for 6 months. Reports partial improvement but episodes still frequent. No new neurological deficits. MRI brain from 3 months ago was normal.",
    diagnosis:
      "Chronic migraine with typical aura (G43.109). Patient demonstrates good response to triptan therapy but requires optimization of prophylactic regimen to reduce frequency below 2 episodes per month.",
    treatment:
      "1. Increase Topiramate to 75mg nightly for 2 weeks, then reassess\n2. Continue Rizatriptan 10mg as needed for acute attacks (max 10 days/month)\n3. Start Vitamin B2 (Riboflavin) 400mg daily\n4. Magnesium Citrate 500mg daily\n5. Headache diary — track triggers and frequency",
    recommendations: [
      "Maintain consistent sleep schedule — 7-8 hours nightly",
      "Identify and avoid dietary triggers (aged cheese, red wine, MSG)",
      "Stay hydrated — minimum 2L water daily",
      "Stress management through mindfulness or yoga",
      "Follow-up in 8 weeks or sooner if symptoms worsen",
    ],
    attachments: [
      {
        name: "MRI_Brain_Report.pdf",
        url: "#",
        size: "4.2 MB",
        type: "PDF",
      },
      {
        name: "Headache_Diary_Jun2026.pdf",
        url: "#",
        size: "0.6 MB",
        type: "PDF",
      },
    ],
    prescriptions: [
      {
        medicine: "Topiramate",
        dosage: "75 mg",
        frequency: "Once daily — bedtime",
        duration: "60 days",
        notes: "Titrate up from 50mg. Watch for cognitive side effects.",
      },
      {
        medicine: "Rizatriptan",
        dosage: "10 mg",
        frequency: "As needed — at onset of migraine",
        duration: "30 days",
        notes: "Max 10 tablets per month. Take at first sign of aura.",
      },
      {
        medicine: "Vitamin B2 (Riboflavin)",
        dosage: "400 mg",
        frequency: "Once daily — morning",
        duration: "90 days",
        notes: "May cause bright yellow urine — harmless.",
      },
    ],
    billing: {
      invoiceNumber: "INV-2026-0891",
      paymentMethod: "Credit Card (Amex)",
      amount: 300,
      status: "paid",
      discount: 0,
      tax: 30.0,
      total: 330.0,
    },
    activity: [
      {
        id: "act-1",
        action: "Appointment Created",
        description: "Booked via patient portal",
        timestamp: "2026-07-01 09:15:00",
        type: "created",
      },
      {
        id: "act-2",
        action: "Confirmed by Staff",
        description: "Confirmed by neurology scheduling",
        timestamp: "2026-07-01 11:30:00",
        type: "confirmed",
      },
      {
        id: "act-3",
        action: "Checked In",
        description: "Patient checked in via video platform",
        timestamp: "2026-07-12 10:25:00",
        type: "checked-in",
      },
      {
        id: "act-4",
        action: "Consultation Started",
        description: "Video consultation began",
        timestamp: "2026-07-12 10:32:00",
        type: "started",
      },
      {
        id: "act-5",
        action: "Consultation Completed",
        description: "Consultation ended. Prescription updated.",
        timestamp: "2026-07-12 11:28:00",
        type: "completed",
      },
      {
        id: "act-6",
        action: "Payment Received",
        description: "Full payment of $330 received",
        timestamp: "2026-07-12 11:35:00",
        type: "payment",
      },
    ],
    nextAppointment: {
      date: "2026-09-06",
      time: "10:30 AM",
      doctor: "Dr. Michael Chen",
    },
  },

  "APT-2026-003": {
    id: "APT-2026-003",
    appointmentId: "APT-2026-003",
    patient: {
      id: "PAT-0123",
      name: "Robert Wilson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      age: 58,
      gender: "Male",
      bloodGroup: "B+",
      phone: "+1 (555) 456-7890",
      email: "robert.wilson@email.com",
      medicalAlerts: ["Diabetes Type 2", "Latex Allergy"],
      insurance: {
        provider: "UnitedHealthcare",
        id: "UHC-78214-3",
        type: "Standard PPO",
      },
      emergencyContact: {
        name: "Martha Wilson",
        relationship: "Spouse",
        phone: "+1 (555) 456-7891",
      },
    },
    doctor: {
      id: "DOC-005",
      name: "Dr. Amanda Patel",
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
      department: "Orthopedics",
      specialization: "Joint Replacement",
      experience: 16,
      availability: "Mon–Fri, 7:00 AM – 3:00 PM",
      consultationFee: 350,
      rating: 4.7,
    },
    department: "Orthopedics",
    date: "2026-07-15",
    time: "02:00 PM",
    duration: 30,
    consultationType: "In-Person",
    status: "scheduled",
    paymentStatus: "unpaid",
    stats: {
      appointmentDuration: "30 min",
      waitingTime: "—",
      visitCount: 8,
      previousAppointments: 7,
      outstandingBills: 150.0,
    },
    reasonForVisit:
      "Post-operative follow-up 6 weeks after right total knee replacement surgery. Assess recovery progress and physical therapy milestones.",
    symptoms: [
      "Mild post-operative pain (2/10)",
      "Some stiffness in morning",
      "Slight swelling around knee",
    ],
    priority: "low",
    notes:
      "Post-op day 42. Patient had right TKR on June 3, 2026. Incision healing well. Currently on home PT program. Needs assessment of ROM and decision on advancing to outpatient PT.",
    diagnosis:
      "Status post right total knee arthroplasty (Z96.691). Recovery progressing as expected with good wound healing and improving range of motion. Mild quadriceps weakness noted.",
    treatment:
      "1. Continue home physical therapy exercises — focus on quad sets, SLR, and heel slides\n2. Transition to outpatient PT — 2x/week for 6 weeks\n3. Continue Eliquis 2.5mg BID for VTE prophylaxis through week 8\n4. Continue Acetaminophen 650mg QID as needed for pain",
    recommendations: [
      "Outpatient PT 2x weekly for 6 weeks — focus on gait training and strength",
      "Ice and elevate knee 3–4x daily for swelling management",
      "Use cane until gait is stable without limp — approximately 2 more weeks",
      "No heavy lifting (>20 lbs) or impact activities for 3 more months",
      "Follow-up with X-ray in 6 weeks",
    ],
    attachments: [
      {
        name: "PostOp_XRay_RKnee.pdf",
        url: "#",
        size: "5.1 MB",
        type: "PDF",
      },
      {
        name: "PT_Progress_Notes.pdf",
        url: "#",
        size: "1.3 MB",
        type: "PDF",
      },
      {
        name: "Discharge_Summary.pdf",
        url: "#",
        size: "2.8 MB",
        type: "PDF",
      },
    ],
    prescriptions: [
      {
        medicine: "Eliquis (Apixaban)",
        dosage: "2.5 mg",
        frequency: "Twice daily",
        duration: "8 weeks",
        notes: "Continue through week 8 post-op for DVT prophylaxis",
      },
      {
        medicine: "Acetaminophen",
        dosage: "650 mg",
        frequency: "Up to 4 times daily as needed",
        duration: "30 days",
        notes: "For pain. Do not exceed 3000mg/day.",
      },
      {
        medicine: "Multivitamin with Iron",
        dosage: "1 tablet",
        frequency: "Once daily",
        duration: "60 days",
        notes: "For post-operative nutritional support",
      },
    ],
    billing: {
      invoiceNumber: "INV-2026-0893",
      paymentMethod: "Pending",
      amount: 350,
      status: "unpaid",
      discount: 0,
      tax: 35.0,
      total: 385.0,
    },
    activity: [
      {
        id: "act-1",
        action: "Appointment Created",
        description: "Scheduled by surgeon's office during post-op discharge",
        timestamp: "2026-06-03 15:00:00",
        type: "created",
      },
      {
        id: "act-2",
        action: "Confirmed by Staff",
        description: "Confirmed by orthopedics scheduling",
        timestamp: "2026-06-04 09:30:00",
        type: "confirmed",
      },
    ],
    nextAppointment: {
      date: "2026-08-26",
      time: "02:00 PM",
      doctor: "Dr. Amanda Patel",
    },
  },
};

export function getAppointmentDetail(
  id: string,
): AppointmentDetail | undefined {
  return mockAppointmentDetails[id];
}

export const appointmentStatusColors: Record<string, string> = {
  scheduled: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  confirmed:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  "in-progress":
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  completed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  "no-show":
    "bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-300",
};

export const paymentStatusColors: Record<string, string> = {
  paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  unpaid:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  partial: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  refunded:
    "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
};

export const priorityColors: Record<string, string> = {
  low: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  medium:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  high: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  emergency: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

export const consultationTypeIcons: Record<string, string> = {
  Video: "🎥",
  "In-Person": "🏥",
  Phone: "📞",
  Emergency: "🚨",
};
