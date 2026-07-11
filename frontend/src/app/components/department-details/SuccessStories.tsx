"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Quote, Star, ChevronLeft, ChevronRight, BadgeCheck, HeartPulse } from "lucide-react";
import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import type { DeptSuccessStory } from "@/lib/data/department-detail";

interface Props {
  stories: DeptSuccessStory[];
}

export function SuccessStories({ stories }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (stories.length === 0) return null;

  const prev = () => setActiveIndex((p) => (p === 0 ? stories.length - 1 : p - 1));
  const next = () => setActiveIndex((p) => (p === stories.length - 1 ? 0 : p + 1));

  const story = stories[activeIndex];

  return (
    <AnimatedSection className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Patient Success Stories"
          subtitle="Real experiences from patients who found healing and hope through our care."
        />

        <div className="relative mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={story.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
            >
              {/* Quote decoration */}
              <div className="absolute -left-4 -top-4 text-primary/5" aria-hidden="true">
                <Quote size={100} />
              </div>

              <div className="grid md:grid-cols-5">
                {/* Content */}
                <div className="p-6 md:col-span-3 md:p-8 lg:p-10">
                  {/* Treatment + rating */}
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-3.5 py-1 text-sm font-medium text-primary">
                      <span className="inline-flex items-center gap-1.5">
                        <HeartPulse size={14} aria-hidden="true" />
                        {story.treatment}
                      </span>
                    </span>
                    <div className="flex items-center gap-0.5" aria-label={`${story.rating} out of 5 stars`}>
                      {Array.from({ length: story.rating }).map((_, i) => (
                        <Star key={i} size={14} className="fill-amber-400 text-amber-400" aria-hidden="true" />
                      ))}
                    </div>
                  </div>

                  {/* Review */}
                  <p className="text-base leading-relaxed text-text-primary md:text-lg">
                    &ldquo;{story.review}&rdquo;
                  </p>

                  {/* Before/After summary */}
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-red-100 bg-red-50/50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-red-600">Before</p>
                      <p className="mt-1 text-sm text-red-800">{story.beforeSummary}</p>
                    </div>
                    <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">After</p>
                      <p className="mt-1 text-sm text-emerald-800">{story.afterSummary}</p>
                    </div>
                  </div>

                  {/* Patient info */}
                  <div className="mt-6 flex items-center gap-3">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full">
                      <Image
                        src={story.patientPhoto}
                        alt={`Photo of ${story.patientName}`}
                        fill
                        className="object-cover"
                        sizes="44px"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-text-primary">
                        {story.patientName}
                        {story.verified && (
                          <BadgeCheck size={15} className="text-primary" aria-label="Verified patient" />
                        )}
                      </div>
                      <p className="text-xs text-text-secondary">
                        Treated by {story.doctor}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right accent */}
                <div className="relative hidden md:col-span-2 md:block">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.03]" />
                  <div className="flex h-full items-center justify-center p-8">
                    <HeartPulse className="h-20 w-20 text-primary/[0.07]" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {stories.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-secondary shadow-sm transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Previous story"
              >
                <ChevronLeft size={17} aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2" role="tablist">
                {stories.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/40"
                    }`}
                    role="tab"
                    aria-selected={idx === activeIndex}
                    aria-label={`Go to story ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-secondary shadow-sm transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Next story"
              >
                <ChevronRight size={17} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
