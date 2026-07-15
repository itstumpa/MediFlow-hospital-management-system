import { z } from "zod";

export const profileFormSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  bio: z.string().optional(),

  // Employment
  role: z.string().min(1, "Role is required"),
  department: z.string().min(1, "Department is required"),
  manager: z.string().min(1, "Manager is required"),
  employeeId: z.string().min(1, "Employee ID is required"),
  joiningDate: z.string().min(1, "Joining date is required"),
  shift: z.string().min(1, "Shift is required"),
  workLocation: z.string().min(1, "Work location is required"),
  employmentStatus: z.string().min(1, "Employment status is required"),

  // Emergency Contact
  emergencyName: z.string().min(1, "Contact name is required"),
  emergencyRelationship: z.string().min(1, "Relationship is required"),
  emergencyPhone: z.string().min(10, "Phone must be at least 10 characters"),
  emergencyAddress: z.string().min(1, "Address is required"),

  // Preferences
  language: z.string().min(1, "Language is required"),
  timezone: z.string().min(1, "Timezone is required"),
  dateFormat: z.string().min(1, "Date format is required"),
  timeFormat: z.string().min(1, "Time format is required"),

  // Notifications
  appointments: z.boolean(),
  queueUpdates: z.boolean(),
  billingAlerts: z.boolean(),
  announcements: z.boolean(),
  notifyEmail: z.boolean(),
  notifySms: z.boolean(),
  notifyPush: z.boolean(),

  // Appearance
  theme: z.string().min(1, "Theme is required"),
  accentColor: z.string().min(1, "Accent color is required"),
  compactMode: z.boolean(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const defaultFormValues: ProfileFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  bio: "",
  role: "",
  department: "",
  manager: "",
  employeeId: "",
  joiningDate: "",
  shift: "",
  workLocation: "",
  employmentStatus: "",
  emergencyName: "",
  emergencyRelationship: "",
  emergencyPhone: "",
  emergencyAddress: "",
  language: "English (US)",
  timezone: "America/Los_Angeles (PST)",
  dateFormat: "MM/DD/YYYY",
  timeFormat: "12h",
  appointments: true,
  queueUpdates: true,
  billingAlerts: false,
  announcements: true,
  notifyEmail: true,
  notifySms: false,
  notifyPush: true,
  theme: "system",
  accentColor: "emerald",
  compactMode: false,
};
