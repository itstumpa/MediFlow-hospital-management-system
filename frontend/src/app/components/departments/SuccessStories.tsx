"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { testimonials } from "@/lib/data/departments";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function SuccessStories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () =>
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const next = () =>
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  const testimonial = testimonials[activeIndex];

  return (
    <AnimatedSection className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Patient Success Stories"
          subtitle="Real stories from patients who found healing in our departments."
        />

        <div className="relative mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
            >
              {/* Quote decoration */}
              <div
                className="absolute -left-4 -top-4 text-primary/5"
                aria-hidden="true"
              >
                <Quote size={120} />
              </div>

              <div className="grid md:grid-cols-5">
                {/* Left: testimonial content */}
                <div className="p-6 md:col-span-3 md:p-8 lg:p-10">
                  {/* Department tag + rating */}
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-3.5 py-1 text-sm font-medium text-primary">
                      {testimonial.department}
                    </span>
                    <div
                      className="flex items-center gap-0.5"
                      aria-label={`${testimonial.rating} out of 5 stars`}
                    >
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className="fill-amber-400 text-amber-400"
                            aria-hidden="true"
                          />
                        ),
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-lg leading-relaxed text-text-primary md:text-xl">
                    &ldquo;{testimonial.summary}&rdquo;
                  </p>

                  {/* Before/After */}
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-red-100 bg-red-50/50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-red-600">
                        Before Treatment
                      </p>
                      <p className="mt-1 text-sm text-red-800">
                        {testimonial.beforeTreatment}
                      </p>
                    </div>
                    <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                        After Treatment
                      </p>
                      <p className="mt-1 text-sm text-emerald-800">
                        {testimonial.afterTreatment}
                      </p>
                    </div>
                  </div>

                  {/* Patient info */}
                  <div className="mt-6 flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.photo}
                        alt={`Photo of ${testimonial.name}`}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 font-semibold text-text-primary">
                        {testimonial.name}
                        {testimonial.verified && (
                          <BadgeCheck
                            size={16}
                            className="text-primary"
                            aria-label="Verified patient"
                          />
                        )}
                      </div>
                      <p className="text-xs text-text-secondary">
                        Verified Patient
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: visual accent */}
                <div className="relative hidden md:col-span-2 md:block">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                  <div className="flex h-full items-center justify-center p-8">
                    <Quote
                      className="h-24 w-24 text-primary/10"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text-secondary shadow-sm transition-colors hover:border-primary hover:text-primary"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2" role="tablist">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-border hover:bg-primary/40"
                  }`}
                  role="tab"
                  aria-selected={idx === activeIndex}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text-secondary shadow-sm transition-colors hover:border-primary hover:text-primary"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
