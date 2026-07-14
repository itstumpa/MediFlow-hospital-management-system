"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export interface StepDef {
  label: string;
  sublabel: string;
}

const steps: StepDef[] = [
  { label: "Department", sublabel: "Choose specialty" },
  { label: "Doctor", sublabel: "Select provider" },
  { label: "Date", sublabel: "Pick a day" },
  { label: "Time", sublabel: "Choose slot" },
  { label: "Details", sublabel: "Your information" },
  { label: "Review", sublabel: "Confirm details" },
  { label: "Done", sublabel: "Confirmation" },
];

interface BookingStepperProps {
  currentStep: number;
  className?: string;
}

export function BookingStepper({
  currentStep,
  className,
}: BookingStepperProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Desktop horizontal stepper */}
      <div className="hidden md:block">
        <div className="relative flex items-center justify-between">
          {/* Progress bar background */}
          <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-slate-200 dark:bg-slate-700" />
          {/* Progress bar fill */}
          <motion.div
            className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
            initial={false}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
          />
          {/* Step circles */}
          {steps.map((step, i) => {
            const isCompleted = i < currentStep;
            const isCurrent = i === currentStep;
            const isUpcoming = i > currentStep;

            return (
              <div
                key={step.label}
                className="relative z-10 flex flex-col items-center"
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.15 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.1, 0.25, 1] as const,
                  }}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors",
                    isCompleted &&
                      "border-[var(--color-primary)] bg-[var(--color-primary)] text-white",
                    isCurrent &&
                      "border-[var(--color-primary)] bg-white text-[var(--color-primary)] shadow-[0_0_0_4px_rgba(14,124,123,0.15)] dark:bg-slate-900 dark:shadow-[0_0_0_4px_rgba(45,212,191,0.2)]",
                    isUpcoming &&
                      "border-slate-300 bg-white text-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-500",
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : i + 1}
                </motion.div>
                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      "text-xs font-semibold leading-tight",
                      isCompleted && "text-[var(--color-primary)]",
                      isCurrent && "text-slate-900 dark:text-white",
                      isUpcoming && "text-slate-400 dark:text-slate-500",
                    )}
                  >
                    {step.label}
                  </p>
                  <p
                    className={cn(
                      "text-[10px] leading-tight",
                      isCurrent && "text-slate-500 dark:text-slate-400",
                      isUpcoming && "text-slate-300 dark:text-slate-600",
                    )}
                  >
                    {step.sublabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile compact stepper */}
      <div className="flex md:hidden items-center gap-3">
        <button
          type="button"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white"
        >
          {currentStep < steps.length - 1 ? (
            currentStep + 1
          ) : (
            <Check className="h-4 w-4" />
          )}
        </button>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {currentStep < steps.length ? steps[currentStep].label : "Complete"}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {currentStep < steps.length
              ? `Step ${currentStep + 1} of ${steps.length}`
              : "Appointment booked!"}
          </p>
        </div>
        {/* Dots */}
        <div className="flex items-center gap-1">
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i <= currentStep
                  ? "bg-[var(--color-primary)]"
                  : "bg-slate-200 dark:bg-slate-700",
                i === currentStep ? "w-4" : "w-1.5",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
