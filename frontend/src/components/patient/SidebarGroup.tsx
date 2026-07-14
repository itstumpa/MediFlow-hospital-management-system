"use client";

import { cn } from "@/lib/utils";

interface PatientSidebarGroupProps {
  label: string;
  collapsed: boolean;
  children: React.ReactNode;
}

export function SidebarGroup({
  label,
  collapsed,
  children,
}: PatientSidebarGroupProps) {
  return (
    <div className="px-3">
      {/* Group label — hidden when collapsed */}
      {!collapsed && (
        <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 dark:text-slate-500">
          {label}
        </p>
      )}

      {/* Items */}
      <div className={cn("flex flex-col gap-0.5", collapsed && "items-center")}>
        {children}
      </div>
    </div>
  );
}
