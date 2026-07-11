"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff, Lock } from "lucide-react";
import { forwardRef, useState } from "react";

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField(
    {
      id,
      label,
      value,
      onChange,
      onBlur,
      error,
      placeholder = "Enter your password",
      autoComplete = "current-password",
      disabled = false,
      required = false,
    },
    ref,
  ) {
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);

    return (
      <div className="space-y-1.5">
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
          <Lock
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
            size={16}
            aria-hidden="true"
          />
          <motion.div
            animate={focused && !error ? { scale: 1.01 } : { scale: 1 }}
            className="relative"
          >
            <input
              ref={ref}
              id={id}
              type={showPassword ? "text" : "password"}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              autoComplete={autoComplete}
              disabled={disabled}
              required={required}
              onFocus={() => setFocused(true)}
              onBlur={() => {
                setFocused(false);
                onBlur?.();
              }}
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-error` : undefined}
              className={`
                w-full rounded-lg border bg-background pl-10 pr-10 py-2.5 text-sm text-text-primary
                placeholder:text-text-secondary/60
                transition-all duration-200
                focus:outline-none
                disabled:cursor-not-allowed disabled:opacity-50
                ${
                  error
                    ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20"
                    : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                }
              `}
            />
          </motion.div>
          <motion.button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-live="polite"
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              key={showPassword ? "hide" : "show"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </motion.div>
          </motion.button>
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
      </div>
    );
  },
);
