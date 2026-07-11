"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  number: number;
  label: string;
}

const steps: Step[] = [
  { number: 1, label: "Choose Doctor" },
  { number: 2, label: "Select Time" },
  { number: 3, label: "Confirmation" },
];

const activeStep = 1;

const stepVariants = {
  active: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
  inactive: {
    scale: 0.95,
    opacity: 0.5,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

const pulseDotVariants = {
  animate: {
    scale: [1, 1.3, 1],
    opacity: [1, 0.7, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export function BookingSteps() {
  return (
    <div className="mb-6" role="navigation" aria-label="Booking progress">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <motion.div
              className="flex flex-col items-center gap-1.5"
              variants={stepVariants}
              initial="inactive"
              animate={step.number === activeStep ? "active" : "inactive"}
            >
              <motion.div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  step.number === activeStep
                    ? "bg-primary text-white shadow-md shadow-primary/30"
                    : step.number < activeStep
                      ? "bg-primary/20 text-primary"
                      : "bg-border text-text-secondary"
                }`}
              >
                {step.number < activeStep ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  step.number
                )}
              </motion.div>
              <span
                className={`text-[10px] font-medium leading-tight ${
                  step.number === activeStep
                    ? "text-primary"
                    : "text-text-secondary"
                }`}
              >
                {step.label}
              </span>
              {step.number === activeStep && (
                <motion.div
                  className="h-1 w-1 rounded-full bg-primary"
                  variants={pulseDotVariants}
                  animate="animate"
                  aria-hidden="true"
                />
              )}
            </motion.div>
            {index < steps.length - 1 && (
              <div className="mx-2 mt-0 h-px w-8 bg-border sm:mx-3 sm:w-12" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
