"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Globe,
  Laptop,
  LogOut,
  MapPin,
  Monitor,
  Smartphone,
  Tablet,
  Trash2,
} from "lucide-react";
import SettingsCard from "./SettingsCard";
import type { Device } from "./types";
import { mockDevices } from "./types";

const deviceTypeIcons: Record<
  Device["type"],
  React.ComponentType<{ className?: string }>
> = {
  smartphone: Smartphone,
  laptop: Laptop,
  tablet: Tablet,
  desktop: Monitor,
};

export default function DevicesCard() {
  const currentDevice = mockDevices[0];
  const otherDevices = mockDevices.slice(1);

  return (
    <div className="space-y-6">
      {/* Current Device */}
      <SettingsCard title="Current Device" icon={Monitor}>
        <DeviceDetailCard device={currentDevice} isCurrent />
      </SettingsCard>

      {/* Recent Devices */}
      <SettingsCard title="Recent Devices" icon={Smartphone}>
        <div className="space-y-3">
          {otherDevices.map((device, i) => (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center justify-between p-4 rounded-xl bg-[#f8fafa] dark:bg-[#1a2a2a] border border-[#e1e8e8] dark:border-[#2a3a3a] hover:bg-[#f0f5f5] dark:hover:bg-[#2a3a3a] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#e1e8e8] dark:bg-[#2a3a3a]">
                  {(() => {
                    const Icon = deviceTypeIcons[device.type] || Monitor;
                    return (
                      <Icon
                        className="h-4 w-4 text-[#5c7373] dark:text-[#8a9a9a]"
                        aria-hidden="true"
                      />
                    );
                  })()}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1a2e2e] dark:text-white">
                    {device.name}
                  </p>
                  <p className="text-xs text-[#5c7373] dark:text-[#8a9a9a]">
                    {device.os} · {device.browser} · {device.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#5c7373] dark:text-[#8a9a9a]">
                  {device.lastActive}
                </span>
                <button
                  className="p-1.5 rounded-lg text-[#8a9a9a] hover:text-[#dc2626] hover:bg-[#dc2626]/10 opacity-0 group-hover:opacity-100 transition-all"
                  aria-label={`Remove ${device.name}`}
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </SettingsCard>

      {/* Logout Other Devices */}
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
              Log Out Other Devices
            </p>
            <p className="text-sm text-[#5c7373] dark:text-[#8a9a9a]">
              Instantly disconnect all other devices from your account
            </p>
          </div>
        </div>
        <button className="px-4 py-2 rounded-xl bg-[#dc2626]/10 text-[#dc2626] hover:bg-[#dc2626]/20 transition-colors text-sm font-medium shrink-0 ml-4">
          Log Out Others
        </button>
      </motion.div>
    </div>
  );
}

function DeviceDetailCard({
  device,
  isCurrent,
}: {
  device: Device;
  isCurrent?: boolean;
}) {
  const Icon = deviceTypeIcons[device.type] || Monitor;
  return (
    <div className="rounded-xl bg-[#0e7c7b]/5 dark:bg-[#2dd4bf]/5 border border-[#0e7c7b]/20 dark:border-[#2dd4bf]/20 p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-[#0e7c7b]/10 dark:bg-[#2dd4bf]/10">
            <Icon
              className="h-5 w-5 text-[#0e7c7b] dark:text-[#2dd4bf]"
              aria-hidden="true"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-[#1a2e2e] dark:text-white">
                {device.name}
              </p>
              {isCurrent && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#16a34a]/10 text-[#16a34a] dark:bg-[#16a34a]/20 dark:text-[#4ade80] uppercase tracking-wider">
                  Current
                </span>
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
              <DeviceDetail icon={Globe} text={device.browser} />
              <DeviceDetail icon={Monitor} text={device.os} />
              <DeviceDetail icon={MapPin} text={device.location} />
              <DeviceDetail icon={Clock} text={`Added ${device.addedAt}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeviceDetail({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-[#5c7373] dark:text-[#8a9a9a]">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
}
