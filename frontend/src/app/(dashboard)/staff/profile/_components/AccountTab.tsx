"use client";

import {
  buttonPress,
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { Key, LogOut, Monitor, Shield, Smartphone, Trash2 } from "lucide-react";
import { accountInfo } from "../_mock-data";

export function AccountTab() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Section Header */}
      <motion.div variants={staggerItem}>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
            <Shield className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Account
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Security, devices, and account management
            </p>
          </div>
        </div>
      </motion.div>

      {/* Account Info */}
      <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/50">
          <p className="text-xs text-slate-500 dark:text-slate-400">Username</p>
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {accountInfo.username}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/50">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Connected Devices
          </p>
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {accountInfo.connectedDevices} devices
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/50">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Two-Factor Authentication
          </p>
          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                accountInfo.twoFactorEnabled ? "bg-emerald-500" : "bg-slate-300"
              }`}
            />
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {accountInfo.twoFactorEnabled ? "Enabled" : "Disabled"}
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/50">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Last Password Change
          </p>
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {accountInfo.lastPasswordChange}
          </p>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div variants={staggerItem} className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Account Actions
        </h3>

        <motion.button
          {...buttonPress}
          className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-left transition-all hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
        >
          <Key className="h-4 w-4 text-slate-400" />
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              Change Password
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Update your account password
            </p>
          </div>
        </motion.button>

        <motion.button
          {...buttonPress}
          className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-left transition-all hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
        >
          <Smartphone className="h-4 w-4 text-slate-400" />
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              Manage Devices
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              View and manage connected devices
            </p>
          </div>
        </motion.button>

        <motion.button
          {...buttonPress}
          className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-left transition-all hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
        >
          <Monitor className="h-4 w-4 text-slate-400" />
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              Login Activity
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Review recent login sessions
            </p>
          </div>
        </motion.button>

        <motion.button
          {...buttonPress}
          className="flex w-full items-center gap-3 rounded-lg border border-red-200 bg-white p-4 text-left transition-all hover:border-red-300 dark:border-red-900/30 dark:bg-slate-800/50 dark:hover:border-red-800/50"
        >
          <Trash2 className="h-4 w-4 text-red-400" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              Delete Account
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Permanently delete your account and all data
            </p>
          </div>
        </motion.button>

        <motion.button
          {...buttonPress}
          className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-left transition-all hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
        >
          <LogOut className="h-4 w-4 text-slate-400" />
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              Sign Out
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sign out of all active sessions
            </p>
          </div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
