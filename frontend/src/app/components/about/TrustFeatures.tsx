"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { motion } from "framer-motion";
import {
  Ambulance,
  Award,
  BadgeCheck,
  HeartPulse,
  Lock,
  Microscope,
  Shield,
  UserRound,
} from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Experienced Specialists",
    description:
      "Board-certified physicians with decades of combined experience across all major medical specialties.",
  },
  {
    icon: Microscope,
    title: "Advanced Technology",
    description:
      "State-of-the-art diagnostic and treatment equipment for precise, effective medical care.",
  },
  {
    icon: UserRound,
    title: "Personalized Care",
    description:
      "Tailored treatment plans designed around each patient's unique needs and medical history.",
  },
  {
    icon: Shield,
    title: "Patient Safety",
    description:
      "Rigorous safety protocols and infection control measures to ensure a secure healthcare environment.",
  },
  {
    icon: BadgeCheck,
    title: "Evidence-Based Medicine",
    description:
      "Clinically proven treatments backed by the latest medical research and best practices.",
  },
  {
    icon: Ambulance,
    title: "24/7 Emergency",
    description:
      "Round-the-clock emergency services with rapid response teams and fully equipped ambulances.",
  },
  {
    icon: HeartPulse,
    title: "Modern Facilities",
    description:
      "Comfortable, modern facilities designed to promote healing and provide a stress-free experience.",
  },
  {
    icon: Lock,
    title: "Secure Medical Records",
    description:
      "Encrypted digital health records with strict privacy controls, ensuring your data stays confidential.",
  },
];

export function TrustFeatures() {
  const reduced = useReducedMotion();

  return (
    <AnimatedSection className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Why Patients Trust Us"
          subtitle="Discover what makes MediFlow the preferred choice for thousands of patients seeking quality healthcare."
        />

        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={reduced ? undefined : { once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={reduced ? undefined : staggerItem}
                whileHover={
                  reduced
                    ? undefined
                    : {
                        y: -6,
                        scale: 1.02,
                        transition: { duration: 0.3, ease: "easeOut" },
                      }
                }
                className="group rounded-xl border border-border bg-background p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 transition-colors duration-300 group-hover:bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
