"use client";

import { staggerItem } from "@/app/components/dashboard/MotionVariants";
import type { PatientDetail } from "@/lib/data/patient-detail";
import { cn, formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertCircle,
  FileText,
  MapPin,
  Phone,
  Pill,
  Shield,
  Stethoscope,
  Syringe,
  Users,
} from "lucide-react";

interface OverviewTabProps {
  patient: PatientDetail;
}

function InfoSection({
  title,
  icon: Icon,
  children,
  className,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerItem}
      className={cn("dash-card overflow-hidden", className)}
    >
      <div className="border-b border-dash-border px-5 py-4 dark:border-slate-700">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-dash-primary/10">
            <Icon className="h-4 w-4 text-dash-primary" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            {title}
          </h3>
        </div>
      </div>
      <div className="px-5 py-4">{children}</div>
    </motion.div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="text-sm text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <span className="text-right text-sm font-medium text-slate-900 dark:text-white">
        {value}
      </span>
    </div>
  );
}

function SeverityBadge({
  severity,
}: {
  severity: "mild" | "moderate" | "severe";
}) {
  const colors = {
    mild: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    moderate:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    severe: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        colors[severity],
      )}
    >
      {severity}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    completed:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    pending:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    overdue: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    Managed:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    "Under Treatment":
      "bg-dash-primary-light text-dash-primary dark:bg-teal-900/30 dark:text-accent",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        colors[status] ||
          "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
      )}
    >
      {status}
    </span>
  );
}

export function OverviewTab({ patient }: OverviewTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid gap-6 lg:grid-cols-2"
    >
      {/* Personal Information */}
      <InfoSection title="Personal Information" icon={Users}>
        <div className="divide-y divide-dash-border dark:divide-slate-700">
          <InfoRow label="Full Name" value={patient.name} />
          <InfoRow
            label="Date of Birth"
            value={formatDate(patient.dateOfBirth)}
          />
          <InfoRow
            label="Age / Gender"
            value={`${patient.age} yrs / ${patient.gender}`}
          />
          <InfoRow label="Blood Group" value={patient.bloodGroup} />
          <InfoRow label="Marital Status" value={patient.maritalStatus} />
          <InfoRow label="Occupation" value={patient.occupation} />
          <InfoRow label="Nationality" value={patient.nationality} />
        </div>
      </InfoSection>

      {/* Emergency Contact */}
      <InfoSection title="Emergency Contact" icon={Phone}>
        <div className="divide-y divide-dash-border dark:divide-slate-700">
          <InfoRow label="Contact Name" value={patient.emergencyContact.name} />
          <InfoRow
            label="Relationship"
            value={patient.emergencyContact.relationship}
          />
          <InfoRow label="Phone" value={patient.emergencyContact.phone} />
        </div>
      </InfoSection>

      {/* Address */}
      <InfoSection title="Address" icon={MapPin}>
        <div className="divide-y divide-dash-border dark:divide-slate-700">
          <InfoRow label="Street" value={patient.address.street} />
          <InfoRow label="City" value={patient.address.city} />
          <InfoRow
            label="State / Zip"
            value={`${patient.address.state}, ${patient.address.zip}`}
          />
        </div>
      </InfoSection>

      {/* Insurance Information */}
      <InfoSection title="Insurance Information" icon={Shield}>
        <div className="divide-y divide-dash-border dark:divide-slate-700">
          <InfoRow label="Provider" value={patient.insuranceProvider} />
          <InfoRow label="Policy ID" value={patient.insuranceId} />
          <InfoRow label="Plan Type" value={patient.insuranceType} />
        </div>
      </InfoSection>

      {/* Primary Doctor */}
      <InfoSection title="Primary Doctor" icon={Stethoscope}>
        <div className="flex items-center gap-4">
          <img
            src={patient.assignedDoctor.imageUrl}
            alt={patient.assignedDoctor.name}
            className="h-14 w-14 rounded-xl object-cover shadow-sm"
          />
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              {patient.assignedDoctor.name}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {patient.assignedDoctor.specialty}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Department: {patient.department}
            </p>
          </div>
        </div>
      </InfoSection>

      {/* Allergies */}
      <InfoSection title="Allergies" icon={AlertCircle}>
        {patient.allergies.length > 0 ? (
          <div className="space-y-3">
            {patient.allergies.map((allergy, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-4 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {allergy.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Reaction: {allergy.reaction}
                  </p>
                </div>
                <SeverityBadge severity={allergy.severity} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">No known allergies</p>
        )}
      </InfoSection>

      {/* Chronic Conditions */}
      <InfoSection title="Chronic Conditions" icon={FileText}>
        {patient.chronicConditions.length > 0 ? (
          <div className="space-y-3">
            {patient.chronicConditions.map((condition, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-4 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {condition.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Diagnosed: {formatDate(condition.diagnosedDate)}
                  </p>
                </div>
                <StatusBadge status={condition.status} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">No chronic conditions</p>
        )}
      </InfoSection>

      {/* Current Medications */}
      <InfoSection title="Current Medications" icon={Pill}>
        {patient.currentMedications.length > 0 ? (
          <div className="space-y-3">
            {patient.currentMedications.map((med, i) => (
              <div
                key={i}
                className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50"
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {med.name}
                  </p>
                  <span className="text-xs font-semibold text-dash-primary">
                    {med.dosage}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {med.frequency} â€” Prescribed by {med.prescribedBy}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">No current medications</p>
        )}
      </InfoSection>

      {/* Vaccination Status */}
      <InfoSection title="Vaccination Status" icon={Syringe}>
        {patient.vaccinationStatus.length > 0 ? (
          <div className="space-y-3">
            {patient.vaccinationStatus.map((vax, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {vax.vaccine}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {vax.date ? formatDate(vax.date) : "N/A"}
                  </p>
                </div>
                <StatusBadge status={vax.status} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">No vaccination records</p>
        )}
      </InfoSection>

      {/* Notes - Full width */}
      <div className="lg:col-span-2">
        <InfoSection title="Clinical Notes" icon={FileText}>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {patient.notes}
          </p>
        </InfoSection>
      </div>
    </motion.div>
  );
}
