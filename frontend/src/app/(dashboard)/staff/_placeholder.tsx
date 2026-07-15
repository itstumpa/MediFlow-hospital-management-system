"use client";

import { EmptyState } from "@/components/dashboard/staff/EmptyState";
import { PageHeader } from "@/components/dashboard/staff/PageHeader";
import type { ElementType } from "react";

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  icon?: ElementType;
}

/**
 * Reusable placeholder page for routes not yet implemented.
 */
export function PlaceholderPage({
  title,
  subtitle,
  icon,
}: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={subtitle} />
      <EmptyState
        icon={icon}
        heading="Coming Soon"
        description={`The ${title.toLowerCase()} module is currently under development. Check back soon for updates.`}
      />
    </div>
  );
}
