"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Ambulance,
  Baby,
  BadgeCheck,
  Bone,
  Brain,
  Building2,
  Clock,
  Droplets,
  Eye,
  Heart,
  HeartPulse,
  MapPin,
  Microscope,
  Pill,
  Scan,
  Stethoscope,
  Syringe,
  Users,
  Wind,
} from "lucide-react";
import { useFormContext } from "react-hook-form";
import { departmentIconOptions } from "./form-mock";
import type { DepartmentFormValues } from "./form-schema";

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500",
  Inactive: "bg-slate-400",
  "Under Maintenance": "bg-amber-400",
  Closed: "bg-red-500",
};

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Brain,
  Baby,
  Bone,
  Droplets,
  Eye,
  Ambulance,
  HeartPulse,
  Wind,
  Stethoscope,
  Microscope,
  Syringe,
  Pill,
  Scan,
  Building2,
};

export function DepartmentPreview() {
  const { watch } = useFormContext<DepartmentFormValues>();

  const name = watch("name");
  const icon = watch("icon");
  const image = watch("image");
  const departmentHead = watch("departmentHead");
  const status = watch("status");
  const shortDescription = watch("shortDescription");
  const building = watch("building");
  const floor = watch("floor");
  const openingTime = watch("openingTime");
  const closingTime = watch("closingTime");
  const assignedDoctors = watch("assignedDoctors");

  const iconOption = departmentIconOptions.find((o) => o.value === icon);
  const IconComponent = icon ? iconMap[icon] || Building2 : Building2;
  const doctorCount = assignedDoctors?.length ?? 0;

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
        <p className="text-sm font-semibold text-white">Department Card</p>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Image */}
        {image && (
          <div className="mb-3 overflow-hidden rounded-lg">
            <motion.img
              src={image}
              alt={name || "Department"}
              className="h-32 w-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <motion.div
            className="relative flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg"
            style={{
              backgroundColor: iconOption?.color ?? "#64748b",
            }}
            whileHover={{ scale: 1.05, rotate: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <IconComponent className="h-7 w-7" />
            {status === "Active" && (
              <BadgeCheck className="absolute -bottom-1 -right-1 h-5 w-5 fill-emerald-500 text-white drop-shadow-sm" />
            )}
          </motion.div>

          {/* Name */}
          <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
            {name || "Department Name"}
          </h3>

          {/* Short Description */}
          {shortDescription && (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
              {shortDescription}
            </p>
          )}

          {/* Status Badge */}
          {status && (
            <div className="mt-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
                  status === "Active"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                    : status === "Inactive"
                      ? "bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-400"
                      : status === "Under Maintenance"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                        : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    statusColors[status] || "bg-slate-400",
                  )}
                />
                {status}
              </span>
            </div>
          )}

          {/* Divider */}
          <div className="my-3 w-full border-t border-slate-100 dark:border-slate-700" />

          {/* Details */}
          <div className="w-full space-y-2 text-left">
            {departmentHead && (
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Stethoscope className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                <span className="truncate">{departmentHead}</span>
              </div>
            )}

            {building && (
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="truncate">
                  {floor ? `${floor}, ` : ""}
                  {building}
                </span>
              </div>
            )}

            {openingTime && closingTime && (
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>
                  {openingTime} - {closingTime}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Users className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>
                {doctorCount} Doctor{doctorCount !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
