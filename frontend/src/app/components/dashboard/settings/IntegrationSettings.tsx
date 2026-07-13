"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Key, Loader2, Plug, RefreshCw, WifiOff } from "lucide-react";
import { useState } from "react";
import {
  IntegrationConfig,
  IntegrationSettings,
  MOCK_INTEGRATIONS,
} from "./types";

interface IntegrationsSettingsProps {
  initialData?: IntegrationSettings;
  onChange?: (data: Partial<IntegrationSettings>) => void;
}

const INTEGRATIONS = [
  {
    id: "googleCalendar",
    label: "Google Calendar",
    description: "Sync appointments with Google Calendar",
    icon: "Calendar",
    category: "Calendar",
  },
  {
    id: "zoom",
    label: "Zoom",
    description: "Video consultations and telemedicine",
    icon: "Video",
    category: "Video",
  },
  {
    id: "stripe",
    label: "Stripe",
    description: "Payment processing for appointments",
    icon: "CreditCard",
    category: "Payments",
  },
  {
    id: "paypal",
    label: "PayPal",
    description: "Alternative payment gateway",
    icon: "PayPal",
    category: "Payments",
  },
  {
    id: "twilio",
    label: "Twilio",
    description: "SMS notifications and OTP verification",
    icon: "MessageSquare",
    category: "Messaging",
  },
  {
    id: "googleMaps",
    label: "Google Maps",
    description: "Location services and directions",
    icon: "MapPin",
    category: "Location",
  },
  {
    id: "cloudinary",
    label: "Cloudinary",
    description: "Image and document management",
    icon: "Image",
    category: "Media",
  },
] as const;

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar: ({ className }) => (
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
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5a2.25 2.25 0 012.25 2.25v11.25"
      />
    </svg>
  ),
  Video: ({ className }) => (
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
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
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
        d="M3.75 16.5h16.5m-16.5-4.5h16.5m-16.5-4.5h16.5"
      />
    </svg>
  ),
  PayPal: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 7.22v9.56c0 .9-.73 1.63-1.63 1.63h-9.59v-2.87h7.19c.88 0 1.6-.72 1.6-1.6V8.82c0-.88-.72-1.6-1.6-1.6h-7.19V4.38h9.59c.9 0 1.63.73 1.63 1.63zm-1.63 11.19H4.63c-.9 0-1.63-.73-1.63-1.63V7.22c0-.9.73-1.63 1.63-1.63h14.74c.9 0 1.63.73 1.63 1.63v9.56c0 .9-.73 1.63-1.63 1.63z" />
    </svg>
  ),
  MessageSquare: ({ className }) => (
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
        d="M21 15.75a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25h13.5a2.25 2.25 0 012.25 2.25v9z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 18.75h.008v.008H10.5v-.008zM15 18.75h.008v.008H15v-.008z"
      />
    </svg>
  ),
  MapPin: ({ className }) => (
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
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  ),
  Image: ({ className }) => (
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
        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  ),
};

export function IntegrationsSettings({
  initialData = MOCK_INTEGRATIONS,
  onChange,
}: IntegrationsSettingsProps) {
  const [data, setData] = useState<IntegrationSettings>(initialData);
  const [testing, setTesting] = useState<string | null>(null);

  const handleChange = <K extends keyof IntegrationSettings>(
    field: K,
    value: IntegrationSettings[K],
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
    onChange?.({ [field]: value });
  };

  const handleIntegrationChange = (
    id: keyof IntegrationSettings,
    field: keyof IntegrationConfig,
    value: any,
  ) => {
    setData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
    onChange?.({ [id]: { ...data[id], [field]: value } });
  };

  const testConnection = async (id: keyof IntegrationSettings) => {
    setTesting(id);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setTesting(null);
    handleIntegrationChange(id, "status", "connected");
    handleIntegrationChange(id, "connected", true);
  };

  const disconnect = (id: keyof IntegrationSettings) => {
    handleIntegrationChange(id, "status", "disconnected");
    handleIntegrationChange(id, "connected", false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
          <Plug className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Integrations
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Connect third-party services to extend functionality
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {INTEGRATIONS.map((integration) => {
          const config = data[
            integration.id as keyof IntegrationSettings
          ] as IntegrationConfig;
          const IconComponent = ICON_MAP[integration.icon];
          const isConnected = config?.connected ?? false;
          const isTesting = testing === integration.id;

          return (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: INTEGRATIONS.indexOf(integration) * 0.05 }}
              className="dash-card p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0",
                      config.connected
                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
                    )}
                  >
                    {IconComponent && <IconComponent className="h-6 w-6" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                        {integration.label}
                      </h3>
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          config.connected
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
                        )}
                      >
                        {config.connected ? "Connected" : "Disconnected"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 truncate">
                      {integration.description}
                    </p>
                    <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                      Category: {integration.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.enabled}
                      onChange={(e) =>
                        handleIntegrationChange(
                          integration.id as keyof IntegrationSettings,
                          "enabled",
                          e.target.checked,
                        )
                      }
                      className="sr-only peer"
                    />
                    <div
                      className={cn(
                        "w-11 h-6 rounded-full transition-colors",
                        config.enabled
                          ? "bg-blue-600"
                          : "bg-slate-300 dark:bg-slate-600",
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                          config.enabled ? "translate-x-5" : "translate-x-1",
                        )}
                      />
                    </div>
                  </label>

                  {config.connected && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          testConnection(
                            integration.id as keyof IntegrationSettings,
                          )
                        }
                        disabled={isTesting}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 disabled:opacity-50"
                      >
                        {isTesting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <RefreshCw className="h-4 w-4" />
                            Test
                          </>
                        )}
                      </button>
                      <button
                        onClick={() =>
                          disconnect(
                            integration.id as keyof IntegrationSettings,
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:bg-slate-800 dark:text-red-400 dark:hover:bg-red-950/30"
                      >
                        <WifiOff className="h-4 w-4" />
                        Disconnect
                      </button>
                    </div>
                  )}

                  {!config.connected && config.enabled && (
                    <button
                      onClick={() =>
                        handleIntegrationChange(
                          integration.id as keyof IntegrationSettings,
                          "connected",
                          true,
                        )
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      <Key className="h-4 w-4" />
                      Connect
                    </button>
                  )}
                </div>
              </div>

              {config.connected && config.lastSync && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Last synced: {new Date(config.lastSync).toLocaleString()}
                  </p>
                </div>
              )}

              {!config.connected && config.enabled && (
                <div className="mt-4 space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Configuration
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {integration.id === "googleCalendar" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            API Key
                          </label>
                          <input
                            type="text"
                            value={config.apiKey}
                            onChange={(e) =>
                              handleIntegrationChange(
                                integration.id as keyof IntegrationSettings,
                                "apiKey",
                                e.target.value,
                              )
                            }
                            placeholder="Enter API key"
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Secret Key
                          </label>
                          <input
                            type="password"
                            value={config.secretKey}
                            onChange={(e) =>
                              handleIntegrationChange(
                                integration.id as keyof IntegrationSettings,
                                "secretKey",
                                e.target.value,
                              )
                            }
                            placeholder="Enter secret key"
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                          />
                        </div>
                      </>
                    )}
                    {integration.id === "zoom" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            API Key
                          </label>
                          <input
                            type="text"
                            value={config.apiKey}
                            onChange={(e) =>
                              handleIntegrationChange(
                                integration.id as keyof IntegrationSettings,
                                "apiKey",
                                e.target.value,
                              )
                            }
                            placeholder="Enter API key"
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            API Secret
                          </label>
                          <input
                            type="password"
                            value={config.secretKey}
                            onChange={(e) =>
                              handleIntegrationChange(
                                integration.id as keyof IntegrationSettings,
                                "secretKey",
                                e.target.value,
                              )
                            }
                            placeholder="Enter API secret"
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                          />
                        </div>
                      </>
                    )}
                    {integration.id === "stripe" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Publishable Key
                          </label>
                          <input
                            type="text"
                            value={config.publishableKey}
                            onChange={(e) =>
                              handleIntegrationChange(
                                integration.id as keyof IntegrationSettings,
                                "publishableKey",
                                e.target.value,
                              )
                            }
                            placeholder="pk_live_..."
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Secret Key
                          </label>
                          <input
                            type="password"
                            value={config.secretKey}
                            onChange={(e) =>
                              handleIntegrationChange(
                                integration.id as keyof IntegrationSettings,
                                "secretKey",
                                e.target.value,
                              )
                            }
                            placeholder="sk_live_..."
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                          />
                        </div>
                      </>
                    )}
                    {integration.id === "paypal" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Client ID
                          </label>
                          <input
                            type="text"
                            value={config.clientId}
                            onChange={(e) =>
                              handleIntegrationChange(
                                integration.id as keyof IntegrationSettings,
                                "clientId",
                                e.target.value,
                              )
                            }
                            placeholder="Enter Client ID"
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Secret
                          </label>
                          <input
                            type="password"
                            value={config.secret}
                            onChange={(e) =>
                              handleIntegrationChange(
                                integration.id as keyof IntegrationSettings,
                                "secret",
                                e.target.value,
                              )
                            }
                            placeholder="Enter secret"
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                          />
                        </div>
                      </>
                    )}
                    {integration.id === "twilio" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Account SID
                          </label>
                          <input
                            type="text"
                            value={config.accountSid}
                            onChange={(e) =>
                              handleIntegrationChange(
                                integration.id as keyof IntegrationSettings,
                                "accountSid",
                                e.target.value,
                              )
                            }
                            placeholder="AC..."
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Auth Token
                          </label>
                          <input
                            type="password"
                            value={config.authToken}
                            onChange={(e) =>
                              handleIntegrationChange(
                                integration.id as keyof IntegrationSettings,
                                "authToken",
                                e.target.value,
                              )
                            }
                            placeholder="Enter auth token"
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            value={config.phoneNumber}
                            onChange={(e) =>
                              handleIntegrationChange(
                                integration.id as keyof IntegrationSettings,
                                "phoneNumber",
                                e.target.value,
                              )
                            }
                            placeholder="+15551234567"
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                          />
                        </div>
                      </>
                    )}
                    {integration.id === "googleMaps" && (
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          API Key
                        </label>
                        <input
                          type="text"
                          value={config.apiKey}
                          onChange={(e) =>
                            handleIntegrationChange(
                              integration.id as keyof IntegrationSettings,
                              "apiKey",
                              e.target.value,
                            )
                          }
                          placeholder="AIza..."
                          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                    )}
                    {integration.id === "cloudinary" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Cloud Name
                          </label>
                          <input
                            type="text"
                            value={config.cloudName}
                            onChange={(e) =>
                              handleIntegrationChange(
                                integration.id as keyof IntegrationSettings,
                                "cloudName",
                                e.target.value,
                              )
                            }
                            placeholder="Enter cloud name"
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            API Key
                          </label>
                          <input
                            type="text"
                            value={config.apiKey}
                            onChange={(e) =>
                              handleIntegrationChange(
                                integration.id as keyof IntegrationSettings,
                                "apiKey",
                                e.target.value,
                              )
                            }
                            placeholder="Enter API key"
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            API Secret
                          </label>
                          <input
                            type="password"
                            value={config.apiSecret}
                            onChange={(e) =>
                              handleIntegrationChange(
                                integration.id as keyof IntegrationSettings,
                                "apiSecret",
                                e.target.value,
                              )
                            }
                            placeholder="Enter API secret"
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Configuration Details */}
      <div className="dash-card p-6">
        <h4 className="mb-4 font-medium text-slate-900 dark:text-white">
          Integration Configuration
        </h4>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INTEGRATIONS.map((integration) => {
            const config = data[
              integration.id as keyof IntegrationSettings
            ] as IntegrationConfig;
            const IconComponent = ICON_MAP[integration.icon];
            return (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "rounded-xl border p-4 transition-all",
                  config?.connected
                    ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900/30 dark:bg-emerald-900/20"
                    : "border-slate-200 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/50",
                )}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h5 className="font-medium text-slate-900 dark:text-white">
                    {integration.label}
                  </h5>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">
                      Status
                    </span>
                    <span
                      className={cn(
                        "font-medium",
                        config?.connected
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-slate-600 dark:text-slate-400",
                      )}
                    >
                      {config?.connected ? "Connected" : "Disconnected"}
                    </span>
                  </div>
                  {config?.apiKey && (
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">
                        API Key
                      </span>
                      <span className="font-mono font-medium text-slate-900 dark:text-white">
                        {config.apiKey}
                      </span>
                    </div>
                  )}
                  {config?.lastSync && (
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">
                        Last Sync
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {new Date(config.lastSync).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
