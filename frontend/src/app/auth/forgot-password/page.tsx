"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

import { AuthCard } from "@/app/components/auth/AuthCard";
import { AuthHeader } from "@/app/components/auth/AuthHeader";
import { AuthInput } from "@/app/components/auth/AuthInput";
import { AuthLayout } from "@/app/components/auth/AuthLayout";
import { ErrorMessage } from "@/app/components/auth/ErrorMessage";
import { LoadingButton } from "@/app/components/auth/LoadingButton";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [fieldError, setFieldError] = useState<string | undefined>();

  const validateEmail = useCallback((value: string): string | undefined => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Please enter a valid email address";
    return undefined;
  }, []);

  const handleChange = (value: string) => {
    setEmail(value);
    if (touched) {
      setFieldError(validateEmail(value));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setFieldError(validateEmail(email));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const err = validateEmail(email);
    setFieldError(err);
    setTouched(true);
    if (err) return;

    setLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSent(true);
    } catch {
      setError("Failed to send reset link. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <AuthHeader
          title="Forgot Your Password?"
          description="Enter your email address and we'll send you a secure password reset link."
        />

        <AnimatePresence mode="wait">
          {sent ? (
            /* Success State */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <AuthCard>
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -4, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
                    >
                      <Mail
                        className="h-10 w-10 text-primary"
                        aria-hidden="true"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 text-2xl font-bold text-text-primary"
                  >
                    Check your inbox
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-2 text-sm text-text-secondary"
                  >
                    We&apos;ve sent a password reset link to{" "}
                    <span className="font-medium text-text-primary">
                      {email}
                    </span>
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-2 rounded-lg bg-primary/5 px-4 py-2 text-xs text-text-secondary"
                  >
                    Didn&apos;t receive the email? Check your spam folder or{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setSent(false);
                        setLoading(false);
                        setError(null);
                      }}
                      className="font-medium text-primary hover:text-primary-dark transition-colors
                                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
                    >
                      try again
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 w-full"
                  >
                    <Link
                      href="/auth/login"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white
                                 hover:bg-primary-dark transition-colors shadow-sm hover:shadow-md
                                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      Return to Login
                    </Link>
                  </motion.div>
                </div>
              </AuthCard>
            </motion.div>
          ) : (
            /* Forgot Password Form */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <AuthCard>
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-4"
                    >
                      <ErrorMessage
                        message={error}
                        onRetry={() => setError(null)}
                        retryLabel="Dismiss"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <AuthInput
                      id="forgot-email"
                      label="Email address"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={fieldError}
                      autoComplete="email"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <LoadingButton
                      loading={loading}
                      disabled={!email || (touched && !!fieldError)}
                      showArrow={false}
                    >
                      Send Reset Link
                    </LoadingButton>
                  </motion.div>
                </motion.form>
              </AuthCard>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
                >
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: -3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </motion.span>
                  Back to Login
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AuthLayout>
  );
}
