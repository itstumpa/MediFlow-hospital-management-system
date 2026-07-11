"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  Clock,
  FileText,
  ShieldCheck,
  Star,
  Stethoscope,
  Video,
} from "lucide-react";
import { CTAButtons } from "./CTAButtons";
import { FeatureRow } from "./FeatureRow";
import { TrustBadges } from "./TrustBadges";
import { TrustMetrics } from "./TrustMetrics";

const featuresRow1 = [
  {
    icon: Stethoscope,
    title: "Expert Medical Professionals",
    description: "Our certified specialists provide world-class healthcare.",
  },
  {
    icon: ShieldCheck,
    title: "Advanced Medical Technology",
    description: "Modern equipment ensures accurate diagnosis and treatment.",
  },
  {
    icon: Clock,
    title: "24/7 Emergency Support",
    description: "Healthcare assistance whenever you need it.",
  },
];

const featuresRow2 = [
  {
    icon: FileText,
    title: "Secure Medical Records",
    description: "Your personal health data remains encrypted and protected.",
  },
  {
    icon: Video,
    title: "Online Consultation",
    description:
      "Consult doctors from anywhere using secure video appointments.",
  },
  {
    icon: CalendarCheck,
    title: "Fast Appointment Scheduling",
    description:
      "Book appointments within minutes without waiting in long queues.",
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

export function WhyChoose() {
  return (
    <section
      className="relative overflow-hidden bg-background py-6"
      aria-labelledby="why-choose-heading"
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
              id="why-choose-dots"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#why-choose-dots)" />
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
            <Star className="h-4 w-4" aria-hidden="true" />
            Why Choose Us
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          id="why-choose-heading"
          variants={fadeUpVariants}
          className="text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
        >
          Why Thousands of Patients Trust MediFlow
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeUpVariants}
          className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-text-secondary sm:text-lg"
        >
          Delivering exceptional healthcare through experienced doctors, modern
          technology, and patient-centered care.
        </motion.p>

        {/* Feature Row 1 — Image left */}
        <motion.div variants={fadeUpVariants} className="mt-14 lg:mt-10">
          <FeatureRow
            features={featuresRow1}
            imageSide="left"
            illustrationVariant="doctor"
          />
        </motion.div>

        {/* Feature Row 2 — Image right */}
        <motion.div variants={fadeUpVariants} className="mt-12 lg:mt-6">
          <FeatureRow
            features={featuresRow2}
            imageSide="right"
            illustrationVariant="dashboard"
          />
        </motion.div>

        {/* Trust Metrics */}
        <motion.div variants={fadeUpVariants} className="mt-14 lg:mt-10">
          <TrustMetrics />
        </motion.div>

        {/* Trust Badges */}
        <motion.div variants={fadeUpVariants} className="mt-8">
          <TrustBadges />
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUpVariants} className="mt-10">
          <CTAButtons />
        </motion.div>
      </motion.div>
    </section>
  );
}
