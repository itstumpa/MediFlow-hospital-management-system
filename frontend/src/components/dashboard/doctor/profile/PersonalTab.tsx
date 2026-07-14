"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Text, User } from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { DoctorProfile } from "./doctor-profile-mock-data";

interface PersonalTabProps {
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
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-dash-primary-light dark:bg-dash-primary-light">
          <Icon className="h-4 w-4 text-dash-primary" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

export function PersonalTab({ profile }: PersonalTabProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Photo Upload */}
      <motion.div variants={staggerItem}>
        <SectionCard icon={User} label="Profile Photo">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-dash-primary to-dash-primary-dark text-3xl font-bold text-white shadow-md",
                "ring-2 ring-white dark:ring-slate-800",
              )}
            >
              {profile.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div>
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all",
                  "hover:bg-slate-50 hover:border-slate-300",
                  "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700",
                )}
              >
                Upload Photo
              </button>
              <p className="mt-1 text-[10px] text-slate-400">
                JPG, PNG or GIF. Max 2MB.
              </p>
            </div>
          </div>
        </SectionCard>
      </motion.div>

      {/* Personal Details */}
      <motion.div variants={staggerItem}>
        <SectionCard icon={User} label="Personal Details">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelStyles}>Full Name</label>
              <input
                type="text"
                defaultValue={profile.fullName}
                className={fieldStyles}
              />
            </div>
            <div>
              <label className={labelStyles}>Gender</label>
              <select defaultValue={profile.gender} className={fieldStyles}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className={labelStyles}>Date of Birth</label>
              <input
                type="date"
                defaultValue={profile.dateOfBirth}
                className={fieldStyles}
              />
            </div>
            <div>
              <label className={labelStyles}>Phone</label>
              <input
                type="text"
                defaultValue={profile.phone}
                className={fieldStyles}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelStyles}>Email</label>
              <input
                type="email"
                defaultValue={profile.email}
                className={fieldStyles}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelStyles}>Address</label>
              <textarea
                rows={2}
                defaultValue={profile.address}
                className={cn(fieldStyles, "resize-none")}
              />
            </div>
          </div>
        </SectionCard>
      </motion.div>

      {/* Biography */}
      <motion.div variants={staggerItem}>
        <SectionCard icon={Text} label="Biography">
          <textarea
            rows={4}
            defaultValue={profile.biography}
            className={cn(fieldStyles, "resize-none")}
          />
        </SectionCard>
      </motion.div>
    </motion.div>
  );
}
