"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

// TODO: Replace with API data
const faqItems: FaqItem[] = [
  {
    question: "How do I book an appointment?",
    answer:
      "Simply browse our list of doctors, select your preferred specialist, choose an available time slot, and confirm your booking. You will receive a confirmation via email and SMS.",
  },
  {
    question: "Can I cancel or reschedule an appointment?",
    answer:
      "Yes, you can cancel or reschedule your appointment up to 2 hours before the scheduled time from your account dashboard. Late cancellations may be subject to a small fee.",
  },
  {
    question: "Are video consultations available?",
    answer:
      "Yes, many of our doctors offer secure video consultations. When booking, simply select the 'Video Consultation' option and you will receive a link to join the call at your appointment time.",
  },
  {
    question: "How do I access my digital prescriptions?",
    answer:
      "After your consultation, digital prescriptions are available in your MediFlow account under 'My Prescriptions'. You can download, print, or share them directly with your pharmacy.",
  },
  {
    question: "Is my health data secure?",
    answer:
      "Absolutely. MediFlow follows industry-standard encryption and compliance practices to protect your health information. We are fully compliant with data protection regulations.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggleFaq(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed">
            Have questions? We are here to help.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const questionId = `faq-question-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={index}
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
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-text-secondary transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={questionId}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="border-t border-border px-6 py-4 text-sm leading-relaxed text-text-secondary">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
