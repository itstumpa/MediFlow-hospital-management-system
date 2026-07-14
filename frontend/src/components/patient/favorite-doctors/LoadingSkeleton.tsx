"use client";

import { cn } from "@/lib/utils";

/* ─── Skeleton base ─── */

function Pulse({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-700",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

/* ─── Cards skeleton ─── */

export function CardsSkeleton({ count = 6 }: { count?: number } = {}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="dash-card p-5 space-y-4 animate-pulse">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Pulse className="h-11 w-11 rounded-xl" />
              <div className="space-y-1.5">
                <Pulse className="h-4 w-28" />
                <Pulse className="h-3 w-20" />
              </div>
            </div>
            <Pulse className="h-5 w-16 rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Pulse className="h-3 w-full" />
            <Pulse className="h-3 w-full" />
            <Pulse className="h-3 w-full" />
            <Pulse className="h-3 w-full" />
          </div>
          <Pulse className="h-3 w-full" />
          <Pulse className="h-3 w-3/4" />
          <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/40">
            <Pulse className="h-8 flex-1 rounded-lg" />
            <Pulse className="h-8 flex-1 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── List skeleton ─── */

export function ListSkeleton({ count = 6 }: { count?: number } = {}) {
  return (
    <div className="space-y-4" role="status" aria-label="Loading doctors">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="dash-card p-4 animate-pulse flex items-center gap-4"
        >
          <Pulse className="h-16 w-16 rounded-xl shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1.5">
                <Pulse className="h-4 w-32" />
                <Pulse className="h-3 w-24" />
              </div>
              <Pulse className="h-5 w-20 rounded-full shrink-0" />
            </div>
            <div className="flex flex-wrap gap-4">
              <Pulse className="h-3 w-24" />
              <Pulse className="h-3 w-20" />
              <Pulse className="h-3 w-28" />
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Pulse className="h-9 w-24 rounded-lg" />
            <Pulse className="h-9 w-24 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Unified LoadingSkeleton ─── */

interface LoadingSkeletonProps {
  viewMode: "grid" | "list";
  count?: number;
}

export function LoadingSkeleton({ viewMode, count = 6 }: LoadingSkeletonProps) {
  return viewMode === "grid" ? (
    <CardsSkeleton count={count} />
  ) : (
    <ListSkeleton count={count} />
  );
}