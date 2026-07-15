"use client";

import { Button } from "@/app/components/dashboard/Button";
import {
  fadeInBackdrop,
  scaleUp,
} from "@/components/dashboard/staff/MotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Minus,
  Plus,
  Search,
  Stethoscope,
  Syringe,
  TestTube,
  X,
} from "lucide-react";
import { useState } from "react";
import { formatCurrency, type Invoice } from "../_mock-data";

/* ─── Types ─────────────────────────────────── */

interface InvoiceFormProps {
  open: boolean;
  onClose: () => void;
  onCreated?: (invoice: Invoice) => void;
}

interface LineItem {
  id: string;
  type: "service" | "medicine" | "lab-test";
  description: string;
  quantity: number;
  rate: number;
}

const emptyItem = (type: LineItem["type"]): LineItem => ({
  id: crypto.randomUUID(),
  type,
  description: "",
  quantity: 1,
  rate: 0,
});

/* ─── Patient search mock ───────────────────── */

const mockPatients = [
  { id: "P-1001", name: "Emily Johnson" },
  { id: "P-1002", name: "Noah Martinez" },
  { id: "P-1003", name: "Sarah Williams" },
  { id: "P-1004", name: "William Davis" },
  { id: "P-1005", name: "Michael Brown" },
  { id: "P-1006", name: "Olivia Martinez" },
  { id: "P-1007", name: "Ethan Walker" },
  { id: "P-1008", name: "David Kim" },
  { id: "P-1009", name: "Sophia Lee" },
  { id: "P-1010", name: "James Wilson" },
];

const mockAppointments = [
  { id: "APT-001", label: "General Checkup - 10:30 AM" },
  { id: "APT-002", label: "Cardiology Follow-up - 2:00 PM" },
  { id: "APT-003", label: "Dermatology Consult - 11:15 AM" },
];

/* ══════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════ */

export function InvoiceForm({ open, onClose, onCreated }: InvoiceFormProps) {
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [selectedAppointment, setSelectedAppointment] = useState<string>("");
  const [services, setServices] = useState<LineItem[]>([
    { ...emptyItem("service"), description: "", quantity: 1, rate: 0 },
  ]);
  const [medicines, setMedicines] = useState<LineItem[]>([]);
  const [labTests, setLabTests] = useState<LineItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [discountLabel, setDiscountLabel] = useState("");
  const [taxRate, setTaxRate] = useState(8);
  const [insurance, setInsurance] = useState(0);
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [notes, setNotes] = useState("");
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);

  /* ── Calculations ── */
  const allItems = [...services, ...medicines, ...labTests].filter(
    (i) => i.description && i.rate > 0,
  );
  const subtotal = allItems.reduce((sum, i) => sum + i.quantity * i.rate, 0);
  const tax = subtotal > 0 ? (subtotal - discount) * (taxRate / 100) : 0;
  const total = Math.max(0, subtotal - discount + tax - insurance);

  /* ── Filtered patients ── */
  const filteredPatients = mockPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
      p.id.toLowerCase().includes(patientSearch.toLowerCase()),
  );

  /* ── Handlers ── */
  const handleSubmit = () => {
    // Mock create
    onClose();
  };

  const addItem = (
    list: LineItem[],
    setter: (items: LineItem[]) => void,
    type: LineItem["type"],
  ) => {
    setter([...list, emptyItem(type)]);
  };

  const updateItem = (
    list: LineItem[],
    setter: (items: LineItem[]) => void,
    id: string,
    field: keyof LineItem,
    value: string | number,
  ) => {
    setter(
      list.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const removeItem = (
    list: LineItem[],
    setter: (items: LineItem[]) => void,
    id: string,
  ) => {
    setter(list.filter((item) => item.id !== id));
  };

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
            <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-700">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    New Invoice
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Create a new invoice for a patient
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-6 px-6 py-5">
                {/* Patient Selection */}
                <div className="relative">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Patient
                  </label>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search patient by name or ID..."
                      value={patientSearch}
                      onChange={(e) => {
                        setPatientSearch(e.target.value);
                        setShowPatientDropdown(true);
                      }}
                      onFocus={() => setShowPatientDropdown(true)}
                      className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-700 placeholder-slate-400 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
                    />
                  </div>
                  {showPatientDropdown && patientSearch && (
                    <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
                      {filteredPatients.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setSelectedPatient(`${p.name} (${p.id})`);
                            setPatientSearch(`${p.name} (${p.id})`);
                            setShowPatientDropdown(false);
                          }}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                            {p.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="font-medium">{p.name}</p>
                            <p className="text-xs text-slate-400">{p.id}</p>
                          </div>
                        </button>
                      ))}
                      {filteredPatients.length === 0 && (
                        <p className="px-4 py-3 text-sm text-slate-400">
                          No patients found
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Appointment */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Appointment (optional)
                  </label>
                  <div className="relative">
                    <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <select
                      value={selectedAppointment}
                      onChange={(e) => setSelectedAppointment(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-8 text-sm text-slate-700 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      <option value="">Select appointment</option>
                      {mockAppointments.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Services */}
                <SectionCard
                  title="Services"
                  icon={Stethoscope}
                  onAdd={() => addItem(services, setServices, "service")}
                >
                  {services.map((item) => (
                    <LineItemRow
                      key={item.id}
                      item={item}
                      onChange={(field, value) =>
                        updateItem(services, setServices, item.id, field, value)
                      }
                      onRemove={() =>
                        removeItem(services, setServices, item.id)
                      }
                    />
                  ))}
                </SectionCard>

                {/* Medicines */}
                <SectionCard
                  title="Medicines"
                  icon={Syringe}
                  onAdd={() => addItem(medicines, setMedicines, "medicine")}
                >
                  {medicines.map((item) => (
                    <LineItemRow
                      key={item.id}
                      item={item}
                      onChange={(field, value) =>
                        updateItem(
                          medicines,
                          setMedicines,
                          item.id,
                          field,
                          value,
                        )
                      }
                      onRemove={() =>
                        removeItem(medicines, setMedicines, item.id)
                      }
                    />
                  ))}
                  {medicines.length === 0 && (
                    <p className="py-2 text-sm text-slate-400">
                      No medicines added yet
                    </p>
                  )}
                </SectionCard>

                {/* Lab Tests */}
                <SectionCard
                  title="Lab Tests"
                  icon={TestTube}
                  onAdd={() => addItem(labTests, setLabTests, "lab-test")}
                >
                  {labTests.map((item) => (
                    <LineItemRow
                      key={item.id}
                      item={item}
                      onChange={(field, value) =>
                        updateItem(labTests, setLabTests, item.id, field, value)
                      }
                      onRemove={() =>
                        removeItem(labTests, setLabTests, item.id)
                      }
                    />
                  ))}
                  {labTests.length === 0 && (
                    <p className="py-2 text-sm text-slate-400">
                      No lab tests added yet
                    </p>
                  )}
                </SectionCard>

                {/* Discount & Tax & Insurance */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Discount ($)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={discount || ""}
                      onChange={(e) => setDiscount(Number(e.target.value))}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    />
                    <input
                      type="text"
                      placeholder="Discount label"
                      value={discountLabel}
                      onChange={(e) => setDiscountLabel(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500 transition-colors focus:border-[var(--color-primary)] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={taxRate}
                      onChange={(e) => setTaxRate(Number(e.target.value))}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Insurance ($)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={insurance || ""}
                      onChange={(e) => setInsurance(Number(e.target.value))}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    />
                    <input
                      type="text"
                      placeholder="Provider name"
                      value={insuranceProvider}
                      onChange={(e) => setInsuranceProvider(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500 transition-colors focus:border-[var(--color-primary)] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Notes
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Additional notes for this invoice..."
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
                  />
                </div>

                {/* Summary */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-700 dark:bg-slate-800/30">
                  <h4 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Payment Summary
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                        <span>
                          Discount {discountLabel && `(${discountLabel})`}
                        </span>
                        <span>-{formatCurrency(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Tax ({taxRate}%)</span>
                      <span>{formatCurrency(tax)}</span>
                    </div>
                    {insurance > 0 && (
                      <div className="flex justify-between text-blue-600 dark:text-blue-400">
                        <span>
                          Insurance{" "}
                          {insuranceProvider && `(${insuranceProvider})`}
                        </span>
                        <span>-{formatCurrency(insurance)}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900 dark:border-slate-700 dark:text-white">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4 dark:border-slate-700">
                <Button variant="outline" size="md" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" onClick={handleSubmit}>
                  Create Invoice
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Sub-components ────────────────────────── */

function SectionCard({
  title,
  icon: Icon,
  children,
  onAdd,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
  onAdd: () => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {title}
          </span>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-1 text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function LineItemRow({
  item,
  onChange,
  onRemove,
}: {
  item: LineItem;
  onChange: (field: keyof LineItem, value: string | number) => void;
  onRemove: () => void;
}) {
  const amount = item.quantity * item.rate;

  return (
    <div className="flex items-start gap-2 rounded-lg border border-slate-100 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex-1 space-y-2">
        <input
          type="text"
          placeholder="Description"
          value={item.description}
          onChange={(e) => onChange("description", e.target.value)}
          className="w-full rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 transition-colors focus:border-[var(--color-primary)] focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
        />
        <div className="flex items-center gap-2">
          <div>
            <label className="text-xs text-slate-400">Qty</label>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) =>
                onChange("quantity", Math.max(1, Number(e.target.value)))
              }
              className="w-16 rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 focus:border-[var(--color-primary)] focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400">Rate</label>
            <input
              type="number"
              min={0}
              value={item.rate || ""}
              onChange={(e) => onChange("rate", Number(e.target.value))}
              className="w-24 rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 focus:border-[var(--color-primary)] focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
            />
          </div>
          <div className="mt-4 flex-1 text-right text-sm font-medium text-slate-900 dark:text-white">
            {formatCurrency(amount)}
          </div>
        </div>
      </div>
      <button
        onClick={onRemove}
        className="mt-1 rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
      >
        <Minus className="h-4 w-4" />
      </button>
    </div>
  );
}
