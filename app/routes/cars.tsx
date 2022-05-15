import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { getUserId } from "~/session.server";
import { useOptionalUser } from "~/utils";
import { getCarListItems, getInvestmentListItems } from "~/models/car.server";

type LoaderData = {
  carListItems: Awaited<ReturnType<typeof getCarListItems>>;
  investmentListItems: Awaited<ReturnType<typeof getInvestmentListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  const investmentListItems = userId ? await getInvestmentListItems({ userId }) : [];
  const carListItems = await getCarListItems();
  return json<LoaderData>({ carListItems, investmentListItems });
};

export default function CarsPage() {
  const data = useLoaderData() as LoaderData;
  const user = useOptionalUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Cars</Link>
        </h1>
        <p>{user?.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex h-full bg-white">
        {data.investmentListItems.length > 0 &&
          <div className="h-full w-80 border-r bg-gray-50">
            <ol>
              {data.investmentListItems.map((investment) => (
                <li key={investment.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={investment.id}
                  >
                    📝 {investment.id}
                  </NavLink>
                </li>
              ))}
            </ol>
          </div>
        }

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
