"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { motion } from "framer-motion";
import {
  Baby,
  CalendarDays,
  Flag,
  Globe,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import type { PatientProfile } from "./types";

/* ─── Props ─── */

interface PersonalCardProps {
  profile: PatientProfile;
}

/* ─── Rows ─── */

interface InfoRowProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  delay?: number;
}

function InfoRow({ icon: Icon, label, value, delay = 0 }: InfoRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex items-center gap-4 rounded-xl bg-slate-50/80 p-4 transition-colors duration-200 hover:bg-slate-100/60 dark:bg-slate-800/30 dark:hover:bg-slate-700/40"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm ring-1 ring-slate-200/60 transition-colors duration-200 group-hover:text-[var(--color-primary)] dark:bg-slate-800 dark:text-slate-500 dark:ring-slate-700/50 dark:group-hover:text-[var(--color-primary)]">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm font-semibold text-slate-900 dark:text-white">
          {value}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Component ─── */

export function PersonalCard({ profile }: PersonalCardProps) {
  const rows = [
    { icon: User, label: "Full Name", value: profile.name },
    {
      icon: CalendarDays,
      label: "Date of Birth",
      value: `${profile.dob} (Age ${profile.age})`,
    },
    { icon: Baby, label: "Gender", value: profile.gender },
    { icon: Phone, label: "Phone", value: profile.phone },
    { icon: Mail, label: "Email", value: profile.email },
    { icon: MapPin, label: "Address", value: profile.address },
    { icon: Globe, label: "Nationality", value: profile.nationality },
    { icon: Flag, label: "Patient ID", value: profile.id },
  ];

  return (
    <motion.div variants={staggerItem} className="dash-card">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5 dark:border-slate-700/50">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
          <User className="h-4.5 w-4.5" />
        </span>
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            Personal Information
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Basic details and contact information
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-3 p-6 sm:grid-cols-2">
        {rows.map((row, i) => (
          <InfoRow key={row.label} {...row} delay={i * 0.04} />
        ))}
      </div>
    </motion.div>
  );
}
