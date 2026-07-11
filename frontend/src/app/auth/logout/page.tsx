"use client";

import { motion } from "framer-motion";
import { ArrowRight, LogOut } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

import { AuthLayout } from "@/app/components/auth/AuthLayout";

type PageState = "confirm" | "logging-out" | "done";

export default function LogoutPage() {
  const [pageState, setPageState] = useState<PageState>("confirm");

  const handleLogout = useCallback(async () => {
    setPageState("logging-out");
    // Simulate logout — replace with real auth sign-out
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPageState("done");
  }, []);

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto text-center">
        {pageState === "confirm" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
            >
              <LogOut className="h-9 w-9 text-primary" aria-hidden="true" />
            </motion.div>

            <h1 className="mt-6 text-2xl font-bold text-text-primary">
              Sign Out
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Are you sure you want to sign out of your account?
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <motion.button
                type="button"
                onClick={handleLogout}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white
                           hover:bg-primary-dark transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <LogOut size={15} aria-hidden="true" />
                Yes, Sign Out
              </motion.button>
              <Link
                href="/"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-6 py-2.5 text-sm font-medium text-text-primary
                           hover:bg-background transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <ArrowRight size={15} aria-hidden="true" />
                Stay Signed In
              </Link>
            </div>
          </motion.div>
        )}

        {pageState === "logging-out" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="flex h-16 w-16 items-center justify-center"
            >
              <LogOut className="h-8 w-8 text-primary" aria-hidden="true" />
            </motion.div>
            <h2 className="mt-6 text-xl font-semibold text-text-primary">
              Signing out...
            </h2>
          </motion.div>
        )}

        {pageState === "done" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <LogOut className="h-9 w-9 text-success" aria-hidden="true" />
              </motion.div>
            </motion.div>

            <h2 className="mt-6 text-2xl font-bold text-text-primary">
              You&apos;ve Been Signed Out
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              You have been successfully signed out of your account.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/auth/login"
                className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white
                           hover:bg-primary-dark transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Sign In Again
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
      </div>
    </AuthLayout>
  );
}
