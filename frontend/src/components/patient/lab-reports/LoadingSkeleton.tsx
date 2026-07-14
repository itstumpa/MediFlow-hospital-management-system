"use client";

import { cn } from "@/lib/utils";

/* ─── Skeleton base ─── */

function Pulse({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-700",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

/* ─── Cards skeleton ─── */

export function CardsSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="dash-card p-5 space-y-4 animate-pulse">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Pulse className="h-11 w-11 rounded-xl" />
              <div className="space-y-1.5">
                <Pulse className="h-4 w-28" />
                <Pulse className="h-3 w-20" />
              </div>
            </div>
            <Pulse className="h-5 w-16 rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Pulse className="h-3 w-full" />
            <Pulse className="h-3 w-full" />
            <Pulse className="h-3 w-full" />
            <Pulse className="h-3 w-full" />
          </div>
          <Pulse className="h-3 w-full" />
          <Pulse className="h-3 w-3/4" />
          <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/40">
            <Pulse className="h-8 flex-1 rounded-lg" />
            <Pulse className="h-8 flex-1 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Table skeleton ─── */

export function TableSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("dash-card overflow-hidden animate-pulse", className)}>
      <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
        {/* Header */}
        <div className="flex gap-4 px-4 py-3">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Pulse key={i} className="h-3 flex-1" />
          ))}
        </div>
        {/* Rows */}
        {[1, 2, 3, 4, 5].map((row) => (
          <div key={row} className="flex gap-4 px-4 py-3">
            {[1, 2, 3, 4, 5, 6, 7].map((col) => (
              <Pulse key={col} className="h-3 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Timeline skeleton ─── */

export function TimelineSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("dash-card p-6 animate-pulse", className)}>
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-5 pb-8 last:pb-0">
          <Pulse className="h-10 w-10 rounded-xl shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1.5">
                <Pulse className="h-4 w-40" />
                <Pulse className="h-3 w-24" />
              </div>
              <Pulse className="h-5 w-16 rounded-full" />
            </div>
            <div className="flex gap-4">
              <Pulse className="h-3 w-24" />
              <Pulse className="h-3 w-20" />
            </div>
            <Pulse className="h-3 w-full" />
            <Pulse className="h-3 w-3/4" />
            <div className="flex gap-2">
              <Pulse className="h-7 w-16 rounded-lg" />
              <Pulse className="h-7 w-20 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
