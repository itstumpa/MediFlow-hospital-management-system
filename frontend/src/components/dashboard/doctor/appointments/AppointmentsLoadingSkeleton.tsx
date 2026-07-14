"use client";

import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  viewMode?: "table" | "timeline" | "cards";
}

export function AppointmentsLoadingSkeleton({
  viewMode = "table",
}: LoadingSkeletonProps) {
  if (viewMode === "cards") {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "animate-pulse rounded-xl border border-slate-200/60 bg-white p-4",
              "dark:border-slate-700/40 dark:bg-slate-900/60",
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
                <div>
                  <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="mt-1 h-3 w-16 rounded bg-slate-100 dark:bg-slate-800" />
                </div>
              </div>
              <div className="h-5 w-16 rounded-full bg-slate-100 dark:bg-slate-800" />
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-3 w-40 rounded bg-slate-100 dark:bg-slate-800" />
              <div className="h-3 w-36 rounded bg-slate-100 dark:bg-slate-800" />
              <div className="h-3 w-48 rounded bg-slate-100 dark:bg-slate-800" />
            </div>
            <div className="mt-3 flex gap-2">
              <div className="h-8 flex-1 rounded-lg bg-slate-100 dark:bg-slate-800" />
              <div className="h-8 flex-1 rounded-lg bg-slate-100 dark:bg-slate-800" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (viewMode === "timeline") {
    return (
      <div
        className={cn(
          "animate-pulse rounded-xl border border-slate-200/60 bg-white p-5",
          "dark:border-slate-700/40 dark:bg-slate-900/60",
        )}
      >
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="relative flex gap-4">
            <div className="flex flex-col items-center">
              <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700" />
              {idx < 4 && (
                <div className="mt-1 h-full w-0.5 bg-slate-100 dark:bg-slate-800" />
              )}
            </div>
            <div className="min-w-0 flex-1 pb-6">
              <div className="rounded-xl border border-slate-100 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-slate-200 dark:bg-slate-700" />
                    <div>
                      <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-700" />
                      <div className="mt-1 h-3 w-48 rounded bg-slate-100 dark:bg-slate-800" />
                    </div>
                  </div>
                  <div className="h-5 w-20 rounded-full bg-slate-100 dark:bg-slate-800" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Table skeleton
  return (
    <div
      className={cn(
        "animate-pulse overflow-hidden rounded-xl border border-slate-200/60 bg-white",
        "dark:border-slate-700/40 dark:bg-slate-900/60",
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
        {[
          "Time",
          "Patient",
          "Age/Gender",
          "Type",
          "Reason",
          "Priority",
          "Status",
          "",
        ].map((hdr, idx) => (
          <div
            key={idx}
            className={cn(
              "h-3 rounded bg-slate-100 dark:bg-slate-800",
              idx === 0
                ? "w-16"
                : idx === 1
                  ? "w-24"
                  : idx === 2
                    ? "w-14"
                    : idx === 3
                      ? "w-16"
                      : idx === 4
                        ? "w-32"
                        : idx === 5
                          ? "w-14"
                          : idx === 6
                            ? "w-14"
                            : "ml-auto w-8",
            )}
          />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="flex items-center gap-2 border-b border-slate-50 px-4 py-3.5 last:border-0 dark:border-slate-800/50"
        >
          <div className="flex items-center gap-2" style={{ width: "16%" }}>
            <div className="h-3 w-3 rounded bg-slate-100 dark:bg-slate-800" />
            <div>
              <div className="h-4 w-14 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="mt-1 h-3 w-8 rounded bg-slate-100 dark:bg-slate-800" />
            </div>
          </div>
          <div className="flex items-center gap-2.5" style={{ width: "18%" }}>
            <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div>
              <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="mt-1 h-3 w-14 rounded bg-slate-100 dark:bg-slate-800" />
            </div>
          </div>
          <div
            className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-700"
            style={{ width: "10%" }}
          />
          <div
            className="h-5 w-20 rounded-full bg-slate-100 dark:bg-slate-800"
            style={{ width: "12%" }}
          />
          <div
            className="h-4 w-36 rounded bg-slate-100 dark:bg-slate-800"
            style={{ width: "20%" }}
          />
          <div
            className="h-5 w-16 rounded-full bg-slate-100 dark:bg-slate-800"
            style={{ width: "10%" }}
          />
          <div
            className="h-5 w-20 rounded-full bg-slate-100 dark:bg-slate-800"
            style={{ width: "12%" }}
          />
          <div className="ml-auto h-7 w-7 rounded-lg bg-slate-100 dark:bg-slate-800" />
        </div>
      ))}
    </div>
  );
}
