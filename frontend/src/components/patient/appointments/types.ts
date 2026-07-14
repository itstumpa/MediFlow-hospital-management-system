import {
  Baby,
  Bone,
  Brain,
  CalendarHeart,
  Ear,
  Eye,
  HeartPulse,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

/* ─── Data types ─── */

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  doctorCount: number;
  popular: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  initials: string;
  department: string;
  departmentId: string;
  experience: string;
  rating: number;
  reviews: number;
  languages: string[];
  fee: number;
  education: string;
  available: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  period: "morning" | "afternoon" | "evening" | "night";
  available: boolean;
}

export interface BookingFormData {
  department: string;
  doctor: string;
  date: Date | null;
  timeSlot: string;
  reasonForVisit: string;
  symptoms: string;
  notes: string;
  consultationType: "in-person" | "video" | "phone";
}

/* ─── Mock Departments ─── */

export const departments: Department[] = [
  {
    id: "cardiology",
    name: "Cardiology",
    description: "Heart & cardiovascular system",
    icon: HeartPulse,
    color: "text-rose-600",
    bgColor: "bg-rose-50 dark:bg-rose-950/40",
    doctorCount: 6,
    popular: true,
  },
  {
    id: "neurology",
    name: "Neurology",
    description: "Brain & nervous system",
    icon: Brain,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/40",
    doctorCount: 4,
    popular: true,
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    description: "Bones, joints & muscles",
    icon: Bone,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/40",
    doctorCount: 5,
    popular: true,
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    description: "Children's health",
    icon: Baby,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/40",
    doctorCount: 4,
    popular: false,
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    description: "Eye care & vision",
    icon: Eye,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/40",
    doctorCount: 3,
    popular: false,
  },
  {
    id: "ent",
    name: "ENT",
    description: "Ear, nose & throat",
    icon: Ear,
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/40",
    doctorCount: 3,
    popular: false,
  },
  {
    id: "general-medicine",
    name: "General Medicine",
    description: "Primary & preventive care",
    icon: Stethoscope,
    color: "text-sky-600",
    bgColor: "bg-sky-50 dark:bg-sky-950/40",
    doctorCount: 8,
    popular: true,
  },
  {
    id: "gynecology",
    name: "Gynecology",
    description: "Women's health",
    icon: CalendarHeart,
    color: "text-pink-600",
    bgColor: "bg-pink-50 dark:bg-pink-950/40",
    doctorCount: 3,
    popular: false,
  },
];

/* ─── Mock Doctors ─── */

export const doctors: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Sarah Chen",
    initials: "SC",
    department: "Cardiology",
    departmentId: "cardiology",
    experience: "15 years",
    rating: 4.9,
    reviews: 128,
    languages: ["English", "Mandarin"],
    fee: 200,
    education: "Harvard Medical School",
    available: true,
  },
  {
    id: "doc-2",
    name: "Dr. Michael Mitchell",
    initials: "MM",
    department: "General Medicine",
    departmentId: "general-medicine",
    experience: "12 years",
    rating: 4.8,
    reviews: 95,
    languages: ["English", "Spanish"],
    fee: 150,
    education: "Johns Hopkins University",
    available: true,
  },
  {
    id: "doc-3",
    name: "Dr. Emily Rodriguez",
    initials: "ER",
    department: "Neurology",
    departmentId: "neurology",
    experience: "18 years",
    rating: 4.9,
    reviews: 156,
    languages: ["English", "French"],
    fee: 250,
    education: "Stanford Medical School",
    available: false,
  },
  {
    id: "doc-4",
    name: "Dr. James Wilson",
    initials: "JW",
    department: "Orthopedics",
    departmentId: "orthopedics",
    experience: "10 years",
    rating: 4.7,
    reviews: 82,
    languages: ["English"],
    fee: 180,
    education: "Mayo Clinic Alix School of Medicine",
    available: true,
  },
  {
    id: "doc-5",
    name: "Dr. Priya Patel",
    initials: "PP",
    department: "Cardiology",
    departmentId: "cardiology",
    experience: "9 years",
    rating: 4.6,
    reviews: 67,
    languages: ["English", "Hindi", "Gujarati"],
    fee: 175,
    education: "UCLA Medical School",
    available: true,
  },
  {
    id: "doc-6",
    name: "Dr. Robert Kim",
    initials: "RK",
    department: "Pediatrics",
    departmentId: "pediatrics",
    experience: "14 years",
    rating: 4.8,
    reviews: 112,
    languages: ["English", "Korean"],
    fee: 160,
    education: "University of Michigan Medical School",
    available: true,
  },
  {
    id: "doc-7",
    name: "Dr. Amanda Foster",
    initials: "AF",
    department: "Ophthalmology",
    departmentId: "ophthalmology",
    experience: "11 years",
    rating: 4.7,
    reviews: 74,
    languages: ["English"],
    fee: 190,
    education: "Duke University School of Medicine",
    available: true,
  },
  {
    id: "doc-8",
    name: "Dr. David Thompson",
    initials: "DT",
    department: "ENT",
    departmentId: "ent",
    experience: "16 years",
    rating: 4.8,
    reviews: 93,
    languages: ["English", "German"],
    fee: 185,
    education: "University of Pennsylvania Perelman School of Medicine",
    available: true,
  },
];

/* ─── Mock Time Slots ─── */

export const timeSlots: TimeSlot[] = [
  { id: "m1", time: "8:00 AM", period: "morning", available: true },
  { id: "m2", time: "8:30 AM", period: "morning", available: true },
  { id: "m3", time: "9:00 AM", period: "morning", available: true },
  { id: "m4", time: "9:30 AM", period: "morning", available: false },
  { id: "m5", time: "10:00 AM", period: "morning", available: true },
  { id: "m6", time: "10:30 AM", period: "morning", available: true },
  { id: "m7", time: "11:00 AM", period: "morning", available: false },
  { id: "m8", time: "11:30 AM", period: "morning", available: false },
  { id: "a1", time: "12:00 PM", period: "afternoon", available: true },
  { id: "a2", time: "12:30 PM", period: "afternoon", available: true },
  { id: "a3", time: "1:00 PM", period: "afternoon", available: true },
  { id: "a4", time: "1:30 PM", period: "afternoon", available: false },
  { id: "a5", time: "2:00 PM", period: "afternoon", available: true },
  { id: "a6", time: "2:30 PM", period: "afternoon", available: true },
  { id: "a7", time: "3:00 PM", period: "afternoon", available: true },
  { id: "a8", time: "3:30 PM", period: "afternoon", available: false },
  { id: "e1", time: "4:00 PM", period: "evening", available: true },
  { id: "e2", time: "4:30 PM", period: "evening", available: true },
  { id: "e3", time: "5:00 PM", period: "evening", available: false },
  { id: "e4", time: "5:30 PM", period: "evening", available: true },
  { id: "n1", time: "6:00 PM", period: "night", available: true },
  { id: "n2", time: "6:30 PM", period: "night", available: false },
  { id: "n3", time: "7:00 PM", period: "night", available: true },
  { id: "n4", time: "7:30 PM", period: "night", available: false },
];

/* ─── Period labels ─── */

export const periodLabels: Record<string, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  night: "Night",
};

/* ─── Mock unavailable dates (for the next few months) ─── */

export function getUnavailableDates(): Date[] {
  const today = new Date();
  const dates: Date[] = [];
  // Mark some weekend days and random weekdays
  for (let i = 5; i < 60; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    // Every 5th day is unavailable
    if (i % 5 === 0) dates.push(d);
  }
  return dates;
}

/* ─── Holiday badges ─── */

export interface Holiday {
  date: Date;
  label: string;
}

export function getHolidays(): Holiday[] {
  const today = new Date();
  const year = today.getFullYear();
  return [
    { date: new Date(year, 6, 4), label: "Independence Day" },
    { date: new Date(year, 8, 1), label: "Labor Day" },
    { date: new Date(year, 9, 13), label: "Thanksgiving" },
    { date: new Date(year, 11, 25), label: "Christmas" },
  ].filter((h) => h.date >= today);
}
