"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { treatmentProcess } from "@/lib/data/departments";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function TreatmentTimeline() {
  return (
    <AnimatedSection className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Your Treatment Journey"
          subtitle="A seamless, guided experience from your first consultation to follow-up care."
        />

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-0 right-0 top-12 h-0.5 bg-border">
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                className="h-full bg-gradient-to-r from-primary via-accent to-primary"
              />
            </div>

            <div className="grid grid-cols-5 gap-8">
              {treatmentProcess.map((step, idx) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative pt-0"
                >
                  {/* Step number */}
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center">
                    <div className="relative">
                      {/* Outer ring */}
                      <div
                        className={`absolute inset-0 rounded-full border-2 ${
                          idx === 0
                            ? "border-primary"
                            : idx === treatmentProcess.length - 1
                              ? "border-accent"
                              : "border-border"
                        }`}
                      />
                      {/* Inner circle */}
                      <div
                        className={`flex h-24 w-24 items-center justify-center rounded-full ${
                          idx === 0
                            ? "bg-primary/5"
                            : idx === treatmentProcess.length - 1
                              ? "bg-accent/5"
                              : "bg-surface"
                        }`}
                      >
                        <span
                          className={`text-2xl font-bold ${
                            idx === 0
                              ? "text-primary"
                              : idx === treatmentProcess.length - 1
                                ? "text-accent"
                                : "text-text-secondary"
                          }`}
                        >
                          {step.step}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden">
          <div className="relative ml-6">
            {/* Vertical line */}
            <div className="absolute left-0 top-0 h-full w-0.5 bg-border">
              <motion.div
                initial={{ height: "0%" }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full bg-gradient-to-b from-primary via-accent to-primary"
              />
            </div>

            <div className="space-y-10">
              {treatmentProcess.map((step, idx) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative pl-8"
                >
                  {/* Dot */}
                  <div
                    className={`absolute left-[-9px] top-1 h-4 w-4 rounded-full border-2 ${
                      idx === 0
                        ? "border-primary bg-primary"
                        : idx === treatmentProcess.length - 1
                          ? "border-accent bg-accent"
                          : "border-border bg-surface"
                    }`}
                  />

                  <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
                    <div className="mb-1 flex items-center gap-2">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                          idx === 0
                            ? "bg-primary/10 text-primary"
                            : idx === treatmentProcess.length - 1
                              ? "bg-accent/10 text-accent"
                              : "bg-gray-100 text-text-secondary"
                        }`}
                      >
                        {step.step}
                      </span>
                      <h3 className="font-bold text-text-primary">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm text-text-secondary">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow down (except last) */}
                  {idx < treatmentProcess.length - 1 && (
                    <ArrowDown
                      className="absolute -bottom-6 left-[-4px] h-4 w-4 text-text-secondary/40"
                      aria-hidden="true"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
