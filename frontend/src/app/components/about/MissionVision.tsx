"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { cardHover } from "@/lib/animations/hover";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { motion } from "framer-motion";
import { Eye, HeartHandshake, Target } from "lucide-react";

const cards = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To make quality healthcare accessible, efficient, and patient-friendly. We bridge the gap between patients and healthcare providers through innovative solutions, ensuring everyone receives the care they deserve.",
    gradient: "from-primary/10 to-accent/10",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    glowColor: "rgba(14,124,123,0.15)",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To be the leading digital healthcare platform, setting the standard for integrated, technology-driven healthcare that puts patients first and empowers medical professionals to deliver their best.",
    gradient: "from-accent/10 to-primary/10",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    glowColor: "rgba(45,212,191,0.15)",
  },
  {
    icon: HeartHandshake,
    title: "Core Values",
    description:
      "Compassion, integrity, innovation, and excellence guide every decision we make. We believe in treating every patient with dignity, leveraging technology for better outcomes, and continuously raising the bar in healthcare delivery.",
    gradient: "from-primary/10 to-primary-dark/10",
    iconBg: "bg-primary-dark/10",
    iconColor: "text-primary-dark",
    glowColor: "rgba(10,95,94,0.15)",
  },
];

export function MissionVision() {
  const reduced = useReducedMotion();

  return (
    <AnimatedSection className="bg-background py-6 md:py-16">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Mission, Vision &amp; Values"
          subtitle="Our guiding principles that drive us to deliver exceptional healthcare every single day."
        />

        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={reduced ? undefined : { once: true, amount: 0.2 }}
          className="grid gap-8 md:grid-cols-3"
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={reduced ? undefined : staggerItem}
                whileHover={reduced ? undefined : cardHover.whileHover}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                {/* Hover glow effect */}
                <div
                  className="pointer-events-none absolute -inset-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(600px circle at 50% 50%, ${card.glowColor}, transparent 60%)`,
                  }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className={`relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${card.iconBg}`}
                >
                  <Icon
                    className={`h-8 w-8 ${card.iconColor}`}
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="relative text-xl font-bold text-text-primary">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="relative mt-4 text-sm leading-relaxed text-text-secondary">
                  {card.description}
                </p>

                {/* Bottom accent bar */}
                <div
                  className={`absolute bottom-0 left-0 h-1 w-0 rounded-full bg-gradient-to-r ${card.gradient} transition-all duration-500 group-hover:w-full`}
                  aria-hidden="true"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
