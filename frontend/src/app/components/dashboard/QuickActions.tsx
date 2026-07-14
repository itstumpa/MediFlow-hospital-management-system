"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarCheck,
  FileText,
  Stethoscope,
  UserPlus,
} from "lucide-react";
import { staggerContainer, staggerItem } from "./MotionVariants";

interface QuickAction {
  icon: typeof Stethoscope;
  label: string;
  description: string;
  href: string;
  colorClass: string;
}

const actions: QuickAction[] = [
  {
    icon: Stethoscope,
    label: "Add Doctor",
    description: "Onboard a new physician",
    href: "/dashboard/admin/doctors",
    colorClass:
      "bg-dash-primary-light text-dash-primary dark:bg-teal-950/30 dark:text-accent",
  },
  {
    icon: UserPlus,
    label: "New Patient",
    description: "Register a patient",
    href: "/dashboard/admin/patients",
    colorClass:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
  },
  {
    icon: FileText,
    label: "Create Article",
    description: "Write a health article",
    href: "/dashboard/admin/articles",
    colorClass:
      "bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400",
  },
  {
    icon: BarChart3,
    label: "View Reports",
    description: "Analytics & insights",
    href: "/dashboard/admin/analytics",
    colorClass:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
  },
  {
    icon: Building2,
    label: "Manage Departments",
    description: "Organize departments",
    href: "/dashboard/admin/departments",
    colorClass:
      "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400",
  },
  {
    icon: CalendarCheck,
    label: "Appointments",
    description: "Schedule management",
    href: "/dashboard/admin/appointments",
    colorClass:
      "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-400",
  },
];

export function QuickActions() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="dash-card overflow-hidden"
    >
      {/* Header */}
      <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-800/60">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
          Quick Actions
        </h2>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          Frequently used operations
        </p>
      </div>

      {/* Action cards */}
      <div className="grid grid-cols-2 gap-3 p-5">
        {actions.map((action, i) => (
          <motion.a
            key={action.label}
            variants={staggerItem}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            href={action.href}
            className="group relative overflow-hidden rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:border-slate-200 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-800/30 dark:hover:border-slate-700 dark:hover:bg-slate-800"
          >
            <div className="flex items-start justify-between">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.colorClass}`}
              >
                <action.icon className="h-5 w-5" />
              </span>
              <ArrowRight className="h-4 w-4 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-slate-500 dark:text-slate-600 dark:group-hover:text-slate-400" />
            </div>
            <p className="mt-3 text-sm font-medium text-slate-900 dark:text-white">
              {action.label}
            </p>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {action.description}
            </p>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
