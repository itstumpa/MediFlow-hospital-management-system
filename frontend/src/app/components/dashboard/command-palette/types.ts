import type { LucideIcon } from "lucide-react";

/** A single item in the command palette (page or command) */
export interface CommandPaletteItem {
  id: string;
  type: "page" | "command" | "action";
  label: string;
  description: string;
  href?: string;
  icon: LucideIcon;
  iconName: string;
  shortcut?: string;
  group: string;
  keywords: string[];
}

/** Persisted search entry */
export interface StoredEntry {
  id: string;
  label: string;
  description: string;
  href?: string;
  iconName: string;
}

/** Grouped results */
export interface ResultGroup {
  label: string;
  items: CommandPaletteItem[];
}

/** Context value for the command palette provider */
export interface CommandPaletteContextValue {
  open: () => void;
  close: () => void;
  isOpen: boolean;
  toggle: () => void;
}
