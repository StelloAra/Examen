import React from "react";
import AnimalCatalog from "@/components/animalCatalog";
import { getAnimals } from "@/lib/getAnimals"; // <- din server-funktion

export default async function Page() {
  const animals = await getAnimals();

  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative py-24 sm:py-32 bg-linear-to-br from-cyan-100 via-sky-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            Welcome to the Animal World 🐾
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            Our Zoo Animals program allows you to directly support the
            well-being of the animals in our care. Your contributions help
            provide essentials such as nutritious food, medical treatments,
            enrichment activities, and professional veterinary support. Every
            donation plays a meaningful role in improving the animals’ daily
            lives and ensuring they receive the best possible care. In addition,
            you can book a hands-on visit to work alongside our staff and
            participate in activities like feeding, habitat maintenance, and
            enrichment preparation. It’s a unique opportunity to learn,
            contribute, and make a real impact on the animals who depend on us
            every day.
          </p>

          <div className="flex justify-center">
            <a
              href="#animals"
              className="px-8 py-4 rounded-full bg-linear-to-r from-cyan-500 via-sky-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Explore Animals
            </a>
          </div>
        </div>
      </section>

      {/* ANIMAL LIST */}
      <section id="animals" className="container mx-auto px-6 mt-16 sm:mt-24">
        <AnimalCatalog title="Our Animals" animals={animals} />
      </section>
    </main>
  );
}
