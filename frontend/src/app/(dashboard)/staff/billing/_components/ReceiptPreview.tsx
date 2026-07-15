"use client";

import { Button } from "@/app/components/dashboard/Button";
import {
  fadeInBackdrop,
  scaleUp,
} from "@/components/dashboard/staff/MotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Printer, QrCode, X } from "lucide-react";
import {
  type Invoice,
  formatCurrency,
  getDateLabel,
  statusConfig,
} from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface ReceiptPreviewProps {
  invoice: Invoice | null;
  open: boolean;
  onClose: () => void;
}

/* ══════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════ */

export function ReceiptPreview({
  invoice,
  open,
  onClose,
}: ReceiptPreviewProps) {
  if (!invoice) return null;
  const cfg = statusConfig[invoice.status];

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
              {/* Receipt content */}
              <div className="px-6 py-5" id="receipt-content">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-4 dark:border-slate-700">
                  <div>
                    {/* Hospital Logo Placeholder */}
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-sm">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                      MediFlow Hospital
                    </h1>
                    <p className="text-xs text-slate-500">
                      123 Healthcare Avenue, Medical District
                    </p>
                    <p className="text-xs text-slate-500">
                      Phone: +1 (555) 987-6543
                    </p>
                  </div>
                  {/* QR Code Placeholder */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                    <QrCode className="h-8 w-8 text-slate-400" />
                  </div>
                </div>

                {/* Receipt Info */}
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-slate-500">Receipt Number</p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {invoice.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Date</p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {getDateLabel(invoice.createdDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Patient Name</p>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {invoice.patientName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Patient ID</p>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {invoice.patientId}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Doctor</p>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {invoice.doctorName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Status</p>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${cfg.class}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="mt-5">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Items
                  </h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 text-left text-xs text-slate-400 dark:border-slate-700">
                        <th className="pb-1.5 font-medium">Description</th>
                        <th className="pb-1.5 text-right font-medium">Qty</th>
                        <th className="pb-1.5 text-right font-medium">Rate</th>
                        <th className="pb-1.5 text-right font-medium">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.items.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-slate-50 dark:border-slate-800"
                        >
                          <td className="py-2 text-slate-700 dark:text-slate-300">
                            {item.description}
                          </td>
                          <td className="py-2 text-right text-slate-500">
                            {item.quantity}
                          </td>
                          <td className="py-2 text-right text-slate-500">
                            {formatCurrency(item.rate)}
                          </td>
                          <td className="py-2 text-right font-medium text-slate-900 dark:text-white">
                            {formatCurrency(item.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-sm dark:border-slate-700">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span>{formatCurrency(invoice.subtotal)}</span>
                  </div>
                  {invoice.discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>
                        Discount{" "}
                        {invoice.discountLabel && `(${invoice.discountLabel})`}
                      </span>
                      <span>-{formatCurrency(invoice.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-500">
                    <span>Tax</span>
                    <span>{formatCurrency(invoice.tax)}</span>
                  </div>
                  {invoice.insurance > 0 && (
                    <div className="flex justify-between text-blue-600">
                      <span>Insurance ({invoice.insuranceProvider})</span>
                      <span>-{formatCurrency(invoice.insurance)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-slate-200 pt-1.5 text-base font-bold text-slate-900 dark:border-slate-700 dark:text-white">
                    <span>Total</span>
                    <span>{formatCurrency(invoice.total)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Paid</span>
                    <span>{formatCurrency(invoice.paidAmount)}</span>
                  </div>
                  {invoice.balance > 0 && (
                    <div className="flex justify-between text-sm font-medium text-amber-600">
                      <span>Balance Due</span>
                      <span>{formatCurrency(invoice.balance)}</span>
                    </div>
                  )}
                </div>

                {/* Payment History */}
                {invoice.payments.length > 0 && (
                  <div className="mt-5">
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Payment History
                    </h3>
                    <div className="space-y-2">
                      {invoice.payments.map((payment) => (
                        <div
                          key={payment.id}
                          className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800/50"
                        >
                          <div>
                            <p className="font-medium text-slate-700 dark:text-slate-300">
                              {payment.reference}
                            </p>
                            <p className="text-xs text-slate-400">
                              {payment.date} · {payment.time}
                            </p>
                          </div>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            {formatCurrency(payment.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="mt-6 border-t border-slate-100 pt-4 text-center text-xs text-slate-400 dark:border-slate-700">
                  <p>Thank you for choosing MediFlow Hospital</p>
                  <p className="mt-0.5">
                    This is a computer-generated receipt.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4 dark:border-slate-700">
                <Button variant="outline" size="sm" onClick={onClose}>
                  <X className="mr-1.5 h-4 w-4" />
                  Close
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-1.5 h-4 w-4" />
                  Download
                </Button>
                <Button variant="primary" size="sm">
                  <Printer className="mr-1.5 h-4 w-4" />
                  Print
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
