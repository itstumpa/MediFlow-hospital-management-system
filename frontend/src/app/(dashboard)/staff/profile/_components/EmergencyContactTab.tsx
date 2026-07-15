"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { Heart, MapPin, Phone, User as UserIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "../form-schema";

export function EmergencyContactTab() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  const inputGlow =
    "transition-all duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)]";

  const field = (
    label: string,
    name: keyof ProfileFormValues,
    icon: React.ReactNode,
    placeholder: string,
  ) => (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          {icon}
        </div>
        <input
          {...register(name)}
          placeholder={placeholder}
          className={`w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 ${inputGlow} ${
            errors[name]
              ? "border-red-400 focus:border-red-400 focus:ring-red-500/20"
              : ""
          }`}
        />
      </div>
      {errors[name] && (
        <p className="text-xs text-red-500">{errors[name]?.message}</p>
      )}
    </div>
  );

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Section Header */}
      <motion.div variants={staggerItem}>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
            <Heart className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Emergency Contact
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Who to contact in case of an emergency
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-2">
        {field(
          "Full Name",
          "emergencyName",
          <UserIcon className="h-4 w-4" />,
          "Contact name",
        )}
        {field(
          "Relationship",
          "emergencyRelationship",
          <Heart className="h-4 w-4" />,
          "Spouse, parent, etc.",
        )}
      </motion.div>

      <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-2">
        {field(
          "Phone Number",
          "emergencyPhone",
          <Phone className="h-4 w-4" />,
          "+1 (555) 987-6543",
        )}
        {field(
          "Address",
          "emergencyAddress",
          <MapPin className="h-4 w-4" />,
          "Street, city, ZIP",
        )}
      </motion.div>

      <motion.div variants={staggerItem}>
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/30 dark:bg-rose-950/20">
          <p className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400">
            <Heart className="h-3.5 w-3.5" />
            Keep your emergency contact information up to date. This information
            is only accessible to HR and authorized personnel.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
