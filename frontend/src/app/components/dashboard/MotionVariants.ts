import type { Transition, Variants } from "framer-motion";

/* ============================================
   Shared transition presets
   ============================================ */

/** Smooth ease-out — standard for most animations */
export const smoothEase: Transition = {
  duration: 0.35,
  ease: [0.25, 0.1, 0.25, 1],
};

/** Fast ease-out — for micro-interactions */
export const fastEase: Transition = {
  duration: 0.15,
  ease: [0.25, 0.1, 0.25, 1],
};

/** Spring — for cards and panels */
export const springBounce: Transition = {
  type: "spring",
  damping: 25,
  stiffness: 300,
};

/** Spring gentle — for dialogs */
export const springGentle: Transition = {
  type: "spring",
  damping: 30,
  stiffness: 250,
};

/* ============================================
   Variant presets
   ============================================ */

/** Fade in from bottom — used for page content */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothEase,
  },
};

/** Fade in from top — used for header */
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothEase,
  },
};

/** Fade in — used for overlays */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/** Strong fade in — for backdrop overlays */
export const fadeInBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

/** Scale + fade — used for dropdowns, popovers */
export const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: -4 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: fastEase,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -2,
    transition: { duration: 0.1 },
  },
};

/** Scale up — for dialogs and modals */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 5,
    transition: { duration: 0.15 },
  },
};

/** Slide in from left — used for mobile sidebar drawer */
export const slideLeft: Variants = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: springBounce,
  },
  exit: {
    x: "-100%",
    transition: springBounce,
  },
};

/** Slide in from right — used for detail panels */
export const slideRight: Variants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", damping: 30, stiffness: 300 },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

/** Slide up — for bottom sheets, bulk action bars */
export const slideUp: Variants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", damping: 25, stiffness: 300 },
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

/** Stagger container — for list reveals */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.08,
    },
  },
};

/** Slide up for staggered items */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothEase,
  },
};

/** Stagger for table rows */
export const staggerTable: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.05,
    },
  },
};

/** Table row fade */
export const tableRowFade: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ============================================
   Interactive animation presets
   ============================================ */

/** Hover lift — for clickable cards */
export const hoverLift = {
  whileHover: { y: -3, transition: { duration: 0.2 } },
  whileTap: { y: 0, transition: { duration: 0.1 } },
};

/** Hover glow — for cards with colored glow */
export const hoverGlow = {
  whileHover: { y: -2, boxShadow: "0 8px 25px -5px rgba(0,0,0,0.1)" },
  whileTap: { y: 0 },
};

/** Scale button press */
export const buttonPress = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.97 },
};

/** Icon rotate on hover */
export const iconHover = {
  whileHover: { rotate: 8, scale: 1.1 },
  whileTap: { scale: 0.95 },
};

/** Badge pulse animation */
export const badgePulse = {
  animate: {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

/* ============================================
   Layout / sidebar variants
   ============================================ */

/** Sidebar item animation */
export const sidebarItemVariants: Variants = {
  collapsed: {
    width: 48,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  expanded: {
    width: "100%",
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

/** Active indicator (left border) */
export const activeIndicatorVariants: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

/** Page transition wrapper */
export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

/* ============================================
   Skeleton shimmer
   ============================================ */

export const shimmerAnimation = {
  animate: {
    backgroundPosition: ["-200% 0", "200% 0"],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

/* ============================================
   Chart / counter entrance
   ============================================ */

export const counterEntrance: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};
