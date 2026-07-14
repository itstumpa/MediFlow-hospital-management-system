import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface DashboardContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Max-width centered container for patient portal content.
 * Wraps content at 1440px with responsive padding.
 */
export function DashboardContainer({
  children,
  className,
}: DashboardContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
