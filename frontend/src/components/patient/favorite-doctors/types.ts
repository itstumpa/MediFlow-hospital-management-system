// ============================================================
// Types & Mock Data — Favorite Doctors Page
// ============================================================

import { format } from "date-fns";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  CalendarCheck,
  CalendarClock,
  CalendarX,
  CheckCircle2,
  Clock,
  Heart,
  Star,
  Stethoscope,
  UserCheck,
  XCircle,
} from "lucide-react";

/* ─── Types ─── */

export type DoctorAvailability =
  | "available-now"
  | "available-today"
  | "tomorrow"
  | "unavailable";

export type DoctorTab = "all" | "available" | "top-rated" | "recently-visited";

export type DoctorViewMode = "grid" | "list";

export interface DoctorSpecialty {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

export interface DoctorHospital {
  id: string;
  name: string;
  address: string;
  distance?: string;
}

export interface DoctorSchedule {
  day: string;
  isAvailable: boolean;
  isEmergency?: boolean;
  hours?: string;
  slots?: string[];
}

export interface DoctorEducation {
  degree: string;
  institution: string;
  year: string;
}

export interface DoctorCertificate {
  title: string;
  issuer: string;
  year: string;
  icon: string;
}

export interface DoctorReview {
  id: string;
  patientName: string;
  patientInitials: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface FavoriteDoctor {
  id: string;
  name: string;
  initials: string;
  specialty: string;
  specialtyIcon: LucideIcon;
  specialtyColor: string;
  department: string;
  hospital: DoctorHospital;
  rating: number;
  reviewCount: number;
  experience: number;
  experienceText: string;
  imageUrl: string;
  availability: DoctorAvailability;
  nextAvailableSlot: string;
  isTopRated: boolean;
  isVerified: boolean;
  languages: string[];
  consultationFee: number;
  consultationTypes: ("in-person" | "video")[];
  education: DoctorEducation[];
  certifications: DoctorCertificate[];
  expertise: string[];
  about: string;
  shortBio: string;
  patientsTreated: string;
  awards: number;
  successRate: number;
  schedule: DoctorSchedule[];
  reviews: DoctorReview[];
  dateAdded: string;
  lastVisited: string | null;
  visitCount: number;
  isFavorite: boolean;
}

/* ─── Filter Types ─── */

export interface DoctorFilters {
  search: string;
  specialty: string;
  hospital: string;
  availability: string;
  rating: string;
  sortBy:
    | "name"
    | "rating"
    | "experience"
    | "date-added"
    | "last-visited"
    | "visit-count";
  sortOrder: "asc" | "desc";
}

export interface DoctorStats {
  total: number;
  available: number;
  topRated: number;
  recentlyVisited: number;
  specialties: number;
  hospitals: number;
}

/* ─── Specialty Config ─── */

export const specialtyConfig: Record<string, DoctorSpecialty> = {
  cardiology: {
    id: "cardiology",
    name: "Cardiology",
    icon: Heart,
    color: "text-rose-500",
  },
  neurology: {
    id: "neurology",
    name: "Neurology",
    icon: Stethoscope,
    color: "text-violet-500",
  },
  orthopedics: {
    id: "orthopedics",
    name: "Orthopedics",
    icon: Award,
    color: "text-amber-500",
  },
  "general-medicine": {
    id: "general-medicine",
    name: "General Medicine",
    icon: UserCheck,
    color: "text-emerald-500",
  },
  pediatrics: {
    id: "pediatrics",
    name: "Pediatrics",
    icon: CalendarCheck,
    color: "text-pink-500",
  },
  dermatology: {
    id: "dermatology",
    name: "Dermatology",
    icon: CalendarClock,
    color: "text-orange-500",
  },
  oncology: {
    id: "oncology",
    name: "Oncology",
    icon: CalendarX,
    color: "text-red-500",
  },
  psychiatry: {
    id: "psychiatry",
    name: "Psychiatry",
    icon: CheckCircle2,
    color: "text-indigo-500",
  },
};

/* ─── Availability Config ─── */

export const availabilityConfig: Record<
  DoctorAvailability,
  { label: string; className: string; dotColor: string; icon: LucideIcon }
> = {
  "available-now": {
    label: "Available Now",
    className:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    dotColor: "bg-emerald-500",
    icon: CheckCircle2,
  },
  "available-today": {
    label: "Available Today",
    className:
      "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    dotColor: "bg-blue-500",
    icon: CalendarCheck,
  },
  tomorrow: {
    label: "Available Tomorrow",
    className:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    dotColor: "bg-amber-500",
    icon: CalendarClock,
  },
  unavailable: {
    label: "Unavailable",
    className:
      "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
    dotColor: "bg-slate-400",
    icon: XCircle,
  },
};

/* ─── Tab Config ─── */

export const doctorTabs: { id: DoctorTab; label: string; icon: LucideIcon }[] =
  [
    { id: "all", label: "All Doctors", icon: Heart },
    { id: "available", label: "Available", icon: CalendarCheck },
    { id: "top-rated", label: "Top Rated", icon: Star },
    { id: "recently-visited", label: "Recently Visited", icon: Clock },
  ];

/* ─── Sort Options ─── */

export const sortOptions = [
  { value: "name", label: "Name (A-Z)" },
  { value: "rating", label: "Rating (High-Low)" },
  { value: "experience", label: "Experience (Most)" },
  { value: "date-added", label: "Recently Added" },
  { value: "last-visited", label: "Last Visited" },
  { value: "visit-count", label: "Most Visited" },
] as const;

/* ─── Mock Data ─── */

export const mockDoctorSpecialties = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "General Medicine",
  "Pediatrics",
  "Dermatology",
  "Oncology",
  "Psychiatry",
];

export const mockHospitals: DoctorHospital[] = [
  {
    id: "1",
    name: "MediFlow Main Campus",
    address: "123 Medical Center Dr, Downtown",
  },
  {
    id: "2",
    name: "MediFlow East Wing",
    address: "456 Health Ave, East District",
  },
  {
    id: "3",
    name: "MediFlow West Clinic",
    address: "789 Wellness Blvd, West Side",
  },
  {
    id: "4",
    name: "MediFlow North Hospital",
    address: "321 Care Lane, North County",
  },
  {
    id: "5",
    name: "MediFlow South Medical Center",
    address: "654 Healing Way, South City",
  },
];

const mockReviews: DoctorReview[] = [
  {
    id: "r1",
    patientName: "Sarah M.",
    patientInitials: "SM",
    rating: 5,
    comment:
      "Dr. Chen is absolutely amazing! She took the time to explain everything thoroughly and made me feel comfortable throughout my entire treatment.",
    date: "2024-12-15",
    helpful: 12,
  },
  {
    id: "r2",
    patientName: "James R.",
    patientInitials: "JR",
    rating: 5,
    comment:
      "Best cardiologist I've ever seen. Very knowledgeable and caring. The staff is also wonderful.",
    date: "2024-11-28",
    helpful: 8,
  },
  {
    id: "r3",
    patientName: "Maria L.",
    patientInitials: "ML",
    rating: 4,
    comment:
      "Great doctor, though wait times can be a bit long. Worth the wait though!",
    date: "2024-11-10",
    helpful: 5,
  },
];

const mockSchedule: DoctorSchedule[] = [
  {
    day: "Monday",
    isAvailable: true,
    hours: "9:00 AM - 5:00 PM",
    slots: ["9:00", "10:00", "11:00", "2:00", "3:00", "4:00"],
  },
  {
    day: "Tuesday",
    isAvailable: true,
    hours: "9:00 AM - 5:00 PM",
    slots: ["9:00", "10:00", "11:00", "2:00", "3:00", "4:00"],
  },
  { day: "Wednesday", isAvailable: false, hours: "Off" },
  {
    day: "Thursday",
    isAvailable: true,
    hours: "9:00 AM - 5:00 PM",
    slots: ["9:00", "10:00", "11:00", "2:00", "3:00", "4:00"],
  },
  {
    day: "Friday",
    isAvailable: true,
    hours: "9:00 AM - 3:00 PM",
    slots: ["9:00", "10:00", "11:00", "1:00", "2:00"],
  },
  {
    day: "Saturday",
    isAvailable: true,
    isEmergency: true,
    hours: "10:00 AM - 2:00 PM",
    slots: ["10:00", "11:00", "12:00", "1:00"],
  },
  { day: "Sunday", isAvailable: false, hours: "Off" },
];

export const mockFavoriteDoctors: FavoriteDoctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    initials: "SC",
    specialty: "Cardiology",
    specialtyIcon: Heart,
    specialtyColor: "text-rose-500",
    department: "Cardiology Department",
    hospital: mockHospitals[0],
    rating: 4.9,
    reviewCount: 328,
    experience: 18,
    experienceText: "18 years",
    imageUrl:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=600&fit=crop&crop=face",
    availability: "available-now",
    nextAvailableSlot: "Today, 2:00 PM",
    isTopRated: true,
    isVerified: true,
    languages: ["English", "Mandarin", "Spanish"],
    consultationFee: 150,
    consultationTypes: ["in-person", "video"],
    education: [
      { degree: "MD", institution: "Harvard Medical School", year: "2006" },
      {
        degree: "Cardiology Fellowship",
        institution: "Johns Hopkins Hospital",
        year: "2009",
      },
      {
        degree: "Internal Medicine Residency",
        institution: "Massachusetts General Hospital",
        year: "2006",
      },
    ],
    certifications: [
      {
        title: "Board Certified Cardiologist",
        issuer: "American Board of Internal Medicine",
        year: "2010",
        icon: "award",
      },
      {
        title: "Advanced Cardiac Life Support",
        issuer: "American Heart Association",
        year: "2023",
        icon: "heart",
      },
    ],
    expertise: [
      "Interventional Cardiology",
      "Heart Failure",
      "Preventive Cardiology",
      "Echocardiography",
      "Cardiac Catheterization",
    ],
    about:
      "Dr. Sarah Chen is a highly experienced cardiologist dedicated to providing exceptional heart care with cutting-edge technology. With over 18 years of clinical practice, she specializes in diagnosing and treating complex cardiovascular conditions. Her patient-centered approach combines cutting-edge medical technology with compassionate care, ensuring every patient receives personalized treatment plans.",
    shortBio:
      "Award-winning cardiologist specializing in interventional cardiology and heart failure management.",
    patientsTreated: "5,000+",
    awards: 15,
    successRate: 98,
    schedule: mockSchedule,
    reviews: mockReviews,
    dateAdded: "2024-01-15",
    lastVisited: "2024-12-20",
    visitCount: 12,
    isFavorite: true,
  },
  {
    id: "2",
    name: "Dr. Michael Mitchell",
    initials: "MM",
    specialty: "Neurology",
    specialtyIcon: Stethoscope,
    specialtyColor: "text-violet-500",
    department: "Neurology Department",
    hospital: mockHospitals[1],
    rating: 4.8,
    reviewCount: 256,
    experience: 15,
    experienceText: "15 years",
    imageUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=600&fit=crop&crop=face",
    availability: "available-today",
    nextAvailableSlot: "Today, 4:30 PM",
    isTopRated: true,
    isVerified: true,
    languages: ["English", "French"],
    consultationFee: 180,
    consultationTypes: ["in-person", "video"],
    education: [
      {
        degree: "MD",
        institution: "Stanford University School of Medicine",
        year: "2009",
      },
      {
        degree: "Neurology Residency",
        institution: "UCSF Medical Center",
        year: "2012",
      },
      {
        degree: "Movement Disorders Fellowship",
        institution: "Mayo Clinic",
        year: "2014",
      },
    ],
    certifications: [
      {
        title: "Board Certified Neurologist",
        issuer: "American Board of Psychiatry and Neurology",
        year: "2013",
        icon: "award",
      },
      {
        title: "Movement Disorders Specialist",
        issuer: "International Parkinson and Movement Disorder Society",
        year: "2015",
        icon: "brain",
      },
    ],
    expertise: [
      "Movement Disorders",
      "Parkinson's Disease",
      "Epilepsy",
      "Stroke",
      "Multiple Sclerosis",
      "Headache Disorders",
    ],
    about:
      "Dr. Michael Mitchell is a renowned neurologist with expertise in movement disorders and neurodegenerative diseases. He has published over 50 peer-reviewed articles and is actively involved in clinical research for new treatments.",
    shortBio:
      "Leading neurologist specializing in movement disorders and Parkinson's disease.",
    patientsTreated: "3,500+",
    awards: 8,
    successRate: 95,
    schedule: mockSchedule.map((s, i) => ({
      ...s,
      day: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ][i],
    })),
    reviews: mockReviews.map((r, i) => ({
      ...r,
      id: `r${i + 4}`,
      patientName: ["David K.", "Lisa P.", "Robert T."][i],
      patientInitials: ["DK", "LP", "RT"][i],
    })),
    dateAdded: "2024-02-20",
    lastVisited: "2024-12-10",
    visitCount: 8,
    isFavorite: true,
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    initials: "ER",
    specialty: "Orthopedics",
    specialtyIcon: Award,
    specialtyColor: "text-amber-500",
    department: "Orthopedic Surgery",
    hospital: mockHospitals[0],
    rating: 4.9,
    reviewCount: 189,
    experience: 12,
    experienceText: "12 years",
    imageUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop&crop=face",
    availability: "tomorrow",
    nextAvailableSlot: "Tomorrow, 10:00 AM",
    isTopRated: true,
    isVerified: true,
    languages: ["English", "Spanish"],
    consultationFee: 160,
    consultationTypes: ["in-person"],
    education: [
      {
        degree: "MD",
        institution: "University of Pennsylvania Perelman School of Medicine",
        year: "2012",
      },
      {
        degree: "Orthopedic Surgery Residency",
        institution: "Hospital for Special Surgery",
        year: "2017",
      },
      {
        degree: "Sports Medicine Fellowship",
        institution: "Kerlan-Jobe Orthopaedic Clinic",
        year: "2018",
      },
    ],
    certifications: [
      {
        title: "Board Certified Orthopedic Surgeon",
        issuer: "American Board of Orthopaedic Surgery",
        year: "2018",
        icon: "award",
      },
      {
        title: "Sports Medicine Subspecialty",
        issuer: "American Board of Orthopaedic Surgery",
        year: "2019",
        icon: "shield",
      },
    ],
    expertise: [
      "Sports Medicine",
      "Joint Replacement",
      "Arthroscopic Surgery",
      "Fracture Care",
      "Minimally Invasive Surgery",
    ],
    about:
      "Dr. Emily Rodriguez is a board-certified orthopedic surgeon specializing in sports medicine and joint preservation. She has treated numerous professional athletes and is known for her minimally invasive surgical techniques.",
    shortBio:
      "Sports medicine specialist and orthopedic surgeon with expertise in joint preservation.",
    patientsTreated: "2,800+",
    awards: 6,
    successRate: 97,
    schedule: mockSchedule.map((s, i) => ({
      ...s,
      day: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ][i],
    })),
    reviews: mockReviews.map((r, i) => ({
      ...r,
      id: `r${i + 7}`,
      patientName: ["Alex M.", "Jennifer W.", "Chris B."][i],
      patientInitials: ["AM", "JW", "CB"][i],
    })),
    dateAdded: "2024-03-10",
    lastVisited: "2024-11-28",
    visitCount: 5,
    isFavorite: true,
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    initials: "JW",
    specialty: "General Medicine",
    specialtyIcon: UserCheck,
    specialtyColor: "text-emerald-500",
    department: "Internal Medicine",
    hospital: mockHospitals[2],
    rating: 4.7,
    reviewCount: 412,
    experience: 22,
    experienceText: "22 years",
    imageUrl:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=600&fit=crop&crop=face",
    availability: "available-now",
    nextAvailableSlot: "Today, 3:00 PM",
    isTopRated: false,
    isVerified: true,
    languages: ["English"],
    consultationFee: 100,
    consultationTypes: ["in-person", "video"],
    education: [
      { degree: "MD", institution: "Yale School of Medicine", year: "2002" },
      {
        degree: "Internal Medicine Residency",
        institution: "NewYork-Presbyterian Hospital",
        year: "2005",
      },
    ],
    certifications: [
      {
        title: "Board Certified Internist",
        issuer: "American Board of Internal Medicine",
        year: "2006",
        icon: "award",
      },
      {
        title: "Geriatric Medicine Certification",
        issuer: "American Board of Internal Medicine",
        year: "2010",
        icon: "user",
      },
    ],
    expertise: [
      "Primary Care",
      "Chronic Disease Management",
      "Geriatric Care",
      "Preventive Medicine",
      "Diabetes Management",
      "Hypertension",
    ],
    about:
      "Dr. James Wilson is a compassionate internist with over two decades of experience in primary care. He believes in building long-term relationships with his patients and focuses on preventive care and chronic disease management.",
    shortBio:
      "Experienced internist focused on preventive care and chronic disease management.",
    patientsTreated: "8,000+",
    awards: 4,
    successRate: 94,
    schedule: mockSchedule.map((s, i) => ({
      ...s,
      day: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ][i],
    })),
    reviews: mockReviews.map((r, i) => ({
      ...r,
      id: `r${i + 10}`,
      patientName: ["Patricia H.", "George L.", "Nancy S."][i],
      patientInitials: ["PH", "GL", "NS"][i],
    })),
    dateAdded: "2024-01-05",
    lastVisited: "2024-12-22",
    visitCount: 24,
    isFavorite: true,
  },
  {
    id: "5",
    name: "Dr. Lisa Thompson",
    initials: "LT",
    specialty: "Pediatrics",
    specialtyIcon: CalendarCheck,
    specialtyColor: "text-pink-500",
    department: "Pediatrics",
    hospital: mockHospitals[3],
    rating: 4.9,
    reviewCount: 267,
    experience: 14,
    experienceText: "14 years",
    imageUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop&crop=face",
    availability: "available-today",
    nextAvailableSlot: "Today, 11:00 AM",
    isTopRated: true,
    isVerified: true,
    languages: ["English", "Spanish", "Vietnamese"],
    consultationFee: 120,
    consultationTypes: ["in-person", "video"],
    education: [
      {
        degree: "MD",
        institution: "University of Washington School of Medicine",
        year: "2010",
      },
      {
        degree: "Pediatrics Residency",
        institution: "Seattle Children's Hospital",
        year: "2013",
      },
      {
        degree: "Pediatric Cardiology Fellowship",
        institution: "Boston Children's Hospital",
        year: "2015",
      },
    ],
    certifications: [
      {
        title: "Board Certified Pediatrician",
        issuer: "American Board of Pediatrics",
        year: "2014",
        icon: "award",
      },
      {
        title: "Pediatric Cardiology Certification",
        issuer: "American Board of Pediatrics",
        year: "2016",
        icon: "heart",
      },
    ],
    expertise: [
      "General Pediatrics",
      "Pediatric Cardiology",
      "Newborn Care",
      "Adolescent Medicine",
      "Vaccinations",
      "Developmental Screening",
    ],
    about:
      "Dr. Lisa Thompson is a dedicated pediatrician with a special interest in pediatric cardiology. She provides comprehensive care for children from birth through adolescence and is known for her gentle, patient approach with young patients and their families.",
    shortBio:
      "Compassionate pediatrician with expertise in pediatric cardiology and newborn care.",
    patientsTreated: "4,200+",
    awards: 7,
    successRate: 99,
    schedule: mockSchedule.map((s, i) => ({
      ...s,
      day: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ][i],
    })),
    reviews: mockReviews.map((r, i) => ({
      ...r,
      id: `r${i + 13}`,
      patientName: ["Michelle R.", "David P.", "Amanda K."][i],
      patientInitials: ["MR", "DP", "AK"][i],
    })),
    dateAdded: "2024-04-12",
    lastVisited: "2024-12-18",
    visitCount: 15,
    isFavorite: true,
  },
  {
    id: "6",
    name: "Dr. Robert Kim",
    initials: "RK",
    specialty: "Dermatology",
    specialtyIcon: CalendarClock,
    specialtyColor: "text-orange-500",
    department: "Dermatology",
    hospital: mockHospitals[4],
    rating: 4.8,
    reviewCount: 198,
    experience: 11,
    experienceText: "11 years",
    imageUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=600&fit=crop&crop=face",
    availability: "unavailable",
    nextAvailableSlot: "Jan 15, 9:00 AM",
    isTopRated: true,
    isVerified: true,
    languages: ["English", "Korean"],
    consultationFee: 140,
    consultationTypes: ["in-person", "video"],
    education: [
      {
        degree: "MD",
        institution:
          "Columbia University Vagelos College of Physicians and Surgeons",
        year: "2013",
      },
      {
        degree: "Dermatology Residency",
        institution: "NYU Langone Health",
        year: "2017",
      },
      {
        degree: "Mohs Surgery Fellowship",
        institution: "Memorial Sloan Kettering Cancer Center",
        year: "2018",
      },
    ],
    certifications: [
      {
        title: "Board Certified Dermatologist",
        issuer: "American Board of Dermatology",
        year: "2018",
        icon: "award",
      },
      {
        title: "Mohs Micrographic Surgery",
        issuer: "American College of Mohs Surgery",
        year: "2019",
        icon: "scissors",
      },
    ],
    expertise: [
      "Medical Dermatology",
      "Cosmetic Dermatology",
      "Mohs Surgery",
      "Skin Cancer Screening",
      "Laser Therapy",
      "Pediatric Dermatology",
    ],
    about:
      "Dr. Robert Kim is a board-certified dermatologist with fellowship training in Mohs micrographic surgery. He provides comprehensive skin care including medical, surgical, and cosmetic dermatology services.",
    shortBio:
      "Dermatologist specializing in skin cancer surgery and cosmetic dermatology.",
    patientsTreated: "3,000+",
    awards: 5,
    successRate: 96,
    schedule: mockSchedule.map((s, i) => ({
      ...s,
      day: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ][i],
    })),
    reviews: mockReviews.map((r, i) => ({
      ...r,
      id: `r${i + 16}`,
      patientName: ["Stephanie N.", "Kevin M.", "Rachel V."][i],
      patientInitials: ["SN", "KM", "RV"][i],
    })),
    dateAdded: "2024-05-20",
    lastVisited: "2024-11-05",
    visitCount: 3,
    isFavorite: true,
  },
  {
    id: "7",
    name: "Dr. Amanda Foster",
    initials: "AF",
    specialty: "Oncology",
    specialtyIcon: CalendarX,
    specialtyColor: "text-red-500",
    department: "Medical Oncology",
    hospital: mockHospitals[0],
    rating: 4.9,
    reviewCount: 145,
    experience: 16,
    experienceText: "16 years",
    imageUrl:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=600&fit=crop&crop=face",
    availability: "available-now",
    nextAvailableSlot: "Today, 1:30 PM",
    isTopRated: true,
    isVerified: true,
    languages: ["English", "German"],
    consultationFee: 200,
    consultationTypes: ["in-person"],
    education: [
      {
        degree: "MD",
        institution: "Duke University School of Medicine",
        year: "2008",
      },
      {
        degree: "Internal Medicine Residency",
        institution: "Duke University Hospital",
        year: "2011",
      },
      {
        degree: "Medical Oncology Fellowship",
        institution: "MD Anderson Cancer Center",
        year: "2014",
      },
    ],
    certifications: [
      {
        title: "Board Certified Medical Oncologist",
        issuer: "American Board of Internal Medicine",
        year: "2015",
        icon: "award",
      },
      {
        title: "Hematology Certification",
        issuer: "American Board of Internal Medicine",
        year: "2016",
        icon: "droplet",
      },
    ],
    expertise: [
      "Breast Cancer",
      "Lung Cancer",
      "Hematologic Malignancies",
      "Immunotherapy",
      "Clinical Trials",
      "Palliative Care",
    ],
    about:
      "Dr. Amanda Foster is a compassionate medical oncologist dedicated to providing personalized cancer care. She is actively involved in clinical research and offers patients access to cutting-edge treatments and clinical trials.",
    shortBio:
      "Oncologist specializing in breast cancer and immunotherapy with clinical trial expertise.",
    patientsTreated: "1,800+",
    awards: 9,
    successRate: 92,
    schedule: mockSchedule.map((s, i) => ({
      ...s,
      day: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ][i],
    })),
    reviews: mockReviews.map((r, i) => ({
      ...r,
      id: `r${i + 19}`,
      patientName: ["Thomas G.", "Linda B.", "Mark H."][i],
      patientInitials: ["TG", "LB", "MH"][i],
    })),
    dateAdded: "2024-02-28",
    lastVisited: "2024-12-15",
    visitCount: 18,
    isFavorite: true,
  },
  {
    id: "8",
    name: "Dr. David Park",
    initials: "DP",
    specialty: "Psychiatry",
    specialtyIcon: CheckCircle2,
    specialtyColor: "text-indigo-500",
    department: "Psychiatry & Behavioral Health",
    hospital: mockHospitals[1],
    rating: 4.7,
    reviewCount: 223,
    experience: 13,
    experienceText: "13 years",
    imageUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=600&fit=crop&crop=face",
    availability: "available-today",
    nextAvailableSlot: "Today, 5:00 PM",
    isTopRated: false,
    isVerified: true,
    languages: ["English", "Korean", "Japanese"],
    consultationFee: 160,
    consultationTypes: ["in-person", "video"],
    education: [
      {
        degree: "MD",
        institution:
          "University of California, San Francisco School of Medicine",
        year: "2011",
      },
      {
        degree: "Psychiatry Residency",
        institution: "UCSF Langley Porter Psychiatric Institute",
        year: "2015",
      },
      {
        degree: "Child & Adolescent Psychiatry Fellowship",
        institution: "Stanford University",
        year: "2017",
      },
    ],
    certifications: [
      {
        title: "Board Certified Psychiatrist",
        issuer: "American Board of Psychiatry and Neurology",
        year: "2016",
        icon: "award",
      },
      {
        title: "Child & Adolescent Psychiatry",
        issuer: "American Board of Psychiatry and Neurology",
        year: "2018",
        icon: "baby",
      },
    ],
    expertise: [
      "Adult Psychiatry",
      "Child & Adolescent Psychiatry",
      "Anxiety Disorders",
      "Depression",
      "ADHD",
      "Bipolar Disorder",
      "Telepsychiatry",
    ],
    about:
      "Dr. David Park is a double board-certified psychiatrist specializing in both adult and child/adolescent psychiatry. He takes a holistic approach to mental health, combining evidence-based medication management with therapeutic techniques.",
    shortBio:
      "Psychiatrist specializing in anxiety, depression, and ADHD across all age groups.",
    patientsTreated: "2,500+",
    awards: 3,
    successRate: 93,
    schedule: mockSchedule.map((s, i) => ({
      ...s,
      day: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ][i],
    })),
    reviews: mockReviews.map((r, i) => ({
      ...r,
      id: `r${i + 22}`,
      patientName: ["Jennifer A.", "Michael C.", "Sarah D."][i],
      patientInitials: ["JA", "MC", "SD"][i],
    })),
    dateAdded: "2024-06-10",
    lastVisited: "2024-12-08",
    visitCount: 22,
    isFavorite: true,
  },
];

/* ─── Helper Functions ─── */

export function computeDoctorStats(doctors: FavoriteDoctor[]): DoctorStats {
  const total = doctors.length;
  const available = doctors.filter(
    (d) => d.availability !== "unavailable",
  ).length;
  const topRated = doctors.filter((d) => d.isTopRated).length;
  const recentlyVisited = doctors.filter(
    (d) =>
      d.lastVisited &&
      new Date(d.lastVisited) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  ).length;
  const specialties = new Set(doctors.map((d) => d.specialty)).size;
  const hospitals = new Set(doctors.map((d) => d.hospital.id)).size;

  return {
    total,
    available,
    topRated,
    recentlyVisited,
    specialties,
    hospitals,
  };
}

export function filterDoctors(
  doctors: FavoriteDoctor[],
  filters: DoctorFilters,
): FavoriteDoctor[] {
  return doctors.filter((doctor) => {
    // Search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesName = doctor.name.toLowerCase().includes(searchLower);
      const matchesSpecialty = doctor.specialty
        .toLowerCase()
        .includes(searchLower);
      const matchesHospital = doctor.hospital.name
        .toLowerCase()
        .includes(searchLower);
      const matchesDepartment = doctor.department
        .toLowerCase()
        .includes(searchLower);
      if (
        !matchesName &&
        !matchesSpecialty &&
        !matchesHospital &&
        !matchesDepartment
      ) {
        return false;
      }
    }

    // Specialty filter
    if (
      filters.specialty &&
      filters.specialty !== "all" &&
      doctor.specialty !== filters.specialty
    ) {
      return false;
    }

    // Hospital filter
    if (
      filters.hospital &&
      filters.hospital !== "all" &&
      doctor.hospital.id !== filters.hospital
    ) {
      return false;
    }

    // Availability filter
    if (
      filters.availability &&
      filters.availability !== "all" &&
      doctor.availability !== filters.availability
    ) {
      return false;
    }

    // Rating filter
    if (filters.rating && filters.rating !== "all") {
      const minRating = parseFloat(filters.rating);
      if (doctor.rating < minRating) return false;
    }

    return true;
  });
}

export function sortDoctors(
  doctors: FavoriteDoctor[],
  sortBy: DoctorFilters["sortBy"],
  sortOrder: DoctorFilters["sortOrder"],
): FavoriteDoctor[] {
  return [...doctors].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "rating":
        comparison = b.rating - a.rating;
        break;
      case "experience":
        comparison = b.experience - a.experience;
        break;
      case "date-added":
        comparison =
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        break;
      case "last-visited":
        const aVisited = a.lastVisited ? new Date(a.lastVisited).getTime() : 0;
        const bVisited = b.lastVisited ? new Date(b.lastVisited).getTime() : 0;
        comparison = bVisited - aVisited;
        break;
      case "visit-count":
        comparison = b.visitCount - a.visitCount;
        break;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });
}

export function getTabCounts(
  doctors: FavoriteDoctor[],
): Record<DoctorTab, number> {
  return {
    all: doctors.length,
    available: doctors.filter((d) => d.availability !== "unavailable").length,
    "top-rated": doctors.filter((d) => d.isTopRated).length,
    "recently-visited": doctors.filter(
      (d) =>
        d.lastVisited &&
        new Date(d.lastVisited) >
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    ).length,
  };
}

export function formatDate(dateString: string): string {
  return format(new Date(dateString), "MMM d, yyyy");
}

export function formatRelativeDate(dateString: string | null): string {
  if (!dateString) return "Never visited";
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return format(date, "MMM d, yyyy");
}
