"use client";

import { ErrorState } from "@/components/dashboard/staff/ErrorState";

export default function StaffError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <ErrorState
        title="Staff Portal Error"
        description={
          error.message ||
          "An unexpected error occurred. Please try again or contact your system administrator."
        }
        onRetry={reset}
      />
    </div>
  );
}
