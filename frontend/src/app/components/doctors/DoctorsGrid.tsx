"use client";

import type { Doctor } from "@/lib/data/doctors";
import { DoctorCard } from "./DoctorCard";

interface DoctorsGridProps {
  doctors: Doctor[];
}

export function DoctorsGrid({ doctors }: DoctorsGridProps) {
  if (doctors.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/50 py-16">
        <p className="text-lg font-medium text-text-secondary">
          No doctors found matching your criteria.
        </p>
        <p className="mt-1 text-sm text-text-secondary/70">
          Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {doctors.map((doctor, index) => (
        <DoctorCard key={doctor.id} doctor={doctor} index={index} />
      ))}
    </div>
  );
}
