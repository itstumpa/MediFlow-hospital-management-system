"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import {
  computeProfileCompletion,
  type DoctorProfile,
} from "./doctor-profile-mock-data";

interface ProfileCompletionProps {
  profile: DoctorProfile;
}

export function ProfileCompletion({ profile }: ProfileCompletionProps) {
  const { percentage, sections } = computeProfileCompletion(profile);
  const [animatedPercent, setAnimatedPercent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedPercent(percentage), 300);
    return () => clearTimeout(timer);
  }, [percentage]);

  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset =
    circumference - (animatedPercent / 100) * circumference;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="rounded-xl border border-slate-200/60 bg-white dark:border-slate-700/40 dark:bg-slate-900/60"
    >
      <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
          <Loader2 className="h-4 w-4 text-dash-primary" />
          Profile Completion
        </h3>
      </div>

      <div className="p-4">
        {/* Circular Progress */}
        <div className="flex justify-center">
          <div className="relative flex h-24 w-24 items-center justify-center">
            <svg className="h-24 w-24 -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-slate-100 dark:text-slate-800"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-dash-primary"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                key={animatedPercent}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-bold text-slate-800 dark:text-white"
              >
                {animatedPercent}%
              </motion.span>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="mt-4 space-y-1.5">
          {sections.map((section) => (
            <motion.div
              key={section.key}
              variants={staggerItem}
              className="flex items-center gap-2"
            >
              {section.isComplete ? (
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
              ) : (
                <Circle className="h-3.5 w-3.5 shrink-0 text-slate-300 dark:text-slate-600" />
              )}
              <span
                className={cn(
                  "text-[11px]",
                  section.isComplete
                    ? "text-slate-500 dark:text-slate-400"
                    : "font-medium text-slate-700 dark:text-slate-300",
                )}
              >
                {section.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
