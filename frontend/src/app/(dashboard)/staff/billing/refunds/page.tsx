"use client";

import { Button } from "@/app/components/dashboard/Button";
import { DashboardContainer } from "@/components/dashboard/staff/DashboardContainer";
import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { PageHeader } from "@/components/dashboard/staff/PageHeader";
import { motion } from "framer-motion";
import { Download, Filter, RotateCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  BillingStats,
  defaultFilterValues,
  FilterBar,
  RefundDialog,
} from "../_components";
import {
  invoices as allInvoices,
  formatCurrency,
  type Invoice,
  type Refund,
} from "../_mock-data";

export default function RefundsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(defaultFilterValues);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Modals
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [refunds, setRefunds] = useState<Refund[]>([]);

  /* ── Filtering ── */
  const invoices = useMemo(() => {
    let result = [...allInvoices];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (inv) =>
          inv.id.toLowerCase().includes(q) ||
          inv.patientName.toLowerCase().includes(q) ||
          inv.patientId.toLowerCase().includes(q) ||
          inv.doctorName.toLowerCase().includes(q),
      );
    }

    // Filters
    if (filters.invoiceId) {
      result = result.filter((inv) =>
        inv.id.toLowerCase().includes(filters.invoiceId.toLowerCase()),
      );
    }
    if (filters.patient) {
      const q = filters.patient.toLowerCase();
      result = result.filter(
        (inv) =>
          inv.patientName.toLowerCase().includes(q) ||
          inv.patientId.toLowerCase().includes(q),
      );
    }
    if (filters.doctor) {
      result = result.filter((inv) => inv.doctorName === filters.doctor);
    }
    if (filters.method) {
      result = result.filter((inv) =>
        inv.payments.some((p) => p.method === filters.method),
      );
    }
    if (filters.status) {
      result = result.filter((inv) => inv.status === filters.status);
    }
    if (filters.insurance) {
      result = result.filter(
        (inv) =>
          inv.insuranceProvider?.toLowerCase() ===
          filters.insurance.toLowerCase(),
      );
    }
    if (filters.dateFrom) {
      result = result.filter((inv) => inv.createdDate >= filters.dateFrom);
    }
    if (filters.dateTo) {
      result = result.filter((inv) => inv.createdDate <= filters.dateTo);
    }

    // Sort
    switch (filters.sort) {
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdDate).getTime() -
            new Date(b.createdDate).getTime(),
        );
        break;
      case "amount-high":
        result.sort((a, b) => b.total - a.total);
        break;
      case "amount-low":
        result.sort((a, b) => a.total - b.total);
        break;
      case "patient":
        result.sort((a, b) => a.patientName.localeCompare(b.patientName));
        break;
      case "overdue":
        result = result.filter((inv) => inv.status === "overdue");
        break;
      case "newest":
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime(),
        );
        break;
    }

    return result;
  }, [searchQuery, filters]);

  const stats = useMemo(() => {
    const totalRefunded = allInvoices.reduce(
      (s, i) => s + i.refunds.reduce((rs, r) => rs + r.amount, 0),
      0,
    );
    const refundCount = allInvoices.reduce((s, i) => s + i.refunds.length, 0);
    const pendingRefunds = allInvoices.filter((i) =>
      i.refunds.some((r) => r.status === "pending"),
    ).length;

    return {
      totalRefunded,
      refundCount,
      pendingRefunds,
    };
  }, []);

  /* ── Handlers ── */
  const handleRefund = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setRefundDialogOpen(true);
  };

  const handleRefundSuccess = (refund: Refund) => {
    setRefunds((prev) => [refund, ...prev]);
    setRefundDialogOpen(false);
    setSelectedInvoice(null);
  };

  const handleRefundClose = () => {
    setRefundDialogOpen(false);
    setSelectedInvoice(null);
  };

  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== "" && v !== "newest",
  );

  return (
    <DashboardContainer>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="min-h-screen bg-slate-50/50 dark:bg-slate-900/50"
      >
        <div className="p-4 md:p-6">
          {/* Header */}
          <motion.div variants={staggerItem} initial="hidden" animate="visible">
            <PageHeader
              title="Refunds"
              subtitle="Process patient refunds and adjustments"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="outline" size="md">
                    <Download className="mr-1.5 h-4 w-4" />
                    Export
                  </Button>
                </motion.div>
              </div>
            </PageHeader>
          </motion.div>

          {/* Stats */}
          <motion.div variants={staggerItem} initial="hidden" animate="visible">
            <BillingStats />
          </motion.div>

          {/* Search & Filters */}
          <motion.div variants={staggerItem} initial="hidden" animate="visible">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search invoices by ID, patient, or doctor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-700 placeholder-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition-all ${
                  showFilters || hasActiveFilters
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                <Filter className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {
                      Object.values(filters).filter(
                        (v) => v !== "" && v !== "newest",
                      ).length
                    }
                  </span>
                )}
              </button>
            </div>

            {/* Filter Bar */}
            <div className="mt-3">
              <FilterBar
                isOpen={showFilters}
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters(defaultFilterValues)}
              />
            </div>
          </motion.div>

          {/* Results info */}
          <motion.div
            variants={staggerItem}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-between text-sm"
          >
            <p className="text-slate-500 dark:text-slate-400">
              Showing{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {invoices.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {allInvoices.length}
              </span>{" "}
              invoices
            </p>
            <p className="text-slate-400">
              Total Refunded:{" "}
              <span className="font-semibold text-rose-600 dark:text-rose-400">
                {formatCurrency(stats.totalRefunded)}
              </span>
            </p>
          </motion.div>

          {/* Refunds Table */}
          <motion.div variants={staggerItem} initial="hidden" animate="visible">
            <div className="dash-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/50">
                      <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400">
                        Invoice
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400">
                        Patient
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400">
                        Total
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400">
                        Paid
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400">
                        Refunded
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400">
                        Balance
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right font-medium text-slate-500 dark:text-slate-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {invoices.map((invoice) => {
                      const refundedAmount = invoice.refunds.reduce(
                        (s, r) => s + r.amount,
                        0,
                      );
                      const hasRefunds = invoice.refunds.length > 0;
                      return (
                        <tr
                          key={invoice.id}
                          className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                          <td className="px-4 py-3 font-mono text-slate-900 dark:text-white">
                            {invoice.id}
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-slate-900 dark:text-white">
                              {invoice.patientName}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              {invoice.patientId}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-900 dark:text-white">
                            {formatCurrency(invoice.total)}
                          </td>
                          <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-medium">
                            {formatCurrency(invoice.paidAmount)}
                          </td>
                          <td className="px-4 py-3 text-rose-600 dark:text-rose-400 font-medium">
                            {formatCurrency(refundedAmount)}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`font-medium ${invoice.balance > 0 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"}`}
                            >
                              {formatCurrency(invoice.balance)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                invoice.status === "paid"
                                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                                  : invoice.status === "pending"
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                    : invoice.status === "overdue"
                                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                      : invoice.status === "partial"
                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                        : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400"
                              }`}
                            >
                              {invoice.status.replace("-", " ")}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {invoice.balance > 0 &&
                                invoice.paidAmount > 0 && (
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleRefund(invoice)}
                                  >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                    Refund
                                  </Button>
                                )}
                              {hasRefunds && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    /* view refunds */
                                  }}
                                >
                                  <svg
                                    className="h-3.5 w-3.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  </svg>
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Empty State */}
          {invoices.length === 0 && (
            <motion.div
              variants={staggerItem}
              className="dash-card p-12 text-center"
            >
              <div className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600">
                <RotateCcw className="h-full w-full" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                No invoices found
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Try adjusting your filters or search criteria.
              </p>
            </motion.div>
          )}
        </div>

        {/* Modals */}
        <RefundDialog
          invoice={selectedInvoice}
          open={refundDialogOpen}
          onClose={handleRefundClose}
          onSuccess={handleRefundSuccess}
        />
      </motion.div>
    </DashboardContainer>
  );
}
