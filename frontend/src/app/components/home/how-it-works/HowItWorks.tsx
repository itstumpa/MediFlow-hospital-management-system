"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  HeartPulse,
  Search,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { CTAButtons } from "./CTAButtons";
import { Timeline } from "./Timeline";

interface Step {
  stepNumber: number;
  icon: typeof Search;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    stepNumber: 1,
    icon: Search,
    title: "Search Doctor",
    description: "Browse doctors by specialty, location, or availability.",
  },
  {
    stepNumber: 2,
    icon: Calendar,
    title: "Choose Schedule",
    description: "Select a convenient date and available time slot.",
  },
  {
    stepNumber: 3,
    icon: ShieldCheck,
    title: "Confirm Booking",
    description: "Securely confirm your appointment in seconds.",
  },
  {
    stepNumber: 4,
    icon: Stethoscope,
    title: "Visit or Consult",
    description: "Meet your doctor in person or online.",
  },
  {
    stepNumber: 5,
    icon: HeartPulse,
    title: "Receive Follow-up",
    description: "Access prescriptions, reports, and follow-up care.",
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

export function HowItWorks() {
  return (
    <section
      className="relative overflow-hidden bg-surface py-6 md:py-10 lg:py-16"
      aria-labelledby="how-it-works-heading"
    >
      {/* Decorative background elements */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Soft blurred gradient - top right */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/[0.03] blur-3xl" />
        {/* Soft blurred gradient - bottom left */}
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/[0.03] blur-3xl" />
        {/* Subtle cross/plus medical pattern */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.012]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="how-it-works-crosses"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M20 8v24M8 20h24"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#how-it-works-crosses)" />
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
            <HeartPulse className="h-4 w-4" aria-hidden="true" />
            Simple Process
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          id="how-it-works-heading"
          variants={fadeUpVariants}
          className="text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
        >
          How It Works
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeUpVariants}
          className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-text-secondary sm:text-lg"
        >
          Book an appointment and receive expert medical care in just a few
          simple steps.
        </motion.p>

        {/* Timeline */}
        <motion.div variants={fadeUpVariants} className="mt-12 lg:mt-16">
          <Timeline steps={steps} />
        </motion.div>

        {/* CTA */}
        <CTAButtons />
      </motion.div>
    </section>
  );
}
