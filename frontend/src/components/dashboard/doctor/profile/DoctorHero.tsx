"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Award, BadgeCheck, MapPin, Star, Users } from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { DoctorProfile } from "./doctor-profile-mock-data";

interface DoctorHeroProps {
  profile: DoctorProfile;
}

export function DoctorHero({ profile }: DoctorHeroProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={cn(
        "relative overflow-hidden rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-slate-50",
        "dark:border-slate-700/40 dark:from-slate-900/80 dark:to-slate-900/40",
      )}
    >
      {/* Decorative gradient blob */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-dash-primary-light/40 to-dash-primary-dark/20 blur-3xl dark:from-dash-primary-light/20 dark:to-dash-primary-dark/10" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-gradient-to-tr from-emerald-100/30 to-dash-primary-light/20 blur-3xl dark:from-emerald-900/15 dark:to-dash-primary-light/10" />

      <div className="relative flex flex-col gap-6 p-5 sm:flex-row sm:items-start sm:p-6">
        {/* Photo */}
        <motion.div
          variants={staggerItem}
          className="relative shrink-0"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
        >
          <div
            className={cn(
              "flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-dash-primary to-dash-primary-dark text-4xl font-bold text-white shadow-lg",
              "ring-4 ring-white dark:ring-slate-800",
            )}
          >
            {profile.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          {profile.isVerified && (
            <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md dark:bg-slate-800">
              <BadgeCheck className="h-5 w-5 text-dash-primary" />
            </div>
          )}
        </motion.div>

        {/* Info */}
        <motion.div variants={staggerItem} className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              {profile.fullName}
            </h1>
            {profile.isVerified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-dash-primary-light px-2.5 py-0.5 text-[10px] font-medium text-dash-primary dark:bg-dash-primary-light dark:text-accent">
                <BadgeCheck className="h-3 w-3" />
                Verified
              </span>
            )}
          </div>

          <p className="mt-1 text-sm font-medium text-dash-primary dark:text-accent">
            {profile.designation}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Award className="h-3.5 w-3.5" />
              {profile.specialization}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {profile.hospital}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {profile.rating}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {profile.patientsServed.toLocaleString()}+ patients
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {profile.yearsOfExperience} years exp.
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                ${profile.consultationFee}
              </span>
              <span className="text-xs text-slate-400">/ consultation</span>
            </div>
          </div>

          {/* License */}
          <p className="mt-2 text-[10px] text-slate-400">
            License: {profile.licenseNumber} · NPI: {profile.npiNumber}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
