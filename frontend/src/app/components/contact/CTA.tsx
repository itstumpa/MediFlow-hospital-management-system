"use client";

import { Button } from "@/app/components/ui/Button";
import { fadeUp } from "@/lib/animations/fade";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { motion } from "framer-motion";
import { ArrowRight, HeartPulse, Stethoscope } from "lucide-react";

export function CTA() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#0a4a4a] py-16 md:py-24">
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-2xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25px 25px, white 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <motion.div
          variants={reduced ? undefined : fadeUp}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={reduced ? undefined : { once: true, amount: 0.1 }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
            <HeartPulse className="h-8 w-8 text-accent" aria-hidden="true" />
          </div>

          {/* Heading */}
          <h2 className="mt-6 text-[28px] font-bold leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            Need Help Choosing the{" "}
            <span className="text-accent">Right Doctor?</span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Our team can help match you with the perfect specialist based on
            your symptoms, preferences, and schedule. Get the care you deserve
            today.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              href="/appointment"
              className="bg-white text-primary-dark hover:bg-white/90"
            >
              <Stethoscope className="h-5 w-5" aria-hidden="true" />
              Book Appointment
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/doctors"
              className="border-white/30 text-white hover:bg-white hover:text-primary-dark"
            >
              View Doctors
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
