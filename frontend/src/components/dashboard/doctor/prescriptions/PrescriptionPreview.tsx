"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Barcode,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Printer,
} from "lucide-react";
import type { PrescriptionRecord } from "./prescriptions-mock-data";

interface PrescriptionPreviewProps {
  prescription: PrescriptionRecord;
  onClose?: () => void;
}

export function PrescriptionPreview({
  prescription,
  onClose,
}: PrescriptionPreviewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "mx-auto max-w-2xl overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-lg",
        "dark:border-slate-700/40 dark:bg-slate-900/60",
      )}
    >
      {/* Print-optimized content */}
      <div className="p-6 print:p-0">
        {/* Hospital Branding */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4 dark:border-slate-700/40">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-dash-primary to-dash-primary-dark text-lg font-bold text-white shadow-sm">
                M
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                  MediFlow Hospital
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  123 Healthcare Avenue · +1 (555) 234-5678
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  info@mediflow-hospital.com
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Prescription
            </p>
            <p className="font-mono text-sm font-medium text-slate-800 dark:text-slate-200">
              {prescription.prescriptionId}
            </p>
            <p className="text-xs text-slate-400">
              {new Date(prescription.createdDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Doctor & Patient Info */}
        <div className="mt-4 grid grid-cols-2 gap-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Prescribed By
            </p>
            <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
              {prescription.doctorName}
            </p>
            <p className="text-xs text-slate-500">Medical Doctor</p>
            {/* Signature placeholder */}
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <div className="h-8 w-24 rounded border border-dashed border-slate-300 bg-slate-50 dark:border-slate-600 dark:bg-slate-800" />
              <span>Signature</span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Patient
            </p>
            <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
              {prescription.patientName}
            </p>
            <p className="text-xs text-slate-500">
              {prescription.patientAge} years · {prescription.patientGender}
            </p>
            <p className="text-xs text-slate-500">
              ID: {prescription.patientId}
            </p>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="mt-4 rounded-lg bg-slate-50 px-3.5 py-2.5 dark:bg-slate-800/50">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Diagnosis
          </p>
          <p className="mt-0.5 text-sm font-medium text-slate-800 dark:text-slate-200">
            {prescription.diagnosis}
          </p>
        </div>

        {/* Medicines Table */}
        <div className="mt-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Prescribed Medicines
          </p>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-400 dark:border-slate-700">
                <th className="py-2 pr-2 font-medium">Medicine</th>
                <th className="py-2 px-2 font-medium">Dosage</th>
                <th className="py-2 px-2 font-medium">Frequency</th>
                <th className="py-2 px-2 font-medium">Duration</th>
                <th className="py-2 pl-2 font-medium">Timing</th>
              </tr>
            </thead>
            <tbody>
              {prescription.medicines.map((med) => (
                <tr
                  key={med.id}
                  className="border-b border-slate-100 text-xs dark:border-slate-800"
                >
                  <td className="py-2.5 pr-2">
                    <p className="font-medium text-slate-800 dark:text-slate-200">
                      {med.name}
                    </p>
                    <p className="text-[10px] text-slate-400">{med.strength}</p>
                  </td>
                  <td className="py-2.5 px-2 text-slate-600 dark:text-slate-400">
                    {med.dosage}
                  </td>
                  <td className="py-2.5 px-2 text-slate-600 dark:text-slate-400">
                    {med.frequency}
                  </td>
                  <td className="py-2.5 px-2 text-slate-600 dark:text-slate-400">
                    {med.duration} {med.durationUnit}
                  </td>
                  <td className="py-2.5 pl-2">
                    <div className="flex gap-1">
                      {med.morning && (
                        <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[9px] font-medium text-amber-600 dark:bg-amber-950/30 dark:text-amber-400">
                          Morn
                        </span>
                      )}
                      {med.afternoon && (
                        <span className="rounded bg-orange-50 px-1.5 py-0.5 text-[9px] font-medium text-orange-600 dark:bg-orange-950/30 dark:text-orange-400">
                          Aft
                        </span>
                      )}
                      {med.evening && (
                        <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-[9px] font-medium text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400">
                          Eve
                        </span>
                      )}
                      {med.night && (
                        <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[9px] font-medium text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
                          Night
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Instructions & Notes */}
        {prescription.medicines.some((m) => m.instructions) && (
          <div className="mt-4 space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Instructions
            </p>
            {prescription.medicines.map(
              (med) =>
                med.instructions && (
                  <div
                    key={med.id}
                    className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400"
                  >
                    <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
                    <span>
                      <strong className="text-slate-700 dark:text-slate-300">
                        {med.name}:
                      </strong>{" "}
                      {med.instructions}
                    </span>
                  </div>
                ),
            )}
          </div>
        )}

        {prescription.notes && (
          <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50/50 px-3.5 py-2.5 dark:border-slate-700/40 dark:bg-slate-800/30">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Additional Notes
            </p>
            <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
              {prescription.notes}
            </p>
          </div>
        )}

        {/* Follow-up */}
        {prescription.followUpDate && (
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <Calendar className="h-3.5 w-3.5" />
            Follow-up on:{" "}
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {new Date(prescription.followUpDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        )}

        {/* Refills */}
        {prescription.refills > 0 && (
          <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
            <Clock className="h-3.5 w-3.5" />
            Refills: {prescription.refillsUsed} of {prescription.refills} used
          </div>
        )}

        {/* QR Code Placeholder */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-700/40">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Barcode className="h-5 w-5" />
            <span>
              Verify at: mediflow-hospital.com/verify/
              {prescription.prescriptionId}
            </span>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 dark:border-slate-600 dark:bg-slate-800">
            <span className="text-[8px] text-slate-400">QR</span>
          </div>
        </div>
      </div>

      {/* Actions (hidden when printing) */}
      <div className="flex items-center justify-end gap-2 border-t border-slate-200 bg-slate-50/50 px-5 py-3 print:hidden dark:border-slate-700 dark:bg-slate-900/50">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
        >
          <Printer className="h-3.5 w-3.5" />
          Print
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700">
          <Download className="h-3.5 w-3.5" />
          Download PDF
        </button>
      </div>
    </motion.div>
  );
}
