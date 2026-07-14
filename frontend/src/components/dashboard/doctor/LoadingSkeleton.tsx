import { cn } from "@/lib/utils";
import type { SkeletonVariant } from "./types";

interface LoadingSkeletonProps {
  variant?: SkeletonVariant;
  className?: string;
  count?: number;
}

/**
 * Pulse-animated skeleton placeholders for loading states.
 * Supports card, table, form, sidebar, header, text, and avatar variants.
 */
function SkeletonPulse({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700",
        className,
      )}
      aria-hidden="true"
    />
  );
}

/** Card skeleton — mimics a dash-card */
function CardSkeleton() {
  return (
    <div className="dash-card p-5">
      <div className="flex items-center justify-between">
        <SkeletonPulse className="h-4 w-28" />
        <SkeletonPulse className="h-8 w-8 rounded-xl" />
      </div>
      <SkeletonPulse className="mt-4 h-8 w-20" />
      <SkeletonPulse className="mt-2 h-3 w-36" />
    </div>
  );
}

/** Table skeleton — mimics a data table with rows */
function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="dash-card overflow-hidden">
      {/* Table header */}
      <div className="flex gap-4 border-b border-slate-100 px-6 py-4 dark:border-slate-800/60">
        <SkeletonPulse className="h-4 w-24" />
        <SkeletonPulse className="h-4 w-32" />
        <SkeletonPulse className="h-4 w-28" />
        <SkeletonPulse className="h-4 w-20" />
        <SkeletonPulse className="h-4 w-16 ml-auto" />
      </div>
      {/* Table rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 border-b border-slate-50 px-6 py-4 last:border-0 dark:border-slate-800/30"
        >
          <SkeletonPulse className="h-4 w-24" />
          <SkeletonPulse className="h-4 w-32" />
          <SkeletonPulse className="h-4 w-28" />
          <SkeletonPulse className="h-4 w-20" />
          <SkeletonPulse className="h-4 w-16 ml-auto" />
        </div>
      ))}
    </div>
  );
}

/** Form skeleton — mimics a form layout */
function FormSkeleton() {
  return (
    <div className="dash-card space-y-6 p-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <SkeletonPulse className="h-3.5 w-24" />
          <SkeletonPulse className="h-10 w-full rounded-xl" />
        </div>
      ))}
      <div className="flex gap-3 pt-2">
        <SkeletonPulse className="h-10 w-28 rounded-xl" />
        <SkeletonPulse className="h-10 w-28 rounded-xl" />
      </div>
    </div>
  );
}

/** Sidebar skeleton */
function SidebarSkeleton() {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <SkeletonPulse className="h-10 w-10 rounded-2xl" />
        <div className="space-y-1.5">
          <SkeletonPulse className="h-4 w-24" />
          <SkeletonPulse className="h-3 w-16" />
        </div>
      </div>
      {/* Nav groups */}
      {Array.from({ length: 3 }).map((_, g) => (
        <div key={g} className="space-y-2">
          <SkeletonPulse className="h-3 w-16" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <SkeletonPulse className="h-4 w-4" />
              <SkeletonPulse className="h-4 w-28" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Header skeleton */
function HeaderSkeleton() {
  return (
    <div className="flex h-16 items-center gap-4 border-b border-slate-200/50 px-6 dark:border-slate-700/30">
      <SkeletonPulse className="h-4 w-48" />
      <SkeletonPulse className="ml-auto h-9 w-72 rounded-2xl" />
      <SkeletonPulse className="h-9 w-9 rounded-xl" />
      <SkeletonPulse className="h-9 w-9 rounded-xl" />
      <SkeletonPulse className="h-9 w-24 rounded-xl" />
    </div>
  );
}

export function LoadingSkeleton({
  variant = "card",
  className,
  count = 1,
}: LoadingSkeletonProps) {
  const items = Array.from({ length: count });

  if (variant === "table") {
    return <TableSkeleton rows={count > 1 ? count : 5} />;
  }

  if (variant === "form") {
    return <FormSkeleton />;
  }

  if (variant === "sidebar") {
    return <SidebarSkeleton />;
  }

  if (variant === "header") {
    return <HeaderSkeleton />;
  }

  if (variant === "text") {
    return (
      <div className={cn("space-y-2", className)}>
        {items.map((_, i) => (
          <SkeletonPulse
            key={i}
            className={cn("h-4", i === items.length - 1 ? "w-3/4" : "w-full")}
          />
        ))}
      </div>
    );
  }

  if (variant === "avatar") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <SkeletonPulse className="h-10 w-10 rounded-2xl" />
        <div className="space-y-1.5">
          <SkeletonPulse className="h-4 w-28" />
          <SkeletonPulse className="h-3 w-20" />
        </div>
      </div>
    );
  }

  /* Default: card skeleton */
  return (
    <div className={cn("grid gap-4", className)}>
      {items.map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
