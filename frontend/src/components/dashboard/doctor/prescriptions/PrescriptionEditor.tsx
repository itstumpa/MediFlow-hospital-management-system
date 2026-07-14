"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  FileText,
  Plus,
  Save,
  Stethoscope,
  Syringe,
  User,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fadeInBackdrop,
  scaleUp,
  staggerContainer,
  staggerItem,
} from "../MotionVariants";
import { MedicineCard } from "./MedicineCard";
import { MedicineSearch } from "./MedicineSearch";
import { TemplateSelector } from "./TemplateSelector";
import {
  generatePrescriptionId,
  type MedicineItem,
  type MedicineOption,
  type PrescriptionTemplate,
} from "./prescriptions-mock-data";

interface PrescriptionEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: {
    patientName: string;
    diagnosis: string;
    medicines: MedicineItem[];
    notes: string;
    followUpDate: string;
  }) => void;
}

const emptyMedicine = (option: MedicineOption): MedicineItem => ({
  id: `rx-med-new-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  name: option.name,
  genericName: option.genericName,
  brand: option.brand,
  strength: option.strength,
  dosage: option.commonDosages[0] || option.strength,
  frequency: option.commonFrequencies[0] || "Once daily",
  duration: "7",
  durationUnit: "days",
  category: option.category,
  morning: true,
  afternoon: false,
  evening: false,
  night: false,
  beforeFood: false,
  afterFood: false,
  instructions: "",
});

export function PrescriptionEditor({
  isOpen,
  onClose,
  onSave,
}: PrescriptionEditorProps) {
  const [step, setStep] = useState<"template" | "form" | "preview">("template");
  const [patientName, setPatientName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState<MedicineItem[]>([]);
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Reset form when opening
  useEffect(() => {
    if (isOpen) {
      setStep("template");
      setPatientName("");
      setDiagnosis("");
      setMedicines([]);
      setNotes("");
      setFollowUpDate("");
      setSelectedTemplate(null);
    }
  }, [isOpen]);

  const handleTemplateSelect = useCallback((template: PrescriptionTemplate) => {
    setSelectedTemplate(template.id);
    setDiagnosis(template.diagnosis);
    setMedicines(
      template.medicines.map((m) => ({
        ...m,
        id: `rx-med-tpl-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      })),
    );
    setNotes(template.notes);
    setStep("form");
  }, []);

  const handleAddMedicine = useCallback((option: MedicineOption) => {
    setMedicines((prev) => [...prev, emptyMedicine(option)]);
  }, []);

  const handleUpdateMedicine = useCallback(
    (index: number, medicine: MedicineItem) => {
      setMedicines((prev) => {
        const next = [...prev];
        next[index] = medicine;
        return next;
      });
    },
    [],
  );

  const handleRemoveMedicine = useCallback((index: number) => {
    setMedicines((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleDuplicateMedicine = useCallback((index: number) => {
    setMedicines((prev) => {
      const duplicate = {
        ...prev[index],
        id: `rx-med-copy-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      };
      const next = [...prev];
      next.splice(index + 1, 0, duplicate);
      return next;
    });
  }, []);

  const prescriptionId = useMemo(() => generatePrescriptionId(), []);

  const handleSave = useCallback(() => {
    onSave?.({
      patientName,
      diagnosis,
      medicines,
      notes,
      followUpDate,
    });
    onClose();
  }, [patientName, diagnosis, medicines, notes, followUpDate, onSave, onClose]);

  const isValid =
    patientName.trim() && diagnosis.trim() && medicines.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={fadeInBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={scaleUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50 mx-auto max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl",
              "dark:bg-slate-900",
              "lg:bottom-auto lg:top-[5%] lg:rounded-2xl",
            )}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/80 px-5 py-4 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-dash-primary-light dark:bg-teal-950/30">
                  <FileText className="h-4 w-4 text-dash-primary dark:text-accent" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                    {step === "template"
                      ? "New Prescription"
                      : step === "form"
                        ? "Create Prescription"
                        : "Preview Prescription"}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {prescriptionId}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Step indicators */}
                <div className="mr-2 flex items-center gap-1.5">
                  {(["template", "form", "preview"] as const).map((s, i) => (
                    <button
                      key={s}
                      onClick={() => {
                        if (
                          s === "template" ||
                          (s === "form" && selectedTemplate) ||
                          s === "preview"
                        ) {
                          setStep(s);
                        }
                      }}
                      className={cn(
                        "h-1.5 rounded-full transition-all",
                        step === s
                          ? "w-6 bg-dash-primary"
                          : "w-1.5 bg-slate-300 dark:bg-slate-600",
                      )}
                    />
                  ))}
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-5">
              {/* Step 1: Template Selection */}
              {step === "template" && (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <motion.div variants={staggerItem}>
                    <h3 className="mb-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Choose a Template
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Start with a pre-built template or create a custom
                      prescription
                    </p>
                  </motion.div>
                  <TemplateSelector
                    onSelect={handleTemplateSelect}
                    selectedId={selectedTemplate}
                  />
                  <motion.div
                    variants={staggerItem}
                    className="flex justify-end"
                  >
                    <button
                      onClick={() => {
                        setSelectedTemplate("tpl-custom");
                        setStep("form");
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                    >
                      <Plus className="h-4 w-4" />
                      Start from Scratch
                    </button>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 2: Form */}
              {step === "form" && (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-5"
                >
                  {/* Patient Information */}
                  <motion.div variants={staggerItem} className="space-y-3">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                      <User className="h-4 w-4 text-slate-400" />
                      Patient Information
                    </h3>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                        Patient Name
                      </label>
                      <input
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Enter patient name"
                        className={cn(
                          "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400",
                          "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                          "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-dash-primary dark:focus:ring-dash-primary-light",
                        )}
                      />
                    </div>
                  </motion.div>

                  {/* Diagnosis */}
                  <motion.div variants={staggerItem} className="space-y-3">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                      <Stethoscope className="h-4 w-4 text-slate-400" />
                      Diagnosis
                    </h3>
                    <textarea
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                      placeholder="Enter diagnosis"
                      rows={2}
                      className={cn(
                        "w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400",
                        "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                        "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-teal-600 dark:focus:ring-teal-900/30",
                      )}
                    />
                  </motion.div>

                  {/* Medicines */}
                  <motion.div variants={staggerItem} className="space-y-3">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                      <Syringe className="h-4 w-4 text-slate-400" />
                      Medicines
                    </h3>
                    <MedicineSearch
                      onSelect={handleAddMedicine}
                      selectedIds={medicines.map((m) => m.id)}
                      placeholder="Search and add medicines..."
                    />
                    <AnimatePresence mode="popLayout">
                      {medicines.length === 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-8 dark:border-slate-700"
                        >
                          <Plus className="mb-2 h-6 w-6 text-slate-300 dark:text-slate-600" />
                          <p className="text-xs text-slate-400 dark:text-slate-500">
                            Search above to add medicines
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="space-y-3">
                      <AnimatePresence mode="popLayout">
                        {medicines.map((medicine, index) => (
                          <MedicineCard
                            key={medicine.id}
                            medicine={medicine}
                            index={index}
                            onUpdate={handleUpdateMedicine}
                            onRemove={handleRemoveMedicine}
                            onDuplicate={handleDuplicateMedicine}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Notes */}
                  <motion.div variants={staggerItem} className="space-y-3">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                      <FileText className="h-4 w-4 text-slate-400" />
                      Notes
                    </h3>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Additional notes, instructions, or remarks..."
                      rows={3}
                      className={cn(
                        "w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400",
                        "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                        "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-dash-primary dark:focus:ring-dash-primary-light",
                      )}
                    />
                  </motion.div>

                  {/* Follow-up Date */}
                  <motion.div variants={staggerItem} className="space-y-3">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      Follow-up Date
                    </h3>
                    <input
                      type="date"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className={cn(
                        "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all",
                        "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                        "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-dash-primary dark:focus:ring-dash-primary-light",
                      )}
                    />
                  </motion.div>
                </motion.div>
              )}

              {/* Step 3: Preview Placeholder */}
              {step === "preview" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <FileText className="mb-3 h-12 w-12 text-slate-300 dark:text-slate-600" />
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Preview will appear here
                  </p>
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    Review the prescription before saving
                  </p>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/50 px-5 py-3 dark:border-slate-700 dark:bg-slate-900/50">
              <div className="text-xs text-slate-400 dark:text-slate-500">
                {step === "form" && (
                  <span>
                    {medicines.length} medicine
                    {medicines.length !== 1 ? "s" : ""} added
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {step === "form" && (
                  <>
                    <button
                      onClick={() => setStep("template")}
                      className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep("preview")}
                      className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                    >
                      Preview
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={!isValid}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium text-white transition-all",
                        isValid
                          ? "bg-dash-primary hover:bg-dash-primary-dark"
                          : "cursor-not-allowed bg-slate-300 dark:bg-slate-700",
                      )}
                    >
                      <Save className="h-3.5 w-3.5" />
                      Save Prescription
                    </button>
                  </>
                )}
                {step === "template" && (
                  <button
                    onClick={onClose}
                    className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                )}
                {step === "preview" && (
                  <>
                    <button
                      onClick={() => setStep("form")}
                      className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                    >
                      Back to Edit
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={!isValid}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium text-white transition-all",
                        isValid
                          ? "bg-dash-primary hover:bg-dash-primary-dark"
                          : "cursor-not-allowed bg-slate-300 dark:bg-slate-700",
                      )}
                    >
                      <Save className="h-3.5 w-3.5" />
                      Save Prescription
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
