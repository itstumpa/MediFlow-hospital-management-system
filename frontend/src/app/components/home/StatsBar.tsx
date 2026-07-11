"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Stethoscope, HeartPulse, Building2, Headset } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Stat {
  icon: LucideIcon;
  target: number;
  suffix: string;
  label: string;
}

// TODO: Replace with API data
const stats: Stat[] = [
  { icon: Stethoscope, target: 50, suffix: "+", label: "Doctors" },
  { icon: HeartPulse, target: 10, suffix: "k+", label: "Patients Treated" },
  { icon: Building2, target: 15, suffix: "", label: "Departments" },
  { icon: Headset, target: 24, suffix: "/7", label: "Support" },
];

function CountingNumber({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 1500, bounce: 0 });

  useEffect(() => {
    if (isInView) motionValue.set(target);
  }, [isInView, target, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest) + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function StatsBar() {
  return (
    <section className="bg-primary-dark" aria-label="Hospital statistics">
      <div className="mx-auto max-w-page px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
             <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                className="relative flex items-center justify-center gap-4 px-4 py-4 md:py-0"
              >
                {i !== 0 && (
                  <span
                    className="absolute left-0 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-white/15 md:block"
                    aria-hidden="true"
                  />
                )}

                <Icon className="h-8 w-8 shrink-0 text-accent md:h-16 md:w-16" strokeWidth={1.75} />

                <div className="flex flex-col items-start">
                  <span className="text-4xl font-bold tracking-tight text-accent md:text-5xl">
                    <CountingNumber target={stat.target} suffix={stat.suffix} />
                  </span>
                  <span className="text-sm font-medium uppercase tracking-wide text-white/70 md:text-base">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}