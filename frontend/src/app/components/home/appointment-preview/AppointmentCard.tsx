"use client";

import { motion } from "framer-motion";
import { CalendarDays, ChevronDown, Star } from "lucide-react";
import Image from "next/image";
import { BookingSteps } from "./BookingSteps";
import { TimeSlots } from "./TimeSlots";
import { TrustBadges } from "./TrustBadges";

const cardVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const floatVariants = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export function AppointmentCard() {
  return (
    <motion.div
      variants={cardVariants}
      animate={["visible", "animate"]}
      className="relative"
    >
      <motion.div
        className="overflow-hidden rounded-2xl border border-white/20 bg-white/70 backdrop-blur-xl shadow-xl shadow-primary/5"
        variants={floatVariants}
      >
        {/* Inner glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-40"
          aria-hidden="true"
        />

        <div className="relative p-5 sm:p-6 md:p-7">
          {/* Progress Steps */}
          <BookingSteps />

          {/* Doctor Info */}
          <div className="mb-5 flex items-center gap-4 rounded-xl bg-primary/[0.04] p-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-2 ring-primary/20">
              <Image
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&h=120&fit=crop&crop=face"
                alt="Dr. Sarah Johnson"
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold text-text-primary">
                Dr. Sarah Johnson
              </h3>
              <p className="text-sm font-medium text-text-secondary">
                Cardiologist
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <div className="flex" aria-label="4.9 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3.5 w-3.5 ${
                        star <= 4
                          ? "fill-amber-400 text-amber-400"
                          : "fill-amber-400/70 text-amber-400/70"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-amber-600">
                  4.9
                </span>
              </div>
            </div>
          </div>

          {/* Mock Date Picker */}
          <div className="mb-4">
            <label
              htmlFor="mock-date"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-secondary"
            >
              Select Date
            </label>
            <div className="relative">
              <div
                id="mock-date"
                className="flex cursor-not-allowed items-center gap-3 rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm text-text-primary opacity-80"
                aria-disabled="true"
              >
                <CalendarDays
                  className="h-4 w-4 text-primary"
                  aria-hidden="true"
                />
                <span className="font-medium">June 15, 2026</span>
                <ChevronDown
                  className="ml-auto h-4 w-4 text-text-secondary"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* Time Slots */}
          <div className="mb-4">
            <TimeSlots />
          </div>

          {/* Patient Name (mock) */}
          <div className="mb-4">
            <label
              htmlFor="mock-patient"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-secondary"
            >
              Patient
            </label>
            <input
              id="mock-patient"
              type="text"
              defaultValue="John Doe"
              readOnly
              aria-readonly="true"
              className="w-full rounded-xl border border-border bg-surface/50 px-4 py-3.5 text-sm text-text-primary outline-none"
            />
          </div>

          {/* Appointment Type (mock) */}
          <div className="mb-5">
            <label
              htmlFor="mock-type"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-secondary"
            >
              Appointment
            </label>
            <div className="relative">
              <div
                id="mock-type"
                className="flex cursor-not-allowed items-center gap-3 rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm text-text-primary opacity-80"
                aria-disabled="true"
              >
                <span className="font-medium">In-person</span>
                <ChevronDown
                  className="ml-auto h-4 w-4 text-text-secondary"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* Book Button */}
          <motion.button
            type="button"
            className="w-full rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgba(14,124,123,0.3)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Book Appointment
          </motion.button>

          {/* Divider */}
          <div className="my-4 border-t border-border/60" />

          {/* Trust Badges */}
          <TrustBadges />
        </div>
      </motion.div>
    </motion.div>
  );
}
