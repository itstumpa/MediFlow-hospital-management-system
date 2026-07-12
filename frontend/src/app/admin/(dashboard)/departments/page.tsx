"use client";

import { Plus } from "lucide-react";
import { PageHeader } from "@/app/components/dashboard/PageHeader";
import { DashboardContainer } from "@/app/components/dashboard/DashboardContainer";

export default function DepartmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Departments"
        subtitle="Organize and manage hospital departments."
        actions={
          <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-md">
            <Plus className="h-4 w-4" />
            Add Department
          </button>
        }
      />

      <div className="dash-card p-12">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
            <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
            Department management coming soon
          </h3>
          <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Create and manage departments, assign department heads, and track performance metrics.
          </p>
        </div>
      </div>
    </div>
  );
}
