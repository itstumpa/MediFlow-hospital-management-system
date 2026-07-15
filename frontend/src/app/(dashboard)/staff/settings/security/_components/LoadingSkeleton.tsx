"use client";

export function LoadingSkeleton() {
  const shimmer =
    "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent";

  return (
    <div className="space-y-4">
      {/* Score skeleton */}
      <div className={`dash-card ${shimmer}`}>
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-6">
          <div className="h-[124px] w-[124px] rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="flex-1 space-y-3">
            <div className="h-5 w-48 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-3 w-64 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="flex gap-4">
              <div className="h-3 w-32 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-3 w-36 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations skeleton */}
      <div className={`dash-card ${shimmer}`}>
        <div className="mb-3 h-3 w-44 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 rounded-lg bg-slate-200 dark:bg-slate-700"
            />
          ))}
        </div>
      </div>

      {/* Form skeletons */}
      <div className={`dash-card ${shimmer}`}>
        <div className="mb-4 h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="space-y-3">
          <div className="h-9 w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
          <div className="h-9 w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
          <div className="h-9 w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
          <div className="h-8 w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
          <div className="h-8 w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>

      {/* Card grid skeleton */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className={`dash-card ${shimmer}`}>
            <div className="mb-4 h-3 w-32 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="space-y-2">
              <div className="h-16 w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
              <div className="h-16 w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
              <div className="h-16 w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        ))}
      </div>

      {/* Danger zone skeleton */}
      <div
        className={`dash-card border-red-200 dark:border-red-900 ${shimmer}`}
      >
        <div className="mb-4 h-3 w-28 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="space-y-3">
          <div className="h-16 w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
          <div className="h-16 w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
}
