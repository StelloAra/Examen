import { getAnimals } from "@/lib/getAnimals";

export default async function TestPage() {
  let data;

  try {
    data = await getAnimals();
  } catch (err: any) {
    data = { error: err.toString() };
  }

  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}