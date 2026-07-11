"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { motion } from "framer-motion";
import {
  Ambulance,
  Award,
  Bed,
  HeartPulse,
  Stethoscope,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  { icon: Bed, value: 15, suffix: "+", label: "Specialized Departments" },
  { icon: Users, value: 50, suffix: "+", label: "Expert Doctors" },
  { icon: HeartPulse, value: 10000, suffix: "+", label: "Patients Treated" },
  { icon: Stethoscope, value: 98, suffix: "%", label: "Success Rate" },
  { icon: Ambulance, value: 24, suffix: "/7", label: "Emergency Care" },
  { icon: Award, value: 25, suffix: "+", label: "Years of Excellence" },
];

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    if (counted.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function DepartmentStats() {
  return (
    <AnimatedSection className="bg-gradient-to-br from-primary via-primary-dark to-[#0a5f5e] md:pb-10">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                  <Icon className="h-7 w-7 text-accent" aria-hidden="true" />
                </div>
                <div className="text-2xl font-bold text-white md:text-3xl">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-xs text-white/70 md:text-sm">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
