"use client";

/*
 * Loading skeleton for the full appointments page.
 * Mirrors the final layout: stats → filters → view-mode switcher → main grid + sidebar.
 */

/* ─── Pulse animation ───────────────────────── */

function Pulse({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700 ${className ?? ""}`}
    />
  );
}

/* ─── Stats skeleton (6 cards) ──────────────── */

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="dash-card flex flex-col items-start gap-2 p-4">
          <Pulse className="h-8 w-8 rounded-lg" />
          <Pulse className="h-3 w-16" />
          <Pulse className="h-5 w-12" />
          <Pulse className="h-3 w-14" />
        </div>
      ))}
    </div>
  );
}

/* ─── Filter bar skeleton ───────────────────── */

function FilterBarSkeleton() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Pulse key={i} className="h-9 w-28 rounded-lg" />
      ))}
      <Pulse className="ml-auto h-9 w-40 rounded-lg" />
    </div>
  );
}

/* ─── View mode switcher skeleton ────────────── */

function ViewModeSkeleton() {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800">
      {Array.from({ length: 4 }).map((_, i) => (
        <Pulse key={i} className="h-8 w-20 rounded-md" />
      ))}
    </div>
  );
}

/* ─── Table skeleton (7 columns, 6 rows) ────── */

function TableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-slate-100 bg-slate-50/50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
        {Array.from({ length: 7 }).map((_, i) => (
          <Pulse
            key={i}
            className={`h-4 ${i === 0 ? "w-32" : i === 6 ? "w-28" : "flex-1"}`}
          />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: 6 }).map((_, r) => (
        <div
          key={r}
          className="flex items-center gap-4 border-b border-slate-50 px-4 py-3.5 last:border-0 dark:border-slate-800"
        >
          {/* Patient (avatar + name) */}
          <div className="flex w-32 items-center gap-2.5">
            <Pulse className="h-8 w-8 rounded-full" />
            <Pulse className="h-3.5 flex-1" />
          </div>
          {/* Doctor */}
          <Pulse className="h-3.5 flex-1" />
          {/* Department */}
          <Pulse className="h-3.5 flex-1" />
          {/* Date */}
          <Pulse className="h-3.5 flex-1" />
          {/* Time */}
          <Pulse className="h-3.5 flex-1" />
          {/* Type */}
          <Pulse className="h-3.5 flex-1" />
          {/* Actions */}
          <div className="flex w-28 items-center gap-1.5">
            {Array.from({ length: 4 }).map((_, a) => (
              <Pulse key={a} className="h-7 w-7 rounded-md" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Sidebar skeleton ──────────────────────── */

function SidebarSkeleton() {
  return (
    <div className="dash-card space-y-4 p-4">
      {/* Summary pills */}
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="space-y-1.5 rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/50"
          >
            <Pulse className="h-5 w-8" />
            <Pulse className="h-3 w-12" />
          </div>
        ))}
      </div>

      {/* Doctor rows */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Pulse className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-1">
            <Pulse className="h-3.5 w-28" />
            <Pulse className="h-3 w-20" />
          </div>
          <Pulse className="h-5 w-14 rounded-full" />
        </div>
      ))}

      {/* Upcoming slots */}
      <div className="space-y-1.5">
        <Pulse className="h-3 w-40" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/50"
          >
            <Pulse className="h-2 w-2 rounded-full" />
            <div className="flex-1 space-y-1">
              <Pulse className="h-3 w-24" />
              <Pulse className="h-2.5 w-16" />
            </div>
            <Pulse className="h-3 w-12" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Export ───────────────────────────── */

export function AppointmentSkeleton() {
  return (
    <div className="space-y-5 p-4 md:p-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Pulse className="h-6 w-56" />
          <Pulse className="h-4 w-72" />
        </div>
        <div className="flex items-center gap-2">
          <Pulse className="h-9 w-32 rounded-lg" />
          <Pulse className="h-9 w-20 rounded-lg" />
        </div>
      </div>

      <StatsSkeleton />
      <FilterBarSkeleton />
      <ViewModeSkeleton />

      {/* Grid: main + sidebar */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <TableSkeleton />
        </div>
        <div className="lg:col-span-1">
          <SidebarSkeleton />
        </div>
      </div>
    </div>
  );
}
