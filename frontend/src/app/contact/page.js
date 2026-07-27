"use client";

import { sendMessage } from "@/services/contactService";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSuccess("");
    setError("");

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.subject ||
      !formData.message
    ) {
      setError("Please fill all the fields.");
      return;
    }

    setLoading(true);

    try {
      // This will later become your Django API call.
      await sendMessage(formData);

      setSuccess("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError("Failed to send message.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24 text-white">

      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-slate-800 px-5 py-3 transition-all duration-300 hover:bg-red-600"
        >
          ← Back to Home
        </Link>

        {/* Heading */}

        <div className="mb-16 text-center">

          <h1 className="text-5xl font-bold">
            Contact Us
          </h1>

          <p className="mt-4 text-lg text-gray-400">
            We'd love to hear from you.
          </p>

        </div>

        <div className="grid gap-10 md:grid-cols-2">

          {/* Contact Form */}

          <div className="rounded-xl bg-slate-900 p-8">

            <h2 className="mb-8 text-3xl font-semibold">
              Send a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-5 py-4 outline-none focus:border-red-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-5 py-4 outline-none focus:border-red-500"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-5 py-4 outline-none focus:border-red-500"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-5 py-4 outline-none focus:border-red-500"
              />

              <textarea
                rows={6}
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-5 py-4 outline-none focus:border-red-500"
              />

              {error && (
                <p className="text-red-500">
                  {error}
                </p>
              )}

              {success && (
                <p className="text-green-500">
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-red-600 py-4 text-lg font-semibold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-600"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>

          </div>

          {/* Contact Details */}

          <div className="rounded-xl bg-slate-900 p-8">

            <h2 className="mb-8 text-3xl font-semibold">
              Contact Information
            </h2>

            <div className="space-y-8">

              <div>

                <h3 className="text-xl font-semibold text-red-500">
                  📍 Address
                </h3>

                <p className="mt-2 text-gray-300">
                  MovieHub
                  <br />
                  Infopark
                  <br />
                  Kochi
                  <br />
                  Kerala, India
                </p>

              </div>

              <div>

                <h3 className="text-xl font-semibold text-red-500">
                  📞 Phone
                </h3>

                <p className="mt-2 text-gray-300">
                  +91 98000 11110
                </p>

              </div>

              <div>

                <h3 className="text-xl font-semibold text-red-500">
                  📧 Email
                </h3>

                <p className="mt-2 text-gray-300">
                  support@moviehub.com
                </p>

              </div>

              <div>

                <h3 className="text-xl font-semibold text-red-500">
                  🌐 Website
                </h3>

                <p className="mt-2 text-gray-300">
                  www.moviehub.com
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}