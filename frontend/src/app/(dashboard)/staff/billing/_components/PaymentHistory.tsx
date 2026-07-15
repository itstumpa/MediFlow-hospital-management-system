"use client";

import {
  fadeInBackdrop,
  scaleUp,
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import {
  Banknote,
  Building2,
  CheckCircle2,
  Clock,
  CreditCard,
  ShieldCheck,
  Smartphone,
  X,
  XCircle,
} from "lucide-react";
import { type Payment, formatCurrency, methodConfig } from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface PaymentHistoryProps {
  payments: Payment[];
  invoiceId?: string;
  open: boolean;
  onClose: () => void;
}

/* ─── Helpers ───────────────────────────────── */

const paymentStatusConfig = {
  completed: {
    icon: CheckCircle2,
    class:
      "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30",
    dot: "bg-emerald-500",
  },
  pending: {
    icon: Clock,
    class:
      "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30",
    dot: "bg-amber-500",
  },
  failed: {
    icon: XCircle,
    class: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/30",
    dot: "bg-red-500",
  },
} as const;

const methodIcons: Record<string, typeof Banknote> = {
  cash: Banknote,
  card: CreditCard,
  "bank-transfer": Building2,
  "mobile-banking": Smartphone,
  insurance: ShieldCheck,
};

/* ══════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════ */

export function PaymentHistory({
  payments,
  invoiceId,
  open,
  onClose,
}: PaymentHistoryProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            {...fadeInBackdrop}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            {...scaleUp}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-10"
          >
            <div className="mx-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-700">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Payment History
                  </h2>
                  {invoiceId && (
                    <p className="text-sm text-slate-500">{invoiceId}</p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-5">
                {payments.length === 0 ? (
                  <div className="flex flex-col items-center py-8 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                      <Clock className="h-6 w-6 text-slate-400" />
                    </div>
                    <p className="font-medium text-slate-700 dark:text-slate-300">
                      No payments recorded
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      This invoice has no payment history yet.
                    </p>
                  </div>
                ) : (
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="relative space-y-0"
                  >
                    {/* Timeline line */}
                    <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700" />

                    {payments.map((payment, idx) => {
                      const statusCfg = paymentStatusConfig[payment.status];
                      const StatusIcon = statusCfg.icon;
                      const MethodIcon =
                        methodIcons[payment.method] ?? CreditCard;
                      const methodCfg = methodConfig[payment.method];
                      const isLast = idx === payments.length - 1;

                      return (
                        <motion.div
                          key={payment.id}
                          variants={staggerItem}
                          className="relative flex items-start gap-4 pb-6 last:pb-0"
                        >
                          {/* Timeline dot */}
                          <div
                            className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white ${
                              payment.status === "completed"
                                ? "bg-emerald-50 dark:bg-emerald-950/40"
                                : payment.status === "pending"
                                  ? "bg-amber-50 dark:bg-amber-950/40"
                                  : "bg-red-50 dark:bg-red-950/40"
                            } dark:border-slate-900`}
                          >
                            <MethodIcon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 rounded-lg border border-slate-100 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-slate-900 dark:text-white">
                                  {formatCurrency(payment.amount)}
                                </span>
                                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                                  {methodCfg?.label ?? payment.method}
                                </span>
                              </div>
                              <span
                                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                                  payment.status === "completed"
                                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                                    : payment.status === "pending"
                                      ? "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                                      : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                                }`}
                              >
                                <StatusIcon className="h-3 w-3" />
                                {payment.status.charAt(0).toUpperCase() +
                                  payment.status.slice(1)}
                              </span>
                            </div>

                            <div className="mt-2 grid grid-cols-2 gap-1 text-xs text-slate-400">
                              <span>
                                {payment.date} · {payment.time}
                              </span>
                              {payment.reference && (
                                <span className="text-right">
                                  Ref: {payment.reference}
                                </span>
                              )}
                              {payment.transactionId && (
                                <span>TxID: {payment.transactionId}</span>
                              )}
                            </div>
                          </div>

                          {/* Connector line to next */}
                          {!isLast && (
                            <div className="absolute bottom-0 left-5 top-10 w-0.5 bg-slate-200 dark:bg-slate-700" />
                          )}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              {payments.length > 0 && (
                <div className="flex items-center justify-between border-t border-slate-100 px-6 py-3 text-sm text-slate-400 dark:border-slate-700">
                  <span>
                    Total payments:{" "}
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {payments.length}
                    </span>
                  </span>
                  <span>
                    Total collected:{" "}
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {formatCurrency(
                        payments.reduce((s, p) => s + p.amount, 0),
                      )}
                    </span>
                  </span>
                </div>
              )}

              <div className="flex items-center justify-end border-t border-slate-100 px-6 py-4 dark:border-slate-700">
                <Button variant="outline" size="md" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Inline Button to avoid circular dep issues
function Button({
  variant,
  size,
  children,
  onClick,
}: {
  variant: "outline" | "primary";
  size: "sm" | "md";
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const base =
    "inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-all focus:outline-none";
  const variants = {
    outline:
      "border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800",
    primary:
      "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark,var(--color-primary))] shadow-sm",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </button>
  );
}
