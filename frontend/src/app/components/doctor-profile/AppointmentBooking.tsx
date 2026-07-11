"use client";

import { fadeUp } from "@/lib/animations/fade";
import { staggerContainer } from "@/lib/animations/stagger";
import type { Doctor } from "@/lib/data/doctors";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface AppointmentBookingProps {
  doctor: Doctor;
}

export function AppointmentBooking({ doctor }: AppointmentBookingProps) {
  return (
    <section>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-[#063f3e] px-6 py-12 md:px-12 md:py-16"
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="relative text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl font-bold text-white md:text-3xl"
          >
            Book an Appointment with {doctor.name.split(" ").pop()}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto mt-3 max-w-lg text-sm text-white/70"
          >
            Choose a convenient time slot and we&apos;ll confirm your
            appointment within 24 hours.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-white/60"
          >
            <span className="flex items-center gap-1.5">
              <CalendarCheck
                className="h-4 w-4 text-accent"
                aria-hidden="true"
              />
              Free Cancellation
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
              24hr Confirmation
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
              Secure Booking
            </span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Link
              href={`/appointment?doctor=${doctor.id}`}
              className="group/btn inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-primary shadow-lg transition-all hover:bg-accent hover:text-white hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Book Now
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover/btn:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl border border-white/20 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Have a Question?
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
