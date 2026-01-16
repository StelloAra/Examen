import Link from "next/link";

export default function ReservationSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center">
        <div className="mb-6">
          {/* Using English alt text as per your instructions */}
          <img
            src="/success-check.png"
            alt="A green circle with a white checkmark icon"
            className="mx-auto w-20 h-20"
          />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Reservation Confirmed!
        </h1>

        <p className="text-gray-600 mb-8">
          Thank you for choosing our service. Your booking has been successfully
          saved in our system.
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition text-center"
          >
            Return to Home
          </Link>

          <p className="text-xs text-gray-400">
            A confirmation has been processed.
          </p>
        </div>
      </div>
    </div>
  );
}
