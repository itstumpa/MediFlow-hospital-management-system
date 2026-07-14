"use client";

import { motion } from "framer-motion";
import {
  Copy,
  Download,
  KeyRound,
  RefreshCw,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { useState } from "react";
import { CardWrapper } from "./CardWrapper";
import { recoveryCodes, type RecoveryCode } from "./data";

/* ---------- Toggle switch ---------- */

function ToggleSwitch({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 ${
        enabled ? "bg-[var(--color-primary)]" : "bg-slate-200 dark:bg-slate-600"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

/* ---------- Component ---------- */

export function TwoFactorCard() {
  const [enabled, setEnabled] = useState(false);
  const [codes] = useState<RecoveryCode[]>(recoveryCodes);
  const [showCodes, setShowCodes] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyCodes = async () => {
    const text = codes.map((c) => c.code).join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCodes = () => {
    const text = codes.map((c) => c.code).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `medi-flow-recovery-codes-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <CardWrapper
      title="Two-Factor Authentication"
      description="Add an extra layer of security to your account"
      icon={<ShieldCheck className="h-5 w-5" />}
      headerAction={<ToggleSwitch enabled={enabled} onChange={setEnabled} />}
    >
      {!enabled ? (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-700">
            <Smartphone className="h-7 w-7 text-slate-400 dark:text-slate-500" />
          </div>
          <div className="max-w-sm">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Protect your account with two-factor authentication. When enabled,
              you will need both your password and a verification code from your
              authenticator app to sign in.
            </p>
          </div>
          <button
            onClick={() => setEnabled(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[var(--color-primary-dark)]"
          >
            <ShieldCheck className="h-4 w-4" />
            Enable 2FA
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-6"
        >
          {/* QR Code Placeholder */}
          <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 dark:border-slate-600 dark:bg-slate-800/30">
            <div className="flex h-40 w-40 items-center justify-center rounded-xl bg-white shadow-inner dark:bg-slate-700">
              <div className="grid grid-cols-7 gap-0.5">
                {Array.from({ length: 49 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-3.5 w-3.5 rounded-[2px] ${
                      // Generate a pseudo QR-like pattern
                      [
                        [0, 1, 2, 3, 4, 5, 6],
                        [7, 13],
                        [14, 20],
                        [21, 27],
                        [28, 34],
                        [35, 41],
                        [42, 43, 44, 45, 46, 48],
                      ].some((row) => row.includes(i % 49))
                        ? "bg-slate-900 dark:bg-white"
                        : i % 7 === 3 || i % 11 === 0
                          ? "bg-slate-900 dark:bg-white"
                          : "bg-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Scan this QR code with your authenticator app
            </p>
          </div>

          {/* Recovery Codes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Recovery Codes
                </span>
              </div>
              <button
                onClick={() => setShowCodes(!showCodes)}
                className="text-xs font-medium text-[var(--color-primary)] hover:underline dark:text-emerald-400"
              >
                {showCodes ? "Hide" : "Show"}
              </button>
            </div>

            {showCodes && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="grid grid-cols-2 gap-2">
                  {codes.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2 font-mono text-xs text-slate-700 dark:border-slate-600 dark:bg-slate-800/40 dark:text-slate-300"
                    >
                      {c.code}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCodes}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={handleDownloadCodes}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                  <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700">
                    <RefreshCw className="h-3.5 w-3.5" />
                    Regenerate
                  </button>
                </div>

                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Store these codes in a safe place. Each code can only be used
                  once. You will need them if you lose access to your
                  authenticator app.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </CardWrapper>
  );
}
