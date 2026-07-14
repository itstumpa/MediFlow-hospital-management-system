"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { motion } from "framer-motion";
import { Phone, Shield, User, Users } from "lucide-react";
import type { PatientProfile } from "./types";

/* ─── Props ─── */

interface EmergencyCardProps {
  profile: PatientProfile;
}

/* ─── Detail row ─── */

function DetailRow({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      className="flex items-center gap-3 rounded-xl bg-slate-50/80 p-4 transition-colors duration-200 hover:bg-slate-100/60 dark:bg-slate-800/30 dark:hover:bg-slate-700/40"
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white"
        style={{ backgroundColor: color }}
      >
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white">
          {value}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Emergency banner ─── */

function EmergencyBanner() {
  return (
    <div className="-mx-6 -mb-6 mt-6 flex items-center gap-2 bg-red-50/80 px-6 py-3 text-xs text-red-600 dark:bg-red-950/30 dark:text-red-400">
      <Shield className="h-3.5 w-3.5 shrink-0" />
      <span>
        This contact will be notified in case of a medical emergency. Keep this
        information up to date.
      </span>
    </div>
  );
}

/* ─── Component ─── */

export function EmergencyCard({ profile }: EmergencyCardProps) {
  const { emergencyContact: ec } = profile;

  return (
    <motion.div variants={staggerItem} className="dash-card">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5 dark:border-slate-700/50">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 dark:bg-red-950/40 dark:text-red-400">
          <Users className="h-4.5 w-4.5" />
        </span>
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            Emergency Contact
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Person to reach in case of emergency
          </p>
        </div>
      </div>

      <div className="grid gap-3 p-6 sm:grid-cols-3">
        <DetailRow icon={User} label="Name" value={ec.name} color="#ef4444" />
        <DetailRow
          icon={Users}
          label="Relationship"
          value={ec.relationship}
          color="#f59e0b"
        />
        <DetailRow
          icon={Phone}
          label="Phone"
          value={ec.phone}
          color="#3b82f6"
        />
      </div>

      <EmergencyBanner />
    </motion.div>
  );
}
