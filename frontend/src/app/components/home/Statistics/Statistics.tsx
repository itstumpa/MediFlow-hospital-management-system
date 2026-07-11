"use client";

import type { LucideIcon } from "lucide-react";
import { Building2, Headset, HeartPulse, Stethoscope } from "lucide-react";
import { StatisticCard } from "./StatisticCard";

interface Stat {
  icon: LucideIcon;
  target: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    icon: Stethoscope,
    target: 50,
    suffix: "+",
    label: "Expert Doctors",
    description: "Highly experienced specialists",
  },
  {
    icon: HeartPulse,
    target: 10,
    suffix: "K+",
    label: "Patients Treated",
    description: "Trusted by families nationwide",
  },
  {
    icon: Building2,
    target: 15,
    suffix: "",
    label: "Medical Departments",
    description: "Complete healthcare services",
  },
  {
    icon: Headset,
    target: 24,
    suffix: "/7",
    label: "Emergency Support",
    description: "Always available",
  },
];

export function StatsBar() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary-dark to-primary"
      aria-label="Hospital statistics"
    >
      {/* Subtle radial pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 50%, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-page px-4 py-6 md:px-6 md:py-10 lg:px-8 lg:py-16">
        {/* Section label */}
        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent/70">
          MediFlow in Numbers
        </p>

        <h2 className="text-center text-2xl font-bold text-white md:text-3xl">
          Trusted by thousands across the country
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, i) => (
            <StatisticCard
              key={stat.label}
              icon={stat.icon}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
              index={i}
              showDivider={i > 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
