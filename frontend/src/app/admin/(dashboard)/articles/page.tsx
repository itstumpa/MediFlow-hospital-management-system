"use client";

import { Plus } from "lucide-react";
import { PageHeader } from "@/app/components/dashboard/PageHeader";
import { DashboardContainer } from "@/app/components/dashboard/DashboardContainer";

export default function ArticlesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Articles"
        subtitle="Create, edit, and manage health articles and blog posts."
        actions={
          <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-md">
            <Plus className="h-4 w-4" />
            Create Article
          </button>
        }
      />

      <div className="dash-card p-12">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
            <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
            Article CMS coming soon
          </h3>
          <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Write and publish health articles, manage categories, and track content performance.
          </p>
        </div>
      </div>
    </div>
  );
}
