"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Clock, Globe, History, LogOut, MapPin, Monitor } from "lucide-react";
import SettingsCard from "./SettingsCard";
import { mockSessions } from "./types";

export default function SessionsCard() {
  return (
    <div className="space-y-6">
      {/* Current Session */}
      <SettingsCard title="Current Session" icon={Monitor}>
        {(() => {
          const session = mockSessions[0];
          return (
            <div className="rounded-xl bg-[#0e7c7b]/5 dark:bg-[#2dd4bf]/5 border border-[#0e7c7b]/20 dark:border-[#2dd4bf]/20 p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#0e7c7b]/10 dark:bg-[#2dd4bf]/10">
                    <Monitor
                      className="h-5 w-5 text-[#0e7c7b] dark:text-[#2dd4bf]"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-[#1a2e2e] dark:text-white">
                        {session.device}
                      </p>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#16a34a]/10 text-[#16a34a] dark:bg-[#16a34a]/20 dark:text-[#4ade80] uppercase tracking-wider">
                        Active
                      </span>
                    </div>
                    <div className="mt-2 space-y-1.5">
                      <DetailRow icon={Globe} text={session.browser} />
                      <DetailRow icon={MapPin} text={session.location} />
                      <DetailRow
                        icon={Clock}
                        text={`Signed in ${session.loggedInAt}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </SettingsCard>

      {/* Login History */}
      <SettingsCard title="Login History" icon={History}>
        <div className="space-y-3">
          {mockSessions.map((session, i) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "flex items-center justify-between p-4 rounded-xl transition-colors",
                session.isCurrent
                  ? "bg-[#0e7c7b]/5 dark:bg-[#2dd4bf]/5 border border-[#0e7c7b]/20 dark:border-[#2dd4bf]/20"
                  : "bg-[#f8fafa] dark:bg-[#1a2a2a] border border-[#e1e8e8] dark:border-[#2a3a3a] hover:bg-[#f0f5f5] dark:hover:bg-[#2a3a3a]",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "p-2 rounded-lg",
                    session.isCurrent
                      ? "bg-[#0e7c7b]/10 dark:bg-[#2dd4bf]/10"
                      : "bg-[#e1e8e8] dark:bg-[#2a3a3a]",
                  )}
                >
                  <Monitor
                    className={cn(
                      "h-4 w-4",
                      session.isCurrent
                        ? "text-[#0e7c7b] dark:text-[#2dd4bf]"
                        : "text-[#5c7373] dark:text-[#8a9a9a]",
                    )}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1a2e2e] dark:text-white">
                    {session.device}
                  </p>
                  <p className="text-xs text-[#5c7373] dark:text-[#8a9a9a]">
                    {session.browser} · {session.location} · {session.ip}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#5c7373] dark:text-[#8a9a9a]">
                  {session.lastActive}
                </p>
                {session.isCurrent && (
                  <p className="text-[10px] font-medium text-[#16a34a] dark:text-[#4ade80] uppercase tracking-wider">
                    Current
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </SettingsCard>

      {/* Logout All */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between p-5 rounded-2xl bg-white/80 dark:bg-[#1a2a2a]/80 backdrop-blur-xl border border-[#e1e8e8] dark:border-[#2a3a3a]"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-[#dc2626]/10 text-[#dc2626]">
            <LogOut className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="font-medium text-[#1a2e2e] dark:text-white">
              Sign Out of All Sessions
            </p>
            <p className="text-sm text-[#5c7373] dark:text-[#8a9a9a]">
              This will sign you out of all devices except this one
            </p>
          </div>
        </div>
        <button className="px-4 py-2 rounded-xl bg-[#dc2626]/10 text-[#dc2626] hover:bg-[#dc2626]/20 transition-colors text-sm font-medium shrink-0 ml-4">
          Sign Out All
        </button>
      </motion.div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-[#5c7373] dark:text-[#8a9a9a]">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
}
