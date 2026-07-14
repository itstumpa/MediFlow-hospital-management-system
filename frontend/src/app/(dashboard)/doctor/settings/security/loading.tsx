"use client";

import { LoadingSkeleton } from "@/components/dashboard/doctor/LoadingSkeleton";

export default function DoctorSecurityLoading() {
  return (
    <div className="space-y-5 p-6">
      <div className="h-8 w-56 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
      <div className="dash-card h-48 animate-pulse p-5">
        <div className="flex items-center gap-6">
          <div className="h-32 w-32 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-3 w-64 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex-1 space-y-4">
          <LoadingSkeleton variant="card" count={4} />
        </div>
        <div className="hidden w-72 lg:block">
          <LoadingSkeleton variant="card" count={4} />
        </div>
      </div>
    </div>
  );
}
