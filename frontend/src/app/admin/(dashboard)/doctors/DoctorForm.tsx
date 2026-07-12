"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import {
  ChevronRight,
  Eye,
  Save,
  X,
  FileText,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { pageFade } from "@/lib/animations/pageTransition";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { cn } from "@/lib/utils";
import { doctorFormSchema, defaultFormValues, type DoctorFormValues } from "./form-schema";
import { PersonalInfo } from "./PersonalInfo";
import { ProfessionalInfo } from "./ProfessionalInfo";
import { EducationForm } from "./EducationForm";
import { CertificationsForm } from "./CertificationsForm";
import { LanguagesSection } from "./LanguagesSection";
import { BiographySection } from "./BiographySection";
import { ClinicInfo } from "./ClinicInfo";
import { AvailabilitySchedule } from "./AvailabilitySchedule";
import { Sidebar } from "./Sidebar";
import { ConfirmDialog } from "./ConfirmDialog";
import { Breadcrumb } from "@/app/components/dashboard/Breadcrumb";

interface DoctorFormProps {
  mode: "create" | "edit";
  defaultValues?: Partial<DoctorFormValues>;
}

export function DoctorForm({ mode, defaultValues: editValues }: DoctorFormProps) {
  const router = useRouter();
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [showSaveDraftDialog, setShowSaveDraftDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isEdit = mode === "edit";

  const mergedDefaults: DoctorFormValues = {
    ...defaultFormValues,
    ...editValues,
    // Ensure arrays exist properly
    education: editValues?.education || defaultFormValues.education,
    certifications: editValues?.certifications || defaultFormValues.certifications,
    languages: editValues?.languages || defaultFormValues.languages,
    availability: {
      ...defaultFormValues.availability,
      ...editValues?.availability,
    },
  };

  const methods = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: mergedDefaults,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    reset,
    watch,
  } = methods;

  const formValues = watch();

  // Autosave simulation
  useEffect(() => {
    if (!isDirty) return;

    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
    }

    autosaveTimerRef.current = setTimeout(() => {
      setLastSaved(new Date());
      // In a real app, you'd save to API here
    }, 3000);

    return () => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
    };
  }, [formValues, isDirty]);

  // Unsaved changes warning
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  const onSubmit = useCallback(
    async (data: DoctorFormValues) => {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", data);
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/admin/doctors");
      }, 2000);
    },
    [router]
  );

  const handleSaveDraft = useCallback(() => {
    setShowSaveDraftDialog(true);
  }, []);

  const confirmSaveDraft = useCallback(() => {
    setShowSaveDraftDialog(false);
    setLastSaved(new Date());
    // In a real app, save draft to API
  }, []);

  const handleCancel = useCallback(() => {
    if (isDirty) {
      setShowDiscardDialog(true);
    } else {
      router.push("/admin/doctors");
    }
  }, [isDirty, router]);

  const confirmDiscard = useCallback(() => {
    setShowDiscardDialog(false);
    router.push("/admin/doctors");
  }, [router]);

  return (
    <FormProvider {...methods}>
      <motion.div
        variants={pageFade}
        initial="initial"
        animate="animate"
        exit="exit"
        className="space-y-6"
      >
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Page Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <motion.div variants={staggerItem}>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {isEdit ? "Edit Doctor" : "Add New Doctor"}
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {isEdit
                ? "Update doctor information and credentials"
                : "Register a new doctor in the system"}
            </p>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="flex flex-wrap items-center gap-2"
          >
            {/* Save Draft */}
            <motion.button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-800 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save className="h-4 w-4" />
              Save Draft
            </motion.button>

            {/* Preview Profile */}
            <motion.button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-800 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="h-4 w-4" />
              Preview Profile
            </motion.button>

            {/* Cancel */}
            <motion.button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center gap-2 rounded-xl border border-transparent px-4 py-2.5 text-sm font-medium text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <X className="h-4 w-4" />
              Cancel
            </motion.button>

            {/* Delete (edit mode only) */}
            {isEdit && (
              <motion.button
                type="button"
                onClick={() => setShowDeleteDialog(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 shadow-sm transition-all hover:bg-red-50 dark:border-red-800 dark:bg-slate-700 dark:text-red-400 dark:hover:bg-red-900/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Delete
              </motion.button>
            )}
          </motion.div>
        </motion.div>

        {/* Auto-save indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-end gap-2"
        >
          {lastSaved && (
            <span className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              Auto-saved {lastSaved.toLocaleTimeString()}
            </span>
          )}
          {isDirty && !lastSaved && (
            <span className="flex items-center gap-1.5 text-xs text-amber-500">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              Unsaved changes
            </span>
          )}
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid gap-8 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px]">
            {/* Main Form */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Section 1: Personal Information */}
              <motion.div
                variants={staggerItem}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <PersonalInfo />
              </motion.div>

              {/* Section 2: Professional Information */}
              <motion.div
                variants={staggerItem}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <ProfessionalInfo />
              </motion.div>

              {/* Section 3: Education */}
              <motion.div
                variants={staggerItem}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <EducationForm />
              </motion.div>

              {/* Section 4: Certifications */}
              <motion.div
                variants={staggerItem}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <CertificationsForm />
              </motion.div>

              {/* Section 5: Languages */}
              <motion.div
                variants={staggerItem}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <LanguagesSection />
              </motion.div>

              {/* Section 6: Biography */}
              <motion.div
                variants={staggerItem}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <BiographySection />
              </motion.div>

              {/* Section 7: Clinic Information */}
              <motion.div
                variants={staggerItem}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <ClinicInfo />
              </motion.div>

              {/* Section 8: Availability */}
              <motion.div
                variants={staggerItem}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <AvailabilitySchedule />
              </motion.div>

              {/* Form Actions */}
              <motion.div
                variants={staggerItem}
                className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  {isEdit
                    ? "Update the doctor's information to save changes"
                    : "Fill in all required fields to create a new doctor"}
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all",
                      "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
                      "disabled:cursor-not-allowed disabled:opacity-60"
                    )}
                    whileHover={isSubmitting ? {} : { scale: 1.02 }}
                    whileTap={isSubmitting ? {} : { scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="inline-flex"
                        >
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        </motion.span>
                        {isEdit ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4" />
                        {isEdit ? "Update Doctor" : "Create Doctor"}
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-6">
                <Sidebar />
              </div>
            </div>
          </div>
        </form>

        {/* Modals */}
        <ConfirmDialog
          open={showDiscardDialog}
          onClose={() => setShowDiscardDialog(false)}
          onConfirm={confirmDiscard}
          variant="discard"
        />
        <ConfirmDialog
          open={showSaveDraftDialog}
          onClose={() => setShowSaveDraftDialog(false)}
          onConfirm={confirmSaveDraft}
          variant="save-draft"
        />
        <ConfirmDialog
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={() => {
            setShowDeleteDialog(false);
            router.push("/admin/doctors");
          }}
          variant="delete"
        />

        {/* Success Toast */}
        <SuccessToast visible={showSuccess} isEdit={isEdit} />
      </motion.div>
    </FormProvider>
  );
}

function SuccessToast({ visible, isEdit }: { visible: boolean; isEdit: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: "-50%" }}
      animate={
        visible
          ? { opacity: 1, y: 0, x: "-50%" }
          : { opacity: 0, y: 50, x: "-50%" }
      }
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-8 left-1/2 z-50 flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3 text-white shadow-xl dark:bg-slate-700"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
        <CheckCircle2 className="h-4 w-4 text-white" />
      </div>
      <div>
        <p className="text-sm font-semibold">
          {isEdit ? "Doctor Updated" : "Doctor Created"}
        </p>
        <p className="text-xs text-slate-300">
          {isEdit
            ? "The doctor profile has been updated successfully"
            : "New doctor has been registered successfully"}
        </p>
      </div>
    </motion.div>
  );
}
