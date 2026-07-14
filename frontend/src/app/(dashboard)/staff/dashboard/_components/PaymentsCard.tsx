"use client";

import {
  staggerTable,
  tableRowFade,
} from "@/components/dashboard/staff/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CreditCard, DollarSign, Landmark, Smartphone } from "lucide-react";
import {
  recentPayments,
  type PaymentMethod,
  type PaymentStatus,
} from "../_mock-data";

/* ─── Helpers ───────────────────────────────── */

const methodIcon: Record<PaymentMethod, typeof CreditCard> = {
  cash: DollarSign,
  card: CreditCard,
  insurance: Landmark,
  online: Smartphone,
};

const methodLabel: Record<PaymentMethod, string> = {
  cash: "Cash",
  card: "Card",
  insurance: "Insurance",
  online: "Online",
};

const statusConfig: Record<PaymentStatus, { label: string; classes: string }> =
  {
    paid: {
      label: "Paid",
      classes:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    },
    pending: {
      label: "Pending",
      classes:
        "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    },
    refunded: {
      label: "Refunded",
      classes:
        "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    },
    failed: {
      label: "Failed",
      classes: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    },
  };

/* ─── Payments Card ─────────────────────────── */

export function PaymentsCard() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
        Recent Payments
      </h2>
      <div className="dash-card divide-y divide-slate-100 dark:divide-slate-700/50">
        <motion.div variants={staggerTable} initial="hidden" animate="visible">
          {recentPayments.map((payment) => {
            const MethodIcon = methodIcon[payment.method];

            return (
              <motion.div
                key={payment.id}
                variants={tableRowFade}
                className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/20"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  <MethodIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {payment.invoice}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {payment.patientName} · {methodLabel[payment.method]}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {payment.amount}
                  </p>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                      statusConfig[payment.status].classes,
                    )}
                  >
                    {statusConfig[payment.status].label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
