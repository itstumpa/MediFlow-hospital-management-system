import type { DepartmentFormValues } from "./form-schema";

export const departmentIconOptions = [
  { value: "Heart", label: "Heart", color: "#dc2626" },
  { value: "Brain", label: "Brain", color: "#7c3aed" },
  { value: "Baby", label: "Baby", color: "#0ea5e9" },
  { value: "Bone", label: "Bone", color: "#d97706" },
  { value: "Droplets", label: "Droplets", color: "#ec4899" },
  { value: "Eye", label: "Eye", color: "#14b8a6" },
  { value: "Ambulance", label: "Ambulance", color: "#ea580c" },
  { value: "HeartPulse", label: "HeartPulse", color: "#6366f1" },
  { value: "Wind", label: "Lungs", color: "#06b6d4" },
  { value: "Stethoscope", label: "Stethoscope", color: "#0e7c7b" },
  { value: "Microscope", label: "Microscope", color: "#8b5cf6" },
  { value: "Syringe", label: "Syringe", color: "#0891b2" },
  { value: "Pill", label: "Pill", color: "#059669" },
  { value: "TestTube", label: "TestTube", color: "#d946ef" },
  { value: "Scan", label: "Scan", color: "#0284c7" },
  { value: "Building2", label: "Building", color: "#64748b" },
];

export const buildingOptions = [
  "Main Building",
  "East Wing",
  "West Wing",
  "North Wing",
  "South Wing",
  "Children's Pavilion",
  "Cardiac Tower",
  "Research Center",
  "Maternity Wing",
  "Oncology Center",
];

export const floorOptions = [
  "Ground Floor",
  "1st Floor",
  "2nd Floor",
  "3rd Floor",
  "4th Floor",
  "5th Floor",
  "6th Floor",
  "7th Floor",
  "8th Floor",
  "9th Floor",
  "10th Floor",
];

export const statusOptions = [
  { value: "Active", label: "Active", color: "bg-emerald-500" },
  { value: "Inactive", label: "Inactive", color: "bg-slate-400" },
  {
    value: "Under Maintenance",
    label: "Under Maintenance",
    color: "bg-amber-400",
  },
  { value: "Closed", label: "Closed", color: "bg-red-500" },
];

export const coreServicesOptions = [
  "Diagnostic Imaging",
  "Laboratory Services",
  "Surgical Services",
  "Emergency Care",
  "Outpatient Clinics",
  "Inpatient Wards",
  "Pharmacy Services",
  "Rehabilitation Therapy",
  "Preventive Screenings",
  "Health Education",
  "Telemedicine",
  "Nutrition Counseling",
  "Pain Management",
  "Physical Therapy",
  "Occupational Therapy",
  "Speech Therapy",
];

export const medicalTechnologiesOptions = [
  "MRI Scanner",
  "CT Scanner",
  "X-Ray Digital",
  "Ultrasound",
  "Echocardiogram",
  "ECG/EKG",
  "Holter Monitor",
  "Defibrillator",
  "Ventilator",
  "Patient Monitor",
  "Surgical Robot",
  "Laser System",
  "Cath Lab",
  "Dialysis Machine",
  "Endoscopy Suite",
  "PACS System",
];

export const facilityOptions = [
  "Private Rooms",
  "ICU Beds",
  "Operation Theatres",
  "Waiting Lounge",
  "Cafeteria",
  "Pharmacy",
  "Parking",
  "Wheelchair Access",
  "Doctor's Lounge",
  "Nursing Station",
  "Conference Room",
  "Library",
  "Prayer Room",
  "ATM",
  "Gift Shop",
];

export const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Mock doctors for assignment
export const availableDoctors = [
  { id: "DOC-001", name: "Dr. Sarah Johnson", specialization: "Cardiology" },
  { id: "DOC-002", name: "Dr. James Mitchell", specialization: "Neurology" },
  { id: "DOC-003", name: "Dr. Lisa Park", specialization: "Pediatrics" },
  { id: "DOC-004", name: "Dr. David Kim", specialization: "Orthopedics" },
  { id: "DOC-005", name: "Dr. Michael Torres", specialization: "Dermatology" },
  { id: "DOC-006", name: "Dr. Emily Watson", specialization: "Ophthalmology" },
  {
    id: "DOC-007",
    name: "Dr. Robert Chen",
    specialization: "Emergency Medicine",
  },
  {
    id: "DOC-008",
    name: "Dr. Anna Martinez",
    specialization: "Psychiatry",
  },
  {
    id: "DOC-009",
    name: "Dr. William Taylor",
    specialization: "Pulmonology",
  },
  { id: "DOC-010", name: "Dr. Olivia Brown", specialization: "Gynecology" },
  {
    id: "DOC-011",
    name: "Dr. James Wilson",
    specialization: "Gastroenterology",
  },
  { id: "DOC-012", name: "Dr. Sophia Lee", specialization: "Nephrology" },
  {
    id: "DOC-013",
    name: "Dr. Daniel Martinez",
    specialization: "Endocrinology",
  },
  { id: "DOC-014", name: "Dr. Emma Davis", specialization: "Urology" },
  {
    id: "DOC-015",
    name: "Dr. Alexander White",
    specialization: "Oncology",
  },
];

// Mock edit data
export const mockDepartmentEditData: DepartmentFormValues = {
  name: "Cardiology",
  code: "CARD",
  icon: "Heart",
  image: "",
  shortDescription:
    "Comprehensive heart care including diagnostics, interventional procedures, and cardiac rehabilitation.",
  fullDescription:
    "The Cardiology Department at MediFlow Hospital is a world-class center for cardiovascular care. Our team of experienced cardiologists, cardiac surgeons, and support staff are dedicated to providing comprehensive heart care services. From routine check-ups to complex surgical interventions, we utilize the latest technology and evidence-based practices to ensure the best outcomes for our patients. Our department is equipped with state-of-the-art cath labs, echocardiography machines, and a dedicated cardiac ICU.",

  departmentHead: "Dr. Sarah Johnson",
  assistantHead: "Dr. James Mitchell",
  status: "Active",
  openingDate: "2018-03-15",

  building: "Main Building",
  floor: "3rd Floor",
  roomNumbers: "301-325, 401-410",
  receptionContact: "+1 (555) 0200",
  emergencyContact: "+1 (555) 0299",

  openingTime: "07:00",
  closingTime: "21:00",
  emergencyAvailable: true,
  weekendSchedule: "Limited emergency services only",
  weeklyTimetable: {
    Monday: { available: true, startTime: "07:00", endTime: "21:00" },
    Tuesday: { available: true, startTime: "07:00", endTime: "21:00" },
    Wednesday: { available: true, startTime: "07:00", endTime: "21:00" },
    Thursday: { available: true, startTime: "07:00", endTime: "21:00" },
    Friday: { available: true, startTime: "07:00", endTime: "21:00" },
    Saturday: { available: true, startTime: "08:00", endTime: "17:00" },
    Sunday: { available: false, startTime: "09:00", endTime: "13:00" },
  },

  mission:
    "To provide exceptional cardiovascular care through innovation, compassion, and excellence in treatment.",
  vision:
    "To be the leading cardiology center recognized globally for groundbreaking research and superior patient outcomes.",
  coreServices: [
    "Diagnostic Imaging",
    "Surgical Services",
    "Emergency Care",
    "Outpatient Clinics",
    "Rehabilitation Therapy",
  ],
  medicalTechnologies: [
    "MRI Scanner",
    "CT Scanner",
    "Echocardiogram",
    "ECG/EKG",
    "Cath Lab",
  ],
  availableFacilities: [
    "Private Rooms",
    "ICU Beds",
    "Operation Theatres",
    "Waiting Lounge",
  ],
  emergencyServices: true,

  assignedDoctors: [
    {
      id: "DOC-001",
      name: "Dr. Sarah Johnson",
      specialization: "Interventional Cardiology",
      isHead: true,
      isAssistantHead: false,
    },
    {
      id: "DOC-002",
      name: "Dr. James Mitchell",
      specialization: "Clinical Neurophysiology",
      isHead: false,
      isAssistantHead: true,
    },
    {
      id: "DOC-003",
      name: "Dr. Lisa Park",
      specialization: "General Cardiology",
      isHead: false,
      isAssistantHead: false,
    },
    {
      id: "DOC-004",
      name: "Dr. David Kim",
      specialization: "Pediatric Cardiology",
      isHead: false,
      isAssistantHead: false,
    },
  ],

  slug: "cardiology",
  metaTitle: "Cardiology Department | MediFlow Hospital",
  metaDescription:
    "World-class cardiology care at MediFlow Hospital. Expert heart specialists, advanced diagnostics, and comprehensive cardiac treatments.",
  keywords:
    "cardiology, heart care, cardiac surgery, cardiologist, heart treatment",
  ogImage: "",
};
