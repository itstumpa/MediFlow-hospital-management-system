"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  User as UserIcon,
  VenusAndMars,
} from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "../form-schema";

export function PersonalTab() {
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
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
            <UserIcon className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Personal Information
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Basic details and identification
            </p>
          </div>
        </div>
      </motion.div>

      {/* Row 1: Name */}
      <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-2">
        {field(
          "First Name",
          "firstName",
          <UserIcon className="h-4 w-4" />,
          "Enter first name",
        )}
        {field(
          "Last Name",
          "lastName",
          <UserIcon className="h-4 w-4" />,
          "Enter last name",
        )}
      </motion.div>

      {/* Row 2: Email + Phone */}
      <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-2">
        {field(
          "Email",
          "email",
          <Mail className="h-4 w-4" />,
          "Enter email address",
        )}
        {field(
          "Phone",
          "phone",
          <Phone className="h-4 w-4" />,
          "Enter phone number",
        )}
      </motion.div>

      {/* Row 3: DOB + Gender */}
      <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-2">
        {field(
          "Date of Birth",
          "dateOfBirth",
          <Calendar className="h-4 w-4" />,
          "YYYY-MM-DD",
        )}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <VenusAndMars className="h-4 w-4" />
            </div>
            <select
              {...register("gender")}
              className={`w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-8 text-sm text-slate-900 transition-all focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white ${inputGlow} ${
                errors.gender ? "border-red-400" : ""
              }`}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {errors.gender && (
            <p className="text-xs text-red-500">{errors.gender.message}</p>
          )}
        </div>
      </motion.div>

      {/* Row 4: Address */}
      <motion.div variants={staggerItem}>
        {field(
          "Address",
          "address",
          <MapPin className="h-4 w-4" />,
          "Enter street address",
        )}
      </motion.div>

      {/* Row 5: City + State + ZIP */}
      <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-3">
        {field("City", "city", <MapPin className="h-4 w-4" />, "City")}
        {field("State", "state", <MapPin className="h-4 w-4" />, "State")}
        {field(
          "ZIP Code",
          "zipCode",
          <MapPin className="h-4 w-4" />,
          "ZIP code",
        )}
      </motion.div>

      {/* Bio */}
      <motion.div variants={staggerItem} className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Bio
        </label>
        <textarea
          {...register("bio")}
          rows={3}
          placeholder="Short biography..."
          className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 ${inputGlow}`}
        />
      </motion.div>
    </motion.div>
  );
}
