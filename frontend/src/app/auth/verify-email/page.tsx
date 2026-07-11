"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Mail, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

import { AuthLayout } from "@/app/components/auth/AuthLayout";
import { ErrorMessage } from "@/app/components/auth/ErrorMessage";

type PageState = "verifying" | "success" | "error" | "expired";

export default function VerifyEmailPage() {
  const [pageState, setPageState] = useState<PageState>("verifying");
  const [loading, setLoading] = useState(false);

  // Simulate verifying the token on mount
  const verifyToken = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate success — in production, call your verify-email API
          resolve(true);
        }, 1500);
      });
      setPageState("success");
    } catch {
      setPageState("error");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRetry = () => {
    setPageState("verifying");
    verifyToken();
  };

  // Auto-verify on mount
  if (pageState === "verifying" && !loading) {
    verifyToken();
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        {pageState === "verifying" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="flex h-16 w-16 items-center justify-center"
            >
              <Mail className="h-8 w-8 text-primary" aria-hidden="true" />
            </motion.div>
            <h2 className="mt-6 text-2xl font-bold text-text-primary">
              Verifying your email
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Please wait while we verify your email address...
            </p>
          </motion.div>
        )}

        {pageState === "success" && (
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
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <CheckCircle2
                  className="h-16 w-16 text-success"
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>
            <h2 className="mt-6 text-2xl font-bold text-text-primary">
              Email Verified Successfully
            </h2>
            <p className="mt-4 text-sm text-text-secondary max-w-sm">
              Your email address has been verified. You can now access all
              features of your account.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full">
              <Link
                href="/auth/login"
                className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white
                           hover:bg-primary-dark transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Go to Login
              </Link>
              <Link
                href="/"
                className="inline-flex flex-1 items-center justify-center rounded-lg border border-border bg-surface px-6 py-2.5 text-sm font-medium text-text-primary
                           hover:bg-background transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Go to Homepage
              </Link>
            </div>
          </motion.div>
        )}

        {pageState === "error" && (
          <ErrorMessage
            title="Verification Failed"
            message="We could not verify your email address. The link may have expired or is invalid."
            onRetry={handleRetry}
          />
        )}

        {pageState === "expired" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-warning/10"
            >
              <Mail className="h-10 w-10 text-warning" aria-hidden="true" />
            </motion.div>
            <h2 className="mt-6 text-2xl font-bold text-text-primary">
              Verification Link Expired
            </h2>
            <p className="mt-2 text-sm text-text-secondary max-w-sm">
              Your email verification link has expired. Request a new one to
              continue.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full">
              <Link
                href="/auth/resend-verification"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white
                           hover:bg-primary-dark transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <RefreshCw size={15} aria-hidden="true" />
                Resend Verification
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex flex-1 items-center justify-center rounded-lg border border-border bg-surface px-6 py-2.5 text-sm font-medium text-text-primary
                           hover:bg-background transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Back to Login
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </AuthLayout>
  );
}
