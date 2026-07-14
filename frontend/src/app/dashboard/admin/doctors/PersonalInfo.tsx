"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { motion } from "framer-motion";
import { Calendar, Droplets, Globe, User as UserIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { UploadPhoto } from "./UploadPhoto";
import { bloodGroups, nationalities } from "./form-mock";
import type { DoctorFormValues } from "./form-schema";

export function PersonalInfo() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<DoctorFormValues>();

  const photo = watch("photo");

  const inputGlow =
    "transition-all duration-200 focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary focus:shadow-[0_0_0_4px_rgba(14,124,123,0.1)]";

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
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-dash-primary-light text-dash-primary dark:bg-teal-500/20 dark:text-accent">
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

      {/* Photo Upload */}
      <motion.div variants={staggerItem}>
        <UploadPhoto
          value={photo || ""}
          onChange={(val) => setValue("photo", val)}
        />
      </motion.div>

      {/* Name Row */}
      <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("firstName")}
            placeholder="Enter first name"
            className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 ${inputGlow} ${
              errors.firstName
                ? "border-red-400 focus:border-red-400 focus:ring-red-500/20"
                : ""
            }`}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
          {errors.firstName && (
            <p id="firstName-error" className="text-xs text-red-500">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("lastName")}
            placeholder="Enter last name"
            className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 ${inputGlow} ${
              errors.lastName
                ? "border-red-400 focus:border-red-400 focus:ring-red-500/20"
                : ""
            }`}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
          {errors.lastName && (
            <p id="lastName-error" className="text-xs text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </motion.div>

      {/* Contact Row */}
      <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="doctor@hospital.com"
            className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 ${inputGlow} ${
              errors.email
                ? "border-red-400 focus:border-red-400 focus:ring-red-500/20"
                : ""
            }`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+1 (555) 000-0000"
            className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 ${inputGlow} ${
              errors.phone
                ? "border-red-400 focus:border-red-400 focus:ring-red-500/20"
                : ""
            }`}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="text-xs text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>
      </motion.div>

      {/* Gender, DOB, Blood Group, Nationality */}
      <motion.div
        variants={staggerItem}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            {...register("gender")}
            className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary dark:border-slate-600 dark:bg-slate-800 dark:text-white ${inputGlow} ${
              errors.gender ? "border-red-400" : ""
            }`}
            aria-invalid={!!errors.gender}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-xs text-red-500">{errors.gender.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              {...register("dateOfBirth")}
              type="date"
              className={`w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-sm text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary dark:border-slate-600 dark:bg-slate-800 dark:text-white ${inputGlow} ${
                errors.dateOfBirth ? "border-red-400" : ""
              }`}
              aria-invalid={!!errors.dateOfBirth}
            />
          </div>
          {errors.dateOfBirth && (
            <p className="text-xs text-red-500">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Blood Group <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Droplets className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              {...register("bloodGroup")}
              className={`w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-sm text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary dark:border-slate-600 dark:bg-slate-800 dark:text-white ${inputGlow} ${
                errors.bloodGroup ? "border-red-400" : ""
              }`}
              aria-invalid={!!errors.bloodGroup}
            >
              <option value="">Select</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>
          {errors.bloodGroup && (
            <p className="text-xs text-red-500">{errors.bloodGroup.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Nationality <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              {...register("nationality")}
              className={`w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-sm text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary dark:border-slate-600 dark:bg-slate-800 dark:text-white ${inputGlow} ${
                errors.nationality ? "border-red-400" : ""
              }`}
              aria-invalid={!!errors.nationality}
            >
              <option value="">Select</option>
              {nationalities.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          {errors.nationality && (
            <p className="text-xs text-red-500">{errors.nationality.message}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
