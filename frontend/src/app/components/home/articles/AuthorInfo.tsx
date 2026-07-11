"use client";

import { BadgeCheck } from "lucide-react";
import Image from "next/image";

interface Author {
  name: string;
  specialization: string;
  avatar: string;
}

interface AuthorInfoProps {
  author: Author;
}

export function AuthorInfo({ author }: AuthorInfoProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-border">
        <Image
          src={author.avatar}
          alt={author.name}
          fill
          sizes="40px"
          className="object-cover"
        />
      </div>

      {/* Name + Specialization */}
      <div className="min-w-0">
        <div className="flex items-center gap-1">
          <span className="truncate text-sm font-semibold text-text-primary">
            {author.name}
          </span>
          <BadgeCheck
            className="h-4 w-4 flex-shrink-0 text-primary"
            aria-label="Verified Doctor"
          />
        </div>
        <p className="truncate text-xs text-text-secondary">
          {author.specialization}
        </p>
      </div>
    </div>
  );
}
