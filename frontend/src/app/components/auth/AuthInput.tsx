"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { forwardRef, useState } from "react";

interface AuthInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  icon?: ReactNode;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
}

const inputVariants = {
  focus: { scale: 1.01 },
  blur: { scale: 1 },
};

const errorShake = {
  shake: {
    x: [0, -4, 4, -4, 4, -2, 2, 0],
    transition: { duration: 0.4 },
  },
};

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  function AuthInput(
    {
      id,
      label,
      type = "text",
      placeholder,
      value,
      onChange,
      onBlur,
      error,
      icon,
      autoComplete,
      disabled = false,
      required = false,
      maxLength,
    },
    ref,
  ) {
    const [focused, setFocused] = useState(false);

    return (
      <motion.div
        variants={error ? errorShake : undefined}
        animate={error ? "shake" : undefined}
        className="space-y-1.5"
      >
        <label
          htmlFor={id}
          className="block text-sm font-medium text-text-primary"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-danger" aria-hidden="true">
              *
            </span>
          )}
        </label>
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
              {icon}
            </div>
          )}
          <motion.div
            variants={inputVariants}
            animate={focused && !error ? "focus" : "blur"}
            className="relative"
          >
            <input
              ref={ref}
              id={id}
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              autoComplete={autoComplete}
              disabled={disabled}
              required={required}
              maxLength={maxLength}
              onFocus={() => setFocused(true)}
              onBlur={() => {
                setFocused(false);
                onBlur?.();
              }}
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-error` : undefined}
              className={`
                w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-text-primary
                placeholder:text-text-secondary/60
                transition-all duration-200
                focus:outline-none
                disabled:cursor-not-allowed disabled:opacity-50
                ${icon ? "pl-10" : ""}
                ${
                  error
                    ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20"
                    : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                }
              `}
            />
          </motion.div>
        </div>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-danger"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    );
  },
);
