"use client";

import { Button } from "@/app/components/ui/Button";
import { slideLeft, slideRight } from "@/lib/animations/slide";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  Clock,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
  XCircle,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  doctor: string;
  subject: string;
  message: string;
  interestedInAppointment: boolean;
  preferredDate: string;
  preferredTime: string;
  agreeToPrivacy: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  department: "",
  doctor: "",
  subject: "",
  message: "",
  interestedInAppointment: false,
  preferredDate: "",
  preferredTime: "",
  agreeToPrivacy: false,
};

const departments = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Ophthalmology",
  "Pulmonology",
  "ENT",
  "General Surgery",
  "Gynecology",
  "Dermatology",
];

const doctorsByDepartment: Record<string, string[]> = {
  Cardiology: ["Dr. Sarah Rahman", "Dr. Michael Torres"],
  Neurology: ["Dr. James Mitchell", "Dr. Emily Watson"],
  Pediatrics: ["Dr. Ayesha Khan"],
  Orthopedics: ["Dr. Robert Chen"],
  Ophthalmology: ["Dr. Maria Santos"],
  Pulmonology: ["Dr. David Kim"],
  ENT: ["Dr. Fatima Hassan"],
  "General Surgery": ["Dr. John Miller"],
  Gynecology: ["Dr. Lisa Thompson"],
  Dermatology: ["Dr. Kevin Park"],
};

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

export function ContactForm() {
  const reduced = useReducedMotion();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[\d\s\-+()]{7,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.department) {
      newErrors.department = "Please select a department";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    if (formData.interestedInAppointment) {
      if (!formData.preferredDate) {
        newErrors.preferredDate = "Please select a preferred date";
      }
      if (!formData.preferredTime) {
        newErrors.preferredTime = "Please select a preferred time";
      }
    }
    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = "You must agree to the privacy policy";
    }

    return newErrors;
  }, [formData]);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value, type } = e.target;
      const checked =
        type === "checkbox"
          ? (e as React.ChangeEvent<HTMLInputElement>).target.checked
          : undefined;

      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      // Clear error on change
      if (errors[name]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    },
    [errors],
  );

  const handleBlur = useCallback(
    (
      e: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      // Validate single field
      if (name === "firstName" && !formData.firstName.trim()) {
        setErrors((prev) => ({ ...prev, firstName: "First name is required" }));
      } else if (name === "lastName" && !formData.lastName.trim()) {
        setErrors((prev) => ({ ...prev, lastName: "Last name is required" }));
      } else if (name === "email") {
        if (!formData.email.trim()) {
          setErrors((prev) => ({ ...prev, email: "Email is required" }));
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          setErrors((prev) => ({
            ...prev,
            email: "Please enter a valid email address",
          }));
        }
      } else if (name === "phone") {
        if (!formData.phone.trim()) {
          setErrors((prev) => ({ ...prev, phone: "Phone is required" }));
        } else if (!/^[\d\s\-+()]{7,}$/.test(formData.phone)) {
          setErrors((prev) => ({
            ...prev,
            phone: "Please enter a valid phone number",
          }));
        }
      } else if (name === "department" && !formData.department) {
        setErrors((prev) => ({
          ...prev,
          department: "Please select a department",
        }));
      } else if (name === "subject" && !formData.subject.trim()) {
        setErrors((prev) => ({ ...prev, subject: "Subject is required" }));
      }
    },
    [formData],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors = validateForm();
      setErrors(newErrors);
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        department: true,
        subject: true,
        message: true,
        agreeToPrivacy: true,
        ...(formData.interestedInAppointment
          ? { preferredDate: true, preferredTime: true }
          : {}),
      });

      if (Object.keys(newErrors).length > 0) return;

      setStatus("loading");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock success
      setStatus("success");
    },
    [formData, validateForm],
  );

  const handleReset = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setTouched({});
    setStatus("idle");
  }, []);

  const inputClasses = (
    fieldName: string,
    hasError: boolean,
  ) => `mt-1.5 w-full rounded-lg border px-4 py-2.5 text-sm transition-all duration-200
    ${
      hasError
        ? "border-danger/60 bg-danger/5 text-text-primary focus:border-danger focus:ring-2 focus:ring-danger/20"
        : "border-border bg-surface text-text-primary placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
    }
    focus:outline-none`;

  const labelClasses = "block text-sm font-medium text-text-primary";
  const errorTextClasses = "mt-1 text-xs text-danger flex items-center gap-1";

  const availableDoctors = useMemo(
    () =>
      formData.department ? doctorsByDepartment[formData.department] || [] : [],
    [formData.department],
  );

  if (status === "success") {
    return (
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form area - success state */}
            <motion.div
              initial={reduced ? undefined : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-success/20 bg-success/5 p-12 text-center"
            >
              <motion.div
                initial={reduced ? undefined : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={
                  reduced
                    ? undefined
                    : { type: "spring", stiffness: 200, damping: 15 }
                }
                className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10"
              >
                <CheckCircle
                  className="h-10 w-10 text-success"
                  aria-hidden="true"
                />
              </motion.div>
              <motion.h2
                initial={reduced ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-2xl font-bold text-text-primary"
              >
                Message Sent Successfully!
              </motion.h2>
              <motion.p
                initial={reduced ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-3 max-w-md text-sm text-text-secondary"
              >
                Thank you for reaching out. Our team typically responds within
                24 hours. You&apos;ll receive a confirmation at your email
                shortly.
              </motion.p>
              <motion.div
                initial={reduced ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <Button variant="primary" onClick={handleReset}>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send Another Message
                </Button>
              </motion.div>
            </motion.div>

            {/* Right side placeholder for layout balance */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background py-16 md:py-24" id="contact-form">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <motion.div
            variants={reduced ? undefined : slideLeft}
            initial={reduced ? undefined : "hidden"}
            whileInView={reduced ? undefined : "visible"}
            viewport={reduced ? undefined : { once: true, amount: 0.1 }}
          >
            <div className="mb-8">
              <h2 className="text-[28px] font-bold leading-[1.15] tracking-tight text-text-primary sm:text-3xl md:text-4xl">
                Send Us a Message
              </h2>
              <p className="mt-3 text-base leading-relaxed text-text-secondary">
                Fill out the form below and our team will get back to you as
                soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* First & Last Name */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className={labelClasses}>
                    First Name <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary/50"
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="John"
                      className={`${inputClasses("firstName", !!errors.firstName && touched.firstName)} pl-10`}
                      aria-invalid={!!errors.firstName && touched.firstName}
                      aria-describedby={
                        errors.firstName && touched.firstName
                          ? "firstName-error"
                          : undefined
                      }
                    />
                  </div>
                  <AnimatePresence>
                    {errors.firstName && touched.firstName && (
                      <motion.p
                        id="firstName-error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className={errorTextClasses}
                        role="alert"
                      >
                        <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        {errors.firstName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label htmlFor="lastName" className={labelClasses}>
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary/50"
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Doe"
                      className={`${inputClasses("lastName", !!errors.lastName && touched.lastName)} pl-10`}
                      aria-invalid={!!errors.lastName && touched.lastName}
                      aria-describedby={
                        errors.lastName && touched.lastName
                          ? "lastName-error"
                          : undefined
                      }
                    />
                  </div>
                  <AnimatePresence>
                    {errors.lastName && touched.lastName && (
                      <motion.p
                        id="lastName-error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className={errorTextClasses}
                        role="alert"
                      >
                        <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        {errors.lastName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary/50"
                      aria-hidden="true"
                    />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="john@example.com"
                      className={`${inputClasses("email", !!errors.email && touched.email)} pl-10`}
                      aria-invalid={!!errors.email && touched.email}
                      aria-describedby={
                        errors.email && touched.email
                          ? "email-error"
                          : undefined
                      }
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && touched.email && (
                      <motion.p
                        id="email-error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className={errorTextClasses}
                        role="alert"
                      >
                        <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label htmlFor="phone" className={labelClasses}>
                    Phone <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary/50"
                      aria-hidden="true"
                    />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="+1 (249) 752-5068"
                      className={`${inputClasses("phone", !!errors.phone && touched.phone)} pl-10`}
                      aria-invalid={!!errors.phone && touched.phone}
                      aria-describedby={
                        errors.phone && touched.phone
                          ? "phone-error"
                          : undefined
                      }
                    />
                  </div>
                  <AnimatePresence>
                    {errors.phone && touched.phone && (
                      <motion.p
                        id="phone-error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className={errorTextClasses}
                        role="alert"
                      >
                        <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        {errors.phone}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Department */}
              <div>
                <label htmlFor="department" className={labelClasses}>
                  Department <span className="text-danger">*</span>
                </label>
                <select
                  id="department"
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClasses(
                    "department",
                    !!errors.department && touched.department,
                  )}
                  aria-invalid={!!errors.department && touched.department}
                  aria-describedby={
                    errors.department && touched.department
                      ? "department-error"
                      : undefined
                  }
                >
                  <option value="">Select a department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <AnimatePresence>
                  {errors.department && touched.department && (
                    <motion.p
                      id="department-error"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className={errorTextClasses}
                      role="alert"
                    >
                      <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      {errors.department}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Doctor (optional) */}
              {formData.department && (
                <motion.div
                  initial={reduced ? undefined : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="doctor" className={labelClasses}>
                    Doctor{" "}
                    <span className="text-text-secondary/60">(optional)</span>
                  </label>
                  <select
                    id="doctor"
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    className={inputClasses("doctor", false)}
                  >
                    <option value="">Prefer not to specify</option>
                    {availableDoctors.map((doc) => (
                      <option key={doc} value={doc}>
                        {doc}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}

              {/* Subject */}
              <div>
                <label htmlFor="subject" className={labelClasses}>
                  Subject <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <MessageSquare
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary/50"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="What is this regarding?"
                    className={`${inputClasses("subject", !!errors.subject && touched.subject)} pl-10`}
                    aria-invalid={!!errors.subject && touched.subject}
                    aria-describedby={
                      errors.subject && touched.subject
                        ? "subject-error"
                        : undefined
                    }
                  />
                </div>
                <AnimatePresence>
                  {errors.subject && touched.subject && (
                    <motion.p
                      id="subject-error"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className={errorTextClasses}
                      role="alert"
                    >
                      <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      {errors.subject}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className={labelClasses}>
                  Message <span className="text-danger">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here... (minimum 10 characters)"
                  className={`${inputClasses("message", !!errors.message && touched.message)} resize-y min-h-[120px]`}
                  aria-invalid={!!errors.message && touched.message}
                  aria-describedby={
                    errors.message && touched.message
                      ? "message-error"
                      : undefined
                  }
                />
                <AnimatePresence>
                  {errors.message && touched.message && (
                    <motion.p
                      id="message-error"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className={errorTextClasses}
                      role="alert"
                    >
                      <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Appointment Interest */}
              <div className="rounded-xl border border-border bg-surface p-5">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="interestedInAppointment"
                    name="interestedInAppointment"
                    checked={formData.interestedInAppointment}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
                  />
                  <div>
                    <label
                      htmlFor="interestedInAppointment"
                      className="text-sm font-medium text-text-primary cursor-pointer"
                    >
                      I&apos;m interested in booking an appointment
                    </label>
                    <p className="mt-0.5 text-xs text-text-secondary/70">
                      Additional fields will appear to help us schedule your
                      visit.
                    </p>
                  </div>
                </div>

                <AnimatePresence>
                  {formData.interestedInAppointment && (
                    <motion.div
                      initial={reduced ? undefined : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 grid gap-4 sm:grid-cols-2"
                    >
                      <div>
                        <label htmlFor="preferredDate" className={labelClasses}>
                          Preferred Date <span className="text-danger">*</span>
                        </label>
                        <div className="relative">
                          <Calendar
                            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary/50"
                            aria-hidden="true"
                          />
                          <input
                            type="date"
                            id="preferredDate"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            className={`${inputClasses("preferredDate", !!errors.preferredDate)} pl-10`}
                            aria-invalid={!!errors.preferredDate}
                          />
                        </div>
                        <AnimatePresence>
                          {errors.preferredDate && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              className={errorTextClasses}
                              role="alert"
                            >
                              <XCircle
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                              />
                              {errors.preferredDate}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <div>
                        <label htmlFor="preferredTime" className={labelClasses}>
                          Preferred Time <span className="text-danger">*</span>
                        </label>
                        <div className="relative">
                          <Clock
                            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary/50"
                            aria-hidden="true"
                          />
                          <select
                            id="preferredTime"
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleChange}
                            className={`${inputClasses("preferredTime", !!errors.preferredTime)} pl-10`}
                            aria-invalid={!!errors.preferredTime}
                          >
                            <option value="">Select time</option>
                            {timeSlots.map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
                        </div>
                        <AnimatePresence>
                          {errors.preferredTime && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              className={errorTextClasses}
                              role="alert"
                            >
                              <XCircle
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                              />
                              {errors.preferredTime}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreeToPrivacy"
                  name="agreeToPrivacy"
                  checked={formData.agreeToPrivacy}
                  onChange={handleChange}
                  className={`mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary/20 ${
                    errors.agreeToPrivacy && touched.agreeToPrivacy
                      ? "border-danger"
                      : ""
                  }`}
                  aria-invalid={
                    !!errors.agreeToPrivacy && touched.agreeToPrivacy
                  }
                  aria-describedby={
                    errors.agreeToPrivacy && touched.agreeToPrivacy
                      ? "privacy-error"
                      : undefined
                  }
                />
                <div>
                  <label
                    htmlFor="agreeToPrivacy"
                    className="text-sm text-text-secondary cursor-pointer"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      className="font-medium text-primary underline underline-offset-2 hover:text-primary-dark transition-colors"
                    >
                      Privacy Policy
                    </a>{" "}
                    and consent to MediFlow processing my data.{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <AnimatePresence>
                    {errors.agreeToPrivacy && touched.agreeToPrivacy && (
                      <motion.p
                        id="privacy-error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className={errorTextClasses}
                        role="alert"
                      >
                        <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        {errors.agreeToPrivacy}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  loading={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2
                        className="h-5 w-5 animate-spin"
                        aria-hidden="true"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  type="button"
                  onClick={handleReset}
                  disabled={status === "loading"}
                >
                  Reset
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Right side - Information cards */}
          <motion.div
            variants={reduced ? undefined : slideRight}
            initial={reduced ? undefined : "hidden"}
            whileInView={reduced ? undefined : "visible"}
            viewport={reduced ? undefined : { once: true, amount: 0.1 }}
            className="flex flex-col gap-6 lg:pl-8 xl:pl-12"
          >
            {/* Quick info cards */}
            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-text-primary">
                Why Contact Us?
              </h3>
              <ul className="mt-4 space-y-4">
                {[
                  {
                    icon: CheckCircle,
                    text: "Average response time under 2 hours",
                    color: "text-success",
                  },
                  {
                    icon: CheckCircle,
                    text: "Multilingual support team available",
                    color: "text-success",
                  },
                  {
                    icon: CheckCircle,
                    text: "Secure & confidential communication",
                    color: "text-success",
                  },
                  {
                    icon: CheckCircle,
                    text: "Same-day appointment booking possible",
                    color: "text-success",
                  },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <item.icon
                      className={`mt-0.5 h-4 w-4 shrink-0 ${item.color}`}
                      aria-hidden="true"
                    />
                    <span className="text-sm text-text-secondary">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Response time card */}
            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-text-primary">
                Response Times
              </h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-background px-4 py-2.5">
                  <span className="text-sm text-text-secondary">Email</span>
                  <span className="text-sm font-medium text-text-primary">
                    Within 24 hours
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-background px-4 py-2.5">
                  <span className="text-sm text-text-secondary">Phone</span>
                  <span className="text-sm font-medium text-text-primary">
                    Within 5 minutes
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-background px-4 py-2.5">
                  <span className="text-sm text-text-secondary">Emergency</span>
                  <span className="text-sm font-medium text-danger">
                    Immediate
                  </span>
                </div>
              </div>
            </div>

            {/* Direct contact card */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-text-primary">
                Need Urgent Help?
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                For urgent medical matters, please call our emergency hotline
                instead.
              </p>
              <a
                href="tel:+1 (249) 752-5000"
                className="mt-4 inline-flex items-center gap-2 text-lg font-bold text-danger transition-colors hover:text-danger/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger rounded"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                +1 (249) 752-5000
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
