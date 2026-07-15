"use client";

import { Button } from "@/app/components/dashboard/Button";
import {
  staggerTable,
  tableRowFade,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import {
  Banknote,
  Building2,
  CreditCard,
  Eye,
  Printer,
  RotateCcw,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import {
  formatCurrency,
  type Invoice,
  type PaymentMethod,
  statusConfig,
} from "../_mock-data";

/* ─── Method icon ───────────────────────────── */

const methodIcons: Record<string, typeof Banknote> = {
  cash: Banknote,
  card: CreditCard,
  "bank-transfer": Building2,
  "mobile-banking": Smartphone,
  insurance: ShieldCheck,
  split: CreditCard,
};

function MethodBadge({ method }: { method: PaymentMethod | "split" }) {
  const Icon = methodIcons[method] ?? CreditCard;
  const labels: Record<string, string> = {
    cash: "Cash",
    card: "Card",
    "bank-transfer": "Transfer",
    "mobile-banking": "Mobile",
    insurance: "Insurance",
    split: "Split",
  };
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
      <Icon className="h-3 w-3" />
      {labels[method] ?? method}
    </span>
  );
}

/* ─── Desktop Row ───────────────────────────── */

function DesktopRow({
  invoice,
  onView,
  onPrint,
  onCollectPayment,
  onRefund,
}: {
  invoice: Invoice;
  onView: (inv: Invoice) => void;
  onPrint: (inv: Invoice) => void;
  onCollectPayment?: (inv: Invoice) => void;
  onRefund?: (inv: Invoice) => void;
}) {
  const cfg = statusConfig[invoice.status];
  const canCollect = invoice.balance > 0;
  const canRefund = invoice.paidAmount > 0;

  return (
    <motion.tr
      variants={tableRowFade}
      className="group border-b border-slate-50 transition-colors hover:bg-slate-50/50 dark:border-slate-800 dark:hover:bg-slate-800/30"
    >
      <td className="whitespace-nowrap px-4 py-3.5">
        <span className="text-xs font-semibold text-slate-900 dark:text-white">
          {invoice.id}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            {invoice.patientInitials}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {invoice.patientName}
            </p>
            <p className="text-xs text-slate-400">{invoice.patientId}</p>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 text-sm text-slate-600 dark:text-slate-400">
        {invoice.doctorName}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 text-right">
        <span className="text-sm font-semibold text-slate-900 dark:text-white">
          {formatCurrency(invoice.total)}
        </span>
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 text-right text-sm text-slate-500">
        {invoice.discount > 0 ? `-${formatCurrency(invoice.discount)}` : "—"}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 text-right text-sm text-slate-500">
        {formatCurrency(invoice.tax)}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 text-right text-sm text-slate-500">
        {invoice.insurance > 0 ? `-${formatCurrency(invoice.insurance)}` : "—"}
      </td>
      <td className="px-4 py-3.5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${cfg.class}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onView(invoice)}
            title="View Receipt"
          >
            <Eye className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onPrint(invoice)}
            title="Print"
          >
            <Printer className="h-3.5 w-3.5" />
          </Button>
          {canCollect && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onCollectPayment?.(invoice)}
              title="Collect Payment"
              className="text-emerald-500 hover:text-emerald-600"
            >
              <Banknote className="h-3.5 w-3.5" />
            </Button>
          )}
          {canRefund && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onRefund?.(invoice)}
              title="Refund"
              className="text-rose-400 hover:text-rose-500"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </td>
    </motion.tr>
  );
}

/* ─── Mobile Card ───────────────────────────── */

function MobileCard({
  invoice,
  onView,
  onCollectPayment,
  onRefund,
}: {
  invoice: Invoice;
  onView: (inv: Invoice) => void;
  onCollectPayment?: (inv: Invoice) => void;
  onRefund?: (inv: Invoice) => void;
}) {
  const cfg = statusConfig[invoice.status];
  const MethodIcon = methodIcons[invoice.paymentMethod] ?? CreditCard;
  const canCollect = invoice.balance > 0;
  const canRefund = invoice.paidAmount > 0;

  return (
    <motion.div variants={tableRowFade} className="dash-card p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            {invoice.patientInitials}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {invoice.patientName}
            </p>
            <p className="text-xs text-slate-400">{invoice.id}</p>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${cfg.class}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-xs text-slate-400">Doctor</span>
          <p className="font-medium text-slate-700 dark:text-slate-300">
            {invoice.doctorName}
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400">Total</span>
          <p className="font-semibold text-slate-900 dark:text-white">
            {formatCurrency(invoice.total)}
          </p>
        </div>
        <div>
          <span className="text-xs text-slate-400">Method</span>
          <div className="mt-0.5">
            <MethodBadge method={invoice.paymentMethod} />
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400">Balance</span>
          <p
            className={`font-medium ${
              invoice.balance > 0
                ? "text-red-500"
                : "text-emerald-600 dark:text-emerald-400"
            }`}
          >
            {invoice.balance > 0 ? formatCurrency(invoice.balance) : "Paid"}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-700">
        <Button
          variant="ghost"
          size="xs"
          className="flex-1"
          onClick={() => onView(invoice)}
        >
          <Eye className="mr-1 h-3.5 w-3.5" />
          Receipt
        </Button>
        {canCollect && (
          <Button
            variant="ghost"
            size="xs"
            className="flex-1 text-emerald-600"
            onClick={() => onCollectPayment?.(invoice)}
          >
            <Banknote className="mr-1 h-3.5 w-3.5" />
            Pay
          </Button>
        )}
        {canRefund && (
          <Button
            variant="ghost"
            size="xs"
            className="flex-1 text-rose-500"
            onClick={() => onRefund?.(invoice)}
          >
            <RotateCcw className="mr-1 h-3.5 w-3.5" />
            Refund
          </Button>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Empty State ───────────────────────────── */

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
        <CreditCard className="h-7 w-7 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        No invoices found
      </h3>
      <p className="mt-1 max-w-sm text-center text-sm text-slate-500 dark:text-slate-400">
        No invoices match your current filters. Try adjusting the search or
        filter criteria.
      </p>
    </div>
  );
}

/* ─── Main Component ────────────────────────── */

interface InvoiceTableProps {
  invoices: Invoice[];
  onViewInvoice: (invoice: Invoice) => void;
  onPrintInvoice?: (invoice: Invoice) => void;
  onCollectPayment?: (invoice: Invoice) => void;
  onRefund?: (invoice: Invoice) => void;
}

export function InvoiceTable({
  invoices: data,
  onViewInvoice,
  onPrintInvoice,
  onCollectPayment,
  onRefund,
}: InvoiceTableProps) {
  if (data.length === 0) return <EmptyState />;

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white md:block dark:border-slate-700 dark:bg-slate-800">
        <table className="w-full">
          <thead className="table-sticky-header">
            <tr className="border-b border-slate-100 bg-slate-50/50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
              <th className="px-4 py-3.5">Invoice</th>
              <th className="px-4 py-3.5">Patient</th>
              <th className="px-4 py-3.5">Doctor</th>
              <th className="px-4 py-3.5 text-right">Amount</th>
              <th className="px-4 py-3.5 text-right">Discount</th>
              <th className="px-4 py-3.5 text-right">Tax</th>
              <th className="px-4 py-3.5 text-right">Insurance</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-4 py-3.5">Actions</th>
            </tr>
          </thead>
          <motion.tbody
            variants={staggerTable}
            initial="hidden"
            animate="visible"
          >
            {data.map((invoice) => (
              <DesktopRow
                key={invoice.id}
                invoice={invoice}
                onView={onViewInvoice}
                onPrint={onPrintInvoice ?? (() => {})}
                onCollectPayment={onCollectPayment}
                onRefund={onRefund}
              />
            ))}
          </motion.tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {data.map((invoice) => (
          <MobileCard
            key={invoice.id}
            invoice={invoice}
            onView={onViewInvoice}
            onCollectPayment={onCollectPayment}
            onRefund={onRefund}
          />
        ))}
      </div>
    </>
  );
}
