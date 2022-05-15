import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/node";
import { getCarListItems } from "~/models/car.server";

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
    return <div>TEST</div>
  }

  return (
    <>
      {data.carListItems.map((car) => (
        <div key={car.id}>{car.id}</div>
      ))}
    </>
  );
}
