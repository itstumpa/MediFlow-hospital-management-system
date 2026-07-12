"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  Key, 
  Shield, 
  Globe, 
  Terminal, 
  Copy, 
  Trash2, 
  Plus, 
  Eye, 
  EyeOff, 
  Loader2, 
  Check, 
  AlertTriangle, 
  Info, 
  X, 
  CheckCircle, 
  Download
} from "lucide-react";
import { useState } from "react";
import { type APISettings, MOCK_API, type APIKey, type Webhook, type RateLimitRule, type GlobalRateLimit } from "./types";

interface APISettingsProps {
  initialData?: APISettings;
  onChange?: (data: Partial<APISettings>) => void;
}

export function APISettings({ initialData = MOCK_API, onChange }: APISettingsProps) {
  const [data, setData] = useState<APISettings>(initialData);
  const [showKey, setShowKey] = useState<string | null>(null);
  const [creatingKey, setCreatingKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyScopes, setNewKeyScopes] = useState<string[]>([]);
  const [testingWebhook, setTestingWebhook] = useState<string | null>(null);

  const handleChange = <K extends keyof APISettings>(field: K, value: APISettings[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
    onChange?.({ [field]: value });
  };

  const createAPIKey = async () => {
    if (!newKeyName.trim()) return;
    setCreatingKey(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const newKey: APIKey = {
      id: `key-${Date.now()}`,
      name: newKeyName,
      key: `mf_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      prefix: "mf_live_",
      scopes: newKeyScopes,
      createdAt: new Date().toISOString(),
      lastUsed: null,
      status: "active",
    };
    handleChange("keys", [...data.keys, newKey]);
    setNewKeyName("");
    setNewKeyScopes([]);
    setCreatingKey(false);
  };

  const revokeKey = (id: string) => {
    handleChange("keys", data.keys.map((k) => (k.id === id ? { ...k, status: "revoked" as const } : k)));
  };

  const deleteKey = (id: string) => {
    handleChange("keys", data.keys.filter((k) => k.id !== id));
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
  };

  const testWebhook = async (webhook: Webhook) => {
    setTestingWebhook(webhook.id);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setTestingWebhook(null);
  };

  const addWebhook = () => {
    const newWebhook: Webhook = {
      id: `webhook-${Date.now()}`,
      name: "",
      url: "",
      events: [],
      secret: `whsec_${Math.random().toString(36).substring(2, 15)}`,
      active: true,
      createdAt: new Date().toISOString(),
    };
    handleChange("webhooks", [...data.webhooks, newWebhook]);
  };

  const updateWebhook = (id: string, updates: Partial<Webhook>) => {
    handleChange("webhooks", data.webhooks.map((w) => (w.id === id ? { ...w, ...updates } : w)));
  };

  const deleteWebhook = (id: string) => {
    handleChange("webhooks", data.webhooks.filter((w) => w.id !== id));
  };

  const addRateLimitRule = () => {
    const newRule: RateLimitRule = {
      id: `rule-${Date.now()}`,
      endpoint: "/api/*",
      method: "ALL",
      requests: 100,
      window: 60,
      action: "throttle",
    };
    handleChange("rateLimits", [...data.rateLimits, newRule]);
  };

  const updateRateLimitRule = (id: string, updates: Partial<RateLimitRule>) => {
    handleChange("rateLimits", data.rateLimits.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };

  const deleteRateLimitRule = (id: string) => {
    handleChange("rateLimits", data.rateLimits.filter((r) => r.id !== id));
  };

  const SCOPES = [
    "patients:read",
    "patients:write",
    "appointments:read",
    "appointments:write",
    "doctors:read",
    "doctors:write",
    "departments:read",
    "departments:write",
    "messages:read",
    "messages:write",
    "analytics:read",
    "settings:read",
    "settings:write",
    "billing:read",
    "billing:write",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* API Keys */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">API Keys</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Manage API keys for programmatic access</p>
            </div>
          </div>
          <button
            onClick={() => setNewKeyName("")}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Create API Key
          </button>
        </div>

        {/* Create Key Modal */}
        {newKeyName !== undefined && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setNewKeyName(undefined)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Create New API Key</h4>
                <button
                  onClick={() => setNewKeyName(undefined)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Key Name</label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g., Mobile App, Third-party Integration"
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    autoFocus
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Scopes (Permissions)</label>
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                    {SCOPES.map((scope) => (
                      <label
                        key={scope}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs cursor-pointer transition-colors",
                          newKeyScopes.includes(scope)
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700",
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={newKeyScopes.includes(scope)}
                          onChange={(e) =>
                            setNewKeyScopes(e.target.checked
                              ? [...newKeyScopes, scope]
                              : newKeyScopes.filter((s) => s !== scope))
                          }
                          className="h-3 w-3 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        {scope}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setNewKeyName(undefined)}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={createAPIKey}
                  disabled={creatingKey || !newKeyName.trim() || newKeyScopes.length === 0}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creatingKey ? <Loader2 className="h-4 w-4 animate-spin" /> : <Key className="h-4 w-4" />}
                  {creatingKey ? "Creating..." : "Create Key"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* New Key Created - Show Key Once */}
        {showKey && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowKey(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="h-6 w-6" />
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white">API Key Created!</h4>
              </div>
              <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
                Copy this key now. You won't be able to see it again.
              </p>
              <div className="relative mb-4">
                <input
                  type="text"
                  readOnly
                  value={showKey}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-mono text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <button
                  onClick={() => copyKey(showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <Copy className="h-5 w-5" />
                </button>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowKey(null)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  I've Copied It
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* API Keys List */}
        <div className="dash-card p-6">
          {data.keys.length === 0 ? (
            <div className="text-center py-8">
              <Key className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600" />
              <h4 className="mt-3 font-medium text-slate-900 dark:text-white">No API keys yet</h4>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Create your first API key to start integrating</p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.keys.map((key) => (
                <motion.div
                  key={key.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border transition-colors",
                    key.status === "active"
                      ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/30 dark:bg-emerald-900/20"
                      : key.status === "revoked"
                      ? "border-red-200 bg-red-50/50 dark:border-red-900/30 dark:bg-red-900/20"
                      : "border-slate-200 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/50",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      key.status === "active" && "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
                      key.status === "revoked" && "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
                      key.status === "expired" && "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
                    )}>
                      <Key className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium text-slate-900 dark:text-white">{key.name}</h5>
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          key.status === "active" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                          key.status === "revoked" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                          key.status === "expired" && "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
                        )}>
                          {key.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Prefix: {key.prefix} • Created: {new Date(key.createdAt).toLocaleDateString()}
                        {key.lastUsed && ` • Last used: ${new Date(key.lastUsed).toLocaleDateString()}`}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {key.scopes.map((scope) => (
                          <span key={scope} className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                            {scope}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {key.status === "active" && (
                      <>
                        <button
                          onClick={() => setShowKey(key.key)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                          aria-label="Show key"
                        >
                          {showKey === key.key ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => copyKey(key.key)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                          aria-label="Copy key"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => revokeKey(key.id)}
                      disabled={key.status !== "active"}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Revoke key"
                    >
                      <Shield className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteKey(key.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
                      aria-label="Delete key"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Webhooks */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Webhooks</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Receive real-time notifications for events</p>
            </div>
          </div>
          <button
            onClick={addWebhook}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <Plus className="h-4 w-4" />
            Add Webhook
          </button>
        </div>

        <div className="dash-card p-6">
          {data.webhooks.length === 0 ? (
            <div className="text-center py-8">
              <Globe className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600" />
              <h4 className="mt-3 font-medium text-slate-900 dark:text-white">No webhooks configured</h4>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Add a webhook to receive event notifications</p>
            </div>
          ) : (
            <div className="space-y-4">
              {data.webhooks.map((webhook, index) => (
                <motion.div
                  key={webhook.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-slate-200 rounded-xl dark:border-slate-700"
                >
                  <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                          <Globe className="h-5 w-5" />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={webhook.name}
                            onChange={(e) => updateWebhook(webhook.id, { name: e.target.value })}
                            placeholder="Webhook name"
                            className="font-medium text-slate-900 dark:text-white bg-transparent border-none focus:outline-none focus:ring-0 text-sm"
                          />
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {webhook.events.length} events • {webhook.active ? "Active" : "Inactive"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={webhook.active}
                            onChange={(e) => updateWebhook(webhook.id, { active: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className={cn(
                            "w-11 h-6 rounded-full transition-colors",
                            webhook.active ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600",
                          )} />
                          <span className={cn(
                            "absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-lg transition-transform",
                            webhook.active ? "translate-x-5" : "translate-x-0",
                          )} />
                        </label>
                        <button
                          onClick={() => testWebhook(webhook)}
                          disabled={testingWebhook === webhook.id}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300 disabled:opacity-50"
                          aria-label="Test webhook"
                        >
                          {testingWebhook === webhook.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Terminal className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => deleteWebhook(webhook.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
                          aria-label="Delete webhook"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Webhook URL</label>
                      <input
                        type="url"
                        value={webhook.url}
                        onChange={(e) => updateWebhook(webhook.id, { url: e.target.value })}
                        placeholder="https://your-app.com/webhook"
                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Secret (for signature verification)</label>
                      <div className="relative">
                        <input
                          type="password"
                          readOnly
                          value={webhook.secret}
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-mono text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                        <button
                          onClick={() => navigator.clipboard.writeText(webhook.secret)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        >
                          <Copy className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Events to Subscribe</label>
                      <div className="flex flex-wrap gap-2">
                        {WEBHOOK_EVENTS.map((event) => (
                          <label
                            key={event.value}
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs cursor-pointer transition-colors",
                              webhook.events.includes(event.value)
                                ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700",
                            )}
                          >
                            <input
                              type="checkbox"
                              checked={webhook.events.includes(event.value)}
                              onChange={(e) =>
                                updateWebhook(webhook.id, {
                                  events: e.target.checked
                                    ? [...webhook.events, event.value]
                                    : webhook.events.filter((ev) => ev !== event.value),
                                })
                              }
                              className="h-3 w-3 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                            />
                            {event.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Rate Limiting */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Rate Limiting</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Configure API rate limits to prevent abuse</p>
          </div>
        </div>

        <div className="dash-card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-slate-900 dark:text-white">Global Rate Limit</h4>
            <ToggleSwitch
              checked={data.globalRateLimit.enabled}
              onChange={() => handleChange("globalRateLimit", { ...data.globalRateLimit, enabled: !data.globalRateLimit.enabled })}
            />
          </div>

          {data.globalRateLimit.enabled && (
            <div className="grid gap-4 sm:grid-cols-3 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Requests per Minute</label>
                <input
                  type="number"
                  value={data.globalRateLimit.requestsPerMinute}
                  onChange={(e) => handleChange("globalRateLimit", { ...data.globalRateLimit, requestsPerMinute: parseInt(e.target.value) })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Requests per Hour</label>
                <input
                  type="number"
                  value={data.globalRateLimit.requestsPerHour}
                  onChange={(e) => handleChange("globalRateLimit", { ...data.globalRateLimit, requestsPerHour: parseInt(e.target.value) })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Requests per Day</label>
                <input
                  type="number"
                  value={data.globalRateLimit.requestsPerDay}
                  onChange={(e) => handleChange("globalRateLimit", { ...data.globalRateLimit, requestsPerDay: parseInt(e.target.value) })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  min="1"
                />
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-slate-900 dark:text-white">Custom Rate Limit Rules</h4>
              <button
                onClick={addRateLimitRule}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                <Plus className="h-4 w-4" />
                Add Rule
              </button>
            </div>

            {data.rateLimits.length === 0 ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                No custom rules configured. Global rate limit applies to all endpoints.
              </div>
            ) : (
              <div className="space-y-3">
                {data.rateLimits.map((rule) => (
                  <motion.div
                    key={rule.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/50"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <input
                          type="text"
                          value={rule.endpoint}
                          onChange={(e) => updateRateLimitRule(rule.id, { endpoint: e.target.value })}
                          placeholder="/api/*"
                          className="flex-1 min-w-[150px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-mono text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                        <select
                          value={rule.method}
                          onChange={(e) => updateRateLimitRule(rule.id, { method: e.target.value as RateLimitRule["method"] })}
                          className="w-auto rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >
                          <option value="ALL">ALL</option>
                          <option value="GET">GET</option>
                          <option value="POST">POST</option>
                          <option value="PUT">PUT</option>
                          <option value="DELETE">DELETE</option>
                          <option value="PATCH">PATCH</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <span>Requests: {rule.requests}</span>
                        <span>Window: {rule.window}s</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
                          rule.action === "throttle" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                        )}>
                          {rule.action}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={rule.requests}
                        onChange={(e) => updateRateLimitRule(rule.id, { requests: parseInt(e.target.value) })}
                        min="1"
                        max="10000"
                        className="w-20 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 text-center focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                      <input
                        type="number"
                        value={rule.window}
                        onChange={(e) => updateRateLimitRule(rule.id, { window: parseInt(e.target.value) })}
                        min="1"
                        max="3600"
                        className="w-20 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 text-center focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                      <select
                        value={rule.action}
                        onChange={(e) => updateRateLimitRule(rule.id, { action: e.target.value as "throttle" | "block" })}
                        className="w-auto rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      >
                        <option value="throttle">Throttle</option>
                        <option value="block">Block</option>
                      </select>
                      <button
                        onClick={() => deleteRateLimitRule(rule.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
                        aria-label="Delete rule"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* API Documentation */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">API Documentation</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Access and share your API documentation</p>
          </div>
        </div>

        <div className="dash-card p-6 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <Terminal className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">OpenAPI Specification</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Download or view the OpenAPI 3.0 spec</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700">
                <Download className="h-4 w-4" />
                Download JSON
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700">
                <Globe className="h-4 w-4" />
                View Docs
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">Interactive API Explorer</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Test endpoints directly in the browser</p>
              </div>
            </div>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
              <Terminal className="h-4 w-4" />
              Open Explorer
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  return (
    <button
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900",
        checked ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600",
      )}
    >
      <motion.span
        animate={{ x: checked ? 22 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg"
      />
    </button>
  );
}

const WEBHOOK_EVENTS = [
  { value: "appointment.created", label: "Appointment Created" },
  { value: "appointment.updated", label: "Appointment Updated" },
  { value: "appointment.cancelled", label: "Appointment Cancelled" },
  { value: "patient.created", label: "Patient Created" },
  { value: "patient.updated", label: "Patient Updated" },
  { value: "message.received", label: "Message Received" },
  { value: "doctor.created", label: "Doctor Created" },
  { value: "department.created", label: "Department Created" },
  { value: "billing.invoice.created", label: "Invoice Created" },
  { value: "billing.payment.received", label: "Payment Received" },
];