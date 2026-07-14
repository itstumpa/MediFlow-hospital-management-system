"use client";

import { motion } from "framer-motion";
import {
  Bell,
  CalendarCheck,
  ExternalLink,
  Eye,
  FileText,
  Settings,
  User,
  type LucideIcon,
} from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { DoctorProfile } from "./doctor-profile-mock-data";
import { ProfileCompletion } from "./ProfileCompletion";

interface ProfileSidebarProps {
  profile: DoctorProfile;
}

const quickLinks: { icon: LucideIcon; label: string; href: string }[] = [
  { icon: CalendarCheck, label: "View Schedule", href: "/doctor/schedule" },
  { icon: FileText, label: "My Prescriptions", href: "/doctor/prescriptions" },
  { icon: User, label: "Patient List", href: "/doctor/patients" },
  { icon: Eye, label: "Public Profile", href: "#" },
  { icon: Settings, label: "Settings", href: "/doctor/settings" },
];

export function ProfileSidebar({ profile }: ProfileSidebarProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Profile Completion */}
      <motion.div variants={staggerItem}>
        <ProfileCompletion profile={profile} />
      </motion.div>

      {/* Quick Links */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200/60 bg-white dark:border-slate-700/40 dark:bg-slate-900/60"
      >
        <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Quick Links
          </h3>
        </div>
        <div className="space-y-0.5 p-2">
          {quickLinks.map((link) => (
            <motion.a
              key={link.href}
              variants={staggerItem}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.98 }}
              href={link.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50"
            >
              <link.icon className="h-4 w-4 text-slate-400" />
              {link.label}
              <ExternalLink className="ml-auto h-3 w-3 text-slate-300" />
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Upcoming Schedule Preview */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200/60 bg-white dark:border-slate-700/40 dark:bg-slate-900/60"
      >
        <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
            <CalendarCheck className="h-4 w-4 text-slate-400" />
            Today's Schedule
          </h3>
        </div>
        <div className="p-4 text-center">
          <p className="text-xs text-slate-400">No appointments today</p>
          <a
            href="/doctor/schedule"
            className="mt-2 inline-block text-[10px] font-medium text-dash-primary hover:text-dash-primary-dark"
          >
            View full schedule →
          </a>
        </div>
      </motion.div>

      {/* Recent Notifications */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200/60 bg-white dark:border-slate-700/40 dark:bg-slate-900/60"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
            <Bell className="h-4 w-4 text-slate-400" />
            Notifications
          </h3>
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-rose-100 text-[9px] font-bold text-rose-600 dark:bg-rose-950/30 dark:text-rose-400">
            3
          </span>
        </div>
        <div className="space-y-2 p-3">
          {[
            {
              label: "Appointment reminder: Sarah Johnson at 3:00 PM",
              time: "1h ago",
            },
            { label: "Lab results ready for patient #P-0421", time: "3h ago" },
            {
              label: "New message from Dr. Chen regarding referral",
              time: "5h ago",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="flex items-start gap-2"
            >
              <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-dash-primary" />
              <div className="min-w-0">
                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2">
                  {item.label}
                </p>
                <p className="text-[9px] text-slate-400">{item.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
