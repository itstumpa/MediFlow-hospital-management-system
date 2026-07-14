"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/doctor/MotionVariants";
import { PageHeader } from "@/components/dashboard/doctor/PageHeader";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Bell,
  ChevronRight,
  FileText,
  Lock,
  Settings,
  Shield,
  Sliders,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

interface SettingsCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

function SettingsCard({
  icon: Icon,
  title,
  description,
  href,
}: SettingsCardProps) {
  return (
    <motion.div variants={staggerItem}>
      <Link
        href={href}
        className={cn(
          "group flex items-center gap-4 rounded-xl border border-slate-200/60 bg-white p-5 transition-all",
          "hover:border-dash-primary/30 hover:shadow-md hover:shadow-dash-primary/5",
          "dark:border-slate-700/40 dark:bg-slate-900/60",
          "dark:hover:border-dash-primary/40 dark:hover:shadow-dash-primary/10",
        )}
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-dash-primary-light dark:bg-dash-primary-light/20">
          <Icon className="h-6 w-6 text-dash-primary dark:text-accent" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            {title}
          </h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
        <ChevronRight className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-dash-primary dark:text-slate-600" />
      </Link>
    </motion.div>
  );
}

export default function DoctorSettingsPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Page Header */}
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Settings"
          subtitle="Manage your account, preferences, and security settings."
        />
      </motion.div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SettingsCard
          icon={Stethoscope}
          title="Profile Settings"
          description="Update your personal info, consultation fees, notifications, and account preferences."
          href="/doctor/profile"
        />
        <SettingsCard
          icon={Shield}
          title="Security & Privacy"
          description="Manage your password, two-factor authentication, active sessions, and privacy controls."
          href="/doctor/settings/security"
        />
        <SettingsCard
          icon={Bell}
          title="Notification Preferences"
          description="Configure how you receive alerts for appointments, prescriptions, and system updates."
          href="/doctor/profile"
        />
        <SettingsCard
          icon={Sliders}
          title="Consultation Settings"
          description="Set your consultation fee, session duration, buffer time, and availability preferences."
          href="/doctor/profile"
        />
      </div>

      {/* Quick Links */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200/60 bg-white p-5 dark:border-slate-700/40 dark:bg-slate-900/60"
      >
        <h3 className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
          Quick Links
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            {
              label: "Account Settings",
              href: "/doctor/profile",
              icon: Settings,
            },
            {
              label: "Security & Privacy",
              href: "/doctor/settings/security",
              icon: Lock,
            },
            {
              label: "Prescriptions",
              href: "/doctor/prescriptions",
              icon: FileText,
            },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all",
                "hover:border-dash-primary/30 hover:text-dash-primary",
                "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
                "dark:hover:border-dash-primary/40 dark:hover:text-accent",
              )}
            >
              <link.icon className="h-3.5 w-3.5" />
              {link.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
