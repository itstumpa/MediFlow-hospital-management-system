"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.8,
      staggerChildren: 0.15,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function CTAButtons() {
  return (
    <motion.div
      className="mt-14 text-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      <motion.p
        variants={buttonVariants}
        className="mb-6 text-xl font-semibold text-text-primary sm:text-2xl"
      >
        Need Medical Assistance?
      </motion.p>

      <motion.div
        variants={buttonVariants}
        className="flex flex-wrap justify-center gap-4"
      >
        <Link
          href="/appointment"
          className="group inline-flex items-center gap-2.5 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Calendar className="h-5 w-5" aria-hidden="true" />
          Book Appointment
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>

        <Link
          href="/about"
          className="group inline-flex items-center gap-2.5 rounded-xl border-2 border-primary/30 bg-surface px-7 py-3.5 text-base font-semibold text-primary transition-all duration-300 hover:scale-[1.03] hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Learn More
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}
