"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { stepLabels } from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface RegistrationStepperProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

/* ─── Variants ──────────────────────────────── */

const stepVariants = {
  inactive: { scale: 1 },
  active: { scale: 1.05 },
  completed: { scale: 1 },
};

/* ─── Component ─────────────────────────────── */

export function RegistrationStepper({
  currentStep,
  onStepClick,
}: RegistrationStepperProps) {
  return (
    <nav aria-label="Registration progress" className="w-full">
      <ol className="flex flex-col gap-0">
        {stepLabels.map((step, idx) => {
          const stepNumber = step.id;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;
          const isClickable = isCompleted && onStepClick;
          const Icon = step.icon;

          return (
            <li key={step.id} className="relative">
              {/* Connector line */}
              {idx < stepLabels.length - 1 && (
                <div className="absolute left-5 top-10 h-full w-0.5">
                  <div
                    className={`h-full w-full transition-colors duration-300 ${
                      isCompleted
                        ? "bg-[var(--color-primary)]"
                        : "bg-slate-200 dark:bg-slate-700"
                    }`}
                  />
                </div>
              )}

              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(stepNumber)}
                className={`group flex w-full items-center gap-3 px-3 py-3 text-left transition-all ${
                  isClickable ? "cursor-pointer" : "cursor-default"
                } ${isActive ? "" : "opacity-70 hover:opacity-100"}`}
              >
                {/* Circle */}
                <motion.div
                  variants={stepVariants}
                  animate={
                    isActive ? "active" : isCompleted ? "completed" : "inactive"
                  }
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all ${
                    isActive
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20"
                      : isCompleted
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                        : "border-slate-300 bg-white text-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-500"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </motion.div>

                {/* Label */}
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? "text-[var(--color-primary)] dark:text-white"
                        : isCompleted
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    Step {stepNumber}
                  </p>
                  <p
                    className={`text-xs transition-colors ${
                      isActive
                        ? "text-[var(--color-primary)]/70 dark:text-white/70"
                        : isCompleted
                          ? "text-slate-500 dark:text-slate-400"
                          : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>

                {/* Active indicator dot */}
                {isActive && (
                  <motion.span
                    layoutId="step-active-dot"
                    className="h-2 w-2 rounded-full bg-[var(--color-primary)]"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
