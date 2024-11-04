/*
  Warnings:

  - A unique constraint covering the columns `[userProfileId,date,userId]` on the table `WeightTracking` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "WeightTracking_userProfileId_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "WeightTracking_userProfileId_date_userId_key" ON "WeightTracking"("userProfileId", "date", "userId");
