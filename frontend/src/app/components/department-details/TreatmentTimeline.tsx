"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import type { TreatmentStep } from "@/lib/data/department-detail";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "./SharedMotionVariants";

interface Props {
  steps: TreatmentStep[];
}

export function TreatmentTimeline({ steps }: Props) {
  return (
    <AnimatedSection className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Your Treatment Journey"
          subtitle="A step-by-step guide to what you can expect during your treatment experience."
        />

        {/* Desktop: Horizontal timeline */}
        <div className="hidden lg:block">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="relative"
          >
            {/* Connecting line */}
            <div className="absolute left-[calc(50%_-_1px)] top-12 h-0.5 w-full -translate-y-1/2">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.5,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.3,
                }}
                className="h-full origin-left"
                style={{
                  background:
                    "linear-gradient(90deg, #0e7c7b, #2dd4bf, #0e7c7b)",
                }}
              />
            </div>

            <div className="grid grid-cols-7 gap-4">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.step}
                  variants={staggerItem}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step number */}
                  <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-base font-bold text-white shadow-md">
                    {step.step}
                  </div>

                  {/* Arrow (except last) */}
                  {idx < steps.length - 1 && (
                    <div
                      className="absolute left-[calc(50%_+_28px)] top-6 hidden text-primary/30 lg:block"
                      aria-hidden="true"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-sm font-semibold text-text-primary">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="lg:hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="relative ml-4 pl-8"
          >
            {/* Vertical line */}
            <div className="absolute left-[15px] top-0 h-full w-0.5 bg-primary/20" />

            {steps.map((step) => (
              <motion.div
                key={step.step}
                variants={staggerItem}
                className="relative pb-10 last:pb-0"
              >
                {/* Dot */}
                <div className="absolute -left-8 flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary bg-surface">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {step.step}
                    </span>
                    <h3 className="text-sm font-semibold text-text-primary">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
