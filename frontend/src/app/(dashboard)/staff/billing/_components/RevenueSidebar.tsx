"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Banknote,
  Building2,
  CreditCard,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  X,
  type LucideIcon,
} from "lucide-react";
import { billingStats, formatCurrency, invoices } from "../_mock-data";

const methodIcons: Record<string, LucideIcon> = {
  cash: Banknote,
  card: CreditCard,
  "bank-transfer": Building2,
  "mobile-banking": Smartphone,
  insurance: ShieldCheck,
};

/* ─── Props ─────────────────────────────────── */

interface RevenueSidebarProps {
  open: boolean;
  onClose: () => void;
}

/* ─── Helpers ───────────────────────────────── */

const recentPayments = invoices
  .flatMap((inv) =>
    inv.payments.map((p) => ({
      ...p,
      patientName: inv.patientName,
      invoiceId: inv.id,
    })),
  )
  .sort(
    (a, b) =>
      new Date(`${b.date}T${b.time}`).getTime() -
      new Date(`${a.date}T${a.time}`).getTime(),
  )
  .slice(0, 7);

const pendingInvoices = invoices.filter(
  (inv) =>
    inv.status === "pending" ||
    inv.status === "partial" ||
    inv.status === "overdue",
);

/* ══════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════ */

export function RevenueSidebar({ open, onClose }: RevenueSidebarProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Mobile backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-sm border-l border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900 lg:sticky lg:top-0 lg:z-0 lg:shadow-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[var(--color-primary)]" />
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Revenue Overview
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300 lg:hidden"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="h-full overflow-y-auto pb-24">
              <div className="p-5 space-y-6">
                {/* ── Today's Revenue ── */}
                <section>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Today&apos;s Revenue
                  </h3>
                  <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 p-4 dark:from-emerald-950/30 dark:to-teal-950/20">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                        Total Revenue
                      </p>
                      <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        <ArrowUpRight className="h-3 w-3" />
                        {billingStats[0].trend}
                      </span>
                    </div>
                    <p className="mt-1 text-2xl font-bold text-emerald-900 dark:text-emerald-200">
                      {formatCurrency(billingStats[0].value)}
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {breakdown.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-lg bg-white/60 px-2.5 py-2 text-center dark:bg-slate-800/40"
                        >
                          <item.icon className="mx-auto h-4 w-4 text-slate-500" />
                          <p className="mt-0.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                            {item.label}
                          </p>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {formatCurrency(item.amount)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* ── Recent Transactions ── */}
                <section>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Recent Transactions
                  </h3>
                  <div className="space-y-2">
                    {recentPayments.map((payment) => {
                      const MethodIcon =
                        methodIcons[payment.method] ?? CreditCard;
                      return (
                        <div
                          key={payment.id}
                          className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700">
                              <MethodIcon className="h-4 w-4 text-slate-500" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-slate-900 dark:text-white">
                                {payment.patientName}
                              </p>
                              <p className="text-xs text-slate-400">
                                {payment.invoiceId}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                              {formatCurrency(payment.amount)}
                            </p>
                            <p className="text-xs text-slate-400">
                              {payment.time}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* ── Pending Payments ── */}
                <section>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Pending Payments
                  </h3>
                  {pendingInvoices.length === 0 ? (
                    <p className="text-sm text-slate-400">
                      No pending payments
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {pendingInvoices.slice(0, 5).map((inv) => (
                        <div
                          key={inv.id}
                          className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5 dark:border-slate-700"
                        >
                          <div>
                            <p className="text-xs font-medium text-slate-900 dark:text-white">
                              {inv.patientName}
                            </p>
                            <p className="text-xs text-slate-400">{inv.id}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                              {formatCurrency(inv.balance)}
                            </p>
                            <p
                              className={`text-xs ${
                                inv.status === "overdue"
                                  ? "text-red-500"
                                  : "text-slate-400"
                              }`}
                            >
                              {inv.status === "overdue"
                                ? "Overdue"
                                : inv.status === "partial"
                                  ? "Partial"
                                  : "Pending"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                {/* ── Quick Summary ── */}
                <section className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Summary
                  </h3>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Collected</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {formatCurrency(
                          invoices.reduce((s, i) => s + i.paidAmount, 0),
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Outstanding</span>
                      <span className="font-semibold text-amber-600">
                        {formatCurrency(
                          invoices.reduce((s, i) => s + i.balance, 0),
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Invoice Count</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {invoices.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Pending / Overdue</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {pendingInvoices.length}
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Revenue breakdown data ────────────────── */

const breakdown = [
  { label: "Card", icon: CreditCard, amount: 12500 },
  { label: "Cash", icon: Banknote, amount: 8450 },
  { label: "Insurance", icon: ShieldCheck, amount: 4200 },
  { label: "Bank", icon: Building2, amount: 3300 },
];
