"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../MotionVariants";

interface LoadingSkeletonProps {
  viewMode: "table" | "cards";
}

/** Skeleton while patient data loads */
export function PatientLoadingSkeleton({ viewMode }: LoadingSkeletonProps) {
  if (viewMode === "table") {
    return (
      <div className="space-y-2">
        {/* Table header */}
        <div className="flex gap-4 rounded-xl bg-white p-4 dark:bg-slate-900/60">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-3 flex-1 animate-pulse rounded bg-slate-200 dark:bg-slate-700"
            />
          ))}
        </div>
        {/* Table rows */}
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="flex animate-pulse gap-4 rounded-xl bg-white p-4 dark:bg-slate-900/60"
          >
            {/* Avatar */}
            <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />
            {/* Name */}
            <div className="h-3 w-32 flex-1 rounded bg-slate-200 dark:bg-slate-700" />
            {/* Other cells */}
            <div className="h-3 w-10 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-3 w-14 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-3 w-12 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-3 flex-1 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>
    );
  }

  // Card skeleton
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 6 }).map((_, idx) => (
        <motion.div
          key={idx}
          variants={staggerItem}
          className={cn(
            "animate-pulse rounded-xl border border-slate-200/60 bg-white p-4",
            "dark:border-slate-700/40 dark:bg-slate-900/60",
          )}
        >
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-28 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-2 w-20 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
            <div className="h-5 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>
          <div className="mt-3 flex gap-2">
            <div className="h-10 flex-1 rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="h-10 flex-1 rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="h-10 flex-1 rounded-lg bg-slate-200 dark:bg-slate-700" />
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-2 w-full rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-2 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
          <div className="mt-3 flex gap-2">
            <div className="h-8 flex-1 rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="h-8 flex-1 rounded-lg bg-slate-200 dark:bg-slate-700" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
