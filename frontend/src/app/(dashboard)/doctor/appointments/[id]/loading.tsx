import { LoadingSkeleton } from "@/components/dashboard/doctor/LoadingSkeleton";

export default function AppointmentDetailLoading() {
  return (
    <div className="space-y-5 p-6">
      <div className="h-8 w-72 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
      <div className="dash-card h-32 animate-pulse p-5" />
      <div className="flex gap-5">
        <div className="flex-1 space-y-4">
          <div className="flex gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-20 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"
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
