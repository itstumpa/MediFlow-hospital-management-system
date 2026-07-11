"use client";

import { Building2, Headset, HeartPulse, Stethoscope } from "lucide-react";
import { StatisticCard } from "./StatisticCard";

interface Stat {
  icon: typeof Stethoscope;
  target: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: Stethoscope,
    target: 50,
    suffix: "+",
    label: "Expert Doctors",
  },
  {
    icon: HeartPulse,
    target: 10,
    suffix: "K+",
    label: "Patients Treated",
  },
  {
    icon: Building2,
    target: 15,
    suffix: "",
    label: "Medical Departments",
  },
  {
    icon: Headset,
    target: 24,
    suffix: "/7",
    label: "Emergency Support",
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

      <div className="relative mx-auto max-w-page px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-12">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-6 lg:gap-10">
          {stats.map((stat, i) => (
            <StatisticCard
              key={stat.label}
              icon={stat.icon}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              index={i}
              showDivider={i > 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
