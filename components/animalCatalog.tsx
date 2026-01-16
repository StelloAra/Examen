import React from "react";
import { IAnimal } from "@/types/animal";
import AnimalCard from "./animalCard";

const AnimalCatalog = ({
  title,
  animals,
}: {
  title: string;
  animals: IAnimal[];
}) => {
  return (
    <section className="mb-16 sm:mb-20">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4">
          <span className="bg-linear-to-r from-cyan-600 via-sky-500 to-blue-500 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        <div className="w-24 h-1 bg-linear-to-r from-cyan-500 via-sky-500 to-blue-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {animals?.map((animal) => (
          <AnimalCard animal={animal} key={animal.id} />
        ))}
      </div>
    </section>
  );
};

export default AnimalCatalog;
