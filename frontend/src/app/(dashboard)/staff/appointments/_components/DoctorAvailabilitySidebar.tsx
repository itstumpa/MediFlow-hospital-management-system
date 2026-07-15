"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Dot, Users } from "lucide-react";

/* ─── Types ─────────────────────────────────── */

interface DoctorStatus {
  id: string;
  name: string;
  department: string;
  status: "available" | "busy" | "on-break" | "away" | "off-duty";
  patientsToday: number;
  color: string;
  initials: string;
  nextSlot?: string;
}

interface UpcomingSlot {
  doctorName: string;
  time: string;
  department: string;
  color: string;
}

/* ─── Mock Data ─────────────────────────────── */

const doctors: DoctorStatus[] = [
  {
    id: "dr-sarah",
    name: "Dr. Sarah Chen",
    department: "General",
    status: "available",
    patientsToday: 8,
    color: "teal",
    initials: "SC",
    nextSlot: "11:00 AM",
  },
  {
    id: "dr-james",
    name: "Dr. James Wilson",
    department: "Cardiology",
    status: "busy",
    patientsToday: 12,
    color: "blue",
    initials: "JW",
    nextSlot: "12:30 PM",
  },
  {
    id: "dr-emily",
    name: "Dr. Emily Martinez",
    department: "Pediatrics",
    status: "on-break",
    patientsToday: 6,
    color: "rose",
    initials: "EM",
    nextSlot: "10:30 AM",
  },
  {
    id: "dr-robert",
    name: "Dr. Robert Kim",
    department: "Orthopedics",
    status: "away",
    patientsToday: 5,
    color: "amber",
    initials: "RK",
    nextSlot: "1:00 PM",
  },
  {
    id: "dr-david",
    name: "Dr. David Park",
    department: "Neurology",
    status: "busy",
    patientsToday: 9,
    color: "violet",
    initials: "DP",
    nextSlot: "2:00 PM",
  },
  {
    id: "dr-lisa",
    name: "Dr. Lisa Anderson",
    department: "Dermatology",
    status: "off-duty",
    patientsToday: 0,
    color: "emerald",
    initials: "LA",
    nextSlot: "—",
  },
];

const upcomingSlots: UpcomingSlot[] = [
  {
    doctorName: "Dr. Sarah Chen",
    time: "11:00 AM",
    department: "General",
    color: "teal",
  },
  {
    doctorName: "Dr. James Wilson",
    time: "12:30 PM",
    department: "Cardiology",
    color: "blue",
  },
  {
    doctorName: "Dr. Emily Martinez",
    time: "10:30 AM",
    department: "Pediatrics",
    color: "rose",
  },
  {
    doctorName: "Dr. Robert Kim",
    time: "1:00 PM",
    department: "Orthopedics",
    color: "amber",
  },
  {
    doctorName: "Dr. David Park",
    time: "2:00 PM",
    department: "Neurology",
    color: "violet",
  },
];

/* ─── Status color maps ──────────────────────── */

const statusDot: Record<string, string> = {
  available: "text-emerald-500",
  busy: "text-blue-500",
  "on-break": "text-amber-500",
  away: "text-slate-400",
  "off-duty": "text-red-400",
};

const statusBg: Record<string, string> = {
  available:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  busy: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  "on-break":
    "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  away: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
  "off-duty": "bg-red-50 text-red-500 dark:bg-red-950/40 dark:text-red-400",
};

/* ─── Doctor Row ────────────────────────────── */

function DoctorRow({ doctor }: { doctor: DoctorStatus }) {
  return (
    <motion.div
      variants={staggerItem}
      className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white/50 px-3 py-2.5 transition-colors hover:bg-slate-50 dark:border-slate-700/50 dark:bg-slate-800/30 dark:hover:bg-slate-800/50"
    >
      {/* Avatar */}
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white`}
        style={{
          backgroundColor:
            doctor.color === "teal"
              ? "var(--color-primary)"
              : doctor.color === "blue"
                ? "#3b82f6"
                : doctor.color === "rose"
                  ? "#e11d48"
                  : doctor.color === "amber"
                    ? "#d97706"
                    : doctor.color === "violet"
                      ? "#7c3aed"
                      : "#10b981",
        }}
      >
        {doctor.initials}
      </span>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {doctor.name}
          </p>
          <Dot className={`h-4 w-4 ${statusDot[doctor.status]}`} />
        </div>
        <p className="text-xs text-slate-400">
          {doctor.department}
          <span className="mx-1.5">·</span>
          {doctor.patientsToday} patients
        </p>
      </div>

      {/* Status pill */}
      <span
        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
          statusBg[doctor.status]
        }`}
      >
        {doctor.status}
      </span>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────── */

export function DoctorAvailabilitySidebar() {
  const totalDoctors = doctors.length;
  const available = doctors.filter((d) => d.status === "available").length;
  const busy = doctors.filter((d) => d.status === "busy").length;
  const offDuty = doctors.filter(
    (d) => d.status === "off-duty" || d.status === "away",
  ).length;

  return (
    <div className="dash-card">
      {/* Today's Summary */}
      <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <CalendarDays className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Today&apos;s Summary
          </h3>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {/* Total */}
          <div className="rounded-lg bg-slate-50 p-2 text-center dark:bg-slate-800/50">
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {totalDoctors}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Total
            </p>
          </div>
          {/* Available */}
          <div className="rounded-lg bg-emerald-50 p-2 text-center dark:bg-emerald-950/30">
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {available}
            </p>
            <p className="text-[10px] text-emerald-600/70 dark:text-emerald-400/70">
              Available
            </p>
          </div>
          {/* Busy */}
          <div className="rounded-lg bg-blue-50 p-2 text-center dark:bg-blue-950/30">
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {busy}
            </p>
            <p className="text-[10px] text-blue-600/70 dark:text-blue-400/70">
              Busy
            </p>
          </div>
        </div>
      </div>

      {/* Doctor List */}
      <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
            <Users className="h-3.5 w-3.5" />
            Doctors on Duty
          </div>
          {offDuty > 0 && (
            <span className="text-[10px] text-slate-400">
              {offDuty} off-duty
            </span>
          )}
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          {doctors.map((doctor) => (
            <DoctorRow key={doctor.id} doctor={doctor} />
          ))}
        </motion.div>
      </div>

      {/* Upcoming Slots */}
      <div className="px-4 py-3">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          Upcoming Available Slots
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-1.5"
        >
          {upcomingSlots.map((slot, i) => (
            <motion.div
              key={`${slot.doctorName}-${slot.time}`}
              variants={staggerItem}
              className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/30"
            >
              <div
                className="h-2 w-2 shrink-0 rounded-full"
                style={{
                  backgroundColor:
                    slot.color === "teal"
                      ? "var(--color-primary)"
                      : slot.color === "blue"
                        ? "#3b82f6"
                        : slot.color === "rose"
                          ? "#e11d48"
                          : slot.color === "amber"
                            ? "#d97706"
                            : slot.color === "violet"
                              ? "#7c3aed"
                              : "#10b981",
                }}
              />
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {slot.doctorName}
                </p>
                <p className="text-[10px] text-slate-400">{slot.department}</p>
              </div>
              <span className="shrink-0 text-xs font-semibold text-slate-800 dark:text-slate-200">
                {slot.time}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
