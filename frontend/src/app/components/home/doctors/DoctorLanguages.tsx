"use client";

import { Globe } from "lucide-react";

interface DoctorLanguagesProps {
  languages: string[];
}

export function DoctorLanguages({ languages }: DoctorLanguagesProps) {
  if (languages.length === 0) return null;

  return (
    <div className="flex items-start gap-1.5">
      <Globe
        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-text-secondary"
        aria-hidden="true"
      />
      <div className="flex flex-wrap gap-1">
        {languages.map((lang) => (
          <span
            key={lang}
            className="rounded-md bg-background px-2 py-0.5 text-[11px] font-medium text-text-secondary"
          >
            {lang}
          </span>
        ))}
      </div>
    </div>
  );
}
