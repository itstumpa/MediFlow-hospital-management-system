"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  FileText,
  Stethoscope,
  UserPlus,
} from "lucide-react";

interface Activity {
  icon: typeof UserPlus;
  color: string;
  title: string;
  description: string;
  time: string;
}

const activities: Activity[] = [
  {
    icon: Stethoscope,
    color: "bg-blue-500",
    title: "New Doctor Added",
    description: "Dr. Emily Watson joined Cardiology department",
    time: "10 min ago",
  },
  {
    icon: CalendarCheck,
    color: "bg-emerald-500",
    title: "Appointment Booked",
    description: "Sarah Chen scheduled with Dr. Johnson at 2:00 PM",
    time: "25 min ago",
  },
  {
    icon: FileText,
    color: "bg-violet-500",
    title: "Article Published",
    description: "Understanding Heart Health: A Comprehensive Guide",
    time: "1 hour ago",
  },
  {
    icon: Building2,
    color: "bg-amber-500",
    title: "Department Updated",
    description: "Pediatrics wing renovation completed successfully",
    time: "3 hours ago",
  },
  {
    icon: UserPlus,
    color: "bg-rose-500",
    title: "Patient Registered",
    description: "James Wilson completed registration for general checkup",
    time: "5 hours ago",
  },
];

const iconMap: Record<string, typeof UserPlus> = {
  UserPlus,
  CalendarCheck,
  FileText,
  Building2,
  Stethoscope,
};

export function ActivityTimeline() {
  return (
    <div className="dash-card overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-800/60">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
          Recent Activity
        </h2>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          Latest system updates
        </p>
      </div>

      {/* Timeline */}
      <div className="relative px-5 py-4">
        {/* Vertical line */}
        <div
          className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-slate-100 dark:bg-slate-800"
          aria-hidden="true"
        />

        <div className="space-y-0">
          {activities.map((activity, i) => {
            const Icon =
              iconMap[activity.icon.name as keyof typeof iconMap] ||
              activity.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.35,
                  delay: i * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="relative flex gap-4 pb-6 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex shrink-0">
                  <span
                    className={`flex h-[14px] w-[14px] items-center justify-center rounded-full ${activity.color} ring-4 ring-white dark:ring-slate-900`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {activity.title}
                    </p>
                    <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
                      {activity.time}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {activity.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 px-5 py-3 dark:border-slate-800/60">
        <button className="group flex w-full items-center justify-center gap-1 text-xs font-medium text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
          View all activity
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
