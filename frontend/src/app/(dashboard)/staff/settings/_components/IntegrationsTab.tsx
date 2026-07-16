"use client";

import { staggerItem } from "@/components/dashboard/staff/MotionVariants";
import { useToast } from "@/lib/hooks/useToast";
import { motion } from "framer-motion";
import {
  AlertCircle,
  BarChart,
  CheckCircle2,
  CreditCard,
  Database,
  ExternalLink,
  FileText,
  Loader2,
  Mail,
  MessageSquare,
  Plug,
} from "lucide-react";
import { useState } from "react";
import { availableIntegrations, type Integration } from "../_mock-data";

const categoryLabels: Record<Integration["category"], string> = {
  ehr: "EHR Systems",
  communication: "Communication",
  billing: "Billing & Payments",
  analytics: "Analytics",
  other: "Other",
};

const categoryIcons: Record<Integration["category"], React.ElementType> = {
  ehr: Database,
  communication: MessageSquare,
  billing: CreditCard,
  analytics: BarChart,
  other: Plug,
};

const iconMap: Record<string, React.ElementType> = {
  Database: Database,
  MessageSquare: MessageSquare,
  Mail: Mail,
  CreditCard: CreditCard,
  FileText: FileText,
  BarChart: BarChart,
  Plug: Plug,
  AlertCircle: AlertCircle,
  CheckCircle2: CheckCircle2,
  ExternalLink: ExternalLink,
  Loader2: Loader2,
};

export function IntegrationsTab() {
  const { toast } = useToast();
  const [connectingId, setConnectingId] = useState<string | null>(null);

  const handleConnect = async (integration: Integration) => {
    setConnectingId(integration.id);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({
        title: "Connected",
        description: `${integration.name} has been connected successfully.`,
        variant: "success",
      });
    } catch {
      toast({
        title: "Connection Failed",
        description: `Failed to connect ${integration.name}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setConnectingId(null);
    }
  };

  const handleDisconnect = async (integration: Integration) => {
    setConnectingId(integration.id);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Disconnected",
        description: `${integration.name} has been disconnected.`,
        variant: "success",
      });
    } catch {
      toast({
        title: "Error",
        description: `Failed to disconnect ${integration.name}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setConnectingId(null);
    }
  };

  const categories = [...new Set(availableIntegrations.map((i) => i.category))];

  return (
    <div className="space-y-6">
      {categories.map((category) => {
        const integrations = availableIntegrations.filter(
          (i) => i.category === category,
        );
        const CategoryIcon = categoryIcons[category];

        return (
          <motion.div
            key={category}
            variants={staggerItem}
            className="dash-card"
          >
            <div className="mb-4 flex items-center gap-2">
              <CategoryIcon
                className="h-5 w-5 text-primary"
                aria-hidden="true"
              />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {categoryLabels[category]}
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {integrations.map((integration) => (
                <motion.div
                  key={integration.id}
                  className="relative rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {(() => {
                        const IconComponent = iconMap[integration.icon] || Plug;
                        return (
                          <IconComponent
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        );
                      })()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-slate-900 dark:text-white truncate">
                        {integration.name}
                      </h4>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                        {integration.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        integration.connected
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {integration.connected ? (
                        <>
                          <CheckCircle2 className="h-3 w-3" />
                          Connected
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-3 w-3" />
                          Not Connected
                        </>
                      )}
                    </span>

                    {integration.configUrl && integration.connected && (
                      <a
                        href={integration.configUrl}
                        className="text-xs font-medium text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Configure <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>

                  <div className="mt-4 flex gap-2">
                    {integration.connected ? (
                      <button
                        onClick={() => handleDisconnect(integration)}
                        disabled={connectingId === integration.id}
                        className="flex-1 rounded-lg border border-rose-200 bg-white px-3 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-500/20 disabled:opacity-50 dark:border-rose-800 dark:bg-slate-800 dark:text-rose-400 dark:hover:bg-rose-900/20"
                      >
                        {connectingId === integration.id ? (
                          <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                        ) : (
                          "Disconnect"
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleConnect(integration)}
                        disabled={connectingId === integration.id}
                        className="flex-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                      >
                        {connectingId === integration.id ? (
                          <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                        ) : (
                          "Connect"
                        )}
                      </button>
                    )}

                    {integration.docsUrl && (
                      <a
                        href={integration.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                        title="Documentation"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="hidden sm:inline">Docs</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}

      {/* Coming Soon */}
      <motion.div variants={staggerItem} className="dash-card">
        <div className="flex items-center gap-2">
          <Plug className="h-5 w-5 text-slate-400" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Coming Soon
          </h3>
        </div>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          More integrations are being added regularly. Have a suggestion?
        </p>
        <div className="mt-4 flex gap-3">
          <a
            href="/feedback"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            target="_blank"
            rel="noopener noreferrer"
          >
            Request Integration
          </a>
          <a
            href="/integrations/roadmap"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Roadmap
          </a>
        </div>
      </motion.div>
    </div>
  );
}
