"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { CTAButtons } from "./CTAButtons";
import { RatingSummary } from "./RatingSummary";
import { ReviewStats } from "./ReviewStats";
import type { Testimonial } from "./TestimonialCard";
import { TestimonialCarousel } from "./TestimonialCarousel";

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    location: "New York",
    quote:
      "The booking process was effortless, and the doctor explained everything clearly. The entire experience was smooth and professional.",
    rating: 5,
    doctorName: "Dr. James Mitchell",
    department: "Cardiology Patient",
    visitDate: "May 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Michael Chen",
    location: "San Francisco",
    quote:
      "I had a video consultation and it felt just like an in-person visit. The doctor was attentive, and I got my prescription digitally within minutes.",
    rating: 5,
    doctorName: "Dr. Ayesha Khan",
    department: "Pediatrics Patient",
    visitDate: "June 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Emily Rodriguez",
    location: "Miami",
    quote:
      "I was able to book a same-day appointment with a specialist when my regular doctor was unavailable. MediFlow truly prioritizes patient care.",
    rating: 5,
    doctorName: "Dr. Sarah Rahman",
    department: "Cardiology Patient",
    visitDate: "April 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "David Kim",
    location: "Los Angeles",
    quote:
      "The online booking system saved me hours of waiting. I booked my appointment in under a minute and the doctor was extremely professional.",
    rating: 5,
    doctorName: "Dr. Robert Chen",
    department: "Orthopedics Patient",
    visitDate: "March 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Priya Patel",
    location: "Chicago",
    quote:
      "Accessing my lab reports online was incredibly convenient. I could share them with my doctor instantly. Modern healthcare at its finest!",
    rating: 5,
    doctorName: "Dr. Rohit Sharma",
    department: "Dermatology Patient",
    visitDate: "June 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function Testimonials() {
  return (
    <section
      className="relative overflow-hidden bg-surface py-6 md:py-10 lg:py-16"
      aria-labelledby="testimonials-heading"
    >
      {/* Decorative background elements */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-primary/[0.03] blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/[0.03] blur-3xl" />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.012]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="testimonials-dots"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#testimonials-dots)" />
        </svg>
      </div>

      <motion.div
        className="relative mx-auto max-w-page px-4 md:px-6 lg:px-8"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Badge */}
        <motion.div variants={fadeUpVariants} className="text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Patient Stories
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          id="testimonials-heading"
          variants={fadeUpVariants}
          className="text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
        >
          What Our Patients Say
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeUpVariants}
          className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-text-secondary sm:text-lg"
        >
          Real experiences from patients who trust MediFlow for their healthcare
          journey.
        </motion.p>

        {/* Rating Summary */}
        <motion.div variants={fadeUpVariants} className="mt-8">
          <RatingSummary />
        </motion.div>

        {/* Carousel */}
        <motion.div variants={fadeUpVariants}>
          <TestimonialCarousel testimonials={testimonials} />
        </motion.div>

        {/* Review Stats */}
        <motion.div variants={fadeUpVariants}>
          <ReviewStats />
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUpVariants} className="mt-10 text-center">
          <p className="mb-6 text-xl font-semibold text-text-primary sm:text-2xl">
            Ready to Experience Better Healthcare?
          </p>
          <CTAButtons />
        </motion.div>
      </motion.div>
    </section>
  );
}
