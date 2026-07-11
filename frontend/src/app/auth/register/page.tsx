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
import { PasswordStrength } from "@/app/components/auth/PasswordStrength";
import { SocialLoginButtons } from "@/app/components/auth/SocialLoginButtons";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

const GENDERS = [
  { value: "", label: "Select gender" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    password: "",
    confirmPassword: "",
    terms: false,
    newsletter: false,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateField = useCallback((field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const validateField = useCallback(
    (field: string, value: string | boolean): string | undefined => {
      switch (field) {
        case "firstName": {
          if (!value || (typeof value === "string" && !value.trim()))
            return "First name is required";
          if (typeof value === "string" && value.length < 2)
            return "First name must be at least 2 characters";
          return undefined;
        }
        case "lastName": {
          if (!value || (typeof value === "string" && !value.trim()))
            return "Last name is required";
          return undefined;
        }
        case "email": {
          if (!value) return "Email is required";
          if (
            typeof value === "string" &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          )
            return "Please enter a valid email address";
          return undefined;
        }
        case "phone": {
          if (!value) return "Phone number is required";
          if (typeof value === "string" && !/^[\d\s\-+()]{7,15}$/.test(value))
            return "Please enter a valid phone number";
          return undefined;
        }
        case "dateOfBirth": {
          if (!value) return "Date of birth is required";
          const birthDate = new Date(value as string);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          if (age < 18) return "You must be at least 18 years old";
          if (age > 150) return "Please enter a valid date of birth";
          return undefined;
        }
        case "gender": {
          if (!value) return "Please select your gender";
          return undefined;
        }
        case "password": {
          if (!value) return "Password is required";
          if (typeof value === "string" && value.length < 8)
            return "Password must be at least 8 characters";
          if (typeof value === "string" && !/[A-Z]/.test(value))
            return "Password must contain an uppercase letter";
          if (typeof value === "string" && !/[a-z]/.test(value))
            return "Password must contain a lowercase letter";
          if (typeof value === "string" && !/\d/.test(value))
            return "Password must contain a number";
          if (
            typeof value === "string" &&
            !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)
          )
            return "Password must contain a special character";
          return undefined;
        }
        case "confirmPassword": {
          if (!value) return "Please confirm your password";
          if (value !== formData.password) return "Passwords do not match";
          return undefined;
        }
        case "terms": {
          if (!value) return "You must agree to the Privacy Policy & Terms";
          return undefined;
        }
        default:
          return undefined;
      }
    },
    [formData.password],
  );

  const handleChange = useCallback(
    (field: string, value: string) => {
      updateField(field, value);
      if (touched[field]) {
        const error = validateField(field, value);
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    },
    [touched, updateField, validateField],
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
    if (!formData.terms) return false;
    const fieldsToCheck: (keyof FormErrors)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "dateOfBirth",
      "gender",
      "password",
      "confirmPassword",
    ];
    for (const field of fieldsToCheck) {
      const val = formData[field as keyof typeof formData];
      const err = validateField(field, typeof val === "string" ? val : "");
      if (err) return false;
    }
    return true;
  }, [formData, validateField]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Touch all fields
    const allTouched: Record<string, boolean> = {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      dateOfBirth: true,
      gender: true,
      password: true,
      confirmPassword: true,
      terms: true,
    };
    setTouched(allTouched);

    const newErrors: FormErrors = {};
    const fields: (keyof FormErrors)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "dateOfBirth",
      "gender",
      "password",
      "confirmPassword",
      "terms",
    ];
    let hasError = false;
    for (const field of fields) {
      const val = formData[field as keyof typeof formData];
      const err = validateField(field, val);
      if (err) {
        newErrors[field] = err;
        hasError = true;
      }
    }
    setErrors(newErrors);
    if (hasError) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      setSuccess(true);
    } catch {
      setSubmitError("Unable to create your account. Please try again later.");
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
              animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }}
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
            Account created successfully!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-2 text-sm text-text-secondary max-w-sm"
          >
            Welcome to MediFlow. You can now book appointments, access medical
            records, and connect with trusted specialists.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white
                         hover:bg-primary-dark transition-colors shadow-sm hover:shadow-md
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Sign in to your account
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-6 py-2.5 text-sm font-medium text-text-primary
                         hover:bg-background transition-colors
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Go to Home
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
          title="Create Your Patient Account"
          description="Join MediFlow to book appointments, manage your healthcare, and connect with trusted specialists."
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
            {/* Name row */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <motion.div variants={staggerItem}>
                <AuthInput
                  id="register-first-name"
                  label="First Name"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(v) => handleChange("firstName", v)}
                  onBlur={() => handleBlur("firstName", formData.firstName)}
                  error={errors.firstName}
                  autoComplete="given-name"
                  required
                />
              </motion.div>
              <motion.div variants={staggerItem}>
                <AuthInput
                  id="register-last-name"
                  label="Last Name"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(v) => handleChange("lastName", v)}
                  onBlur={() => handleBlur("lastName", formData.lastName)}
                  error={errors.lastName}
                  autoComplete="family-name"
                  required
                />
              </motion.div>
            </div>

            <motion.div variants={staggerItem}>
              <AuthInput
                id="register-email"
                label="Email address"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(v) => handleChange("email", v)}
                onBlur={() => handleBlur("email", formData.email)}
                error={errors.email}
                autoComplete="email"
                required
              />
            </motion.div>

            <motion.div variants={staggerItem}>
              <AuthInput
                id="register-phone"
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(v) => handleChange("phone", v)}
                onBlur={() => handleBlur("phone", formData.phone)}
                error={errors.phone}
                autoComplete="tel"
                required
              />
            </motion.div>

            {/* DOB & Gender row */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <motion.div variants={staggerItem}>
                <AuthInput
                  id="register-dob"
                  label="Date of Birth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(v) => handleChange("dateOfBirth", v)}
                  onBlur={() => handleBlur("dateOfBirth", formData.dateOfBirth)}
                  error={errors.dateOfBirth}
                  autoComplete="bdate"
                  required
                />
              </motion.div>
              <motion.div variants={staggerItem} className="space-y-1.5">
                <label
                  htmlFor="register-gender"
                  className="block text-sm font-medium text-text-primary"
                >
                  Gender
                  <span className="ml-0.5 text-danger" aria-hidden="true">
                    *
                  </span>
                </label>
                <select
                  id="register-gender"
                  value={formData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  onBlur={() => handleBlur("gender", formData.gender)}
                  required
                  aria-invalid={!!errors.gender}
                  aria-describedby={errors.gender ? "gender-error" : undefined}
                  className={`
                    w-full rounded-lg border bg-background px-4 py-2.5 text-sm
                    transition-all duration-200
                    focus:outline-none
                    ${formData.gender ? "text-text-primary" : "text-text-secondary/60"}
                    ${
                      errors.gender
                        ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20"
                        : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }
                  `}
                >
                  {GENDERS.map((g) => (
                    <option
                      key={g.value}
                      value={g.value}
                      className="text-text-primary"
                    >
                      {g.label}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <motion.p
                    id="gender-error"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-danger"
                    role="alert"
                  >
                    {errors.gender}
                  </motion.p>
                )}
              </motion.div>
            </div>

            {/* Password */}
            <motion.div variants={staggerItem}>
              <PasswordField
                id="register-password"
                label="Password"
                value={formData.password}
                onChange={(v) => handleChange("password", v)}
                onBlur={() => handleBlur("password", formData.password)}
                error={errors.password}
                autoComplete="new-password"
                required
              />
              <div className="mt-2">
                <PasswordStrength password={formData.password} />
              </div>
            </motion.div>

            {/* Confirm Password */}
            <motion.div variants={staggerItem}>
              <PasswordField
                id="register-confirm-password"
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={(v) => handleChange("confirmPassword", v)}
                onBlur={() =>
                  handleBlur("confirmPassword", formData.confirmPassword)
                }
                error={errors.confirmPassword}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                required
              />
            </motion.div>

            {/* Checkboxes */}
            <motion.div variants={staggerItem} className="space-y-3">
              <label className="flex cursor-pointer items-start gap-3 text-sm text-text-secondary select-none">
                <div className="relative flex items-center justify-center mt-0.5">
                  <input
                    type="checkbox"
                    checked={formData.terms}
                    onChange={(e) => {
                      updateField("terms", e.target.checked);
                      if (touched.terms) {
                        const err = validateField("terms", e.target.checked);
                        setErrors((prev) => ({ ...prev, terms: err }));
                      }
                    }}
                    onBlur={() => {
                      setTouched((prev) => ({ ...prev, terms: true }));
                      const err = validateField("terms", formData.terms);
                      setErrors((prev) => ({ ...prev, terms: err }));
                    }}
                    className="peer h-4 w-4 appearance-none rounded border border-border bg-background
                               checked:border-primary checked:bg-primary
                               focus:outline-none focus:ring-2 focus:ring-primary/20
                               transition-all duration-200"
                    aria-invalid={!!errors.terms}
                    aria-describedby={errors.terms ? "terms-error" : undefined}
                  />
                  <motion.svg
                    className="pointer-events-none absolute h-3 w-3 text-white"
                    viewBox="0 0 12 12"
                    initial={false}
                    animate={
                      formData.terms
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
                <span>
                  I agree to the{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-primary hover:text-primary-dark transition-colors"
                  >
                    Privacy Policy
                  </Link>{" "}
                  &amp;{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-primary hover:text-primary-dark transition-colors"
                  >
                    Terms
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <motion.p
                  id="terms-error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-danger ml-7"
                  role="alert"
                >
                  {errors.terms}
                </motion.p>
              )}

              <label className="flex cursor-pointer items-start gap-3 text-sm text-text-secondary select-none">
                <div className="relative flex items-center justify-center mt-0.5">
                  <input
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={(e) =>
                      updateField("newsletter", e.target.checked)
                    }
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
                      formData.newsletter
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
                <span>
                  I&apos;d like to receive health tips and updates (optional)
                </span>
              </label>
            </motion.div>

            {/* Submit */}
            <motion.div variants={staggerItem}>
              <LoadingButton
                loading={loading}
                disabled={!isFormValid && Object.keys(touched).length > 0}
              >
                Create Account
              </LoadingButton>
            </motion.div>
          </motion.form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="my-5"
          >
            <Divider />
          </motion.div>

          {/* Social buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <SocialLoginButtons mode="register" />
          </motion.div>
        </AuthCard>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <BenefitsList variant="register" />
        </motion.div>

        <AuthFooter
          text="Already have an account?"
          linkText="Sign In"
          href="/auth/login"
        />
      </div>
    </AuthLayout>
  );
}
