"use client";

import { motion } from "framer-motion";
import { ChevronRight, Calendar, Phone } from "lucide-react";
import { staggerContainer, staggerItem } from "./SharedMotionVariants";
import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { Button } from "@/app/components/ui/Button";
import type { Department } from "@/lib/data/departments";

interface Props {
  department: Department;
}

export function CTASection({ department }: Props) {
  return (
    <AnimatedSection className="relative overflow-hidden py-20 md:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-[#0a5f5e]" />

      {/* Decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/[0.03]" />
        <div className="absolute -right-32 -bottom-32 h-80 w-80 rounded-full bg-accent/[0.04]" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-white/[0.02]" />
      </div>

      <div className="relative mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Icon */}
          <motion.div variants={staggerItem} className="mx-auto mb-6">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <department.icon size={32} className="text-accent" aria-hidden="true" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={staggerItem}
            className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          >
            Ready to Prioritize Your{" "}
            <span className="text-accent">
              {department.name.split("(")[0].trim()}
            </span>{" "}
            Health?
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={staggerItem}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/80"
          >
            Take the first step towards better health. Our expert team is here to
            provide you with world-class care and personalized treatment options.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={staggerItem}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Button
              variant="secondary"
              size="lg"
              href="/appointment"
              className="group"
            >
              <Calendar size={18} aria-hidden="true" />
              Book Your Appointment Today
              <ChevronRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/contact"
              className="border-white/30 text-white hover:bg-white hover:text-primary-dark"
            >
              <Phone size={18} aria-hidden="true" />
              Contact Us
            </Button>
          </motion.div>

          {/* Bottom text */}
          <motion.p variants={staggerItem} className="mt-6 text-sm text-white/50">
            Same-day appointments available. Most insurance plans accepted.
          </motion.p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
