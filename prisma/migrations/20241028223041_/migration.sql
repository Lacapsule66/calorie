-- CreateTable
CREATE TABLE "DailyConsumption" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" DATE NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "userId" UUID NOT NULL,
    "alimentId" UUID NOT NULL,

    CONSTRAINT "DailyConsumption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DailyConsumption" ADD CONSTRAINT "DailyConsumption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyConsumption" ADD CONSTRAINT "DailyConsumption_alimentId_fkey" FOREIGN KEY ("alimentId") REFERENCES "Aliment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
