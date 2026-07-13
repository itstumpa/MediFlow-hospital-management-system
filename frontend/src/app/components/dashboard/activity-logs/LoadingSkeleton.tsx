"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoadingSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
  variant?: "table" | "card" | "timeline";
}

export function LoadingSkeleton({
  rows = 5,
  columns = 10,
  className,
  variant = "table",
}: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: rows }, (_, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: i * 0.05 }}
      className={cn(
        "skeleton-shimmer rounded-lg",
        variant === "table" && "h-14",
        variant === "card" && "h-32",
        variant === "timeline" && "h-24",
      )}
    />
  ));

  if (variant === "table") {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700",
          className,
        )}
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" role="table">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-800/80">
                {Array.from({ length: columns }, (_, i) => (
                  <th
                    key={i}
                    className="px-3 py-3 text-left"
                    style={{
                      width:
                        i === 0
                          ? "40px"
                          : i === 1
                            ? "56px"
                            : i === columns - 1
                              ? "96px"
                              : "auto",
                    }}
                  >
                    <div className="skeleton-shimmer h-4 w-3/4 rounded" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {skeletons.map((skeleton, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-100 dark:border-slate-800 last:border-b-0"
                >
                  <td className="px-3 py-3">
                    <div className="skeleton-shimmer h-4 w-6 rounded" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="skeleton-shimmer h-4 w-8 rounded-full" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="skeleton-shimmer h-4 w-3/4 rounded" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="skeleton-shimmer h-4 w-1/2 rounded" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="skeleton-shimmer h-4 w-2/3 rounded" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="skeleton-shimmer h-4 w-1/2 rounded" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="skeleton-shimmer h-4 w-1/3 rounded" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="skeleton-shimmer h-4 w-1/2 rounded" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="skeleton-shimmer h-4 w-1/2 rounded" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="skeleton-shimmer h-4 w-1/3 rounded" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="skeleton-shimmer h-4 w-1/3 rounded" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="skeleton-shimmer h-4 w-1/3 rounded" />
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="skeleton-shimmer h-4 w-8 rounded mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={cn(
          "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          className,
        )}
      >
        {skeletons}
      </div>
    );
  }

  if (variant === "timeline") {
    return (
      <div className={cn("space-y-6", className)}>
        {skeletons.map((skeleton, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className="flex gap-4"
          >
            <div className="relative flex-shrink-0">
              <div className="skeleton-shimmer h-3 w-3 rounded-full" />
              <div className="absolute left-1.5 top-3 bottom-0 w-0.5 skeleton-shimmer" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="skeleton-shimmer h-4 w-1/4 rounded mb-2" />
              <div className="skeleton-shimmer h-3 w-3/4 rounded mb-1" />
              <div className="skeleton-shimmer h-3 w-1/2 rounded" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return <div className={cn("space-y-4", className)}>{skeletons}</div>;
}

/** Stats cards skeleton */
export function StatsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className="dash-card p-6"
        >
          <div className="skeleton-shimmer h-4 w-1/3 rounded mb-2" />
          <div className="skeleton-shimmer h-10 w-1/2 rounded" />
        </motion.div>
      ))}
    </div>
  );
}

/** Filter panel skeleton */
export function FiltersSkeleton() {
  return (
    <div className="dash-card p-6 space-y-4">
      <div className="skeleton-shimmer h-6 w-1/4 rounded" />
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="space-y-2">
            <div className="skeleton-shimmer h-4 w-1/3 rounded" />
            <div className="skeleton-shimmer h-10 w-full rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Drawer skeleton */
export function DrawerSkeleton() {
  return (
    <div className="dash-card p-6 space-y-6 h-full">
      <div className="flex items-center justify-between">
        <div className="skeleton-shimmer h-6 w-1/3 rounded" />
        <div className="skeleton-shimmer h-8 w-8 rounded-full" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="space-y-2">
            <div className="skeleton-shimmer h-4 w-1/4 rounded" />
            <div className="skeleton-shimmer h-8 w-full rounded" />
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
        <div className="skeleton-shimmer h-4 w-1/4 rounded" />
        <div className="skeleton-shimmer h-24 w-full rounded font-mono" />
        <div className="skeleton-shimmer h-4 w-1/4 rounded" />
        <div className="skeleton-shimmer h-24 w-full rounded font-mono" />
      </div>
    </div>
  );
}
