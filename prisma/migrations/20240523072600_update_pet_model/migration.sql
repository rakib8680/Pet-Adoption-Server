/*
  Warnings:

  - You are about to drop the column `HealthStatus` on the `pets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "HealthStatus",
ADD COLUMN     "healthStatus" "HealthStatus" NOT NULL DEFAULT 'HEALTHY',
ADD COLUMN     "specialNeeds" TEXT NOT NULL DEFAULT 'None';
