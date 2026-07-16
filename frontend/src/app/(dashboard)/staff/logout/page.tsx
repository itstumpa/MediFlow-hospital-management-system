"use client";

import { motion } from "framer-motion";
import { ArrowRight, LogOut } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

import { DashboardContainer } from "@/components/dashboard/staff/DashboardContainer";
import { DashboardContent } from "@/components/dashboard/staff/DashboardContent";

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
    <DashboardContainer>
      <DashboardContent>
        <div className="w-full max-w-md mx-auto text-center py-12">
          {pageState === "confirm" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
              >
                <LogOut className="h-9 w-9 text-primary" aria-hidden="true" />
              </motion.div>

              <h1 className="mt-6 text-2xl font-bold text-text-primary">
                Sign Out
              </h1>
              <p className="mt-2 text-sm text-text-secondary">
                Are you sure you want to sign out of your staff account?
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <motion.button
                  type="button"
                  onClick={handleLogout}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Sign Out
                </motion.button>
                <Link
                  href="/staff"
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-sm font-semibold text-text-primary transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  Cancel
                </Link>
              </div>
            </motion.div>
          )}

          {pageState === "logging-out" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
              >
                <LogOut className="h-9 w-9 text-primary" aria-hidden="true" />
              </motion.div>

              <h1 className="mt-6 text-2xl font-bold text-text-primary">
                Signing Out...
              </h1>
              <p className="mt-2 text-sm text-text-secondary">
                Please wait while we sign you out securely.
              </p>
            </motion.div>
          )}

          {pageState === "done" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100"
              >
                <svg
                  className="h-9 w-9 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>

              <h1 className="mt-6 text-2xl font-bold text-text-primary">
                Signed Out
              </h1>
              <p className="mt-2 text-sm text-text-secondary">
                You have been successfully signed out of your staff account.
              </p>

              <div className="mt-8">
                <Link
                  href="/auth/login"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  Sign In Again
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </DashboardContent>
    </DashboardContainer>
  );
}
