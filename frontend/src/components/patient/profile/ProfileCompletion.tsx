"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

/* ─── Props ─── */

interface ProfileCompletionProps {
  percentage: number;
}

/* ─── Component ─── */

export function ProfileCompletion({ percentage }: ProfileCompletionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  // Animated ring values
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = useTransform(count, [0, 100], [circumference, 0]);

  // Color transition based on percentage
  const ringColor =
    percentage >= 80 ? "#10b981" : percentage >= 50 ? "#f59e0b" : "#ef4444";

  useEffect(() => {
    if (isVisible) {
      count.set(0);
      animate(count, percentage, {
        duration: 1.5,
        ease: [0.25, 0.1, 0.25, 1],
      });
    }
  }, [count, percentage, isVisible]);

  return (
    <motion.div
      variants={staggerItem}
      onViewportEnter={() => setIsVisible(true)}
      className="dash-card"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5 dark:border-slate-700/50">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-400">
          <svg
            className="h-4.5 w-4.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            Profile Completion
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Complete your profile for better care
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:gap-8">
        {/* ─── SVG Progress Ring ─── */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={
            isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
          }
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative shrink-0"
        >
          <svg width="128" height="128" className="-rotate-90">
            {/* Background track */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-slate-100 dark:text-slate-800"
            />
            {/* Animated progress arc */}
            <motion.circle
              cx="64"
              cy="64"
              r={radius}
              fill="none"
              stroke={ringColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ strokeDashoffset }}
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span className="text-3xl font-bold text-slate-900 dark:text-white">
              <motion.span>{rounded}</motion.span>
              <span className="text-lg">%</span>
            </motion.span>
            <span className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
              Complete
            </span>
          </div>
        </motion.div>

        {/* ─── Missing items list ─── */}
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Complete these to reach 100%:
          </p>

          <MissingItem label="Upload profile photo" done={false} />
          <MissingItem label="Add emergency contact" done={true} />
          <MissingItem label="Verify insurance details" done={true} />
          <MissingItem label="Complete medical history" done={false} />
          <MissingItem label="Set communication preferences" done={true} />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Missing item row ─── */

function MissingItem({ label, done }: { label: string; done: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
          done
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-slate-300 dark:border-slate-600"
        }`}
      >
        {done ? (
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        ) : (
          <span className="block h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600" />
        )}
      </span>
      <span
        className={`text-sm ${
          done
            ? "text-slate-400 line-through dark:text-slate-500"
            : "text-slate-700 dark:text-slate-300"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
