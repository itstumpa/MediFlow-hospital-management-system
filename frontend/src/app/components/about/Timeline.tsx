"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { motion } from "framer-motion";
import {
  Ambulance,
  Building2,
  HeartPulse,
  Laptop,
  Sparkles,
} from "lucide-react";

const journey = [
  {
    year: "2005",
    title: "Founded",
    description:
      "MediFlow opened its doors with a vision to transform healthcare.",
    icon: Building2,
  },
  {
    year: "2010",
    title: "Expanded Services",
    description: "Added cardiology, neurology, and orthopedics departments.",
    icon: HeartPulse,
  },
  {
    year: "2015",
    title: "New Hospital Wing",
    description: "Inaugurated a state-of-the-art wing with 200+ beds.",
    icon: Ambulance,
  },
  {
    year: "2020",
    title: "Digital Healthcare",
    description: "Launched telemedicine and digital health records platform.",
    icon: Laptop,
  },
  {
    year: "2026",
    title: "10K+ Patients",
    description: "Celebrated serving over 10,000 happy patients.",
    icon: Sparkles,
  },
];

export function Timeline() {
  const reduced = useReducedMotion();

  return (
    <AnimatedSection className="bg-primary-dark py-6 md:py-16">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Our Journey"
          subtitle="From humble beginnings to a healthcare landmark — explore the milestones that shaped MediFlow."
          className="text-white [&_h2]:text-white [&_p]:text-white/60"
        />

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting line */}
            <svg
              className="absolute top-[38px] left-[8%] right-[8%] h-0.5 w-[84%]"
              viewBox="0 0 100 1"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.line
                x1="0"
                y1="0.5"
                x2="100"
                y2="0.5"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={reduced ? undefined : { pathLength: 0 }}
                whileInView={reduced ? undefined : { pathLength: 1 }}
                viewport={reduced ? undefined : { once: true }}
                transition={
                  reduced ? undefined : { duration: 2, ease: "easeInOut" }
                }
              />
            </svg>

            <div className="grid grid-cols-5 gap-6">
              {journey.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <motion.div
                    key={milestone.year}
                    initial={reduced ? undefined : { opacity: 0, y: 30 }}
                    whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
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
                    className="flex flex-col items-center text-center"
                  >
                    {/* Icon circle */}
                    <motion.div
                      initial={reduced ? undefined : { scale: 0 }}
                      whileInView={reduced ? undefined : { scale: 1 }}
                      viewport={reduced ? undefined : { once: true }}
                      transition={
                        reduced
                          ? undefined
                          : {
                              duration: 0.4,
                              delay: index * 0.15 + 0.2,
                              type: "spring",
                            }
                      }
                      className="relative z-10 flex h-[76px] w-[76px] items-center justify-center rounded-full border-2 border-white/20 bg-primary-dark shadow-lg"
                    >
                      <Icon
                        className="h-8 w-8 text-accent"
                        aria-hidden="true"
                      />
                    </motion.div>

                    {/* Arrow */}
                    {index < journey.length - 1 && (
                      <div className="mt-2 text-white/20" aria-hidden="true">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}

                    {/* Year */}
                    <span className="mt-3 inline-flex items-center rounded-full bg-accent/20 px-3 py-0.5 text-sm font-bold text-accent">
                      {milestone.year}
                    </span>

                    {/* Title */}
                    <h3 className="mt-2 text-base font-semibold text-white">
                      {milestone.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-1 text-xs leading-relaxed text-white/60">
                      {milestone.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile / tablet vertical timeline */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[31px] top-2 bottom-2 w-0.5 bg-white/10"
              aria-hidden="true"
            />

            <div className="space-y-10">
              {journey.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <motion.div
                    key={milestone.year}
                    initial={reduced ? undefined : { opacity: 0, x: -20 }}
                    whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                    viewport={reduced ? undefined : { once: true, amount: 0.3 }}
                    transition={
                      reduced
                        ? undefined
                        : {
                            duration: 0.5,
                            delay: index * 0.12,
                            ease: [0.25, 0.1, 0.25, 1],
                          }
                    }
                    className="relative pl-20"
                  >
                    {/* Icon */}
                    <div className="absolute left-0 top-0 flex h-[62px] w-[62px] items-center justify-center rounded-full border-2 border-white/20 bg-primary-dark">
                      <Icon
                        className="h-7 w-7 text-accent"
                        aria-hidden="true"
                      />
                    </div>

                    <span className="inline-flex items-center rounded-full bg-accent/20 px-3 py-0.5 text-sm font-bold text-accent">
                      {milestone.year}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-white">
                      {milestone.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/60">
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
