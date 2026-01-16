import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Book an Appointment - My System",
  description: "Select a time that suits you for our service.",
};

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Book Your Appointment
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Please fill out the form below and we will confirm your booking via
            email.
          </p>
        </div>

        <BookingForm />

        <div className="mt-6 text-center text-xs text-gray-400">
          <p>Your data is handled securely in our MongoDB database.</p>
        </div>
      </div>
    </div>
  );
}
