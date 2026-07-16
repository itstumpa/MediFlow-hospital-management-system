"use client";

import { Button } from "@/app/components/dashboard/Button";
import { DashboardContainer } from "@/components/dashboard/staff/DashboardContainer";
import { PageHeader } from "@/components/dashboard/staff/PageHeader";
import { fadeUp, staggerContainer, staggerItem } from "@/components/dashboard/staff/MotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Building2, Calendar, CalendarCheck, Clock, Hash, MessageSquare, Search, Shield, User, UserCheck, UserPlus, Users, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import {
  CheckInPanel,
  DoctorAvailabilityCard,
  PatientSearch,
  QueueCard,
  RecentRegistrationsCard,
  RegistrationStepper,
  RegistrationSuccess,
} from "../register/_components";
import {
  defaultFormData,
  type Patient,
  type PatientType,
  type RegistrationFormData,
} from "../register/_mock-data";

/* ══════════════════════════════════════════════
   Validation helpers
   ══════════════════════════════════════════════ */

interface ValidationRule {
  field: keyof RegistrationFormData;
  required?: boolean;
  minLength?: number;
  message: string;
}

const stepValidations: Record<number, ValidationRule[]> = {
  2: [
    { field: "firstName", required: true, message: "First name is required" },
    { field: "lastName", required: true, message: "Last name is required" },
    { field: "gender", required: true, message: "Gender is required" },
    { field: "dateOfBirth", required: true, message: "Date of birth is required" },
    { field: "bloodGroup", required: true, message: "Blood group is required" },
    { field: "phone", required: true, minLength: 7, message: "Valid phone number is required" },
    { field: "emergencyContactName", required: true, message: "Emergency contact name is required" },
    { field: "emergencyContactPhone", required: true, minLength: 7, message: "Emergency contact phone is required" },
  ],
  4: [
    { field: "doctor", required: true, message: "Doctor is required" },
    { field: "department", required: true, message: "Department is required" },
    { field: "visitType", required: true, message: "Visit type is required" },
    { field: "visitReason", required: true, message: "Visit reason is required" },
  ],
};

function validateStep(
  step: number,
  data: RegistrationFormData,
): Partial<Record<keyof RegistrationFormData, string>> {
  const rules = stepValidations[step];
  if (!rules) return {};

  const errors: Partial<Record<keyof RegistrationFormData, string>> = {};
  for (const rule of rules) {
    const value = data[rule.field] as string;
    if (rule.required && (!value || value.trim() === "")) {
      errors[rule.field] = rule.message;
    } else if (rule.minLength && value.length < rule.minLength) {
      errors[rule.field] = rule.message;
    }
  }
  return errors;
}

/* ══════════════════════════════════════════════
   Page Component
   ══════════════════════════════════════════════ */

export default function EmergencyRegistrationPage() {
  /* ─── State ──────────────────────────────── */

  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>(defaultFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({});
  const [patientType, setPatientType] = useState<PatientType>("emergency");
  const [foundPatient, setFoundPatient] = useState<Patient | null>(null);

  /* ─── Handlers ───────────────────────────── */

  const updateField = useCallback(
    (field: keyof RegistrationFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [],
  );

  const handlePatientFound = useCallback((patient: Patient) => {
    setFoundPatient(patient);
    setFormData((prev) => ({
      ...prev,
      firstName: patient.firstName,
      lastName: patient.lastName,
      gender: patient.gender,
      dateOfBirth: patient.dateOfBirth,
      bloodGroup: patient.bloodGroup,
      phone: patient.phone,
      email: patient.email,
      address: patient.address,
      emergencyContactName: patient.emergencyContactName,
      emergencyContactPhone: patient.emergencyContactPhone,
      allergies: patient.allergies.join(", "),
      chronicDiseases: patient.chronicDiseases.join(", "),
      currentMedications: patient.currentMedications.join(", "),
      insuranceProvider: patient.insuranceProvider,
      insuranceNumber: patient.insuranceNumber,
      primaryPhysician: patient.primaryPhysician,
    }));
    setStep(4);
  }, []);

  const handleRegisterNew = useCallback(() => {
    setFoundPatient(null);
    setFormData(defaultFormData);
    setErrors({});
    setStep(2);
  }, []);

  const handleNext = useCallback(() => {
    const validationErrors = validateStep(step, formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStep((prev) => Math.min(prev + 1, 5));
  }, [step, formData]);

  const handleBack = useCallback(() => {
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleComplete = useCallback(() => {
    setShowSuccess(true);
  }, []);

  const handleReset = useCallback(() => {
    setStep(1);
    setShowSuccess(false);
    setFormData(defaultFormData);
    setErrors({});
    setFoundPatient(null);
    setPatientType("emergency");
  }, []);

  /* ─── Render current step ────────────────── */

  const renderStepContent = useCallback(() => {
    switch (step) {
      case 1:
        return (
          <PatientSearch
            onPatientFound={handlePatientFound}
            onRegisterNew={handleRegisterNew}
          />
        );
      case 2:
        return (
          <PersonalInformationForm
            data={formData}
            onChange={updateField}
            errors={errors}
          />
        );
      case 3:
        return (
          <MedicalInformationForm
            data={formData}
            onChange={updateField}
            errors={errors}
          />
        );
      case 4:
        return (
          <AppointmentInformationForm
            data={formData}
            onChange={updateField}
            errors={errors}
          />
        );
      case 5:
        return (
          <CheckInPanel
            data={formData}
            onChange={updateField}
            errors={errors}
            patientType={patientType}
            onPatientTypeChange={setPatientType}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  }, [
    step,
    formData,
    errors,
    handlePatientFound,
    handleRegisterNew,
    updateField,
    patientType,
    handleComplete,
  ]);

  /* ─── Progress ───────────────────────────── */

  const progressPercent = useMemo(() => ((step - 1) / 4) * 100, [step]);

  return (
    <DashboardContainer>
      <div className="min-h-screen bg-slate-50/50 dark:bg-slate-900/50">
        <div className="p-4 md:p-6">
          <PageHeader
            title="Emergency Registration"
            subtitle="Fast-track registration for emergency patients requiring immediate attention"
          >
            <Button variant="primary" onClick={handleRegisterNew} disabled={showSuccess}>
              <UserPlus className="h-4 w-4" />
              Register Emergency Patient
            </Button>
            <Button variant="outline" onClick={() => { setStep(1); setFoundPatient(null); setFormData(defaultFormData); }} disabled={showSuccess}>
              <Search className="h-4 w-4" />
              Find Existing Patient
            </Button>
            <Button variant="danger" onClick={() => { setPatientType("emergency"); updateField("queueNumber", "ER-" + Math.floor(Math.random() * 900 + 100)); setStep(2); }} disabled={showSuccess}>
              <AlertTriangle className="h-4 w-4" />
              Emergency Registration
            </Button>
          </PageHeader>

          {showSuccess ? (
            <RegistrationSuccess data={formData} onReset={handleReset} />
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
              {/* Left — Stepper */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="lg:col-span-1"
              >
                <div className="dash-card p-4">
                  <RegistrationStepper
                    currentStep={step}
                    onStepClick={(s) => {
                      if (s < step) {
                        setErrors({});
                        setStep(s);
                      }
                    }}
                  />
                </div>
              </motion.div>

              {/* Center — Form */}
              <motion.div
                key={step}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="lg:col-span-2"
              >
                <div className="dash-card p-5 md:p-6">
                  {/* Progress bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Step {step} of 5</span>
                      <span>{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                      <motion.div
                        className="h-full rounded-full bg-red-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`step-${step}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      {renderStepContent()}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation */}
                  {step > 1 && step < 5 && (
                    <motion.div
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-700"
                    >
                      <Button variant="ghost" onClick={handleBack}>
                        ← Back
                      </Button>
                      <Button variant="primary" onClick={handleNext}>
                        Continue →
                      </Button>
                    </motion.div>
                  )}
                  {step === 1 && (
                    <motion.div
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      className="mt-8 flex items-center justify-end border-t border-slate-100 pt-5 dark:border-slate-700"
                    >
                      <Button variant="primary" onClick={handleRegisterNew}>
                        <UserPlus className="h-4 w-4" />
                        Start New Registration
                      </Button>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Right — Sidebar */}
              <aside className="space-y-5 lg:col-span-1">
                <QueueCard />
                <RecentRegistrationsCard />
                <DoctorAvailabilityCard />
              </aside>
            </div>
          )}
        </div>
      </div>
    </DashboardContainer>
  );
}

/* ══════════════════════════════════════════════
   Import PersonalInformationForm and MedicalInformationForm
   ══════════════════════════════════════════════ */

import { PersonalInformationForm } from "../register/_components/PersonalInformationForm";
import { MedicalInformationForm } from "../register/_components/MedicalInformationForm";
import { AppointmentInformationForm } from "../register/_components/AppointmentInformationForm";
