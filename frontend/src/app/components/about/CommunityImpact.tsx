"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { motion, useInView } from "framer-motion";
import { HandHeart, Heart, Microscope, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const impacts = [
  {
    icon: Heart,
    value: 48,
    suffix: "+",
    label: "Medical Camps",
    description: "Free health camps in underserved communities",
  },
  {
    icon: Users,
    value: 25000,
    suffix: "+",
    label: "Patients Served",
    description: "Through community outreach programs",
  },
  {
    icon: HandHeart,
    value: 10000,
    suffix: "+",
    label: "Free Consultations",
    description: "Provided at no cost to those in need",
  },
  {
    icon: Microscope,
    value: 200,
    suffix: "+",
    label: "Health Programs",
    description: "Awareness programs conducted annually",
  },
];

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!isInView || reduced) {
      if (reduced) setCount(target);
      return;
    }

    let current = 0;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, target, reduced]);

  return (
    <div ref={ref}>
      <span className="text-4xl font-bold text-accent md:text-5xl">
        {count.toLocaleString()}
        {suffix}
      </span>
    </div>
  );
}

export function CommunityImpact() {
  const reduced = useReducedMotion();

  return (
    <AnimatedSection className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#0a4a4a] py-16 md:py-24">
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Community Impact"
          subtitle="Our commitment extends beyond hospital walls — we're dedicated to improving community health and well-being."
          className="text-white [&_h2]:text-white [&_p]:text-white/60"
        />

        <motion.div
          initial={reduced ? undefined : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={reduced ? undefined : { once: true, amount: 0.2 }}
          transition={reduced ? undefined : { duration: 0.6 }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {impacts.map((impact, index) => {
            const Icon = impact.icon;
            return (
              <motion.div
                key={impact.label}
                initial={reduced ? undefined : { opacity: 0, y: 30 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={reduced ? undefined : { once: true, amount: 0.3 }}
                transition={
                  reduced
                    ? undefined
                    : {
                        duration: 0.5,
                        delay: index * 0.15,
                        ease: [0.25, 0.1, 0.25, 1],
                      }
                }
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/20">
                  <Icon className="h-7 w-7 text-accent" aria-hidden="true" />
                </div>
                <AnimatedCounter target={impact.value} suffix={impact.suffix} />
                <h3 className="mt-2 text-lg font-semibold text-white">
                  {impact.label}
                </h3>
                <p className="mt-1 text-sm text-white/60">
                  {impact.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
