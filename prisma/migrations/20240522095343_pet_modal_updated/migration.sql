-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "HealthStatus" AS ENUM ('HEALTHY', 'SICK', 'INJURED');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "HealthStatus" "HealthStatus" NOT NULL DEFAULT 'HEALTHY',
ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'MALE',
ADD COLUMN     "photos" TEXT[];
