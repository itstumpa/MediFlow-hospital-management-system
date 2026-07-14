"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { motion } from "framer-motion";
import { DoctorPreview } from "./DoctorPreview";

export function Sidebar() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Preview Card */}
      <motion.div variants={staggerItem}>
        <DoctorPreview />
      </motion.div>

      {/* Quick Tips */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          Quick Tips
        </h3>
        <ul className="mt-3 space-y-2">
          {[
            "Upload a professional photo for the profile",
            "Fill in all required fields marked with *",
            "Add at least one education entry",
            "Select languages the doctor speaks",
            "Set regular availability hours",
          ].map((tip, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400"
            >
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-dash-primary-light text-[10px] font-bold text-dash-primary dark:bg-teal-500/20 dark:text-accent">
                {i + 1}
              </span>
              {tip}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Form Progress */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          Form Sections
        </h3>
        <div className="mt-3 space-y-2">
          {[
            "Personal Information",
            "Professional Information",
            "Education",
            "Certifications",
            "Languages",
            "Biography",
            "Clinic Information",
            "Availability",
          ].map((section, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-dash-primary" />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {section}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
