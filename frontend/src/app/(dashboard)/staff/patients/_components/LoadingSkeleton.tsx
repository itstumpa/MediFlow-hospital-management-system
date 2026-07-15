"use client";

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

/* ─── Toolbar skeleton ──────────────────────── */

function ToolbarSkeleton() {
  return (
    <div className="dash-card flex flex-wrap items-center gap-3 p-4">
      <Pulse className="h-9 flex-1 min-w-[200px] rounded-lg" />
      <Pulse className="h-9 w-20 rounded-lg" />
      <Pulse className="h-9 w-28 rounded-lg" />
    </div>
  );
}

/* ─── Table skeleton (9 columns, 6 rows) ────── */

function TableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-slate-100 bg-slate-50/50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
        {Array.from({ length: 9 }).map((_, i) => (
          <Pulse
            key={i}
            className={`h-4 ${i < 2 ? "w-16" : i === 8 ? "w-24" : "flex-1"}`}
          />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: 6 }).map((_, r) => (
        <div
          key={r}
          className="flex items-center gap-4 border-b border-slate-50 px-4 py-3.5 last:border-0 dark:border-slate-800"
        >
          {/* ID */}
          <Pulse className="h-3.5 w-16" />
          {/* Patient (avatar + name) */}
          <div className="flex flex-1 items-center gap-2.5">
            <Pulse className="h-8 w-8 rounded-full" />
            <Pulse className="h-3.5 flex-1" />
          </div>
          {/* Age */}
          <Pulse className="h-3.5 w-10" />
          {/* Gender */}
          <Pulse className="h-3.5 w-12 flex-1" />
          {/* Doctor */}
          <Pulse className="h-3.5 flex-1" />
          {/* Phone */}
          <Pulse className="h-3.5 flex-1" />
          {/* Last Visit */}
          <Pulse className="h-3.5 flex-1" />
          {/* Status */}
          <Pulse className="h-5 w-20 rounded-full" />
          {/* Actions */}
          <div className="flex w-24 items-center gap-1.5">
            <Pulse className="h-7 w-16 rounded-md" />
            <Pulse className="h-7 w-7 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Card skeleton (3 cards) ───────────────── */

function CardGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="dash-card overflow-hidden">
          {/* Top */}
          <div className="flex items-center gap-4 border-b border-slate-100 bg-slate-50/50 px-5 py-4 dark:border-slate-700 dark:bg-slate-800/30">
            <Pulse className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Pulse className="h-4 w-32" />
              <Pulse className="h-3 w-24" />
            </div>
            <Pulse className="h-5 w-20 rounded-full" />
          </div>
          {/* Body */}
          <div className="space-y-3 px-5 py-4">
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} className="flex items-center gap-3">
                <Pulse className="h-3 w-16" />
                <Pulse className="h-3 flex-1" />
              </div>
            ))}
          </div>
          {/* Actions */}
          <div className="flex items-center gap-2 border-t border-slate-100 px-5 py-3 dark:border-slate-700">
            <Pulse className="h-8 flex-1 rounded-lg" />
            <Pulse className="h-8 flex-1 rounded-lg" />
            <Pulse className="h-8 w-8 rounded-lg" />
            <Pulse className="h-8 w-8 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Full page skeleton ────────────────────── */

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-900/50">
      <div className="p-4 md:p-6">
        {/* Header skeleton */}
        <div className="mb-6 flex items-start justify-between">
          <div className="space-y-1.5">
            <Pulse className="h-7 w-40" />
            <Pulse className="h-4 w-56" />
          </div>
          <div className="flex items-center gap-2">
            <Pulse className="h-9 w-36 rounded-xl" />
            <Pulse className="h-9 w-24 rounded-xl" />
            <Pulse className="h-9 w-20 rounded-xl" />
          </div>
        </div>

        {/* Stats */}
        <div className="mb-5">
          <StatsSkeleton />
        </div>

        {/* Toolbar */}
        <div className="mb-4">
          <ToolbarSkeleton />
        </div>

        {/* View mode indicator */}
        <div className="mb-5">
          {/* Table view (default) */}
          <div className="hidden md:block">
            <TableSkeleton />
          </div>
          {/* Mobile cards */}
          <div className="md:hidden">
            <CardGridSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Drawer skeleton (shown when drawer loads) ─ */

export function DrawerSkeleton() {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
        <Pulse className="h-5 w-40" />
        <Pulse className="h-6 w-6 rounded-lg" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5">
        {/* Identity */}
        <div className="flex items-center gap-4">
          <Pulse className="h-14 w-14 rounded-full" />
          <div className="flex-1 space-y-2">
            <Pulse className="h-5 w-36" />
            <Pulse className="h-4 w-24" />
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Pulse className="h-3 w-24" />
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex items-center gap-3">
                  <Pulse className="h-4 w-4 rounded" />
                  <div className="flex-1 space-y-1">
                    <Pulse className="h-3 w-20" />
                    <Pulse className="h-3.5 w-40" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
