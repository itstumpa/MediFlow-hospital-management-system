"use client";

import { motion } from "framer-motion";
import {
  UserPlus,
  CalendarCheck,
  Pill,
  FlaskRoundIcon as Flask,
  CreditCard,
  FileText,
  Activity as ActivityIcon,
} from "lucide-react";
import type { Activity } from "@/lib/data/patient-detail";
import { staggerContainer, staggerItem } from "@/app/components/dashboard/MotionVariants";
import { EmptyState } from "@/app/components/ui/EmptyState";
import { cn } from "@/lib/utils";

interface ActivityTabProps {
  activities: Activity[];
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const d = new Date(dateStr);
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay === 1) return "Yesterday";
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)}w ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const activityConfig = {
  registration: {
    icon: UserPlus,
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  appointment: {
    icon: CalendarCheck,
    color: "text-violet-600",
    bg: "bg-violet-100 dark:bg-violet-900/30",
  },
  prescription: {
    icon: Pill,
    color: "text-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  report: {
    icon: Flask,
    color: "text-amber-600",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
  payment: {
    icon: CreditCard,
    color: "text-cyan-600",
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
  },
  record: {
    icon: FileText,
    color: "text-rose-600",
    bg: "bg-rose-100 dark:bg-rose-900/30",
  },
  visit: {
    icon: ActivityIcon,
    color: "text-indigo-600",
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
  },
};

export function ActivityTab({ activities }: ActivityTabProps) {
  if (activities.length === 0) {
    return (
      <EmptyState
        icon={ActivityIcon}
        title="No Activity"
        description="No activity recorded for this patient."
      />
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[23px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-dash-primary via-dash-border to-dash-border dark:via-slate-700 dark:to-slate-700" />

        <div className="space-y-4">
          {activities.map((activity, i) => {
            const config = activityConfig[activity.type];
            return (
              <motion.div
                key={activity.id}
                variants={staggerItem}
                className="relative pl-14"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.05 * i,
                  }}
                  className={cn(
                    "absolute left-0 top-0.5 flex h-[46px] w-[46px] items-center justify-center rounded-xl",
                    config.bg,
                  )}
                >
                  <config.icon className={cn("h-5 w-5", config.color)} />
                </motion.div>

                {/* Content */}
                <div className="dash-card px-4 py-3.5">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {activity.description}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>{timeAgo(activity.date)}</span>
                    <span className="text-slate-300 dark:text-slate-600">
                      &middot;
                    </span>
                    <span>by {activity.user}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
