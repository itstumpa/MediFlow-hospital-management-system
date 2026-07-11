"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Stethoscope } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="my-12 overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-[#0a5f5e] p-8 text-center md:p-12 lg:p-16"
    >
      {/* Decorative */}
      <div className="pointer-events-none relative" aria-hidden="true">
        <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative">
        <motion.h2
          variants={staggerItem}
          className="mb-4 text-2xl font-bold text-white md:text-3xl lg:text-4xl"
        >
          Ready to Talk to a Specialist?
        </motion.h2>
        <motion.p
          variants={staggerItem}
          className="mx-auto mb-8 max-w-xl text-base text-white/80"
        >
          Our expert doctors are here to provide personalized care and answer
          all your health questions.
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
            Find Doctor
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
