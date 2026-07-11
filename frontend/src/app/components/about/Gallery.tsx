"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { staggerContainer, staggerItemScale } from "@/lib/animations/stagger";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bed,
  BedDouble,
  HeartPulse,
  Hospital,
  Microscope,
  Stethoscope,
  Syringe,
  UserRound,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const facilities = [
  {
    label: "Reception",
    icon: Hospital,
    color: "from-primary/20 to-accent/20",
    description:
      "Warm and welcoming reception area designed for patient comfort.",
  },
  {
    label: "Consultation Rooms",
    icon: Stethoscope,
    color: "from-accent/20 to-primary/20",
    description:
      "Private, well-equipped consultation rooms for thorough examinations.",
  },
  {
    label: "Operation Theatre",
    icon: Syringe,
    color: "from-primary-dark/20 to-accent/20",
    description:
      "State-of-the-art modular operation theatres with advanced surgical equipment.",
  },
  {
    label: "Emergency",
    icon: HeartPulse,
    color: "from-accent/20 to-primary-dark/20",
    description: "24/7 emergency department with rapid response trauma care.",
  },
  {
    label: "ICU",
    icon: Bed,
    color: "from-primary/20 to-accent/20",
    description:
      "Advanced intensive care unit with continuous monitoring systems.",
  },
  {
    label: "Laboratory",
    icon: Microscope,
    color: "from-accent/20 to-primary/20",
    description:
      "Fully automated diagnostic laboratory with rapid test results.",
  },
  {
    label: "MRI & Imaging",
    icon: BedDouble,
    color: "from-primary-dark/20 to-accent/20",
    description:
      "High-resolution MRI, CT scan, and digital X-ray imaging suite.",
  },
  {
    label: "Waiting Lounge",
    icon: UserRound,
    color: "from-accent/20 to-primary-dark/20",
    description:
      "Spacious waiting areas with comfortable seating and refreshments.",
  },
];

export function Gallery() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<number | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setSelected(null);
    }
  }, []);

  useEffect(() => {
    if (selected !== null) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected, handleKeyDown]);

  return (
    <AnimatedSection className="bg-background py-6 md:py-16">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Our Facilities"
          subtitle="Explore our modern healthcare facility designed to provide the best medical experience."
        />

        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={reduced ? undefined : { once: true, amount: 0.1 }}
          className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <motion.button
                key={facility.label}
                variants={reduced ? undefined : staggerItemScale}
                whileHover={
                  reduced
                    ? undefined
                    : { scale: 1.04, transition: { duration: 0.3 } }
                }
                onClick={() => setSelected(index)}
                className="group relative overflow-hidden rounded-xl border border-border bg-surface p-5 text-left shadow-sm transition-shadow duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`View ${facility.label} details`}
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${facility.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  aria-hidden="true"
                />

                <div className="relative">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 transition-colors duration-300 group-hover:bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary">
                    {facility.label}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                    {facility.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-label={`Facility: ${facilities[selected].label}`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-surface shadow-2xl"
              >
                {/* Close button */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Close lightbox"
                >
                  <X size={20} />
                </button>

                {/* Content */}
                <div className="p-8">
                  <div
                    className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br ${facilities[selected].color}`}
                  >
                    {(() => {
                      const Icon = facilities[selected].icon;
                      return (
                        <Icon
                          className="h-12 w-12 text-primary"
                          aria-hidden="true"
                        />
                      );
                    })()}
                  </div>
                  <h2 className="text-center text-2xl font-bold text-text-primary">
                    {facilities[selected].label}
                  </h2>
                  <p className="mt-4 text-center leading-relaxed text-text-secondary">
                    {facilities[selected].description}
                  </p>
                  <p className="mt-4 text-center text-sm text-text-secondary/60">
                    Our {facilities[selected].label.toLowerCase()} is equipped
                    with the latest medical technology and designed for patient
                    comfort and safety.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}
