"use client";

import { fadeUp } from "@/lib/animations/fade";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  HeadphonesIcon,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export function DoctorsCTA() {
  return (
    <section aria-label="Need help choosing a doctor">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-[#063f3e] px-6 py-14 md:px-14 md:py-20"
      >
        {/* Background decorations */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute left-1/3 top-1/3 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm"
          >
            <HeadphonesIcon
              className="h-8 w-8 text-accent"
              aria-hidden="true"
            />
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-white md:text-4xl lg:text-5xl"
          >
            Need Help Choosing a Doctor?
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70"
          >
            Our care team is here to help you find the right specialist based on
            your symptoms, preferences, and insurance.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/60"
          >
            <span className="flex items-center gap-1.5">
              <CalendarCheck
                className="h-4 w-4 text-accent"
                aria-hidden="true"
              />
              Free Consultation
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
              No Obligation
            </span>
            <span className="flex items-center gap-1.5">
              <MessageCircle
                className="h-4 w-4 text-accent"
                aria-hidden="true"
              />
              Talk to a Specialist
            </span>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group/btn inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-primary shadow-lg transition-all hover:bg-accent hover:text-white hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get Help Now
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="tel:+1800-123-4567"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <HeadphonesIcon className="h-4 w-4" aria-hidden="true" />
              Call 1-800-123-4567
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
