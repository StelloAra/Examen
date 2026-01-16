"use server";

import { getAnimalById } from "@/lib/getAnimalById";
import Link from "next/link";

export default async function AnimalDetailPage({
  params,
}: {
  // 1. Uppdatera typen till ett Promise
  params: Promise<{ id: string }>;
}) {
  // 2. Vänta på att params ska laddas ur sitt Promise
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // 3. Använd 'id' istället för 'params.id'
  console.log("PARAM RAW:", id);
  console.log("PARAM NUMBER:", Number(id));

  const animal = await getAnimalById(Number(id));

  console.log("ANIMAL RESULT:", animal);

  if (!animal) {
    return (
      <div className="container mx-auto py-20 text-center text-xl">
        Djuret hittades inte 🐾
      </div>
    );
  }

  // === ATTRIBUTE EXTRACTION ===
  const title = animal.attributeValues.title.value;
  const image = animal.attributeValues.image.value.downloadLink;
  const shortDescription = animal.attributeValues.description.value;

  const longDescription =
    animal.attributeValues.long_description?.value?.[0]?.htmlValue ||
    animal.attributeValues.long_description?.value?.[0]?.plainValue ||
    shortDescription;

  return (
    <main className="container mx-auto px-6 py-16">
      {/* ... resten av din befintliga JSX-kod är korrekt ... */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-xl">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        <div>
          <h1 className="text-4xl font-extrabold mb-6 bg-linear-to-r from-cyan-600 via-sky-500 to-blue-500 bg-clip-text text-transparent">
            {title}
          </h1>

          <div
            className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8"
            dangerouslySetInnerHTML={{ __html: longDescription }}
          />

          <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-10">
            {shortDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/shop/animal-food?name=${encodeURIComponent(
                title
              )}&id=${id}`}
              className="flex-1 text-center py-4 rounded-xl font-semibold bg-linear-to-r from-sky-800 to-cyan-800 text-white hover:opacity-90 transition shadow-md"
            >
              🍖 Donate now {title}
            </Link>

            <Link
              href={`/reservation?id=${animal.id}&service=Care&animalName=${animal.attributeValues.title.value}`}
              className="flex-1 text-center py-4 rounded-xl font-semibold bg-green-600 text-white hover:bg-green-700 transition shadow-md"
            >
              🧼 Book care session
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/#animals"
          className="inline-block px-6 py-3 rounded-xl font-semibold bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          ← Tillbaka till alla djur
        </Link>
      </div>
    </main>
  );
}
