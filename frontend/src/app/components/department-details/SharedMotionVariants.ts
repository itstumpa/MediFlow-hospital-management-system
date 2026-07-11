"use client";

import { type Easing, type Variants } from "framer-motion";

const easeOut: Easing = [0.25, 0.1, 0.25, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const cardHover = {
  rest: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
  hover: {
    y: -6,
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    transition: { duration: 0.3, ease: easeOut },
  },
};

export const imageZoom = {
  rest: { scale: 1 },
  hover: {
    scale: 1.08,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export const iconRotate = {
  rest: { rotate: 0 },
  hover: { rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } },
};

export const arrowSlideHover = {
  rest: { x: 0 },
  hover: { x: 4, transition: { duration: 0.2 } },
};

export const pulseBadge: Variants = {
  initial: { scale: 1 },
  pulse: {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

export const countUp = (
  target: number,
  duration: number = 2,
): {
  initial: number;
  animate: { count: number };
  transition: { duration: number; ease: Readonly<[number, number, number, number]> };
} => ({
  initial: 0,
  animate: { count: target },
  transition: { duration, ease: [0.25, 0.1, 0.25, 1] as const },
});

export const underlineHover = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1, transition: { duration: 0.3, ease: easeOut } },
};
