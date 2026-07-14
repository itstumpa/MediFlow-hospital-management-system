// ============================================================
// Types & Mock Data — Appointment Details Page
// ============================================================

import {
  mockAppointmentDetails,
  type ActivityEntry,
  type AppointmentAttachment,
  type AppointmentDetail,
  type AppointmentDoctor,
  type AppointmentPatient,
  type BillingInfo,
  type PrescriptionItem,
} from "@/lib/data/appointment-detail";

/* ─── Re-export base types ─── */
export type {
  ActivityEntry,
  AppointmentAttachment,
  AppointmentDetail,
  AppointmentDoctor,
  AppointmentPatient,
  BillingInfo,
  PrescriptionItem,
};

/* ─── Extended types for the detail page ─── */

export interface ClinicLocation {
  clinicName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  room: string;
  floor: string;
  parkingInfo: string;
  mapEmbedUrl: string;
}

export interface TimelineStep {
  id: string;
  label: string;
  description: string;
  timestamp: string | null;
  completed: boolean;
  active: boolean;
  icon: string;
}

export interface Document {
  id: string;
  name: string;
  type: "prescription" | "medical-record" | "invoice" | "lab-request";
  fileType: string;
  size: string;
  date: string;
  description: string;
}

export interface RelatedAppointment {
  id: string;
  appointmentId: string;
  doctorName: string;
  doctorInitials: string;
  doctorDepartment: string;
  date: string;
  time: string;
  status: string;
  consultationType: string;
}

export interface DoctorDetail {
  id: string;
  name: string;
  initials: string;
  avatar: string;
  department: string;
  specialization: string;
  experience: number;
  rating: number;
  reviewCount: number;
  languages: string[];
  hospital: string;
  about: string;
}

export interface AppointmentDetailPageData {
  appointment: AppointmentDetail;
  clinic: ClinicLocation;
  doctorDetail: DoctorDetail;
  timelineSteps: TimelineStep[];
  documents: Document[];
  previousAppointments: RelatedAppointment[];
  upcomingAppointments: RelatedAppointment[];
}

/* ─── Clinic locations ─── */

export const clinicLocations: Record<string, ClinicLocation> = {
  "MediFlow Main Campus": {
    clinicName: "MediFlow Medical Center — Main Campus",
    address: "1500 Health Parkway",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    phone: "+1 (415) 555-0100",
    room: "Suite 302, Cardiology Wing",
    floor: "3rd Floor — Tower B",
    parkingInfo:
      "Validated parking available in the Main Campus Garage (enter on Bryant St). Parking validation stamps are available at the front desk. Street parking is limited to 2 hours.",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.123!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzdCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus",
  },
  "MediFlow East Wing": {
    clinicName: "MediFlow East Wing — Specialty Center",
    address: "2500 Harrison Street",
    city: "San Francisco",
    state: "CA",
    zip: "94110",
    phone: "+1 (415) 555-0200",
    room: "Suite 150, Neurology Department",
    floor: "1st Floor — East Entrance",
    parkingInfo:
      "Free parking in the East Wing lot (entrance on 25th St). Handicap accessible spots available near the entrance. Valet parking available $8.",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.123!2d-122.4138!3d37.7489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzdCsDQ0JzU2LjEiTiAxMjLCsDI0JzQ5LjciVw!5e0!3m2!1sen!2sus",
  },
  "MediFlow West Clinic": {
    clinicName: "MediFlow West Clinic — Orthopedic Center",
    address: "890 Market Street",
    city: "San Francisco",
    state: "CA",
    zip: "94104",
    phone: "+1 (415) 555-0300",
    room: "Suite 220, Orthopedic Department",
    floor: "2nd Floor — West Wing",
    parkingInfo:
      "Parking available at the Market Street Garage (entrance on 4th St). $12 flat rate after 6 PM. Street parking is metered until 6 PM.",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.123!2d-122.4068!3d37.7852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ3JzA2LjciTiAxMjLCsDI0JzI0LjUiVw!5e0!3m2!1sen!2sus",
  },
};

/* ─── Doctor details ─── */

export const doctorDetails: Record<string, DoctorDetail> = {
  "DOC-001": {
    id: "DOC-001",
    name: "Dr. Sarah Johnson",
    initials: "SJ",
    avatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face",
    department: "Cardiology",
    specialization: "Interventional Cardiology",
    experience: 18,
    rating: 4.9,
    reviewCount: 342,
    languages: ["English", "Spanish", "Mandarin"],
    hospital: "MediFlow Medical Center",
    about:
      "Board-certified cardiologist with 18 years of experience in interventional cardiology. Specializes in coronary angioplasty, stent placement, and cardiac device implantation. Published over 40 peer-reviewed articles on cardiovascular disease management.",
  },
  "DOC-003": {
    id: "DOC-003",
    name: "Dr. Michael Chen",
    initials: "MC",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
    department: "Neurology",
    specialization: "Clinical Neurophysiology",
    experience: 14,
    rating: 4.8,
    reviewCount: 256,
    languages: ["English", "Mandarin", "Cantonese"],
    hospital: "MediFlow Medical Center",
    about:
      "Clinical neurophysiologist with expertise in diagnosing and treating epilepsy, migraine disorders, and neuromuscular conditions. Fellowship-trained at Stanford Neurology. Active researcher in novel migraine therapies.",
  },
  "DOC-005": {
    id: "DOC-005",
    name: "Dr. Amanda Patel",
    initials: "AP",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
    department: "Orthopedics",
    specialization: "Joint Replacement Surgery",
    experience: 16,
    rating: 4.7,
    reviewCount: 189,
    languages: ["English", "Hindi", "Gujarati"],
    hospital: "MediFlow Medical Center",
    about:
      "Orthopedic surgeon specializing in total joint replacement of the hip and knee. Performs over 200 joint replacements annually using minimally invasive techniques. Committed to rapid recovery protocols and personalized rehabilitation plans.",
  },
};

/* ─── Timeline step generator ─── */

export function generateTimelineSteps(
  status: string,
  activity: ActivityEntry[],
): TimelineStep[] {
  const getTimestamp = (type: string): string | null => {
    const entry = activity.find((a) => a.type === type);
    return entry ? entry.timestamp : null;
  };

  const steps: TimelineStep[] = [
    {
      id: "booked",
      label: "Appointment Booked",
      description: "Appointment was scheduled successfully",
      timestamp: getTimestamp("created"),
      completed: true,
      active: false,
      icon: "CalendarPlus",
    },
    {
      id: "confirmed",
      label: "Confirmed",
      description: "Confirmed by clinic staff",
      timestamp: getTimestamp("confirmed"),
      completed:
        status === "completed" ||
        status === "in-progress" ||
        status === "confirmed" ||
        status === "checked-in",
      active: status === "confirmed" || status === "scheduled",
      icon: "CheckCircle2",
    },
    {
      id: "checked-in",
      label: "Checked In",
      description: "Patient arrived / joined virtual lobby",
      timestamp: getTimestamp("checked-in"),
      completed:
        status === "completed" ||
        status === "in-progress" ||
        status === "checked-in",
      active: status === "checked-in",
      icon: "ClipboardCheck",
    },
    {
      id: "consultation",
      label: "Consultation",
      description: "Consultation with doctor",
      timestamp: getTimestamp("started"),
      completed: status === "completed",
      active: status === "in-progress",
      icon: "Stethoscope",
    },
    {
      id: "completed",
      label: "Completed",
      description: "Appointment finalized",
      timestamp: getTimestamp("completed") || getTimestamp("payment"),
      completed: status === "completed",
      active: false,
      icon: "Award",
    },
  ];

  // For cancelled appointments, truncate timeline
  if (status === "cancelled" || status === "no-show") {
    const cancelledAt = activity.find((a) => a.type === "cancelled");
    // Always show up to confirmed at most
    return steps.slice(0, 2).map((s) => {
      if (s.id === "confirmed" && cancelledAt) {
        return {
          ...s,
          label: status === "cancelled" ? "Cancelled" : "No Show",
          description: cancelledAt.description,
          timestamp: cancelledAt.timestamp,
          completed: true,
          active: false,
          icon: status === "cancelled" ? "XCircle" : "CalendarX2",
        };
      }
      return s;
    });
  }

  return steps;
}

/* ─── Documents generator ─── */

export function generateDocuments(appointment: AppointmentDetail): Document[] {
  const docs: Document[] = [];

  if (appointment.prescriptions && appointment.prescriptions.length > 0) {
    docs.push({
      id: "doc-prescription",
      name: `Prescription — ${appointment.doctor.name}`,
      type: "prescription",
      fileType: "PDF",
      size: "0.4 MB",
      date: appointment.date,
      description: `${appointment.prescriptions.length} medications prescribed`,
    });
  }

  docs.push(
    {
      id: "doc-record",
      name: "Medical Visit Summary",
      type: "medical-record",
      fileType: "PDF",
      size: "1.2 MB",
      date: appointment.date,
      description: "Complete visit notes, diagnosis, and recommendations",
    },
    {
      id: "doc-invoice",
      name: `Invoice ${appointment.billing.invoiceNumber}`,
      type: "invoice",
      fileType: "PDF",
      size: "0.3 MB",
      date: appointment.date,
      description: `Payment status: ${appointment.paymentStatus}`,
    },
  );

  if (appointment.recommendations && appointment.recommendations.length > 0) {
    docs.push({
      id: "doc-lab",
      name: "Lab / Test Requests",
      type: "lab-request",
      fileType: "PDF",
      size: "0.5 MB",
      date: appointment.date,
      description: `${appointment.recommendations.length} follow-up recommendations`,
    });
  }

  return docs;
}

/* ─── Related appointments ─── */

function parseAppointmentDoctorName(rawName: string): string {
  // Remove "Dr. " prefix and return
  return rawName.replace(/^Dr\.\s*/, "");
}

export const relatedAppointments: Record<
  string,
  {
    previous: RelatedAppointment[];
    upcoming: RelatedAppointment[];
  }
> = {
  "APT-2026-001": {
    previous: [
      {
        id: "prev-1",
        appointmentId: "APT-2026-002",
        doctorName: "Dr. Michael Chen",
        doctorInitials: "MC",
        doctorDepartment: "Neurology",
        date: "2026-07-12",
        time: "10:30 AM",
        status: "completed",
        consultationType: "Video",
      },
      {
        id: "prev-2",
        appointmentId: "APT-2026-003",
        doctorName: "Dr. Amanda Patel",
        doctorInitials: "AP",
        doctorDepartment: "Orthopedics",
        date: "2026-07-15",
        time: "02:00 PM",
        status: "scheduled",
        consultationType: "In-Person",
      },
    ],
    upcoming: [
      {
        id: "next-1",
        appointmentId: "APT-2026-004",
        doctorName: "Dr. Sarah Johnson",
        doctorInitials: "SJ",
        doctorDepartment: "Cardiology",
        date: "2026-08-11",
        time: "09:00 AM",
        status: "confirmed",
        consultationType: "In-Person",
      },
    ],
  },
  "APT-2026-002": {
    previous: [
      {
        id: "prev-1",
        appointmentId: "APT-2026-005",
        doctorName: "Dr. Lisa Chang",
        doctorInitials: "LC",
        doctorDepartment: "Dermatology",
        date: "2026-05-20",
        time: "11:00 AM",
        status: "completed",
        consultationType: "In-Person",
      },
    ],
    upcoming: [
      {
        id: "next-1",
        appointmentId: "APT-2026-004",
        doctorName: "Dr. Michael Chen",
        doctorInitials: "MC",
        doctorDepartment: "Neurology",
        date: "2026-09-06",
        time: "10:30 AM",
        status: "confirmed",
        consultationType: "Video",
      },
    ],
  },
  "APT-2026-003": {
    previous: [
      {
        id: "prev-1",
        appointmentId: "APT-2026-006",
        doctorName: "Dr. David Kim",
        doctorInitials: "DK",
        doctorDepartment: "Cardiology",
        date: "2026-04-10",
        time: "08:30 AM",
        status: "completed",
        consultationType: "In-Person",
      },
    ],
    upcoming: [
      {
        id: "next-1",
        appointmentId: "APT-2026-007",
        doctorName: "Dr. Amanda Patel",
        doctorInitials: "AP",
        doctorDepartment: "Orthopedics",
        date: "2026-08-26",
        time: "02:00 PM",
        status: "confirmed",
        consultationType: "In-Person",
      },
    ],
  },
};

const defaultPrevious: RelatedAppointment[] = [
  {
    id: "prev-gen",
    appointmentId: "APT-2025-012",
    doctorName: "Dr. Robert Tanaka",
    doctorInitials: "RT",
    doctorDepartment: "General Medicine",
    date: "2026-03-15",
    time: "09:30 AM",
    status: "completed",
    consultationType: "In-Person",
  },
];

const defaultUpcoming: RelatedAppointment[] = [
  {
    id: "next-gen",
    appointmentId: "APT-2026-010",
    doctorName: "Dr. Priya Patel",
    doctorInitials: "PP",
    doctorDepartment: "Cardiology",
    date: "2026-08-20",
    time: "10:00 AM",
    status: "confirmed",
    consultationType: "Video",
  },
];

/* ─── Get full detail page data ─── */

export function getAppointmentDetailPageData(
  id: string,
): AppointmentDetailPageData | undefined {
  const appointment = mockAppointmentDetails[id];
  if (!appointment) return undefined;

  const clinicName = appointment.doctor.department.includes("Cardiology")
    ? "MediFlow Main Campus"
    : appointment.doctor.department.includes("Neuro")
      ? "MediFlow East Wing"
      : "MediFlow West Clinic";

  return {
    appointment,
    clinic:
      clinicLocations[clinicName] || clinicLocations["MediFlow Main Campus"],
    doctorDetail:
      doctorDetails[appointment.doctor.id] ||
      ({
        ...appointment.doctor,
        initials: appointment.doctor.name
          .split(" ")
          .map((n) => n[0])
          .join(""),
        reviewCount: Math.round(appointment.doctor.rating * 50 + 20),
        languages: ["English"],
        hospital: "MediFlow Medical Center",
        about: `${appointment.doctor.specialization} specialist with ${appointment.doctor.experience} years of experience.`,
      } as DoctorDetail),
    timelineSteps: generateTimelineSteps(
      appointment.status,
      appointment.activity,
    ),
    documents: generateDocuments(appointment),
    previousAppointments: relatedAppointments[id]?.previous || defaultPrevious,
    upcomingAppointments: relatedAppointments[id]?.upcoming || defaultUpcoming,
  };
}
