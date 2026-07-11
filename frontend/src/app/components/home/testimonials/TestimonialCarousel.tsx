"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { CarouselControls } from "./CarouselControls";
import type { Testimonial } from "./TestimonialCard";
import { TestimonialCard } from "./TestimonialCard";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoSlideInterval?: number;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

function chunkTestimonials(
  testimonials: Testimonial[],
  itemsPerSlide: number,
): Testimonial[][] {
  const chunks: Testimonial[][] = [];
  for (let i = 0; i < testimonials.length; i += itemsPerSlide) {
    chunks.push(testimonials.slice(i, i + itemsPerSlide));
  }
  return chunks;
}

export function TestimonialCarousel({
  testimonials,
  autoSlideInterval = 5500,
}: TestimonialCarouselProps) {
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Responsive items per slide
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 768) setItemsPerSlide(1);
      else if (width < 1024) setItemsPerSlide(2);
      else setItemsPerSlide(3);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = chunkTestimonials(testimonials, itemsPerSlide);
  const totalSlides = slides.length;

  // Auto-slide
  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }
    }, autoSlideInterval);
  }, [isPaused, totalSlides, autoSlideInterval]);

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoSlide]);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const goNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div
      className="relative mx-auto max-w-5xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Carousel viewport */}
      <div className="overflow-hidden" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex"
          >
            {slides[currentSlide]?.map((testimonial) => (
              <TestimonialCard
                key={`${testimonial.name}-${currentSlide}`}
                testimonial={testimonial}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <CarouselControls
        onPrev={goPrev}
        onNext={goNext}
        currentIndex={currentSlide}
        totalSlides={totalSlides}
        onDotClick={goToSlide}
      />
    </div>
  );
}
