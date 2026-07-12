"use client";

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="dash-card animate-pulse p-5">
          <div className="flex items-start justify-between">
            <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
            <div className="h-5 w-14 rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>
          <div className="mt-3 h-8 w-20 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="mt-2 h-4 w-24 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="mt-3 h-1 w-full rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
      ))}
    </div>
  );
}

export function ToolbarSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="h-11 max-w-md flex-1 min-w-[200px] rounded-xl bg-slate-200 dark:bg-slate-700" />
        <div className="hidden sm:flex items-center gap-2">
          <div className="h-8 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="h-8 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="h-8 w-18 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="h-11 w-24 rounded-xl bg-slate-200 dark:bg-slate-700" />
        <div className="h-10 w-20 rounded-xl bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="h-8 w-28 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="h-8 w-24 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="h-8 w-28 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="h-8 w-20 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="h-8 w-20 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="h-8 w-24 rounded-lg bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/80">
        <div className="h-4 w-4 rounded bg-slate-300 dark:bg-slate-600" />
        <div className="h-4 w-16 rounded bg-slate-300 dark:bg-slate-600" />
        <div className="h-4 w-40 rounded bg-slate-300 dark:bg-slate-600" />
        <div className="h-4 w-16 rounded bg-slate-300 dark:bg-slate-600" />
        <div className="h-4 w-16 rounded bg-slate-300 dark:bg-slate-600" />
        <div className="h-4 w-20 rounded bg-slate-300 dark:bg-slate-600" />
        <div className="h-4 w-28 rounded bg-slate-300 dark:bg-slate-600" />
        <div className="h-4 w-24 rounded bg-slate-300 dark:bg-slate-600" />
        <div className="h-4 w-20 rounded bg-slate-300 dark:bg-slate-600" />
        <div className="h-4 w-24 rounded bg-slate-300 dark:bg-slate-600" />
        <div className="h-4 w-20 rounded bg-slate-300 dark:bg-slate-600" />
        <div className="ml-auto h-4 w-20 rounded bg-slate-300 dark:bg-slate-600" />
      </div>

      {/* Rows */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 border-b border-slate-100 px-4 py-4 last:border-0 dark:border-slate-700/50"
        >
          <div className="h-4 w-4 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700" />
            <div>
              <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="mt-1 h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
          <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-14 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="ml-auto flex gap-2">
            <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <StatsSkeleton />
      <ToolbarSkeleton />
      <TableSkeleton />
    </div>
  );
}
