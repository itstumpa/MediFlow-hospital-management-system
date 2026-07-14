"use client";

import { LoadingSkeleton } from "@/components/dashboard/doctor/LoadingSkeleton";

export default function DoctorProfileLoading() {
  return (
    <div className="space-y-5 p-6">
      <div className="dash-card h-44 animate-pulse p-5" />
      <div className="flex gap-5">
        <div className="flex-1 space-y-4">
          <div className="flex gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"
              />
            ))}
          </div>
          <div className="dash-card h-64 animate-pulse p-5">
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-4 flex-1 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden w-72 lg:block">
          <LoadingSkeleton variant="card" count={3} />
        </div>
      </div>
    </div>
  );
}
