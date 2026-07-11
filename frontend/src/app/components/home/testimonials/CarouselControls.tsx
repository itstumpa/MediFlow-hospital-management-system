"use client";

import type { LucideIcon } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalSlides: number;
  onDotClick: (index: number) => void;
  prevIcon?: LucideIcon;
  nextIcon?: LucideIcon;
}

export function CarouselControls({
  onPrev,
  onNext,
  currentIndex,
  totalSlides,
  onDotClick,
  prevIcon: PrevIcon = ChevronLeft,
  nextIcon: NextIcon = ChevronRight,
}: CarouselControlsProps) {
  return (
    <div className="mt-8 flex items-center justify-center gap-6">
      {/* Previous button */}
      <button
        type="button"
        onClick={onPrev}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text-secondary shadow-sm transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label="Previous testimonial"
      >
        <PrevIcon className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Pagination dots */}
      <div
        className="flex items-center gap-2"
        role="tablist"
        aria-label="Testimonial navigation"
      >
        {Array.from({ length: totalSlides }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === currentIndex}
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => onDotClick(i)}
            className={`rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              i === currentIndex
                ? "h-3 w-8 bg-primary"
                : "h-3 w-3 bg-border hover:bg-primary/40"
            }`}
          />
        ))}
      </div>

      {/* Next button */}
      <button
        type="button"
        onClick={onNext}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text-secondary shadow-sm transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label="Next testimonial"
      >
        <NextIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
