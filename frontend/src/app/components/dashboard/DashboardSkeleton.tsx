import { cn } from "@/lib/utils";

/* ============================================
   Skeleton variants for loading states
   ============================================ */

interface SkeletonProps {
  className?: string;
}

/**
 * Base skeleton block with shimmer animation.
 */
function SkeletonBlock({ className }: SkeletonProps) {
  return (
    <div
      className={cn("rounded-xl skeleton-shimmer", className)}
      aria-hidden="true"
    />
  );
}

/**
 * Stat card skeleton (icon + value + label).
 */
export function StatCardSkeleton() {
  return (
    <div className="dash-card p-5">
      <div className="flex items-start justify-between">
        <SkeletonBlock className="h-10 w-10 rounded-xl" />
        <SkeletonBlock className="h-5 w-14 rounded-md" />
      </div>
      <div className="mt-4 space-y-2">
        <SkeletonBlock className="h-7 w-24 rounded-md" />
        <SkeletonBlock className="h-4 w-32 rounded-md" />
      </div>
    </div>
  );
}

/**
 * Table row skeleton (variable columns).
 */
export function TableRowSkeleton({ columns = 6 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 border-b border-slate-100 px-4 py-3.5 dark:border-slate-800/60">
      {Array.from({ length: columns }).map((_, i) => (
        <SkeletonBlock
          key={i}
          className={cn(
            "h-4 rounded-md",
            i === 0 ? "w-36" : i === columns - 1 ? "w-20 ml-auto" : "flex-1",
          )}
        />
      ))}
    </div>
  );
}

/**
 * Table skeleton with header and multiple rows.
 */
export function TableSkeleton({
  rows = 5,
  columns = 6,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <div className="dash-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-slate-100 bg-slate-50/50 px-4 py-3 dark:border-slate-800/60 dark:bg-slate-800/20">
        {Array.from({ length: columns }).map((_, i) => (
          <SkeletonBlock
            key={i}
            className={cn(
              "h-3.5 rounded-md",
              i === 0 ? "w-32" : i === columns - 1 ? "w-16 ml-auto" : "flex-1",
            )}
          />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <TableRowSkeleton key={i} columns={columns} />
      ))}
    </div>
  );
}

/**
 * Card grid skeleton (stat cards).
 */
export function StatGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Chart skeleton (rectangular with aspect ratio).
 */
export function ChartSkeleton() {
  return (
    <div className="dash-card p-5">
      <div className="flex items-center justify-between">
        <SkeletonBlock className="h-5 w-36 rounded-md" />
        <SkeletonBlock className="h-5 w-20 rounded-md" />
      </div>
      <SkeletonBlock className="mt-4 h-[260px] w-full rounded-xl" />
    </div>
  );
}

/**
 * Full page skeleton — use as loading.tsx for dashboard pages.
 */
export function PageSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <SkeletonBlock className="h-7 w-48 rounded-md" />
          <SkeletonBlock className="h-4 w-72 rounded-md" />
        </div>
        <SkeletonBlock className="h-10 w-32 rounded-xl" />
      </div>

      {/* Stat grid */}
      <StatGridSkeleton />

      {/* Chart + content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartSkeleton />
        </div>
        <div>
          <ChartSkeleton />
        </div>
      </div>

      {/* Table */}
      <TableSkeleton rows={4} />
    </div>
  );
}
