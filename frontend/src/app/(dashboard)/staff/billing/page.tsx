"use client";

import { Button } from "@/app/components/dashboard/Button";
import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { Download, Filter, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  BillingStats,
  defaultFilterValues,
  FilterBar,
  InvoiceForm,
  InvoiceTable,
  PaymentDialog,
  ReceiptPreview,
  RefundDialog,
  RevenueSidebar,
} from "./_components";
import {
  invoices as allInvoices,
  formatCurrency,
  type Invoice,
} from "./_mock-data";

/* ══════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════ */

export default function BillingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(defaultFilterValues);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Modals
  const [invoiceFormOpen, setInvoiceFormOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);

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
    const totalRevenue = allInvoices.reduce((s, i) => s + i.paidAmount, 0);
    const pendingAmt = allInvoices.reduce((s, i) => s + i.balance, 0);
    const paidCount = allInvoices.filter((i) => i.status === "paid").length;
    const refundAmt = allInvoices.reduce(
      (s, i) => s + i.refunds.reduce((rs, r) => rs + r.amount, 0),
      0,
    );
    const insuranceCount = allInvoices.filter((i) => i.insurance > 0).length;
    const outstanding = allInvoices
      .filter((i) => i.status === "overdue" || i.status === "pending")
      .reduce((s, i) => s + i.balance, 0);

    return {
      totalRevenue,
      pendingAmt,
      paidCount,
      refundAmt,
      insuranceCount,
      outstanding,
    };
  }, []);

  /* ── Handlers ── */
  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setReceiptOpen(true);
  };

  const handlePrintInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setReceiptOpen(true);
  };

  const handleCollectPayment = (invoice?: Invoice) => {
    setSelectedInvoice(invoice ?? null);
    setPaymentDialogOpen(true);
  };

  const handleRefund = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setRefundDialogOpen(true);
  };

  const handlePaymentComplete = (invoiceId: string, amount: number) => {
    setPaymentDialogOpen(false);
    setSelectedInvoice(null);
  };

  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== "" && v !== "newest",
  );

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex gap-6"
    >
      {/* Main content */}
      <div className="min-w-0 flex-1 space-y-6">
        {/* Header */}
        <motion.div variants={staggerItem} initial="hidden" animate="visible">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Billing &amp; Payments
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Manage invoices and patient payments.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setInvoiceFormOpen(true)}
                >
                  <Plus className="mr-1.5 h-4 w-4" />
                  New Invoice
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => handleCollectPayment()}
                >
                  <Plus className="mr-1.5 h-4 w-4" />
                  Collect Payment
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="outline" size="md">
                  <Download className="mr-1.5 h-4 w-4" />
                  Export
                </Button>
              </motion.div>
              {/* Sidebar toggle - mobile */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
              >
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>
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
            Total:{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {formatCurrency(invoices.reduce((s, i) => s + i.total, 0))}
            </span>
          </p>
        </motion.div>

        {/* Table */}
        <motion.div variants={staggerItem} initial="hidden" animate="visible">
          <InvoiceTable
            invoices={invoices}
            onViewInvoice={handleViewInvoice}
            onPrintInvoice={handlePrintInvoice}
            onCollectPayment={handleCollectPayment}
            onRefund={handleRefund}
          />
        </motion.div>
      </div>

      {/* Revenue Sidebar */}
      <div className="hidden lg:block">
        <RevenueSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Mobile Revenue Sidebar */}
      <div className="lg:hidden">
        <RevenueSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* ── Modals ── */}
      <InvoiceForm
        open={invoiceFormOpen}
        onClose={() => setInvoiceFormOpen(false)}
      />

      <PaymentDialog
        invoice={selectedInvoice}
        open={paymentDialogOpen}
        onClose={() => {
          setPaymentDialogOpen(false);
          setSelectedInvoice(null);
        }}
        onPaymentComplete={handlePaymentComplete}
      />

      <ReceiptPreview
        invoice={selectedInvoice}
        open={receiptOpen}
        onClose={() => {
          setReceiptOpen(false);
          setSelectedInvoice(null);
        }}
      />

      <RefundDialog
        invoice={selectedInvoice}
        open={refundDialogOpen}
        onClose={() => {
          setRefundDialogOpen(false);
          setSelectedInvoice(null);
        }}
      />
    </motion.div>
  );
}
