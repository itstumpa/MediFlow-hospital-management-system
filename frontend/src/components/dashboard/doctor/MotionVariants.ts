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

/** Active indicator (left border) */
export const activeIndicatorVariants: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

/** Sidebar collapse animation variants */
export const sidebarVariants: Variants = {
  expanded: {
    width: 280,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
  },
  collapsed: {
    width: 80,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/** Page transition — used in dashboard shell */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.15 },
  },
};

/** Logo text animation */
export const logoTextVariants: Variants = {
  hidden: { opacity: 0, width: 0 },
  visible: {
    opacity: 1,
    width: "auto",
    transition: { duration: 0.15 },
  },
  exit: {
    opacity: 0,
    width: 0,
    transition: { duration: 0.1 },
  },
};

/* ============================================
   Micro‑interaction variants
   ============================================ */

/** Badge pulse — subtle attention‑getter */
export const badgePulse: Variants = {
  idle: { scale: 1 },
  pulse: {
    scale: [1, 1.12, 1],
    transition: { duration: 0.6, repeat: Infinity, repeatDelay: 3 },
  },
};

/** Icon rotate — e.g. refresh / settings cog */
export const iconRotate: Variants = {
  idle: { rotate: 0 },
  hover: {
    rotate: 90,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

/** Notification bell pulse + shake */
export const notificationPulse: Variants = {
  idle: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: [0, -8, 8, -4, 4, 0],
    transition: { duration: 0.4 },
  },
};

/** Avatar ring pulse */
export const avatarHover: Variants = {
  idle: { boxShadow: "0 0 0 0 rgba(14,124,123,0)" },
  hover: {
    boxShadow: "0 0 0 4px rgba(14,124,123,0.25)",
    transition: { duration: 0.25 },
  },
};

/** Card hover lift — for dash‑card elements */
export const cardLift = {
  whileHover: {
    y: -4,
    boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
    transition: { duration: 0.2, ease: "easeOut" },
  },
  whileTap: { y: 0, transition: { duration: 0.1 } },
};

/** Search bar glow on focus */
export const searchGlow: Variants = {
  idle: { boxShadow: "0 0 0 0 rgba(14,124,123,0)" },
  focus: {
    boxShadow: "0 0 0 3px rgba(14,124,123,0.15)",
    transition: { duration: 0.2 },
  },
};

/* ============================================
   Tab & timeline variants
   ============================================ */

/** Tab content switch — fade + slide */
export const tabContent: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.15 },
  },
};

/** Draw timeline items — one by one */
export const drawTimeline: Variants = {
  hidden: { opacity: 0, x: -12, height: 0 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    height: "auto",
    transition: {
      delay: i * 0.06,
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

/** Scale + fade dialog entrance */
export const dialogScale: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 28, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 10,
    transition: { duration: 0.15 },
  },
};

/** Counter / number scale‑in */
export const numberScale: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 20, stiffness: 250 },
  },
};

/* ============================================
   Chart & stat variants
   ============================================ */

/** Stagger for stat cards */
export const staggerStats: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

/** Individual stat card animation */
export const statItem: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/** Skeleton shimmer variant */
export const shimmerVariant: Variants = {
  hidden: { backgroundPosition: "-200% 0" },
  visible: {
    backgroundPosition: "200% 0",
    transition: { duration: 1.2, repeat: Infinity, ease: "linear" },
  },
};
