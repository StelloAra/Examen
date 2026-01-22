export default function DonationSuccess() {
  return (
    <main className="container mx-auto text-center py-20">
      <h1 className="text-4xl font-bold mb-4">
        Thank you for your donation! 🎉
      </h1>
      <p className="text-gray-600 mb-8">
        Your support means everything to our animals.
      </p>

      <a
        href="/#animals"
        className="px-6 py-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600"
      >
        Back to animals
      </a>
    </main>
  );
}
