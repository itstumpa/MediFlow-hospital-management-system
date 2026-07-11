"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  ChartNoAxesCombined,
  HeartPulse,
  Stethoscope,
  Syringe,
  UserRoundCheck,
} from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    title: "Book Appointment",
    description:
      "Schedule your visit online or by phone. Choose your preferred doctor, date, and time slot.",
    number: "01",
  },
  {
    icon: Stethoscope,
    title: "Consultation",
    description:
      "Meet with our specialist for a thorough evaluation of your health concerns and medical history.",
    number: "02",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Diagnosis",
    description:
      "Advanced diagnostic tests and imaging provide accurate insights for a precise diagnosis.",
    number: "03",
  },
  {
    icon: Syringe,
    title: "Treatment",
    description:
      "Evidence-based treatment plans tailored to your condition, administered by expert medical teams.",
    number: "04",
  },
  {
    icon: HeartPulse,
    title: "Recovery",
    description:
      "Comprehensive post-treatment care with regular monitoring to ensure optimal recovery.",
    number: "05",
  },
  {
    icon: UserRoundCheck,
    title: "Follow-up",
    description:
      "Ongoing support and follow-up consultations to track progress and maintain your health.",
    number: "06",
  },
];

export function HealthcareProcess() {
  const reduced = useReducedMotion();

  return (
    <AnimatedSection className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Our Healthcare Process"
          subtitle="A seamless, patient-centric approach from appointment booking to recovery and follow-up care."
        />

        <div className="relative mx-auto max-w-4xl">
          {/* Desktop horizontal layout */}
          <div className="hidden lg:block">
            {/* Connecting line */}
            <svg
              className="absolute top-[52px] left-[4%] right-[4%] h-0.5 w-[92%]"
              viewBox="0 0 100 1"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.line
                x1="0"
                y1="0.5"
                x2="100"
                y2="0.5"
                stroke="#e1e8e8"
                strokeWidth="2"
                strokeDasharray="6 4"
                initial={reduced ? undefined : { pathLength: 0 }}
                whileInView={reduced ? undefined : { pathLength: 1 }}
                viewport={reduced ? undefined : { once: true }}
                transition={
                  reduced ? undefined : { duration: 2.5, ease: "easeInOut" }
                }
              />
            </svg>

            <div className="grid grid-cols-6 gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={reduced ? undefined : { opacity: 0, y: 30 }}
                    whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
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
                    className="flex flex-col items-center text-center"
                  >
                    {/* Number */}
                    <span className="text-xs font-bold text-primary/30">
                      {step.number}
                    </span>

                    {/* Icon */}
                    <motion.div
                      whileHover={
                        reduced
                          ? undefined
                          : { scale: 1.12, transition: { duration: 0.2 } }
                      }
                      className="mt-2 flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-border bg-background shadow-sm"
                    >
                      <Icon
                        className="h-8 w-8 text-primary"
                        aria-hidden="true"
                      />
                    </motion.div>

                    {/* Arrow indicator */}
                    {index < steps.length - 1 && (
                      <div className="mt-1 text-border" aria-hidden="true">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M6 3l7 7-7 7" />
                        </svg>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="mt-2 text-xs font-semibold text-text-primary">
                      {step.title}
                    </h3>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile / tablet vertical layout */}
          <div className="lg:hidden">
            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-[35px] top-2 bottom-2 w-0.5 bg-border"
                aria-hidden="true"
              />

              <div className="space-y-10">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.title}
                      initial={reduced ? undefined : { opacity: 0, x: -20 }}
                      whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                      viewport={
                        reduced ? undefined : { once: true, amount: 0.3 }
                      }
                      transition={
                        reduced
                          ? undefined
                          : {
                              duration: 0.5,
                              delay: index * 0.1,
                              ease: [0.25, 0.1, 0.25, 1],
                            }
                      }
                      className="relative pl-20"
                    >
                      {/* Step number badge */}
                      <span className="absolute left-0 top-1 flex h-[70px] w-[70px] items-center justify-center rounded-2xl border border-border bg-surface shadow-sm">
                        <Icon
                          className="h-8 w-8 text-primary"
                          aria-hidden="true"
                        />
                      </span>

                      <span className="inline-flex items-center rounded-full bg-primary/5 px-3 py-0.5 text-xs font-semibold text-primary">
                        Step {step.number}
                      </span>
                      <h3 className="mt-1 text-lg font-semibold text-text-primary">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                        {step.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
