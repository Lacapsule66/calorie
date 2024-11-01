/*
  Warnings:

  - Added the required column `calories` to the `DailyConsumption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `glucides` to the `DailyConsumption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lipides` to the `DailyConsumption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proteines` to the `DailyConsumption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DailyConsumption" ADD COLUMN     "calories" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "glucides" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lipides" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "proteines" DOUBLE PRECISION NOT NULL;
