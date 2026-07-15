"use client";

import { Button } from "@/app/components/dashboard/Button";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  IdCard,
  Mail,
  Phone,
  Search,
  User,
  UserPlus,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { searchPatients, type Patient } from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface PatientSearchProps {
  onPatientFound: (patient: Patient) => void;
  onRegisterNew: () => void;
}

/* ─── Search By selector ────────────────────── */

const searchMethods: {
  value: "id" | "phone" | "email" | "nationalId";
  label: string;
  icon: ReactNode;
  placeholder: string;
}[] = [
  {
    value: "id",
    label: "Patient ID",
    icon: <IdCard className="h-3.5 w-3.5" />,
    placeholder: "e.g. P-1001",
  },
  {
    value: "phone",
    label: "Phone",
    icon: <Phone className="h-3.5 w-3.5" />,
    placeholder: "e.g. +1 (555) 111-2233",
  },
  {
    value: "email",
    label: "Email",
    icon: <Mail className="h-3.5 w-3.5" />,
    placeholder: "e.g. patient@email.com",
  },
  {
    value: "nationalId",
    label: "National ID",
    icon: <IdCard className="h-3.5 w-3.5" />,
    placeholder: "e.g. XXX-XX-1234",
  },
];

/* ─── Patient Summary Card ──────────────────── */

function PatientSummaryCard({
  patient,
  onProceed,
  onDismiss,
}: {
  patient: Patient;
  onProceed: () => void;
  onDismiss: () => void;
}) {
  return (
    <motion.div
      variants={staggerItem}
      className="overflow-hidden rounded-xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/[0.03] dark:border-[var(--color-primary)]/30 dark:bg-[var(--color-primary)]/[0.05]"
    >
      <div className="flex items-center justify-between border-b border-[var(--color-primary)]/10 px-4 py-3 dark:border-[var(--color-primary)]/20">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-sm font-semibold text-[var(--color-primary)] dark:bg-[var(--color-primary)]/20">
            {patient.firstName[0]}
            {patient.lastName[0]}
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {patient.firstName} {patient.lastName}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {patient.id}
            </p>
          </div>
          {patient.isVIP && (
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
              VIP
            </span>
          )}
        </div>
        <button
          onClick={onDismiss}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-2 px-4 py-3 text-xs sm:grid-cols-3">
        <div>
          <span className="text-slate-400">DOB</span>
          <p className="font-medium text-slate-700 dark:text-slate-300">
            {patient.dateOfBirth}
          </p>
        </div>
        <div>
          <span className="text-slate-400">Gender</span>
          <p className="font-medium capitalize text-slate-700 dark:text-slate-300">
            {patient.gender}
          </p>
        </div>
        <div>
          <span className="text-slate-400">Blood</span>
          <p className="font-medium text-slate-700 dark:text-slate-300">
            {patient.bloodGroup}
          </p>
        </div>
        <div>
          <span className="text-slate-400">Phone</span>
          <p className="font-medium text-slate-700 dark:text-slate-300">
            {patient.phone}
          </p>
        </div>
        <div className="col-span-2">
          <span className="text-slate-400">Primary Physician</span>
          <p className="font-medium text-slate-700 dark:text-slate-300">
            {patient.primaryPhysician}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-[var(--color-primary)]/10 px-4 py-3 dark:border-[var(--color-primary)]/20">
        <Button variant="primary" size="sm" onClick={onProceed}>
          <ChevronRight className="h-4 w-4" />
          Proceed to Check-in
        </Button>
        <Button variant="ghost" size="sm" onClick={onDismiss}>
          Start Fresh
        </Button>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────── */

export function PatientSearch({
  onPatientFound,
  onRegisterNew,
}: PatientSearchProps) {
  const [searchBy, setSearchBy] = useState<
    "id" | "phone" | "email" | "nationalId"
  >("phone");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searched, setSearched] = useState(false);

  const currentMethod = searchMethods.find((m) => m.value === searchBy)!;

  const handleSearch = () => {
    if (!query.trim()) return;
    const found = searchPatients(query, searchBy);
    setResults(found);
    setSelectedPatient(null);
    setSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleProceed = () => {
    if (selectedPatient) {
      onPatientFound(selectedPatient);
    }
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Search method pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          Search by:
        </span>
        {searchMethods.map((method) => {
          const isActive = searchBy === method.value;
          return (
            <button
              key={method.value}
              type="button"
              onClick={() => {
                setSearchBy(method.value);
                setQuery("");
                setResults([]);
                setSelectedPatient(null);
                setSearched(false);
              }}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                isActive
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              }`}
            >
              {method.icon}
              {method.label}
            </button>
          );
        })}
      </div>

      {/* Search input */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={currentMethod.placeholder}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 transition-all hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
          />
        </div>
        <Button variant="primary" size="md" onClick={handleSearch}>
          <Search className="h-4 w-4" />
          Search
        </Button>
        <Button variant="outline" size="md" onClick={onRegisterNew}>
          <UserPlus className="h-4 w-4" />
          New Patient
        </Button>
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {searched && results.length === 0 && !selectedPatient && (
          <motion.div
            key="no-results"
            variants={staggerItem}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -8 }}
            className="rounded-xl border border-slate-200 bg-white/50 p-8 text-center dark:border-slate-700 dark:bg-slate-800/30"
          >
            <User className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-600" />
            <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
              No patient found
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Try a different search method or register a new patient.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <Button variant="primary" size="sm" onClick={onRegisterNew}>
                <UserPlus className="h-4 w-4" />
                Register New Patient
              </Button>
            </div>
          </motion.div>
        )}

        {results.length > 0 && !selectedPatient && (
          <motion.div
            key="results"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-2"
          >
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Found {results.length} patient{results.length > 1 ? "s" : ""}
            </p>
            {results.map((patient) => (
              <motion.button
                key={patient.id}
                variants={staggerItem}
                type="button"
                onClick={() => setSelectedPatient(patient)}
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-left transition-all hover:border-[var(--color-primary)]/30 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-[var(--color-primary)]/40"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-sm font-semibold text-[var(--color-primary)] dark:bg-[var(--color-primary)]/20">
                    {patient.firstName[0]}
                    {patient.lastName[0]}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {patient.firstName} {patient.lastName}
                      </p>
                      {patient.isVIP && (
                        <span className="rounded-full bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                          VIP
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">
                      {patient.id} · {patient.phone}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-300 dark:text-slate-600" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {selectedPatient && (
          <PatientSummaryCard
            patient={selectedPatient}
            onProceed={handleProceed}
            onDismiss={() => {
              setSelectedPatient(null);
              setResults([]);
              setQuery("");
              setSearched(false);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
