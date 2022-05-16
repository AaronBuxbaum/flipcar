import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { getUserId } from "~/session.server";
import { getInvestmentListItems } from "~/models/car.server";

type LoaderData = {
  investmentListItems: Awaited<ReturnType<typeof getInvestmentListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  const investmentListItems = userId ? await getInvestmentListItems({ userId }) : [];
  return json<LoaderData>({ investmentListItems });
};

export default function CarsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div className="flex h-full min-h-screen flex-col">
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
