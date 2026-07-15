"use client";

/* ─── Pulse block ──────────────────────────── */

function Pulse({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700 ${className ?? ""}`}
    />
  );
}

/* ─── Stepper skeleton ─────────────────────── */

function StepperSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Pulse className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Pulse className="h-3 w-16" />
            <Pulse className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Form skeleton ────────────────────────── */

function FormSkeleton() {
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <Pulse className="h-5 w-44" />
        <Pulse className="h-3 w-64" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Pulse className="h-3 w-20" />
            <Pulse className="h-10 w-full rounded-lg" />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Pulse className="h-3 w-16" />
        <Pulse className="h-20 w-full rounded-lg" />
      </div>
    </div>
  );
}

/* ─── Sidebar skeleton ─────────────────────── */

function SidebarSkeleton() {
  return (
    <div className="dash-card space-y-4 p-4">
      <Pulse className="h-4 w-28" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Pulse className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-1">
            <Pulse className="h-3.5 w-24" />
            <Pulse className="h-3 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Export ──────────────────────────── */

export function RegistrationSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-900/50">
      <div className="p-4 md:p-6">
        {/* Page header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="space-y-1">
            <Pulse className="h-6 w-64" />
            <Pulse className="h-4 w-80" />
          </div>
          <div className="flex items-center gap-2">
            <Pulse className="h-9 w-40 rounded-lg" />
            <Pulse className="h-9 w-40 rounded-lg" />
            <Pulse className="h-9 w-44 rounded-lg" />
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <StepperSkeleton />
          </div>
          <div className="lg:col-span-2">
            <div className="dash-card p-6">
              <FormSkeleton />
            </div>
          </div>
          <div className="space-y-5 lg:col-span-1">
            <SidebarSkeleton />
            <SidebarSkeleton />
            <SidebarSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
