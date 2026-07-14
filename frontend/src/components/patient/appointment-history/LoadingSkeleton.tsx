"use client";

import { staggerContainer } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/* ─── Shimmer skeleton block ─── */
function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-700/60",
        className,
      )}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/5" />
    </div>
  );
}

/* ─── Card skeleton ─── */
function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60">
      <div className="flex items-start gap-3.5">
        <Shimmer className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Shimmer className="h-4 w-3/5" />
          <Shimmer className="h-3 w-2/5" />
        </div>
      </div>
      <div className="mt-4 space-y-2.5">
        <Shimmer className="h-4 w-4/5" />
        <Shimmer className="h-4 w-3/5" />
        <Shimmer className="h-4 w-2/5" />
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700/40">
        <Shimmer className="h-6 w-20 rounded-full" />
        <Shimmer className="h-3 w-24" />
      </div>
    </div>
  );
}

/* ─── Table row skeleton ─── */
function TableRowSkeleton() {
  return (
    <tr className="border-b border-slate-50 dark:border-slate-700/20">
      {Array.from({ length: 9 }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <Shimmer
            className={cn(
              "h-4",
              i === 8
                ? "w-8 rounded-lg"
                : i === 0
                  ? "w-24"
                  : i === 2
                    ? "w-20"
                    : "w-28",
            )}
          />
        </td>
      ))}
    </tr>
  );
}

/* ─── Loading Skeleton (main export) ─── */
interface LoadingSkeletonProps {
  viewMode: "table" | "cards";
  className?: string;
}

export function LoadingSkeleton({ viewMode, className }: LoadingSkeletonProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {/* Toolbar skeleton */}
      <div className="flex items-center gap-3 mb-6">
        <Shimmer className="h-11 flex-1 rounded-xl" />
        <Shimmer className="h-11 w-24 rounded-xl" />
        <Shimmer className="h-11 w-24 rounded-xl" />
        <Shimmer className="h-11 w-20 rounded-xl" />
      </div>

      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700/40">
                {Array.from({ length: 9 }).map((_, i) => (
                  <th key={i} className="px-4 py-4">
                    <Shimmer className="h-3 w-20" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRowSkeleton key={i} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
