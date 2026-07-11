"use client";

import { Button } from "@/app/components/ui/Button";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { motion } from "framer-motion";
import {
  Ambulance,
  BadgeCheck,
  CalendarCheck,
  ChevronRight,
  Star,
  Stethoscope,
} from "lucide-react";

const floatingItems = [
  {
    icon: BadgeCheck,
    label: "Quality Care",
    delay: 0,
    className: "top-[10%] left-[5%]",
  },
  {
    icon: Star,
    label: "4.9 Rating",
    delay: 0.5,
    className: "top-[20%] right-[8%]",
  },
  {
    icon: Ambulance,
    label: "24/7 Support",
    delay: 1.0,
    className: "bottom-[15%] left-[10%]",
  },
  {
    icon: Stethoscope,
    label: "Expert Doctors",
    delay: 1.5,
    className: "bottom-[25%] right-[5%]",
  },
];

export function CTA() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#0a4a4a] py-20 md:py-28">
      {/* Background decorations */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 h-60 w-60 rounded-full bg-accent/5 blur-2xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Floating cards */}
      {!reduced &&
        floatingItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: item.delay,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={`pointer-events-none absolute hidden lg:block ${item.className}`}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay,
                }}
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur-sm"
              >
                <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="text-sm font-medium text-gray-800">
                  {item.label}
                </span>
              </motion.div>
            </motion.div>
          );
        })}

      <div className="relative mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={reduced ? undefined : { once: true }}
            transition={
              reduced
                ? undefined
                : { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
            }
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-accent backdrop-blur-sm"
          >
            <CalendarCheck size={16} aria-hidden="true" />
            <span>Start Your Journey</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={reduced ? undefined : { once: true }}
            transition={
              reduced
                ? undefined
                : { duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }
            }
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Ready to Experience Better Healthcare?
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={reduced ? undefined : { once: true }}
            transition={
              reduced
                ? undefined
                : { duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }
            }
            className="mx-auto mt-4 max-w-xl text-lg text-white/70"
          >
            Join thousands of patients who trust MediFlow for their healthcare
            needs. Your journey to better health starts here.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={reduced ? undefined : { once: true }}
            transition={
              reduced
                ? undefined
                : { duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }
            }
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Button
              variant="secondary"
              size="lg"
              href="/appointment"
              className="group gap-2"
              ariaLabel="Book Appointment"
            >
              <span>Book Appointment</span>
              <ChevronRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/doctors"
              className="border-white/30 text-white hover:bg-white hover:text-primary-dark"
              ariaLabel="Find a Doctor"
            >
              <Stethoscope size={18} aria-hidden="true" />
              <span>Find a Doctor</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
