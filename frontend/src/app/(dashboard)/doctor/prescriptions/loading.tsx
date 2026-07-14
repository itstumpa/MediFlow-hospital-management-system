"use client";

import { LoadingSkeleton } from "@/components/dashboard/doctor/LoadingSkeleton";

export default function DoctorPrescriptionsLoading() {
  return (
    <div className="space-y-5 p-6">
      <div className="h-8 w-56 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="dash-card h-20 p-4">
            <div className="h-3 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-3 h-7 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <div className="h-10 flex-1 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
        <div className="h-10 w-36 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
      </div>
      <LoadingSkeleton variant="table" />
    </div>
  );
}
