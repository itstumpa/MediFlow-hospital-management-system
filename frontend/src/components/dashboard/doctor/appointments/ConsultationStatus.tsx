"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";
import type { ConsultationStatus } from "./appointment-detail-mock-data";
import { consultationStatusStyleMap } from "./appointment-detail-mock-data";

interface ConsultationStatusProps {
  status: ConsultationStatus;
}

const statusSteps: ConsultationStatus[] = [
  "Waiting",
  "Checked In",
  "In Progress",
  "Completed",
];

export function ConsultationStatusBadge({ status }: ConsultationStatusProps) {
  const currentIdx = statusSteps.indexOf(status);

  return (
    <div
      className={cn(
        "flex items-center rounded-xl border border-slate-200/60 bg-white p-3",
        "dark:border-slate-700/40 dark:bg-slate-900/60",
      )}
    >
      <div className="flex w-full items-center justify-between">
        {statusSteps.map((step, idx) => {
          const isCompleted = idx <= currentIdx;
          const isCurrent = idx === currentIdx;
          const sStyle = consultationStatusStyleMap[step];

          return (
            <div key={step} className="flex flex-1 items-center">
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.15 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all",
                    isCompleted
                      ? cn(
                          sStyle.bg,
                          sStyle.dot
                            .replace("bg-", "border-")
                            .replace("500", "400"),
                        )
                      : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900",
                    isCurrent && "ring-2 ring-offset-1",
                    isCurrent && sStyle.dot.replace("bg-", "ring-"),
                  )}
                >
                  {isCompleted ? (
                    <Check
                      className={cn(
                        "h-3.5 w-3.5",
                        step === "Completed"
                          ? "text-emerald-500"
                          : step === "In Progress"
                            ? "text-indigo-500"
                            : step === "Checked In"
                              ? "text-cyan-500"
                              : "text-amber-500",
                      )}
                    />
                  ) : (
                    <Circle className="h-3 w-3 text-slate-300 dark:text-slate-600" />
                  )}
                </motion.div>
                <span
                  className={cn(
                    "mt-1 text-[10px] font-medium transition-colors",
                    isCompleted
                      ? cn(sStyle.text)
                      : "text-slate-400 dark:text-slate-500",
                  )}
                >
                  {step === "In Progress" ? "In Progress" : step}
                </span>
              </div>

              {/* Connector line */}
              {idx < statusSteps.length - 1 && (
                <div className="mx-2 flex-1">
                  <div
                    className={cn(
                      "h-0.5 rounded-full transition-colors",
                      idx < currentIdx
                        ? "bg-cyan-400 dark:bg-cyan-600"
                        : "bg-slate-200 dark:bg-slate-700",
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
