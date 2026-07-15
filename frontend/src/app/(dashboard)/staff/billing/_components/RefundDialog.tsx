"use client";

import { Button } from "@/app/components/dashboard/Button";
import {
  fadeInBackdrop,
  scaleUp,
} from "@/components/dashboard/staff/MotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  X,
} from "lucide-react";
import { useState } from "react";
import { type Invoice, type Refund, formatCurrency } from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface RefundDialogProps {
  invoice: Invoice | null;
  open: boolean;
  onClose: () => void;
  onSuccess?: (refund: Refund) => void;
}

/* ─── Refund reasons ────────────────────────── */

const refundReasons = [
  { value: "service-cancelled", label: "Service Cancelled" },
  { value: "billing-error", label: "Billing Error" },
  { value: "patient-request", label: "Patient Request" },
  { value: "insurance-adjustment", label: "Insurance Adjustment" },
  { value: "duplicate-payment", label: "Duplicate Payment" },
  { value: "other", label: "Other" },
];

/* ══════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════ */

export function RefundDialog({
  invoice,
  open,
  onClose,
  onSuccess,
}: RefundDialogProps) {
  const [amount, setAmount] = useState(invoice?.paidAmount ?? 0);
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [processedBy, setProcessedBy] = useState("");
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState<"form" | "confirm" | "success">("form");

  if (!invoice) return null;

  const maxRefund = invoice.paidAmount;
  const isFormValid =
    amount > 0 &&
    amount <= maxRefund &&
    (reason || (reason === "other" && otherReason));

  const handleSubmit = () => {
    setStep("confirm");
  };

  const handleConfirm = () => {
    setStep("success");
    setTimeout(() => {
      const refund: Refund = {
        id: `REF-${Date.now()}`,
        invoiceId: invoice.id,
        patientName: invoice.patientName,
        amount,
        reason: reason === "other" ? otherReason : reason,
        status: "completed",
        processedBy: processedBy || "Current User",
        date: new Date().toISOString().split("T")[0],
      };
      onSuccess?.(refund);
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setStep("form");
    setReason("");
    setOtherReason("");
    setProcessedBy("");
    setNotes("");
    if (invoice) setAmount(invoice.paidAmount);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            {...fadeInBackdrop}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={step === "success" ? undefined : handleClose}
          />

          {/* Dialog */}
          <motion.div
            {...scaleUp}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
              {step === "form" && (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-950/30">
                        <RotateCcw className="h-5 w-5 text-rose-500" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                          Process Refund
                        </h2>
                        <p className="text-sm text-slate-500">
                          {invoice.id} · {invoice.patientName}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleClose}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="px-5 py-4 space-y-4">
                    {/* Max refund info */}
                    <div className="rounded-xl bg-amber-50 p-3 text-sm dark:bg-amber-950/20">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                        <div>
                          <p className="font-medium text-amber-800 dark:text-amber-300">
                            Maximum Refundable Amount
                          </p>
                          <p className="mt-0.5 text-amber-600 dark:text-amber-400">
                            {formatCurrency(maxRefund)} — total paid on this
                            invoice
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Amount */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Refund Amount
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={maxRefund}
                        value={amount || ""}
                        onChange={(e) =>
                          setAmount(Math.min(Number(e.target.value), maxRefund))
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-lg font-semibold text-slate-900 transition-colors focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>

                    {/* Reason */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Refund Reason
                      </label>
                      <select
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 transition-colors focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        <option value="">Select reason</option>
                        {refundReasons.map((r) => (
                          <option key={r.value} value={r.value}>
                            {r.label}
                          </option>
                        ))}
                      </select>
                      {reason === "other" && (
                        <input
                          type="text"
                          placeholder="Describe reason..."
                          value={otherReason}
                          onChange={(e) => setOtherReason(e.target.value)}
                          className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition-colors focus:border-rose-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        />
                      )}
                    </div>

                    {/* Processed By */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Processed By
                      </label>
                      <input
                        type="text"
                        placeholder="Staff name"
                        value={processedBy}
                        onChange={(e) => setProcessedBy(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 transition-colors focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Notes (optional)
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Additional notes..."
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder-slate-400 transition-colors focus:border-rose-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-5 py-4 dark:border-slate-700">
                    <Button variant="outline" size="md" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      variant="danger"
                      size="md"
                      onClick={handleSubmit}
                      disabled={!isFormValid}
                    >
                      <RotateCcw className="mr-1.5 h-4 w-4" />
                      Process Refund
                    </Button>
                  </div>
                </>
              )}

              {/* Confirm Step */}
              {step === "confirm" && (
                <>
                  <div className="px-5 py-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-950/30">
                        <AlertTriangle className="h-5 w-5 text-rose-500" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                          Confirm Refund
                        </h2>
                        <p className="text-sm text-slate-500">
                          Please review the details below
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Invoice</span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {invoice.id}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Patient</span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {invoice.patientName}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Amount</span>
                        <span className="font-semibold text-rose-600">
                          {formatCurrency(amount)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Reason</span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {reason === "other"
                            ? otherReason
                            : refundReasons.find((r) => r.value === reason)
                                ?.label}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Processed By</span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {processedBy || "Current User"}
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-slate-400">
                      This action cannot be undone. The refund will be processed
                      immediately.
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 dark:border-slate-700">
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => setStep("form")}
                    >
                      <ArrowLeft className="mr-1.5 h-4 w-4" />
                      Back
                    </Button>
                    <Button variant="danger" size="md" onClick={handleConfirm}>
                      <CheckCircle2 className="mr-1.5 h-4 w-4" />
                      Confirm Refund
                    </Button>
                  </div>
                </>
              )}

              {/* Success */}
              {step === "success" && (
                <div className="flex flex-col items-center justify-center px-5 py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      damping: 15,
                      stiffness: 200,
                    }}
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/40"
                  >
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                  </motion.div>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">
                    Refund Processed!
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {formatCurrency(amount)} has been refunded for {invoice.id}
                  </p>
                  <div className="mt-4 w-full rounded-lg bg-slate-50 p-3 text-center text-sm dark:bg-slate-800/50">
                    <p className="text-slate-500">Reason</p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {reason === "other"
                        ? otherReason
                        : refundReasons.find((r) => r.value === reason)?.label}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
