import type { DoctorFormValues } from "./form-schema";

export const departments = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Ophthalmology",
  "ENT",
  "Gynecology",
  "Gastroenterology",
  "Pulmonology",
  "Nephrology",
  "Endocrinology",
  "Psychiatry",
  "Urology",
  "Oncology",
];

export const specializations: Record<string, string[]> = {
  Cardiology: ["Interventional Cardiology", "Electrophysiology", "General Cardiology", "Pediatric Cardiology"],
  Neurology: ["Clinical Neurophysiology", "Stroke Medicine", "Pediatric Neurology", "Neuromuscular Medicine"],
  Pediatrics: ["Neonatology", "Pediatric Cardiology", "Pediatric Neurology", "Adolescent Medicine"],
  Orthopedics: ["Sports Medicine", "Joint Replacement", "Spine Surgery", "Pediatric Orthopedics"],
  Dermatology: ["Cosmetic Dermatology", "Pediatric Dermatology", "Mohs Surgery", "Teledermatology"],
  Ophthalmology: ["Cataract Surgery", "Glaucoma", "Retina", "Cornea"],
  ENT: ["Otology", "Rhinology", "Laryngology", "Head & Neck Surgery"],
  Gynecology: ["Maternal-Fetal Medicine", "Reproductive Endocrinology", "Gynecologic Oncology"],
  Gastroenterology: ["Hepatology", "Inflammatory Bowel Disease", "Pancreatic Disorders"],
  Pulmonology: ["Critical Care", "Sleep Medicine", "Interventional Pulmonology"],
  Nephrology: ["Dialysis", "Transplant Medicine", "Hypertension"],
  Endocrinology: ["Diabetes", "Thyroid Disorders", "Metabolic Disorders"],
  Psychiatry: ["Child & Adolescent", "Geriatric Psychiatry", "Addiction Medicine"],
  Urology: ["Endourology", "Urologic Oncology", "Female Urology"],
  Oncology: ["Medical Oncology", "Radiation Oncology", "Surgical Oncology"],
};

export const bloodGroups = [
  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-",
];

export const nationalities = [
  "American", "British", "Canadian", "Australian", "German",
  "French", "Spanish", "Italian", "Japanese", "Chinese",
  "Indian", "Brazilian", "Mexican", "South Korean", "Swedish",
  "Dutch", "Swiss", "Bangladeshi", "Pakistani", "Nigerian",
  "Egyptian", "Turkish", "Russian", "Saudi Arabian", "Emirati",
];

export const languageOptions = [
  "English",
  "Bangla",
  "Hindi",
  "French",
  "Arabic",
  "Spanish",
  "German",
  "Mandarin",
  "Korean",
  "Portuguese",
  "Japanese",
  "Russian",
  "Italian",
  "Turkish",
  "Urdu",
];

export const designations = [
  "Senior Consultant",
  "Junior Consultant",
  "Chief of Department",
  "Associate Professor",
  "Professor",
  "Registrar",
  "Medical Officer",
  "Resident",
  "House Officer",
  "Attending Physician",
  "Fellow",
  "Director",
];

export const hospitals = [
  "MediFlow General Hospital",
  "MediFlow Heart Institute",
  "MediFlow Neuro Center",
  "MediFlow Children's Hospital",
  "MediFlow Orthopedic Center",
  "City Medical Center",
  "National Healthcare Institute",
  "Metro Multi-Specialty Hospital",
];

export const floors = [
  "Ground Floor",
  "1st Floor",
  "2nd Floor",
  "3rd Floor",
  "4th Floor",
  "5th Floor",
  "6th Floor",
  "7th Floor",
];

// Mock doctor data for edit mode
export const mockDoctorEditData: DoctorFormValues = {
  photo: "",
  firstName: "Sarah",
  lastName: "Johnson",
  email: "sarah.johnson@mediflow.com",
  phone: "+1 (555) 0101",
  gender: "Female",
  dateOfBirth: "1985-03-15",
  bloodGroup: "A+",
  nationality: "American",

  doctorId: "DOC-001",
  department: "Cardiology",
  specialization: "Interventional Cardiology",
  designation: "Senior Consultant",
  yearsOfExperience: 14,
  consultationFee: 250,
  licenseNumber: "LIC-MD-2010-8742",
  medicalRegistrationNumber: "MCI-2010-45219",
  employmentType: "Full-time",
  status: "Active",

  education: [
    { degree: "MD - Doctor of Medicine", institution: "Harvard Medical School", year: "2010" },
    { degree: "MBBS", institution: "Johns Hopkins University", year: "2006" },
    { degree: "Fellowship in Interventional Cardiology", institution: "Mayo Clinic", year: "2012" },
  ],

  certifications: [
    { certificate: "American Board of Internal Medicine", organization: "ABIM", issuedYear: "2011", expiryYear: "2031" },
    { certificate: "Cardiovascular Disease Certification", organization: "American Board of Internal Medicine", issuedYear: "2013", expiryYear: "2033" },
  ],

  languages: ["English", "Spanish"],

  biography:
    "Dr. Sarah Johnson is a highly respected interventional cardiologist with over 14 years of experience in diagnosing and treating complex cardiovascular conditions. She specializes in minimally invasive procedures including angioplasty, stent placement, and transcatheter valve interventions.\n\n" +
    "Dr. Johnson has performed over 2,000 successful cardiac interventions and is recognized for her expertise in complex coronary interventions and peripheral vascular disease management. She is committed to providing patient-centered care and leveraging the latest evidence-based approaches to achieve optimal outcomes.\n\n" +
    "Areas of Expertise:\n" +
    "• Complex coronary angioplasty and stenting\n" +
    "• Transcatheter aortic valve replacement (TAVR)\n" +
    "• Peripheral vascular interventions\n" +
    "• Intravascular imaging (IVUS, OCT)\n" +
    "• Hemodynamic support devices for high-risk PCI",

  hospital: "MediFlow General Hospital",
  floor: "3rd Floor",
  roomNumber: "301-A",
  officePhone: "+1 (555) 0101-200",
  emergencyContact: "+1 (555) 0199",

  availability: {
    Monday: { available: true, startTime: "08:00", endTime: "16:00" },
    Tuesday: { available: true, startTime: "08:00", endTime: "16:00" },
    Wednesday: { available: true, startTime: "09:00", endTime: "17:00" },
    Thursday: { available: true, startTime: "09:00", endTime: "17:00" },
    Friday: { available: true, startTime: "08:00", endTime: "14:00" },
    Saturday: { available: false, startTime: "09:00", endTime: "13:00" },
    Sunday: { available: false, startTime: "09:00", endTime: "13:00" },
  },
};
