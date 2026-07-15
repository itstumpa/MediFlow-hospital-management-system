import {
  ArrowLeftRight,
  Banknote,
  CircleDollarSign,
  type LucideIcon,
  Receipt,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

/* ══════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════ */

export type InvoiceStatus =
  | "paid"
  | "pending"
  | "overdue"
  | "partial"
  | "cancelled"
  | "refunded";

export type PaymentMethod =
  | "cash"
  | "card"
  | "bank-transfer"
  | "mobile-banking"
  | "insurance";

export type PaymentStatus = "completed" | "pending" | "failed";

export type RefundStatus = "pending" | "approved" | "completed" | "rejected";

export type InvoiceItemType = "service" | "medicine" | "lab-test";

export interface InvoiceItem {
  id: string;
  type: InvoiceItemType;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  date: string;
  time: string;
  reference: string;
  transactionId?: string;
  notes?: string;
}

export interface Refund {
  id: string;
  invoiceId: string;
  patientName: string;
  amount: number;
  reason: string;
  status: RefundStatus;
  date: string;
  processedBy: string;
}

export interface InsuranceClaim {
  provider: string;
  policyNumber: string;
  coverage: number;
  status: "pending" | "approved" | "denied" | "paid";
  amountClaimed: number;
  amountApproved: number;
}

export interface Invoice {
  id: string;
  patientName: string;
  patientId: string;
  patientInitials: string;
  doctorName: string;
  doctorId: string;
  department: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  discountLabel: string;
  tax: number;
  taxLabel: string;
  insurance: number;
  insuranceProvider: string;
  total: number;
  paidAmount: number;
  balance: number;
  status: InvoiceStatus;
  paymentMethod: PaymentMethod | "split";
  dueDate: string;
  createdDate: string;
  createdTime: string;
  notes: string;
  payments: Payment[];
  refunds: Refund[];
  insuranceClaim: InsuranceClaim | null;
  isOverdue: boolean;
}

export interface BillingStat {
  id: string;
  label: string;
  value: number;
  change: number;
  changeLabel: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  color: string;
  prefix?: string;
  isCurrency?: boolean;
}

/* ══════════════════════════════════════════════
   Config Maps
   ══════════════════════════════════════════════ */

export const statusConfig: Record<
  InvoiceStatus,
  { label: string; class: string; dot: string }
> = {
  paid: {
    label: "Paid",
    class:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  pending: {
    label: "Pending",
    class:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  overdue: {
    label: "Overdue",
    class: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    dot: "bg-red-500",
  },
  partial: {
    label: "Partial",
    class: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  cancelled: {
    label: "Cancelled",
    class: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    dot: "bg-slate-400",
  },
  refunded: {
    label: "Refunded",
    class:
      "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400",
    dot: "bg-violet-500",
  },
};

export const methodConfig: Record<
  PaymentMethod,
  { label: string; icon: string; class: string }
> = {
  cash: {
    label: "Cash",
    icon: "Banknote",
    class:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  card: {
    label: "Card",
    icon: "CreditCard",
    class: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  },
  "bank-transfer": {
    label: "Bank Transfer",
    icon: "Building2",
    class:
      "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
  },
  "mobile-banking": {
    label: "Mobile Banking",
    icon: "Smartphone",
    class:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  },
  insurance: {
    label: "Insurance",
    icon: "ShieldCheck",
    class: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400",
  },
};

export const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "amount-high", label: "Amount ↓" },
  { value: "amount-low", label: "Amount ↑" },
  { value: "due-date", label: "Due Date" },
  { value: "patient-az", label: "Patient A-Z" },
];

export const filterStatusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "overdue", label: "Overdue" },
  { value: "partial", label: "Partial" },
  { value: "cancelled", label: "Cancelled" },
  { value: "refunded", label: "Refunded" },
];

export const filterMethodOptions = [
  { value: "all", label: "All Methods" },
  { value: "cash", label: "Cash" },
  { value: "card", label: "Card" },
  { value: "bank-transfer", label: "Bank Transfer" },
  { value: "mobile-banking", label: "Mobile Banking" },
  { value: "insurance", label: "Insurance" },
];

export const filterDoctorOptions = [
  { value: "all", label: "All Doctors" },
  { value: "Dr. Sarah Chen", label: "Dr. Sarah Chen" },
  { value: "Dr. James Wilson", label: "Dr. James Wilson" },
  { value: "Dr. Emily Martinez", label: "Dr. Emily Martinez" },
  { value: "Dr. Robert Kim", label: "Dr. Robert Kim" },
  { value: "Dr. David Park", label: "Dr. David Park" },
  { value: "Dr. Lisa Anderson", label: "Dr. Lisa Anderson" },
  { value: "Dr. Michael Torres", label: "Dr. Michael Torres" },
];

export const filterInsuranceOptions = [
  { value: "all", label: "All Insurance" },
  { value: "Aetna", label: "Aetna" },
  { value: "Blue Cross", label: "Blue Cross" },
  { value: "Cigna", label: "Cigna" },
  { value: "UnitedHealth", label: "UnitedHealth" },
  { value: "Humana", label: "Humana" },
  { value: "None", label: "No Insurance" },
];

/* ══════════════════════════════════════════════
   Helpers
   ══════════════════════════════════════════════ */

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

/* ══════════════════════════════════════════════
   Statistics Data
   ══════════════════════════════════════════════ */

export const billingStats: BillingStat[] = [
  {
    id: "today-revenue",
    label: "Today's Revenue",
    value: 28450,
    change: 18.3,
    changeLabel: "vs yesterday",
    trend: "up",
    icon: CircleDollarSign,
    color: "emerald",
    isCurrency: true,
  },
  {
    id: "pending-payments",
    label: "Pending Payments",
    value: 12380,
    change: -5.2,
    changeLabel: "vs last week",
    trend: "down",
    icon: Banknote,
    color: "amber",
    isCurrency: true,
  },
  {
    id: "paid-invoices",
    label: "Paid Invoices",
    value: 184,
    change: 22.1,
    changeLabel: "vs last month",
    trend: "up",
    icon: Receipt,
    color: "blue",
  },
  {
    id: "refunds",
    label: "Refunds",
    value: 3260,
    change: 8.7,
    changeLabel: "vs last month",
    trend: "up",
    icon: RotateCcw,
    color: "rose",
    isCurrency: true,
  },
  {
    id: "insurance-claims",
    label: "Insurance Claims",
    value: 42,
    change: 14.3,
    changeLabel: "vs last month",
    trend: "up",
    icon: ShieldCheck,
    color: "violet",
  },
  {
    id: "outstanding",
    label: "Outstanding Balance",
    value: 84200,
    change: 3.1,
    changeLabel: "vs last month",
    trend: "up",
    icon: ArrowLeftRight,
    color: "cyan",
    isCurrency: true,
  },
];

/* ══════════════════════════════════════════════
   Invoice Items — reusable blocks
   ══════════════════════════════════════════════ */

const serviceItems: Record<string, InvoiceItem[]> = {
  checkup: [
    {
      id: "item-01",
      type: "service",
      description: "General Consultation",
      quantity: 1,
      rate: 150,
      amount: 150,
    },
    {
      id: "item-02",
      type: "service",
      description: "Annual Physical Examination",
      quantity: 1,
      rate: 200,
      amount: 200,
    },
  ],
  followup: [
    {
      id: "item-03",
      type: "service",
      description: "Follow-up Consultation",
      quantity: 1,
      rate: 100,
      amount: 100,
    },
  ],
  cardiology: [
    {
      id: "item-04",
      type: "service",
      description: "Cardiology Consultation",
      quantity: 1,
      rate: 300,
      amount: 300,
    },
    {
      id: "item-05",
      type: "service",
      description: "ECG Test",
      quantity: 1,
      rate: 150,
      amount: 150,
    },
  ],
  dermatology: [
    {
      id: "item-06",
      type: "service",
      description: "Dermatology Consultation",
      quantity: 1,
      rate: 250,
      amount: 250,
    },
    {
      id: "item-07",
      type: "service",
      description: "Skin Biopsy",
      quantity: 1,
      rate: 180,
      amount: 180,
    },
  ],
  surgery: [
    {
      id: "item-08",
      type: "service",
      description: "Minor Surgical Procedure",
      quantity: 1,
      rate: 800,
      amount: 800,
    },
    {
      id: "item-09",
      type: "service",
      description: "Anesthesia",
      quantity: 1,
      rate: 400,
      amount: 400,
    },
    {
      id: "item-10",
      type: "service",
      description: "Operation Theatre Fee",
      quantity: 1,
      rate: 500,
      amount: 500,
    },
  ],
  maternity: [
    {
      id: "item-11",
      type: "service",
      description: "Prenatal Consultation",
      quantity: 1,
      rate: 200,
      amount: 200,
    },
    {
      id: "item-12",
      type: "service",
      description: "Ultrasound Scan",
      quantity: 1,
      rate: 300,
      amount: 300,
    },
  ],
};

const medicineItems: InvoiceItem[][] = [
  [
    {
      id: "med-01",
      type: "medicine",
      description: "Amoxicillin 500mg",
      quantity: 30,
      rate: 2.5,
      amount: 75,
    },
    {
      id: "med-02",
      type: "medicine",
      description: "Ibuprofen 400mg",
      quantity: 20,
      rate: 1.75,
      amount: 35,
    },
  ],
  [
    {
      id: "med-03",
      type: "medicine",
      description: "Atorvastatin 20mg",
      quantity: 30,
      rate: 3.0,
      amount: 90,
    },
  ],
  [
    {
      id: "med-04",
      type: "medicine",
      description: "Omeprazole 20mg",
      quantity: 14,
      rate: 2.25,
      amount: 31.5,
    },
    {
      id: "med-05",
      type: "medicine",
      description: "Paracetamol 500mg",
      quantity: 20,
      rate: 1.5,
      amount: 30,
    },
  ],
  [
    {
      id: "med-06",
      type: "medicine",
      description: "Metformin 850mg",
      quantity: 60,
      rate: 1.8,
      amount: 108,
    },
  ],
  [
    {
      id: "med-07",
      type: "medicine",
      description: "Lisinopril 10mg",
      quantity: 30,
      rate: 2.75,
      amount: 82.5,
    },
  ],
  [],
];

const labItems: InvoiceItem[][] = [
  [
    {
      id: "lab-01",
      type: "lab-test",
      description: "Complete Blood Count",
      quantity: 1,
      rate: 80,
      amount: 80,
    },
    {
      id: "lab-02",
      type: "lab-test",
      description: "Lipid Profile",
      quantity: 1,
      rate: 120,
      amount: 120,
    },
  ],
  [
    {
      id: "lab-03",
      type: "lab-test",
      description: "Blood Glucose Test",
      quantity: 1,
      rate: 40,
      amount: 40,
    },
  ],
  [
    {
      id: "lab-04",
      type: "lab-test",
      description: "Thyroid Function Test",
      quantity: 1,
      rate: 150,
      amount: 150,
    },
    {
      id: "lab-05",
      type: "lab-test",
      description: "Vitamin D Test",
      quantity: 1,
      rate: 100,
      amount: 100,
    },
  ],
  [
    {
      id: "lab-06",
      type: "lab-test",
      description: "Urinalysis",
      quantity: 1,
      rate: 50,
      amount: 50,
    },
  ],
  [
    {
      id: "lab-07",
      type: "lab-test",
      description: "MRI Scan - Lower Back",
      quantity: 1,
      rate: 1200,
      amount: 1200,
    },
  ],
  [],
];

/* ══════════════════════════════════════════════
   Invoices Data (25 invoices)
   ══════════════════════════════════════════════ */

export const invoices: Invoice[] = [
  {
    id: "INV-2026-001",
    patientName: "Emily Johnson",
    patientId: "P-1001",
    patientInitials: getInitials("Emily Johnson"),
    doctorName: "Dr. Sarah Chen",
    doctorId: "D-001",
    department: "General Medicine",
    items: [...serviceItems.checkup, ...medicineItems[0], ...labItems[0]],
    subtotal: 660,
    discount: 50,
    discountLabel: "Loyalty Discount",
    tax: 61,
    taxLabel: "8% Tax",
    insurance: 200,
    insuranceProvider: "Aetna",
    total: 471,
    paidAmount: 471,
    balance: 0,
    status: "paid",
    paymentMethod: "card",
    dueDate: "2026-07-28",
    createdDate: "2026-07-14",
    createdTime: "09:15 AM",
    notes: "Annual checkup - all tests completed",
    payments: [
      {
        id: "pay-001",
        invoiceId: "INV-2026-001",
        amount: 471,
        method: "card",
        status: "completed",
        date: "2026-07-14",
        time: "09:20 AM",
        reference: "TXN-001",
      },
    ],
    refunds: [],
    insuranceClaim: {
      provider: "Aetna",
      policyNumber: "AET-12345",
      coverage: 200,
      status: "paid",
      amountClaimed: 200,
      amountApproved: 200,
    },
    isOverdue: false,
  },
  {
    id: "INV-2026-002",
    patientName: "William Davis",
    patientId: "P-1004",
    patientInitials: getInitials("William Davis"),
    doctorName: "Dr. Sarah Chen",
    doctorId: "D-001",
    department: "General Medicine",
    items: [...serviceItems.followup, ...medicineItems[2]],
    subtotal: 161.5,
    discount: 0,
    discountLabel: "",
    tax: 12.92,
    taxLabel: "8% Tax",
    insurance: 0,
    insuranceProvider: "",
    total: 174.42,
    paidAmount: 174.42,
    balance: 0,
    status: "paid",
    paymentMethod: "cash",
    dueDate: "2026-07-20",
    createdDate: "2026-07-13",
    createdTime: "11:30 AM",
    notes: "Follow-up after blood work",
    payments: [
      {
        id: "pay-002",
        invoiceId: "INV-2026-002",
        amount: 174.42,
        method: "cash",
        status: "completed",
        date: "2026-07-13",
        time: "11:35 AM",
        reference: "TXN-002",
      },
    ],
    refunds: [],
    insuranceClaim: null,
    isOverdue: false,
  },
  {
    id: "INV-2026-003",
    patientName: "Sarah Williams",
    patientId: "P-1003",
    patientInitials: getInitials("Sarah Williams"),
    doctorName: "Dr. James Wilson",
    doctorId: "D-002",
    department: "Cardiology",
    items: [...serviceItems.cardiology, ...labItems[2], ...medicineItems[1]],
    subtotal: 780,
    discount: 100,
    discountLabel: "Insurance Adjustment",
    tax: 54.4,
    taxLabel: "8% Tax",
    insurance: 350,
    insuranceProvider: "Blue Cross",
    total: 384.4,
    paidAmount: 384.4,
    balance: 0,
    status: "paid",
    paymentMethod: "insurance",
    dueDate: "2026-07-25",
    createdDate: "2026-07-12",
    createdTime: "14:00 PM",
    notes: "Cardiology workup completed",
    payments: [
      {
        id: "pay-003",
        invoiceId: "INV-2026-003",
        amount: 384.4,
        method: "insurance",
        status: "completed",
        date: "2026-07-12",
        time: "14:30 PM",
        reference: "TXN-003",
      },
    ],
    refunds: [],
    insuranceClaim: {
      provider: "Blue Cross",
      policyNumber: "BC-67890",
      coverage: 350,
      status: "paid",
      amountClaimed: 350,
      amountApproved: 350,
    },
    isOverdue: false,
  },
  {
    id: "INV-2026-004",
    patientName: "Michael Brown",
    patientId: "P-1005",
    patientInitials: getInitials("Michael Brown"),
    doctorName: "Dr. Sarah Chen",
    doctorId: "D-001",
    department: "General Medicine",
    items: [...serviceItems.checkup, ...labItems[5]],
    subtotal: 350,
    discount: 25,
    discountLabel: "New Patient Discount",
    tax: 26,
    taxLabel: "8% Tax",
    insurance: 0,
    insuranceProvider: "",
    total: 351,
    paidAmount: 200,
    balance: 151,
    status: "partial",
    paymentMethod: "card",
    dueDate: "2026-08-01",
    createdDate: "2026-07-11",
    createdTime: "10:00 AM",
    notes: "Patient requested installment payment",
    payments: [
      {
        id: "pay-004",
        invoiceId: "INV-2026-004",
        amount: 200,
        method: "card",
        status: "completed",
        date: "2026-07-11",
        time: "10:15 AM",
        reference: "TXN-004",
      },
    ],
    refunds: [],
    insuranceClaim: null,
    isOverdue: false,
  },
  {
    id: "INV-2026-005",
    patientName: "Olivia Martinez",
    patientId: "P-1006",
    patientInitials: getInitials("Olivia Martinez"),
    doctorName: "Dr. Emily Martinez",
    doctorId: "D-003",
    department: "Dermatology",
    items: [...serviceItems.dermatology, ...labItems[3]],
    subtotal: 480,
    discount: 0,
    discountLabel: "",
    tax: 38.4,
    taxLabel: "8% Tax",
    insurance: 200,
    insuranceProvider: "Cigna",
    total: 318.4,
    paidAmount: 0,
    balance: 318.4,
    status: "pending",
    paymentMethod: "insurance",
    dueDate: "2026-07-30",
    createdDate: "2026-07-10",
    createdTime: "16:45 PM",
    notes: "Awaiting insurance approval",
    payments: [],
    refunds: [],
    insuranceClaim: {
      provider: "Cigna",
      policyNumber: "CIG-54321",
      coverage: 200,
      status: "pending",
      amountClaimed: 200,
      amountApproved: 0,
    },
    isOverdue: false,
  },
  {
    id: "INV-2026-006",
    patientName: "Ethan Walker",
    patientId: "P-1007",
    patientInitials: getInitials("Ethan Walker"),
    doctorName: "Dr. Michael Torres",
    doctorId: "D-007",
    department: "Emergency",
    items: [...serviceItems.surgery, ...labItems[4], ...medicineItems[3]],
    subtotal: 3108,
    discount: 200,
    discountLabel: "Emergency Relief",
    tax: 232.64,
    taxLabel: "8% Tax",
    insurance: 1000,
    insuranceProvider: "UnitedHealth",
    total: 2140.64,
    paidAmount: 2140.64,
    balance: 0,
    status: "paid",
    paymentMethod: "mobile-banking",
    dueDate: "2026-07-15",
    createdDate: "2026-07-09",
    createdTime: "08:30 AM",
    notes: "Emergency appendectomy - fully paid",
    payments: [
      {
        id: "pay-005",
        invoiceId: "INV-2026-006",
        amount: 1140.64,
        method: "mobile-banking",
        status: "completed",
        date: "2026-07-09",
        time: "09:00 AM",
        reference: "TXN-005",
      },
      {
        id: "pay-006",
        invoiceId: "INV-2026-006",
        amount: 1000,
        method: "insurance",
        status: "completed",
        date: "2026-07-09",
        time: "09:05 AM",
        reference: "INS-001",
      },
    ],
    refunds: [],
    insuranceClaim: {
      provider: "UnitedHealth",
      policyNumber: "UH-98765",
      coverage: 1000,
      status: "paid",
      amountClaimed: 1000,
      amountApproved: 1000,
    },
    isOverdue: false,
  },
  {
    id: "INV-2026-007",
    patientName: "David Kim",
    patientId: "P-1008",
    patientInitials: getInitials("David Kim"),
    doctorName: "Dr. Robert Kim",
    doctorId: "D-004",
    department: "Orthopedics",
    items: [
      {
        id: "item-13",
        type: "service",
        description: "Orthopedic Consultation",
        quantity: 1,
        rate: 350,
        amount: 350,
      },
      {
        id: "item-14",
        type: "service",
        description: "X-Ray - Right Knee",
        quantity: 1,
        rate: 200,
        amount: 200,
      },
      ...medicineItems[4],
    ],
    subtotal: 632.5,
    discount: 0,
    discountLabel: "",
    tax: 50.6,
    taxLabel: "8% Tax",
    insurance: 0,
    insuranceProvider: "",
    total: 683.1,
    paidAmount: 0,
    balance: 683.1,
    status: "overdue",
    paymentMethod: "bank-transfer",
    dueDate: "2026-06-30",
    createdDate: "2026-06-28",
    createdTime: "13:00 PM",
    notes: "Overdue - sent 2 reminders",
    payments: [],
    refunds: [],
    insuranceClaim: null,
    isOverdue: true,
  },
  {
    id: "INV-2026-008",
    patientName: "Sophia Lee",
    patientId: "P-1009",
    patientInitials: getInitials("Sophia Lee"),
    doctorName: "Dr. Lisa Anderson",
    doctorId: "D-006",
    department: "Pediatrics",
    items: [
      {
        id: "item-15",
        type: "service",
        description: "Pediatric Consultation",
        quantity: 1,
        rate: 180,
        amount: 180,
      },
      {
        id: "item-16",
        type: "service",
        description: "Child Vaccination",
        quantity: 2,
        rate: 75,
        amount: 150,
      },
    ],
    subtotal: 330,
    discount: 0,
    discountLabel: "",
    tax: 26.4,
    taxLabel: "8% Tax",
    insurance: 150,
    insuranceProvider: "Humana",
    total: 206.4,
    paidAmount: 206.4,
    balance: 0,
    status: "paid",
    paymentMethod: "cash",
    dueDate: "2026-07-22",
    createdDate: "2026-07-08",
    createdTime: "10:30 AM",
    notes: "Routine vaccination",
    payments: [
      {
        id: "pay-007",
        invoiceId: "INV-2026-008",
        amount: 206.4,
        method: "cash",
        status: "completed",
        date: "2026-07-08",
        time: "10:45 AM",
        reference: "TXN-007",
      },
    ],
    refunds: [],
    insuranceClaim: {
      provider: "Humana",
      policyNumber: "HUM-24680",
      coverage: 150,
      status: "paid",
      amountClaimed: 150,
      amountApproved: 150,
    },
    isOverdue: false,
  },
  {
    id: "INV-2026-009",
    patientName: "James Wilson",
    patientId: "P-1010",
    patientInitials: getInitials("James Wilson"),
    doctorName: "Dr. David Park",
    doctorId: "D-005",
    department: "Neurology",
    items: [
      {
        id: "item-17",
        type: "service",
        description: "Neurology Consultation",
        quantity: 1,
        rate: 400,
        amount: 400,
      },
      {
        id: "lab-08",
        type: "lab-test",
        description: "EEG Test",
        quantity: 1,
        rate: 600,
        amount: 600,
      },
    ],
    subtotal: 1000,
    discount: 150,
    discountLabel: "Referral Discount",
    tax: 68,
    taxLabel: "8% Tax",
    insurance: 400,
    insuranceProvider: "Blue Cross",
    total: 518,
    paidAmount: 518,
    balance: 0,
    status: "paid",
    paymentMethod: "card",
    dueDate: "2026-07-26",
    createdDate: "2026-07-07",
    createdTime: "09:00 AM",
    notes: "Neurology workup completed",
    payments: [
      {
        id: "pay-008",
        invoiceId: "INV-2026-009",
        amount: 518,
        method: "card",
        status: "completed",
        date: "2026-07-07",
        time: "09:30 AM",
        reference: "TXN-008",
      },
    ],
    refunds: [],
    insuranceClaim: {
      provider: "Blue Cross",
      policyNumber: "BC-13579",
      coverage: 400,
      status: "paid",
      amountClaimed: 400,
      amountApproved: 400,
    },
    isOverdue: false,
  },
  {
    id: "INV-2026-010",
    patientName: "Amanda Taylor",
    patientId: "P-1011",
    patientInitials: getInitials("Amanda Taylor"),
    doctorName: "Dr. Sarah Chen",
    doctorId: "D-001",
    department: "General Medicine",
    items: [...serviceItems.checkup, ...labItems[1]],
    subtotal: 390,
    discount: 0,
    discountLabel: "",
    tax: 31.2,
    taxLabel: "8% Tax",
    insurance: 0,
    insuranceProvider: "",
    total: 421.2,
    paidAmount: 421.2,
    balance: 0,
    status: "paid",
    paymentMethod: "card",
    dueDate: "2026-07-19",
    createdDate: "2026-07-06",
    createdTime: "11:00 AM",
    notes: "",
    payments: [
      {
        id: "pay-009",
        invoiceId: "INV-2026-010",
        amount: 421.2,
        method: "card",
        status: "completed",
        date: "2026-07-06",
        time: "11:10 AM",
        reference: "TXN-009",
      },
    ],
    refunds: [],
    insuranceClaim: null,
    isOverdue: false,
  },
  {
    id: "INV-2026-011",
    patientName: "Robert Johnson",
    patientId: "P-1012",
    patientInitials: getInitials("Robert Johnson"),
    doctorName: "Dr. James Wilson",
    doctorId: "D-002",
    department: "Cardiology",
    items: [...serviceItems.cardiology, ...labItems[0], ...medicineItems[1]],
    subtotal: 960,
    discount: 80,
    discountLabel: "Senior Citizen Discount",
    tax: 70.4,
    taxLabel: "8% Tax",
    insurance: 300,
    insuranceProvider: "Aetna",
    total: 650.4,
    paidAmount: 650.4,
    balance: 0,
    status: "paid",
    paymentMethod: "split",
    dueDate: "2026-07-21",
    createdDate: "2026-07-05",
    createdTime: "08:45 AM",
    notes: "Cardiac evaluation - split payment",
    payments: [
      {
        id: "pay-010",
        invoiceId: "INV-2026-011",
        amount: 350.4,
        method: "card",
        status: "completed",
        date: "2026-07-05",
        time: "09:00 AM",
        reference: "TXN-010",
      },
      {
        id: "pay-011",
        invoiceId: "INV-2026-011",
        amount: 300,
        method: "insurance",
        status: "completed",
        date: "2026-07-05",
        time: "09:05 AM",
        reference: "INS-002",
      },
    ],
    refunds: [],
    insuranceClaim: {
      provider: "Aetna",
      policyNumber: "AET-11223",
      coverage: 300,
      status: "paid",
      amountClaimed: 300,
      amountApproved: 300,
    },
    isOverdue: false,
  },
  {
    id: "INV-2026-012",
    patientName: "Mia Garcia",
    patientId: "P-1013",
    patientInitials: getInitials("Mia Garcia"),
    doctorName: "Dr. Lisa Anderson",
    doctorId: "D-006",
    department: "Pediatrics",
    items: [...serviceItems.maternity, ...labItems[3]],
    subtotal: 550,
    discount: 0,
    discountLabel: "",
    tax: 44,
    taxLabel: "8% Tax",
    insurance: 250,
    insuranceProvider: "Cigna",
    total: 344,
    paidAmount: 100,
    balance: 244,
    status: "partial",
    paymentMethod: "cash",
    dueDate: "2026-08-05",
    createdDate: "2026-07-04",
    createdTime: "15:30 PM",
    notes: "Prenatal care - installment plan",
    payments: [
      {
        id: "pay-012",
        invoiceId: "INV-2026-012",
        amount: 100,
        method: "cash",
        status: "completed",
        date: "2026-07-04",
        time: "15:45 PM",
        reference: "TXN-012",
      },
    ],
    refunds: [],
    insuranceClaim: {
      provider: "Cigna",
      policyNumber: "CIG-99887",
      coverage: 250,
      status: "pending",
      amountClaimed: 250,
      amountApproved: 0,
    },
    isOverdue: false,
  },
  {
    id: "INV-2026-013",
    patientName: "Alexander White",
    patientId: "P-1014",
    patientInitials: getInitials("Alexander White"),
    doctorName: "Dr. Michael Torres",
    doctorId: "D-007",
    department: "Emergency",
    items: [
      {
        id: "item-18",
        type: "service",
        description: "Emergency Room Visit",
        quantity: 1,
        rate: 500,
        amount: 500,
      },
      {
        id: "item-19",
        type: "service",
        description: "CT Scan - Head",
        quantity: 1,
        rate: 1500,
        amount: 1500,
      },
      ...medicineItems[4],
    ],
    subtotal: 2082.5,
    discount: 0,
    discountLabel: "",
    tax: 166.6,
    taxLabel: "8% Tax",
    insurance: 1000,
    insuranceProvider: "UnitedHealth",
    total: 1249.1,
    paidAmount: 0,
    balance: 1249.1,
    status: "pending",
    paymentMethod: "insurance",
    dueDate: "2026-07-29",
    createdDate: "2026-07-03",
    createdTime: "22:15 PM",
    notes: "ER visit - awaiting insurance adjudication",
    payments: [],
    refunds: [],
    insuranceClaim: {
      provider: "UnitedHealth",
      policyNumber: "UH-45678",
      coverage: 1000,
      status: "pending",
      amountClaimed: 1000,
      amountApproved: 0,
    },
    isOverdue: false,
  },
  {
    id: "INV-2026-014",
    patientName: "Charlotte Harris",
    patientId: "P-1015",
    patientInitials: getInitials("Charlotte Harris"),
    doctorName: "Dr. Robert Kim",
    doctorId: "D-004",
    department: "Orthopedics",
    items: [
      {
        id: "item-20",
        type: "service",
        description: "Fracture Treatment",
        quantity: 1,
        rate: 600,
        amount: 600,
      },
      {
        id: "item-21",
        type: "service",
        description: "Cast Application",
        quantity: 1,
        rate: 150,
        amount: 150,
      },
    ],
    subtotal: 750,
    discount: 50,
    discountLabel: "Follow-up Discount",
    tax: 56,
    taxLabel: "8% Tax",
    insurance: 0,
    insuranceProvider: "",
    total: 756,
    paidAmount: 756,
    balance: 0,
    status: "paid",
    paymentMethod: "card",
    dueDate: "2026-07-18",
    createdDate: "2026-07-02",
    createdTime: "12:00 PM",
    notes: "Fracture treatment completed",
    payments: [
      {
        id: "pay-013",
        invoiceId: "INV-2026-014",
        amount: 756,
        method: "card",
        status: "completed",
        date: "2026-07-02",
        time: "12:15 PM",
        reference: "TXN-013",
      },
    ],
    refunds: [],
    insuranceClaim: null,
    isOverdue: false,
  },
  {
    id: "INV-2026-015",
    patientName: "Daniel Miller",
    patientId: "P-1016",
    patientInitials: getInitials("Daniel Miller"),
    doctorName: "Dr. Sarah Chen",
    doctorId: "D-001",
    department: "General Medicine",
    items: [...serviceItems.followup, ...labItems[1], ...medicineItems[5]],
    subtotal: 140,
    discount: 0,
    discountLabel: "",
    tax: 11.2,
    taxLabel: "8% Tax",
    insurance: 0,
    insuranceProvider: "",
    total: 151.2,
    paidAmount: 151.2,
    balance: 0,
    status: "paid",
    paymentMethod: "cash",
    dueDate: "2026-07-16",
    createdDate: "2026-07-01",
    createdTime: "07:30 AM",
    notes: "",
    payments: [
      {
        id: "pay-014",
        invoiceId: "INV-2026-015",
        amount: 151.2,
        method: "cash",
        status: "completed",
        date: "2026-07-01",
        time: "07:45 AM",
        reference: "TXN-014",
      },
    ],
    refunds: [],
    insuranceClaim: null,
    isOverdue: false,
  },
  {
    id: "INV-2026-016",
    patientName: "Grace Anderson",
    patientId: "P-1017",
    patientInitials: getInitials("Grace Anderson"),
    doctorName: "Dr. David Park",
    doctorId: "D-005",
    department: "Neurology",
    items: [
      {
        id: "item-22",
        type: "service",
        description: "Neurology Follow-up",
        quantity: 1,
        rate: 200,
        amount: 200,
      },
    ],
    subtotal: 200,
    discount: 0,
    discountLabel: "",
    tax: 16,
    taxLabel: "8% Tax",
    insurance: 100,
    insuranceProvider: "Humana",
    total: 116,
    paidAmount: 116,
    balance: 0,
    status: "paid",
    paymentMethod: "card",
    dueDate: "2026-07-23",
    createdDate: "2026-06-30",
    createdTime: "14:30 PM",
    notes: "",
    payments: [
      {
        id: "pay-015",
        invoiceId: "INV-2026-016",
        amount: 116,
        method: "card",
        status: "completed",
        date: "2026-06-30",
        time: "14:45 PM",
        reference: "TXN-015",
      },
    ],
    refunds: [],
    insuranceClaim: {
      provider: "Humana",
      policyNumber: "HUM-33445",
      coverage: 100,
      status: "paid",
      amountClaimed: 100,
      amountApproved: 100,
    },
    isOverdue: false,
  },
  {
    id: "INV-2026-017",
    patientName: "Henry Thomas",
    patientId: "P-1018",
    patientInitials: getInitials("Henry Thomas"),
    doctorName: "Dr. Emily Martinez",
    doctorId: "D-003",
    department: "Dermatology",
    items: [...serviceItems.dermatology, ...medicineItems[0], ...labItems[5]],
    subtotal: 515,
    discount: 40,
    discountLabel: "Skin Care Program",
    tax: 38,
    taxLabel: "8% Tax",
    insurance: 0,
    insuranceProvider: "",
    total: 513,
    paidAmount: 0,
    balance: 513,
    status: "overdue",
    paymentMethod: "cash",
    dueDate: "2026-06-15",
    createdDate: "2026-06-13",
    createdTime: "11:15 AM",
    notes: "Overdue - sent to collections",
    payments: [],
    refunds: [],
    insuranceClaim: null,
    isOverdue: true,
  },
  {
    id: "INV-2026-018",
    patientName: "Victoria Moore",
    patientId: "P-1020",
    patientInitials: getInitials("Victoria Moore"),
    doctorName: "Dr. Sarah Chen",
    doctorId: "D-001",
    department: "General Medicine",
    items: [...serviceItems.checkup, ...labItems[5]],
    subtotal: 350,
    discount: 0,
    discountLabel: "",
    tax: 28,
    taxLabel: "8% Tax",
    insurance: 150,
    insuranceProvider: "Aetna",
    total: 228,
    paidAmount: 228,
    balance: 0,
    status: "paid",
    paymentMethod: "card",
    dueDate: "2026-07-14",
    createdDate: "2026-06-29",
    createdTime: "09:30 AM",
    notes: "",
    payments: [
      {
        id: "pay-016",
        invoiceId: "INV-2026-018",
        amount: 228,
        method: "card",
        status: "completed",
        date: "2026-06-29",
        time: "09:45 AM",
        reference: "TXN-016",
      },
    ],
    refunds: [],
    insuranceClaim: {
      provider: "Aetna",
      policyNumber: "AET-55667",
      coverage: 150,
      status: "paid",
      amountClaimed: 150,
      amountApproved: 150,
    },
    isOverdue: false,
  },
  {
    id: "INV-2026-019",
    patientName: "Noah Martinez",
    patientId: "P-1002",
    patientInitials: getInitials("Noah Martinez"),
    doctorName: "Dr. James Wilson",
    doctorId: "D-002",
    department: "Cardiology",
    items: [...serviceItems.cardiology, ...labItems[0]],
    subtotal: 770,
    discount: 0,
    discountLabel: "",
    tax: 61.6,
    taxLabel: "8% Tax",
    insurance: 300,
    insuranceProvider: "Blue Cross",
    total: 531.6,
    paidAmount: 300,
    balance: 231.6,
    status: "partial",
    paymentMethod: "split",
    dueDate: "2026-07-31",
    createdDate: "2026-06-27",
    createdTime: "10:00 AM",
    notes: "Insurance paid partially - patient balance pending",
    payments: [
      {
        id: "pay-017",
        invoiceId: "INV-2026-019",
        amount: 300,
        method: "insurance",
        status: "completed",
        date: "2026-06-27",
        time: "10:30 AM",
        reference: "INS-003",
      },
    ],
    refunds: [],
    insuranceClaim: {
      provider: "Blue Cross",
      policyNumber: "BC-99887",
      coverage: 300,
      status: "paid",
      amountClaimed: 300,
      amountApproved: 300,
    },
    isOverdue: false,
  },
  {
    id: "INV-2026-020",
    patientName: "Liam Robinson",
    patientId: "P-1019",
    patientInitials: getInitials("Liam Robinson"),
    doctorName: "Dr. Michael Torres",
    doctorId: "D-007",
    department: "Emergency",
    items: [
      {
        id: "item-23",
        type: "service",
        description: "Emergency Consultation",
        quantity: 1,
        rate: 350,
        amount: 350,
      },
      {
        id: "lab-09",
        type: "lab-test",
        description: "Blood Culture Test",
        quantity: 1,
        rate: 200,
        amount: 200,
      },
    ],
    subtotal: 550,
    discount: 0,
    discountLabel: "",
    tax: 44,
    taxLabel: "8% Tax",
    insurance: 0,
    insuranceProvider: "",
    total: 594,
    paidAmount: 594,
    balance: 0,
    status: "paid",
    paymentMethod: "card",
    dueDate: "2026-07-17",
    createdDate: "2026-06-26",
    createdTime: "20:30 PM",
    notes: "Night ER visit",
    payments: [
      {
        id: "pay-018",
        invoiceId: "INV-2026-020",
        amount: 594,
        method: "card",
        status: "completed",
        date: "2026-06-26",
        time: "20:45 PM",
        reference: "TXN-018",
      },
    ],
    refunds: [],
    insuranceClaim: null,
    isOverdue: false,
  },
  {
    id: "INV-2026-021",
    patientName: "Isabella Clark",
    patientId: "P-1001",
    patientInitials: getInitials("Isabella Clark"),
    doctorName: "Dr. Lisa Anderson",
    doctorId: "D-006",
    department: "Pediatrics",
    items: [...serviceItems.maternity, ...medicineItems[2]],
    subtotal: 261.5,
    discount: 30,
    discountLabel: "Insurance Co-pay Adjustment",
    tax: 18.52,
    taxLabel: "8% Tax",
    insurance: 0,
    insuranceProvider: "",
    total: 250.02,
    paidAmount: 0,
    balance: 250.02,
    status: "refunded",
    paymentMethod: "cash",
    dueDate: "2026-06-20",
    createdDate: "2026-06-20",
    createdTime: "14:00 PM",
    notes: "Service cancelled - refund processed",
    payments: [
      {
        id: "pay-019",
        invoiceId: "INV-2026-021",
        amount: 250.02,
        method: "cash",
        status: "completed",
        date: "2026-06-20",
        time: "14:15 PM",
        reference: "TXN-019",
      },
    ],
    refunds: [
      {
        id: "ref-001",
        invoiceId: "INV-2026-021",
        patientName: "Isabella Clark",
        amount: 250.02,
        reason: "Service cancelled - patient rescheduled",
        status: "completed",
        date: "2026-06-22",
        processedBy: "Rachel Adams",
      },
    ],
    insuranceClaim: null,
    isOverdue: false,
  },
  {
    id: "INV-2026-022",
    patientName: "Mason Lee",
    patientId: "P-1010",
    patientInitials: getInitials("Mason Lee"),
    doctorName: "Dr. David Park",
    doctorId: "D-005",
    department: "Neurology",
    items: [
      {
        id: "item-24",
        type: "service",
        description: "Neurology Consultation",
        quantity: 1,
        rate: 400,
        amount: 400,
      },
    ],
    subtotal: 400,
    discount: 0,
    discountLabel: "",
    tax: 32,
    taxLabel: "8% Tax",
    insurance: 0,
    insuranceProvider: "",
    total: 432,
    paidAmount: 432,
    balance: 0,
    status: "paid",
    paymentMethod: "bank-transfer",
    dueDate: "2026-07-24",
    createdDate: "2026-06-25",
    createdTime: "16:00 PM",
    notes: "",
    payments: [
      {
        id: "pay-020",
        invoiceId: "INV-2026-022",
        amount: 432,
        method: "bank-transfer",
        status: "completed",
        date: "2026-06-25",
        time: "16:30 PM",
        reference: "TXN-020",
      },
    ],
    refunds: [],
    insuranceClaim: null,
    isOverdue: false,
  },
  {
    id: "INV-2026-023",
    patientName: "Aria Patel",
    patientId: "P-1006",
    patientInitials: getInitials("Aria Patel"),
    doctorName: "Dr. Emily Martinez",
    doctorId: "D-003",
    department: "Dermatology",
    items: [
      {
        id: "item-25",
        type: "service",
        description: "Laser Treatment",
        quantity: 1,
        rate: 1200,
        amount: 1200,
      },
    ],
    subtotal: 1200,
    discount: 100,
    discountLabel: "Package Discount",
    tax: 88,
    taxLabel: "8% Tax",
    insurance: 0,
    insuranceProvider: "",
    total: 1188,
    paidAmount: 0,
    balance: 1188,
    status: "pending",
    paymentMethod: "card",
    dueDate: "2026-08-10",
    createdDate: "2026-07-14",
    createdTime: "13:00 PM",
    notes: "Awaiting payment - scheduled for next week",
    payments: [],
    refunds: [],
    insuranceClaim: null,
    isOverdue: false,
  },
  {
    id: "INV-2026-024",
    patientName: "Ella Baker",
    patientId: "P-1012",
    patientInitials: getInitials("Ella Baker"),
    doctorName: "Dr. Robert Kim",
    doctorId: "D-004",
    department: "Orthopedics",
    items: [
      {
        id: "item-26",
        type: "service",
        description: "Physical Therapy Session",
        quantity: 6,
        rate: 120,
        amount: 720,
      },
      ...medicineItems[3],
    ],
    subtotal: 828,
    discount: 0,
    discountLabel: "",
    tax: 66.24,
    taxLabel: "8% Tax",
    insurance: 400,
    insuranceProvider: "Cigna",
    total: 494.24,
    paidAmount: 0,
    balance: 494.24,
    status: "pending",
    paymentMethod: "insurance",
    dueDate: "2026-08-15",
    createdDate: "2026-07-14",
    createdTime: "15:45 PM",
    notes: "PT sessions package - insurance pending",
    payments: [],
    refunds: [],
    insuranceClaim: {
      provider: "Cigna",
      policyNumber: "CIG-77665",
      coverage: 400,
      status: "pending",
      amountClaimed: 400,
      amountApproved: 0,
    },
    isOverdue: false,
  },
  {
    id: "INV-2026-025",
    patientName: "Lucas Green",
    patientId: "P-1014",
    patientInitials: getInitials("Lucas Green"),
    doctorName: "Dr. Sarah Chen",
    doctorId: "D-001",
    department: "General Medicine",
    items: [...serviceItems.followup, ...labItems[3], ...medicineItems[5]],
    subtotal: 150,
    discount: 0,
    discountLabel: "",
    tax: 12,
    taxLabel: "8% Tax",
    insurance: 0,
    insuranceProvider: "",
    total: 162,
    paidAmount: 162,
    balance: 0,
    status: "paid",
    paymentMethod: "cash",
    dueDate: "2026-07-14",
    createdDate: "2026-07-14",
    createdTime: "08:00 AM",
    notes: "",
    payments: [
      {
        id: "pay-021",
        invoiceId: "INV-2026-025",
        amount: 162,
        method: "cash",
        status: "completed",
        date: "2026-07-14",
        time: "08:15 AM",
        reference: "TXN-021",
      },
    ],
    refunds: [],
    insuranceClaim: null,
    isOverdue: false,
  },
];

/* ══════════════════════════════════════════════
   Derived helpers
   ══════════════════════════════════════════════ */

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getDateLabel(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
