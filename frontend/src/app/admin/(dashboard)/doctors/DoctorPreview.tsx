"use client";

import { motion } from "framer-motion";
import { Star, MapPin, Briefcase, BadgeCheck, Clock, User } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { DoctorFormValues } from "./form-schema";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500",
  Inactive: "bg-slate-400",
  "On Leave": "bg-amber-400",
  Vacation: "bg-violet-400",
  "Emergency Duty": "bg-rose-500",
};

const avatarColors = [
  "bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500",
  "bg-rose-500", "bg-cyan-500", "bg-orange-500", "bg-indigo-500",
];

export function DoctorPreview() {
  const { watch } = useFormContext<DoctorFormValues>();

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const photo = watch("photo");
  const department = watch("department");
  const specialization = watch("specialization");
  const status = watch("status");
  const yearsOfExperience = watch("yearsOfExperience");
  const languages = watch("languages");
  const consultationFee = watch("consultationFee");

  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Doctor Name";
  const initials = `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase() || "DR";
  const colorIdx = (firstName?.length || 0) % avatarColors.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
    >
      {/* Preview Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3">
        <p className="text-xs font-medium text-blue-100">Preview</p>
        <p className="text-sm font-semibold text-white">Doctor Profile</p>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <motion.div
            className={cn(
              "relative flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg",
              avatarColors[colorIdx]
            )}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {photo ? (
              <img
                src={photo}
                alt={fullName}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <>
                {initials || <User className="h-8 w-8" />}
                <BadgeCheck className="absolute -bottom-1 -right-1 h-5 w-5 fill-blue-500 text-white drop-shadow-sm" />
              </>
            )}
          </motion.div>

          {/* Name */}
          <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
            {fullName}
          </h3>

          {/* Department & Specialization */}
          {department && (
            <p className="mt-0.5 text-sm font-medium text-blue-600 dark:text-blue-400">
              {department}
            </p>
          )}
          {specialization && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {specialization}
            </p>
          )}

          {/* Status Badge */}
          <div className="mt-3 flex items-center gap-3">
            {status && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    statusColors[status] || "bg-slate-400"
                  )}
                />
                {status}
              </span>
            )}
            {yearsOfExperience > 0 && (
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <Briefcase className="h-3 w-3" />
                {yearsOfExperience} yrs
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "h-3.5 w-3.5",
                  star <= 4
                    ? "fill-amber-400 text-amber-400"
                    : "fill-slate-200 text-slate-200 dark:fill-slate-600 dark:text-slate-600"
                )}
              />
            ))}
            <span className="ml-1 text-xs font-medium text-slate-500 dark:text-slate-400">
              4.0
            </span>
          </div>

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className="mt-3 flex flex-wrap justify-center gap-1">
              {languages.slice(0, 3).map((lang) => (
                <span
                  key={lang}
                  className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                >
                  {lang}
                </span>
              ))}
              {languages.length > 3 && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                  +{languages.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Fee */}
          {consultationFee > 0 && (
            <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-slate-900 dark:text-white">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              ${consultationFee} / visit
            </div>
          )}
        </div>

        {/* Preview Actions */}
        <div className="mt-4 space-y-2">
          <motion.button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Clock className="h-3.5 w-3.5" />
            View Public Profile
          </motion.button>
          <motion.button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Book Appointment (UI)
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
