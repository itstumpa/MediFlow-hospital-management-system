"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { AppointmentDetail } from "@/lib/data/appointment-detail";
import { motion } from "framer-motion";
import {
  Calendar,
  Droplets,
  HeartPulse,
  Mail,
  Phone,
  Shield,
  ShieldAlert,
  User as UserIcon,
} from "lucide-react";

interface PatientTabProps {
  appointment: AppointmentDetail;
}

export function PatientTab({ appointment }: PatientTabProps) {
  const { patient } = appointment;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Patient Profile Card */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="h-16 w-16 overflow-hidden rounded-xl">
              <img
                src={patient.avatar}
                alt={patient.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {patient.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Patient ID: {patient.id}
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                <Calendar className="h-3 w-3" />
                {patient.age} yrs
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                <UserIcon className="h-3 w-3" />
                {patient.gender}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                <Droplets className="h-3 w-3" />
                {patient.bloodGroup}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact & Medical Info */}
      <div className="grid gap-5 sm:grid-cols-2">
        <motion.div
          variants={staggerItem}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
        >
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
            Contact Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-dash-primary-light text-dash-primary dark:bg-teal-500/20 dark:text-accent">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Phone
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {patient.phone}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-dash-primary-light text-dash-primary dark:bg-teal-500/20 dark:text-accent">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Email
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {patient.email}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerItem}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
        >
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
            Medical Alerts
          </h3>
          {patient.medicalAlerts.length > 0 ? (
            <div className="space-y-2">
              {patient.medicalAlerts.map((alert, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg bg-amber-50 p-3 dark:bg-amber-500/10"
                >
                  <ShieldAlert className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                  <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                    {alert}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-lg bg-emerald-50 p-3 dark:bg-emerald-500/10">
              <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                No known medical alerts
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Insurance & Emergency Contact */}
      <div className="grid gap-5 sm:grid-cols-2">
        <motion.div
          variants={staggerItem}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400">
              <HeartPulse className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Insurance
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                Provider
              </span>
              <span className="font-medium text-slate-900 dark:text-white">
                {patient.insurance.provider}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                Policy ID
              </span>
              <span className="font-medium text-slate-900 dark:text-white">
                {patient.insurance.id}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                Plan Type
              </span>
              <span className="font-medium text-slate-900 dark:text-white">
                {patient.insurance.type}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerItem}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400">
              <Phone className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Emergency Contact
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Name</span>
              <span className="font-medium text-slate-900 dark:text-white">
                {patient.emergencyContact.name}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                Relationship
              </span>
              <span className="font-medium text-slate-900 dark:text-white">
                {patient.emergencyContact.relationship}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Phone</span>
              <span className="font-medium text-slate-900 dark:text-white">
                {patient.emergencyContact.phone}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
