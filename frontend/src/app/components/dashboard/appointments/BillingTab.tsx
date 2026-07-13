"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { AppointmentDetail } from "@/lib/data/appointment-detail";
import { paymentStatusColors } from "@/lib/data/appointment-detail";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  BadgeDollarSign,
  CreditCard,
  DollarSign,
  Percent,
  Receipt,
} from "lucide-react";

const paymentLabels: Record<string, string> = {
  paid: "Paid",
  unpaid: "Unpaid",
  partial: "Partial",
  refunded: "Refunded",
};

interface BillingTabProps {
  appointment: AppointmentDetail;
}

export function BillingTab({ appointment }: BillingTabProps) {
  const { billing } = appointment;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Invoice Header */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-dash-primary-light text-dash-primary dark:bg-teal-500/20 dark:text-accent">
              <Receipt className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Invoice #{billing.invoiceNumber}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Payment via {billing.paymentMethod}
              </p>
            </div>
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
              paymentStatusColors[billing.status],
            )}
          >
            {paymentLabels[billing.status]}
          </span>
        </div>
      </motion.div>

      {/* Amount Breakdown */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
          Amount Breakdown
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-700/50">
            <div className="flex items-center gap-3">
              <DollarSign className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Consultation Fee
              </span>
            </div>
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              ${billing.amount.toFixed(2)}
            </span>
          </div>

          {billing.discount > 0 && (
            <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-700/50">
              <div className="flex items-center gap-3">
                <Percent className="h-4 w-4 text-emerald-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Discount
                </span>
              </div>
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                -${billing.discount.toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-700/50">
            <div className="flex items-center gap-3">
              <BadgeDollarSign className="h-4 w-4 text-amber-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Tax (10%)
              </span>
            </div>
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              ${billing.tax.toFixed(2)}
            </span>
          </div>

          <div className="border-t border-slate-200 pt-3 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="h-4 w-4 text-dash-primary" />
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  Total Amount
                </span>
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                ${billing.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Payment Method */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400">
            <CreditCard className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              Payment Method
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {billing.paymentMethod}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
