import { NextResponse } from "next/server";
import { fetchApiClient } from "@/lib/oneentry";

export async function GET() {
  try {
    const api = await fetchApiClient();

    // Hämtar ALLA produkter som finns i din shop
    const products = await api.Products.getProducts();

    console.log("ALL PRODUCTS:", products.items);

    // Returnerar allt; sökning filtrerar senare
    return NextResponse.json(products.items || []);
  } catch (err) {
    console.error("ERROR in /api/animals:", err);
    return NextResponse.json([]);
  }
}
