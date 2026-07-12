import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface DashboardContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Max-width centered container for dashboard content.
 * Wraps content at 1600px with responsive padding.
 */
export function DashboardContainer({
  children,
  className,
}: DashboardContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
