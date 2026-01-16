"use client";

import { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    date: "",
    service: "Consultation", // Default value in English
  });

  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Booking confirmed! We have saved your reservation.",
        });
        // Reset form
        setFormData({
          customerName: "",
          email: "",
          date: "",
          service: "Consultation",
        });
      } else {
        throw new Error(result.error || "Failed to submit booking");
      }
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <img
          src="/booking-icon.png"
          alt="Calendar icon for appointment booking"
          className="mx-auto w-16 h-16 mb-2"
        />
      </div>

      {status.type && (
        <div
          className={`p-3 rounded text-sm ${
            status.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status.message}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          className="w-full p-2 border rounded text-black focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.customerName}
          onChange={(e) =>
            setFormData({ ...formData, customerName: e.target.value })
          }
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          placeholder="john@example.com"
          className="w-full p-2 border rounded text-black focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date & Time
        </label>
        <input
          type="datetime-local"
          className="w-full p-2 border rounded text-black focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Service Type
        </label>
        <select
          className="w-full p-2 border rounded text-black focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.service}
          onChange={(e) =>
            setFormData({ ...formData, service: e.target.value })
          }
        >
          <option value="Consultation">Consultation</option>
          <option value="Haircut">Haircut</option>
          <option value="Support">Support</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
      >
        Confirm Booking
      </button>
    </form>
  );
}
