import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "./MotionVariants";

/* ============================================
   Skeleton primitives
   ============================================ */

interface SkeletonProps {
  className?: string;
}

function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-[skeleton-shimmer_1.5s_ease-in-out_infinite] rounded-xl bg-slate-200 dark:bg-slate-700/60",
        "bg-gradient-to-r from-transparent via-white/10 to-transparent",
        "bg-[length:200%_100%]",
        className,
      )}
      aria-hidden="true"
    />
  );
}

/* ============================================
   Sidebar skeleton
   ============================================ */

export function SidebarSkeleton() {
  return (
    <div className="flex h-screen w-[280px] flex-col gap-4 border-r border-slate-200/50 bg-white/70 p-4 dark:border-slate-700/30 dark:bg-slate-900/70">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-2xl" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <div className="space-y-1">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================
   Header skeleton
   ============================================ */

export function HeaderSkeleton() {
  return (
    <div className="flex h-16 items-center gap-4 border-b border-slate-200/50 bg-white/70 px-6 dark:border-slate-700/30 dark:bg-slate-900/70">
      <Skeleton className="h-4 w-32" />
      <div className="flex-1" />
      <Skeleton className="h-9 w-[320px] rounded-2xl" />
      <Skeleton className="h-9 w-9 rounded-xl" />
      <Skeleton className="h-9 w-9 rounded-xl" />
      <Skeleton className="h-9 w-24 rounded-xl" />
    </div>
  );
}

/* ============================================
   Card skeleton
   ============================================ */

export function CardSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/50 bg-white p-5 dark:border-slate-700/30 dark:bg-slate-900",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <Skeleton className="h-4 w-12" />
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
}

/* ============================================
   Stats grid skeleton
   ============================================ */

export function StatsGridSkeleton() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div key={i} variants={staggerItem}>
          <CardSkeleton />
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ============================================
   Table skeleton
   ============================================ */

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-slate-200/50 bg-white p-5 dark:border-slate-700/30 dark:bg-slate-900"
    >
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-slate-100 pb-3 dark:border-slate-800/60">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {/* Rows */}
      <div className="mt-3 space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="flex items-center gap-4"
          >
            <Skeleton className="h-3 flex-1" />
            <Skeleton className="h-3 flex-1" />
            <Skeleton className="h-3 flex-1" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ============================================
   Form skeleton
   ============================================ */

export function FormSkeleton() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6 rounded-2xl border border-slate-200/50 bg-white p-6 dark:border-slate-700/30 dark:bg-slate-900"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div key={i} variants={staggerItem} className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </motion.div>
      ))}
      <motion.div variants={staggerItem} className="flex gap-3">
        <Skeleton className="h-10 flex-1 rounded-xl" />
        <Skeleton className="h-10 w-24 rounded-xl" />
      </motion.div>
    </motion.div>
  );
}

/* ============================================
   Calendar skeleton
   ============================================ */

export function CalendarSkeleton() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-slate-200/50 bg-white p-5 dark:border-slate-700/30 dark:bg-slate-900"
    >
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-4" />
        ))}
      </div>
      {/* Day cells */}
      <div className="mt-3 grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }).map((_, i) => (
          <motion.div key={i} variants={staggerItem}>
            <Skeleton className="aspect-square rounded-xl" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ============================================
   Page skeleton — full page loading state
   ============================================ */

export function PageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-9 w-24 rounded-xl" />
          <Skeleton className="h-9 w-24 rounded-xl" />
        </div>
      </div>

      {/* Stats */}
      <StatsGridSkeleton />

      {/* Content area — 2-column layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TableSkeleton rows={6} />
        </div>
        <div className="space-y-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
}
