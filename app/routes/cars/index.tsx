import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/node";
import { getCarListItems } from "~/models/car.server";
import CarCard from "./CarCard";

type LoaderData = {
  carListItems: Awaited<ReturnType<typeof getCarListItems>>;
};

export const loader: LoaderFunction = async () => {
  const carListItems = await getCarListItems();
  return json<LoaderData>({ carListItems });
};


export default function NoteIndexPage() {
  const data = useLoaderData() as LoaderData;

  if (data.carListItems.length === 0) {
    return <div>No cars available yet!</div>
  }

  return (
    <div className="flex flex-wrap gap-4">
      {data.carListItems.map((car) => (
        <CarCard car={car} key={car.id} />
      ))}
    </div>
  );
}
