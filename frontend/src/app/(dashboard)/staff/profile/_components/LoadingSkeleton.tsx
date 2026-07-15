"use client";

export function LoadingSkeleton() {
  const pulse = "animate-pulse rounded bg-slate-200 dark:bg-slate-700";

  return (
    <div className="space-y-6">
      {/* Profile Hero skeleton */}
      <div className="dash-card overflow-hidden">
        <div className={`h-28 ${pulse} rounded-none sm:h-36`} />
        <div className="relative px-6 pb-6">
          <div
            className={`-mt-14 h-24 w-24 rounded-xl border-4 border-white sm:-mt-16 sm:h-28 sm:w-28 ${pulse}`}
          />
          <div className="ml-5 mt-14 space-y-2 sm:mt-16">
            <div className={`h-6 w-48 ${pulse}`} />
            <div className={`h-4 w-36 ${pulse}`} />
          </div>
          <div className="mt-4 flex gap-6">
            <div className={`h-4 w-52 ${pulse}`} />
            <div className={`h-4 w-36 ${pulse}`} />
            <div className={`h-4 w-40 ${pulse}`} />
          </div>
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`h-9 w-32 ${pulse}`} />
        ))}
      </div>

      {/* Form skeleton */}
      <div className="dash-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className={`h-8 w-8 rounded-lg ${pulse}`} />
          <div className="space-y-1.5">
            <div className={`h-5 w-40 ${pulse}`} />
            <div className={`h-3 w-56 ${pulse}`} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className={`h-4 w-24 ${pulse}`} />
              <div className={`h-10 w-full ${pulse}`} />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <div className={`h-10 w-24 ${pulse}`} />
          <div className={`h-10 w-24 ${pulse}`} />
        </div>
      </div>
    </div>
  );
}
