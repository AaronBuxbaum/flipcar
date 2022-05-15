import type { Car } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Car } from "@prisma/client";

export function getCar({
  id,
}: Pick<Car, "id">) {
  return prisma.car.findFirst({
    where: { id },
  });
}

export function getCarListItems() {
  return prisma.car.findMany({
    select: { id: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function getInvestmentListItems({ userId }: { userId: string }) {
  return prisma.investment.findMany({
    select: { id: true },
    orderBy: { updatedAt: "desc" },
  });
}
