"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Shield,
  ShieldAlert,
} from "lucide-react";
import { useMemo } from "react";
import type { SecurityScoreData } from "../_mock-data";

interface SecurityScoreProps {
  data: SecurityScoreData;
}

const severityConfig = {
  critical: {
    icon: ShieldAlert,
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
  },
  high: {
    icon: AlertTriangle,
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-200 dark:border-orange-800",
  },
  medium: {
    icon: Info,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
  },
  low: {
    icon: Info,
    color: "text-slate-500",
    bg: "bg-slate-50 dark:bg-slate-800",
    border: "border-slate-200 dark:border-slate-700",
  },
};

export function SecurityScore({ data }: SecurityScoreProps) {
  const { score, percentage, recommendations, completedChecks } = data;

  const scoreColor = useMemo(() => {
    if (percentage >= 80)
      return {
        stroke: "#10b981",
        text: "text-emerald-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/30",
        label: "Good",
      };
    if (percentage >= 60)
      return {
        stroke: "#f59e0b",
        text: "text-amber-500",
        bg: "bg-amber-50 dark:bg-amber-950/30",
        label: "Fair",
      };
    return {
      stroke: "#ef4444",
      text: "text-red-500",
      bg: "bg-red-50 dark:bg-red-950/30",
      label: "Needs Work",
    };
  }, [percentage]);

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (percentage / 100) * circumference;
  const completedCount = completedChecks.filter((c) => c.completed).length;
  const pendingRecs = recommendations.filter((r) => !r.completed).length;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={staggerItem} className="dash-card">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-6">
          {/* Animated Ring */}
          <div className="relative flex shrink-0 items-center justify-center">
            <svg width="124" height="124" className="-rotate-90">
              <circle
                cx="62"
                cy="62"
                r="54"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-slate-100 dark:text-slate-800"
              />
              <motion.circle
                cx="62"
                cy="62"
                r="54"
                fill="none"
                stroke={scoreColor.stroke}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-2xl font-bold text-slate-900 dark:text-white"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                {score}
              </motion.span>
              <span className="text-[10px] font-medium text-slate-400">
                /100
              </span>
            </div>
          </div>

          {/* Summary */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <Shield className={`h-5 w-5 ${scoreColor.text}`} />
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Security Score: {scoreColor.label}
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {pendingRecs > 0
                ? `${pendingRecs} recommendation${pendingRecs > 1 ? "s" : ""} to improve your security posture.`
                : "All recommendations completed. Great job!"}
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-4 sm:justify-start">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>
                  {completedCount} of {completedChecks.length} tasks completed
                </span>
              </div>
              {pendingRecs > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                  <span>
                    {pendingRecs} improvement{pendingRecs > 1 ? "s" : ""}{" "}
                    recommended
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recommendations */}
      {recommendations.filter((r) => !r.completed).length > 0 && (
        <motion.div variants={staggerItem} className="dash-card">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Recommended Improvements
          </h4>
          <div className="space-y-2">
            {recommendations
              .filter((r) => !r.completed)
              .map((rec) => {
                const config = severityConfig[rec.severity];
                const Icon = config.icon;
                return (
                  <div
                    key={rec.id}
                    className={`flex items-center gap-3 rounded-lg border px-3.5 py-2.5 ${config.bg} ${config.border}`}
                  >
                    <Icon className={`h-4 w-4 ${config.color}`} />
                    <span className="flex-1 text-xs text-slate-700 dark:text-slate-300">
                      {rec.label}
                    </span>
                    <span
                      className={`text-[10px] font-medium uppercase ${config.color}`}
                    >
                      {rec.severity}
                    </span>
                  </div>
                );
              })}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
