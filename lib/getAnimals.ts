"use server";

import { fetchApiClient } from "@/lib/oneentry";
import { IAnimal } from "@/types/animal";

export async function getAnimals(): Promise<IAnimal[]> {
  try {
    const api = await fetchApiClient();

    const products = await api.Products.getProductsByPageUrl("animals");

    console.log("PRODUCTS FROM ONEENTRY:", products);

    return products.items as unknown as IAnimal[];
  } catch (err) {
    console.error("ERROR IN getAnimals():", err);
    throw err; // viktigt!!
  }
}
