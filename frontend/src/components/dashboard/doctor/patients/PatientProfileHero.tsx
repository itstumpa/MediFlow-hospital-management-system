"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Calendar,
  Droplets,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { staggerItem } from "../MotionVariants";
import type { PatientProfile } from "./patient-profile-mock-data";

interface PatientProfileHeroProps {
  patient: PatientProfile;
}

export function PatientProfileHero({ patient }: PatientProfileHeroProps) {
  const hasAlerts = patient.medicalAlerts.length > 0;
  const severeAlert = patient.medicalAlerts.find(
    (a) => a.severity === "Severe" || a.severity === "High",
  );

  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-5",
        "dark:border-slate-700/40 dark:bg-slate-900/60",
      )}
    >
      {/* Decorative gradient bar */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 via-emerald-400 to-blue-400" />

      <div className="flex flex-col gap-5 sm:flex-row">
        {/* Avatar Section */}
        <div className="flex shrink-0 flex-col items-center gap-3 sm:items-start">
          <div
            className={cn(
              "flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl font-bold text-white shadow-lg",
              patient.avatarGradient,
            )}
          >
            {patient.initials}
          </div>

          {severeAlert && (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-medium text-rose-600 dark:bg-rose-950/30 dark:text-rose-400">
              <AlertTriangle className="h-3 w-3" />
              {severeAlert.label}
            </span>
          )}
        </div>

        {/* Info Grid */}
        <div className="flex-1 space-y-3">
          {/* Name + ID */}
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {patient.name}
              </h2>
              <p className="text-xs text-slate-400">{patient.patientId}</p>
            </div>

            {/* Medical Alert Badges */}
            {hasAlerts && (
              <div className="flex flex-wrap gap-1.5">
                {patient.medicalAlerts.map((alert, idx) => (
                  <span
                    key={idx}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                      alert.severity === "Severe" || alert.severity === "High"
                        ? "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400"
                        : "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
                    )}
                  >
                    <HeartPulse className="h-3 w-3" />
                    {alert.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Detail Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
            <HeroDetail
              icon={Calendar}
              label="Age"
              value={`${patient.age} years`}
            />
            <HeroDetail icon={User} label="Gender" value={patient.gender} />
            <HeroDetail
              icon={Droplets}
              label="Blood Group"
              value={patient.bloodGroup}
            />
            <HeroDetail icon={Phone} label="Phone" value={patient.phone} />
            <HeroDetail
              icon={Mail}
              label="Email"
              value={patient.email}
              className="col-span-2"
            />
            <HeroDetail icon={MapPin} label="Address" value={patient.address} />
            <HeroDetail
              icon={Shield}
              label="Insurance"
              value={patient.insurance}
            />
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="mt-4 flex items-center gap-3 rounded-lg border border-rose-100 bg-rose-50/50 px-3 py-2.5 dark:border-rose-950/30 dark:bg-rose-950/10">
        <Phone className="h-4 w-4 shrink-0 text-rose-400" />
        <p className="text-xs text-slate-600 dark:text-slate-400">
          <span className="font-medium text-slate-800 dark:text-slate-200">
            Emergency Contact:
          </span>{" "}
          {patient.emergencyContact.name} ({patient.emergencyContact.relation})
          — {patient.emergencyContact.phone}
        </p>
      </div>
    </motion.div>
  );
}

function HeroDetail({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
      <div className="min-w-0">
        <p className="text-[10px] text-slate-400">{label}</p>
        <p className="truncate text-xs font-medium text-slate-700 dark:text-slate-300">
          {value}
        </p>
      </div>
    </div>
  );
}
