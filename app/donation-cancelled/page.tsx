export default function DonationCancelled() {
  return (
    <main className="container mx-auto text-center py-20">
      <h1 className="text-3xl font-bold mb-4">Donation cancelled ❌</h1>
      <p className="text-gray-600 mb-8">You can try again anytime.</p>

      <a
        href="/#animals"
        className="px-6 py-3 bg-gray-200 rounded-xl hover:bg-gray-300"
      >
        Back to animals
      </a>
    </main>
  );
}
