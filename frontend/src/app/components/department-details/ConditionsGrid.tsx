"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { staggerContainer, staggerItem, cardHover, iconRotate } from "./SharedMotionVariants";
import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import type { ConditionItem } from "@/lib/data/department-detail";

interface Props {
  conditions: ConditionItem[];
  departmentName: string;
  color: string;
}

export function ConditionsGrid({ conditions, departmentName, color }: Props) {
  return (
    <AnimatedSection className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Conditions We Treat"
          subtitle={`Comprehensive care for a wide range of ${departmentName.toLowerCase()} conditions.`}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {conditions.map((condition) => {
            const Icon = condition.icon;
            return (
              <motion.div
                key={condition.name}
                variants={staggerItem}
                whileHover="hover"
                initial="rest"
                className="group cursor-default rounded-xl border border-border bg-surface p-5 shadow-sm transition-shadow duration-300"
                style={
                  {
                    "--glow-color": `${color}15`,
                    "--border-color": color,
                  } as React.CSSProperties
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `var(--border-color)`;
                  e.currentTarget.style.boxShadow = `0 0 0 1px ${color}20, 0 8px 30px ${color}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                {/* Icon */}
                <motion.div
                  variants={iconRotate}
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${color}12`, color }}
                >
                  <Icon size={24} aria-hidden="true" />
                </motion.div>

                {/* Title */}
                <h3 className="text-base font-semibold text-text-primary">
                  {condition.name}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {condition.description}
                </p>

                {/* Hover indicator */}
                <motion.div
                  className="mt-3 flex items-center gap-1 text-xs font-medium"
                  style={{ color }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <Activity size={12} aria-hidden="true" />
                  <span>Learn more</span>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
