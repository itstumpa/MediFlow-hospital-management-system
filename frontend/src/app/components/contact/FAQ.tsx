"use client";

import { fadeUp } from "@/lib/animations/fade";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment online through our website by visiting the Appointments page, selecting your preferred department and doctor, and choosing an available time slot. Alternatively, you can call our main line or visit the clinic in person. You'll receive a confirmation via email and SMS once the booking is confirmed.",
  },
  {
    question: "Where are you located?",
    answer:
      "We are located at 123 Gulshan Avenue, Dhaka 1212, Bangladesh — near Gulshan Circle 2. We're easily accessible by car, bus, and metro. Free underground parking is available for patients, and the Gulshan metro station is just a 3-minute walk away.",
  },
  {
    question: "Is parking available?",
    answer:
      "Yes, we offer free underground parking for all patients and visitors. The parking area is accessible from the side street and has spaces for up to 200 vehicles. Valet parking is also available for a nominal fee of $5. There are dedicated spots for emergency vehicles and disabled visitors.",
  },
  {
    question: "Do you offer online consultations?",
    answer:
      "Yes, many of our doctors offer secure video consultations through our platform. When booking, simply select the 'Video Consultation' option and you'll receive a secure link to join the call at your appointment time. Online consultations are available for follow-ups, prescription refills, and non-emergency concerns.",
  },
  {
    question: "How can I cancel an appointment?",
    answer:
      "You can cancel or reschedule your appointment up to 2 hours before the scheduled time through your account dashboard on our website. You can also call our support team during working hours. Late cancellations or no-shows may be subject to a small fee. We recommend rescheduling rather than cancelling to secure your preferred time slot.",
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "For your first visit, please bring a valid government-issued ID, your insurance card (if applicable), any relevant medical records or test results, a list of current medications, and your referral letter if required. Arriving 15 minutes early will help us complete the registration process smoothly.",
  },
];

export function FAQ() {
  const reduced = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggleFaq(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <motion.div
          variants={reduced ? undefined : fadeUp}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={reduced ? undefined : { once: true, amount: 0.1 }}
          className="mb-12 text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5">
            <HelpCircle className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-[28px] font-bold leading-[1.15] tracking-tight text-text-primary sm:text-3xl md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
            Have questions? We&apos;re here to help with everything you need to
            know about visiting MediFlow.
          </p>
        </motion.div>

        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={reduced ? undefined : { once: true, amount: 0.1 }}
          className="mx-auto max-w-3xl space-y-3"
        >
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const questionId = `contact-faq-question-${index}`;
            const panelId = `contact-faq-panel-${index}`;

            return (
              <motion.div
                key={index}
                variants={reduced ? undefined : staggerItem}
                className="rounded-xl border border-border bg-surface shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <h3>
                  <button
                    id={questionId}
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-text-primary transition-colors duration-200 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-lg"
                  >
                    <span>{item.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="shrink-0"
                    >
                      <ChevronDown
                        className="h-5 w-5 text-text-secondary"
                        aria-hidden="true"
                      />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={questionId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border px-6 py-4">
                        <p className="text-sm leading-relaxed text-text-secondary">
                          {item.answer}
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
    </section>
  );
}
