"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { motion } from "framer-motion";
import { Building2, Goal, Rocket, Stethoscope } from "lucide-react";

const milestones = [
  {
    year: "2005",
    title: "Foundation",
    description:
      "MediFlow was founded with a vision to provide compassionate, accessible healthcare for every patient.",
    icon: Building2,
  },
  {
    year: "2012",
    title: "Growth",
    description:
      "Expanded to a multi-specialty hospital with cutting-edge diagnostic equipment and a world-class team.",
    icon: Stethoscope,
  },
  {
    year: "2018",
    title: "Milestones",
    description:
      "Received national accreditation and treated our 5,000th patient, marking a significant milestone in our journey.",
    icon: Goal,
  },
  {
    year: "2024",
    title: "Future Vision",
    description:
      "Pioneering digital healthcare with AI-assisted diagnostics, telemedicine, and a patient-first digital ecosystem.",
    icon: Rocket,
  },
];

export function Story() {
  const reduced = useReducedMotion();

  return (
    <AnimatedSection className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Our Story"
          subtitle="From a small clinic to a trusted multi-specialty hospital — discover how MediFlow has been transforming lives since 2005."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - Image */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, x: -30 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={reduced ? undefined : { once: true, amount: 0.2 }}
            transition={
              reduced
                ? undefined
                : { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
            }
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div
                      className="mx-auto mb-4 h-48 w-48 rounded-full bg-gradient-to-br from-primary/20 to-accent/20"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-text-secondary">
                      MediFlow Hospital — Since 2005
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative accent */}
            <div
              className="absolute -bottom-4 -right-4 -z-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl"
              aria-hidden="true"
            />
          </motion.div>

          {/* Right - Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-border"
              aria-hidden="true"
            />

            <div className="space-y-8">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <motion.div
                    key={milestone.year}
                    initial={reduced ? undefined : { opacity: 0, x: 30 }}
                    whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                    viewport={reduced ? undefined : { once: true, amount: 0.3 }}
                    transition={
                      reduced
                        ? undefined
                        : {
                            duration: 0.5,
                            delay: index * 0.15,
                            ease: [0.25, 0.1, 0.25, 1],
                          }
                    }
                    className="relative pl-14"
                  >
                    {/* Icon circle */}
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-surface shadow-sm">
                      <Icon
                        className="h-5 w-5 text-primary"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Year badge */}
                    <span className="mb-1 inline-flex items-center rounded-full bg-primary/5 px-3 py-0.5 text-xs font-semibold text-primary">
                      {milestone.year}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-text-primary">
                      {milestone.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                      {milestone.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
