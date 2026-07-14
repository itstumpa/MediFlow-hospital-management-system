"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Calendar,
  CalendarPlus,
  Clock,
  FileText,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  Pill,
  Printer,
  Shield,
  Stethoscope,
  User,
  UserRound,
  X,
} from "lucide-react";
import type { PatientRecord } from "./patients-mock-data";
import { statusConfig } from "./patients-mock-data";

interface PatientDrawerProps {
  patient: PatientRecord | null;
  onClose: () => void;
}

export function PatientDrawer({ patient, onClose }: PatientDrawerProps) {
  if (!patient) return null;

  const sConf = statusConfig[patient.appointmentStatus];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 250 }}
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col border-l border-slate-200 bg-white shadow-2xl",
          "dark:border-slate-700 dark:bg-slate-900",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Patient Summary
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-5 overflow-y-auto p-4 scrollbar-thin">
          {/* Personal Information */}
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <User className="h-3.5 w-3.5" />
              Personal Information
            </h3>
            <div className="flex items-center gap-3 mb-3">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white shadow-sm",
                  patient.avatarGradient,
                )}
              >
                {patient.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {patient.name}
                </p>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                    sConf.bg,
                    sConf.text,
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", sConf.dot)} />
                  {patient.appointmentStatus}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/40">
              <InfoRow
                icon={Calendar}
                label="Age"
                value={`${patient.age} years`}
              />
              <InfoRow icon={User} label="Gender" value={patient.gender} />
              <InfoRow
                icon={Shield}
                label="Blood Group"
                value={patient.bloodGroup}
              />
              <InfoRow icon={Phone} label="Phone" value={patient.phone} />
              <InfoRow icon={Mail} label="Email" value={patient.email} />
              <div className="col-span-2">
                <InfoRow
                  icon={MapPin}
                  label="Address"
                  value={patient.address}
                />
              </div>
              <div className="col-span-2">
                <InfoRow
                  icon={Shield}
                  label="Insurance"
                  value={patient.insurance}
                />
              </div>
            </div>
          </section>

          {/* Medical Alerts */}
          {patient.medicalAlerts.length > 0 && (
            <section>
              <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <AlertTriangle className="h-3.5 w-3.5" />
                Medical Alerts
              </h3>
              <div className="space-y-1.5">
                {patient.medicalAlerts.map((alert, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-center justify-between rounded-lg border px-3 py-2",
                      alert.type === "Allergy"
                        ? "border-rose-100 bg-rose-50/50 dark:border-rose-950/30 dark:bg-rose-950/20"
                        : alert.severity === "Severe" ||
                            alert.severity === "High"
                          ? "border-red-100 bg-red-50/50 dark:border-red-950/30 dark:bg-red-950/20"
                          : "border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900/40",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {alert.type === "Allergy" ? (
                        <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                      ) : (
                        <HeartPulse className="h-3.5 w-3.5 text-amber-400" />
                      )}
                      <div>
                        <p className="text-xs font-medium text-slate-900 dark:text-white">
                          {alert.label}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {alert.type}
                        </p>
                      </div>
                    </div>
                    <SeverityBadge severity={alert.severity} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Current Medications */}
          {patient.currentMedications.length > 0 && (
            <section>
              <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Pill className="h-3.5 w-3.5" />
                Current Medications
              </h3>
              <div className="space-y-1.5">
                {patient.currentMedications.map((med, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 rounded-lg border border-slate-100 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900/40"
                  >
                    <Pill className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                    <span className="text-xs text-slate-700 dark:text-slate-300">
                      {med}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Recent Visits */}
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              Recent Visits
            </h3>
            <div className="space-y-2">
              {patient.recentVisits.map((visit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-lg border border-slate-100 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900/40"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                    <Stethoscope className="h-3.5 w-3.5 text-slate-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-slate-900 dark:text-white">
                      {visit.reason}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {visit.date} — {visit.doctor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Appointment */}
          {patient.upcomingAppointment && (
            <section>
              <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Calendar className="h-3.5 w-3.5" />
                Upcoming Appointment
              </h3>
              <div className="flex items-center gap-3 rounded-lg border border-dash-primary-light/60 bg-dash-primary-light/50 px-3 py-2.5 dark:border-teal-800/30 dark:bg-teal-950/20">
                <Calendar className="h-5 w-5 text-dash-primary" />
                <p className="text-xs font-medium text-dash-primary-dark dark:text-accent">
                  {patient.upcomingAppointment}
                </p>
              </div>
            </section>
          )}

          {/* Quick Actions */}
          <section className="pb-4">
            <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Activity className="h-3.5 w-3.5" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <DrawerButton
                icon={CalendarPlus}
                label="Schedule Follow-up"
                color="text-dash-primary"
              />
              <DrawerButton
                icon={UserRound}
                label="Refer to Specialist"
                color="text-indigo-500"
              />
              <DrawerButton
                icon={Printer}
                label="Print Summary"
                color="text-amber-500"
              />
              <DrawerButton
                icon={FileText}
                label="View Full History"
                color="text-emerald-500"
              />
            </div>
          </section>
        </div>
      </motion.div>
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
      <div className="min-w-0">
        <p className="text-[9px] text-slate-400">{label}</p>
        <p className="truncate text-xs font-medium text-slate-700 dark:text-slate-300">
          {value}
        </p>
      </div>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const colors: Record<string, string> = {
    Mild: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    Moderate:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
    Severe: "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400",
    High: "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400",
    Managed:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
    Stable:
      "bg-dash-primary-light text-dash-primary dark:bg-teal-950/30 dark:text-accent",
  };
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[10px] font-medium",
        colors[severity] || "bg-slate-100 text-slate-600",
      )}
    >
      {severity}
    </span>
  );
}

function DrawerButton({
  icon: Icon,
  label,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
}) {
  return (
    <button
      className={cn(
        "flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-xs font-medium text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800",
      )}
    >
      <Icon className={cn("h-4 w-4 shrink-0", color)} />
      {label}
    </button>
  );
}
