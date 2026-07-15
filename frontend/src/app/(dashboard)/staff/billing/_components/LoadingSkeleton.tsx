"use client";

export function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex items-start justify-between">
              <div className="h-9 w-9 rounded-lg bg-slate-200 dark:bg-slate-700" />
              <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
            <div className="mt-3 h-7 w-24 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-1 h-4 w-16 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="h-10 w-64 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="flex gap-2">
          <div className="h-9 w-28 rounded-lg bg-slate-200 dark:bg-slate-700" />
          <div className="h-9 w-32 rounded-lg bg-slate-200 dark:bg-slate-700" />
          <div className="h-9 w-24 rounded-lg bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        {/* Header */}
        <div className="hidden border-b border-slate-100 p-4 dark:border-slate-700 md:block">
          <div className="flex gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-4 flex-1 rounded bg-slate-200 dark:bg-slate-700"
              />
            ))}
          </div>
        </div>
        {/* Rows */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="border-b border-slate-50 p-4 last:border-0 dark:border-slate-800"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="space-y-1.5">
                  <div className="h-3.5 w-24 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>
              <div className="h-3.5 w-20 flex-1 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-3.5 w-16 flex-1 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-3.5 w-16 flex-1 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-3.5 w-16 flex-1 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-3.5 w-16 flex-1 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-5 w-16 flex-1 rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="flex gap-1.5 flex-1">
                <div className="h-7 w-7 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-7 w-7 rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
