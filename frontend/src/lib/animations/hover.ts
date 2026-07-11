import type { Variants } from "framer-motion";

/**
 * Card hover lift — raises the card with shadow
 */
export const cardHover = {
  whileHover: {
    y: -6,
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

/**
 * Card hover with minimal lift
 */
export const cardHoverLight = {
  whileHover: {
    y: -3,
    scale: 1.01,
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
};

/**
 * Icon hover — rotate + scale
 */
export const iconHover = {
  whileHover: {
    scale: 1.12,
    rotate: 5,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
};

/**
 * Button hover — scale up
 */
export const buttonHover = {
  whileHover: {
    scale: 1.03,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
};

/**
 * Social icon hover — scale + rotate
 */
export const socialHover = {
  whileHover: {
    scale: 1.15,
    rotate: 8,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
};

/**
 * Image hover — scale up (for inner image, not the container)
 */
export const imageHover: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/**
 * Arrow slide — moves right on hover
 */
export const arrowSlide = {
  initial: { x: 0 },
  whileHover: {
    x: 4,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
};
