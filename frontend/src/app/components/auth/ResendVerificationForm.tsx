"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

import { AuthCard } from "@/app/components/auth/AuthCard";
import { AuthInput } from "@/app/components/auth/AuthInput";
import { CountdownTimer } from "@/app/components/auth/CountdownTimer";
import { HelpChecklist } from "@/app/components/auth/HelpChecklist";
import { LoadingButton } from "@/app/components/auth/LoadingButton";
import type { ResendErrorType } from "@/app/components/auth/ResendErrorCard";
import { ResendErrorCard } from "@/app/components/auth/ResendErrorCard";
import { ResendSuccessCard } from "@/app/components/auth/ResendSuccessCard";
import { SupportCard } from "@/app/components/auth/SupportCard";

type PageState = "form" | "success";

export function ResendVerificationForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [fieldError, setFieldError] = useState<string | undefined>();
  const [pageState, setPageState] = useState<PageState>("form");
  const [errorType, setErrorType] = useState<ResendErrorType | null>(null);
  const [countdownActive, setCountdownActive] = useState(false);
  const [countdownKey, setCountdownKey] = useState(0);

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
    setErrorType(null);

    const err = validateEmail(email);
    setFieldError(err);
    setTouched(true);
    if (err) return;

    setLoading(true);

    // Simulate API call — replace with actual integration
    try {
      // Simulate different error conditions for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setPageState("success");
      setCountdownActive(true);
      setCountdownKey((prev) => prev + 1);
    } catch {
      setErrorType("server");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setErrorType(null);
    setPageState("form");
  };

  const handleResendFromSuccess = () => {
    setPageState("form");
    setEmail("");
    setTouched(false);
    setFieldError(undefined);
    setCountdownActive(false);
  };

  const handleCountdownComplete = () => {
    setCountdownActive(false);
  };

  return (
    <div className="space-y-6">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Verify Your Email
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-center text-2xl font-bold tracking-tight text-text-primary md:text-3xl"
      >
        Resend Verification Email
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="text-center text-sm text-text-secondary leading-relaxed max-w-md mx-auto"
      >
        Enter your registered email address and we&apos;ll send you a new
        verification link.
      </motion.p>

      <AnimatePresence mode="wait">
        {pageState === "success" && !errorType ? (
          /* ===== SUCCESS STATE ===== */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            <AuthCard>
              <ResendSuccessCard
                email={email}
                onResend={handleResendFromSuccess}
              />
            </AuthCard>

            {/* Rate limiting countdown */}
            {countdownActive && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AuthCard>
                  <CountdownTimer
                    key={countdownKey}
                    seconds={60}
                    onComplete={handleCountdownComplete}
                  />
                </AuthCard>
              </motion.div>
            )}

            <HelpChecklist />
            <SupportCard />
          </motion.div>
        ) : errorType ? (
          /* ===== ERROR STATE ===== */
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            <AuthCard>
              <ResendErrorCard type={errorType} onRetry={handleRetry} />
            </AuthCard>
            <SupportCard />
          </motion.div>
        ) : (
          /* ===== FORM STATE ===== */
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <AuthCard>
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
                aria-label="Resend verification email form"
              >
                {/* Email field */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <AuthInput
                    id="resend-email"
                    label="Email address"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={fieldError}
                    icon={<Mail size={16} aria-hidden="true" />}
                    autoComplete="email"
                    required
                  />
                </motion.div>

                {/* Submit button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <LoadingButton
                    loading={loading}
                    disabled={!email || (touched && !!fieldError)}
                  >
                    Send Verification Email
                  </LoadingButton>
                </motion.div>
              </motion.form>
            </AuthCard>

            {/* Back to Login link */}
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

            <HelpChecklist />
            <SupportCard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
