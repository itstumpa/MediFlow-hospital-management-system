import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardContentProps {
  children: ReactNode;
  className?: string;
}

/**
 * Scrollable content area for the dashboard.
 * Handles the main content region with proper overflow and flex behavior.
 */
export function DashboardContent({ children, className }: DashboardContentProps) {
  return (
    <main
      id="dashboard-content"
      className={cn(
        "flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-900/50",
        "dash-scrollbar",
        className,
      )}
      tabIndex={-1}
    >
      {children}
    </main>
  );
}
