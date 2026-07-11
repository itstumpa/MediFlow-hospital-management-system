"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

import { AuthCard } from "@/app/components/auth/AuthCard";
import { AuthFooter } from "@/app/components/auth/AuthFooter";
import { AuthHeader } from "@/app/components/auth/AuthHeader";
import { AuthInput } from "@/app/components/auth/AuthInput";
import { AuthLayout } from "@/app/components/auth/AuthLayout";
import { BenefitsList } from "@/app/components/auth/BenefitsList";
import { Divider } from "@/app/components/auth/Divider";
import { ErrorMessage } from "@/app/components/auth/ErrorMessage";
import { LoadingButton } from "@/app/components/auth/LoadingButton";
import { PasswordField } from "@/app/components/auth/PasswordField";
import { SocialLoginButtons } from "@/app/components/auth/SocialLoginButtons";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Real-time validation
  const validateField = useCallback(
    (field: string, value: string): string | undefined => {
      switch (field) {
        case "email": {
          if (!value) return "Email is required";
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            return "Please enter a valid email address";
          return undefined;
        }
        case "password": {
          if (!value) return "Password is required";
          if (value.length < 6) return "Password must be at least 6 characters";
          return undefined;
        }
        default:
          return undefined;
      }
    },
    [],
  );

  const handleChange = useCallback(
    (field: string, value: string) => {
      if (field === "email") setEmail(value);
      if (field === "password") setPassword(value);
      if (touched[field]) {
        const error = validateField(field, value);
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    },
    [touched, validateField],
  );

  const handleBlur = useCallback(
    (field: string, value: string) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    [validateField],
  );

  const isFormValid = useMemo(() => {
    const emailErr = validateField("email", email);
    const passErr = validateField("password", password);
    return !emailErr && !passErr && email !== "" && password !== "";
  }, [email, password, validateField]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Touch all fields
    setTouched({ email: true, password: true });
    const emailErr = validateField("email", email);
    const passErr = validateField("password", password);
    setErrors({ email: emailErr, password: passErr });

    if (emailErr || passErr) return;

    setLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccess(true);
    } catch {
      setSubmitError(
        "Unable to sign in. Please check your credentials and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (success) {
    return (
      <AuthLayout>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, -5, 5, 0],
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10"
            >
              <svg
                className="h-10 w-10 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-2xl font-bold text-text-primary"
          >
            Welcome back!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-2 text-sm text-text-secondary"
          >
            You have been signed in successfully.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white
                         hover:bg-primary-dark transition-colors shadow-sm hover:shadow-md
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Go to Dashboard
            </Link>
          </motion.div>
        </motion.div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <AuthHeader
          title="Welcome Back"
          description="Sign in securely to access your appointments, medical records, and healthcare services."
        />

        <AuthCard>
          <AnimatePresence mode="wait">
            {submitError && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4"
              >
                <ErrorMessage
                  message={submitError}
                  onRetry={() => setSubmitError(null)}
                  retryLabel="Dismiss"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            noValidate
          >
            <motion.div variants={staggerItem}>
              <AuthInput
                id="login-email"
                label="Email address"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(v) => handleChange("email", v)}
                onBlur={() => handleBlur("email", email)}
                error={errors.email}
                autoComplete="email"
                required
              />
            </motion.div>

            <motion.div variants={staggerItem}>
              <PasswordField
                id="login-password"
                label="Password"
                value={password}
                onChange={(v) => handleChange("password", v)}
                onBlur={() => handleBlur("password", password)}
                error={errors.password}
                autoComplete="current-password"
                required
              />
            </motion.div>

            {/* Remember me & Forgot password */}
            <motion.div
              variants={staggerItem}
              className="flex items-center justify-between"
            >
              <label className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary select-none">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer h-4 w-4 appearance-none rounded border border-border bg-background
                               checked:border-primary checked:bg-primary
                               focus:outline-none focus:ring-2 focus:ring-primary/20
                               transition-all duration-200"
                  />
                  <motion.svg
                    className="pointer-events-none absolute h-3 w-3 text-white"
                    viewBox="0 0 12 12"
                    initial={false}
                    animate={
                      rememberMe
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.5 }
                    }
                    transition={{ duration: 0.15 }}
                  >
                    <path
                      d="M2.5 6L5 8.5L9.5 3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </div>
                Remember me
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm font-medium text-primary hover:text-primary-dark transition-colors
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
              >
                Forgot password?
              </Link>
            </motion.div>

            {/* Submit */}
            <motion.div variants={staggerItem}>
              <LoadingButton
                loading={loading}
                disabled={!isFormValid && Object.keys(touched).length > 0}
              >
                Sign in
              </LoadingButton>
            </motion.div>
          </motion.form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="my-5"
          >
            <Divider />
          </motion.div>

          {/* Social buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <SocialLoginButtons mode="login" />
          </motion.div>
        </AuthCard>

        {/* Extra section - Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <BenefitsList variant="login" />
        </motion.div>

        <AuthFooter
          text="Don't have an account?"
          linkText="Create Account"
          href="/auth/register"
        />
      </div>
    </AuthLayout>
  );
}
