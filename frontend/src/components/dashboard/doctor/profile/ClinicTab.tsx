"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Building, MapPin } from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { DoctorProfile } from "./doctor-profile-mock-data";

interface ClinicTabProps {
  profile: DoctorProfile;
}

const fieldStyles =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-dash-primary dark:focus:ring-dash-primary-light";

const labelStyles =
  "mb-1 block text-[10px] font-medium text-slate-500 dark:text-slate-400";

function SectionCard({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200/60 bg-white p-4 dark:border-slate-700/40 dark:bg-slate-900/60">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-950/30">
          <Icon className="h-4 w-4 text-rose-500" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

export function ClinicTab({ profile }: ClinicTabProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Clinic Details */}
      <motion.div variants={staggerItem}>
        <SectionCard icon={Building} label="Clinic Information">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelStyles}>Clinic Name</label>
              <input
                type="text"
                defaultValue={profile.clinicInfo.clinicName}
                className={fieldStyles}
                placeholder="e.g. MediFlow Cardiology Center"
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelStyles}>Address</label>
              <textarea
                rows={2}
                defaultValue={profile.clinicInfo.address}
                className={cn(fieldStyles, "resize-none")}
                placeholder="Full clinic address"
              />
            </div>
            <div>
              <label className={labelStyles}>Phone</label>
              <input
                type="text"
                defaultValue={profile.clinicInfo.phone}
                className={fieldStyles}
              />
            </div>
            <div>
              <label className={labelStyles}>Website</label>
              <input
                type="url"
                defaultValue={profile.clinicInfo.website}
                className={fieldStyles}
                placeholder="https://"
              />
            </div>
          </div>
        </SectionCard>
      </motion.div>

      {/* Map Placeholder */}
      <motion.div variants={staggerItem}>
        <div className="rounded-xl border border-slate-200/60 bg-white p-4 dark:border-slate-700/40 dark:bg-slate-900/60">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-950/30">
              <MapPin className="h-4 w-4 text-rose-500" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Location
            </span>
          </div>
          <div className="flex h-48 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
            <div className="text-center">
              <MapPin className="mx-auto mb-2 h-8 w-8 text-slate-300" />
              <p className="text-xs text-slate-400">Map placeholder</p>
              <p className="mt-1 text-[10px] text-slate-400">
                {profile.clinicInfo.address}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
