/*
  Warnings:

  - Added the required column `condition` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('EXCELLENT', 'GOOD', 'FAIR', 'POOR', 'PARTS', 'SCRAP');

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "condition" "Condition" NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "vin" DROP NOT NULL;
