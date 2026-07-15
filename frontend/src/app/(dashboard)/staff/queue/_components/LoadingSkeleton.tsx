"use client";

/* ══════════════════════════════════════════════
   LoadingSkeleton
   ══════════════════════════════════════════════ */

export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Stats skeleton */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
            <div className="mt-3 h-7 w-20 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-2 h-3 w-16 rounded bg-slate-100 dark:bg-slate-700" />
          </div>
        ))}
      </div>

      {/* Toolbar skeleton */}
      <div className="flex items-center gap-3">
        <div className="h-10 flex-1 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="h-10 w-24 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="h-10 w-24 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="h-10 w-24 rounded-lg bg-slate-200 dark:bg-slate-700" />
      </div>

      {/* Kanban skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50"
          >
            <div className="mb-3 h-5 w-24 rounded bg-slate-200 dark:bg-slate-700" />
            {Array.from({ length: 3 }).map((_, j) => (
              <div
                key={j}
                className="mb-2 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="mt-2 h-3 w-32 rounded bg-slate-100 dark:bg-slate-700" />
                <div className="mt-2 h-3 w-24 rounded bg-slate-100 dark:bg-slate-700" />
                <div className="mt-3 h-6 w-full rounded bg-slate-100 dark:bg-slate-700" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
