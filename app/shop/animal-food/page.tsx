import { getDonationPackages } from "@/lib/getDonations";
import { getAnimalById } from "@/lib/getAnimalById";
import { getAnimals } from "@/lib/getAnimals";

export default async function DonationPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; name?: string }>;
}) {
  const { id, name } = await searchParams;

  let animal = null;

  // Try find by ID first
  if (id) {
    animal = await getAnimalById(Number(id));
  }

  // Fallback: find by name (if someone visits ?name=Penguin)
  if (!animal && name) {
    const animals = await getAnimals();
    animal = animals.find(
      (a) => a.attributeValues.title.value.toLowerCase() === name.toLowerCase()
    );
  }

  // If still not found:
  if (!animal) {
    return (
      <main className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Animal not found ❌</h1>
        <a
          href="/animals"
          className="inline-block px-6 py-3 bg-gray-200 rounded-xl font-semibold hover:bg-gray-300 transition"
        >
          ← Back to animals
        </a>
      </main>
    );
  }

  const packages = await getDonationPackages();

  return (
    <main className="container mx-auto px-6 py-16 text-center">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">
        Support {animal.attributeValues.title.value} 🐾
      </h1>

      {/* ⭐ Back button */}
      <a
        href={`/animals/${animal.id}`}
        className="inline-block mt-4 mb-10 px-6 py-3 bg-gray-200 dark:bg-gray-700
                   text-gray-800 dark:text-gray-200 rounded-xl font-semibold
                   hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        ← Back to {animal.attributeValues.title.value}
      </a>

      {/* Description */}
      <p className="text-gray-600 mb-12 max-w-lg mx-auto">
        Every donation helps provide food, medical care, and a safe and healthy
        environment for our animals. Choose a package below to contribute.
      </p>

      {/* Donation packages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg: any) => (
          <div
            key={pkg.id}
            className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg
                       border-2 border-transparent hover:border-orange-400
                       transition-all group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              🎁
            </div>

            <h3 className="text-xl font-bold mb-2">
              {pkg.attributeValues.title.value}
            </h3>

            <p className="text-gray-500 text-sm mb-6">
              {pkg.attributeValues.description?.value}
            </p>

            <div className="text-3xl font-black text-orange-600 mb-6">
              {pkg.attributeValues.price?.value} kr
            </div>

            <form action="/api/checkout" method="POST">
              <input
                type="hidden"
                name="amount"
                value={pkg.attributeValues.price.value}
              />
              <input
                type="hidden"
                name="packageName"
                value={pkg.attributeValues.title.value}
              />
              <input
                type="hidden"
                name="animalName"
                value={animal.attributeValues.title.value}
              />

              <button
                type="submit"
                className="w-full py-3 bg-orange-500 text-white rounded-xl 
               font-bold hover:bg-orange-600 shadow-md transition"
              >
                Donate via Stripe
              </button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}
