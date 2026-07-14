export type DoctorProfileTabId =
  | "personal"
  | "professional"
  | "education"
  | "experience"
  | "certificates"
  | "languages"
  | "clinic"
  | "consultation"
  | "notifications"
  | "account";

export interface DoctorProfileTabOption {
  id: DoctorProfileTabId;
  label: string;
}

export const doctorProfileTabOptions: DoctorProfileTabOption[] = [
  { id: "personal", label: "Personal Information" },
  { id: "professional", label: "Professional" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "languages", label: "Languages" },
  { id: "clinic", label: "Clinic" },
  { id: "consultation", label: "Consultation" },
  { id: "notifications", label: "Notifications" },
  { id: "account", label: "Account" },
];

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  graduationYear: number;
}

export interface ExperienceEntry {
  id: string;
  hospital: string;
  designation: string;
  startYear: number;
  endYear?: number;
  isCurrent: boolean;
  responsibilities: string[];
}

export interface CertificateEntry {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  hasDocument: boolean;
}

export interface LanguageEntry {
  id: string;
  language: string;
  proficiency: "Native" | "Fluent" | "Advanced" | "Intermediate" | "Basic";
}

export interface ClinicInfo {
  clinicName: string;
  address: string;
  phone: string;
  website: string;
}

export interface ConsultationSettings {
  fee: number;
  onlineAvailable: boolean;
  offlineAvailable: boolean;
  appointmentDuration: number;
  bufferTime: number;
  maxDailyAppointments: number;
}

export interface NotificationChannel {
  email: boolean;
  sms: boolean;
  push: boolean;
}

export interface NotificationSettings {
  appointments: NotificationChannel;
  messages: NotificationChannel;
  labReports: NotificationChannel;
  emergencyAlerts: NotificationChannel;
}

export interface AccountSettings {
  theme: "light" | "dark" | "system";
  language: string;
  timezone: string;
  twoFactorAuth: boolean;
  connectedDevices: number;
}

export interface DoctorProfile {
  id: string;
  photoUrl: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  biography: string;
  designation: string;
  specialization: string;
  subSpecialization: string;
  hospital: string;
  licenseNumber: string;
  npiNumber: string;
  yearsOfExperience: number;
  professionalMemberships: string[];
  rating: number;
  patientsServed: number;
  consultationFee: number;
  isVerified: boolean;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  certificates: CertificateEntry[];
  languages: LanguageEntry[];
  clinicInfo: ClinicInfo;
  consultationSettings: ConsultationSettings;
  notificationSettings: NotificationSettings;
  accountSettings: AccountSettings;
}

export interface ProfileCompletionSection {
  key: string;
  label: string;
  isComplete: boolean;
}

export function computeProfileCompletion(profile: DoctorProfile): {
  percentage: number;
  sections: ProfileCompletionSection[];
} {
  const sections: ProfileCompletionSection[] = [
    { key: "photo", label: "Profile Photo", isComplete: !!profile.photoUrl },
    { key: "name", label: "Full Name", isComplete: !!profile.fullName },
    { key: "email", label: "Email Address", isComplete: !!profile.email },
    { key: "phone", label: "Phone Number", isComplete: !!profile.phone },
    { key: "biography", label: "Biography", isComplete: !!profile.biography },
    {
      key: "license",
      label: "Medical License",
      isComplete: !!profile.licenseNumber,
    },
    {
      key: "specialization",
      label: "Specialization",
      isComplete: !!profile.specialization,
    },
    {
      key: "education",
      label: "Education",
      isComplete: profile.education.length > 0,
    },
    {
      key: "experience",
      label: "Experience",
      isComplete: profile.experience.length > 0,
    },
    {
      key: "certificates",
      label: "Certificates",
      isComplete: profile.certificates.length > 0,
    },
    {
      key: "languages",
      label: "Languages",
      isComplete: profile.languages.length > 0,
    },
    {
      key: "clinic",
      label: "Clinic Info",
      isComplete: !!profile.clinicInfo.clinicName,
    },
    {
      key: "fee",
      label: "Consultation Fee",
      isComplete: profile.consultationSettings.fee > 0,
    },
  ];

  const completed = sections.filter((s) => s.isComplete).length;
  const percentage = Math.round((completed / sections.length) * 100);

  return { percentage, sections };
}

export const mockDoctorProfile: DoctorProfile = {
  id: "DR-001",
  photoUrl: "",
  fullName: "Dr. Jonathan Mitchell",
  email: "jonathan.mitchell@mediflow.com",
  phone: "+1 (555) 123-4567",
  gender: "Male",
  dateOfBirth: "1975-03-22",
  address: "123 Healthcare Ave, Suite 400, New York, NY 10001",
  biography:
    "Board-certified cardiologist with over 15 years of experience in interventional cardiology. Specializing in minimally invasive cardiac procedures, preventive cardiology, and heart failure management. Committed to providing compassionate, evidence-based care to every patient. Published over 30 research papers in peer-reviewed journals and actively involved in clinical trials for novel cardiovascular therapies.",
  designation: "Senior Consultant Cardiologist",
  specialization: "Cardiology",
  subSpecialization: "Interventional Cardiology",
  hospital: "MediFlow Health Institute",
  licenseNumber: "LIC-MD-2010-4412",
  npiNumber: "NPI-18453-2091",
  yearsOfExperience: 15,
  professionalMemberships: [
    "American College of Cardiology (ACC)",
    "American Heart Association (AHA)",
    "European Society of Cardiology (ESC)",
    "Society for Cardiovascular Angiography and Interventions (SCAI)",
  ],
  rating: 4.9,
  patientsServed: 12850,
  consultationFee: 250,
  isVerified: true,
  education: [
    {
      id: "EDU-001",
      degree: "Doctor of Medicine (MD)",
      institution: "Johns Hopkins University School of Medicine",
      graduationYear: 2005,
    },
    {
      id: "EDU-002",
      degree: "Residency in Internal Medicine",
      institution: "Massachusetts General Hospital",
      graduationYear: 2008,
    },
    {
      id: "EDU-003",
      degree: "Fellowship in Interventional Cardiology",
      institution: "Cleveland Clinic",
      graduationYear: 2010,
    },
  ],
  experience: [
    {
      id: "EXP-001",
      hospital: "MediFlow Health Institute",
      designation: "Senior Consultant Cardiologist",
      startYear: 2015,
      isCurrent: true,
      responsibilities: [
        "Lead interventional cardiology team",
        "Perform complex coronary interventions",
        "Supervise cardiology fellows",
        "Develop treatment protocols",
      ],
    },
    {
      id: "EXP-002",
      hospital: "NewYork-Presbyterian Hospital",
      designation: "Consultant Cardiologist",
      startYear: 2010,
      endYear: 2015,
      isCurrent: false,
      responsibilities: [
        "Managed outpatient cardiology clinic",
        "Performed diagnostic catheterizations",
        "Conducted cardiac research studies",
      ],
    },
  ],
  certificates: [
    {
      id: "CERT-001",
      name: "Board Certification in Cardiovascular Disease",
      issuingOrganization: "American Board of Internal Medicine",
      issueDate: "2011-06-15",
      expiryDate: "2026-06-15",
      hasDocument: true,
    },
    {
      id: "CERT-002",
      name: "Advanced Cardiac Life Support (ACLS)",
      issuingOrganization: "American Heart Association",
      issueDate: "2024-01-10",
      expiryDate: "2026-01-10",
      hasDocument: true,
    },
    {
      id: "CERT-003",
      name: "Certification in Interventional Cardiology",
      issuingOrganization: "American Board of Internal Medicine",
      issueDate: "2012-09-20",
      expiryDate: "2025-09-20",
      hasDocument: true,
    },
  ],
  languages: [
    { id: "LANG-001", language: "English", proficiency: "Native" },
    { id: "LANG-002", language: "Spanish", proficiency: "Fluent" },
    { id: "LANG-003", language: "French", proficiency: "Intermediate" },
    { id: "LANG-004", language: "Mandarin", proficiency: "Basic" },
  ],
  clinicInfo: {
    clinicName: "MediFlow Cardiology Center",
    address: "123 Healthcare Ave, Suite 400, New York, NY 10001",
    phone: "+1 (555) 123-4000",
    website: "https://mediflow.com/clinics/cardiology",
  },
  consultationSettings: {
    fee: 250,
    onlineAvailable: true,
    offlineAvailable: true,
    appointmentDuration: 30,
    bufferTime: 10,
    maxDailyAppointments: 12,
  },
  notificationSettings: {
    appointments: { email: true, sms: true, push: true },
    messages: { email: true, sms: false, push: true },
    labReports: { email: true, sms: false, push: false },
    emergencyAlerts: { email: true, sms: true, push: true },
  },
  accountSettings: {
    theme: "system",
    language: "English",
    timezone: "America/New_York",
    twoFactorAuth: true,
    connectedDevices: 3,
  },
};
