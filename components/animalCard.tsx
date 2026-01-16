import Link from "next/link";
import { IAnimal } from "@/types/animal";

const AnimalCard = ({ animal }: { animal: IAnimal }) => {
  const name = animal.attributeValues.title.value;
  const image = animal.attributeValues.image.value.downloadLink;
  const description = animal.attributeValues.description.value;
  const link = animal.attributeValues.link.value;

  return (
    <div className="group relative h-full flex flex-col">
      <div className="relative overflow-hidden rounded-3xl shadow-lg bg-white dark:bg-gray-900 border hover:shadow-xl transition-all flex flex-col flex-1">
        {/* IMAGE */}
        <Link
          href={`/animals/${animal.id}`}
          className="block relative w-full pt-[70%]"
        >
          <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition"
          />
        </Link>

        {/* CONTENT */}
        <div className="p-6 flex flex-col grow">
          <Link href={`/animals/${animal.id}`}>
            <h3 className="text-xl font-bold group-hover:text-cyan-600 transition">
              {name}
            </h3>
          </Link>

          <p className="text-gray-600 dark:text-gray-400 mt-3 line-clamp-3">
            {description}
          </p>

          {/* BUTTON AT BOTTOM */}
          <div className="mt-6">
            <Link
              href={`/animals/${animal.id}`}
              className="block w-full text-center py-3 rounded-xl font-semibold bg-cyan-500 text-white hover:bg-cyan-600 transition shadow-md"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
