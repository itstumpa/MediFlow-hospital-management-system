// @ts-nocheck
"use client";

import { cn, formatDate, timeAgo } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Download,
  Eye,
  FileText,
  FlaskConical,
  Heart,
  Loader2,
  Mail,
  MoreVertical,
  Paperclip,
  Printer,
  Share2,
  Shield,
  Stethoscope,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const record = {
  id: "rec-001",
  title: "Echocardiogram Report",
  type: "Diagnostic Imaging",
  category: "Cardiology",
  date: "2024-11-15",
  doctor: "Dr. Sarah Chen",
  specialty: "Cardiology",
  status: "final",
  summary:
    "Normal left ventricular systolic function. EF 60%. No wall motion abnormalities. Mild mitral regurgitation.",
  fullContent: `ECHOCARDIOGRAM REPORT

Patient: John Doe
DOB: 01/15/1980
Date of Study: 11/15/2024
Referring Physician: Dr. Lisa Nguyen
Performing Physician: Dr. Sarah Chen, MD

INDICATION: Hypertension follow-up, evaluation of cardiac function.

TECHNIQUE: Complete transthoracic echocardiogram performed with standard imaging planes. Doppler interrogation of all valves.

FINDINGS:

LEFT VENTRICLE:
- Normal left ventricular size and wall thickness.
- Normal left ventricular systolic function. Estimated ejection fraction 60% (Simpson's biplane).
- No regional wall motion abnormalities.
- Normal diastolic filling pattern (E/A ratio 1.2, E/e' ratio 7).

RIGHT VENTRICLE:
- Normal right ventricular size and systolic function.
- TAPSE 2.4 cm.

LEFT ATRIUM:
- Normal left atrial size (volume index 22 mL/m²).

RIGHT ATRIUM:
- Normal right atrial size.

MITRAL VALVE:
- Normal mitral valve leaflets.
- Mild mitral regurgitation (central jet, vena contracta 0.3 cm).
- No mitral stenosis.

AORTIC VALVE:
- Trileaflet aortic valve.
- Normal aortic valve opening.
- No aortic regurgitation.
- No aortic stenosis.

TRICUSPID VALVE:
- Normal tricuspid valve.
- Trace tricuspid regurgitation (physiologic).
- Estimated RVSP 25 mmHg.

PULMONIC VALVE:
- Normal pulmonic valve.
- No pulmonic regurgitation.

AORTA:
- Normal aortic root diameter (3.2 cm).
- Normal ascending aorta.

PERICARDIUM:
- No pericardial effusion.

IMPRESSION:
1. Normal left ventricular systolic function (EF 60%).
2. Mild mitral regurgitation.
3. No other significant valvular abnormalities.
4. Normal chamber sizes.

RECOMMENDATIONS:
- Continue current antihypertensive regimen.
- Repeat echocardiogram in 12 months for surveillance of mitral regurgitation.
- Follow-up with cardiology in 6 months.

Electronically signed by: Dr. Sarah Chen, MD
Date: 11/15/2024 14:32 EST`,
  attachments: [
    {
      id: "att-1",
      name: "Echocardiogram_Report.pdf",
      type: "PDF",
      size: "2.4 MB",
      pages: 4,
    },
    {
      id: "att-2",
      name: "Echo_Images.zip",
      type: "ZIP",
      size: "15.2 MB",
      pages: 24,
    },
    {
      id: "att-3",
      name: "Measurements.xlsx",
      type: "XLSX",
      size: "156 KB",
      pages: 1,
    },
  ],
  tags: ["Heart", "Imaging", "Follow-up"],
  confidential: false,
};

const statusStyles: Record<string, string> = {
  final:
    "bg-[#16a34a]/10 text-[#16a34a] dark:bg-[#16a34a]/20 dark:text-[#4ade80]",
  pending:
    "bg-[#f59e0b]/10 text-[#f59e0b] dark:bg-[#f59e0b]/20 dark:text-[#fbbf24]",
  confidential:
    "bg-[#8b5cf6]/10 text-[#8b5cf6] dark:bg-[#8b5cf6]/20 dark:text-[#a78bfa]",
  draft:
    "bg-[#5c7373]/10 text-[#5c7373] dark:bg-[#5c7373]/20 dark:text-[#8a9a9a]",
};

const categoryIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Cardiology: Heart,
  "Primary Care": Stethoscope,
  Dermatology: FileText,
  Laboratory: FlaskConical,
  Radiology: FileText,
  Neurology: FileText,
  Psychiatry: FileText,
  "Preventive Care": Shield,
  Rehabilitation: FileText,
};

export default function RecordDetailPage() {
  const [activeTab, setActiveTab] = useState<
    "summary" | "full" | "attachments"
  >("summary");
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const handleDownload = async (attachmentId: string) => {
    setIsDownloading(attachmentId);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsDownloading(null);
  };

  const handlePrint = async () => {
    setIsPrinting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    window.print();
    setIsPrinting(false);
  };

  const CategoryIcon =
    categoryIcons[record.category as keyof typeof categoryIcons] || FileText;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <Link
          href="/patient/medical-records"
          className="flex items-center gap-2 p-2 rounded-xl text-[#5c7373] hover:bg-[#f0f5f5] dark:hover:bg-[#2a3a3a] transition-colors"
          aria-label="Back to records"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          <span className="hidden sm:inline font-medium">Back to Records</span>
        </Link>
        <div className="flex items-center gap-3 sm:ml-auto">
          <button
            className="p-2 rounded-xl text-[#5c7373] hover:bg-[#f0f5f5] dark:hover:bg-[#2a3a3a] transition-colors"
            aria-label="More options"
          >
            <MoreVertical className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            onClick={handlePrint}
            disabled={isPrinting}
            className="px-4 py-2 rounded-xl border border-[#e1e8e8] dark:border-[#2a3a3a] text-[#1a2e2e] dark:text-white font-medium hover:bg-[#f0f5f5] dark:hover:bg-[#2a3a3a] transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            Print
          </button>
          <button
            onClick={() => handleDownload("full")}
            disabled={isDownloading}
            className="px-4 py-2 rounded-xl bg-[#0e7c7b] text-white font-medium hover:bg-[#0a5f5e] transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isDownloading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Download className="h-4 w-4" aria-hidden="true" />
            )}
            Download
          </button>
        </div>
      </motion.div>

      {/* Record Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl bg-white/80 dark:bg-[#1a2a2a]/80 backdrop-blur-xl border border-[#e1e8e8] dark:border-[#2a3a3a] p-6 lg:p-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0e7c7b] to-[#2dd4bf] text-white">
              <CategoryIcon className="h-8 w-8" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    statusStyles[record.status],
                  )}
                >
                  {record.status.charAt(0).toUpperCase() +
                    record.status.slice(1)}
                </span>
                {record.confidential && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#dc2626]/10 text-[#dc2626] dark:bg-[#dc2626]/20 dark:text-[#f87171] flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" aria-hidden="true" />
                    Confidential
                  </span>
                )}
              </div>
              <h1 className="mt-3 text-2xl lg:text-3xl font-bold text-[#1a2e2e] dark:text-white">
                {record.title}
              </h1>
              <p className="mt-1 text-lg text-[#5c7373] dark:text-[#8a9a9a]">
                {record.type} • {record.category}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:ml-auto">
            <div className="flex items-center gap-2 text-sm text-[#5c7373] dark:text-[#8a9a9a]">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span>
                {formatDate(record.date, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#5c7373] dark:text-[#8a9a9a]">
              <UserRound className="h-4 w-4" aria-hidden="true" />
              <span>{record.doctor}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#e1e8e8] dark:border-[#2a3a3a] flex flex-wrap gap-2">
          {record.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-sm font-medium bg-[#e1e8e8] dark:bg-[#2a3a3a] text-[#5c7373] dark:text-[#8a9a9a]"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl bg-white/80 dark:bg-[#1a2a2a]/80 backdrop-blur-xl border border-[#e1e8e8] dark:border-[#2a3a3a] overflow-hidden"
      >
        <div className="flex border-b border-[#e1e8e8] dark:border-[#2a3a3a]">
          {[
            { id: "summary", label: "Summary", icon: FileText },
            { id: "full", label: "Full Document", icon: FileText },
            { id: "attachments", label: "Attachments", icon: Paperclip },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all relative",
                activeTab === tab.id
                  ? "text-[#0e7c7b] dark:text-[#2dd4bf] bg-[#0e7c7b]/5 dark:bg-[#0e7c7b]/10"
                  : "text-[#5c7373] dark:text-[#8a9a9a] hover:text-[#1a2e2e] dark:hover:text-white hover:bg-[#f8fafa] dark:hover:bg-[#1a2a2a]",
              )}
            >
              <tab.icon className="h-4 w-4" aria-hidden="true" />
              {tab.label}
            </button>
          ))}
          <div
            className="absolute bottom-0 h-0.5 bg-[#0e7c7b] transition-all duration-300"
            style={{
              width:
                activeTab === "summary"
                  ? "33.33%"
                  : activeTab === "full"
                    ? "33.33%"
                    : "33.33%",
              left:
                activeTab === "summary"
                  ? "0"
                  : activeTab === "full"
                    ? "33.33%"
                    : "66.66%",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6 lg:p-8"
          >
            {activeTab === "summary" && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <InfoCard
                    label="Date"
                    value={formatDate(record.date, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    icon={Calendar}
                  />
                  <InfoCard
                    label="Provider"
                    value={record.doctor}
                    icon={UserRound}
                  />
                  <InfoCard
                    label="Specialty"
                    value={record.specialty}
                    icon={Stethoscope}
                  />
                  <InfoCard label="Type" value={record.type} icon={FileText} />
                </div>
                <div className="pt-4 border-t border-[#e1e8e8] dark:border-[#2a3a3a]">
                  <h3 className="font-semibold text-[#1a2e2e] dark:text-white mb-3">
                    Clinical Summary
                  </h3>
                  <p className="text-[#5c7373] dark:text-[#8a9a9a] whitespace-pre-wrap">
                    {record.summary}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#e1e8e8] dark:border-[#2a3a3a]">
                  <h3 className="font-semibold text-[#1a2e2e] dark:text-white mb-3">
                    Key Information
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <DetailRow label="Record ID" value={record.id} />
                    <DetailRow label="Category" value={record.category} />
                    <DetailRow
                      label="Status"
                      value={
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium",
                            statusStyles[record.status],
                          )}
                        >
                          {record.status}
                        </span>
                      }
                    />
                    <DetailRow
                      label="Attachments"
                      value={`${record.attachments.length} file(s)`}
                    />
                    <DetailRow
                      label="Confidential"
                      value={record.confidential ? "Yes" : "No"}
                    />
                    <DetailRow
                      label="Last Updated"
                      value={timeAgo(record.date)}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "full" && (
              <div className="prose prose-[#1a2e2e] dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-inherit text-[#5c7373] dark:text-[#8a9a9a] leading-relaxed">
                  {record.fullContent}
                </pre>
              </div>
            )}

            {activeTab === "attachments" && (
              <div className="space-y-4">
                {record.attachments.map((attachment) => (
                  <AttachmentRow
                    key={attachment.id}
                    attachment={attachment}
                    onDownload={() => handleDownload(attachment.id)}
                    isDownloading={isDownloading === attachment.id}
                  />
                ))}
                <div className="pt-4 border-t border-[#e1e8e8] dark:border-[#2a3a3a]">
                  <button className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[#e1e8e8] dark:border-[#2a3a3a] text-[#1a2e2e] dark:text-white font-medium hover:bg-[#f0f5f5] dark:hover:bg-[#2a3a3a] transition-colors flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Download All as ZIP
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Related Records */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl bg-white/80 dark:bg-[#1a2a2a]/80 backdrop-blur-xl border border-[#e1e8e8] dark:border-[#2a3a3a] p-6 lg:p-8"
      >
        <h2 className="text-lg font-semibold text-[#1a2e2e] dark:text-white mb-4">
          Related Records
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Cardiology Consultation Note",
              date: "2024-08-05",
              type: "Clinical Note",
            },
            {
              title: "Chest X-Ray",
              date: "2024-07-18",
              type: "Diagnostic Imaging",
            },
            { title: "Lipid Panel", date: "2024-10-22", type: "Lab Result" },
          ].map((related, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="p-4 rounded-xl bg-[#f8fafa] dark:bg-[#1a2a2a] border border-[#e1e8e8] dark:border-[#2a3a3a] hover:border-[#0e7c7b]/30 transition-colors cursor-pointer"
            >
              <p className="font-medium text-[#1a2e2e] dark:text-white">
                {related.title}
              </p>
              <p className="mt-1 text-sm text-[#5c7373] dark:text-[#8a9a9a]">
                {related.type}
              </p>
              <p className="mt-2 text-sm text-[#0e7c7b] dark:text-[#2dd4bf]">
                {formatDate(related.date, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-3"
      >
        <button className="px-5 py-3 rounded-xl bg-[#0e7c7b] text-white font-medium hover:bg-[#0a5f5e] transition-colors flex items-center gap-2">
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Share Securely
        </button>
        <button className="px-5 py-3 rounded-xl border border-[#e1e8e8] dark:border-[#2a3a3a] text-[#1a2e2e] dark:text-white font-medium hover:bg-[#f0f5f5] dark:hover:bg-[#2a3a3a] transition-colors flex items-center gap-2">
          <Mail className="h-4 w-4" aria-hidden="true" />
          Email to Provider
        </button>
        <button className="px-5 py-3 rounded-xl border border-[#e1e8e8] dark:border-[#2a3a3a] text-[#1a2e2e] dark:text-white font-medium hover:bg-[#f0f5f5] dark:hover:bg-[#2a3a3a] transition-colors flex items-center gap-2">
          <FileText className="h-4 w-4" aria-hidden="true" />
          Add to Care Plan
        </button>
      </motion.div>
    </div>
  );
}

function InfoCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="p-4 rounded-xl bg-[#f8fafa] dark:bg-[#1a2a2a] border border-[#e1e8e8] dark:border-[#2a3a3a]">
      <div className="flex items-center gap-2 text-sm text-[#5c7373] dark:text-[#8a9a9a]">
        <Icon className="h-4 w-4" aria-hidden="true" />
        <span>{label}</span>
      </div>
      <p className="mt-1 font-medium text-[#1a2e2e] dark:text-white">{value}</p>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-xl bg-[#f8fafa] dark:bg-[#1a2a2a] border border-[#e1e8e8] dark:border-[#2a3a3a]">
      <span className="text-sm text-[#5c7373] dark:text-[#8a9a9a]">
        {label}
      </span>
      <span className="font-medium text-[#1a2e2e] dark:text-white">
        {value}
      </span>
    </div>
  );
}

function AttachmentRow({
  attachment,
  onDownload,
  isDownloading,
}: {
  attachment: (typeof record.attachments)[0];
  onDownload: () => void;
  isDownloading: boolean;
}) {
  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return FileText;
      case "ZIP":
        return FileText;
      case "XLSX":
        return FileText;
      default:
        return FileText;
    }
  };
  const FileIcon = getFileIcon(attachment.type);

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-[#f8fafa] dark:bg-[#1a2a2a] border border-[#e1e8e8] dark:border-[#2a3a3a]">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0e7c7b]/10 text-[#0e7c7b] dark:text-[#2dd4bf]">
          <FileIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="font-medium text-[#1a2e2e] dark:text-white">
            {attachment.name}
          </p>
          <p className="text-sm text-[#5c7373] dark:text-[#8a9a9a]">
            {attachment.type} • {attachment.size} • {attachment.pages} page
            {attachment.pages !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="p-2 rounded-xl text-[#5c7373] hover:bg-[#e1e8e8] dark:hover:bg-[#2a3a3a] transition-colors disabled:opacity-50"
          aria-label="Download"
        >
          {isDownloading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Download className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
        <button
          className="p-2 rounded-xl text-[#5c7373] hover:bg-[#e1e8e8] dark:hover:bg-[#2a3a3a] transition-colors"
          aria-label="Preview"
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
