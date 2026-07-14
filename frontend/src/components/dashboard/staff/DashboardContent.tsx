import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface DashboardContentProps {
  children: ReactNode;
  className?: string;
}

/**
 * Scrollable content area for the staff portal.
 * Handles the main content region with proper overflow and flex behavior.
 */
export function DashboardContent({
  children,
  className,
}: DashboardContentProps) {
  return (
    <main
      id="staff-content"
      className={cn(
        "flex-1 overflow-y-auto bg-gradient-to-b from-transparent via-transparent to-slate-50/30 dark:to-slate-900/20",
        "dash-scrollbar",
        className,
      )}
      tabIndex={-1}
    >
      {children}
    </main>
  );
}
