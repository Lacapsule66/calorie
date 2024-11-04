-- AlterTable
ALTER TABLE "WeightTracking" ADD COLUMN     "userId" UUID,
ALTER COLUMN "userProfileId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "WeightTracking" ADD CONSTRAINT "WeightTracking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
