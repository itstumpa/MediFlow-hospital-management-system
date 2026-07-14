"use client";

import { LoadingSkeleton } from "@/components/dashboard/doctor/LoadingSkeleton";

export default function DoctorScheduleLoading() {
  return (
    <div className="space-y-5 p-6">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="dash-card h-20 p-4">
            <div className="h-3 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-3 h-7 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>
      <div className="flex gap-5">
        <div className="flex-1">
          <div className="dash-card h-96 animate-pulse p-5">
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"
                />
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
