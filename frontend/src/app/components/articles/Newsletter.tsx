"use client";

import { fadeUpLarge } from "@/lib/animations/fade";
import { motion } from "framer-motion";
import { BellRing, Mail, Send } from "lucide-react";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubscribed(true);
    setIsLoading(false);
  };

  return (
    <section className="mx-auto max-w-page px-4 py-12 md:px-6 lg:px-8">
      <motion.div
        variants={fadeUpLarge}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-[#0a5f5e] p-8 md:p-12"
      >
        {/* Decorative elements */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
          <svg
            className="absolute right-[10%] top-[20%] h-24 w-24 text-white/5"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path
              d="M50 20v60M20 50h60"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <circle
              cx="50"
              cy="50"
              r="35"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </div>

        <div className="relative">
          <div className="mx-auto max-w-2xl text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm"
            >
              <BellRing className="h-8 w-8 text-white" aria-hidden="true" />
            </motion.div>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6"
              >
                <h3 className="mb-3 text-2xl font-bold text-white">
                  You&apos;re Subscribed! 🎉
                </h3>
                <p className="text-white/80">
                  Thank you for subscribing. You&apos;ll receive trusted health
                  advice directly in your inbox.
                </p>
              </motion.div>
            ) : (
              <>
                <h3 className="mb-3 text-2xl font-bold text-white md:text-3xl">
                  Stay Updated
                </h3>
                <p className="mb-8 text-base text-white/80">
                  Receive trusted health advice directly in your inbox.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
                >
                  <div className="relative flex-1">
                    <Mail
                      className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
                      aria-hidden="true"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-11 py-3 text-sm text-white placeholder:text-white/50 transition-all focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                      aria-label="Email address for newsletter"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary-dark shadow-lg transition-all hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-70"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-dark border-t-transparent" />
                        Subscribing...
                      </span>
                    ) : (
                      <>
                        Subscribe
                        <Send className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </motion.button>
                </form>

                <p className="mt-4 text-xs text-white/60">
                  By subscribing, you agree to our Privacy Policy. No spam,
                  unsubscribe anytime.
                </p>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
