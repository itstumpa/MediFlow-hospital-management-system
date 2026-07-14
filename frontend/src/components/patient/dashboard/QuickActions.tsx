"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarPlus, Download, Heart, Phone, Pill } from "lucide-react";
import Link from "next/link";

interface Action {
  label: string;
  description: string;
  href: string;
  icon: React.ElementType;
  color: string;
}

const actions: Action[] = [
  {
    label: "Book Appointment",
    description: "Schedule your next visit",
    href: "/appointments/book",
    icon: CalendarPlus,
    color:
      "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  {
    label: "View Prescriptions",
    description: "Check your medications",
    href: "/prescriptions",
    icon: Pill,
    color:
      "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400",
  },
  {
    label: "Download Reports",
    description: "Access lab results",
    href: "/lab-reports",
    icon: Download,
    color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400",
  },
  {
    label: "Favorite Doctors",
    description: "View trusted providers",
    href: "/favorite-doctors",
    icon: Heart,
    color: "text-pink-600 bg-pink-50 dark:bg-pink-950/40 dark:text-pink-400",
  },
  {
    label: "Contact Clinic",
    description: "Get in touch with us",
    href: "/contact",
    icon: Phone,
    color:
      "text-purple-600 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-400",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60">
      <h2 className="text-base font-semibold text-slate-900 dark:text-white">
        Quick Actions
      </h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Commonly used tasks
      </p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      >
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <motion.div key={action.label} variants={itemVariants}>
              <Link
                href={action.href}
                className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 transition-all hover:border-slate-200 hover:bg-white hover:shadow-sm dark:border-slate-700/30 dark:bg-slate-800/40 dark:hover:border-slate-600/50 dark:hover:bg-slate-800/80"
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110",
                    action.color,
                  )}
                >
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {action.label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {action.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
