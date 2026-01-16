import { fetchApiClient } from "@/lib/oneentry";

export async function getDonationPackages() {
  try {
    const api = await fetchApiClient();

    // Hämta produkter via sidan "donations"
    const products = await api.Products.getProductsByPageUrl("donations");

    console.log("Fetched donation products:", products);

    return products.items ?? [];
  } catch (error) {
    console.error("Error fetching donation packages:", error);
    return [];
  }
}
