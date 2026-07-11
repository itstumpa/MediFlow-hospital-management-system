"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { motion } from "framer-motion";
import { BadgeCheck, Medal, ScrollText, ShieldCheck } from "lucide-react";

const certifications = [
  {
    icon: ShieldCheck,
    title: "ISO Certified",
    description:
      "Accredited with ISO 9001:2015 for quality management systems in healthcare delivery.",
    gradient: "from-primary/10 to-accent/10",
  },
  {
    icon: Medal,
    title: "Healthcare Excellence Award",
    description:
      "Recognized for outstanding contributions to patient care and medical innovation (2023, 2024).",
    gradient: "from-accent/10 to-primary/10",
  },
  {
    icon: BadgeCheck,
    title: "Best Patient Care",
    description:
      "Awarded 'Best Patient Care Facility' by the National Health Association for three consecutive years.",
    gradient: "from-primary-dark/10 to-accent/10",
  },
  {
    icon: ScrollText,
    title: "National Medical Association",
    description:
      "Full accreditation from the National Medical Association meeting all clinical and safety standards.",
    gradient: "from-accent/10 to-primary-dark/10",
  },
];

export function Certifications() {
  const reduced = useReducedMotion();

  return (
    <AnimatedSection className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Awards &amp; Certifications"
          subtitle="Our commitment to excellence has been recognized by leading healthcare organizations worldwide."
        />

        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={reduced ? undefined : { once: true, amount: 0.2 }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {certifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.title}
                variants={reduced ? undefined : staggerItem}
                whileHover={
                  reduced
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.03,
                        transition: { duration: 0.3, ease: "easeOut" },
                      }
                }
                className="group relative overflow-hidden rounded-2xl border border-border bg-background p-6 text-center shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 bg-gradient-to-br transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className={`relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${cert.gradient} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-10 w-10 text-primary" aria-hidden="true" />
                </div>

                {/* Title */}
                <h3 className="relative text-lg font-semibold text-text-primary">
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="relative mt-3 text-sm leading-relaxed text-text-secondary">
                  {cert.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
