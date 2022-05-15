import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { Car } from "~/models/car.server";
import { getCar } from "~/models/car.server";

type LoaderData = {
  car: Car;
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.carId, "carId not found");

  const car = await getCar({ id: params.carId });
  if (!car) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ car });
};

export default function CarDetailsPage() {
  const { car } = useLoaderData() as LoaderData;

  return (
    <div>
      <h3 className="text-2xl font-bold">{car.year} {car.make} {car.model}</h3>
      <img src={car.image} alt={car.title} height={300} width={300} />
      <p className="py-6">{car.id}</p>
      <hr className="my-4" />
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Car not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
