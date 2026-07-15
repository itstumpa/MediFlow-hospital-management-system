"use client";

import { Button } from "@/app/components/dashboard/Button";
import {
  fadeInBackdrop,
  scaleUp,
} from "@/components/dashboard/staff/MotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import {
  Banknote,
  Building2,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Smartphone,
  Split,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  formatCurrency,
  type Invoice,
  type PaymentMethod,
} from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface PaymentDialogProps {
  invoice: Invoice | null;
  open: boolean;
  onClose: () => void;
  onPaymentComplete?: (invoiceId: string, amount: number) => void;
}

/* ─── Method options ────────────────────────── */

interface MethodOption {
  id: PaymentMethod | "split";
  label: string;
  icon: typeof Banknote;
  description: string;
}

const paymentMethods: MethodOption[] = [
  {
    id: "cash",
    label: "Cash",
    icon: Banknote,
    description: "Physical currency",
  },
  {
    id: "card",
    label: "Card",
    icon: CreditCard,
    description: "Credit / Debit card",
  },
  {
    id: "bank-transfer",
    label: "Bank Transfer",
    icon: Building2,
    description: "Direct bank deposit",
  },
  {
    id: "mobile-banking",
    label: "Mobile Banking",
    icon: Smartphone,
    description: "Mobile wallet / UPI",
  },
  {
    id: "insurance",
    label: "Insurance",
    icon: ShieldCheck,
    description: "Insurance coverage",
  },
  {
    id: "split",
    label: "Split Payment",
    icon: Split,
    description: "Multiple methods",
  },
];

/* ══════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════ */

export function PaymentDialog({
  invoice,
  open,
  onClose,
  onPaymentComplete,
}: PaymentDialogProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | "split">(
    "card",
  );
  const [amount, setAmount] = useState(invoice?.balance ?? 0);
  const [reference, setReference] = useState("");
  const [step, setStep] = useState<"form" | "processing" | "success">("form");

  /* ── Reset on open ── */
  if (open && invoice && step === "form") {
    // Ensure amount matches balance when dialog opens
    if (amount !== invoice.balance) setAmount(invoice.balance);
  }

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => setStep("success"), 1500);
  };

  const handleDone = () => {
    onPaymentComplete?.(invoice?.id ?? "", amount);
    setStep("form");
    onClose();
  };

  const handleClose = () => {
    if (step === "processing") return;
    setStep("form");
    onClose();
  };

  if (!invoice) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            {...fadeInBackdrop}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
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
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Collect Payment
                      </h2>
                      <p className="text-sm text-slate-500">
                        {invoice.patientName} · {invoice.id}
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="px-5 py-4">
                    {/* Amount due */}
                    <div className="mb-4 rounded-xl bg-slate-50 p-4 text-center dark:bg-slate-800/50">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Amount Due
                      </p>
                      <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(invoice.balance)}
                      </p>
                    </div>

                    {/* Payment amount */}
                    <div className="mb-4">
                      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Payment Amount
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={invoice.balance}
                        value={amount || ""}
                        onChange={(e) =>
                          setAmount(
                            Math.min(Number(e.target.value), invoice.balance),
                          )
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-lg font-semibold text-slate-900 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                      <div className="mt-1 flex gap-1.5">
                        {[
                          invoice.balance,
                          invoice.balance / 2,
                          invoice.total * 0.25,
                        ].map((v) => (
                          <button
                            key={v}
                            onClick={() => setAmount(Math.round(v))}
                            className="rounded-md border border-slate-200 px-2 py-0.5 text-xs text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                          >
                            {formatCurrency(Math.round(v))}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Method selection */}
                    <div className="mb-4">
                      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Payment Method
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {paymentMethods.map((method) => {
                          const isSelected = selectedMethod === method.id;
                          const Icon = method.icon;
                          return (
                            <button
                              key={method.id}
                              onClick={() => setSelectedMethod(method.id)}
                              className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 text-xs transition-all ${
                                isSelected
                                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)] ring-1 ring-[var(--color-primary)]"
                                  : "border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                              <span className="font-medium leading-tight">
                                {method.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Reference */}
                    <div className="mb-4">
                      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Reference (optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Check number, transaction ID..."
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
                      />
                    </div>

                    {/* Summary */}
                    <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Balance</span>
                        <span className="text-slate-900 dark:text-white">
                          {formatCurrency(invoice.balance)}
                        </span>
                      </div>
                      <div className="mt-1 flex justify-between text-sm">
                        <span className="text-slate-500">Paying</span>
                        <span className="font-semibold text-[var(--color-primary)]">
                          {formatCurrency(amount)}
                        </span>
                      </div>
                      <div className="mt-1 flex justify-between border-t border-slate-200 pt-1 text-sm dark:border-slate-700">
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          Remaining
                        </span>
                        <span
                          className={`font-semibold ${
                            invoice.balance - amount > 0
                              ? "text-amber-600"
                              : "text-emerald-600"
                          }`}
                        >
                          {formatCurrency(
                            Math.max(0, invoice.balance - amount),
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-5 py-4 dark:border-slate-700">
                    <Button variant="outline" size="md" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handlePay}
                      disabled={amount <= 0}
                    >
                      <CreditCard className="mr-1.5 h-4 w-4" />
                      Pay {formatCurrency(amount)}
                    </Button>
                  </div>
                </>
              )}

              {/* Processing */}
              {step === "processing" && (
                <div className="flex flex-col items-center justify-center px-5 py-16">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--color-primary)] border-t-transparent"
                  />
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    Processing Payment
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Please wait while we process your payment...
                  </p>
                </div>
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
                    Payment Successful!
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {formatCurrency(amount)} collected via{" "}
                    {paymentMethods.find((m) => m.id === selectedMethod)
                      ?.label ?? selectedMethod}
                  </p>
                  <div className="mt-4 w-full rounded-lg bg-slate-50 p-3 text-center text-sm dark:bg-slate-800/50">
                    <p className="text-slate-500">Invoice</p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {invoice.id}
                    </p>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Button variant="outline" size="sm" onClick={handleDone}>
                      Close
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleDone}>
                      <PrinterIcon className="mr-1.5 h-4 w-4" />
                      Print Receipt
                    </Button>
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

function PrinterIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}
