import type { LucideIcon } from "lucide-react";

// ──── Appointment ────
export interface DoctorAppointment {
  id: string;
  patientName: string;
  patientAvatar: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled" | "no-show";
}

// ──── Patient ────
export interface DoctorPatient {
  id: string;
  name: string;
  age: number;
  gender: string;
  avatar: string;
  lastVisit: string;
  condition: string;
}

// ──── Review ────
export interface DoctorReview {
  id: string;
  patientName: string;
  patientAvatar: string;
  rating: number;
  comment: string;
  visitDate: string;
}

// ──── Weekly Schedule ────
export interface DayScheduleDetailed {
  day: string;
  isWorking: boolean;
  startTime: string;
  endTime: string;
  breakStart: string;
  breakEnd: string;
}

// ──── Leave ────
export interface LeaveDate {
  date: string;
  reason: string;
}

// ──── Document ────
export interface DoctorDocument {
  id: string;
  name: string;
  category: "license" | "certificate" | "government-id" | "contract";
  issueDate: string;
  expiryDate: string;
  status: "active" | "expired" | "pending";
  fileSize: string;
}

// ──── Activity ────
export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  type: "created" | "updated" | "changed" | "status" | "schedule";
}

// ──── Admin Doctor Detail ────
export interface AdminDoctorDetail {
  id: string;
  name: string;
  photo: string;
  department: string;
  specialization: string;
  doctorId: string;
  licenseNumber: string;
  employmentStatus: "active" | "on-leave" | "terminated" | "suspended";
  experience: number;
  rating: number;
  patientsTreated: number;
  isVerified: boolean;
  consultationFee: number;
  hospital: string;
  hospitalAddress: string;
  hospitalPhone: string;
  biography: string;
  education: { degree: string; institution: string; year: string }[];
  certificates: { title: string; issuer: string; year: string }[];
  languages: string[];
  expertise: string[];
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  stats: {
    todayAppointments: number;
    totalPatients: number;
    monthlyRevenue: number;
    reviews: number;
    completedAppointments: number;
    averageRating: number;
  };
  appointments: DoctorAppointment[];
  patients: DoctorPatient[];
  reviews: DoctorReview[];
  schedule: DayScheduleDetailed[];
  leaveDates: LeaveDate[];
  documents: DoctorDocument[];
  activity: ActivityLog[];
}

// ──── Mock Data ────
export const adminDoctorDetails: Record<string, AdminDoctorDetail> = {
  "1": {
    id: "1",
    name: "Dr. Sarah Johnson",
    photo:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=600&fit=crop&crop=face",
    department: "Cardiology",
    specialization: "Interventional Cardiologist",
    doctorId: "DOC-2024-001",
    licenseNumber: "MD-CARD-45892",
    employmentStatus: "active",
    experience: 18,
    rating: 4.9,
    patientsTreated: 2300,
    isVerified: true,
    consultationFee: 40,
    hospital: "MediFlow Medical Center",
    hospitalAddress: "123 Healthcare Blvd, Suite 400, Medical District, NY 10001",
    hospitalPhone: "+1 (555) 123-4567",
    biography:
      "Dr. Sarah Johnson is a highly experienced interventional cardiologist dedicated to providing exceptional heart care. With over 18 years of clinical practice, she specializes in diagnosing and treating complex cardiovascular conditions. Her patient-centered approach combines cutting-edge medical technology with compassionate care, ensuring every patient receives personalized treatment plans. She has performed over 5,000 successful cardiac interventions and published numerous research papers on interventional cardiology. Dr. Johnson is a sought-after speaker at international medical conferences and serves on the editorial board of several prestigious cardiology journals.",
    education: [
      { degree: "MBBS", institution: "Harvard Medical School", year: "2008" },
      {
        degree: "MD Cardiology",
        institution: "Johns Hopkins University",
        year: "2012",
      },
      {
        degree: "Fellowship Interventional Cardiology",
        institution: "Mayo Clinic",
        year: "2014",
      },
    ],
    certificates: [
      {
        title: "Board Certification - Cardiology",
        issuer: "American Board of Internal Medicine",
        year: "2012",
      },
      {
        title: "Advanced Cardiac Life Support",
        issuer: "American Heart Association",
        year: "2023",
      },
      {
        title: "Clinical Excellence Award",
        issuer: "MediFlow Hospital",
        year: "2023",
      },
    ],
    languages: ["English", "Bangla", "Hindi", "French"],
    expertise: [
      "Heart Failure Management",
      "Hypertension",
      "ECG Interpretation",
      "Angiography",
      "Cardiac Surgery",
      "Preventive Care",
      "Echocardiography",
      "Stress Testing",
    ],
    emergencyContact: {
      name: "Michael Johnson",
      relation: "Spouse",
      phone: "+1 (555) 987-6543",
    },
    stats: {
      todayAppointments: 8,
      totalPatients: 2300,
      monthlyRevenue: 32000,
      reviews: 328,
      completedAppointments: 12500,
      averageRating: 4.9,
    },
    appointments: [
      {
        id: "apt-001",
        patientName: "John Smith",
        patientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        date: "2026-07-12",
        time: "09:00 AM",
        status: "scheduled",
      },
      {
        id: "apt-002",
        patientName: "Emily Davis",
        patientAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
        date: "2026-07-12",
        time: "10:30 AM",
        status: "scheduled",
      },
      {
        id: "apt-003",
        patientName: "Robert Wilson",
        patientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        date: "2026-07-12",
        time: "11:00 AM",
        status: "completed",
      },
      {
        id: "apt-004",
        patientName: "Sophia Martinez",
        patientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        date: "2026-07-11",
        time: "02:00 PM",
        status: "completed",
      },
      {
        id: "apt-005",
        patientName: "William Brown",
        patientAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        date: "2026-07-11",
        time: "03:30 PM",
        status: "cancelled",
      },
      {
        id: "apt-006",
        patientName: "Olivia Taylor",
        patientAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        date: "2026-07-10",
        time: "09:00 AM",
        status: "completed",
      },
      {
        id: "apt-007",
        patientName: "James Anderson",
        patientAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
        date: "2026-07-10",
        time: "01:00 PM",
        status: "no-show",
      },
    ],
    patients: [
      {
        id: "pat-001",
        name: "John Smith",
        age: 58,
        gender: "Male",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        lastVisit: "2026-07-12",
        condition: "Coronary Artery Disease",
      },
      {
        id: "pat-002",
        name: "Emily Davis",
        age: 45,
        gender: "Female",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
        lastVisit: "2026-07-12",
        condition: "Hypertension",
      },
      {
        id: "pat-003",
        name: "Robert Wilson",
        age: 62,
        gender: "Male",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        lastVisit: "2026-07-12",
        condition: "Heart Failure",
      },
      {
        id: "pat-004",
        name: "Sophia Martinez",
        age: 35,
        gender: "Female",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        lastVisit: "2026-07-11",
        condition: "Arrhythmia",
      },
      {
        id: "pat-005",
        name: "Olivia Taylor",
        age: 52,
        gender: "Female",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        lastVisit: "2026-07-10",
        condition: "Valvular Heart Disease",
      },
    ],
    reviews: [
      {
        id: "rev-001",
        patientName: "John Smith",
        patientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        comment:
          "Dr. Johnson is an exceptional cardiologist. She took the time to explain my condition thoroughly and made me feel at ease. The treatment plan she designed has significantly improved my quality of life.",
        visitDate: "2026-06-28",
      },
      {
        id: "rev-002",
        patientName: "Emily Davis",
        patientAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        comment:
          "Very professional and caring. The staff was wonderful and Dr. Johnson made sure all my questions were answered before I left.",
        visitDate: "2026-06-15",
      },
      {
        id: "rev-003",
        patientName: "Robert Wilson",
        patientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 4,
        comment:
          "Great doctor with excellent knowledge. The wait time was a bit long but the care I received was worth it.",
        visitDate: "2026-06-10",
      },
      {
        id: "rev-004",
        patientName: "Sophia Martinez",
        patientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        comment:
          "Dr. Johnson saved my life. After years of misdiagnosis, she identified my condition in the first visit. I'm forever grateful.",
        visitDate: "2026-05-22",
      },
    ],
    schedule: [
      {
        day: "Monday",
        isWorking: true,
        startTime: "09:00",
        endTime: "17:00",
        breakStart: "13:00",
        breakEnd: "14:00",
      },
      {
        day: "Tuesday",
        isWorking: true,
        startTime: "09:00",
        endTime: "15:00",
        breakStart: "12:00",
        breakEnd: "13:00",
      },
      {
        day: "Wednesday",
        isWorking: true,
        startTime: "09:00",
        endTime: "17:00",
        breakStart: "13:00",
        breakEnd: "14:00",
      },
      {
        day: "Thursday",
        isWorking: true,
        startTime: "09:00",
        endTime: "17:00",
        breakStart: "13:00",
        breakEnd: "14:00",
      },
      {
        day: "Friday",
        isWorking: true,
        startTime: "09:00",
        endTime: "17:00",
        breakStart: "13:00",
        breakEnd: "14:00",
      },
      {
        day: "Saturday",
        isWorking: false,
        startTime: "-",
        endTime: "-",
        breakStart: "-",
        breakEnd: "-",
      },
      {
        day: "Sunday",
        isWorking: false,
        startTime: "-",
        endTime: "-",
        breakStart: "-",
        breakEnd: "-",
      },
    ],
    leaveDates: [
      { date: "2026-07-04", reason: "Independence Day" },
      { date: "2026-08-15", reason: "Personal Leave" },
      { date: "2026-09-01", reason: "Conference - ACC Cardiology" },
    ],
    documents: [
      {
        id: "doc-001",
        name: "Medical License - State of New York",
        category: "license",
        issueDate: "2008-06-15",
        expiryDate: "2027-06-15",
        status: "active",
        fileSize: "2.4 MB",
      },
      {
        id: "doc-002",
        name: "Board Certification - Cardiology",
        category: "certificate",
        issueDate: "2012-09-01",
        expiryDate: "2027-09-01",
        status: "active",
        fileSize: "1.8 MB",
      },
      {
        id: "doc-003",
        name: "DEA Certificate",
        category: "certificate",
        issueDate: "2012-10-15",
        expiryDate: "2026-10-15",
        status: "active",
        fileSize: "0.9 MB",
      },
      {
        id: "doc-004",
        name: "Passport",
        category: "government-id",
        issueDate: "2021-03-01",
        expiryDate: "2031-03-01",
        status: "active",
        fileSize: "3.1 MB",
      },
      {
        id: "doc-005",
        name: "Employment Contract - MediFlow",
        category: "contract",
        issueDate: "2020-01-01",
        expiryDate: "2025-12-31",
        status: "active",
        fileSize: "1.2 MB",
      },
      {
        id: "doc-006",
        name: "Advanced Cardiac Life Support (Renewal)",
        category: "certificate",
        issueDate: "2023-05-01",
        expiryDate: "2025-05-01",
        status: "active",
        fileSize: "0.5 MB",
      },
      {
        id: "doc-007",
        name: "Driver's License",
        category: "government-id",
        issueDate: "2022-04-10",
        expiryDate: "2027-04-10",
        status: "active",
        fileSize: "0.7 MB",
      },
    ],
    activity: [
      {
        id: "act-001",
        action: "Doctor Created",
        description:
          "Dr. Sarah Johnson was added to the system by Admin User",
        timestamp: "2024-01-15T09:00:00Z",
        type: "created",
      },
      {
        id: "act-002",
        action: "Profile Updated",
        description: "Contact information and biography were updated",
        timestamp: "2024-03-20T14:30:00Z",
        type: "updated",
      },
      {
        id: "act-003",
        action: "Schedule Changed",
        description:
          "Wednesday schedule updated: 09:00-17:00 with emergency duty",
        timestamp: "2024-06-01T11:00:00Z",
        type: "schedule",
      },
      {
        id: "act-004",
        action: "Department Changed",
        description: "Transferred from General Cardiology to Interventional Cardiology",
        timestamp: "2024-08-15T10:00:00Z",
        type: "changed",
      },
      {
        id: "act-005",
        action: "Status Updated",
        description: "Employment status changed to Active after credential verification",
        timestamp: "2024-09-01T08:00:00Z",
        type: "status",
      },
      {
        id: "act-006",
        action: "Certificate Added",
        description: "Advanced Cardiac Life Support certificate renewed",
        timestamp: "2025-05-20T16:00:00Z",
        type: "updated",
      },
      {
        id: "act-007",
        action: "Profile Updated",
        description: "Languages updated: added French language proficiency",
        timestamp: "2025-08-10T13:15:00Z",
        type: "updated",
      },
      {
        id: "act-008",
        action: "Consultation Fee Changed",
        description: "Fee updated from $35 to $40",
        timestamp: "2026-01-05T09:30:00Z",
        type: "changed",
      },
    ],
  },
};

export function getAdminDoctorDetail(id: string): AdminDoctorDetail | null {
  return adminDoctorDetails[id] ?? null;
}

export function getRelatedDoctors(
  currentId: string,
  department: string,
  count = 4,
) {
  const allDoctors = Object.values(adminDoctorDetails);
  return allDoctors
    .filter((doc) => doc.id !== currentId && doc.department === department)
    .slice(0, count);
}
