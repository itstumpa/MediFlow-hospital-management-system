"use client";

import { motion } from "framer-motion";

/**
 * Skeleton loader with shimmer animation.
 */
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-border/60 ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/**
 * Article card skeleton
 */
export function ArticleCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-0 shadow-sm">
      <Skeleton className="aspect-[16/10] rounded-b-none rounded-t-2xl" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center gap-3 pt-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Doctor card skeleton
 */
export function DoctorCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <Skeleton className="h-28 w-28 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
      <div className="mt-4 flex gap-3">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 flex-1 rounded-lg" />
      </div>
    </div>
  );
}

/**
 * Testimonial card skeleton
 */
export function TestimonialCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-4" />
        ))}
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

/**
 * Department card skeleton
 */
export function DepartmentCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <Skeleton className="mx-auto h-16 w-16 rounded-2xl" />
      <div className="mt-4 space-y-2 text-center">
        <Skeleton className="mx-auto h-5 w-28" />
        <Skeleton className="mx-auto h-4 w-full" />
        <Skeleton className="mx-auto h-4 w-3/4" />
      </div>
    </div>
  );
}

/**
 * Feature card skeleton
 */
export function FeatureCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <Skeleton className="h-12 w-12 rounded-2xl" />
      <div className="mt-4 space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

/**
 * Section-level skeleton row for grids
 */
export function SkeletonRow({
  count = 3,
  variant = "article",
}: {
  count?: number;
  variant?: "article" | "doctor" | "testimonial" | "department" | "feature";
}) {
  const skeletons = {
    article: ArticleCardSkeleton,
    doctor: DoctorCardSkeleton,
    testimonial: TestimonialCardSkeleton,
    department: DepartmentCardSkeleton,
    feature: FeatureCardSkeleton,
  };

  const SkeletonComponent = skeletons[variant];
  const gridCols = {
    article: "md:grid-cols-3",
    doctor: "md:grid-cols-3",
    testimonial: "md:grid-cols-3",
    department: "md:grid-cols-4",
    feature: "md:grid-cols-3",
  };

  return (
    <div className={`grid gap-6 sm:grid-cols-2 ${gridCols[variant]}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
}
