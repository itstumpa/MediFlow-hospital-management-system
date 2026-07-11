"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";
import Link from "next/link";
import { FormEvent, useCallback, useState } from "react";
import { EnhancedPasswordStrength } from "./EnhancedPasswordStrength";
import { ErrorCard } from "./ErrorCard";
import { ExpiredLinkCard } from "./ExpiredLinkCard";
import { PasswordChecklist } from "./PasswordChecklist";
import { PasswordField } from "./PasswordField";
import { SecurityTips } from "./SecurityTips";
import { SuccessCard } from "./SuccessCard";

type PageState = "form" | "success" | "error" | "expired";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [pageState, setPageState] = useState<PageState>("form");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorVariant, setErrorVariant] = useState<
    "generic" | "expired" | "invalid" | "server" | "network"
  >("generic");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = useCallback((): boolean => {
    const newErrors: { password?: string; confirmPassword?: string } = {};

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Include at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = "Include at least one lowercase letter.";
    } else if (!/\d/.test(password)) {
      newErrors.password = "Include at least one number.";
    } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      newErrors.password = "Include at least one special character.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [password, confirmPassword]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    // Simulate API call — replace with real updatePassword call
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate success for valid-looking tokens
          if (token && token.length > 10) {
            resolve(true);
          } else {
            reject(new Error("INVALID_TOKEN"));
          }
        }, 1500);
      });
      setPageState("success");
    } catch (err: unknown) {
      const error = err as { message?: string };
      if (error?.message === "EXPIRED_TOKEN" || error?.message === "expired") {
        setPageState("expired");
      } else if (
        error?.message === "INVALID_TOKEN" ||
        error?.message === "invalid"
      ) {
        setErrorVariant("invalid");
        setPageState("error");
      } else {
        setErrorVariant("generic");
        setPageState("error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setPageState("form");
    setErrorVariant("generic");
  };

  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {pageState === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary 
                           transition-colors mb-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                Back to Login
              </Link>
            </motion.div>

            {/* Security badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/5 border border-primary/10 px-3.5 py-1.5 mb-4"
            >
              <Lock size={12} className="text-primary" aria-hidden="true" />
              <span className="text-xs font-medium text-primary">
                Account Security
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold text-text-primary"
            >
              Create a New Password
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-1 text-sm text-text-secondary"
            >
              Your new password must be different from your previously used
              passwords.
            </motion.p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <PasswordField
                  id="new-password"
                  label="New Password"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(value) => {
                    setPassword(value);
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: undefined }));
                    }
                  }}
                  error={errors.password}
                  disabled={isLoading}
                  autoComplete="new-password"
                />

                {/* Live password checklist */}
                <div className="mt-2">
                  <PasswordChecklist password={password} />
                </div>

                {/* Strength meter */}
                <div className="mt-2">
                  <EnhancedPasswordStrength password={password} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <motion.div
                  className="relative"
                  animate={
                    errors.confirmPassword ? { x: [0, -2, 2, -2, 2, 0] } : {}
                  }
                  transition={{ duration: 0.3 }}
                >
                  <label
                    htmlFor="confirmPassword"
                    className="mb-1.5 block text-xs font-medium text-text-primary"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Lock
                        size={15}
                        className={
                          confirmPassword && passwordsMatch
                            ? "text-success"
                            : errors.confirmPassword
                              ? "text-danger"
                              : "text-text-tertiary"
                        }
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) {
                          setErrors((prev) => ({
                            ...prev,
                            confirmPassword: undefined,
                          }));
                        }
                      }}
                      placeholder="Re-enter your new password"
                      disabled={isLoading}
                      autoComplete="new-password"
                      aria-invalid={!!errors.confirmPassword}
                      aria-describedby={
                        errors.confirmPassword
                          ? "confirmPassword-error"
                          : undefined
                      }
                      className={`w-full rounded-lg border bg-surface py-2.5 pl-10 pr-10 text-sm
                                text-text-primary placeholder-text-tertiary
                                transition-all duration-200
                                outline-none ring-0
                                ${
                                  errors.confirmPassword
                                    ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20"
                                    : confirmPassword && passwordsMatch
                                      ? "border-success focus:border-success focus:ring-2 focus:ring-success/20"
                                      : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                                }
                                disabled:cursor-not-allowed disabled:opacity-50`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-tertiary hover:text-text-secondary transition-colors"
                      tabIndex={-1}
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={15} aria-hidden="true" />
                      ) : (
                        <Eye size={15} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <motion.p
                      id="confirmPassword-error"
                      initial={{ opacity: 0, y: -2 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 flex items-center gap-1 text-xs text-danger"
                      role="alert"
                    >
                      <AlertCircle size={10} aria-hidden="true" />
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </motion.div>
              </motion.div>

              {/* Submit button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={!isLoading ? { scale: 1.01 } : {}}
                  whileTap={!isLoading ? { scale: 0.99 } : {}}
                  className="relative w-full overflow-hidden rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white
                             hover:bg-primary-dark transition-colors shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className={isLoading ? "opacity-0" : "opacity-100"}>
                    Update Password
                  </span>
                  {isLoading && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <svg
                        className="h-5 w-5 animate-spin text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      <span className="ml-2 text-xs">Updating Password...</span>
                    </motion.span>
                  )}
                </motion.button>
              </motion.div>
            </form>

            {/* Security Tips */}
            <div className="mt-6">
              <SecurityTips />
            </div>
          </motion.div>
        )}

        {pageState === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SuccessCard />
          </motion.div>
        )}

        {pageState === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ErrorCard variant={errorVariant} onRetry={handleRetry} />
          </motion.div>
        )}

        {pageState === "expired" && (
          <motion.div
            key="expired"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ExpiredLinkCard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
