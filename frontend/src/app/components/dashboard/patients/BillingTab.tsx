"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  Calendar,
  CreditCard,
  Receipt,
  Download,
} from "lucide-react";
import type { BillingRecord } from "@/lib/data/patient-detail";
import { formatDate } from "@/lib/utils";
import { staggerItem, staggerContainer } from "@/app/components/dashboard/MotionVariants";
import { EmptyState } from "@/app/components/ui/EmptyState";
import { cn } from "@/lib/utils";

interface BillingTabProps {
  records: BillingRecord[];
}

const statusConfig = {
  paid: {
    label: "Paid",
    class:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  pending: {
    label: "Pending",
    class: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  overdue: {
    label: "Overdue",
    class: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    dot: "bg-red-500",
  },
  cancelled: {
    label: "Cancelled",
    class:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    dot: "bg-slate-400",
  },
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function BillingTab({ records }: BillingTabProps) {
  if (records.length === 0) {
    return (
      <EmptyState
        icon={Receipt}
        title="No Billing Records"
        description="This patient has no billing history."
      />
    );
  }

  const totalPaid = records
    .filter((r) => r.status === "paid")
    .reduce((sum, r) => sum + r.amount, 0);
  const totalOutstanding = records
    .filter((r) => r.status === "pending" || r.status === "overdue")
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="dash-card p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Total Paid
          </p>
          <p className="mt-1 text-xl font-bold text-emerald-600">
            {formatCurrency(totalPaid)}
          </p>
        </div>
        <div className="dash-card p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Outstanding
          </p>
          <p className="mt-1 text-xl font-bold text-red-600">
            {formatCurrency(totalOutstanding)}
          </p>
        </div>
        <div className="dash-card p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Paid Invoices
          </p>
          <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
            {records.filter((r) => r.status === "paid").length}
          </p>
        </div>
        <div className="dash-card p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Pending
          </p>
          <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
            {records.filter((r) => r.status !== "paid").length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="dash-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dash-border dark:border-slate-700">
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Invoice
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Treatment
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Amount
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Status
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Payment Method
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dash-border dark:divide-slate-700">
              {records.map((bill, i) => {
                const status = statusConfig[bill.status];
                return (
                  <motion.tr
                    key={bill.id}
                    variants={staggerItem}
                    className={cn(
                      "transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50",
                      (bill.status === "pending" || bill.status === "overdue") &&
                        "bg-amber-50/30 dark:bg-amber-950/10",
                    )}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Receipt className="h-4 w-4 text-slate-400" />
                        <span className="text-sm font-mono font-medium text-slate-900 dark:text-white">
                          {bill.invoiceNumber}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {bill.treatment}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(bill.amount)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                          status.class,
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            status.dot,
                          )}
                        />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="h-3.5 w-3.5 text-slate-400" />
                        {bill.paymentMethod}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        {formatDate(bill.dueDate)}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
