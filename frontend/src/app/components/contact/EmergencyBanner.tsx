"use client";

import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { motion } from "framer-motion";
import { HeartPulse, PhoneCall } from "lucide-react";
import Link from "next/link";

export function EmergencyBanner() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-danger via-danger/90 to-danger/80 py-14 md:py-20">
      {/* Pulse animation background */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          animate={
            reduced
              ? undefined
              : {
                  scale: [1, 1.8, 1],
                  opacity: [0.1, 0, 0.1],
                }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10"
        />
        <motion.div
          animate={
            reduced
              ? undefined
              : {
                  scale: [1, 1.4, 1],
                  opacity: [0.08, 0, 0.08],
                }
          }
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-1/2 left-1/3 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10"
        />
        <motion.div
          animate={
            reduced
              ? undefined
              : {
                  scale: [1, 1.6, 1],
                  opacity: [0.06, 0, 0.06],
                }
          }
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/2 right-1/4 h-56 w-56 -translate-y-1/2 rounded-full bg-white/10"
        />
      </div>

      <div className="relative mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Heart pulse icon */}
          <motion.div
            animate={
              reduced
                ? undefined
                : {
                    scale: [1, 1.1, 1],
                  }
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm"
          >
            <HeartPulse className="h-8 w-8 text-white" aria-hidden="true" />
          </motion.div>

          {/* Title */}
          <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Need Immediate Medical Assistance?
          </h2>

          {/* Description */}
          <p className="mt-3 max-w-xl text-base text-white/80">
            Our emergency team is available 24/7. Don&apos;t wait — call us now
            for immediate care.
          </p>

          {/* Emergency Hotline */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+1 (249) 752-5000"
              className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-bold text-danger shadow-lg transition-all duration-200 hover:bg-white/90 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Call emergency hotline: plus 1 (249) 752-5000"
            >
              <PhoneCall className="h-6 w-6" aria-hidden="true" />
              +1 (249) 752-5000
            </a>
          </div>

          {/* CTA */}
          <div className="mt-6">
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded"
            >
              Or book a non-emergency appointment
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
