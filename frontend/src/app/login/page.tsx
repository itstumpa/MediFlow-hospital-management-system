"use client";

import { Button } from "@/app/components/ui/Button";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { Eye, EyeOff, HeartPulse } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mock login — no actual authentication
    // In production, integrate with your auth provider
  }

  return (
    <PageTransition>
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background py-16">
        <div className="mx-auto w-full max-w-md px-4">
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-2xl font-bold text-primary-dark"
              aria-label="MediFlow home"
            >
              <HeartPulse className="h-8 w-8 text-primary" aria-hidden="true" />
              <span>MediFlow</span>
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-text-primary">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Sign in to your account to manage appointments and more.
            </p>
          </div>

          {/* Login form */}
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-primary"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-text-primary"
                >
                  Password
                </label>
                <div className="relative mt-1.5">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-sm text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
                  />
                  Remember me
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium text-primary hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <Button
                variant="primary"
                size="md"
                type="submit"
                className="w-full"
              >
                Sign in
              </Button>
            </form>

            {/* Sign up link */}
            <p className="mt-6 text-center text-sm text-text-secondary">
              Do not have an account?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-primary hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
              >
                Create one
              </Link>
            </p>

            {/* Resend verification & more links */}
            <div className="mt-4 flex flex-col items-center gap-2 text-sm text-text-secondary">
              <Link
                href="/auth/resend-verification"
                className="font-medium text-primary hover:text-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
              >
                Resend email verification
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
