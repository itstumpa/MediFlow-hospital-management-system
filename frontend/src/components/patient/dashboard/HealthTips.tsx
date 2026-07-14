"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Apple, ChevronRight, Dumbbell, Heart, Moon } from "lucide-react";
import { useEffect, useState } from "react";

interface Tip {
  category: string;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  iconColor: string;
}

const tips: Tip[] = [
  {
    category: "Heart Health",
    title: "Keep your heart strong with daily walks",
    description:
      "Just 30 minutes of moderate walking per day can reduce your risk of heart disease by up to 30%.",
    icon: Heart,
    gradient: "from-rose-500 to-pink-500",
    iconColor: "text-rose-500",
  },
  {
    category: "Nutrition",
    title: "Eat a rainbow of fruits and vegetables",
    description:
      "Different colored produce provides different nutrients. Aim for 5-7 servings daily for optimal health.",
    icon: Apple,
    gradient: "from-emerald-500 to-green-500",
    iconColor: "text-emerald-500",
  },
  {
    category: "Exercise",
    title: "Strength training twice a week",
    description:
      "Building muscle mass boosts metabolism, strengthens bones, and improves overall longevity.",
    icon: Dumbbell,
    gradient: "from-blue-500 to-indigo-500",
    iconColor: "text-blue-500",
  },
  {
    category: "Sleep",
    title: "Prioritize 7-9 hours of quality sleep",
    description:
      "Consistent sleep patterns support immune function, memory, and emotional wellbeing.",
    icon: Moon,
    gradient: "from-purple-500 to-violet-500",
    iconColor: "text-purple-500",
  },
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -200 : 200,
    opacity: 0,
    transition: { duration: 0.25 },
  }),
};

export function HealthTips() {
  const [[current, dir], setCurrent] = useState([0, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(([prev]) => [(prev + 1) % tips.length, 1]);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i: number) => {
    setCurrent(([prev]) => [i, i > prev ? 1 : -1]);
  };

  const tip = tips[current];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Health Tip
        </h2>

        {/* Dots */}
        <div className="flex gap-1.5">
          {tips.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === current
                  ? "w-5 bg-[var(--color-primary)] dark:bg-[var(--color-accent)]"
                  : "w-1.5 bg-slate-300 dark:bg-slate-600",
              )}
            />
          ))}
        </div>
      </div>

      <div className="relative mt-4 min-h-[130px]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={current}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex items-start gap-4"
          >
            {/* Icon */}
            <div
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-sm",
                tip.gradient,
              )}
            >
              <tip.icon className="h-6 w-6 text-white" />
            </div>

            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                {tip.category}
              </span>
              <h3 className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                {tip.title}
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {tip.description}
              </p>
              <button className="mt-2 inline-flex items-center gap-0.5 text-xs font-medium text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-dark)] dark:text-[var(--color-accent)]">
                Read More
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
