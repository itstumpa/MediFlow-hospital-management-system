"use client";

import { Star, Stethoscope, Users } from "lucide-react";

interface DepartmentStatsProps {
  specialists: number;
  patients: string;
  rating: number;
}

export function DepartmentStats({
  specialists,
  patients,
  rating,
}: DepartmentStatsProps) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-text-secondary">
      <span className="flex items-center gap-1">
        <Stethoscope className="h-3.5 w-3.5" aria-hidden="true" />
        {specialists} Specialists
      </span>
      <span className="flex items-center gap-1">
        <Users className="h-3.5 w-3.5" aria-hidden="true" />
        {patients}+ Patients
      </span>
      <span className="flex items-center gap-1">
        <Star
          className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
          aria-hidden="true"
        />
        {rating} Rating
      </span>
    </div>
  );
}
