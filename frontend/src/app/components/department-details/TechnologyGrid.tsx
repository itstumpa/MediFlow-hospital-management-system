"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { staggerContainer, staggerItem, iconRotate } from "./SharedMotionVariants";
import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import type { TechnologyDetail } from "@/lib/data/department-detail";

interface Props {
  technologies: TechnologyDetail[];
}

export function TechnologyGrid({ technologies }: Props) {
  return (
    <AnimatedSection className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Our Medical Technology"
          subtitle="State-of-the-art equipment and technology for accurate diagnosis and effective treatment."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                variants={staggerItem}
                whileHover="hover"
                initial="rest"
                className="group cursor-default rounded-xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
              >
                {/* Header */}
                <div className="flex items-center gap-4">
                  <motion.div
                    variants={iconRotate}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary"
                  >
                    <Icon size={24} aria-hidden="true" />
                  </motion.div>
                  <h3 className="text-base font-semibold text-text-primary">
                    {tech.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  {tech.description}
                </p>

                {/* Benefits */}
                <div className="mt-4 space-y-1.5">
                  {tech.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-center gap-2 text-xs text-text-secondary"
                    >
                      <CheckCircle
                        size={13}
                        className="shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
