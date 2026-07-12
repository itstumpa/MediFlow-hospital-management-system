"use client";

import { motion } from "framer-motion";

function SkeletonPulse({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700 ${className}`}
    />
  );
}

export function LoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Stats skeleton */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="dash-card p-5">
            <div className="flex items-start justify-between">
              <SkeletonPulse className="h-10 w-10 rounded-xl" />
              <SkeletonPulse className="h-5 w-12 rounded-full" />
            </div>
            <SkeletonPulse className="mt-3 h-8 w-20" />
            <SkeletonPulse className="mt-2 h-4 w-24" />
          </div>
        ))}
      </div>

      {/* Toolbar skeleton */}
      <div className="flex items-center gap-3">
        <SkeletonPulse className="h-11 w-80" />
        <SkeletonPulse className="h-9 w-20" />
        <SkeletonPulse className="h-9 w-24" />
        <SkeletonPulse className="h-9 w-20" />
      </div>

      {/* Table skeleton */}
      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/80">
          <SkeletonPulse className="h-4 w-4 rounded" />
          <SkeletonPulse className="h-3 w-16" />
          <SkeletonPulse className="h-3 w-36" />
          <SkeletonPulse className="h-3 w-28" />
          <SkeletonPulse className="h-3 w-14" />
          <SkeletonPulse className="h-3 w-14" />
          <SkeletonPulse className="h-3 w-16" />
          <SkeletonPulse className="h-3 w-16" />
          <SkeletonPulse className="h-3 w-20" />
          <SkeletonPulse className="h-3 w-20" />
        </div>

        {/* Rows */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-slate-100 px-4 py-4 dark:border-slate-700/50"
          >
            <SkeletonPulse className="h-4 w-4 rounded" />
            <SkeletonPulse className="h-8 w-8 rounded-lg" />
            <div className="flex-1">
              <SkeletonPulse className="h-4 w-32" />
              <SkeletonPulse className="mt-1 h-3 w-24" />
            </div>
            <SkeletonPulse className="h-4 w-28" />
            <SkeletonPulse className="h-4 w-12" />
            <SkeletonPulse className="h-4 w-14" />
            <SkeletonPulse className="h-4 w-14" />
            <SkeletonPulse className="h-4 w-16" />
            <SkeletonPulse className="h-5 w-20 rounded-full" />
            <SkeletonPulse className="h-4 w-20" />
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-between">
        <SkeletonPulse className="h-4 w-40" />
        <div className="flex items-center gap-2">
          <SkeletonPulse className="h-8 w-8 rounded-lg" />
          <SkeletonPulse className="h-8 w-8 rounded-lg" />
          <SkeletonPulse className="h-8 w-8 rounded-lg" />
          <SkeletonPulse className="h-8 w-16 rounded-lg" />
        </div>
      </div>
    </motion.div>
  );
}
