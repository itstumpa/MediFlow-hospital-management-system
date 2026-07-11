"use client";

import { motion } from "framer-motion";
import { Quote, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import { memo } from "react";

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
  doctorName: string;
  department: string;
  visitDate: string;
  imageUrl: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  isCenter?: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
  hover: {
    y: -6,
    boxShadow: "0 20px 40px -12px rgba(14,124,123,0.15)",
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

export const TestimonialCard = memo(function TestimonialCard({
  testimonial,
  isCenter = false,
}: TestimonialCardProps) {
  return (
    <motion.div
      className={`shrink-0 px-2 ${
        isCenter ? "w-full md:w-1/2 lg:w-1/3" : "w-full md:w-1/2 lg:w-1/3"
      }`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-30px" }}
    >
      <div className="relative flex h-full flex-col rounded-2xl border border-border/60 bg-surface p-6 shadow-sm transition-shadow duration-300 sm:p-7">
        {/* Background quote icon */}
        <div
          className="pointer-events-none absolute bottom-4 right-4 select-none"
          aria-hidden="true"
        >
          <Quote className="h-20 w-20 text-primary/[0.04]" />
        </div>

        {/* Rating */}
        <div
          className="mb-3 flex gap-1"
          aria-label={`${testimonial.rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < testimonial.rating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-none text-border"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="relative flex-1 text-sm leading-relaxed text-text-secondary">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
          <motion.div
            className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/10"
            whileHover={{
              scale: 1.08,
              boxShadow: "0 0 0 4px rgba(14,124,123,0.15)",
            }}
          >
            <Image
              src={testimonial.imageUrl}
              alt={testimonial.name}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </motion.div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-text-primary">
                {testimonial.name}
              </span>
              <motion.span
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                aria-label="Verified patient"
              >
                <ShieldCheck
                  className="h-3 w-3 text-primary"
                  aria-hidden="true"
                />
              </motion.span>
            </div>
            <p className="text-xs text-text-secondary">
              {testimonial.location} &middot; {testimonial.department}
            </p>
            <p className="mt-0.5 text-[11px] font-medium text-text-secondary">
              Visited {testimonial.visitDate}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
