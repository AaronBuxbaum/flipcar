import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { Car } from "~/models/car.server";
import { getCar } from "~/models/car.server";

type LoaderData = {
  car: Car;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.carId, "carId not found");

  const car = await getCar({ id: params.carId });
  if (!car) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ car });
};

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.carId, "carId not found");

  return redirect("/cars");
};

export default function CarDetailsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.car.id}</h3>
      <p className="py-6">{data.car.make}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
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
