"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Upload,
  Globe,
  Clock,
  MapPin,
  Phone,
  Mail,
  Link2,
  Building2,
} from "lucide-react";
import { useState } from "react";
import { ClinicInfo, BusinessHours, DayHours, MOCK_CLINIC_INFO } from "./types";

interface GeneralSettingsProps {
  initialData?: ClinicInfo;
  onChange?: (data: Partial<ClinicInfo>) => void;
}

const DAYS: (keyof BusinessHours)[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const DAY_LABELS: Record<keyof BusinessHours, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export function GeneralSettings({
  initialData = MOCK_CLINIC_INFO,
  onChange,
}: GeneralSettingsProps) {
  const [data, setData] = useState<ClinicInfo>(initialData);
  const [logoPreview, setLogoPreview] = useState<string | null>(data.logo);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(
    data.favicon,
  );

  const handleChange = (field: keyof ClinicInfo, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    onChange?.({ [field]: value });
  };

  const handleBusinessHoursChange = (
    day: keyof BusinessHours,
    field: keyof DayHours,
    value: string | boolean,
  ) => {
    setData((prev) => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: { ...prev.businessHours[day], [field]: value },
      },
    }));
    onChange?.({
      businessHours: {
        ...data.businessHours,
        [day]: { ...data.businessHours[day], [field]: value },
      },
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "favicon",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === "logo") {
        setLogoPreview(url);
        handleChange("logo", url);
      } else {
        setFaviconPreview(url);
        handleChange("favicon", url);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Clinic Information */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-dash-primary-light text-dash-primary dark:bg-teal-900/30 dark:text-accent">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Clinic Information
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Basic details about your clinic
            </p>
          </div>
        </div>

        <div className="dash-card p-6 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="clinic-name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Clinic Name
              </label>
              <input
                id="clinic-name"
                type="text"
                value={data.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-dash-primary focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                placeholder="MediFlow Medical Center"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="clinic-website"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Website
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  https://
                </span>
                <input
                  id="clinic-website"
                  type="url"
                  value={data.website.replace("https://", "")}
                  onChange={(e) =>
                    handleChange("website", `https://${e.target.value}`)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-dash-primary focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                  placeholder=""
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="clinic-description"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Description
            </label>
            <textarea
              id="clinic-description"
              value={data.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-dash-primary focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 resize-none"
              placeholder="A brief description of your clinic..."
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <label
                htmlFor="clinic-phone"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  id="clinic-phone"
                  type="tel"
                  value={data.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-dash-primary focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="clinic-email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  id="clinic-email"
                  type="email"
                  value={data.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-dash-primary focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                  placeholder="info@mediflow.example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="clinic-address"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  id="clinic-address"
                  type="text"
                  value={data.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-dash-primary focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                  placeholder="123 Healthcare Avenue, Medical District, NY 10001"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo & Favicon */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            <Upload className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Brand Assets
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Logo and favicon for your clinic
            </p>
          </div>
        </div>

        <div className="dash-card p-6 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Logo
              </label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="max-h-16 max-w-16 rounded-lg object-contain"
                      />
                    ) : (
                      <svg
                        className="h-8 w-8 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "logo")}
                    className="sr-only"
                    id="logo-upload"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("logo-upload")?.click()
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Logo
                  </button>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    PNG, JPG, or SVG. Max 2MB. Recommended: 200x60px
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Favicon
              </label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                    {faviconPreview ? (
                      <img
                        src={faviconPreview}
                        alt="Favicon preview"
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                    ) : (
                      <svg
                        className="h-8 w-8 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "favicon")}
                    className="sr-only"
                    id="favicon-upload"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("favicon-upload")?.click()
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Favicon
                  </button>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    ICO, PNG, or SVG. Max 100KB. Recommended: 32x32px
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Business Hours
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Set your clinic's operating hours
            </p>
          </div>
        </div>

        <div className="dash-card p-6">
          <div className="space-y-4">
            {DAYS.map((day) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: DAYS.indexOf(day) * 0.05 }}
                className="flex items-center gap-4 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/50"
              >
                <div className="flex w-32 items-center">
                  <input
                    type="checkbox"
                    id={`hours-${day}`}
                    checked={data.businessHours[day].enabled}
                    onChange={(e) =>
                      handleBusinessHoursChange(
                        day,
                        "enabled",
                        e.target.checked,
                      )
                    }
                    className="h-4 w-4 rounded border-slate-300 accent-dash-primary focus:ring-dash-primary"
                  />
                  <label
                    htmlFor={`hours-${day}`}
                    className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {DAY_LABELS[day]}
                  </label>
                </div>
                <div
                  className={cn(
                    "flex-1 flex items-center gap-2",
                    !data.businessHours[day].enabled && "opacity-50",
                  )}
                >
                  <label
                    htmlFor={`open-${day}`}
                    className="text-sm text-slate-500 dark:text-slate-400"
                  >
                    Open
                  </label>
                  <input
                    id={`open-${day}`}
                    type="time"
                    value={data.businessHours[day].open}
                    onChange={(e) =>
                      handleBusinessHoursChange(day, "open", e.target.value)
                    }
                    disabled={!data.businessHours[day].enabled}
                    className="w-32 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-dash-primary focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <label
                    htmlFor={`close-${day}`}
                    className="text-sm text-slate-500 dark:text-slate-400"
                  >
                    Close
                  </label>
                  <input
                    id={`close-${day}`}
                    type="time"
                    value={data.businessHours[day].close}
                    onChange={(e) =>
                      handleBusinessHoursChange(day, "close", e.target.value)
                    }
                    disabled={!data.businessHours[day].enabled}
                    className="w-32 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-dash-primary focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  {!data.businessHours[day].enabled && (
                    <span className="text-sm text-slate-400 dark:text-slate-500">
                      Closed
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
