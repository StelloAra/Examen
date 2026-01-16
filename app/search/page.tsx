"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import AnimalCard from "@/components/animalCard";
import { IAnimal } from "@/types/animal";

// 🔍 Deep search som funkar på ALLA fält i objektet
function deepSearch(obj: any, term: string): boolean {
  if (!term) return true;
  if (!obj || typeof obj !== "object") return false;

  const lowerTerm = term.toLowerCase();

  for (const value of Object.values(obj)) {
    if (typeof value === "string") {
      if (value.toLowerCase().includes(lowerTerm)) return true;
    } else if (typeof value === "object") {
      if (deepSearch(value, term)) return true;
    }
  }

  return false;
}

// ⭐ Inre komponent som hanterar fetch + filtrering
function SearchResults() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm")?.toLowerCase() || "";

  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFromAPI() {
      try {
        const res = await fetch("/api/animals");
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setAnimals(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Search error:", err);
        setAnimals([]);
      } finally {
        setLoading(false);
      }
    }

    fetchFromAPI();
  }, []);

  // ⭐ Här är nu den nya färdiga sökningen
  const filtered = animals.filter((a) => deepSearch(a, searchTerm));

  if (loading) {
    return (
      <div className="text-center p-20 italic text-gray-500">
        Searching animals...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Results for <span className="text-cyan-600">"{searchTerm}"</span>
      </h1>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
          <p className="text-2xl text-gray-400 font-light italic">
            No animals found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}

// ⭐ Huvudkomponent
export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center p-20 text-gray-400 italic">Loading...</div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
