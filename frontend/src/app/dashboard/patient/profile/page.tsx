"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/patient/MotionVariants";
import { PageHeader } from "@/components/patient/PageHeader";
import { motion } from "framer-motion";
import {
  CalendarDays,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

const profileInfo = [
  { label: "Full Name", value: "John Doe", icon: User },
  { label: "Email", value: "john.doe@example.com", icon: Mail },
  { label: "Phone", value: "+1 (555) 123-4567", icon: Phone },
  { label: "Date of Birth", value: "March 15, 1988", icon: CalendarDays },
  { label: "Blood Type", value: "A+", icon: HeartPulse },
  {
    label: "Address",
    value: "123 Health St, Medical City, MC 12345",
    icon: MapPin,
  },
];

export default function ProfilePage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <PageHeader
        title="My Profile"
        subtitle="Manage your personal information"
      />

      {/* Profile header card */}
      <motion.div
        variants={staggerItem}
        className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60"
      >
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-2xl font-bold text-white shadow-lg shadow-emerald-200/50 dark:shadow-emerald-900/30">
            JD
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              John Doe
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Patient ID: P-2024-00142
            </p>
            <span className="mt-1.5 inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
              Gold Member
            </span>
          </div>
          <div className="sm:ml-auto">
            <button className="rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[var(--color-primary-dark)]">
              Edit Profile
            </button>
          </div>
        </div>
      </motion.div>

      {/* Personal details */}
      <motion.div
        variants={staggerItem}
        className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Personal Information
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {profileInfo.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/40"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm dark:bg-slate-700 dark:text-slate-400">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
