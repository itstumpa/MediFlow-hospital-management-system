export type MessageStatus =
  | "new"
  | "in-progress"
  | "resolved"
  | "closed"
  | "spam";
export type MessagePriority = "low" | "medium" | "high" | "urgent";
export type MessageDepartment =
  | "general"
  | "cardiology"
  | "neurology"
  | "pediatrics"
  | "orthopedics"
  | "gynecology"
  | "dermatology"
  | "ophthalmology"
  | "ent"
  | "psychiatry";

export interface Attachment {
  name: string;
  size: string;
  type: string;
}

export interface InternalNote {
  id: string;
  author: string;
  authorRole: string;
  content: string;
  createdAt: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  body: string;
  priority: MessagePriority;
  status: MessageStatus;
  department: MessageDepartment;
  assignedDoctor?: string;
  createdAt: string;
  readAt: string | null;
  resolvedAt: string | null;
  attachments: Attachment[];
  notes: InternalNote[];
}

export interface MessageFilters {
  search: string;
  status: MessageStatus[];
  priority: MessagePriority[];
  department: MessageDepartment[];
}

export const DEFAULT_MESSAGE_FILTERS: MessageFilters = {
  search: "",
  status: [],
  priority: [],
  department: [],
};

export const STATUS_COLORS: Record<
  MessageStatus,
  { bg: string; text: string; dot: string }
> = {
  new: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-300",
    dot: "bg-blue-500",
  },
  "in-progress": {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  resolved: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  closed: {
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-600 dark:text-slate-400",
    dot: "bg-slate-400",
  },
  spam: {
    bg: "bg-rose-100 dark:bg-rose-900/30",
    text: "text-rose-700 dark:text-rose-300",
    dot: "bg-rose-500",
  },
};

export const PRIORITY_COLORS: Record<
  MessagePriority,
  { bg: string; text: string; ring: string }
> = {
  low: {
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-600 dark:text-slate-400",
    ring: "ring-slate-300 dark:ring-slate-600",
  },
  medium: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-300",
    ring: "ring-blue-300 dark:ring-blue-600",
  },
  high: {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-700 dark:text-orange-300",
    ring: "ring-orange-300 dark:ring-orange-600",
  },
  urgent: {
    bg: "bg-rose-100 dark:bg-rose-900/30",
    text: "text-rose-700 dark:text-rose-300",
    ring: "ring-rose-300 dark:ring-rose-600",
  },
};

export const DEPARTMENT_LABELS: Record<MessageDepartment, string> = {
  general: "General Inquiry",
  cardiology: "Cardiology",
  neurology: "Neurology",
  pediatrics: "Pediatrics",
  orthopedics: "Orthopedics",
  gynecology: "Gynecology",
  dermatology: "Dermatology",
  ophthalmology: "Ophthalmology",
  ent: "ENT",
  psychiatry: "Psychiatry",
};
