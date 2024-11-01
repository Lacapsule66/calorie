/*
  Warnings:

  - Added the required column `objectif` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Made the column `sportFrequency` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "objectif" TEXT NOT NULL,
ALTER COLUMN "sportFrequency" SET NOT NULL;
