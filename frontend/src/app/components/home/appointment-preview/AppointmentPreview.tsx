"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { AppointmentButtons } from "./AppointmentButtons";
import { AppointmentCard } from "./AppointmentCard";
import { BookingBenefits } from "./BookingBenefits";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function AppointmentPreview() {
  return (
    <section
      className="relative overflow-hidden bg-background py-6 md:py-10 lg:py-16"
      aria-labelledby="appointment-heading"
    >
      {/* Decorative background elements */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Large blurred gradient circle - top left */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/[0.04] blur-3xl" />
        {/* Large blurred gradient circle - bottom right */}
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-accent/[0.04] blur-3xl" />
        {/* Subtle dot pattern overlay */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.015]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="appointment-dots"
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#appointment-dots)" />
        </svg>
      </div>

      <motion.div
        className="relative mx-auto max-w-page px-4 md:px-6 lg:px-8"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* ---- Left Column ---- */}
          <div>
            {/* Badge */}
            <motion.div variants={fadeUpVariants}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Appointment Booking
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h2
              id="appointment-heading"
              variants={fadeUpVariants}
              className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
            >
              Book Your Appointment <br />
              <span className="text-primary">in Minutes</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeUpVariants}
              className="mt-4 max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg"
            >
              Choose your preferred doctor, specialty, date, and time with our
              secure and easy-to-use appointment system.
            </motion.p>

            {/* Benefits */}
            <motion.div variants={fadeUpVariants} className="mt-8">
              <BookingBenefits />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUpVariants} className="mt-8">
              <AppointmentButtons />
            </motion.div>
          </div>

          {/* ---- Right Column: Booking Card ---- */}
          <div className="lg:pl-4">
            <AppointmentCard />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
