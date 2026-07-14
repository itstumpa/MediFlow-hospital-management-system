"use client";

import { ErrorState } from "@/components/dashboard/doctor/ErrorState";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PatientsError({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <ErrorState
        title="Patients Error"
        description={
          error.message || "Failed to load patients list. Please try again."
        }
        onRetry={reset}
        className="w-full max-w-lg"
      />
    </div>
  );
}
