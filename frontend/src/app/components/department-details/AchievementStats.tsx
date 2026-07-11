"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { staggerContainer, staggerItem } from "./SharedMotionVariants";
import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import type { AchievementStat } from "@/lib/data/department-detail";

interface Props {
  achievements: AchievementStat[];
}

function CountUp({ value, prefix = "", suffix = "" }: { value: string; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  const target = parseInt(value.replace(/\D/g, ""));

  useEffect(() => {
    if (counted.current || !target) return;
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
      {target ? (
        <>
          {prefix}
          {count.toLocaleString()}
          {suffix}
        </>
      ) : (
        <>
          {prefix}
          {value}
          {suffix}
        </>
      )}
    </span>
  );
}

export function AchievementStats({ achievements }: Props) {
  return (
    <AnimatedSection className="bg-gradient-to-br from-primary via-primary-dark to-[#0a5f5e] py-16 md:py-20">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5"
        >
          {achievements.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white md:text-4xl">
                <CountUp value={stat.value} prefix={stat.prefix || ""} suffix={stat.suffix || ""} />
              </div>
              <div className="mt-1 text-sm text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
