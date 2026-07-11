"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Fatima Begum",
    location: "Dhaka",
    rating: 5,
    text: "MediFlow transformed my healthcare experience. The doctors are incredibly knowledgeable and the staff treats you like family. I recommend them to everyone I know.",
    avatar: "FB",
    gradient: "from-primary/20 to-accent/20",
  },
  {
    name: "Rafiq Hasan",
    location: "Chittagong",
    rating: 5,
    text: "After years of struggling with my condition, MediFlow's specialists finally gave me the right diagnosis and treatment. I'm forever grateful for their expertise and compassion.",
    avatar: "RH",
    gradient: "from-accent/20 to-primary/20",
  },
  {
    name: "Nasrin Akhter",
    location: "Sylhet",
    rating: 5,
    text: "The level of care at MediFlow is outstanding. From the modern facilities to the attentive nursing staff, everything exceeded my expectations. Truly world-class healthcare.",
    avatar: "NA",
    gradient: "from-primary-dark/20 to-accent/20",
  },
];

export function Testimonials() {
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const goNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
    }),
  };

  return (
    <AnimatedSection className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Patient Testimonials"
          subtitle="Hear from our patients about their journey to better health with MediFlow."
        />

        <div className="mx-auto max-w-5xl">
          {/* Desktop grid */}
          <motion.div
            variants={reduced ? undefined : staggerContainer}
            initial={reduced ? undefined : "hidden"}
            whileInView={reduced ? undefined : "visible"}
            viewport={reduced ? undefined : { once: true, amount: 0.2 }}
            className="hidden gap-8 md:grid md:grid-cols-3"
          >
            {testimonials.map((item) => (
              <motion.div
                key={item.name}
                variants={reduced ? undefined : staggerItem}
                whileHover={
                  reduced
                    ? undefined
                    : { y: -6, transition: { duration: 0.3, ease: "easeOut" } }
                }
                className="relative rounded-2xl border border-border bg-background p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Quote icon */}
                <Quote
                  className="absolute top-4 right-4 h-8 w-8 text-primary/5"
                  aria-hidden="true"
                />

                {/* Stars */}
                <div
                  className="mb-4 flex items-center gap-1"
                  aria-label={`${item.rating} out of 5 stars`}
                >
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm leading-relaxed text-text-secondary">
                  &ldquo;{item.text}&rdquo;
                </p>

                {/* Divider */}
                <div className="my-4 border-t border-border" />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${item.gradient}`}
                  >
                    <span className="text-sm font-bold text-primary">
                      {item.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {item.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {item.location}
                    </p>
                  </div>
                  <BadgeCheck
                    className="ml-auto h-5 w-5 text-primary"
                    aria-label="Verified patient"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile carousel */}
          <div className="md:hidden">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={reduced ? undefined : variants}
                  initial={reduced ? undefined : "enter"}
                  animate={reduced ? undefined : "center"}
                  exit={reduced ? undefined : "exit"}
                  transition={
                    reduced
                      ? undefined
                      : { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }
                  }
                  className="p-6"
                >
                  {/* Quote icon */}
                  <Quote
                    className="absolute top-4 right-4 h-8 w-8 text-primary/5"
                    aria-hidden="true"
                  />

                  {/* Stars */}
                  <div
                    className="mb-4 flex items-center gap-1"
                    aria-label={`${testimonials[current].rating} out of 5 stars`}
                  >
                    {Array.from({
                      length: testimonials[current].rating,
                    }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <p className="text-sm leading-relaxed text-text-secondary">
                    &ldquo;{testimonials[current].text}&rdquo;
                  </p>

                  <div className="my-4 border-t border-border" />

                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${testimonials[current].gradient}`}
                    >
                      <span className="text-sm font-bold text-primary">
                        {testimonials[current].avatar}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        {testimonials[current].name}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {testimonials[current].location}
                      </p>
                    </div>
                    <BadgeCheck
                      className="ml-auto h-5 w-5 text-primary"
                      aria-label="Verified patient"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between border-t border-border px-4 py-3">
                <button
                  onClick={goPrev}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} />
                </button>

                <div
                  className="flex items-center gap-2"
                  role="tablist"
                  aria-label="Testimonial slides"
                >
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goTo(index)}
                      role="tab"
                      aria-selected={current === index}
                      aria-label={`Testimonial ${index + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        current === index
                          ? "w-6 bg-primary"
                          : "w-2 bg-border hover:bg-primary/40"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={goNext}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
