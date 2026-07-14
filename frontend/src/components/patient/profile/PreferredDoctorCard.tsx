"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { motion } from "framer-motion";
import { MapPin, Star, Stethoscope } from "lucide-react";
import type { PatientProfile } from "./types";

/* ─── Props ─── */

interface PreferredDoctorCardProps {
  profile: PatientProfile;
}

/* ─── Component ─── */

export function PreferredDoctorCard({ profile }: PreferredDoctorCardProps) {
  const { preferredDoctor: doc } = profile;

  return (
    <motion.div variants={staggerItem} className="dash-card">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5 dark:border-slate-700/50">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-500 dark:bg-purple-950/40 dark:text-purple-400">
          <Star className="h-4.5 w-4.5" />
        </span>
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            Preferred Doctor
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Your primary care physician
          </p>
        </div>
      </div>

      <div className="p-6">
        <motion.div
          whileHover={{ y: -2 }}
          className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-purple-50/80 to-blue-50/80 p-5 transition-colors duration-200 dark:from-purple-950/20 dark:to-blue-950/20"
        >
          {/* Avatar */}
          <div
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${doc.avatarColor} text-xl font-bold text-white shadow-lg`}
          >
            {doc.avatarInitials}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {doc.name}
            </h4>
            <div className="mt-1.5 flex flex-col gap-1 text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Stethoscope className="h-3.5 w-3.5" />
                {doc.specialty}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {doc.hospital}
              </span>
            </div>
          </div>

          {/* Badge */}
          <span className="hidden shrink-0 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 sm:inline-block">
            Primary
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
