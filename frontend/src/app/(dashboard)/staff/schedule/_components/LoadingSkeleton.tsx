"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";

/* ══════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════ */

export function LoadingSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Stats skeleton */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="animate-pulse rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
            <div className="mt-3 h-7 w-24 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-2 h-3 w-16 rounded bg-slate-100 dark:bg-slate-700" />
            <div className="mt-1 h-4 w-20 rounded bg-slate-100 dark:bg-slate-700" />
          </motion.div>
        ))}
      </motion.div>

      {/* Toolbar skeleton */}
      <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="h-8 w-16 rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="ml-2 h-5 w-40 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-32 rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="h-8 w-48 rounded-lg bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>

      {/* Calendar skeleton */}
      <div className="animate-pulse rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-slate-100 dark:border-slate-700">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="p-3 text-center">
              <div className="mx-auto h-3 w-8 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
        </div>

        {/* Rows */}
        {Array.from({ length: 5 }).map((_, row) => (
          <div key={row} className="grid grid-cols-7">
            {Array.from({ length: 7 }).map((_, col) => (
              <div
                key={col}
                className="border-b border-r border-slate-100 p-2 dark:border-slate-700"
              >
                <div className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="mt-1 space-y-1">
                  <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-700" />
                  <div className="h-3 w-3/4 rounded bg-slate-100 dark:bg-slate-700" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="animate-pulse rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <div className="border-b border-slate-100 p-4 dark:border-slate-700">
          <div className="flex gap-8">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700"
              />
            ))}
          </div>
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-8 border-b border-slate-50 p-4 dark:border-slate-700/50"
          >
            {Array.from({ length: 7 }).map((_, j) => (
              <div
                key={j}
                className={`h-4 rounded bg-slate-100 dark:bg-slate-700 ${
                  j === 1 ? "w-32" : j === 2 ? "w-24" : "w-16"
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
