"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Briefcase,
  Building2,
  Calendar,
  Clock,
  MapPin,
  UserSquare2,
} from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "../form-schema";

export function EmploymentTab() {
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

  const selectField = (
    label: string,
    name: keyof ProfileFormValues,
    options: { value: string; label: string }[],
  ) => (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        {...register(name)}
        className={`w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-8 text-sm text-slate-900 transition-all focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white ${inputGlow} ${
          errors[name] ? "border-red-400" : ""
        }`}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
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
            <Briefcase className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Employment Details
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Work information and role
            </p>
          </div>
        </div>
      </motion.div>

      {/* Row 1 */}
      <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-2">
        {field(
          "Employee ID",
          "employeeId",
          <BadgeCheck className="h-4 w-4" />,
          "EMP-2023-0042",
        )}
        {field(
          "Role / Title",
          "role",
          <UserSquare2 className="h-4 w-4" />,
          "Senior Receptionist",
        )}
      </motion.div>

      {/* Row 2 */}
      <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-2">
        {field(
          "Department",
          "department",
          <Building2 className="h-4 w-4" />,
          "Front Desk",
        )}
        {field(
          "Manager",
          "manager",
          <UserSquare2 className="h-4 w-4" />,
          "Dr. Sarah Chen",
        )}
      </motion.div>

      {/* Row 3 */}
      <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-2">
        {field(
          "Joining Date",
          "joiningDate",
          <Calendar className="h-4 w-4" />,
          "YYYY-MM-DD",
        )}
        {field(
          "Work Location",
          "workLocation",
          <MapPin className="h-4 w-4" />,
          "Main Campus",
        )}
      </motion.div>

      {/* Row 4 */}
      <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-2">
        {selectField("Shift", "shift", [
          { value: "morning", label: "Morning (7:00 AM – 3:00 PM)" },
          { value: "afternoon", label: "Afternoon (3:00 PM – 11:00 PM)" },
          { value: "night", label: "Night (11:00 PM – 7:00 AM)" },
          { value: "rotating", label: "Rotating" },
        ])}
        {selectField("Employment Status", "employmentStatus", [
          { value: "active", label: "Active" },
          { value: "on-leave", label: "On Leave" },
          { value: "resigned", label: "Resigned" },
          { value: "suspended", label: "Suspended" },
        ])}
      </motion.div>

      {/* Years of Service */}
      <motion.div variants={staggerItem}>
        <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
          <Clock className="h-5 w-5 text-slate-400" />
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Years of Service
            </p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              3 years
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
