-- CreateTable
CREATE TABLE "WeightTracking" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" DATE NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "userProfileId" UUID NOT NULL,

    CONSTRAINT "WeightTracking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WeightTracking_userProfileId_date_key" ON "WeightTracking"("userProfileId", "date");

-- AddForeignKey
ALTER TABLE "WeightTracking" ADD CONSTRAINT "WeightTracking_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
