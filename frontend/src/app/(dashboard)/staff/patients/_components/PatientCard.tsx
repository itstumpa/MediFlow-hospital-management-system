"use client";

import { Button } from "@/app/components/dashboard/Button";
import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { Activity, CalendarPlus, CreditCard, User } from "lucide-react";
import { type Patient, statusConfig } from "../_mock-data";

/* ─── Helpers ───────────────────────────────── */

function getInitialsColor(name: string) {
  const colors = [
    "bg-[var(--color-primary)]",
    "bg-emerald-500",
    "bg-violet-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-cyan-500",
  ];
  const idx = name.length % colors.length;
  return colors[idx];
}

/* ─── Patient Card ──────────────────────────── */

interface PatientCardProps {
  patients: Patient[];
  onViewPatient: (patient: Patient) => void;
}

export function PatientCard({
  patients: filteredPatients,
  onViewPatient,
}: PatientCardProps) {
  if (filteredPatients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
          <User className="h-7 w-7 text-slate-400" />
        </div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          No patients found
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {filteredPatients.map((patient) => (
        <Card key={patient.id} patient={patient} onView={onViewPatient} />
      ))}
    </motion.div>
  );
}

/* ─── Individual Card ───────────────────────── */

function Card({
  patient,
  onView,
}: {
  patient: Patient;
  onView: (p: Patient) => void;
}) {
  const status = statusConfig[patient.status];
  const initialsColor = getInitialsColor(patient.name);

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="dash-card dash-card-hover flex flex-col overflow-hidden"
    >
      {/* Top section — Avatar + Status */}
      <div className="relative border-b border-slate-100 bg-slate-50/50 px-5 py-4 dark:border-slate-700 dark:bg-slate-800/30">
        <div className="flex items-center gap-4">
          <div className="relative">
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${initialsColor}`}
            >
              {patient.initials}
            </span>
            {patient.isVIP && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] text-white shadow-sm">
                ★
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
              {patient.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Age {patient.age} · {patient.bloodGroup} · {patient.gender}
            </p>
          </div>
          <span
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.class}`}
          >
            {status.label}
          </span>
        </div>
      </div>

      {/* Body — Details */}
      <div className="flex-1 space-y-2.5 px-5 py-4">
        {/* Phone */}
        <div className="flex items-center gap-3 text-sm">
          <span className="w-20 text-xs text-slate-400 dark:text-slate-500">
            Phone
          </span>
          <span className="text-slate-700 dark:text-slate-300">
            {patient.phone}
          </span>
        </div>

        {/* Doctor */}
        <div className="flex items-center gap-3 text-sm">
          <span className="w-20 text-xs text-slate-400 dark:text-slate-500">
            Doctor
          </span>
          <span className="text-slate-700 dark:text-slate-300">
            {patient.assignedDoctor}
          </span>
        </div>

        {/* Last Visit */}
        <div className="flex items-center gap-3 text-sm">
          <span className="w-20 text-xs text-slate-400 dark:text-slate-500">
            Last Visit
          </span>
          <span className="text-slate-700 dark:text-slate-300">
            {patient.lastVisit}
          </span>
        </div>

        {/* Upcoming Appointment */}
        <div className="flex items-start gap-3 text-sm">
          <span className="w-20 shrink-0 text-xs text-slate-400 dark:text-slate-500">
            Next Appt
          </span>
          {patient.upcomingAppointment ? (
            <span className="text-slate-700 dark:text-slate-300">
              {patient.upcomingAppointment.date} ·{" "}
              {patient.upcomingAppointment.time}
            </span>
          ) : (
            <span className="text-slate-400 italic">None scheduled</span>
          )}
        </div>

        {/* Balance */}
        {patient.outstandingBalance > 0 && (
          <div className="flex items-center gap-3 text-sm">
            <span className="w-20 text-xs text-slate-400 dark:text-slate-500">
              Balance
            </span>
            <span className="font-medium text-rose-600 dark:text-rose-400">
              ${patient.outstandingBalance.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 border-t border-slate-100 px-5 py-3 dark:border-slate-700">
        <Button
          variant="primary"
          size="xs"
          icon={User}
          onClick={() => onView(patient)}
        >
          View Profile
        </Button>
        <Button variant="outline" size="xs" icon={Activity}>
          Check-in
        </Button>
        <Button variant="ghost" size="xs" icon={CalendarPlus} />
        <Button variant="ghost" size="xs" icon={CreditCard} />
      </div>
    </motion.div>
  );
}
