"use client";

import { Button } from "@/app/components/ui/Button";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { Calendar, Clock, Stethoscope, User } from "lucide-react";
import { useState } from "react";

// TODO: Replace with API data
const departments = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Ophthalmology",
  "Pulmonology",
  "ENT",
  "General Surgery",
];

// TODO: Replace with API data
const doctors = [
  { name: "Dr. Sarah Rahman", department: "Cardiology" },
  { name: "Dr. Michael Torres", department: "Cardiology" },
  { name: "Dr. James Mitchell", department: "Neurology" },
  { name: "Dr. Emily Watson", department: "Neurology" },
  { name: "Dr. Ayesha Khan", department: "Pediatrics" },
  { name: "Dr. Robert Chen", department: "Orthopedics" },
  { name: "Dr. Maria Santos", department: "Ophthalmology" },
];

// TODO: Replace with API data
const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

// TODO: Replace with API data
const appointmentTypes = [
  "In-person consultation",
  "Video consultation",
  "Follow-up visit",
];

export default function AppointmentPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    department: "",
    doctor: "",
    date: "",
    time: "",
    type: "In-person consultation",
    notes: "",
  });

  const [isConfirmed, setIsConfirmed] = useState(false);

  const filteredDoctors = formData.department
    ? doctors.filter((doc) => doc.department === formData.department)
    : doctors;

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Reset doctor when department changes
    if (name === "department") {
      setFormData((prev) => ({ ...prev, doctor: "" }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mock submission
    setIsConfirmed(true);
  }

  function resetForm() {
    setStep(1);
    setIsConfirmed(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      department: "",
      doctor: "",
      date: "",
      time: "",
      type: "In-person consultation",
      notes: "",
    });
  }

  if (isConfirmed) {
    return (
      <section className="bg-background py-6 md:py-16">
        <div className="mx-auto max-w-lg px-4 text-center md:px-6 lg:px-8">
          <div className="rounded-xl border border-success/20 bg-success/5 p-8 shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <Calendar className="h-8 w-8 text-success" aria-hidden="true" />
            </div>
            <h1 className="mt-6 text-2xl font-bold text-text-primary md:text-3xl">
              Appointment confirmed!
            </h1>
            <p className="mt-3 text-text-secondary">
              Your appointment has been successfully booked. You will receive a
              confirmation via email and SMS shortly.
            </p>

            <div className="mt-8 space-y-3 text-left rounded-lg border border-border bg-surface p-6">
              <h2 className="text-sm font-semibold text-text-primary">
                Appointment details
              </h2>
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <User className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>{formData.name}</span>
              </div>
              {formData.doctor && (
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <Stethoscope
                    className="h-4 w-4 text-primary"
                    aria-hidden="true"
                  />
                  <span>{formData.doctor}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>{formData.date || "TBD"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>{formData.time || "TBD"}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button variant="primary" size="md" href="/">
                Back to home
              </Button>
              <Button variant="outline" size="md" onClick={resetForm}>
                Book another
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <PageTransition>
      {/* Hero banner */}
      <section className=" py-4 md:py-6">
        <div className="mx-auto max-w-page px-4 text-center md:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
            Book an appointment
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary/80">
            Schedule your visit with our expert doctors. Quick and hassle-free.
          </p>
        </div>
      </section>

      {/* Booking form */}
      <section className="bg-background py-4 md:py-10">
        <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
          {/* Steps indicator */}
          <div className="mb-10 flex items-center justify-center gap-2 text-sm font-medium">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    step >= s
                      ? "bg-primary text-white"
                      : "bg-background text-text-secondary border border-border"
                  }`}
                  aria-current={step === s ? "step" : undefined}
                >
                  {s}
                </div>
                <span
                  className={`hidden sm:inline ${step >= s ? "text-text-primary" : "text-text-secondary"}`}
                >
                  {s === 1 ? "Details" : s === 2 ? "Schedule" : "Confirm"}
                </span>
                {s < 3 && (
                  <div
                    className="h-px w-8 bg-border sm:w-12"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal & Appointment details */}
            {step === 1 && (
              <div className="rounded-xl border border-border bg-surface p-6 shadow-sm md:p-8">
                <h2 className="text-xl font-bold text-text-primary">
                  Your details
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Provide your contact information and preferences.
                </p>

                <div className="mt-6 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-text-primary"
                      >
                        Full name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-text-primary"
                      >
                        Phone number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+880-XXX-XXXXXX"
                        className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-text-primary"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-text-primary"
                    >
                      Appointment type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      {appointmentTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => setStep(2)}
                      type="button"
                    >
                      Next step
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Department, Doctor, Date & Time */}
            {step === 2 && (
              <div className="rounded-xl border border-border bg-surface p-6 shadow-sm md:p-8">
                <h2 className="text-xl font-bold text-text-primary">
                  Schedule your visit
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Select a department, doctor, date, and time.
                </p>

                <div className="mt-6 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="department"
                        className="block text-sm font-medium text-text-primary"
                      >
                        Department
                      </label>
                      <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Select department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="doctor"
                        className="block text-sm font-medium text-text-primary"
                      >
                        Doctor
                      </label>
                      <select
                        id="doctor"
                        name="doctor"
                        value={formData.doctor}
                        onChange={handleChange}
                        className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Select doctor</option>
                        {filteredDoctors.map((doc) => (
                          <option key={doc.name} value={doc.name}>
                            {doc.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-text-primary"
                      >
                        Preferred date
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="time"
                        className="block text-sm font-medium text-text-primary"
                      >
                        Preferred time
                      </label>
                      <select
                        id="time"
                        name="time"
                        required
                        value={formData.time}
                        onChange={handleChange}
                        className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="notes"
                      className="block text-sm font-medium text-text-primary"
                    >
                      Additional notes (optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Any special requirements..."
                      className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
                    />
                  </div>

                  <div className="flex justify-between gap-3 pt-2">
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => setStep(1)}
                      type="button"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => setStep(3)}
                      type="button"
                    >
                      Review & confirm
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review & Confirm */}
            {step === 3 && (
              <div className="rounded-xl border border-border bg-surface p-6 shadow-sm md:p-8">
                <h2 className="text-xl font-bold text-text-primary">
                  Review your booking
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Please review your appointment details before confirming.
                </p>

                <div className="mt-6 space-y-4 rounded-lg border border-border bg-background p-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-medium text-text-secondary">
                        Full name
                      </p>
                      <p className="text-sm font-semibold text-text-primary">
                        {formData.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-text-secondary">
                        Phone
                      </p>
                      <p className="text-sm font-semibold text-text-primary">
                        {formData.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-text-secondary">
                        Email
                      </p>
                      <p className="text-sm font-semibold text-text-primary">
                        {formData.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-text-secondary">
                        Appointment type
                      </p>
                      <p className="text-sm font-semibold text-text-primary">
                        {formData.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-text-secondary">
                        Department
                      </p>
                      <p className="text-sm font-semibold text-text-primary">
                        {formData.department || "Not selected"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-text-secondary">
                        Doctor
                      </p>
                      <p className="text-sm font-semibold text-text-primary">
                        {formData.doctor || "Not selected"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-text-secondary">
                        Date
                      </p>
                      <p className="text-sm font-semibold text-text-primary">
                        {formData.date}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-text-secondary">
                        Time
                      </p>
                      <p className="text-sm font-semibold text-text-primary">
                        {formData.time}
                      </p>
                    </div>
                  </div>
                  {formData.notes && (
                    <div>
                      <p className="text-xs font-medium text-text-secondary">
                        Notes
                      </p>
                      <p className="text-sm text-text-primary">
                        {formData.notes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-between gap-3">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setStep(2)}
                    type="button"
                  >
                    Previous
                  </Button>
                  <Button variant="primary" size="md" type="submit">
                    Confirm appointment
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
