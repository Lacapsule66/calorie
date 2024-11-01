/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `DailyConsumption` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DailyConsumption_userId_date_key" ON "DailyConsumption"("userId", "date");
