import type { LucideIcon } from "lucide-react";
import { CalendarCheck, ClipboardList, HeartPulse } from "lucide-react";

interface Step {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

// TODO: Replace with API data
const steps: Step[] = [
  {
    number: 1,
    title: "Choose doctor",
    description:
      "Browse our list of trusted specialists, read their profiles, and pick the one that best fits your needs.",
    icon: ClipboardList,
  },
  {
    number: 2,
    title: "Pick a slot",
    description:
      "Select a convenient date and time that works for you. Our real-time calendar shows all available slots instantly.",
    icon: CalendarCheck,
  },
  {
    number: 3,
    title: "Get treated",
    description:
      "Visit the clinic or start a video consultation. Receive your prescription and follow-up plan digitally.",
    icon: HeartPulse,
  },
];

export function HowItWorks() {
  return (
    <section className="bg-background py-10 md:py-14">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            How it works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed">
            Getting started with MediFlow is simple. Just three easy steps to
            your first appointment.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center"
              >
                {/* Connector line (desktop) */}
                {index < steps.length - 1 && (
                  <div
                    className="absolute left-[60%] top-12 hidden h-0.5 w-[80%] bg-border md:block"
                    aria-hidden="true"
                  />
                )}

                {/* Step icon */}
                <div className="relative z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-surface shadow-md ring-1 ring-border">
                  <div className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {step.number}
                  </div>
                  <Icon className="h-10 w-10 text-primary" aria-hidden="true" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
