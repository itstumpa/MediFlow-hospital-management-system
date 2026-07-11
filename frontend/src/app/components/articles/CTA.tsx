"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Stethoscope } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="mx-auto max-w-page px-4 py-12 md:px-6 lg:px-8">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-[#0a5f5e] p-8 md:p-12 lg:p-16"
      >
        {/* Decorative */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
          <svg
            className="absolute left-[15%] top-[10%] h-32 w-32 text-white/5"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path
              d="M50 20v60M20 50h60"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <circle
              cx="50"
              cy="50"
              r="35"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </div>

        <div className="relative text-center">
          <motion.h2
            variants={staggerItem}
            className="mb-4 text-2xl font-bold text-white md:text-3xl lg:text-4xl"
          >
            Need Medical Advice?
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="mx-auto mb-8 max-w-xl text-base text-white/80"
          >
            Our specialists are here to help you with personalized medical
            guidance and compassionate care.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-primary-dark shadow-lg transition-all hover:bg-accent hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Calendar className="h-5 w-5" aria-hidden="true" />
              Book Appointment
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <Link
              href="/doctors"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Stethoscope className="h-5 w-5" aria-hidden="true" />
              Find a Doctor
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
