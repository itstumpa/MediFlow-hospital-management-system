// ============================================================
// Types & Mock Data — Patient Profile Page
// ============================================================

/* ─── Insurance ─── */

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  coverage: string;
  expiry: string;
}

/* ─── Emergency Contact ─── */

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

/* ─── Preferred Doctor ─── */

export interface PreferredDoctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  avatarInitials: string;
  avatarColor: string;
}

/* ─── Communication Preferences ─── */

export interface CommunicationPrefs {
  email: boolean;
  sms: boolean;
  push: boolean;
  newsletter: boolean;
}

/* ─── Full Patient Profile ─── */

export interface PatientProfile {
  // Personal
  id: string;
  name: string;
  age: number;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  nationality: string;
  avatarInitials: string;
  avatarColor: string;
  membershipSince: string;
  membershipTier: string;

  // Medical
  bloodGroup: string;
  height: string;
  weight: string;
  bmi: number;
  allergies: string[];
  chronicDiseases: string[];
  currentMedications: string[];

  // Insurance
  insurance: InsuranceInfo;

  // Emergency
  emergencyContact: EmergencyContact;

  // Preferred Doctor
  preferredDoctor: PreferredDoctor;

  // Communication Preferences
  communicationPrefs: CommunicationPrefs;

  // Profile completion (0–100)
  profileCompletion: number;
}

/* ─── Mock Profile ─── */

export const mockProfile: PatientProfile = {
  // Personal
  id: "P-2024-00142",
  name: "John Doe",
  age: 38,
  dob: "March 15, 1988",
  gender: "Male",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Health St, Medical City, MC 12345",
  nationality: "American",
  avatarInitials: "JD",
  avatarColor: "from-emerald-500 to-teal-500",
  membershipSince: "January 2024",
  membershipTier: "Gold Member",

  // Medical
  bloodGroup: "A+",
  height: "5 ft 10 in",
  weight: "165 lbs",
  bmi: 23.7,
  allergies: ["Penicillin", "Pollen", "Shellfish"],
  chronicDiseases: ["Mild Asthma (controlled)"],
  currentMedications: ["Ventolin Inhaler (as needed)", "Vitamin D 2000 IU"],

  // Insurance
  insurance: {
    provider: "HealthGuard Premier",
    policyNumber: "HG-984732-B1",
    coverage: "Comprehensive (Inpatient + Outpatient + Dental)",
    expiry: "December 31, 2026",
  },

  // Emergency
  emergencyContact: {
    name: "Jane Doe",
    relationship: "Spouse",
    phone: "+1 (555) 987-6543",
  },

  // Preferred Doctor
  preferredDoctor: {
    id: "dr-smith",
    name: "Dr. Sarah Smith",
    specialty: "Internal Medicine",
    hospital: "MediFlow General Hospital",
    avatarInitials: "SS",
    avatarColor: "from-purple-500 to-pink-500",
  },

  // Communication
  communicationPrefs: {
    email: true,
    sms: true,
    push: true,
    newsletter: false,
  },

  // Completion
  profileCompletion: 85,
};

/* ─── Info row helper ─── */

export interface InfoRow {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}
