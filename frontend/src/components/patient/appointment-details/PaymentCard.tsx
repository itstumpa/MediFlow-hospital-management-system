"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  CreditCard,
  DollarSign,
  Percent,
  Receipt,
  ShieldCheck,
} from "lucide-react";

/* ─── Payment status badge ─── */
function PaymentStatusBadge({ status }: { status: string }) {
  const config: Record<
    string,
    { label: string; className: string; icon: typeof CheckCircle2 }
  > = {
    paid: {
      label: "Paid",
      className:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
      icon: CheckCircle2,
    },
    unpaid: {
      label: "Unpaid",
      className:
        "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
      icon: AlertTriangle,
    },
    partial: {
      label: "Partial",
      className:
        "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
      icon: AlertTriangle,
    },
    refunded: {
      label: "Refunded",
      className:
        "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400",
      icon: CheckCircle2,
    },
  };

  const cfg = config[status] || config.unpaid;
  const Icon = cfg.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        cfg.className,
      )}
    >
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

interface PaymentCardProps {
  consultationFee: number;
  paymentMethod: string;
  discount: number;
  tax: number;
  total: number;
  status: string;
  insuranceProvider?: string;
  insuranceId?: string;
  insuranceType?: string;
  invoiceNumber?: string;
  className?: string;
}

export function PaymentCard({
  consultationFee,
  paymentMethod,
  discount,
  tax,
  total,
  status,
  insuranceProvider,
  insuranceId,
  insuranceType,
  invoiceNumber,
  className,
}: PaymentCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Payment Details
        </h3>
        <PaymentStatusBadge status={status} />
      </div>

      <div className="space-y-4">
        {/* Insurance */}
        {insuranceProvider && (
          <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-700/30">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/40">
              <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {insuranceProvider}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {insuranceType} • ID: {insuranceId}
              </p>
            </div>
          </div>
        )}

        {/* Fee breakdown */}
        <div className="space-y-2.5">
          <Row
            icon={DollarSign}
            label="Consultation Fee"
            value={`$${consultationFee.toFixed(2)}`}
          />
          <Row
            icon={Percent}
            label="Discount"
            value={discount > 0 ? `-$${discount.toFixed(2)}` : "—"}
            valueClass={
              discount > 0
                ? "text-emerald-600 dark:text-emerald-400"
                : undefined
            }
          />
          <Row icon={Receipt} label="Tax" value={`$${tax.toFixed(2)}`} />
          {paymentMethod && (
            <Row
              icon={CreditCard}
              label="Payment Method"
              value={paymentMethod}
            />
          )}

          <div className="border-t border-slate-100 pt-3 dark:border-slate-700/40">
            <Row
              icon={DollarSign}
              label="Total Amount"
              value={`$${total.toFixed(2)}`}
              labelClass="text-sm font-semibold text-slate-800 dark:text-slate-200"
              valueClass="text-lg font-bold text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Invoice */}
        {invoiceNumber && (
          <div className="flex items-center gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 px-4 py-3 dark:border-slate-700 dark:bg-slate-700/20">
            <Building2 className="h-4 w-4 text-slate-400" />
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Invoice:{" "}
              <span className="font-mono font-medium text-slate-600 dark:text-slate-300">
                {invoiceNumber}
              </span>
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
  labelClass,
  valueClass,
}: {
  icon: typeof DollarSign;
  label: string;
  value: string;
  labelClass?: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-slate-400 shrink-0" />
        <span
          className={cn(
            "text-sm text-slate-600 dark:text-slate-300",
            labelClass,
          )}
        >
          {label}
        </span>
      </div>
      <span
        className={cn(
          "text-sm font-medium text-slate-700 dark:text-slate-300 tabular-nums",
          valueClass,
        )}
      >
        {value}
      </span>
    </div>
  );
}
