"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const InquirySchema = z.object({
  name: z.string().min(2, "Please provide your name"),
  email: z.string().email("Invalid email address"),
  projectType: z
    .enum(["Website", "Mobile App", "E-commerce", "Other"])
    .optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, "Please provide more details (min 10 chars)"),
});

export default function InquiryForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(InquirySchema) });

  const [status, setStatus] = useState(null);

  async function onSubmit(data) {
    setStatus(null);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        setStatus({ ok: true, message: "Thanks! Your inquiry has been sent." });
        reset();
        // Analytics: emit GA4 'generate_lead' event when available
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "generate_lead", { method: "contact_form" });
        }
      } else if (res.status === 503 && json?.error?.includes("SendGrid")) {
        // Friendly fallback when SendGrid isn't configured
        setStatus({
          ok: false,
          message:
            "Email sending is not configured on the server. Please email us directly at bytewaveteams@gmail.com or try again later.",
        });
      } else if (res.status === 422 && json?.errors) {
        setStatus({ ok: false, message: "Validation failed on the server." });
      } else {
        setStatus({ ok: false, message: json?.error || "Server error" });
      }
    } catch (err) {
      console.error(err);
      setStatus({ ok: false, message: "Network error; please try again later." });
    }
  }

  // mailto fallback generator
  const makeMailTo = (values) => {
    const subject = encodeURIComponent(`Project inquiry from ${values.name || ""}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\nProject type: ${values.projectType || ""}\nBudget: ${values.budget || ""}\nTimeline: ${values.timeline || ""}\n\nMessage:\n${values.message}`
    );
    return `mailto:bytewaveteams@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-card p-6 rounded-lg shadow-sm">
      {status && (
        <div
          className={`p-3 rounded text-sm ${status.ok ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {status.message}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          className="mt-1 block w-full rounded border px-3 py-2"
          {...register("name")}
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          className="mt-1 block w-full rounded border px-3 py-2"
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Project Type</label>
        <select className="mt-1 block w-full rounded border px-3 py-2" {...register("projectType")}>
          <option value="">Select...</option>
          <option value="Website">Website</option>
          <option value="Mobile App">Mobile App</option>
          <option value="E-commerce">E-commerce</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Budget (optional)</label>
          <input className="mt-1 block w-full rounded border px-3 py-2" {...register("budget")} />
        </div>
        <div>
          <label className="block text-sm font-medium">Timeline (optional)</label>
          <input className="mt-1 block w-full rounded border px-3 py-2" {...register("timeline")} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Message</label>
        <textarea
          rows={5}
          className="mt-1 block w-full rounded border px-3 py-2"
          {...register("message")}
        />
        {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
      </div>

      <div className="flex items-center gap-3">
        <button
          disabled={isSubmitting}
          type="submit"
          className="inline-flex items-center rounded bg-primary px-4 py-2 text-white"
        >
          {isSubmitting ? "Sending..." : "Send Inquiry"}
        </button>

        <button
          type="button"
          onClick={() => {
            // open mailto fallback with current form values
            // try to read current form values from DOM via formState (not ideal) - we will create a safe fallback
            // Simple fallback: open a generic mailto
            window.location.href = "mailto:bytewaveteams@gmail.com?subject=Project%20Inquiry";
          }}
          className="text-sm text-muted-foreground underline"
        >
          Send by email
        </button>
      </div>

      <p className="text-xs text-muted-foreground">We will never share your contact information. By sending, you agree to be contacted about your inquiry.</p>
    </form>
  );
}
