"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: () => void | Promise<void>;
  ariaLabel?: string;
}

const baseStyles =
  "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none";

const variantStyles: Record<string, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md",
  secondary:
    "bg-accent text-primary-dark hover:bg-accent/90 shadow-sm hover:shadow-md",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  ghost: "text-primary hover:bg-primary/5",
};

const sizeStyles: Record<string, string> = {
  sm: "px-4 py-2 text-sm gap-1.5 min-h-[36px]",
  md: "px-6 py-2.5 text-base gap-2 min-h-[44px]",
  lg: "px-8 py-3 text-lg gap-2.5 min-h-[52px]",
};

function ButtonContent({
  children,
  loading,
  size,
}: {
  children: ReactNode;
  loading?: boolean;
  size: string;
}) {
  const spinnerSize = size === "sm" ? 14 : size === "lg" ? 20 : 16;

  if (loading) {
    return (
      <>
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="inline-flex"
        >
          <Loader2 size={spinnerSize} aria-hidden="true" />
        </motion.span>
        <span className="sr-only">Loading</span>
      </>
    );
  }

  return <>{children}</>;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  disabled = false,
  loading = false,
  className = "",
  onClick,
  ariaLabel,
}: ButtonProps) {
  const [internalLoading, setInternalLoading] = useState(false);
  const isLoading = loading || internalLoading;
  const isDisabled = disabled || isLoading;

  const handleClick = async () => {
    if (!onClick || isDisabled) return;
    try {
      setInternalLoading(true);
      await onClick();
    } finally {
      setInternalLoading(false);
    }
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const disableHover = isDisabled ? {} : { scale: 1.02 };
  const disableTap = isDisabled ? {} : { scale: 0.97 };
  const btnTransition = {
    type: "spring" as const,
    stiffness: 400,
    damping: 17,
  };

  const content = (
    <ButtonContent loading={isLoading} size={size}>
      {children}
    </ButtonContent>
  );

  if (href && !isDisabled) {
    return (
      <motion.div
        whileHover={disableHover}
        whileTap={disableTap}
        transition={btnTransition}
        className="inline-block"
      >
        <Link href={href} className={classes} aria-label={ariaLabel}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={isDisabled}
      onClick={handleClick}
      whileHover={disableHover}
      whileTap={disableTap}
      transition={btnTransition}
      className={classes}
      aria-label={ariaLabel}
      aria-disabled={isDisabled}
    >
      {content}
    </motion.button>
  );
}
