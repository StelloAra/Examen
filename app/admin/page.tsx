"use client";

import { useEffect, useState } from "react";

interface Reservation {
  _id: string;
  customerName: string;
  email: string;
  date: string;
  service: string;
  status: string;
}

export default function AdminDashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const res = await fetch("/api/reservations");
        const data = await res.json();
        setReservations(data);
      } catch (err) {
        console.error("Failed to fetch reservations", err);
      } finally {
        setLoading(false);
      }
    }
    fetchReservations();
  }, []);

  if (loading)
    return <p className="p-8 text-center">Loading reservations...</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Customer</th>
              <th className="py-3 px-6 text-left">Service</th>
              <th className="py-3 px-6 text-left">Date & Time</th>
              <th className="py-3 px-6 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {reservations.map((res) => (
              <tr
                key={res._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-6 text-left">
                  <div className="font-medium text-gray-900">
                    {res.customerName}
                  </div>
                  <div className="text-xs text-gray-500">{res.email}</div>
                </td>
                <td className="py-3 px-6 text-left">{res.service}</td>
                <td className="py-3 px-6 text-left">
                  {new Date(res.date).toLocaleString("en-GB")}
                </td>
                <td className="py-3 px-6 text-center">
                  <span className="bg-yellow-200 text-yellow-700 py-1 px-3 rounded-full text-xs">
                    {res.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {reservations.length === 0 && (
          <p className="p-4 text-center text-gray-500">
            No reservations found.
          </p>
        )}
      </div>
    </div>
  );
}
