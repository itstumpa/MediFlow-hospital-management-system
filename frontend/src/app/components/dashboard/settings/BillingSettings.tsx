"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  CreditCard,
  DollarSign,
  Receipt,
  Users,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  Plus,
  Trash2,
  Edit,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  HardDrive,
  User,
  Clock,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import {
  BillingSettings,
  MOCK_BILLING,
  SubscriptionPlan,
  Invoice,
  PaymentMethod,
  BillingContact,
} from "./types";

interface BillingSettingsProps {
  initialData?: BillingSettings;
  onChange?: (data: Partial<BillingSettings>) => void;
}

const PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "month",
    features: [
      "Up to 50 patients",
      "Basic appointment scheduling",
      "Email support",
      "1 GB storage",
    ],
    limits: { patients: 50, appointments: 200, storage: 1, users: 3 },
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: 99,
    interval: "month",
    features: [
      "Up to 500 patients",
      "Advanced scheduling & reminders",
      "Priority email & chat support",
      "10 GB storage",
      "Custom branding",
      "Analytics dashboard",
    ],
    limits: { patients: 500, appointments: 2000, storage: 10, users: 10 },
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 299,
    interval: "month",
    features: [
      "Unlimited patients",
      "Full feature access",
      "24/7 phone & dedicated support",
      "Unlimited storage",
      "SSO & advanced security",
      "Custom integrations",
      "SLA guarantee",
    ],
    limits: { patients: -1, appointments: -1, storage: -1, users: -1 },
    popular: false,
  },
];

export function BillingSettings({
  initialData = MOCK_BILLING,
  onChange,
}: BillingSettingsProps) {
  const [data, setData] = useState<BillingSettings>(initialData);
  const [activeTab, setActiveTab] = useState<
    "subscription" | "payment" | "invoices" | "contacts"
  >("subscription");
  const [changingPlan, setChangingPlan] = useState<string | null>(null);

  const handleChange = <K extends keyof BillingSettings>(
    field: K,
    value: BillingSettings[K],
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
    onChange?.({ [field]: value });
  };

  const changePlan = async (planId: string) => {
    setChangingPlan(planId);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    handleChange("subscription", {
      ...data.subscription,
      plan: planId,
      status: "active",
    });
    setChangingPlan(null);
  };

  const cancelSubscription = async () => {
    if (
      !confirm(
        "Are you sure you want to cancel your subscription? This will downgrade you to the Free plan.",
      )
    )
      return;
    handleChange("subscription", {
      ...data.subscription,
      status: "cancelled",
      plan: "free",
    });
  };

  const addPaymentMethod = async () => {
    // Simulate adding payment method
    const newMethod: PaymentMethod = {
      id: `pm-${Date.now()}`,
      type: "card",
      brand: "Visa",
      last4: "4242",
      expiryMonth: 12,
      expiryYear: 2027,
      isDefault: !data.paymentMethods.some((m) => m.isDefault),
    };
    handleChange("paymentMethods", [...data.paymentMethods, newMethod]);
  };

  const setDefaultPaymentMethod = (id: string) => {
    handleChange(
      "paymentMethods",
      data.paymentMethods.map((m) => ({ ...m, isDefault: m.id === id })),
    );
  };

  const removePaymentMethod = (id: string) => {
    if (!confirm("Remove this payment method?")) return;
    handleChange(
      "paymentMethods",
      data.paymentMethods.filter((m) => m.id !== id),
    );
  };

  const addBillingContact = () => {
    const newContact: BillingContact = {
      id: `contact-${Date.now()}`,
      name: "",
      email: "",
      role: "billing",
      notifications: true,
    };
    handleChange("contacts", [...data.contacts, newContact]);
  };

  const updateBillingContact = (
    id: string,
    updates: Partial<BillingContact>,
  ) => {
    handleChange(
      "contacts",
      data.contacts.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    );
  };

  const removeBillingContact = (id: string) => {
    handleChange(
      "contacts",
      data.contacts.filter((c) => c.id !== id),
    );
  };

  const downloadInvoice = (invoice: Invoice) => {
    // Simulate download
    alert(`Downloading invoice ${invoice.number}...`);
  };

  const currentPlan =
    PLANS.find((p) => p.id === data.subscription.plan) || PLANS[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Tab Navigation */}
      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
        {[
          { id: "subscription", label: "Subscription", icon: CreditCard },
          { id: "payment", label: "Payment Methods", icon: CreditCard },
          { id: "invoices", label: "Invoices", icon: Receipt },
          { id: "contacts", label: "Billing Contacts", icon: Users },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Subscription Tab */}
      {activeTab === "subscription" && (
        <motion.div
          key="subscription"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Current Plan */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Current Plan
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Manage your subscription and billing cycle
                </p>
              </div>
            </div>

            <div
              className={cn(
                "relative rounded-2xl p-6 overflow-hidden",
                currentPlan.popular
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700",
              )}
            >
              {currentPlan.popular && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium">
                  Most Popular
                </div>
              )}
              <div className="flex items-start justify-between">
                <div>
                  <h4
                    className={cn(
                      "text-2xl font-bold",
                      currentPlan.popular
                        ? "text-white"
                        : "text-slate-900 dark:text-white",
                    )}
                  >
                    {currentPlan.name}
                  </h4>
                  <p
                    className={cn(
                      "mt-1 text-sm",
                      currentPlan.popular
                        ? "text-blue-100"
                        : "text-slate-500 dark:text-slate-400",
                    )}
                  >
                    {data.subscription.status === "active"
                      ? "Active"
                      : data.subscription.status}
                    {data.subscription.cancelAtPeriodEnd &&
                      " • Cancels at period end"}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={cn(
                      "text-4xl font-bold",
                      currentPlan.popular
                        ? "text-white"
                        : "text-slate-900 dark:text-white",
                    )}
                  >
                    ${currentPlan.price}
                    <span
                      className={cn(
                        "text-lg font-normal",
                        currentPlan.popular
                          ? "text-blue-100"
                          : "text-slate-500 dark:text-slate-400",
                      )}
                    >
                      /{currentPlan.interval}
                    </span>
                  </p>
                  <p
                    className={cn(
                      "text-sm",
                      currentPlan.popular
                        ? "text-blue-100"
                        : "text-slate-500 dark:text-slate-400",
                    )}
                  >
                    Next billing:{" "}
                    {new Date(
                      data.subscription.currentPeriodEnd,
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <LimitCard
                  label="Patients"
                  value={
                    currentPlan.limits.patients === -1
                      ? "Unlimited"
                      : currentPlan.limits.patients
                  }
                  icon={Users}
                  color={currentPlan.popular ? "white" : "blue"}
                />
                <LimitCard
                  label="Appointments/mo"
                  value={
                    currentPlan.limits.appointments === -1
                      ? "Unlimited"
                      : currentPlan.limits.appointments.toLocaleString()
                  }
                  icon={Calendar}
                  color={currentPlan.popular ? "white" : "purple"}
                />
                <LimitCard
                  label="Storage"
                  value={
                    currentPlan.limits.storage === -1
                      ? "Unlimited"
                      : `${currentPlan.limits.storage} GB`
                  }
                  icon={HardDrive}
                  color={currentPlan.popular ? "white" : "emerald"}
                />
                <LimitCard
                  label="Team Members"
                  value={
                    currentPlan.limits.users === -1
                      ? "Unlimited"
                      : currentPlan.limits.users
                  }
                  icon={Users}
                  color={currentPlan.popular ? "white" : "amber"}
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {data.subscription.status === "active" &&
                  !data.subscription.cancelAtPeriodEnd && (
                    <button
                      onClick={() =>
                        handleChange("subscription", {
                          ...data.subscription,
                          cancelAtPeriodEnd: true,
                        })
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-red-300 bg-white/10 px-4 py-2 text-sm font-medium text-red-100 hover:bg-white/20"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      Cancel at Period End
                    </button>
                  )}
                {data.subscription.cancelAtPeriodEnd && (
                  <button
                    onClick={() =>
                      handleChange("subscription", {
                        ...data.subscription,
                        cancelAtPeriodEnd: false,
                      })
                    }
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Resume Subscription
                  </button>
                )}
                <button
                  onClick={cancelSubscription}
                  disabled={data.subscription.plan === "free"}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white/10 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/20 disabled:opacity-50"
                >
                  <XCircle className="h-4 w-4" />
                  Cancel Immediately
                </button>
              </div>
            </div>
          </section>

          {/* Available Plans */}
          <section className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Available Plans
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Upgrade or downgrade your plan at any time
            </p>

            <div className="grid gap-6 lg:grid-cols-3">
              {PLANS.map((plan) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: PLANS.indexOf(plan) * 0.1 }}
                  className={cn(
                    "relative rounded-2xl p-6 transition-all",
                    plan.popular
                      ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl"
                      : "bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700",
                    data.subscription.plan === plan.id &&
                      "ring-2 ring-blue-500 dark:ring-blue-400",
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-blue-600 text-xs font-medium">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h4
                      className={cn(
                        "text-xl font-bold",
                        plan.popular
                          ? "text-white"
                          : "text-slate-900 dark:text-white",
                      )}
                    >
                      {plan.name}
                    </h4>
                    <p
                      className={cn(
                        "mt-2 text-4xl font-bold",
                        plan.popular
                          ? "text-white"
                          : "text-slate-900 dark:text-white",
                      )}
                    >
                      ${plan.price}
                      <span
                        className={cn(
                          "text-lg font-normal",
                          plan.popular
                            ? "text-blue-100"
                            : "text-slate-500 dark:text-slate-400",
                        )}
                      >
                        /{plan.interval}
                      </span>
                    </p>
                  </div>

                  <ul className="mb-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className={cn(
                          "flex items-start gap-2 text-sm",
                          plan.popular
                            ? "text-blue-100"
                            : "text-slate-600 dark:text-slate-400",
                        )}
                      >
                        <CheckCircle
                          className={cn(
                            "h-5 w-5 flex-shrink-0 mt-0.5",
                            plan.popular
                              ? "text-emerald-300"
                              : "text-emerald-500",
                          )}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => changePlan(plan.id)}
                    disabled={
                      data.subscription.plan === plan.id ||
                      changingPlan === plan.id
                    }
                    className={cn(
                      "w-full rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                      plan.popular
                        ? "bg-white text-blue-600 hover:bg-blue-50"
                        : "bg-blue-600 text-white hover:bg-blue-700",
                      data.subscription.plan === plan.id &&
                        "bg-slate-100 text-slate-500 cursor-not-allowed dark:bg-slate-700",
                      changingPlan === plan.id && "opacity-75 cursor-wait",
                    )}
                  >
                    {changingPlan === plan.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : data.subscription.plan === plan.id ? (
                      "Current Plan"
                    ) : plan.id === "free" ? (
                      "Downgrade to Free"
                    ) : data.subscription.plan === "free" ? (
                      "Upgrade Now"
                    ) : data.subscription.plan === "professional" &&
                      plan.id === "enterprise" ? (
                      "Upgrade to Enterprise"
                    ) : data.subscription.plan === "enterprise" &&
                      plan.id === "professional" ? (
                      "Downgrade to Professional"
                    ) : (
                      "Select Plan"
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Billing Cycle */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <Settings className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Billing Cycle
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Choose your preferred billing frequency
                </p>
              </div>
            </div>

            <div className="dash-card p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <BillingCycleOption
                  interval="month"
                  label="Monthly"
                  description="Billed every month"
                  price={currentPlan.price}
                  selected={data.subscription.interval === "month"}
                  onSelect={() =>
                    handleChange("subscription", {
                      ...data.subscription,
                      interval: "month",
                    })
                  }
                />
                <BillingCycleOption
                  interval="year"
                  label="Yearly"
                  description="Billed annually - save 20%"
                  price={Math.round(currentPlan.price * 12 * 0.8)}
                  selected={data.subscription.interval === "year"}
                  onSelect={() =>
                    handleChange("subscription", {
                      ...data.subscription,
                      interval: "year",
                    })
                  }
                  savings="Save 20%"
                />
              </div>
            </div>
          </section>
        </motion.div>
      )}

      {/* Payment Methods Tab */}
      {activeTab === "payment" && (
        <motion.div
          key="payment"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Payment Methods
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Manage your saved payment methods
                  </p>
                </div>
              </div>
              <button
                onClick={addPaymentMethod}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                Add Payment Method
              </button>
            </div>

            <div className="dash-card p-6">
              {data.paymentMethods.length === 0 ? (
                <div className="text-center py-8">
                  <CreditCard className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600" />
                  <h4 className="mt-3 font-medium text-slate-900 dark:text-white">
                    No payment methods
                  </h4>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Add a payment method to enable automatic billing
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {data.paymentMethods.map((method) => (
                    <motion.div
                      key={method.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl border transition-colors",
                        method.isDefault
                          ? "border-blue-200 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-900/20"
                          : "border-slate-200 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/50",
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-xl",
                            method.isDefault
                              ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
                          )}
                        >
                          <CreditCard className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-900 dark:text-white capitalize">
                              {method.type}
                            </span>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              {method.brand}
                            </span>
                            <span className="font-mono text-slate-900 dark:text-white">
                              •••• {method.last4}
                            </span>
                            {method.isDefault && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Expires{" "}
                            {method.expiryMonth.toString().padStart(2, "0")}/
                            {method.expiryYear.toString().slice(-2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!method.isDefault && (
                          <button
                            onClick={() => setDefaultPaymentMethod(method.id)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                          >
                            Make Default
                          </button>
                        )}
                        <button
                          onClick={() => removePaymentMethod(method.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
                          aria-label="Remove payment method"
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

          {/* Auto-billing Settings */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                <Settings className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Auto-billing Settings
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Configure automatic payment behavior
                </p>
              </div>
            </div>

            <div className="dash-card p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white">
                    Auto-pay Enabled
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Automatically charge the default payment method on invoice
                    due date
                  </p>
                </div>
                <ToggleSwitch
                  checked={data.autoPayEnabled}
                  onChange={() =>
                    handleChange("autoPayEnabled", !data.autoPayEnabled)
                  }
                />
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-700 space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Retry Failed Payments
                  </label>
                  <select
                    value={data.paymentRetryAttempts}
                    onChange={(e) =>
                      handleChange(
                        "paymentRetryAttempts",
                        parseInt(e.target.value),
                      )
                    }
                    className="w-full max-w-xs rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value={0}>Don't retry</option>
                    <option value={1}>1 retry</option>
                    <option value={2}>2 retries</option>
                    <option value={3}>3 retries</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Retry Interval
                  </label>
                  <select
                    value={data.paymentRetryInterval}
                    onChange={(e) =>
                      handleChange(
                        "paymentRetryInterval",
                        parseInt(e.target.value),
                      )
                    }
                    className="w-full max-w-xs rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value={1}>1 day</option>
                    <option value={3}>3 days</option>
                    <option value={7}>7 days</option>
                  </select>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.sendPaymentReceipts}
                    onChange={(e) =>
                      handleChange("sendPaymentReceipts", e.target.checked)
                    }
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Send payment receipts via email
                  </span>
                </label>
              </div>
            </div>
          </section>
        </motion.div>
      )}

      {/* Invoices Tab */}
      {activeTab === "invoices" && (
        <motion.div
          key="invoices"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  <Receipt className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Invoices
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    View and download your billing history
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700">
                  <Download className="h-4 w-4" />
                  Export All
                </button>
              </div>
            </div>

            <div className="dash-card p-6">
              {data.invoices.length === 0 ? (
                <div className="text-center py-8">
                  <Receipt className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600" />
                  <h4 className="mt-3 font-medium text-slate-900 dark:text-white">
                    No invoices yet
                  </h4>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Invoices will appear here after your first billing cycle
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.invoices.map((invoice) => (
                    <motion.div
                      key={invoice.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/50"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-xl",
                            invoice.status === "paid" &&
                              "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
                            invoice.status === "pending" &&
                              "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
                            invoice.status === "failed" &&
                              "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
                            invoice.status === "refunded" &&
                              "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
                          )}
                        >
                          {invoice.status === "paid" && (
                            <CheckCircle className="h-5 w-5" />
                          )}
                          {invoice.status === "pending" && (
                            <Clock className="h-5 w-5" />
                          )}
                          {invoice.status === "failed" && (
                            <XCircle className="h-5 w-5" />
                          )}
                          {invoice.status === "refunded" && (
                            <RotateCcw className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-900 dark:text-white">
                              {invoice.number}
                            </span>
                            <span
                              className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                invoice.status === "paid" &&
                                  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                                invoice.status === "pending" &&
                                  "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                                invoice.status === "failed" &&
                                  "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                                invoice.status === "refunded" &&
                                  "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
                              )}
                            >
                              {invoice.status}
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {new Date(invoice.date).toLocaleDateString()} •{" "}
                            {invoice.plan} Plan
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-lg font-semibold text-slate-900 dark:text-white">
                          ${invoice.amount.toFixed(2)}
                        </span>
                        <button
                          onClick={() => downloadInvoice(invoice)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </motion.div>
      )}

      {/* Billing Contacts Tab */}
      {activeTab === "contacts" && (
        <motion.div
          key="contacts"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Billing Contacts
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Manage who receives billing notifications
                  </p>
                </div>
              </div>
              <button
                onClick={addBillingContact}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                Add Contact
              </button>
            </div>

            <div className="dash-card p-6">
              {data.contacts.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600" />
                  <h4 className="mt-3 font-medium text-slate-900 dark:text-white">
                    No billing contacts
                  </h4>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Add contacts to receive invoice and payment notifications
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {data.contacts.map((contact) => (
                    <motion.div
                      key={contact.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <input
                            type="text"
                            value={contact.name}
                            onChange={(e) =>
                              updateBillingContact(contact.id, {
                                name: e.target.value,
                              })
                            }
                            placeholder="Name"
                            className="font-medium text-slate-900 dark:text-white bg-transparent border-none focus:outline-none focus:ring-0 text-sm"
                          />
                          <input
                            type="email"
                            value={contact.email}
                            onChange={(e) =>
                              updateBillingContact(contact.id, {
                                email: e.target.value,
                              })
                            }
                            placeholder="Email"
                            className="text-sm text-slate-500 dark:text-slate-400 bg-transparent border-none focus:outline-none focus:ring-0"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={contact.role}
                          onChange={(e) =>
                            updateBillingContact(contact.id, {
                              role: e.target.value as BillingContact["role"],
                            })
                          }
                          className="w-auto rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >
                          <option value="owner">Owner</option>
                          <option value="admin">Admin</option>
                          <option value="billing">Billing</option>
                          <option value="accountant">Accountant</option>
                        </select>

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={contact.notifications}
                            onChange={(e) =>
                              updateBillingContact(contact.id, {
                                notifications: e.target.checked,
                              })
                            }
                            className="sr-only peer"
                          />
                          <div
                            className={cn(
                              "w-11 h-6 rounded-full transition-colors",
                              contact.notifications
                                ? "bg-blue-600"
                                : "bg-slate-300 dark:bg-slate-600",
                            )}
                          />
                          <span
                            className={cn(
                              "absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-lg transition-transform",
                              contact.notifications
                                ? "translate-x-5"
                                : "translate-x-0",
                            )}
                          />
                        </label>

                        <button
                          onClick={() => removeBillingContact(contact.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
                          aria-label="Remove contact"
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
        </motion.div>
      )}
    </motion.div>
  );
}

interface LimitCardProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

function LimitCard({ label, value, icon: Icon, color }: LimitCardProps) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    purple:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    emerald:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    amber:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    white: "bg-white/20 text-white",
  };

  return (
    <div className="text-center p-4 rounded-xl bg-white/10 dark:bg-white/5">
      <div
        className={cn(
          "mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl",
          colorMap[color],
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-white/70">{label}</p>
    </div>
  );
}

interface BillingCycleOptionProps {
  interval: "month" | "year";
  label: string;
  description: string;
  price: number;
  selected: boolean;
  onSelect: () => void;
  savings?: string;
}

function BillingCycleOption({
  interval,
  label,
  description,
  price,
  selected,
  onSelect,
  savings,
}: BillingCycleOptionProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "relative p-4 rounded-xl border-2 transition-all text-left",
        selected
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
          : "border-slate-200 hover:border-blue-300 dark:border-slate-700 dark:hover:border-blue-700",
      )}
    >
      {savings && selected && (
        <div className="absolute -top-2 right-4 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-xs font-medium">
          {savings}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium text-slate-900 dark:text-white">
            {label}
          </h5>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            ${price}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            /{interval === "month" ? "mo" : "yr"}
          </p>
        </div>
      </div>
      {selected && (
        <div className="absolute inset-0 border-2 border-blue-500 rounded-xl pointer-events-none" />
      )}
    </button>
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
