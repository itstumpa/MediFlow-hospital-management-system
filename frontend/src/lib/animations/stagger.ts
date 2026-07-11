import type { Variants } from "framer-motion";

/**
 * Creates a stagger container with configurable delay between children.
 * @param staggerDelay - seconds between each child animation (default 0.1)
 * @param delayChildren - initial delay before first child (default 0.2)
 */
export function createStaggerContainer(
  staggerDelay = 0.1,
  delayChildren = 0.2,
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren },
    },
  };
}

/**
 * Predefined stagger containers for common use-cases
 */
export const staggerContainer = createStaggerContainer(0.1, 0.2);
export const staggerContainerFast = createStaggerContainer(0.06, 0.15);
export const staggerContainerSlow = createStaggerContainer(0.15, 0.25);

/**
 * Stagger item — child of any staggerContainer
 * Fades up from y:24
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

/**
 * Stagger item that slides in from the left
 */
export const staggerItemLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

/**
 * Stagger item with scale
 */
export const staggerItemScale: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};
