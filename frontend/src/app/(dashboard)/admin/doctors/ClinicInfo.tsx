"use client";

import { staggerItem } from "@/lib/animations/stagger";
import { motion } from "framer-motion";
import { AlertCircle, Building, DoorOpen, MapPin, Phone } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { floors, hospitals } from "./form-mock";
import type { DoctorFormValues } from "./form-schema";

const inputGlow =
  "transition-all duration-200 focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary focus:shadow-[0_0_0_4px_rgba(14,124,123,0.1)]";

export function ClinicInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<DoctorFormValues>();

  return (
    <motion.div variants={staggerItem} className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400">
          <Building className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Clinic Information
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Workspace location and contact details
          </p>
        </div>
      </div>

      {/* Hospital */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Hospital / Clinic <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <select
            {...register("hospital")}
            className={`w-full rounded-lg border bg-white pl-10 pr-3 py-2.5 text-sm text-slate-900 transition-all focus:outline-none ${inputGlow} dark:bg-slate-800 dark:text-white ${
              errors.hospital
                ? "border-red-400"
                : "border-slate-300 dark:border-slate-600"
            }`}
            aria-invalid={!!errors.hospital}
          >
            <option value="">Select hospital</option>
            {hospitals.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
        {errors.hospital && (
          <p className="text-xs text-red-500">{errors.hospital.message}</p>
        )}
      </div>

      {/* Floor & Room */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Floor
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              {...register("floor")}
              className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-sm text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            >
              <option value="">Select floor</option>
              {floors.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Room Number
          </label>
          <div className="relative">
            <DoorOpen className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              {...register("roomNumber")}
              placeholder="e.g. 301-A"
              className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
            />
          </div>
        </div>
      </div>

      {/* Office Phone & Emergency */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Office Phone
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              {...register("officePhone")}
              placeholder="+1 (555) 000-0000"
              className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Emergency Contact
          </label>
          <div className="relative">
            <AlertCircle className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              {...register("emergencyContact")}
              placeholder="+1 (555) 000-0000"
              className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
