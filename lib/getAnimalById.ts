"use server";

import { getAnimals } from "./getAnimals";
import { IAnimal } from "@/types/animal";

export async function getAnimalById(id: number): Promise<IAnimal | null> {
  try {
    const animals = await getAnimals();

    console.log("ANIMALS:", animals);

    const animal = animals.find((a) => a.id === id);

    console.log("FOUND ANIMAL:", animal);

    return animal ?? null;
  } catch (err) {
    console.error("ERROR IN getAnimalById:", err);
    return null;
  }
}
