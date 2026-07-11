"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { Button } from "@/app/components/ui/Button";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import type { ProcedureItem } from "@/lib/data/department-detail";
import { motion } from "framer-motion";
import { Activity, ChevronRight, Clock, Scan } from "lucide-react";
import { staggerContainer, staggerItem } from "./SharedMotionVariants";

interface Props {
  procedures: ProcedureItem[];
}

export function ProceduresSection({ procedures }: Props) {
  return (
    <AnimatedSection className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Available Procedures"
          subtitle="Advanced diagnostic and treatment procedures performed by our expert team."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {procedures.map((procedure) => (
            <motion.div
              key={procedure.name}
              variants={staggerItem}
              whileHover="hover"
              initial="rest"
              className="group flex cursor-default flex-col rounded-xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/5 text-primary">
                <Activity size={22} aria-hidden="true" />
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-text-primary">
                {procedure.name}
              </h3>

              {/* Description */}
              <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                {procedure.description}
              </p>

              {/* Details */}
              <div className="mt-4 space-y-2 border-t border-border pt-4">
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <Clock size={13} aria-hidden="true" />
                  <span className="font-medium">Duration:</span>
                  <span>{procedure.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <Activity size={13} aria-hidden="true" />
                  <span className="font-medium">Recovery:</span>
                  <span>{procedure.recoveryTime}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <Scan size={13} aria-hidden="true" />
                  <span className="font-medium">Technology:</span>
                  <span className="truncate">{procedure.technology}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="group/btn p-0 text-primary hover:bg-transparent"
                >
                  Learn More
                  <ChevronRight
                    size={14}
                    className="ml-1 transition-transform duration-200 group-hover/btn:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
