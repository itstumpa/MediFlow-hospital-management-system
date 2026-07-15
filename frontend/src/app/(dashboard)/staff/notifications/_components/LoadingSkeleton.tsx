"use client";

/* ══════════════════════════════════════════════
   LoadingSkeleton
   ══════════════════════════════════════════════ */

export function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats skeleton */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="dash-card animate-pulse p-4 sm:p-5">
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
              <div className="h-4 w-10 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
            <div className="mt-3 h-7 w-16 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-2 h-3 w-20 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>

      {/* Toolbar skeleton */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="h-10 flex-1 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="h-10 w-24 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="h-10 w-32 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="h-10 w-10 rounded-lg bg-slate-200 dark:bg-slate-700" />
      </div>

      {/* Filter pills skeleton */}
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-20 rounded-lg bg-slate-200 dark:bg-slate-700"
          />
        ))}
      </div>

      {/* Notification list skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="dash-card animate-pulse p-4 sm:p-5">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-200 dark:bg-slate-700" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="flex gap-2">
                  <div className="h-5 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div className="h-5 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
