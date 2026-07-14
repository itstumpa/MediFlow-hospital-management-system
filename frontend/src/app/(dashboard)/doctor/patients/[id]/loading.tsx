import { LoadingSkeleton } from "@/components/dashboard/doctor/LoadingSkeleton";

export default function PatientDetailLoading() {
  return (
    <div className="space-y-5 p-6">
      <div className="h-8 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
      <div className="dash-card h-40 animate-pulse p-5" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="dash-card h-20 animate-pulse p-4" />
        ))}
      </div>
      <div className="flex gap-5">
        <div className="flex-1 space-y-4">
          <div className="flex gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"
              />
            ))}
          </div>
          <LoadingSkeleton variant="card" count={2} />
        </div>
        <div className="hidden w-72 lg:block">
          <LoadingSkeleton variant="card" count={3} />
        </div>
      </div>
    </div>
  );
}
