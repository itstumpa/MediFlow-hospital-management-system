"use client";

import { cn } from "@/lib/utils";

/* ─── Cards skeleton ─── */

export function CardsSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-pulse",
        className,
      )}
    >
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="dash-card p-5 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-slate-200 dark:bg-slate-700" />
              <div className="space-y-1.5">
                <div className="h-3.5 w-24 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-3 w-16 rounded bg-slate-100 dark:bg-slate-700/50" />
              </div>
            </div>
            <div className="h-5 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="h-3 w-28 rounded bg-slate-100 dark:bg-slate-700/50" />
            <div className="h-3 w-20 rounded bg-slate-100 dark:bg-slate-700/50" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="h-2.5 w-12 rounded bg-slate-100 dark:bg-slate-700/50" />
              <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
            <div className="space-y-1">
              <div className="h-2.5 w-12 rounded bg-slate-100 dark:bg-slate-700/50" />
              <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
            <div className="space-y-1">
              <div className="h-2.5 w-12 rounded bg-slate-100 dark:bg-slate-700/50" />
              <div className="h-3 w-12 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
            <div className="space-y-1">
              <div className="h-2.5 w-12 rounded bg-slate-100 dark:bg-slate-700/50" />
              <div className="h-3 w-14 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700/40">
            <div className="flex items-center gap-1.5">
              <div className="h-6 w-16 rounded-lg bg-slate-100 dark:bg-slate-700/50" />
              <div className="h-6 w-14 rounded-lg bg-slate-100 dark:bg-slate-700/50" />
            </div>
            <div className="h-6 w-16 rounded-lg bg-slate-100 dark:bg-slate-700/50" />
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div
              key={i}
              className="h-3 flex-1 rounded bg-slate-200 dark:bg-slate-700"
            />
          ))}
        </div>
        {/* Rows */}
        {[1, 2, 3, 4, 5].map((row) => (
          <div key={row} className="flex gap-4 px-4 py-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((col) => (
              <div
                key={col}
                className="h-3 flex-1 rounded bg-slate-100 dark:bg-slate-700/50"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
