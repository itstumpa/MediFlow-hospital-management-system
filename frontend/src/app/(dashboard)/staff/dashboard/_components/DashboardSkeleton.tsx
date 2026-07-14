/* ─── Helper skeleton block ─────────────────── */

function Block({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700/60 ${className ?? ""}`}
    />
  );
}

/* ─── Hero skeleton ─────────────────────────── */

function HeroSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white p-6 dark:border-slate-700/40 dark:bg-slate-900 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <Block className="h-8 w-72" />
          <Block className="h-4 w-96" />
          <div className="flex gap-2">
            <Block className="h-6 w-28 rounded-full" />
            <Block className="h-6 w-48 rounded-full" />
            <Block className="h-6 w-36 rounded-full" />
          </div>
        </div>
        <div className="flex gap-3">
          <Block className="h-9 w-36 rounded-xl" />
          <Block className="h-9 w-36 rounded-xl" />
          <Block className="h-9 w-36 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/* ─── Stats skeleton ────────────────────────── */

function StatsGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-slate-200/50 bg-white p-5 dark:border-slate-700/30 dark:bg-slate-900"
        >
          <div className="flex items-start justify-between">
            <Block className="h-10 w-10 rounded-2xl" />
            <Block className="h-4 w-14" />
          </div>
          <div className="mt-4 space-y-2">
            <Block className="h-8 w-20" />
            <Block className="h-3 w-32" />
          </div>
          <Block className="mt-3 h-12 w-full" />
        </div>
      ))}
    </div>
  );
}

/* ─── Quick actions skeleton ────────────────── */

function QuickActionsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200/50 bg-white p-5 dark:border-slate-700/30 dark:bg-slate-900"
        >
          <Block className="h-12 w-12 rounded-2xl" />
          <div className="space-y-1 text-center">
            <Block className="mx-auto h-4 w-24" />
            <Block className="mx-auto h-3 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Content area skeleton ─────────────────── */

function ContentSkeleton() {
  return (
    <div className="grid gap-6 xl:grid-cols-4">
      {/* Main content */}
      <div className="space-y-6 xl:col-span-3">
        {/* Table skeleton */}
        <div className="rounded-2xl border border-slate-200/50 bg-white p-5 dark:border-slate-700/30 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <Block className="h-5 w-48" />
            <Block className="h-4 w-16" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Block className="h-8 w-8 rounded-full" />
                <Block className="h-3 flex-1" />
                <Block className="h-3 w-32" />
                <Block className="h-3 w-20" />
                <Block className="h-3 w-16" />
                <Block className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Queue skeleton */}
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-2xl border border-slate-200/50 bg-white p-4 dark:border-slate-700/30 dark:bg-slate-900"
            >
              <Block className="h-10 w-10 rounded-xl" />
              <div className="flex-1 space-y-1">
                <Block className="h-4 w-36" />
                <Block className="h-3 w-48" />
              </div>
              <Block className="h-5 w-16 rounded-full" />
              <Block className="h-5 w-20 rounded-full" />
              <Block className="h-7 w-20 rounded-xl" />
            </div>
          ))}
        </div>

        {/* Doctor grid skeleton */}
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-2xl border border-slate-200/50 bg-white p-4 dark:border-slate-700/30 dark:bg-slate-900"
            >
              <Block className="h-11 w-11 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Block className="h-4 w-32" />
                <Block className="h-3 w-24" />
                <div className="flex gap-2">
                  <Block className="h-5 w-20 rounded-full" />
                  <Block className="h-3 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar skeleton */}
      <div className="space-y-4">
        <Block className="h-36 w-full rounded-2xl" />
        <Block className="h-56 w-full rounded-2xl" />
        <Block className="h-48 w-full rounded-2xl" />
        <Block className="h-64 w-full rounded-2xl" />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Dashboard Skeleton — Full Page
   ══════════════════════════════════════════════ */

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <HeroSkeleton />
      <StatsGridSkeleton />
      <div className="space-y-4">
        <Block className="h-5 w-32" />
        <QuickActionsSkeleton />
      </div>
      <ContentSkeleton />
    </div>
  );
}
