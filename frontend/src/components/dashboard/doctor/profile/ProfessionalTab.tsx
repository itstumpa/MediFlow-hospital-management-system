"use client";

import { motion } from "framer-motion";
import { Award, Layers, Star } from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { DoctorProfile } from "./doctor-profile-mock-data";

interface ProfessionalTabProps {
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
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/30">
          <Icon className="h-4 w-4 text-indigo-500" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

export function ProfessionalTab({ profile }: ProfessionalTabProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Licensing */}
      <motion.div variants={staggerItem}>
        <SectionCard icon={Award} label="Licensing & Registration">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelStyles}>Medical License Number</label>
              <input
                type="text"
                defaultValue={profile.licenseNumber}
                className={fieldStyles}
              />
            </div>
            <div>
              <label className={labelStyles}>NPI / Registration Number</label>
              <input
                type="text"
                defaultValue={profile.npiNumber}
                className={fieldStyles}
              />
            </div>
          </div>
        </SectionCard>
      </motion.div>

      {/* Specialization */}
      <motion.div variants={staggerItem}>
        <SectionCard icon={Layers} label="Specialization">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelStyles}>Specialization</label>
              <input
                type="text"
                defaultValue={profile.specialization}
                className={fieldStyles}
              />
            </div>
            <div>
              <label className={labelStyles}>Sub-specialization</label>
              <input
                type="text"
                defaultValue={profile.subSpecialization}
                className={fieldStyles}
              />
            </div>
          </div>
        </SectionCard>
      </motion.div>

      {/* Experience & Memberships */}
      <motion.div variants={staggerItem}>
        <SectionCard icon={Star} label="Experience & Memberships">
          <div className="space-y-4">
            <div>
              <label className={labelStyles}>Years of Experience</label>
              <input
                type="number"
                defaultValue={profile.yearsOfExperience}
                className={fieldStyles}
              />
            </div>
            <div>
              <label className={labelStyles}>Professional Memberships</label>
              <div className="space-y-2">
                {profile.professionalMemberships.map((membership, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      defaultValue={membership}
                      className={fieldStyles}
                    />
                    {i === profile.professionalMemberships.length - 1 && (
                      <button
                        type="button"
                        className="rounded-lg border border-dashed border-slate-200 px-2.5 py-2.5 text-xs text-slate-400 hover:border-slate-300 hover:text-slate-600 dark:border-slate-700 dark:hover:border-slate-600"
                      >
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>
      </motion.div>
    </motion.div>
  );
}
