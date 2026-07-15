"use client";

import {
  fadeInBackdrop,
  scaleUp,
} from "@/components/dashboard/staff/MotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Clock, Maximize2, Minimize2, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  formatTime,
  getInitials,
  getInitialsColor,
  priorityConfig,
  queueEntries,
} from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface DisplayBoardPreviewProps {
  open: boolean;
  onClose: () => void;
}

/* ─── Current time display ──────────────────── */

function CurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-right">
      <p className="text-3xl font-light tracking-wider text-white">
        {time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </p>
      <p className="text-sm text-white/60">
        {time.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════
   DisplayBoardPreview
   ══════════════════════════════════════════════ */

export function DisplayBoardPreview({
  open,
  onClose,
}: DisplayBoardPreviewProps) {
  const [fullscreen, setFullscreen] = useState(false);

  // Get current/next tokens
  const waitingPatients = queueEntries
    .filter((e) => e.status === "waiting")
    .sort((a, b) => a.queueNumber - b.queueNumber);

  const inConsultation = queueEntries.filter(
    (e) => e.status === "in-consultation",
  );

  const called = queueEntries.filter((e) => e.status === "called");

  const currentToken =
    inConsultation.length > 0
      ? inConsultation[0]
      : called.length > 0
        ? called[0]
        : null;

  const nextTokens = waitingPatients.slice(0, 5);

  const avgWait =
    waitingPatients.length > 0
      ? Math.round(
          waitingPatients.reduce((s, e) => s + e.waitingMinutes, 0) /
            waitingPatients.length,
        )
      : 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-sm"
          variants={fadeInBackdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            variants={scaleUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative overflow-hidden rounded-2xl ${
              fullscreen
                ? "fixed inset-0 z-50 rounded-none"
                : "w-full max-w-4xl"
            }`}
          >
            {/* Board content */}
            <div className="relative min-h-[600px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8">
              {/* Top bar */}
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white sm:text-3xl">
                    Patient Queue Board
                  </h1>
                  <p className="mt-1 text-sm text-white/60">
                    MediFlow Hospital · Current Queue Status
                  </p>
                </div>
                <CurrentTime />
              </div>

              {/* Controls */}
              <div className="absolute right-4 top-4 flex gap-2">
                <button
                  onClick={() => setFullscreen(!fullscreen)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
                >
                  {fullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Current Token */}
              <div className="mb-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-xl bg-white/10 p-6 backdrop-blur">
                  <div className="flex items-center gap-3 text-white/60">
                    <Bell className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wider">
                      Now Serving
                    </span>
                  </div>
                  {currentToken ? (
                    <div className="mt-4">
                      <div className="flex items-baseline gap-3">
                        <span className="text-6xl font-bold text-white">
                          #{currentToken.queueNumber}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            priorityConfig[currentToken.priority].class
                          }`}
                        >
                          {priorityConfig[currentToken.priority].label}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${getInitialsColor(currentToken.patientName)}`}
                        >
                          {getInitials(currentToken.patientName)}
                        </div>
                        <div>
                          <p className="text-lg font-medium text-white">
                            {currentToken.patientName}
                          </p>
                          <p className="text-sm text-white/60">
                            {currentToken.doctorName} ·{" "}
                            {currentToken.department}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <p className="text-3xl font-bold text-white/40">—</p>
                      <p className="mt-1 text-sm text-white/40">
                        No patient currently being served
                      </p>
                    </div>
                  )}
                </div>

                <div className="rounded-xl bg-white/10 p-6 backdrop-blur">
                  <div className="flex items-center gap-3 text-white/60">
                    <Clock className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wider">
                      Estimated Wait
                    </span>
                  </div>
                  <p className="mt-4 text-5xl font-bold text-white">
                    {avgWait}
                    <span className="text-2xl text-white/60"> min</span>
                  </p>
                  <p className="mt-1 text-sm text-white/40">
                    Average wait time for waiting patients
                  </p>
                </div>
              </div>

              {/* Next Tokens */}
              <div>
                <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-white/60">
                  Next in Queue
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                  {nextTokens.length > 0 ? (
                    nextTokens.map((entry, index) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.06 }}
                        className="rounded-lg bg-white/5 p-3 backdrop-blur"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-white">
                            #{entry.queueNumber}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              priorityConfig[entry.priority].class
                            }`}
                          >
                            {priorityConfig[entry.priority].label}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm font-medium text-white/80">
                          {entry.patientName}
                        </p>
                        <p className="text-xs text-white/40">
                          {entry.doctorName}
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[11px] text-white/40">
                          <Clock className="h-3 w-3" />
                          <span>
                            Checked in {formatTime(entry.checkInTime)}
                          </span>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full py-8 text-center">
                      <p className="text-white/40">No patients waiting</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Announcement bar */}
              <div className="mt-8 flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3 backdrop-blur">
                <Bell className="h-4 w-4 text-amber-400" />
                <p className="text-sm text-white/70">
                  <span className="font-medium text-white">Announcement:</span>{" "}
                  Please proceed to your respective consultation rooms when your
                  number is called.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
