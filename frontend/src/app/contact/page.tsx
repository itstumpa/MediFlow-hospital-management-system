"use client";

import { EmergencyBanner } from "@/app/components/home/EmergencyBanner";
import { Button } from "@/app/components/ui/Button";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

// TODO: Replace with API data
const contactInfo = [
  {
    icon: MapPin,
    title: "Our location",
    details: ["123 Gulshan Avenue", "Dhaka 1212, Bangladesh"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+880-XXX-XXXXXX", "+880-XXX-XXXXXX"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@mediflow.com", "support@mediflow.com"],
  },
  {
    icon: Clock,
    title: "Working hours",
    details: ["Sat–Thu: 8:00 AM – 10:00 PM", "Friday: 9:00 AM – 5:00 PM"],
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mock submission — no actual backend
    setIsSubmitted(true);
  }

  return (
    <>
      {/* Emergency banner */}
      <EmergencyBanner />

      {/* Hero banner */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 md:py-24">
        <div className="mx-auto max-w-page px-4 text-center md:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Contact us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            We are here to help. Reach out to us for appointments, inquiries, or
            any assistance.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact form */}
            <div>
              <h2 className="text-2xl font-bold text-text-primary">
                Send us a message
              </h2>
              <p className="mt-2 text-text-secondary">
                Fill out the form below and we will get back to you as soon as
                possible.
              </p>

              {isSubmitted ? (
                <div className="mt-8 rounded-xl border border-success/20 bg-success/5 p-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                    <Send className="h-8 w-8 text-success" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-text-primary">
                    Message sent successfully!
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    Thank you for reaching out. Our team will contact you
                    shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="mt-6 text-sm font-medium text-primary hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* Name */}
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
                        className="mt-1.5 w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    {/* Email */}
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
                        className="mt-1.5 w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-text-primary"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="mt-1.5 w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Select a subject</option>
                      <option value="appointment">Appointment inquiry</option>
                      <option value="feedback">Feedback or complaint</option>
                      <option value="partnership">
                        Partnership opportunity
                      </option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-text-primary"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      className="mt-1.5 w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
                    />
                  </div>

                  <Button variant="primary" size="md" type="submit">
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-8 lg:pl-8">
              <div className="grid gap-6 sm:grid-cols-2">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-xl border border-border bg-surface p-6 shadow-sm"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5">
                        <Icon
                          className="h-5 w-5 text-primary"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="mt-4 text-sm font-semibold text-text-primary">
                        {item.title}
                      </h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="mt-1 text-sm text-text-secondary">
                          {detail}
                        </p>
                      ))}
                    </div>
                  );
                })}
              </div>

              {/* Map placeholder */}
              <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
                <div className="flex h-64 items-center justify-center bg-background">
                  <div className="text-center">
                    <MapPin
                      className="mx-auto h-8 w-8 text-primary"
                      aria-hidden="true"
                    />
                    <p className="mt-2 text-sm font-medium text-text-primary">
                      Map integration
                    </p>
                    <p className="mt-1 text-xs text-text-secondary">
                      123 Gulshan Avenue, Dhaka 1212, Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
