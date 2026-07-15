"use client";

import { Button } from "@/app/components/dashboard/Button";
import {
  fadeInBackdrop,
  slideRight,
} from "@/components/dashboard/staff/MotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Calendar,
  CalendarPlus,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  User,
  X,
} from "lucide-react";
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

/* ─── Section Wrapper ───────────────────────── */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        {title}
      </h4>
      {children}
    </div>
  );
}

/* ─── Info Row ──────────────────────────────── */

function InfoRow({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: any;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 py-1.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-400 dark:text-slate-500">{label}</p>
        <p
          className={`text-sm ${
            highlight
              ? "font-medium text-rose-600 dark:text-rose-400"
              : "text-slate-700 dark:text-slate-300"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* ─── Component ─────────────────────────────── */

interface PatientDrawerProps {
  patient: Patient | null;
  open: boolean;
  onClose: () => void;
}

export function PatientDrawer({ patient, open, onClose }: PatientDrawerProps) {
  if (!patient) return null;

  const status = statusConfig[patient.status];
  const initialsColor = getInitialsColor(patient.name);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            variants={fadeInBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer-panel"
            variants={slideRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl dark:bg-slate-900"
          >
            {/* ── Header ──────────────────────── */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Patient Profile
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* ── Scrollable Content ──────────── */}
            <div className="flex-1 overflow-y-auto dash-scrollbar">
              {/* Identity */}
              <div className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white ${initialsColor}`}
                    >
                      {patient.initials}
                    </span>
                    {patient.isVIP && (
                      <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] text-white shadow-sm">
                        ★
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">
                      {patient.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.class}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                        />
                        {status.label}
                      </span>
                      <span className="text-xs text-slate-400">
                        {patient.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-5 px-6 pb-6">
                {/* Personal Information */}
                <Section title="Personal Information">
                  <InfoRow
                    icon={User}
                    label="Age / Gender"
                    value={`${patient.age} years · ${patient.gender}`}
                  />
                  <InfoRow
                    icon={Activity}
                    label="Blood Group"
                    value={patient.bloodGroup}
                  />
                  <InfoRow icon={Phone} label="Phone" value={patient.phone} />
                  <InfoRow icon={Mail} label="Email" value={patient.email} />
                  <InfoRow
                    icon={MapPin}
                    label="Address"
                    value={patient.address}
                  />
                </Section>

                <hr className="border-slate-100 dark:border-slate-800" />

                {/* Emergency Contact */}
                <Section title="Emergency Contact">
                  <InfoRow
                    icon={User}
                    label="Name"
                    value={patient.emergencyContact.name}
                  />
                  <InfoRow
                    icon={Phone}
                    label="Phone"
                    value={patient.emergencyContact.phone}
                  />
                  <InfoRow
                    icon={User}
                    label="Relationship"
                    value={patient.emergencyContact.relationship}
                  />
                </Section>

                <hr className="border-slate-100 dark:border-slate-800" />

                {/* Insurance */}
                <Section title="Insurance">
                  <InfoRow
                    icon={CreditCard}
                    label="Provider"
                    value={patient.insuranceProvider}
                  />
                  <InfoRow
                    icon={CreditCard}
                    label="Policy Number"
                    value={patient.insuranceNumber}
                  />
                </Section>

                <hr className="border-slate-100 dark:border-slate-800" />

                {/* Upcoming Appointment */}
                <Section title="Upcoming Appointment">
                  {patient.upcomingAppointment ? (
                    <>
                      <InfoRow
                        icon={Calendar}
                        label="Date / Time"
                        value={`${patient.upcomingAppointment.date} · ${patient.upcomingAppointment.time}`}
                      />
                      <InfoRow
                        icon={User}
                        label="Doctor"
                        value={patient.upcomingAppointment.doctor}
                      />
                      <InfoRow
                        icon={Activity}
                        label="Reason"
                        value={patient.upcomingAppointment.reason}
                      />
                    </>
                  ) : (
                    <p className="text-sm text-slate-400 italic">
                      No upcoming appointments scheduled.
                    </p>
                  )}
                </Section>

                <hr className="border-slate-100 dark:border-slate-800" />

                {/* Medical Alerts */}
                <Section title="Medical Alerts">
                  {patient.allergies.length > 0 ? (
                    <div className="mb-2">
                      <p className="mb-1 text-xs text-slate-400">Allergies</p>
                      <div className="flex flex-wrap gap-1.5">
                        {patient.allergies.map((a) => (
                          <span
                            key={a}
                            className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                          >
                            <AlertTriangle className="h-3 w-3" />
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="mb-2 text-sm text-slate-400">
                      No known allergies.
                    </p>
                  )}

                  {patient.chronicDiseases.length > 0 && (
                    <div>
                      <p className="mb-1 text-xs text-slate-400">
                        Chronic Conditions
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {patient.chronicDiseases.map((d) => (
                          <span
                            key={d}
                            className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {patient.outstandingBalance > 0 && (
                    <div className="mt-3">
                      <InfoRow
                        icon={CreditCard}
                        label="Outstanding Balance"
                        value={`$${patient.outstandingBalance.toFixed(2)}`}
                        highlight
                      />
                    </div>
                  )}
                </Section>
              </div>
            </div>

            {/* ── Quick Actions ─────────────────── */}
            <div className="flex items-center gap-2 border-t border-slate-200 px-6 py-4 dark:border-slate-700">
              <Button variant="primary" size="sm" icon={User}>
                View Full Profile
              </Button>
              <Button variant="outline" size="sm" icon={CalendarPlus}>
                Book
              </Button>
              <Button variant="ghost" size="sm" icon={Activity} />
              <Button variant="ghost" size="sm" icon={CreditCard} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
