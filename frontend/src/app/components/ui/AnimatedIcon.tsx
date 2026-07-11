"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface AnimatedIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  ariaHidden?: boolean;
  hoverScale?: number;
  hoverRotate?: number;
  glowColor?: string;
}

/**
 * Reusable animated icon wrapper with consistent micro-interactions.
 * Provides subtle hover scale, rotate, and glow effects.
 */
export function AnimatedIcon({
  icon: Icon,
  size = 16,
  className = "",
  ariaHidden = true,
  hoverScale = 1.12,
  hoverRotate = 0,
  glowColor,
}: AnimatedIconProps) {
  return (
    <motion.span
      className="inline-flex items-center justify-center"
      whileHover={{
        scale: hoverScale,
        rotate: hoverRotate,
        filter: glowColor
          ? `drop-shadow(0 0 6px ${glowColor})`
          : "drop-shadow(0 0 4px rgba(14,124,123,0.25))",
      }}
      whileTap={{ scale: 0.92 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
    >
      <Icon size={size} className={className} aria-hidden={ariaHidden} />
    </motion.span>
  );
}

interface IconButtonProps {
  icon: LucideIcon;
  size?: number;
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

/**
 * Icon-only circular button with consistent hover/tap micro-interactions.
 */
export function IconButton({
  icon: Icon,
  size = 16,
  label,
  onClick,
  className = "",
  disabled = false,
}: IconButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.88 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={`flex items-center justify-center rounded-full border border-border text-text-secondary transition-colors duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      aria-label={label}
      style={{ width: 32, height: 32 }}
    >
      <Icon size={size} aria-hidden="true" />
    </motion.button>
  );
}

interface ArrowSlideProps {
  children: ReactNode;
  className?: string;
}

/**
 * Arrow slide animation wrapper — the arrow icon slides right on hover.
 */
export function ArrowSlide({ children, className = "" }: ArrowSlideProps) {
  return (
    <motion.span
      className={`inline-flex items-center gap-1.5 ${className}`}
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      {children}
    </motion.span>
  );
}
