"use client";

import { cn } from "@/lib/utils";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Hero skeleton */}
      <div
        className={cn(
          "h-32 animate-pulse rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300",
          "dark:from-slate-800 dark:to-slate-700",
        )}
      />

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-24 animate-pulse rounded-xl bg-slate-100",
              "dark:bg-slate-800",
            )}
          />
        ))}
      </div>

      {/* Two-column layout skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column (spans 2 cols) */}
        <div className="space-y-6 lg:col-span-2">
          <div
            className={cn(
              "h-80 animate-pulse rounded-xl bg-slate-100",
              "dark:bg-slate-800",
            )}
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div
              className={cn(
                "h-64 animate-pulse rounded-xl bg-slate-100",
                "dark:bg-slate-800",
              )}
            />
            <div
              className={cn(
                "h-64 animate-pulse rounded-xl bg-slate-100",
                "dark:bg-slate-800",
              )}
            />
          </div>
          <div
            className={cn(
              "h-72 animate-pulse rounded-xl bg-slate-100",
              "dark:bg-slate-800",
            )}
          />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-60 animate-pulse rounded-xl bg-slate-100",
                "dark:bg-slate-800",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
