"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, X } from "lucide-react";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { AppointmentSummary } from "./AppointmentSummary";
import { BookingStepper } from "./BookingStepper";
import { BookingSuccess } from "./BookingSuccess";
import { CalendarStep } from "./CalendarStep";
import { ConfirmModal } from "./ConfirmModal";
import { DepartmentSelection } from "./DepartmentSelection";
import { DoctorSelection } from "./DoctorSelection";
import { PatientInformation } from "./PatientInformation";
import { ReviewAppointment } from "./ReviewAppointment";
import { TimeSlotSelection } from "./TimeSlotSelection";
import type { BookingFormData } from "./types";

/* ─── Step validation schemas ─── */

const stepSchemas = [
  z.object({ department: z.string().min(1, "Please select a department") }),
  z.object({ doctor: z.string().min(1, "Please select a doctor") }),
  z.object({
    date: z
      .date()
      .nullable()
      .refine((d) => d !== null, "Please select a date"),
  }),
  z.object({ timeSlot: z.string().min(1, "Please select a time slot") }),
  z.object({
    reasonForVisit: z
      .string()
      .min(
        10,
        "Please describe your reason for visit (at least 10 characters)",
      ),
    consultationType: z.enum(["in-person", "video", "phone"]),
  }),
  z.object({}), // Review step — no validation needed
];

const stepFieldGroups = [
  ["department"] as const,
  ["doctor"] as const,
  ["date"] as const,
  ["timeSlot"] as const,
  ["reasonForVisit", "consultationType"] as const,
  [] as const,
];

const TOTAL_STEPS = 7; // 0-6, step 6 = success

const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
};

export function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<BookingFormData>({
    defaultValues: {
      department: "",
      doctor: "",
      date: null,
      timeSlot: "",
      reasonForVisit: "",
      symptoms: "",
      notes: "",
      consultationType: "in-person",
    },
    mode: "onChange",
  });

  /* ─── Navigation ─── */

  const handleNext = useCallback(async () => {
    if (currentStep >= stepSchemas.length - 1) return;

    const fields = stepFieldGroups[currentStep] as readonly string[];
    if (fields.length > 0) {
      const valid = await form.trigger(fields as any);
      if (!valid) return;
    }

    setCurrentStep((prev) => prev + 1);
  }, [currentStep, form]);

  const handleBack = useCallback(() => {
    if (currentStep === 0) {
      setShowCancelModal(true);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleEditStep = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  /* ─── Confirm booking ─── */

  const handleConfirmBooking = useCallback(async () => {
    setSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    setCurrentStep(6); // Success step
  }, []);

  /* ─── Reset wizard ─── */

  const handleReset = useCallback(() => {
    form.reset();
    setCurrentStep(0);
  }, [form]);

  const isLastStep = currentStep === TOTAL_STEPS - 1;
  const isReviewStep = currentStep === TOTAL_STEPS - 2;
  const isSuccessStep = currentStep === TOTAL_STEPS - 1;
  const departmentId = form.watch("department");

  return (
    <FormProvider {...form}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header with cancel */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Book an Appointment
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Complete the steps below to schedule your visit
              </p>
            </div>
            {!isSuccessStep && (
              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Stepper (hidden on success) */}
          {!isSuccessStep && (
            <BookingStepper
              currentStep={Math.min(currentStep, TOTAL_STEPS - 2)}
            />
          )}

          {/* Step content */}
          <div className="relative min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                {...pageTransition}
                className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60"
              >
                {currentStep === 0 && <DepartmentSelection />}
                {currentStep === 1 && departmentId && (
                  <DoctorSelection departmentId={departmentId} />
                )}
                {currentStep === 2 && <CalendarStep />}
                {currentStep === 3 && <TimeSlotSelection />}
                {currentStep === 4 && <PatientInformation />}
                {currentStep === 5 && (
                  <ReviewAppointment onEditStep={handleEditStep} />
                )}
                {currentStep === 6 && <BookingSuccess onReset={handleReset} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons (hidden on success) */}
          {!isSuccessStep && (
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <ArrowLeft className="h-4 w-4" />
                {currentStep === 0 ? "Cancel" : "Back"}
              </button>

              {isReviewStep ? (
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  disabled={submitting}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Confirming...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Confirm Booking
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[var(--color-primary-dark)]"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        {!isSuccessStep && (
          <div className="hidden lg:block">
            <AppointmentSummary />
          </div>
        )}
      </div>

      {/* Cancel modal */}
      <ConfirmModal
        open={showCancelModal}
        title={currentStep === 0 ? "Cancel Booking?" : "Leave Wizard?"}
        message={
          currentStep === 0
            ? "Are you sure you want to cancel? Your progress will be lost."
            : "If you leave now, your progress on this step will be lost. You can always start again later."
        }
        confirmLabel={currentStep === 0 ? "Yes, Cancel" : "Leave"}
        variant={currentStep === 0 ? "danger" : "warning"}
        onConfirm={() => {
          setShowCancelModal(false);
          handleReset();
        }}
        onCancel={() => setShowCancelModal(false)}
      />
    </FormProvider>
  );
}
