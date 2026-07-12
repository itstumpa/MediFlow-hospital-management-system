"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/app/components/dashboard/MotionVariants";
import { EmptyState } from "@/app/components/ui/EmptyState";
import type { Prescription } from "@/lib/data/patient-detail";
import { cn, formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar, Pill, RefreshCw, User } from "lucide-react";

interface PrescriptionsTabProps {
  prescriptions: Prescription[];
}

const statusConfig = {
  active: {
    label: "Active",
    class:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  completed: {
    label: "Completed",
    class: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  },
  discontinued: {
    label: "Discontinued",
    class: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
};

export function PrescriptionsTab({ prescriptions }: PrescriptionsTabProps) {
  if (prescriptions.length === 0) {
    return (
      <EmptyState
        icon={Pill}
        title="No Prescriptions"
        description="This patient has no prescription records."
      />
    );
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <div className="grid gap-4 sm:grid-cols-2">
        {prescriptions.map((rx, i) => {
          const status = statusConfig[rx.status];
          return (
            <motion.div
              key={rx.id}
              variants={staggerItem}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="dash-card overflow-hidden transition-shadow hover:shadow-md"
            >
              {/* Top accent */}
              <div
                className={cn(
                  "h-1",
                  rx.status === "active"
                    ? "bg-emerald-500"
                    : rx.status === "completed"
                      ? "bg-slate-400"
                      : "bg-red-400",
                )}
              />

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-dash-primary/10">
                      <Pill className="h-5 w-5 text-dash-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {rx.medicine}
                      </h4>
                      <p className="text-xs text-dash-primary font-medium">
                        {rx.dosage}
                      </p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                      status.class,
                    )}
                  >
                    {status.label}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span className="font-medium">{rx.frequency}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Duration: {rx.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <User className="h-3.5 w-3.5" />
                    <span>By {rx.prescribedBy}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>
                      {rx.refills} refill{rx.refills !== 1 ? "s" : ""} remaining
                    </span>
                  </div>
                </div>

                <div className="mt-3 border-t border-dash-border pt-3 dark:border-slate-700">
                  <p className="text-[11px] text-slate-400">
                    Prescribed {formatDate(rx.date)}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
