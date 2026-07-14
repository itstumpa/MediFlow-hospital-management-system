"use client";

import { LoadingSkeleton } from "@/components/dashboard/doctor/LoadingSkeleton";

export default function DoctorAppointmentsLoading() {
  return (
    <div className="space-y-5 p-6">
      <div className="h-8 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="dash-card h-24 p-4">
            <div className="h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-3 h-7 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>
      <LoadingSkeleton variant="table" />
    </div>
  );
}
