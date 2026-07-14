"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Accessibility,
  AlertCircle,
  BarChart2,
  CheckCircle,
  Download,
  Eye,
  Globe,
  Loader2,
  Lock,
  MousePointer2,
  Save,
  Shield,
  Trash2,
  UserRound,
  Volume2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  type AllSettings,
  AppearanceSettings,
  DevicesCard,
  initialSettings,
  NotificationSettings,
  PreferenceSettings,
  SessionsCard,
  SettingsCard,
  type SettingsSection,
  SettingsSidebar,
} from ".";

const TOAST_DURATION = 3000;

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  const bgMap: Record<ToastType, string> = {
    success: "bg-[#16a34a]",
    error: "bg-[#dc2626]",
    info: "bg-[#0e7c7b]",
  };
  const iconMap: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle className="h-4 w-4 text-white" />,
    error: <AlertCircle className="h-4 w-4 text-white" />,
    info: <AlertCircle className="h-4 w-4 text-white" />,
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg text-white ${bgMap[toast.type]}`}
    >
      {iconMap[toast.type]}
      <span className="text-sm font-medium">{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        className="ml-2 p-0.5 rounded-lg hover:bg-white/20 transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("profile");
  const [settings, setSettings] = useState<AllSettings>(initialSettings);
  const [savedSettings, setSavedSettings] =
    useState<AllSettings>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [pendingSection, setPendingSection] = useState<SettingsSection | null>(
    null,
  );
  const toastIdRef = useRef(0);

  const hasUnsavedChanges =
    JSON.stringify(settings) !== JSON.stringify(savedSettings);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = `toast-${++toastIdRef.current}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_DURATION);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleSectionChange = useCallback(
    (section: SettingsSection) => {
      if (hasUnsavedChanges && section !== activeSection) {
        setPendingSection(section);
        setShowUnsavedDialog(true);
      } else {
        setActiveSection(section);
      }
    },
    [hasUnsavedChanges, activeSection],
  );

  const confirmSectionChange = useCallback(() => {
    if (pendingSection) {
      setSettings(savedSettings);
      setActiveSection(pendingSection);
      setPendingSection(null);
    }
    setShowUnsavedDialog(false);
  }, [pendingSection, savedSettings]);

  const cancelSectionChange = useCallback(() => {
    setPendingSection(null);
    setShowUnsavedDialog(false);
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSavedSettings(JSON.parse(JSON.stringify(settings)));
    setSaving(false);
    addToast("success", "Settings saved successfully");
  }, [settings, addToast]);

  const handleUpdate = useCallback(
    (section: keyof AllSettings, field: string, value: string | boolean) => {
      setSettings((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    },
    [],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        if (hasUnsavedChanges && !saving) handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasUnsavedChanges, saving, handleSave]);

  return (
    <div className="pb-8">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-[#1a2e2e] dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-[#5c7373] dark:text-[#8a9a9a]">
          Manage your account settings and preferences
        </p>
      </motion.div>

      {/* Sidebar + content */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:sticky lg:top-8 lg:self-start">
          <SettingsSidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            hasUnsavedChanges={hasUnsavedChanges}
          />
        </div>
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={
                { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] } as const
              }
            >
              {activeSection === "profile" && (
                <ProfileSection
                  settings={settings.profile}
                  onUpdate={(f, v) => handleUpdate("profile", f, v)}
                />
              )}
              {activeSection === "preferences" && (
                <PreferenceSettings
                  settings={settings.preferences}
                  onUpdate={(f, v) => handleUpdate("preferences", f, v)}
                />
              )}
              {activeSection === "notifications" && (
                <NotificationSettings
                  settings={settings.notifications}
                  onUpdate={(f, v) => handleUpdate("notifications", f, v)}
                />
              )}
              {activeSection === "language" && <LanguageSection />}
              {activeSection === "accessibility" && <AccessibilitySection />}
              {activeSection === "appearance" && (
                <AppearanceSettings
                  settings={settings.appearance}
                  onUpdate={(f, v) => handleUpdate("appearance", f, v)}
                />
              )}
              {activeSection === "sessions" && <SessionsCard />}
              {activeSection === "devices" && <DevicesCard />}
            </motion.div>
          </AnimatePresence>
          {(activeSection === "profile" ||
            activeSection === "preferences" ||
            activeSection === "notifications" ||
            activeSection === "appearance") && (
            <SaveBar
              onSave={handleSave}
              saving={saving}
              hasUnsavedChanges={hasUnsavedChanges}
            />
          )}
        </div>
      </div>

      {/* Toast notifications */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
          ))}
        </AnimatePresence>
      </div>

      {/* Unsaved changes dialog */}
      <AnimatePresence>
        {showUnsavedDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md rounded-2xl bg-white dark:bg-[#1a2a2a] border border-[#e1e8e8] dark:border-[#2a3a3a] p-6 shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-500/10 shrink-0">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#1a2e2e] dark:text-white">
                    Unsaved Changes
                  </h3>
                  <p className="mt-1 text-sm text-[#5c7373] dark:text-[#8a9a9a]">
                    You have unsaved changes. Switching sections will discard
                    them. Are you sure?
                  </p>
                  <div className="flex items-center justify-end gap-3 mt-6">
                    <button
                      onClick={cancelSectionChange}
                      className="px-4 py-2 rounded-xl border border-[#e1e8e8] dark:border-[#2a3a3a] text-[#1a2e2e] dark:text-white hover:bg-[#f0f5f5] dark:hover:bg-[#2a3a3a] transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmSectionChange}
                      className="px-4 py-2 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-colors text-sm font-medium"
                    >
                      Discard Changes
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Sub-components ───────────────────────────────────────────── */

function ProfileSection({
  settings,
  onUpdate,
}: {
  settings: { displayName: string; bio: string; email: string; phone: string };
  onUpdate: (field: string, value: string) => void;
}) {
  return (
    <div className="space-y-6">
      <SettingsCard title="Personal Information" icon={UserRound}>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Display Name">
            <input
              type="text"
              value={settings.displayName}
              onChange={(e) => onUpdate("displayName", e.target.value)}
              className="w-full rounded-xl border border-[#e1e8e8] dark:border-[#2a3a3a] bg-white dark:bg-[#1a2a2a] px-4 py-2.5 text-sm text-[#1a2e2e] dark:text-white placeholder:text-[#8a9a9a] focus:outline-none focus:ring-2 focus:ring-[#0e7c7b]/40 focus:border-[#0e7c7b] transition-colors"
            />
          </Field>
          <Field label="Bio">
            <input
              type="text"
              value={settings.bio}
              onChange={(e) => onUpdate("bio", e.target.value)}
              className="w-full rounded-xl border border-[#e1e8e8] dark:border-[#2a3a3a] bg-white dark:bg-[#1a2a2a] px-4 py-2.5 text-sm text-[#1a2e2e] dark:text-white placeholder:text-[#8a9a9a] focus:outline-none focus:ring-2 focus:ring-[#0e7c7b]/40 focus:border-[#0e7c7b] transition-colors"
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={settings.email}
              onChange={(e) => onUpdate("email", e.target.value)}
              className="w-full rounded-xl border border-[#e1e8e8] dark:border-[#2a3a3a] bg-white dark:bg-[#1a2a2a] px-4 py-2.5 text-sm text-[#1a2e2e] dark:text-white placeholder:text-[#8a9a9a] focus:outline-none focus:ring-2 focus:ring-[#0e7c7b]/40 focus:border-[#0e7c7b] transition-colors"
            />
          </Field>
          <Field label="Phone">
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => onUpdate("phone", e.target.value)}
              className="w-full rounded-xl border border-[#e1e8e8] dark:border-[#2a3a3a] bg-white dark:bg-[#1a2a2a] px-4 py-2.5 text-sm text-[#1a2e2e] dark:text-white placeholder:text-[#8a9a9a] focus:outline-none focus:ring-2 focus:ring-[#0e7c7b]/40 focus:border-[#0e7c7b] transition-colors"
            />
          </Field>
        </div>
      </SettingsCard>
      <PrivacySection />
    </div>
  );
}

function PrivacySection() {
  return (
    <div className="space-y-6">
      <SettingsCard title="Two-Factor Authentication" icon={Lock}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-[#1a2e2e] dark:text-white">
              Two-Factor Authentication
            </p>
            <p className="text-sm text-[#5c7373] dark:text-[#8a9a9a]">
              Add an extra layer of security to your account
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer ml-4 shrink-0">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0e7c7b]" />
          </label>
        </div>
      </SettingsCard>
      <SettingsCard title="Data Sharing" icon={Shield}>
        <div className="space-y-4">
          <ToggleRow
            label="Share with Providers"
            description="Allow healthcare providers to access your medical records"
            icon={UserRound}
          />
          <ToggleRow
            label="Data Analytics"
            description="Allow usage data to improve the platform"
            icon={BarChart2}
          />
        </div>
      </SettingsCard>
      <SettingsCard title="Data Management" icon={Download}>
        <div className="space-y-4">
          <ActionRow
            label="Download My Data"
            description="Export all your health data and records"
            icon={Download}
            buttonLabel="Export"
          />
          <ActionRow
            label="Delete Account"
            description="Permanently delete your account"
            icon={Trash2}
            buttonLabel="Delete"
            buttonClassName="bg-[#dc2626]/10 text-[#dc2626] hover:bg-[#dc2626]/20"
          />
        </div>
      </SettingsCard>
    </div>
  );
}

function LanguageSection() {
  return (
    <div className="space-y-6">
      <SettingsCard title="Language & Region" icon={Globe}>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Language">
            <select className="w-full rounded-xl border border-[#e1e8e8] dark:border-[#2a3a3a] bg-white dark:bg-[#1a2a2a] px-4 py-2.5 text-sm text-[#1a2e2e] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0e7c7b]/40 focus:border-[#0e7c7b] transition-colors">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </Field>
          <Field label="Region">
            <select className="w-full rounded-xl border border-[#e1e8e8] dark:border-[#2a3a3a] bg-white dark:bg-[#1a2a2a] px-4 py-2.5 text-sm text-[#1a2e2e] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0e7c7b]/40 focus:border-[#0e7c7b] transition-colors">
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
              <option>Australia</option>
            </select>
          </Field>
          <Field label="Measurement Unit">
            <select className="w-full rounded-xl border border-[#e1e8e8] dark:border-[#2a3a3a] bg-white dark:bg-[#1a2a2a] px-4 py-2.5 text-sm text-[#1a2e2e] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0e7c7b]/40 focus:border-[#0e7c7b] transition-colors">
              <option>Imperial (lbs, in)</option>
              <option>Metric (kg, cm)</option>
            </select>
          </Field>
          <Field label="Temperature Unit">
            <select className="w-full rounded-xl border border-[#e1e8e8] dark:border-[#2a3a3a] bg-white dark:bg-[#1a2a2a] px-4 py-2.5 text-sm text-[#1a2e2e] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0e7c7b]/40 focus:border-[#0e7c7b] transition-colors">
              <option>Fahrenheit (°F)</option>
              <option>Celsius (°C)</option>
            </select>
          </Field>
        </div>
      </SettingsCard>
    </div>
  );
}

function AccessibilitySection() {
  return (
    <div className="space-y-6">
      <SettingsCard title="Display" icon={Eye}>
        <div className="space-y-4">
          <ToggleRow
            label="High Contrast"
            description="Increase color contrast for better visibility"
            icon={Eye}
          />
          <ToggleRow
            label="Reduced Motion"
            description="Minimize animations and transitions"
            icon={Accessibility}
          />
          <ToggleRow
            label="Large Cursor"
            description="Enlarge the cursor for easier visibility"
            icon={MousePointer2}
          />
        </div>
      </SettingsCard>
      <SettingsCard title="Audio" icon={Volume2}>
        <div className="space-y-4">
          <ToggleRow
            label="Screen Reader Support"
            description="Optimize for screen reader compatibility"
            icon={Volume2}
          />
          <ToggleRow
            label="Sound Effects"
            description="Play sounds for notifications and actions"
            icon={Volume2}
          />
        </div>
      </SettingsCard>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-[#1a2e2e] dark:text-white">
        {label}
      </label>
      {children}
    </div>
  );
}

function ToggleRow({
  label,
  description,
  icon: Icon,
}: {
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-[#f8fafa] dark:bg-[#1a2a2a] border border-[#e1e8e8] dark:border-[#2a3a3a] shrink-0">
          <Icon className="h-4 w-4 text-[#5c7373] dark:text-[#8a9a9a]" />
        </div>
        <div>
          <p className="font-medium text-[#1a2e2e] dark:text-white">{label}</p>
          <p className="text-sm text-[#5c7373] dark:text-[#8a9a9a]">
            {description}
          </p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer ml-4 shrink-0">
        <input type="checkbox" className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0e7c7b]" />
      </label>
    </div>
  );
}

function ActionRow({
  label,
  description,
  icon: Icon,
  buttonLabel,
  buttonClassName,
}: {
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  buttonLabel: string;
  buttonClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-[#f8fafa] dark:bg-[#1a2a2a] border border-[#e1e8e8] dark:border-[#2a3a3a] shrink-0">
          <Icon className="h-4 w-4 text-[#5c7373] dark:text-[#8a9a9a]" />
        </div>
        <div>
          <p className="font-medium text-[#1a2e2e] dark:text-white">{label}</p>
          <p className="text-sm text-[#5c7373] dark:text-[#8a9a9a]">
            {description}
          </p>
        </div>
      </div>
      <button
        className={cn(
          "px-4 py-2 rounded-xl border border-[#e1e8e8] dark:border-[#2a3a3a] text-[#1a2e2e] dark:text-white hover:bg-[#f0f5f5] dark:hover:bg-[#2a3a3a] transition-colors text-sm font-medium shrink-0 ml-4",
          buttonClassName,
        )}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

function SaveBar({
  onSave,
  saving,
  hasUnsavedChanges,
}: {
  onSave: () => void;
  saving: boolean;
  hasUnsavedChanges: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky bottom-6 mt-8 rounded-2xl bg-white/90 dark:bg-[#1a2a2a]/90 backdrop-blur-xl border border-[#e1e8e8] dark:border-[#2a3a3a] p-4 flex items-center justify-between shadow-lg"
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-2 h-2 rounded-full transition-colors",
            hasUnsavedChanges ? "bg-amber-500" : "bg-[#16a34a]",
          )}
        />
        <span className="text-sm text-[#5c7373] dark:text-[#8a9a9a]">
          {hasUnsavedChanges ? "You have unsaved changes" : "All changes saved"}
        </span>
        {!hasUnsavedChanges && (
          <CheckCircle className="h-4 w-4 text-[#16a34a]" />
        )}
      </div>
      <button
        onClick={onSave}
        disabled={saving || !hasUnsavedChanges}
        className={cn(
          "px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2",
          hasUnsavedChanges
            ? "bg-[#0e7c7b] text-white hover:bg-[#0a5f5e]"
            : "bg-[#f0f5f5] dark:bg-[#2a3a3a] text-[#8a9a9a] cursor-not-allowed",
          "disabled:opacity-50",
        )}
      >
        {saving ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Saving...
          </>
        ) : (
          <>
            <Save className="h-4 w-4" /> Save Changes
          </>
        )}
      </button>
    </motion.div>
  );
}
