"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SettingsNavItem, SettingsSection } from "./types";

interface SettingsSidebarProps {
  items: SettingsNavItem[];
  activeSection: SettingsSection;
  onSelect: (section: SettingsSection) => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Settings: ({ className }) => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  Palette: ({ className }) => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.215 13.97A12.25 12.25 0 0112 21.75a12.25 12.25 0 014.785-7.78 15.757 15.757 0 012.59-5.147A12.061 12.061 0 0012 2.25 12.061 12.061 0 002.25 12c0 1.07.174 2.1.5 3.057a15.945 15.945 0 002.465 5.147z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  Globe: ({ className }) => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    </svg>
  ),
  Bell: ({ className }) => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.857 17.082a63.878 63.878 0 01-3.107-1.538 64.158 64.158 0 01-5.5-4.147 64.158 64.158 0 01-5.5 4.147 63.878 63.878 0 01-3.107 1.538M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 14v3m-3-3v3m6-8v3m-3 3v3m-9-3v3m-3 3v3"
      />
    </svg>
  ),
  CalendarCheck: ({ className }) => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      />
    </svg>
  ),
  Shield: ({ className }) => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  ),
  Plug: ({ className }) => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
      />
    </svg>
  ),
  Database: ({ className }) => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
      />
    </svg>
  ),
  Key: ({ className }) => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
      />
    </svg>
  ),
  CreditCard: ({ className }) => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 4.5A2.25 2.25 0 000 6.75v10.5A2.25 2.25 0 002.25 19.5h19.5A2.25 2.25 0 0024 17.25V6.75A2.25 2.25 0 0021.75 4.5H2.25z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 10.5h16.5M3.75 14.25h16.5"
      />
    </svg>
  ),
  TriangleAlert: ({ className }) => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
      />
    </svg>
  ),
};

export function SettingsSidebar({
  items,
  activeSection,
  onSelect,
}: SettingsSidebarProps) {
  return (
    <aside className="hidden lg:block w-[280px] flex-shrink-0 border-r border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-slate-700/40 dark:bg-slate-900/80">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 shrink-0 items-center border-b border-slate-100 px-5 dark:border-slate-800/60">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Settings
          </h2>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 overflow-y-auto py-4 px-3"
          aria-label="Settings navigation"
        >
          <ul className="flex flex-col gap-1" role="list">
            {items.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03, duration: 0.2 }}
              >
                <button
                  onClick={() => onSelect(item.id)}
                  className={cn(
                    "relative w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900",
                    activeSection === item.id
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white",
                  )}
                  aria-current={activeSection === item.id ? "page" : undefined}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                      activeSection === item.id
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                        : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300",
                    )}
                    aria-hidden="true"
                  >
                    {ICON_MAP[item.icon] &&
                      (() => {
                        const Icon = ICON_MAP[item.icon];
                        return <Icon className="h-5 w-5" />;
                      })()}
                  </span>
                  <div className="flex-1 min-w-0 text-left">
                    <span className="block truncate">{item.label}</span>
                    <span className="block truncate text-xs opacity-70">
                      {item.description}
                    </span>
                  </div>
                  {activeSection === item.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-blue-500 rounded-r-lg"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-100 p-4 dark:border-slate-800/60">
          <p className="text-xs text-center text-slate-500 dark:text-slate-400">
            Changes are saved automatically
          </p>
        </div>
      </div>
    </aside>
  );
}
