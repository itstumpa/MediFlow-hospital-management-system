"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import type { DeptFAQ } from "@/lib/data/department-detail";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { staggerContainer, staggerItem } from "./SharedMotionVariants";

interface Props {
  faqs: DeptFAQ[];
}

export function DepartmentFAQ({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => setOpenIndex((p) => (p === idx ? null : idx));

  return (
    <AnimatedSection className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our department, treatments, and patient care."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto max-w-3xl space-y-3"
        >
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                variants={staggerItem}
                className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <HelpCircle
                    size={18}
                    className={`shrink-0 transition-colors duration-200 ${
                      isOpen ? "text-primary" : "text-border"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="flex-1 text-sm font-medium text-text-primary">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown
                      size={17}
                      className={`transition-colors duration-200 ${
                        isOpen ? "text-primary" : "text-text-secondary"
                      }`}
                      aria-hidden="true"
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border px-5 py-4">
                        <p className="text-sm leading-relaxed text-text-secondary">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
