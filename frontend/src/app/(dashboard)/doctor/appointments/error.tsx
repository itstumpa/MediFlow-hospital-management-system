"use client";

import { ErrorState } from "@/components/dashboard/doctor/ErrorState";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AppointmentsError({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <ErrorState
        title="Appointments Error"
        description={
          error.message || "Failed to load appointments. Please try again."
        }
        onRetry={reset}
        className="w-full max-w-lg"
      />
    </div>
  );
}
