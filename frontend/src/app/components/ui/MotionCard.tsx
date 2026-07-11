"use client";

import { cardHover } from "@/lib/animations/hover";
import { staggerItem } from "@/lib/animations/stagger";
import { motion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

interface MotionCardProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Custom hover variants or false to disable */
  hover?: false | typeof cardHover.whileHover;
  /** Custom stagger item variants */
  variants?: Record<string, unknown>;
  /** Custom index for stagger delay */
  index?: number;
}

/**
 * Reusable card wrapper with stagger entrance + hover lift.
 * Designed for use inside a stagger container.
 */
export function MotionCard({
  children,
  className = "",
  as = "div",
  hover,
  variants,
  index,
}: MotionCardProps) {
  const Component = motion[as as keyof typeof motion] as any;

  return (
    <Component
      variants={variants ?? staggerItem}
      custom={index}
      whileHover={hover === false ? undefined : (hover ?? cardHover.whileHover)}
      className={className}
    >
      {children}
    </Component>
  );
}
