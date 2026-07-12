"use client";

import { staggerItem } from "@/app/components/dashboard/MotionVariants";
import type { PatientDetail } from "@/lib/data/patient-detail";
import { cn, formatDate, getInitials } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Building2,
  Calendar,
  CalendarCheck,
  CreditCard,
  Droplets,
  Edit3,
  FileText,
  Globe,
  Heart,
  Mail,
  Phone,
  Shield,
  Stethoscope,
  User,
} from "lucide-react";

interface PatientHeroProps {
  patient: PatientDetail;
}

const statusConfig = {
  active: {
    label: "Active",
    class:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  inactive: {
    label: "Inactive",
    class: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    dot: "bg-slate-400",
  },
  critical: {
    label: "Critical",
    class: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    dot: "bg-red-500",
  },
  discharged: {
    label: "Discharged",
    class: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    dot: "bg-blue-500",
  },
};

function StatBadge({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg bg-slate-50 px-3.5 py-2.5 dark:bg-slate-800/50">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm dark:bg-slate-700">
        <Icon className="h-4 w-4 text-dash-primary" />
      </div>
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

export function PatientHero({ patient }: PatientHeroProps) {
  const status = statusConfig[patient.status];

  return (
    <motion.div variants={staggerItem} className="dash-card overflow-hidden">
      {/* Top gradient accent */}
      <div className="h-1.5 bg-gradient-to-r from-dash-primary via-blue-500 to-dash-primary" />

      <div className="p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Left: Avatar + Name + ID */}
          <div className="flex items-start gap-5">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1,
              }}
              className="relative shrink-0"
            >
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-dash-primary to-blue-600 shadow-lg shadow-dash-primary/20 ring-4 ring-white dark:ring-slate-800">
                {patient.avatar ? (
                  <img
                    src={patient.avatar}
                    alt={patient.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-white">
                    {getInitials(patient.name)}
                  </span>
                )}
              </div>
              {/* Status dot */}
              <span
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-white dark:border-slate-800",
                  status.dot,
                )}
              />
            </motion.div>

            {/* Name + ID */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {patient.name}
                </h2>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
                    status.class,
                  )}
                >
                  <span
                    className={cn("h-1.5 w-1.5 rounded-full", status.dot)}
                  />
                  {status.label}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                <span className="font-mono text-dash-primary">
                  {patient.id}
                </span>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <span>
                  {patient.age} yrs | {patient.gender}
                </span>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <span className="flex items-center gap-1">
                  <Droplets className="h-3.5 w-3.5 text-red-400" />
                  {patient.bloodGroup}
                </span>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Registered {formatDate(patient.registrationDate)} •{" "}
                {patient.occupation}
              </p>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex shrink-0 flex-wrap gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-dash-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-dash-primary-dark"
            >
              <Edit3 className="h-4 w-4" />
              Edit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-dash-border bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
            >
              <CalendarCheck className="h-4 w-4" />
              Appointments
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-dash-border bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
            >
              <FileText className="h-4 w-4" />
              Records
            </motion.button>
          </div>
        </div>

        {/* Bottom: Key info badges */}
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <StatBadge
            icon={Calendar}
            label="DOB"
            value={formatDate(patient.dateOfBirth)}
          />
          <StatBadge icon={User} label="Gender" value={patient.gender} />
          <StatBadge
            icon={Shield}
            label="Blood Group"
            value={patient.bloodGroup}
          />
          <StatBadge
            icon={Stethoscope}
            label="Doctor"
            value={patient.assignedDoctor.name}
          />
          <StatBadge
            icon={Building2}
            label="Department"
            value={patient.department}
          />
          <StatBadge
            icon={CreditCard}
            label="Insurance"
            value={patient.insuranceProvider}
          />
          <StatBadge icon={Phone} label="Phone" value={patient.phone} />
          <StatBadge icon={Mail} label="Email" value={patient.email} />
          <StatBadge
            icon={Heart}
            label="Marital"
            value={patient.maritalStatus}
          />
          <StatBadge
            icon={Globe}
            label="Nationality"
            value={patient.nationality}
          />
        </div>
      </div>
    </motion.div>
  );
}
